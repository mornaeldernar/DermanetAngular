import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { TokenModel } from 'src/app/models/dto/token.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http : HttpClient) { }

  login(user:UserModel) {
    return this.http.post<TokenModel>(environment.apiUrl+environment.endpoints.auth.login, JSON.stringify(user));
  }
}
