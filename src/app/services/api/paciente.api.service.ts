import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { DiagnosticoModel } from 'src/app/models/diagnostico.model';
import { DiagnosticoResponseModel } from 'src/app/models/dto/diagnostico.response.model';
import { PacienteSubmit } from 'src/app/models/dto/paciente.submit';
import { PatientsResponseModel } from 'src/app/models/dto/patients.response.model';
import { PacienteModel } from 'src/app/models/paciente.model';
import { LocalStorageService } from '../local-storage.service';
import { environment } from 'src/environment/environment';
import { PageingResponseDto } from 'src/app/models/dto/pageing.response.dto';


@Injectable({
  providedIn: 'root'
})
export class PacienteApiService {

  constructor(private http : HttpClient, private storage : LocalStorageService) { }

  private token(): string{
    let token = this.storage.consultar("token");

    if(token.startsWith("\"")){
      token = token.slice(1,-1)
    }
    return token;
  }

  listPacientes(pagina:number) {
    return this.http.get<PageingResponseDto<PacienteModel>>(environment.apiUrl+environment.paciente+"?page="+pagina+"&size=150", {headers: {'Authorization':'Bearer '+this.token()}});
  }
  filtraPacientes(nombre:string,pagina:number) {
    return this.http.get<PageingResponseDto<PacienteModel>>(environment.apiUrl+environment.paciente+"?name="+nombre+"&page="+pagina+"&size=150", {headers: {'Authorization':'Bearer '+this.token()}});
  }
  verPaciente(id:number) {
    return this.http.get<PacienteModel>(environment.apiUrl+environment.paciente+"/"+id, {headers: {'Authorization':'Bearer '+this.token()}});
  }
  diagnostico(id:number){

    return this.http.get<DiagnosticoResponseModel>(environment.apiUrl+environment.image+"/"+id, {headers: {'Authorization':'Bearer '+this.token()}});
  }
  guardar(paciente: PacienteSubmit) {
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json;charset=UTF-8','Authorization':'Bearer '+this.token()})
    }
    return this.http.post<any>(environment.apiUrl+environment.paciente,JSON.stringify(paciente),httpOptions);
  }

}
