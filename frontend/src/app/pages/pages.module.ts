import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from  '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//---MODULOS IMPORTADOS DE TERCEROS QUENO HICE Y NO SON DE ANGULAR 


//--MODULOS IMPORTADOS DE LO QUE HISE
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { VacationComponent } from './mantenimientos/vacation/vacation.component';
import { VacationsComponent } from './mantenimientos/vacations/vacations.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
//import { ReservationinfComponent } from './reservation/reservationinf/reservationinf.component';
//import { ReservationinfemComponent } from './reservation/reservationinfem/reservationinfem.component';
//import { ReservationempleadoComponent } from './reservationemp/reservationempleado/reservationempleado.component';
//import { ReservationempleadosComponent } from './reservationemp/reservationempleados/reservationempleados.component';
import { PlatosComponent } from './menu/platos/platos.component';
import { PlatoComponent } from './menu/plato/plato.component';
import { VentamenuComponent } from './venta/ventamenu/ventamenu.component';
import { VentamenusComponent } from './venta/ventamenus/ventamenus.component';
import { VentadetalleComponent } from './venta/ventadetalle/ventadetalle.component';
import { VentareporteComponent } from './reporte/ventareporte/ventareporte.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    UsuariosComponent,
    UsuarioComponent,
    VacationComponent,
    VacationsComponent,
    //ReservationinfComponent,
    //ReservationinfemComponent,
    //ReservationempleadoComponent,
    //ReservationempleadosComponent,
    PlatosComponent,
    PlatoComponent,
    VentamenuComponent,
    VentamenusComponent,
    VentadetalleComponent,
    VentareporteComponent,
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    //--imporX4acio de ANGULAR PROPIO
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //---imporX4acio de terceros

    //--imporTacion que hice
    SharedModule,
    RouterModule,
    ComponentsModule,
    //completar
    AutocompleteLibModule
  ]
})
export class PagesModule { }
