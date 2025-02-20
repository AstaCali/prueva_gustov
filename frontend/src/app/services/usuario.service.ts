import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { RegisterFormUsuario } from '../interfaces/user-register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';
import { Role } from '../models/roles.model';

const base_url = environment.serverBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor( private htt: HttpClient, private router :Router) { }

  login( formData: any){
    //login( formData: LoginForm){
    //console.log('crear usaurio');
    return this.htt.post(`${base_url}/auth/login`, formData)
            .pipe(
              tap( (resp: any) => {
                localStorage.setItem('token', resp.token);
              }) 
            )
  }
  guardarLocalStorage ( token: string, menu: any ){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  validarToken() : Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.htt.get(`${base_url}/auth/renew`, {
      headers:{
        'x-token': token
      }
    }).pipe(
      tap( (resp:any)=>{
        console.log('VALIDAR_TOKEN',resp);
        const {
          id,
          email,
          end_date,
          name_role,
          name,
          last_name,
          ci,
          cellphone,
          gender,
          state,
          role_id,
          //role,
          //person
        } = resp.usuario;
        this.usuario = new Usuario(id, email, end_date,'',name_role, name, last_name, ci, cellphone, gender,state, role_id); 
        // this.usuario = new Usuario(id, email, end_date, '',name_role, name, last_name, ci, cellphone, gender,state, role_id, role); 
        this.guardarLocalStorage(resp.token, resp.menu);
      }),
      map( resp => true),
      catchError( error => of (false))// atrapa el error cuando no esTa auThenticado.Y envia un nuevo Obser♂8ol no auPenX4icado ose false.
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }

  //----------------------------------DeTe aqui DRUD USAURIO--------------
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  get userID(): number {
    return this.usuario.id || 0;
  }

  crearUsuario( formData: RegisterFormUsuario){
    //console.log('crear usaurio');
    return this.htt.post(`${base_url}/users`, formData, this.headers)
          .pipe(
            map((resp: any) => resp)
            //tap( (resp: any) => {
              //localStorage.setItem('token', resp.token);  //--crear dentro del sistema
            //}) 
          )
  }
  
  //-----------GET LISTAR USUARIO---------
  cargarUsuario(searchTerm: string = '', desde: number = 0) {

    const url = `${ base_url }/users?search=${searchTerm}&desde=${desde}`;
    return this.htt.get( url, this.headers )
              .pipe(
                //map((resp: any) => resp.users as Usuario[])
                map((resp: any) => resp)
              );
  }

  //-----OBTENER USAURIO POR ID
  obtenerUsuario( id : number ) {
    const url = `${ base_url }/users/${ id }`;
    return this.htt.get( url, this.headers )
              .pipe(
                map((resp: any) => resp.user as Usuario)
              );
  }
  //-----Eliminar usuario--
  borrarUsuario( id: number ) {

    const url = `${ base_url }/users/${ id }`;
    return this.htt.delete( url, this.headers );
  }
  //----ACTUALIZAR USUARIO---
  actualizarUsuario( usuario: Usuario  ) {

    const url = `${ base_url }/users/${ usuario.id }`;
    return this.htt.put( url, usuario, this.headers );
  }
  //---LISTAR ROLES---
  cargarRoles() {
    const url = `${ base_url }/roles`;
    return this.htt.get( url, this.headers )
              .pipe(
                map((resp: any) => resp.roles as Role[])
              );
  }
  //--CAMBIAR ESTADI--
  putEstado(usuario : Usuario){
    const url = `${ base_url }/users/state/${ usuario.id }`;
    return this.htt.put( url, usuario );
  }
}
