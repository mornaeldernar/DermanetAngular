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

  //Propiedades de paginacion
  page:number = 0;
  first:boolean=false;
  last:boolean=false;
  numberOfElements:number=150;
  totalPages:number=0;
  totalElements:number=0;
  rangeStart = 0;
  rangeEnd = 0;

  //Formularios
  nombre=new FormControl("");
  apellidos=new FormControl("");
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
        this.totalElements=datos.totalElements;
        this.page=datos.number;
        
        this.calculateRange()
      },
      error: (e) => {
      }
    })
  }
  searchPage(page:number){
    console.log(page)
    let nombre = this.nombre.value || "";
    let apellidos = this.apellidos.value || "";
    this.api.filtraPacientes(nombre,apellidos,page).subscribe({
      next : datos => {
        this.pacientes = datos['content'];
        this.last=datos.last;
        this.first=datos.first;
        this.totalPages=datos.totalPages;
        this.page=datos.number;

        this.calculateRange()
      },
      error: (e) => {
      }
    })
  }
  calculateRange() : void {
    if(this.pacientes.length === 0){
      this.rangeStart = 0;
      this.rangeEnd = 0;
      return
    }

    this.rangeStart = (this.page * 50) + 1
    this.rangeEnd = this.rangeStart + this.pacientes.length - 1;
    if (this.rangeEnd > this.totalElements) {
      this.rangeEnd = this.totalElements;
    }
  }
  verPaciente(url:number) :void{
    this.router.navigate([url]);
  }
  edad(fechaNacimiento:string){
    let timeDiff = Math.abs(Date.now() - new Date(fechaNacimiento).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }
  formatNumber(num:number): string{
    return num.toLocaleString('es-MX');
  }
  // Agregar estos métodos a la clase

  getInitials(name: string): string {
    name = name.trim()
    if (!name) return '?';
    const words = name.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length >= 2) {

      return (words[0].trim()[0] + words[1].trim()[0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  clearSearch(): void {
    this.nombre.setValue('');
    this.apellidos.setValue('');
    this.getPage(0);
  }
}
