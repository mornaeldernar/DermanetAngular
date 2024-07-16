import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { MacroModel } from 'src/app/models/macro.model';
import { DiagnosticoResponseModel } from 'src/app/models/dto/diagnostico.response.model';
import { PacienteSubmit } from 'src/app/models/dto/paciente.submit';
import { PatientsResponseModel } from 'src/app/models/dto/patients.response.model';
import { PacienteModel } from 'src/app/models/paciente.model';
import { LocalStorageService } from '../local-storage.service';
import { environment } from 'src/environment/environment';
import { PageingResponseDto } from 'src/app/models/dto/pageing.response.dto';
import { MicroModel } from 'src/app/models/micro.model';


@Injectable({
  providedIn: 'root'
})
export class PacienteApiService {
  size:number=50;

  constructor(private http : HttpClient, private storage : LocalStorageService) { }

  listPacientes(pagina:number) {
    return this.http.get<PageingResponseDto<PacienteModel>>(environment.apiUrl+environment.paciente+"?page="+pagina+"&size=50");
  }
  filtraPacientes(nombre:string,apellidos:string, pagina:number) {
    return this.http.get<PageingResponseDto<PacienteModel>>(environment.apiUrl+environment.paciente+"?name="+nombre+"&lastName="+apellidos+"&page="+pagina+"&size=50");
  }
  verPaciente(id:number) {
    return this.http.get<PacienteModel>(environment.apiUrl+environment.paciente+"/"+id);
  }
  diagnostico(id:number, page:number){
    return this.http.get<PageingResponseDto<MacroModel>>(environment.apiUrl+environment.macro+"?patient_id="+id+"&page="+page+"&size=50");
  }
  micro(id:number, page:number){
    return this.http.get<PageingResponseDto<MicroModel>>(environment.apiUrl+environment.micro+"?macro_id="+id+"&page="+page+"&size=50");
  }

  guardar(paciente: PacienteSubmit) {
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json;charset=UTF-8'}),
    }
    return this.http.post<any>(environment.apiUrl+environment.paciente,JSON.stringify(paciente),httpOptions);
  }
  subirHistoriaClinica(paciente: number, file: FormData) {
    return this.http.post<any>(environment.apiUrl+environment.file+"/"+paciente,file);
  }
  getHistoriaClinica(paciente: number,page:number) {
    return this.http.get<any>(environment.apiUrl+environment.file+"/"+paciente+"?page="+page+"&size=50");
  }
}
