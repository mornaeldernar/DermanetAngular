import { Component, Input } from '@angular/core';
import { HistoriaClinicaModel } from 'src/app/models/historia-clinica.model';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent {
  @Input() pacienteId:number = 0;
  @Input() historiaClinica?:HistoriaClinicaModel;
  @Input() nombre?:string;

  constructor(){
  }
}
