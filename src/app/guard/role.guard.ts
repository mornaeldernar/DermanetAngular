import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const user = this.authService.getCurrentUser();
        const roles: string[] = user?.roles || [];
        console.table(roles);
        if (roles.includes('ADMIN')) {
            return true;
        }
        // Redirect to access denied or home
        this.router.navigate(['/access-denied'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
