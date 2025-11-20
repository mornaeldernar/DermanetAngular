import { Component, Input } from '@angular/core';
import { HistoriaClinicaModel } from 'src/app/models/historia-clinica.model';
import { PacienteApiService } from 'src/app/services/api/paciente.api.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent {
  @Input() pacienteId:number = 0;
  @Input() historiaClinica?:HistoriaClinicaModel;
  @Input() nombre?:string;
  url:string = "";
  constructor(private apiService: PacienteApiService
      ){

  }
  ngOnInit(){
    this.url = environment.apiUrl+environment.endpoints.file.historiaClinica+"/download/"+this.pacienteId+"/"+this.historiaClinica?.id;
  }
}
