import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes =[
  //---Crear rutas qeu esTaran protegidas al iniciar sesion--
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  //--hasta aqui--
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class AuthRoutingModule {}