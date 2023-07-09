import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { PacienteListComponent } from './components/paciente.list/paciente.list.component';
import { PacienteViewComponent } from './components/paciente.view/paciente.view.component';
import { PacienteFormComponent } from './components/paciente.form/paciente.form.component';
import { ImagenUbicacionComponent } from './components/imagen-ubicacion/imagen-ubicacion.component';
import { PacienteComponent } from './paciente.component';
import { PacienteRoutingModule } from './paciente-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PacienteListComponent,
    PacienteViewComponent,
    PacienteFormComponent,
    ImagenUbicacionComponent,
    PacienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PacienteRoutingModule,
    SharedModule,

  ]
})
export class PacienteModule { }
