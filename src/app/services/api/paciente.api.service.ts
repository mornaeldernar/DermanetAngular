import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { DiagnosticoModel } from 'src/app/models/diagnostico.model';
import { DiagnosticoResponseModel } from 'src/app/models/dto/diagnostico.response.model';
import { PacienteSubmit } from 'src/app/models/dto/paciente.submit';
import { PatientsResponseModel } from 'src/app/models/dto/patients.response.model';
import { PacienteModel } from 'src/app/models/paciente.model';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteApiService {

  constructor(private http : HttpClient, private storage : LocalStorageService) { }

  url = "http://localhost:8988/patient";
  private token(): string{
    let token = this.storage.consultar("token");

    if(token.startsWith("\"")){
      token = token.slice(1,-1)
    }
    return token;
  }

  listPacientes() {
    return this.http.get<PacienteModel[]>(this.url, {headers: {'Authorization':'Bearer '+this.token()}});
  }
  verPaciente(id:number) {
    return this.http.get<PacienteModel>(this.url+"/"+id, {headers: {'Authorization':'Bearer '+this.token()}});
  }
  diagnostico(id:number){

    return this.http.get<DiagnosticoResponseModel>(this.url+"/"+id+"/diagnostic", {headers: {'Authorization':'Bearer '+this.token()}});
  }
  guardar(paciente: PacienteSubmit) : Observable<any>{
    let headers = new HttpHeaders({
      'Authorization':'Bearer '+this.token()
    });
    let body = JSON.stringify(paciente);
    return this.http.post(this.url,body,{headers: headers});
  }
}
