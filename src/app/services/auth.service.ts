import { Injectable, Injector } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { LocalStorageService } from "./local-storage.service";
import { environment } from "src/environment/environment";
import { Router } from "@angular/router";
import { UserModel } from "../models/user.model";
import { TokenModel } from "../models/dto/token.model";
import { PermissionService } from "./permission.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user';
  private tokenExpirationTimer: any;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private injector: Injector
  ) { }

  login(user: UserModel): Observable<TokenModel> {
    const loginUrl = `${environment.apiUrl}${environment.endpoints.auth.login}`;
    return this.http.post<TokenModel>(loginUrl, user).pipe(
      tap((response: TokenModel) => {
        const expiresIn = environment.config.tokenExpirationTime; // Default to 1 hour if not provided
        this.setToken(response.token + "", expiresIn);

        if (user.email) {
          this.localStorageService.setItem(this.USER_KEY, { email: user.email });
        }
      }),
      catchError(error => {
        console.error('Error en login', error);
        return throwError(() => error);
      })
    );
  }
  setToken(token: string, expiresIn: number, refreshToken?: string): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    token = token.trim();
    this.localStorageService.setItem(this.TOKEN_KEY, token);
    this.localStorageService.setItem('token_expiration', expirationDate.toISOString());
    if (refreshToken) {
      this.localStorageService.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }
    this.autoLogout(expiresIn * 1000);
    this.isAuthenticatedSubject.next(true);
  }
  private hasValidToken(): boolean {
    const token = this.getToken();
    const expiration = this.localStorageService.getItem('token_expiration');
    if (!token || !expiration) return false;

    return new Date(expiration) > new Date();
  }
  private autoLogout(expirationDuration: number): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout(): void {
    this.localStorageService.removeItem(this.TOKEN_KEY);
    this.localStorageService.removeItem(this.REFRESH_TOKEN_KEY);
    this.localStorageService.removeItem('token_expiration');
    this.localStorageService.removeItem(this.USER_KEY);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.isAuthenticatedSubject.next(false);

    // Lazily inject PermissionService to avoid circular dependency
    const permissionService = this.injector.get(PermissionService);
    permissionService.clearPermissions();

    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.localStorageService.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getItem(this.REFRESH_TOKEN_KEY);
  }

  getCurrentUser(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      // Decode JWT token to extract claims
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Extract role claim - JWT uses specific claim names
      const roleClaim = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const emailClaim = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      const idClaim = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      return {
        email: emailClaim,
        id: idClaim,
        roles: roleClaim ? (Array.isArray(roleClaim) ? roleClaim : [roleClaim]) : []
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  isAuthenticated(): boolean {
    return this.hasValidToken();
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<any>(`${environment.apiUrl}${environment.endpoints.auth.refresh}`, {
      refreshToken: refreshToken
    }).pipe(
      tap(response => {
        this.setToken(response.jwt, response.expiresIn || 3600, response.refreshToken);
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }
}
