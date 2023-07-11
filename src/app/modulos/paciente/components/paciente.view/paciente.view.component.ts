import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticoModel } from 'src/app/models/diagnostico.model';
import { BodyitemDto } from 'src/app/models/dto/bodyitem.dto';
import { MacroModel } from 'src/app/models/macro.model';
import { MicroModel } from 'src/app/models/micro.model';
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
  diagnosticos:MacroModel[] = [];
  micros:MicroModel[] = [];

  micro_id:number = 0;

  page:number = 0;
  first:boolean=false;
  last:boolean=false;
  numberOfElements:number=150;
  totalPages:number=0;

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

    this.getDiagnosticPage(this.page)

    this.items = this.apiBody.getElements(this.id);
  }
  getDiagnosticPage(page:number){
    console.log("Diagnostic",page)
    this.api.diagnostico(this.id,page).subscribe({
      next : datos => {
        this.diagnosticos = datos['content'];
        this.last=datos.last;
        this.first=datos.first;
        this.totalPages=datos.totalPages;
        this.page=datos.number;
      },
      error: (e) => {
      }
    })
  }
  getMicroPage(page:number){
    this.api.micro(this.micro_id,page).subscribe({
      next : datos => {
        this.micros = datos['content'];
        this.last=datos.last;
        this.first=datos.first;
        this.totalPages=datos.totalPages;
        this.page=datos.number;
      },
      error: (e) => {
      }
    })

  }
  getMicro(micro:number){
    this.micro_id=micro;
    this.getMicroPage(0);

  }

  edad(fechaNacimiento:string){
    let timeDiff = Math.abs(Date.now() - new Date(fechaNacimiento).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }
}
