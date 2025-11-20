import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtGuard implements CanActivate  {
  constructor(
    private authService:AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      return true;
    }

    const savedEmail = this.localStorageService.getItem('user');

    if (savedEmail) {
      // Redirigir a la pantalla de bloqueo si hay un correo electrónico guardado

      // Guardar la URL a la que intentaba acceder
      this.router.navigate(['/lock-screen'], {
        queryParams: { returnUrl: state.url }
      });
    } else {

      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
    }
    return false;
  }
}
