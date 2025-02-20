import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventadetalle',
  templateUrl: './ventadetalle.component.html',
  styleUrls: ['./ventadetalle.component.css']
})
export class VentadetalleComponent implements OnInit{

  @Input() selectedIDVenta: number = 0;
  @Output() cancelarVentaDet = new EventEmitter<void>();
  public ventaDetalleArray: any[] = [];
  public totalVentaDetalle : number = 0;
  public totalVenta : number = 0;

  constructor( private ventaServices : VentaService){}

  ngOnInit(): void {

    if (this.selectedIDVenta !== 0) {
      this.cargarVentaDetalle(this.selectedIDVenta);
    }
    
  }

  cargarVentaDetalle(venta_id : number){

    console.log('venta_id: ', venta_id);
    this.ventaServices.cargarDetalleVenta(venta_id)
    .subscribe(({sumaSubtotal,detalles}) =>{
      console.log("ventaDetalle=====>",sumaSubtotal, detalles);
      this.ventaDetalleArray = detalles;
      this.totalVenta = sumaSubtotal;
    })
  }
  
  cancelar() {
    this.cancelarVentaDet.emit(); // Emite el evento al hacer clic en "Cancelar"
 
  }

}
