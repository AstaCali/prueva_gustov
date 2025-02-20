import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.serverBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

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
  cargarPlato(searchTerm: string = '', desde: number = 0) {

    const url = `${ base_url }/plato?search=${searchTerm}&desde=${desde}`;
    return this.http.get( url, this.headers )
              .pipe(
                //map((resp: any) => resp.users as Usuario[])
                map((resp: any) => resp)
              );
  }
  //-------GURADAR MENU PLATO--
  crearPlato( formData: any){
    //console.log('crear usaurio');
    return this.http.post(`${base_url}/plato`, formData, this.headers)
      .pipe(
        map((resp: any) => resp)
        // map((resp: any) => resp.roles as Role[])
      );
  }
  //----ELIMINAR--
  borrarPlato( id: number ) {

    const url = `${ base_url }/plato/${ id }`;
    return this.http.delete( url, this.headers );
  }
  //---EDITAR EL ESATDO DEL PLATO--
  putStatePlato( dato: any  ) {

    const url = `${ base_url }/plato/estado/${ dato.id }`;
    return this.http.put( url, dato, this.headers );
  }
  //----getId---para recuperar datos--
  getByIdPlato( id: number ): Observable<any> {

    const url = `${ base_url }/plato/getId/${ id }`;
    return this.http.get( url, this.headers );
  }
 //---EDITAR PLATO CON SU IMAGEN--
  editarPlato(id: number, dato: any) {
    const url = `${ base_url }/plato/${id}`;
    return this.http.put( url, dato, this.headers );
  }
}
