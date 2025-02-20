import { Component } from '@angular/core';
//import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioService } from '../../services/usuario.service'
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  //styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public usuario : Usuario;

  constructor( private usuarioService : UsuarioService ){
    this.usuario  = usuarioService.usuario;
    console.log('HEADRE??', this.usuario);
  }

  logout(){
    this.usuarioService.logout();
  }

}
