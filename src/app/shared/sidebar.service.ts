import { Injectable } from '@angular/core';
import { PermissionService } from '../services/permission.service';

export interface MenuItem {
  titulo: string;
  icono: string;
  url: string;
  moduleName?: string; // Name of the module for permission checking
  requiresPermission?: boolean; // If true, check permissions
  submenu?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  // Define all possible menu items with their module associations
  private allMenuItems: MenuItem[] = [
    {
      titulo: 'Dashboard',
      icono: 'nav-icon fas fa-tachometer-alt',
      url: '/dashboard/home',
      moduleName: 'dashboard',
      requiresPermission: true
    },
    {
      titulo: 'Calendario',
      icono: 'nav-icon fas fa-calendar-alt',
      url: '/calendario',
      moduleName: 'appointment',
      requiresPermission: true
    },
    {
      titulo: 'Pacientes',
      icono: 'nav-icon fas fa-user-injured',
      url: '/paciente',
      moduleName: 'patient',
      requiresPermission: true,
      submenu: [
        {
          titulo: 'Ver',
          icono: 'nav-icon fas fa-list',
          url: '/paciente',
          moduleName: 'patient',
          requiresPermission: true
        },
        {
          titulo: 'Agregar',
          icono: 'nav-icon fas fa-plus',
          url: '/paciente/new',
          moduleName: 'patient',
          requiresPermission: true
        }
      ]
    },
    {
      titulo: 'Doctores',
      icono: 'nav-icon fas fa-user-md',
      url: '/doctor',
      moduleName: 'doctor',
      requiresPermission: true
    },
    {
      titulo: 'Diagnósticos',
      icono: 'nav-icon fas fa-notes-medical',
      url: '/diagnostico',
      moduleName: 'diagnostic',
      requiresPermission: true
    },
    {
      titulo: 'Lesiones',
      icono: 'nav-icon fas fa-disease',
      url: '/lesion',
      moduleName: 'lesion',
      requiresPermission: true // Available to all authenticated users
    },
    {
      titulo: 'Administración',
      icono: 'nav-icon fas fa-cog',
      url: '/admin-permissions',
      moduleName: 'admin',
      requiresPermission: true, // Handled by RoleGuard
      submenu: [
        {
          titulo: 'Roles y Permisos',
          icono: 'nav-icon fas fa-user-shield',
          url: '/admin-permissions',
          requiresPermission: true,
          moduleName: 'admin',
        },
        {
          titulo: 'Registrar Personal',
          icono: 'nav-icon fas fa-user-plus',
          url: '/user/register-staff',
          requiresPermission: true,
          moduleName: 'admin',
        },
        {
          titulo: 'Ver Personal',
          icono: 'nav-icon fas fa-users',
          url: '/user/staff-list',
          requiresPermission: true,
          moduleName: 'admin',
        }
      ]
    }
  ];

  constructor(private permissionService: PermissionService) { }

  /**
   * Get menu items filtered by user permissions
   */
  getMenuItems(): MenuItem[] {
    const permissions = this.permissionService.getCurrentPermissions();
    return this.filterMenuByPermissions(this.allMenuItems, permissions);
  }

  /**
   * Filter menu items based on user permissions
   */
  private filterMenuByPermissions(items: MenuItem[], permissions: any): MenuItem[] {
    return items.filter(item => {
      // If item doesn't require permission check, include it
      if (!item.requiresPermission) {
        // Still filter submenu if it exists
        if (item.submenu) {
          item.submenu = this.filterMenuByPermissions(item.submenu, permissions);
          // Only show parent if it has visible submenu items
          return item.submenu.length > 0;
        }
        return true;
      }

      // Check if user has permission for this module
      if (item.moduleName) {
        const hasAccess = this.permissionService.canAccessModule(item.moduleName);
        if (!hasAccess) {
          return false;
        }

        // Filter submenu items
        if (item.submenu) {
          item.submenu = this.filterMenuByPermissions(item.submenu, permissions);
          // Only show parent if it has visible submenu items
          return item.submenu.length > 0;
        }

        return true;
      }

      // If no module name specified but requires permission, don't show
      return false;
    });
  }

  /**
   * Check if user can create in a module (for "Agregar" submenu items)
   */
  canCreate(moduleName: string): boolean {
    return this.permissionService.hasPermission(moduleName, 'create');
  }

  /**
   * Check if user is admin (has access to admin module)
   */
  isAdmin(): boolean {
    const user = this.permissionService['authService'].getCurrentUser();
    return user?.roles?.some((role: string) => role.toUpperCase() === 'ADMIN') || false;
  }
}
