import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.serverBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class VentaService {

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

  cargarPlato(searchTerm: string = '', desde: number = 0) {

    const url = `${ base_url }/venta/platoGetVenta?search=${searchTerm}&desde=${desde}`;
    return this.http.get( url, this.headers )
              .pipe(
                //map((resp: any) => resp.users as Usuario[])
                map((resp: any) => resp)
              );
  }

  crearVenta( formData: any){
    //console.log('crear usaurio');
    return this.http.post(`${base_url}/venta`, formData, this.headers)
          .pipe(
            map((resp: any) => resp)
            //tap( (resp: any) => {
              //localStorage.setItem('token', resp.token);  //--crear dentro del sistema
            //}) 
          )
  }
  cargarVenta(fechaInicio: string, fechaFinal: string): Observable<any> {
    const url = `${base_url}/venta?fechaInicio=${fechaInicio}&fechaFin=${fechaFinal}`;
    //return this.http.get<any>(url);
    return this.http.get( url, this.headers )
    .pipe(
      map((resp: any) => resp)
    );
  }
  //---getById para mostrar detalle venta----
  cargarDetalleVenta( id : number ) {
    const url = `${ base_url }/venta/detalleventa/${ id }`;
    // return this.http.get( url, this.headers )//con token
    return this.http.get( url) // sin Token
            .pipe(
                map((resp: any) => resp )
            );
  }
  //----ELIMINAR--venta con detalle--
  borrarVenta( id: number ) {

    const url = `${ base_url }/venta/${ id }`;
    return this.http.delete( url, this.headers );
  }
  //---editar centa--
  putVenta( dato: any  ) {

    const url = `${ base_url }/venta/${ dato.id }`;
    return this.http.put( url, dato, this.headers );
  }
}
