import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorListaComponent } from './components/doctor.lista/doctor.lista.component';
import { DoctorFormComponent } from './components/doctor.form/doctor.form.component';
import { DoctorViewComponent } from './components/doctor.view/doctor.view.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorComponent } from './doctor.component';
import { DoctorRoutingModule } from './doctor-routing.module';



@NgModule({
  declarations: [
    DoctorListaComponent,
    DoctorFormComponent,
    DoctorViewComponent,
    DoctorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule { }
