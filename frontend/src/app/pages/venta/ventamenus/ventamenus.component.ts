import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventamenus',
  templateUrl: './ventamenus.component.html',
  styleUrls: ['./ventamenus.component.css']
})
export class VentamenusComponent implements OnInit{

  public platoArray: any[] = [];
  public totalPlato : number = 0;
  public desde : number = 0;
  url = environment.imgUrl;

  // carrito: { id:number; nombre: string; precio: number; cantidad: number }[] = [];
  carrito: { id:number; nombre: string; precio: number; cantidad: number; preciosubtotal: number }[] = [];


  total: number = 0; // Variable para almacenar el total

  public ventaForm : any;
  public ventaSeleccionado? : any;
  public venta_id_forania : number=0;

  constructor(private ventaServices: VentaService, private fb : FormBuilder, private router: Router,
                  private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.activatedRoute.params
    .subscribe( ({id}) => this.platoCargar( id ) ); 

    this.CargarPlato();

    //--form--
    this.ventaForm = this.fb.group({
      //nombre: ['', Validators.required],
      total: [0, Validators.required],
      carrito: [[]],
    });
    
  }

  CargarPlato(termino: string = '') {
    //this.cargando = true;
    this.ventaServices.cargarPlato(termino, this.desde)
      .subscribe( ({total, platos}) => {
        console.log("venta-plato=====>",total,platos);
        this.totalPlato = total;
        this.platoArray = platos;
    })
  }
  cambiarPagina( valor : number){
    console.log('cambia', valor);
    this.desde += valor; 
    if (this.desde < 0){
      this.desde = 0;
    } else if ( this.desde >= this.totalPlato){
      this.desde -= valor;
    }
    this.CargarPlato();
  }

  //----añadir carrito----
  /*agregarAlCarrito(item: any) {
    let productoEnCarrito = this.carrito.find(p => p.nombre === item.nombre);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += 1; // Si ya existe, incrementa la cantidad
    } else {
      this.carrito.push({ ...item, cantidad: 1 }); // Si no existe, agrégalo con cantidad 1
    }
  }
  aumentarCantidad(item: any) {
    item.cantidad += 1;
  }

  disminuirCantidad(item: any) {
    if (item.cantidad > 1) {
      item.cantidad -= 1;
    } else {
      this.carrito = this.carrito.filter(p => p !== item); // Eliminar si la cantidad es 0
    }
  }*/
  //-----hasta aqui-------
  agregarAlCarrito(item: any) {
    let productoEnCarrito = this.carrito.find(p => p.nombre === item.nombre);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += 1; // Si ya existe, incrementa la cantidad
      productoEnCarrito.preciosubtotal = productoEnCarrito.cantidad * productoEnCarrito.precio;
    } else {
      this.carrito.push({ ...item, cantidad: 1, preciosubtotal: item.precio }); // Si no existe, agrégalo con cantidad 1
    }

