
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { BodyitemDto } from 'src/app/models/dto/bodyitem.dto';
import { HistoriaClinicaModel } from 'src/app/models/historia-clinica.model';
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
  fileName:string = '';
  uploadProgress?:number;
  uploadSub?: Subscription;
  data?: string;
  historiasClinicas: HistoriaClinicaModel[] = [];

  paciente:PacienteModel = {
    id:0,
    name:"",
    lastName:"",
    birthdate:new Date(),
    sex:"",
    profesion:"",
    phone:""
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


  hcPage:number = 0;
  hcFirst:boolean=false;
  hcLast:boolean=false;
  hcNumberOfElements:number=150;
  hcTotalPages:number=0;

  constructor(
    private api : PacienteApiService,
    private apiBody : BodyApiService,
    private route : ActivatedRoute,
  ) {
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
    this.getHistoriasClinicas(0);
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

  getHistoriasClinicas(page:number){
    this.api.getHistoriaClinica(this.id,page).subscribe({
      next : datos => {
        this.historiasClinicas = datos['content'];
        this.hcLast=datos.last;
        this.hcFirst=datos.first;
        this.hcTotalPages=datos.totalPages;
        this.hcPage=datos.number;
      },
      error: (e) => {
      }
    })

  }

  edad(fechaNacimiento:string){
    let timeDiff = Math.abs(Date.now() - new Date(fechaNacimiento).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0];
    if(file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file",file);

      const upload$ = this.api.subirHistoriaClinica(this.id, formData).subscribe({
        next: datos => {
          this.fileName = "";
          var x = {id:datos.id,name:datos.fileName,location:datos.location, createdAt:new Date};
          this.historiasClinicas.unshift(x);
          //this.historiasClinicas.concat(x);
        },
        error: (e) => {
        }
      })
    }
  }
  cancelUpload(){
    this.reset();
  }
  reset() {
    this.uploadProgress = undefined;
    this.uploadSub = undefined;
  }
}
