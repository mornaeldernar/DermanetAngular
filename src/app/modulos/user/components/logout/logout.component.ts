import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(
    private storage: LocalStorageService,
    private router : Router){}

  ngOnInit(){
    this.storage.borrar("token");
    this.router.navigate(["login"]);
  }
}
