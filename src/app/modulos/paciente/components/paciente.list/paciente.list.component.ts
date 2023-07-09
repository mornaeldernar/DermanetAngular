import { Component, OnInit } from '@angular/core';
import { PageModel } from 'src/app/models/dto/page.model';
import { FormBuilder, FormControl } from '@angular/forms';
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

  page:number = 0;
  first:boolean=false;
  last:boolean=false;
  numberOfElements:number=150;
  totalPages:number=0;
  nombre=new FormControl("");
  constructor(private fb: FormBuilder,
    private router: Router,
    private api : PacienteApiService,
    private storage : LocalStorageService) {
  }
  ngOnInit(): void {
    this.getPage(this.page);
  }
  getPage(page:number){
    this.api.listPacientes(page).subscribe({
      next : datos => {
        this.pacientes = datos['content'];
        this.last=datos.last;
        this.first=datos.first;
        this.totalPages=datos.totalPages;
        this.page=datos.number;
      },
      error: (e) => {
      }
    })
  }
  searchPage(page:number){
    console.log(page)
    let nombre = this.nombre.value || ""
    this.api.filtraPacientes(nombre,page).subscribe({
      next : datos => {
        this.pacientes = datos['content'];
        this.last=datos.last;
        this.first=datos.first;
        this.totalPages=datos.totalPages;
        this.page=datos.number;
      },
      error: (e) => {
      }
    })
  }
  verPaciente(url:number) :void{
    this.router.navigate([url]);
  }
  edad(fechaNacimiento:string){
    let timeDiff = Math.abs(Date.now() - new Date(fechaNacimiento).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

}
