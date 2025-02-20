import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';

//---MANTENIMIENTO RUTA PARA LISTAR USUARIO
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
// import { OdontologosComponent } from './mantenimientos/odontologos/odontologos.component';
// import { OdontologoComponent } from './mantenimientos/odontologos/odontologo.component';
// import { TratamientoComponent } from './mantenimientoclinicas/tratamiento/tratamiento.component';
// //import { authGuard } from '../guards/auth.guard';
import { AuthGuard } from '../guards/auth.guard';
import { VacationComponent } from './mantenimientos/vacation/vacation.component';
import { VacationsComponent } from './mantenimientos/vacations/vacations.component';
//import { ReservationinfComponent } from './reservation/reservationinf/reservationinf.component';
//import { ReservationinfemComponent } from './reservation/reservationinfem/reservationinfem.component';
//import { ReservationempleadoComponent } from './reservationemp/reservationempleado/reservationempleado.component';
//import { ReservationempleadosComponent } from './reservationemp/reservationempleados/reservationempleados.component';
import { PlatoComponent } from './menu/plato/plato.component';
import { PlatosComponent } from './menu/platos/platos.component';
import { VentamenusComponent } from './venta/ventamenus/ventamenus.component';
import { VentamenuComponent } from './venta/ventamenu/ventamenu.component';
import { VentareporteComponent } from './reporte/ventareporte/ventareporte.component';
// import { TratamientosComponent } from './mantenimientoclinicas/tratamiento/tratamientos.component';

const routes: Routes =[
  //---Crear rutas qeu esTaran protegidas al iniciar sesion--
  {
    path: 'dashboard',//ruta padre para que se Visualise  asi:
    component: PagesComponent,
    canActivate:[AuthGuard],
    //canActivate:[authGuard],
    //----RUTAS HIJAS--
    children:[
      { path: '', component: DashboardComponent},
      { path: 'grafica1', component: Grafica1Component},
      { path: 'progress', component: ProgressComponent},
      //{ path: '', redirectTo: '/dashboard', pathMatch: 'full'},//si no ingreso a ninguna ruta le direcciona a dashboard
      
      //---MANTENIMIENTO RUTA PARA LISTAR USUARIO
      { path: 'usuario', component: UsuariosComponent},
      { path: 'usuario/:id', component: UsuarioComponent},
      //----Mantenimiento para vacaciones---
      { path: 'vacation', component: VacationComponent},
      { path: 'vacation/:id', component: VacationsComponent},
      //-----Reservation admin----
      //{ path: 'reservation/:id', component: ReservationinfComponent},//info
      //---RESERVATION eMPLEADO
      //{ path: 'reservationem', component: ReservationempleadoComponent},
      //{ path: 'reservationems/:id', component: ReservationempleadosComponent},
      //-------------------##-PARA PLATO-##----------------
      { path: 'menu', component: PlatosComponent},
      { path: 'menus/:id', component: PlatoComponent},
      //-------#-Para venta-#--------
      { path: 'venta/:id', component: VentamenusComponent},//---formulario para mandar el id
      { path: 'ventas', component: VentamenuComponent},//--para lsitar y mandar el id
      //----REPORTE--
      { path: 'reporte', component: VentareporteComponent},

    ]
  },
  //--hasta aqui--
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}