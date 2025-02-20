import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({

    email     :['', [Validators.required, Validators.email]],
    password  :['', Validators.required],
    remember  :[false],
  });


  constructor( private router : Router,
               private fb : FormBuilder,
               private usuarioService : UsuarioService){}

  // ngOnInit(): void {
    
  // }

  login(){

    this.usuarioService.login( this.loginForm.value)
    //this.usuarioService.login( this.loginForm.value)
      .subscribe( resp => {

        console.log(resp)
        // if( this.loginForm.get('remember')?.value){
        //   localStorage.setItem('email', this.loginForm.get('email')?.value );
        // } else {
        //   localStorage.removeItem('email');
        // }
        this.router.navigateByUrl('/');
      }, (err) =>{
        Swal.fire('Error', err.error.msg, 'error');
      });
    //this.router.navigateByUrl('/');
    //console.log( this.loginForm.value);
  }

}
