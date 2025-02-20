import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    //route: ActivatedRouteSnapshot,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      //this.usuarioService.validarToken()
        // .subscribe( resp =>{
        //   console.log(resp);
        // })
        // console.log('PASO AQUI CANACTIVATE DEL GUARD');  
        return this.usuarioService.validarToken()
          .pipe(
            tap( estaAutenticado =>{
              if(!estaAutenticado){
                this.router.navigateByUrl('/login');
              }
            })
          ) // Cambia esto según tus necesidades de autorización.
    }
  
}
