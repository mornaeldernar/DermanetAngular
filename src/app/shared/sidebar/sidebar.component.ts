import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SidebarService } from '../sidebar.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideDown', [
      state('closed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('open', style({
        height: '*',
        overflow: 'visible',
        opacity: '1'
      })),
      transition('closed <=> open', animate('300ms ease-in-out'))
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems = signal<any[]>([]);
  jwt = signal<string>("");
  email = signal<string>("");
  claims = signal<string[]>([""]);
  isAdmin = signal<boolean>(false);
  openMenus: { [key: string]: boolean } = {};

  private authSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(
    private storage: LocalStorageService,
    private sideBarServices: SidebarService,
    private router: Router,
    private authService: AuthService
  ) {
    console.log('SidebarComponent - Constructor ejecutado');
    this.loadUserData();
  }

  ngOnInit(): void {
    console.log('SidebarComponent - ngOnInit ejecutado');

    // Cargar menú
    this.menuItems.set(this.sideBarServices.menu);

    // Suscribirse a cambios de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuth => {
      console.log('SidebarComponent - Estado de autenticación cambió:', isAuth);
      if (isAuth) {
        this.loadUserData();
      } else {
        this.clearUserData();
      }
    });

    // Mantener el menú abierto según la ruta actual
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateMenuStateFromUrl(event.url);
    });

    // Establecer estado inicial del menú según la URL actual
    this.updateMenuStateFromUrl(this.router.url);
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
  }

  private loadUserData(): void {
    try {
      // Intentar obtener el token de múltiples fuentes
      let token = this.storage.consultar("token") ||
                  this.storage.consultar("jwt_token") ||
                  this.authService.getToken();

      this.jwt.set(token || "");

      if (!this.jwt() || this.jwt() === "") {
        console.log('SidebarComponent - No hay token disponible');
        return;
      }

      console.log('SidebarComponent - Token encontrado, decodificando...');

      // Decodificar JWT
      const parts = this.jwt().split(".");
      if (parts.length !== 3) {
        console.error('SidebarComponent - Token JWT inválido');
        return;
      }

      const decodedJwt = JSON.parse(window.atob(parts[1]));
      console.log('SidebarComponent - JWT decodificado:', decodedJwt);

      // Extraer email
      const emailClaim = decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      if (emailClaim) {
        this.email.set(emailClaim);
        console.log('SidebarComponent - Email establecido:', emailClaim);
      }

      // Extraer roles
      const roleClaim = decodedJwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (typeof roleClaim !== 'undefined') {
        const roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];
        this.claims.set(roles);
        this.isAdmin.set(roles.includes("admin") || roles.includes("Admin"));
        console.log('SidebarComponent - Roles establecidos:', roles, 'isAdmin:', this.isAdmin());
      }
    } catch (error) {
      console.error('SidebarComponent - Error cargando datos de usuario:', error);
      this.clearUserData();
    }
  }

  private clearUserData(): void {
    this.jwt.set("");
    this.email.set("");
    this.claims.set([""]);
    this.isAdmin.set(false);
  }

  // Actualizar el estado del menú según la URL actual
  private updateMenuStateFromUrl(url: string): void {
    console.log('SidebarComponent - Actualizando estado del menú para URL:', url);

    this.menuItems().forEach(item => {
      if (item.submenu) {
        // Verificar si algún submenu coincide con la URL actual
        const hasActiveSubmenu = item.submenu.some((sub: any) =>
          url.includes(sub.url)
        );

        if (hasActiveSubmenu) {
          this.openMenus[item.titulo] = true;
          console.log('SidebarComponent - Menú abierto:', item.titulo);
        }
      }
    });
  }

  // Toggle submenu
  toggleMenu(itemTitle: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.openMenus[itemTitle] = !this.openMenus[itemTitle];
    console.log('SidebarComponent - Toggle menú:', itemTitle, this.openMenus[itemTitle]);
  }

  // Verificar si el menú está abierto
  isMenuOpen(itemTitle: string): boolean {
    return this.openMenus[itemTitle] || false;
  }

  // Verificar si un item debe mostrarse según permisos
  shouldShowItem(item: any): boolean {
    return !item.admin || (item.admin && this.isAdmin());
  }

  logout(): void {
    console.log('SidebarComponent - Cerrando sesión');
    this.authService.logout();
  }
}
