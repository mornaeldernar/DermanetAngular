import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.scss']
})
export class LockscreenComponent implements OnInit {
  lockForm: FormGroup;
  userEmail: string = '';
  returnUrl: string = '';


  error:boolean = false;
  errorMessage: string = '';
  loading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private loginService: LoginService
  ) {
    this.lockForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Obtener el email guardado
    const storedUser = this.localStorageService.getItem('user') || '';

    // Si no hay email, redirigir a login
    if (!storedUser) {
      this.router.navigate(['/login']);
      return;
    }
    try {
      if(typeof storedUser === 'string') {
        const userObject = JSON.parse(storedUser);
        this.userEmail = userObject.email || '';
      }
      else if(typeof storedUser === 'object' ) {
        this.userEmail = storedUser.email || '';
      }
    } catch (error) {
      console.error('Error al analizar el objeto JSON:', error);
      this.router.navigate(['/login']);
      return;
    }
    // Obtener la URL de retorno
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/home';
  }

  onUnlock(): void {
    if (this.lockForm.valid) {
      const usuario : UserModel = {
        email : this.userEmail,
        password : this.lockForm.get("password")?.value,
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
      });
    } else {
      console.log('⚠️ Formulario inválido');
      console.log('Errores:', this.lockForm.get('password')?.errors);
    }
  }
  signInDifferentUser(): void {
    console.log('👤 Cambiando de usuario');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
