import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {

  public platoArray: any[] = [];
  public totalPlato : number = 0;
  public desde : number = 0;
  url = environment.imgUrl;
  //url = environment.imgUrl

  constructor (private menuService: MenuService){}

  ngOnInit(): void {

    this.CargarPlato()
    
  }

  CargarPlato(termino: string = '') {
    //this.cargando = true;
    this.menuService.cargarPlato(termino, this.desde)
      .subscribe( ({total, platos}) => {
        console.log("=====>",total,platos);
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
  //--eliminar plato--
  borrarPlato( plato : any){
    //console.log('DATO_PARA_BORRAR', plato);

    //const {nombre }= plato.nombre
    Swal.fire({
      title: '¿Borrar Menu?',
      //text: `Esta a punto de borrar`,
      text: `Esta a punto de borrar a ${ plato.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.menuService.borrarPlato( plato.id )
          .subscribe( resp => {
            
            //this.cargarUsuarios();
            Swal.fire(
              'Menu borrado',
              // `${ detalleProforma.name_treatment} fue eliminado correctamente`,
              `fue eliminado correctamente`,
              'success'
            );
            
            this.CargarPlato();
            
          },
          error=>{
            //console.log('EL MSJ',error);
            //this.router.navigateByUrl(`/dashboard/usuario`);
            Swal.fire('plato Cotizacion no Eliminado',error.error.msg)
          }
        );

      }
    })

  }
  cambiarStado(state : any){
    console.log('stado',state);
    this.menuService.putStatePlato( state )
    .subscribe( resp =>{
      console.log('SE ACTUALIZO esatdo ==>',resp)
      Swal.fire('Actualizando',`${ state.nombre } actualizado correctamente`, 'success' );
      this.CargarPlato();
      //this.router.navigateByUrl(`/dashboard/tratamientos`)
    })
  }

}
