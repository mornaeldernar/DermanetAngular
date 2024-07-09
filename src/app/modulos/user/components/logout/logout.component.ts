import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private storage: LocalStorageService,
    private router : Router,
    private loginService : LoginService){}

  ngOnInit(){
    this.storage.borrar("token");
    this.loginService.updateLoggedIn(false);
    this.router.navigate(["login"]);
  }
}
