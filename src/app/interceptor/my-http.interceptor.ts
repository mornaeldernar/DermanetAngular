import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const whitelistedUrls = ['/login', '/register', '/public']; // Añade aquí las rutas que no requieren token
    const isWhitelisted = whitelistedUrls.some(url => req.url.includes(url));

    if (isWhitelisted) {
      return next.handle(req);
    }

    const token = this.authService.getToken();

    if (token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401 && token) {
          return this.handle401Error(req, next);
        }
        if (error.status === 403) {
          this.router.navigate(['/unauthorized']);
        }
        if (error.status === 0) {
          console.error("Error de conexion")
        }
        return throwError(() => error);
      })
    );


  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    // Don't set Content-Type for FormData requests (file uploads)
    // The browser will set it automatically with the correct boundary
    const headers: { [key: string]: string } = {
      'Authorization': `Bearer ${token}`
    };

    // Only add Content-Type for non-FormData requests
    if (!(request.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    return request.clone({
      setHeaders: headers
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => next.handle(this.addToken(request, jwt)))
      );
    }
  }


}
