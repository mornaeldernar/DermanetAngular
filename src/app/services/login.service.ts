import { Injectable } from '@angular/core';
import { BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedInChanged = this.isLoggedIn.asObservable();

  updateLoggedIn(loggedIn:boolean){
    this.isLoggedIn.next(loggedIn);
  }
}
