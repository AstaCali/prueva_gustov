import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.serverBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  totalUser(){
    const url = `${ base_url }/persons`;
    return this.http.get(url).pipe(
      map((res:any) => res.totalEmpleados)
    );
  }
  totalRoles() {
    const url = `${ base_url }/roles/totalgetrole`;
    return this.http.get( url )
              .pipe(
                map((resp: any) => resp.roles)
              );
  }
  //---GET VACACIONES PENDIENTES Y ACEPTADOS

  getReserva(){
    const url = `${ base_url }/reservations/twos/reservation`;
    return this.http.get( url)
              .pipe(
                map((resp: any) => resp.reservation)
                // map((resp: any) => resp.roles as Role[])
              );
  }
  //------Total de ventas realisadas en el dia--
  totalVenta(){
    const url = `${ base_url }/venta/ventaTotalDia`;
    return this.http.get(url).pipe(
      map((res:any) => res.cantidadVentas)
    );
  }
}
