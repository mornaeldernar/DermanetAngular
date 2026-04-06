import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';
import { DoctorModel } from 'src/app/models/doctor.model';
import { environment } from 'src/environment/environment';
import { PageingResponseDto } from 'src/app/models/dto/pageing.response.dto';

@Injectable({
  providedIn: 'root'
})
export class DoctorApiService {

  constructor(private http: HttpClient, private storage: LocalStorageService) { }


  listDoctors() {
    let token = localStorage.getItem("token") || "";
    if (token.startsWith("\"")) {
      token = token.slice(1, -1)
    }
    return this.http.get<PageingResponseDto<DoctorModel>>(environment.apiUrl + environment.endpoints.doctor, { headers: { 'Authorization': 'Bearer ' + token } });
  }

  getDoctorById(id: number) {
    let token = localStorage.getItem("token") || "";
    if (token.startsWith("\"")) {
      token = token.slice(1, -1)
    }
    return this.http.get<DoctorModel>(environment.apiUrl + environment.endpoints.doctor + '/' + id, { headers: { 'Authorization': 'Bearer ' + token } });
  }

  createDoctor(doctor: any) {
    let token = localStorage.getItem("token") || "";
    if (token.startsWith("\"")) {
      token = token.slice(1, -1)
    }
    return this.http.post<DoctorModel>(environment.apiUrl + environment.endpoints.doctor, doctor, { headers: { 'Authorization': 'Bearer ' + token } });
  }

  updateDoctor(id: number, doctor: any) {
    let token = localStorage.getItem("token") || "";
    if (token.startsWith("\"")) {
      token = token.slice(1, -1)
    }
    return this.http.put<void>(environment.apiUrl + environment.endpoints.doctor + '/' + id, doctor, { headers: { 'Authorization': 'Bearer ' + token } });
  }

  filtraDoctors(nombre: string, apellidos: string, pagina: number) {
    let token = localStorage.getItem("token") || "";
    if (token.startsWith("\"")) {
      token = token.slice(1, -1)
    }
    return this.http.get<PageingResponseDto<DoctorModel>>(
      environment.apiUrl + environment.endpoints.doctor + "?name=" + nombre + "&lastName=" + apellidos + "&page=" + pagina + "&size=50",
      { headers: { 'Authorization': 'Bearer ' + token } }
    );
  }
}
