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
import { JwtGuard } from './guard/jwt.guard';
import { LoggedInGuard } from './guard/logged-in.guard';
import { LogoutComponent } from './modulos/user/components/logout/logout.component';

const routes: Routes = [
  { path : "login", component: LoginComponent, canActivate:[LoggedInGuard]},
  { path : "logout", component: LogoutComponent, canActivate:[JwtGuard]},
  { path : "paciente", component: PacienteListComponent, canActivate:[JwtGuard]},
  { path : "paciente/view/:id", component: PacienteViewComponent, canActivate:[JwtGuard]},
  { path : "paciente/new", component: PacienteFormComponent, canActivate:[JwtGuard]},
  { path : "doctor", component: DoctorListaComponent, canActivate:[JwtGuard]},
  { path : "doctor/view/:id", component: DoctorViewComponent, canActivate:[JwtGuard]},
  { path : "doctor/new", component: DoctorFormComponent, canActivate:[JwtGuard] },
  { path : "paciente/diagnostico/:id", component : DiagnosticoFormComponent, canActivate:[JwtGuard]},
  { path : "" , redirectTo: '/login', pathMatch:'full'},
  { path : "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
