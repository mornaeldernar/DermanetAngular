import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { DoctorListaComponent } from './components/doctor.lista/doctor.lista.component';
import { DoctorFormComponent } from './components/doctor.form/doctor.form.component';
import { DoctorViewComponent } from './components/doctor.view/doctor.view.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DoctorComponent,
    DoctorListaComponent,
    DoctorFormComponent,
    DoctorViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule { }
