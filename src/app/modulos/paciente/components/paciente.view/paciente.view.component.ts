import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticoModel } from 'src/app/models/diagnostico.model';
import { BodyitemDto } from 'src/app/models/dto/bodyitem.dto';
import { PacienteModel } from 'src/app/models/paciente.model';
import { BodyApiService } from 'src/app/services/api/body.api.service';
import { PacienteApiService } from 'src/app/services/api/paciente.api.service';

@Component({
  selector: 'app-paciente.view',
  templateUrl: './paciente.view.component.html',
  styleUrls: ['./paciente.view.component.scss']
})
export class PacienteViewComponent  implements OnInit {
  id: number;
  titulo: string="";
  paciente:PacienteModel = {
    id:0,
    name:"",
    lastName:"",
    birthdate:new Date(),
    sex:""
  };
  items:BodyitemDto[] = [];
  diagnosticos:DiagnosticoModel[] = [];

  constructor(
    private api : PacienteApiService,
    private apiBody : BodyApiService,
    private route : ActivatedRoute) {
      this.id = this.route.snapshot.params['id']

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

    this.items = this.apiBody.getElements(this.id);
  }

  edad(fechaNacimiento:string){
    let timeDiff = Math.abs(Date.now() - new Date(fechaNacimiento).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }
}
