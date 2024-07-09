import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard  {

  constructor(private storage:LocalStorageService, private router: Router, private loginService:LoginService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let token = this.storage.consultar('token');
      if(token !== ""){
        this.loginService.updateLoggedIn(true);
        this.router.navigate(["/paciente"]);
        return false;
      }
      this.loginService.updateLoggedIn(false);
      return true;
  }

}
