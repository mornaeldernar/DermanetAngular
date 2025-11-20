import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse } from '@angular/common/http';
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
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const whitelistedUrls = ['/login', '/register', '/public']; // Añade aquí las rutas que no requieren token
    const isWhitelisted = whitelistedUrls.some(url => req.url.includes(url));

    if (isWhitelisted) {
      return next.handle(req);
    }

    const token = this.authService.getToken();

    if (token) {
      console.log("Agregando token a la peticion")
      req = this.addToken(req, token);
    }else{
      console.warn("no hay token disponible para agregar")
    }

    return next.handle(req).pipe(
      catchError(error => {
        console.error("error en la peticion", error.status, error.message);
        if (error.status === 401 && token) {
          console.error("error 401 detectado, intentando refrescar token");
          return this.handle401Error(req, next);
        }
        if (error.status === 403) {
          console.error("error 403 detectado, redirigiendo a unauthorized");
          this.router.navigate(['/unauthorized']);
        }
        if(error.status === 0){
          console.error("Error de conexion")
        }
        return throwError(() => error);
      })
    );


  }

  private addToken(request: HttpRequest<any>, token: string):HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
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
