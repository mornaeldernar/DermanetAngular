import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticoFormComponent } from './components/diagnostico.form/diagnostico.form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiagnosticoComponent } from './diagnostico.component';



@NgModule({
  declarations: [
    DiagnosticoFormComponent,
    DiagnosticoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DiagnosticoModule { }
