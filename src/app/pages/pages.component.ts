import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {
  private authSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    console.log('PagesComponent - Constructor ejecutado');
  }

  ngOnInit(): void {
    console.log('PagesComponent - ngOnInit ejecutado');

    // Verificar autenticación al iniciar
    if (!this.authService.isAuthenticated()) {
      console.log('PagesComponent - Usuario no autenticado, redirigiendo a login');
      this.router.navigate(['/login']);
      return;
    }

    // Escuchar cambios de ruta para scroll to top
    this.authSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
