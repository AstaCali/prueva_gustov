import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  //styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public totalUser : number = 0;
  public totalRole : number = 0;

  public reservation :any[]=[];
  public totalVentass : number = 0;

  constructor( private servicedashboard : DashboardService){}

  ngOnInit(): void {
    this.totalVentas();
    // this.totalRoles();
    // this.cargarVacations();
  }

  totalUsers(){
    this.servicedashboard.totalUser().subscribe(dato=>{
      this.totalUser = dato;
      //console.log('Total:',dato);
    });
  }

  totalRoles(){
    this.servicedashboard.totalRoles().subscribe(dato=>{
      this.totalRole = dato;
      //console.log('Total:',dato);
    });
  }
  cargarVacations(){
    this.servicedashboard.getReserva().subscribe(data=>{
      console.log(data);
      this.reservation = data;
    });
  }
  //---cantidad de ventas del dia--
  totalVentas(){
    this.servicedashboard.totalVenta().subscribe(dato=>{
      this.totalVentass = dato;
      //console.log('Total:',dato);
    });
  }

}
