import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticoFormComponent } from './components/diagnostico.form/diagnostico.form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DiagnosticoFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DiagnosticoModule { }
