import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { PacienteApiService } from 'src/app/services/api/paciente.api.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-ver-historia-clinica',
  templateUrl: './ver-historia-clinica.component.html',
  styleUrls: ['./ver-historia-clinica.component.scss']
})
export class VerHistoriaClinicaComponent implements OnInit{
  id: number;
  hcId: number;
  nombre: string='Paciente';
  url:any;

  constructor(
    private location: Location,
    private api : PacienteApiService,
    private route : ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
    this.hcId = this.route.snapshot.params['hcid'];
    this.nombre = this.route.snapshot.params['nombre'];
    this.url = environment.apiUrl+environment.endpoints.file.historiaClinica+"/download/"+this.id+"/"+this.hcId;
    console.log(`url historia clinica: ${this.url}`)
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.hcId = +params['hcid'];

      this.loadHistoriaClinica();
    })
  }

  loadHistoriaClinica() : void {
    if (this.id && this.hcId){
      
    }
  }
  back(): void {
    this.location.back()
  }
}
