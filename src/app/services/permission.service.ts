import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';
import { AuthService } from './auth.service';

export interface UserPermissions {
    [moduleName: string]: {
        canRead: boolean;
        canWrite: boolean;
        canCreate: boolean;
        canDelete: boolean;
        canImport: boolean;
        canExport: boolean;
    };
}

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    private permissionsSubject = new BehaviorSubject<UserPermissions>({});
    public permissions$ = this.permissionsSubject.asObservable();

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    /**
     * Load user permissions from backend based on their role
     */
    loadUserPermissions(): Observable<UserPermissions> {
        const user = this.authService.getCurrentUser();

        if (!user || !user.roles || user.roles.length === 0) {
            console.warn('No user roles found');
            this.permissionsSubject.next({});
            return of({});
        }

        // For now, we'll get the first role
        // In a more complex system, you might need to merge permissions from multiple roles
        const primaryRole = user.roles[0];

        return this.http.get<any[]>(`${environment.apiUrl}/role`).pipe(
            map(roles => {
                // Find the user's role
                const userRole = roles.find(r => r.name.toUpperCase() === primaryRole.toUpperCase());

                if (!userRole || !userRole.permissions) {
                    console.warn('Role not found or has no permissions:', primaryRole);
                    return {};
                }

                // Convert permissions array to object keyed by module name
                const permissions: UserPermissions = {};
                userRole.permissions.forEach((perm: any) => {
                    permissions[perm.moduleName.toLowerCase()] = {
                        canRead: perm.canRead,
                        canWrite: perm.canWrite,
                        canCreate: perm.canCreate,
                        canDelete: perm.canDelete,
                        canImport: perm.canImport,
                        canExport: perm.canExport
                    };
                });

                return permissions;
            }),
            tap(permissions => {
                this.permissionsSubject.next(permissions);
            }),
            catchError(error => {
                this.permissionsSubject.next({});
                return of({});
            })
        );
    }

    /**
     * Check if user has permission for a specific module and action
     */
    hasPermission(moduleName: string, action: 'read' | 'write' | 'create' | 'delete' | 'import' | 'export'): boolean {
        const permissions = this.permissionsSubject.value;
        const modulePerms = permissions[moduleName.toLowerCase()];

        if (!modulePerms) {
            return false;
        }

        const actionMap = {
            'read': modulePerms.canRead,
            'write': modulePerms.canWrite,
            'create': modulePerms.canCreate,
            'delete': modulePerms.canDelete,
            'import': modulePerms.canImport,
            'export': modulePerms.canExport
        };

        return actionMap[action] || false;
    }

    /**
     * Check if user has read access to a module (minimum requirement to show in menu)
     */
    canAccessModule(moduleName: string): boolean {
        return this.hasPermission(moduleName, 'read');
    }

    /**
     * Get current permissions
     */
    getCurrentPermissions(): UserPermissions {
        return this.permissionsSubject.value;
    }

    /**
     * Clear permissions (on logout)
     */
    clearPermissions(): void {
        this.permissionsSubject.next({});
    }
}
