import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DiagnosticoRoutingModule } from './diagnostico-routing.module';
import { DiagnosticoComponent } from './diagnostico.component';
import { DiagnosticoFormComponent } from './components/diagnostico.form/diagnostico.form.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DiagnosticoComponent,
    DiagnosticoFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DiagnosticoRoutingModule
  ]
})
export class DiagnosticoModule { }
