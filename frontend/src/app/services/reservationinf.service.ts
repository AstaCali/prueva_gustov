import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.serverBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class ReservationinfService {

  constructor(private http:HttpClient) { }

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
  //---ADMINISTRADOR----
  getInfReservation(id:number){

    const url = `${ base_url }/reservations/info/${ id }`;
    return this.http.get( url)
              .pipe(
                map((resp: any) => resp.reservation )
                // map((resp: any) => resp.user as Usuario)
              );

  }

  // postReservationAprobado(id:number,formData: any){

  //   return this.http.post(`${base_url}/reservations/aprovations${id}`, formData, this.headers)
  //           .pipe(
  //             map((resp: any) => resp))

  // }

  postReservationAprobado(id: number, formData: any) {
    // Construye la URL correcta para el endpoint
    const url = `${base_url}/reservations/aprovations/${id}`;
  
    // Realiza la solicitud POST
    return this.http.post(url, formData, this.headers)
      .pipe(
        map((resp: any) => resp)
      );
  }

  //------EMPLEADO----
  cargarReservation(IDuser:number,searchTerm: string = '', desde: number = 0) {

    const url = `${ base_url }/reservations/${IDuser}?search=${searchTerm}&desde=${desde}`;
    return this.http.get( url, this.headers )
              .pipe(
                //map((resp: any) => resp.users as Usuario[])
                map((resp: any) => resp)
              );
  }
  postReservation(formData: any){

    return this.http.post(`${base_url}/reservations`, formData, this.headers)
            .pipe(
              map((resp: any) => resp))

  }

}
