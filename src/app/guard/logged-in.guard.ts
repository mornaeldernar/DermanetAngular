import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoggedInGuard implements CanActivate{

  constructor(private router: Router, private authService:AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log('LoggedInGuard - Verificando acceso a login');

    const isAuthenticated = this.authService.isAuthenticated();
    console.log('LoggedInGuard - Usuario autenticado:', isAuthenticated);

    // Si el usuario YA está autenticado, redirigir al dashboard
    if (isAuthenticated) {
      console.log('LoggedInGuard - Usuario ya autenticado, redirigiendo a paciente');

      // Intentar obtener la URL de retorno o ir a /paciente por defecto
      const returnUrl = route.queryParams['returnUrl'] || '/paciente';
      this.router.navigate([returnUrl]);

      return false;
    }

    // Si NO está autenticado, permitir acceso a la página de login
    console.log('LoggedInGuard - Permitiendo acceso a login');
    return true;
  }
}
