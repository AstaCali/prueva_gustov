import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventamenu',
  templateUrl: './ventamenu.component.html',
  styleUrls: ['./ventamenu.component.css']
})
export class VentamenuComponent implements OnInit{

  public ventaArray: any[] = [];
  public fechaFinal: string = '';
  public fehcaInicio : string = '';
  public totalVenta : number = 0;
  public desde : number = 0;
  abrilModalDetalle: boolean = false;
  selectedIDVenta:number = 0;//--venta_id el id

  constructor( private ventaServices : VentaService){}

  ngOnInit(): void {
    //this.fechaFinal = new Date().toISOString().split('T')[0];
    this.iniciarFecha();
  }

  cambiarFehaInicio(event: Event){
    const input = event.target as HTMLInputElement;
    //console.log('Fecha_Inicio',input.value);

    if (input && input.value) {
      // Obtener el valor del campo de entrada (formato "yyyy-MM")
      const [year, month] = input.value.split('-');

      // Crear una nueva fecha usando el año, mes y establecer el día seleccionado
      const selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(input.value.split('-')[2]));

      // Formatear la fecha en "yyyy-MM-dd"
      const formattedDate = `${year}-${('0' + month).slice(-2)}-${('0' + selectedDate.getDate()).slice(-2)}`;

      this.fehcaInicio = formattedDate;
      //this.fechaFinal =formattedDate;
      console.log('Fecha_Inicio:', formattedDate);
      this.CargarVenta();
    }
  }

  cambiarFechaFinal(event: Event){
    const input = event.target as HTMLInputElement;
    //console.log('Fecha_Final',input.value);
    if (input && input.value) {
      // Obtener el valor del campo de entrada (formato "yyyy-MM")
      const [year, month] = input.value.split('-');

      // Crear una nueva fecha usando el año, mes y establecer el día seleccionado
      const selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(input.value.split('-')[2]));

      // Formatear la fecha en "yyyy-MM-dd"
      const formattedDate = `${year}-${('0' + month).slice(-2)}-${('0' + selectedDate.getDate()).slice(-2)}`;

      this.fechaFinal = formattedDate;
      console.log('Fecha_Final:', formattedDate);
      this.CargarVenta();
    }

  }

  CargarVenta() {
    //this.cargando = true;
    console.log("FECHA=====>",this.fehcaInicio,this.fechaFinal);
    this.ventaServices.cargarVenta(this.fehcaInicio, this.fechaFinal)
    .subscribe(({total, ventas}) =>{
      console.log("venta=====>",total,ventas);
      this.totalVenta = total;
        this.ventaArray = ventas;
    })
  }
  cambiarPagina( valor : number){
    console.log('cambia', valor);
    this.desde += valor; 
    if (this.desde < 0){
      this.desde = 0;
    } else if ( this.desde >= this.totalVenta){
      this.desde -= valor;
    }
    this.CargarVenta();
  }

  borrarVenta( venta : any){

    Swal.fire({
      title: '¿Borrar Venta?',
      // text: `Esta a punto de borrar a ${ venta.name }`,
      text: `Esta a punto de borrar`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.ventaServices.borrarVenta( venta.id )
          .subscribe( resp => {
            
            Swal.fire(
              'Venta borrado',
              // `${ usuario.name } fue eliminado correctamente`,
              `fue eliminado correctamente`,
              'success'
            );
            this.CargarVenta();
            
          },(err) =>{
            //console.log("ERROR-->", err);
            Swal.fire('Error', err.error.msg, 'error');
        });
      }
    })

  }

  //----abrir modal de detalle--
  abrirModalDetalle(venta_id : number){
    console.log("ABRIO_MODAL_DETALLE_SIUU");
    // this.modalProformaService.abrirModal();
    console.log('ID_PARA_MosTar el ID_VENTA',venta_id);
    this.selectedIDVenta = venta_id
    this.abrilModalDetalle = true;

  }
  //abrilModalDetalle(){}
  cancelarVentaDet() {
    this.abrilModalDetalle = false; // Cierra el formulario sin guardar
    this.selectedIDVenta = 0;
    //this.selectedIDPagoPut = 0;
    //this.busquedaGlobales(t);
    //this.citaId = undefined;
  }
  //--INICIAR FECHA--
  iniciarFecha(){
    //this.fechaFinal = new Date().toISOString().split('T')[0];
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // Ajuste de zona horaria
    this.fechaFinal = today.toISOString().split('T')[0];
    this.fehcaInicio = today.toISOString().split('T')[0];
    this.CargarVenta();
  }

}
