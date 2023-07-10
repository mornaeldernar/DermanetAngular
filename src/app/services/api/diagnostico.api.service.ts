import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DiagnosticoModel } from 'src/app/models/diagnostico.model';
import { LocalStorageService } from '../local-storage.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoApiService {

  constructor(private http : HttpClient, private storage : LocalStorageService) { }
  listDiagnostics() {
    let token = localStorage.getItem("token") || "";
    if(token.startsWith("\"")){
      token = token.slice(1,-1)
    }
    return this.http.get<DiagnosticoModel[]>(environment.apiUrl+environment.image, {headers: {'Authorization':'Bearer '+token}});
  }
}
