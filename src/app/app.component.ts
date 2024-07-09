import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = environment.title;
  apiUrl = environment.apiUrl;
  isLogedin:boolean = false;
  constructor(private loginService: LoginService){
    //this.isLogedin = loginService.isLoggedIn;
  }
  ngOnInit(): void {
    this.loginService.isLoggedInChanged.subscribe((data)=>{
      this.isLogedin = data;
    })
  }
}
