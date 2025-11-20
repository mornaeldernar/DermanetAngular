import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error:boolean = false;
  errorMessage: string = '';
  user: FormGroup;
  loading:boolean = false;

  constructor(private fb: FormBuilder,
      private router : Router,
      private loginService: LoginService,
      private authService: AuthService
    ) {
      this.user = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(["/paciente"]);
    }
  }
  get f(){
    return this.user.controls;
  }
  login(){
    if(this.user.invalid){
      this.user.markAllAsTouched();
      return;
    }

    this.error = false;
    this.loading = true;
    this.errorMessage = '';

    const usuario : UserModel = {
      email : this.user.get("email")?.value,
      password : this.user.get("password")?.value,
    }
    this.authService.login(usuario).subscribe({
      next : (datos) => {
        this.loginService.updateLoggedIn(true);
        this.router.navigate(["/paciente"]);
      },
      error: (e) => {
        this.error= true;
        this.loading = false;
        if(e.status == 401){
          this.errorMessage = "Credenciales incorrectas";
        } else if ( e.status === 0){
          this.errorMessage = "No se pudo conectar con el servidor";
        }else {
          this.errorMessage = e.error?.message || "Error al iniciar sesión";
        }
        console.error("Error en login:", e)
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

}
