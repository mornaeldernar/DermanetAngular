import {  Component } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {

  img = "/assets/logo.png";
  logged : boolean = false;

  constructor(private router: Router,  private storage: LocalStorageService){

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          // Show progress spinner or progress bar
        let token = this.storage.consultar('token');
        if(token === ""){
          this.logged = false;
        }else {
          this.logged = true;
        }
      }
    });
  }
}
