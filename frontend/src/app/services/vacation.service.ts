import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vacations } from '../models/vacation.model';

const base_url = environment.serverBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  constructor( private http: HttpClient) { }

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
    //-----------GET LISTAR USUARIO---------
  cargarVacations(searchTerm: string = '', desde: number = 0) {

    const url = `${ base_url }/vacations?search=${searchTerm}&desde=${desde}`;
    return this.http.get( url, this.headers )
              .pipe(
                //map((resp: any) => resp.users as Usuario[])
                map((resp: any) => resp)
              );
  }

  //--CARGAR USARIO PERSONA--
  cargarUserVacation() {
    const url = `${ base_url }/vacations/filtraruser`;
    return this.http.get( url, this.headers )
              .pipe(
                map((resp: any) => resp.uservacation)
                // map((resp: any) => resp.roles as Role[])
              );
  }
  //--CRAR VACATIONS--
  crearVacation( formData: any){
    //console.log('crear usaurio');
    return this.http.post(`${base_url}/vacations`, formData, this.headers)
            .pipe(
              map((resp: any) => resp)
              // map((resp: any) => resp.roles as Role[])
            );
          // .pipe(
          //   tap( (resp: any) => {
          //     localStorage.setItem('token', resp.token);
          //   }) 
          // )
  }

  getByIDVacations( id: number)
  {
    const url = `${ base_url }/vacations/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map((resp: any) => resp.vacation )
                // map((resp: any) => resp.user as Usuario)
              );
  }
  //--eleiminar vacation
  deleteVacation( id:number)
  {
    const url = `${base_url}/vacations/${id}`;
    return this.http.delete( url, this.headers);
  }
  //--EDITAR VACATION--
  putVacation( vacation : Vacations)
  {
    const url = `${ base_url }/vacations/${ vacation.id }`;
    return this.http.put( url, vacation, this.headers );
  }
}