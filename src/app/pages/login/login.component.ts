import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenModel } from 'src/app/models/dto/token.model';
import { UserModel } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/api/user.api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error:boolean = false;
  user: FormGroup;
  tokenResponse? : TokenModel;

  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder,
      private api :UserApiService,
      private storage: LocalStorageService,
      private router : Router,
      private loginService: LoginService
    ) {
      this.user = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required]
    })
  }



  login(){
    const usuario : UserModel = {
      email : this.user.get("email")?.value,
      password : this.user.get("password")?.value,
    }
    this.api.login(usuario).subscribe({
      next : datos => {
        this.tokenResponse = datos;
        console.log(this.tokenResponse.token)
        this.storage.almacenar("token",this.tokenResponse.token);
        this.isLoggedIn = true;
        this.loginService.updateLoggedIn(true);
        this.router.navigate(["/paciente"]);
      },
      error: (e) => {
        this.error= true;
        this.isLoggedIn = true;
      }
    })
  }

}
