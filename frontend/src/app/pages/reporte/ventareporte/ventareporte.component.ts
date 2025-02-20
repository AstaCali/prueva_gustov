import { Component, OnInit } from '@angular/core';
import { ImpresionService } from 'src/app/services/impresion.service';

@Component({
  selector: 'app-ventareporte',
  templateUrl: './ventareporte.component.html',
  styleUrls: ['./ventareporte.component.css']
})
export class VentareporteComponent implements OnInit {

  public reporteVentDetArray : any[]= [];
  public platoVentDetArray : any[]= [];
  public fechaFinal: string = '';
  public fehcaInicio : string = '';
  public plato_id : string = "";
  public totalVentaPlato : number = 0;
  public desde : number = 0;
  //public selectedPlatoId : string = "";

  constructor( private impresionServices: ImpresionService){}

  ngOnInit(): void {

    this.listarPatoRep();
    this.iniciarFecha();
    
  }

  listarPatoRep(){
    this.impresionServices.cargarPlatoRep()
    .subscribe( data => {
      console.log('PLATO====>: ', data);
      this.platoVentDetArray = data;
      // console.log('LLEGA Tratamientos',this.reporteVentDetArray);
    })
    //this.iniciarFecha();
    this.CargarVentaDetaRep();
  }
  
  onInputPlatos(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedNombre = inputElement.value;
    console.log("Plato selectedNombre", selectedNombre);
    // Buscar el plato en el array
    const selectedPlato = this.platoVentDetArray.find(plato => plato.nombre === selectedNombre);
  
    if (selectedPlato) {
      console.log("ID del plato seleccionado:", selectedPlato.id);
      // Aquí puedes asignarlo a una variable si lo necesitas
      this.plato_id = selectedPlato.id;
      
    } else {
      console.log("Plato no encontrado");
    }
    this.CargarVentaDetaRep();
  }

  cambiarFehaInicio(event: Event){
    const input = event.target as HTMLInputElement;
    //console.log('Fecha_Inicio',input.value);

    if (input && input.value) {
      // Obtener el valor del campo de entrada (formato "yyyy-MM")
      const [year, month] = input.value.split('-');

      // Crear una nueva fecha usando el año, mes y establecer el día seleccionado
      const selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(input.value.split('-')[2]));

      // Formatear la fecha en "yyyy-MM-dd"
      const formattedDate = `${year}-${('0' + month).slice(-2)}-${('0' + selectedDate.getDate()).slice(-2)}`;

      this.fehcaInicio = formattedDate;
      console.log('Fecha_Inicio:', formattedDate);
      this.CargarVentaDetaRep();
    }
  }
  //----cargar venta detalle--
  CargarVentaDetaRep() {
    //this.cargando = true; 
    console.log("venta-fehcaInicio=====>",this.fehcaInicio);
    this.impresionServices.cargarVentaDetalleRep(this.fehcaInicio, this.fechaFinal, this.plato_id)
    .subscribe(({total, detalles}) =>{
      console.log("venta-Reporte=====>",total,detalles);
        this.totalVentaPlato = total;
        this.reporteVentDetArray = detalles;
    })
  }
  iniciarFecha(){
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // Ajuste de zona horaria
    this.fehcaInicio = today.toISOString().split('T')[0];
    this.CargarVentaDetaRep();
  }
  eliminarVentaRep(){
    this.plato_id = '';
    console.log('PLATOSSS: ', this.plato_id);
    // Limpiar el campo de búsqueda
    const inputElement = document.getElementById('exampleDataListPlato') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
    this.CargarVentaDetaRep();
  }

  onImprimir(){
    console.log('IMPRIMIR');
    const encabezado = ['Fecha', 'Plato', 'Cantidad','SubTotal']

    const cuerpo = this.reporteVentDetArray.map((item) => {
      return {
        fecha: new Date(item.fecha).toLocaleDateString('es-ES', { month: 'short', year: 'numeric', day: 'numeric' }),
        plato: item.nombre,
        cantidad: item.cantidad,
        subtotal: item.subtotal
      };
    });

    const titulo = 'Reporte de Venta';
     console.log('ENVIA: ', cuerpo);

    this.impresionServices.imprimirReport(encabezado, cuerpo, titulo, false);
  }
  cambiarPagina( valor : number){
    console.log('cambia', valor);
    this.desde += valor; 
    if (this.desde < 0){
      this.desde = 0;
    } else if ( this.desde >= this.totalVentaPlato){
      this.desde -= valor;
    }
    this.CargarVentaDetaRep();
  }

}
