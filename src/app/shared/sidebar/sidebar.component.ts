import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems=signal<any[]>([]);
  jwt=signal<string>("");
  email=signal<string>("");
  claims=signal<string[]>([""]);
  isAdmin=signal<boolean>(false);

  constructor( private storage: LocalStorageService, private sideBarServices: SidebarService, private router:Router) {
    this.menuItems.set(this.sideBarServices.menu);
    this.jwt.set(this.storage.consultar("token"));
    let decodedJwt = JSON.parse(window.atob(this.jwt().split(".")[1]));
    this.email.set(decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'])

    if(typeof decodedJwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] !== 'undefined') {
      this.claims.set(decodedJwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
      this.isAdmin.set(this.claims().includes("admin"))
    }
  }
  ngOnInit(): void {
  }

  logout(){
    this.router.navigateByUrl('/logout');
  }

}
