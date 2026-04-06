import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const user = this.authService.getCurrentUser();

        // Check if there are denied roles in route data
        const deniedRoles = route.data['deniedRoles'] as string[] || [];

        // If no denied roles specified, allow access
        if (deniedRoles.length === 0) {
            return true;
        }

        // Check if user has any of the denied roles
        const hasRestrictedRole = user?.roles?.some((role: string) =>
            deniedRoles.some(denied => role.toLowerCase() === denied.toLowerCase())
        );

        if (hasRestrictedRole) {
            console.warn('Access denied: User role is restricted from this route');
            // Redirect to patient list or unauthorized page
            this.router.navigate(['/paciente']);
            return false;
        }

        return true;
    }
}
