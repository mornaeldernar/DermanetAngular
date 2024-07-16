import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(private storage : LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var jwtToken = this.token()
    // if there is a token, clone the request and set the correct
    // authorization header, if not => just use the old request
    const requestToHandle = jwtToken
      ? req.clone({
        headers: req.headers.set('authorization', `Bearer ${jwtToken}`)
      })
      : req;
    return next.handle(requestToHandle);
  }

  private token(): string{
    let token = this.storage.consultar("token");

    if(token.startsWith("\"")){
      token = token.slice(1,-1)
    }
    return token;
  }

}
