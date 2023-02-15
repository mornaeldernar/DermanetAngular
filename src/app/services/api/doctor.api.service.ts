import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';
import { DoctorModel } from 'src/app/models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorApiService {

  constructor(private http : HttpClient, private storage : LocalStorageService) { }

  url = "http://localhost:8988/doctor";

  listDoctors() {
    let token = localStorage.getItem("token") || "";
    if(token.startsWith("\"")){
      token = token.slice(1,-1)
    }
    return this.http.get<DoctorModel[]>(this.url, {headers: {'Authorization':'Bearer '+token}});
  }
}
