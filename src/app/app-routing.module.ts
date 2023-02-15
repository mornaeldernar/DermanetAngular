import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DoctorFormComponent } from './modulos/doctor/components/doctor.form/doctor.form.component';
import { DoctorListaComponent } from './modulos/doctor/components/doctor.lista/doctor.lista.component';
import { DoctorViewComponent } from './modulos/doctor/components/doctor.view/doctor.view.component';
import { PacienteFormComponent } from './modulos/paciente/components/paciente.form/paciente.form.component';
import { PacienteListComponent } from './modulos/paciente/components/paciente.list/paciente.list.component';
import { PacienteViewComponent } from './modulos/paciente/components/paciente.view/paciente.view.component';
import { DiagnosticoFormComponent } from './modulos/diagnostico/components/diagnostico.form/diagnostico.form.component';
import { LoginComponent } from './modulos/user/components/login/login.component';

const routes: Routes = [
  { path : "login", component: LoginComponent },
  { path : "paciente", component: PacienteListComponent },
  { path : "paciente/view/:id", component: PacienteViewComponent },
  { path : "paciente/new", component: PacienteFormComponent },
  { path : "doctor", component: DoctorListaComponent },
  { path : "doctor/view/:id", component: DoctorViewComponent },
  { path : "doctor/new", component: DoctorFormComponent },
  { path : "paciente/diagnostico/:id", component : DiagnosticoFormComponent },
  { path : "" , redirectTo: '/login', pathMatch:'full'},
  { path : "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