    this.calcularTotal(); // Actualiza el total cada vez que se agrega un producto
    this.patchValues();
  }

  aumentarCantidad(item: any) {
    item.cantidad += 1;
    item.preciosubtotal = item.cantidad * item.precio; // Recalcular subtotal
    this.calcularTotal(); // Recalcula el total
    // Actualizamos el formulario con el nuevo carrito y total
    this.patchValues();
  }

  disminuirCantidad(item: any) {
    if (item.cantidad > 1) {
      item.cantidad -= 1;
      item.preciosubtotal = item.cantidad * item.precio; // Recalcular subtotal
      this.calcularTotal(); // Recalcula el total
      this.patchValues();
    } else {
      this.carrito = this.carrito.filter(p => p !== item); // Eliminar si la cantidad es 0
      this.calcularTotal(); // Recalcula el total
      this.patchValues();
    }
  }

  calcularTotal() {
    this.total = this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0); // Calcula el total
  }

  limpiarCarrito() {
    this.carrito = [];
    this.total = 0; // Resetea el total cuando se limpia el carrito
    this.patchValues();
  }
  //-----para el registro form--
  /*guardarVenta() {
    if (this.ventaForm.valid) {
      console.log('Formulario enviado-->venta-->:', this.ventaForm.value);

      this.ventaServices.crearVenta(this.ventaForm.value)
        .subscribe(resp => {
          console.log('RESP:', resp);
          Swal.fire('Registrado', 'Creado correctamente', 'success');
          //this.router.navigateByUrl(`/dashboard/vacation`);
          this.limpiarCarrito();
        },
        error=>{
          //alert(error.error.message);
          Swal.fire('Error', error.error.msj, 'error');
        }
      );
  
      // Aquí puedes hacer la solicitud al servidor con los datos del formulario
      // this.httpClient.post('/api/confirmar-compra', this.ventaForm.value).subscribe(response => {
      //   console.log('Compra confirmada', response);
      // });
    } else {
      console.log('Formulario no válido');
    }
  }*/
  guardarVenta() {
    if ( this.ventaSeleccionado){
      console.log('entra para elñ registro editar', this.ventaSeleccionado);
      //   //--acTualizar
        const data = {
          ...this.ventaForm.value,
          id: this.venta_id_forania
        }
        console.log('LO QUE SE ENVIARA PARA_DATA',data)
        //const { name_treatment } = this.tratamientoForm.value;
          this.ventaServices.putVenta( data )
          .subscribe( resp =>{
            console.log('SE ACTUALIZO',resp)
            //Swal.fire('Actualizando',`${ name_treatment } actualizado correctamente`, 'success' );
            Swal.fire('Actualizando',`actualizado correctamente`, 'success' );
            this.router.navigateByUrl(`/dashboard/ventas`)
          })

    } else{
      if (this.ventaForm.valid) {
        console.log('Formulario enviado-->venta-->:', this.ventaForm.value);

        this.ventaServices.crearVenta(this.ventaForm.value)
          .subscribe(resp => {
            console.log('RESP:', resp);
            Swal.fire('Registrado', 'Creado correctamente', 'success');
            //this.router.navigateByUrl(`/dashboard/vacation`);
            this.limpiarCarrito();
          },
          error=>{
            //alert(error.error.message);
            Swal.fire('Error', error.error.msj, 'error');
          }
        );
      } else {
        //console.log('Formulario no válido');
        const error = "Formulario no válido";
        Swal.fire('Error', error, 'error');
      }
    }
  }
    //---Patch value actualizar valor---
  patchValues(){
    // Actualizamos el formulario con el nuevo carrito y total
    this.ventaForm.patchValue({
      carrito: this.carrito,
      total: this.total,
    });
  }
  //----hasta aqui---
  //--cargar para saver si es registrar nuevo o editar para recuperar datos
  platoCargar(id: number | string){

    if ( id === 'nuevo' ) {
      //this.titulo='Registrar Vacaciones';
      return;
    }
    this.venta_id_forania = Number (id);
    console.log('ENTRA PARA EDITAR_RECUPERAR DATOS, venta_id', id);
    this.ventaServices.cargarDetalleVenta(Number (id))
    .subscribe(resp =>{
      console.log("ventaDetalle=====>",resp);
      this.ventaSeleccionado = resp;
      //this.ventaDetalleArray = detalles;
      this.carrito = resp.detalles;
      this.total = resp.sumaSubtotal;
    })
    // .subscribe(({sumaSubtotal, detalles}) =>{
    //   console.log("ventaDetalle=====>",sumaSubtotal,detalles);
    //   this.ventaSeleccionado = detalles;
    //   //this.ventaDetalleArray = detalles;
    //   this.carrito = detalles;
    //   this.total = sumaSubtotal;
    // })
  }
  volverVentaLista(){
    this.router.navigateByUrl(`/dashboard/ventas`);
  }

}
