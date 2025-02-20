import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.serverBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

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

  // imprimirReport(encabezado : string[], cuerpo : Array<any>, titulo : string, guardar : boolean)
  imprimirReport(encabezado : string[], cuerpo : any[], titulo : string, guardar : boolean)
  {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });
    doc.text(titulo, doc.internal.pageSize.width /2, 25, {align: 'center'});
    // Convertir el objeto cuerpo a un array de arrays (filas de la tabla)
    const cuerpoTabla = cuerpo.map((obj) => [
      //obj.id,
      obj.fecha,
      obj.plato,
      obj.cantidad,
      obj.subtotal
    ]);
    autoTable(doc, {
      head: [encabezado],
      body: cuerpoTabla, // Aquí pasamos el cuerpo ya convertido en filas de la tabla
    });

    if(guardar)
    {
      const hoy = new Date();
      doc.save(hoy.getDate() + hoy.getMonth() + hoy.getFullYear() + hoy.getTime() +'.pdf')
    }
    else{
      // Abre la ventana de impresión
      doc.autoPrint();
      window.open(doc.output('bloburl'), '_blank');
    }
  }
  //---listar platos para reporte--
  cargarPlatoRep() {

    const url = `${ base_url }/reporte/platos`;
    return this.http.get( url, this.headers)
              .pipe(
                map((resp: any) => resp.plato)
              );
  }
  cargarVentaDetalleRep(fechaInicio: string, fechaFinal: string, id: string): Observable<any> {
    const url = `${base_url}/reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFinal}&plato_id=${id}`;
    //console.log("URL de la API: ", url);
    //return this.http.get<any>(url);
    //return this.http.get( url, this.headers )
    return this.http.get( url )
    .pipe(
      map((resp: any) => resp)
    );
  }
}
