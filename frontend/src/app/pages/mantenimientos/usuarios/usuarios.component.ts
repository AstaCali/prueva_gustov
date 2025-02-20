import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuario: Usuario[] = [];
  //public usuarios: any;
  public totalUsuarios : number = 0;
  public desde : number = 0;

  constructor (private usarioService :UsuarioService){}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  //--listar usuario
  // cargarUsuarios() {
  //   //this.cargando = true;
  //   this.usarioService.cargarUsuario()
  //     .subscribe( data => {
  //       this.usuario = data;
  //       console.log('LLEGA USUARIOS',this.usuario);
  //       //this.usuariosTemp = usuarios;
  //       //this.cargando = false;
  //   })
  // }
  cargarUsuarios(termino: string = '') {
    //this.cargando = true;
    this.usarioService.cargarUsuario(termino, this.desde)
      .subscribe( ({total, users}) => {
        console.log("==>",total,users);
        this.totalUsuarios = total;
        this.usuario = users;
        // this.usuario = data;
        // console.log('LLEGA USUARIOS',this.usuario);
    })
  }
  //----BORRAR USUARIO----
  borrarUsuario( usuario : Usuario){

    //console.log("LLEGA PARA BORRAR", usuario.name_role, this.usarioService.roleID );
    // if( usuario.name_role === this.usarioService.roleID ){
    //   //console.log('USUARIO_DEL_ID', this.usarioService.roleid);
    //     Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    //     return;
    // }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar a ${ usuario.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        //this.medicoService.borrarMedico( medico._id )
        this.usarioService.borrarUsuario( usuario.id )
          .subscribe( resp => {
            
            //this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.name } fue eliminado correctamente`,
              'success'
            );
            this.cargarUsuarios();
            
          },(err) =>{
            //     //-- SI SUCEDE UN ERROR MStRARA EStE SWATT
            Swal.fire('Error', err.error.message, 'error');
          });
      }
    })

  }
  cambiarPagina( valor : number){
    console.log('cambia', valor);
    this.desde += valor; 
    if (this.desde < 0){
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();
    //this.cambiarPagina('');
  }

  cambiarStado(usuarioo : Usuario){

    this.usarioService.putEstado( usuarioo )
    .subscribe( resp =>{
      console.log('SE ACTUALIZO',resp)
      // Swal.fire('Actualizando',`${ state.name_treatment } actualizado correctamente`, 'success' );
      this.cargarUsuarios();
      //this.router.navigateByUrl(`/dashboard/tratamientos`)
    })
  }

}
