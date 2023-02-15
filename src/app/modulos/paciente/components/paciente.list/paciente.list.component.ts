import { Component, OnInit } from '@angular/core';
import { PageModel } from 'src/app/models/dto/page.model';
import { FormBuilder } from '@angular/forms';
import { PacienteApiService } from 'src/app/services/api/paciente.api.service';
import { PacienteModel } from 'src/app/models/paciente.model';
import { Router,RouterLink } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-paciente.list',
  templateUrl: './paciente.list.component.html',
  styleUrls: ['./paciente.list.component.scss']
})
export class PacienteListComponent implements OnInit{

  pacientes : PacienteModel[] = [];
  pagina : PageModel = {number:20,size:0,totalElements:0,totalPages:0}

  constructor(private fb: FormBuilder,
    private router: Router,
    private api : PacienteApiService,
    private storage : LocalStorageService) {

  }
  ngOnInit(): void {

    let token = this.storage.consultar('token');
    console.log("token: " + token)
    if(token === ""){
      this.router.navigate(["login"])
    }

    this.api.listPacientes().subscribe({
      next : datos => {
        this.pacientes = datos;
        console.log(this.pacientes);
      },
      error: (e) => {
      }
    })
  }
  verPaciente(url:number) :void{
    this.router.navigate([url]);
  }


}
