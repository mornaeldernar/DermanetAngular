import { Component, OnInit } from '@angular/core';
import { DiagnosticoModel } from 'src/app/models/diagnostico.model';
import { PacienteModel } from 'src/app/models/paciente.model';
import { PacienteApiService } from 'src/app/services/api/paciente.api.service';

@Component({
  selector: 'app-paciente.view',
  templateUrl: './paciente.view.component.html',
  styleUrls: ['./paciente.view.component.scss']
})
export class PacienteViewComponent  implements OnInit {
  id: number = 1;
  paciente:PacienteModel = {
    id:0,
    name:"",
    lastName:"",
    birthdate:new Date()
  };
  diagnosticos:DiagnosticoModel[] = [];

  constructor(
    private api : PacienteApiService) {


  }
  ngOnInit(): void {
    this.api.verPaciente(this.id).subscribe({
      next : datos => {
        this.paciente = datos;
      },
      error: (e) => {
      }
    })

    this.api.diagnostico(this.id).subscribe({
      next : datos => {
        this.diagnosticos = datos._embedded.diagnostics;
      },
      error: (e) => {
      }
    })

  }
}
