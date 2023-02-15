import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { PacienteListComponent } from './components/paciente.list/paciente.list.component';
import { PacienteViewComponent } from './components/paciente.view/paciente.view.component';
import { PacienteFormComponent } from './components/paciente.form/paciente.form.component';


@NgModule({
  declarations: [
    PacienteListComponent,
    PacienteViewComponent,
    PacienteFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PacienteModule { }
