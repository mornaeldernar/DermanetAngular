import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { TokenModel } from 'src/app/models/dto/token.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http : HttpClient) { }

  url = "http://localhost:8988/login";

  login(user:UserModel) {
    return this.http.post<TokenModel>(this.url, JSON.stringify(user));
  }
}
