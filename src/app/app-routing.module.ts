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
import { ImagenUbicacionComponent } from './modulos/paciente/components/imagen-ubicacion/imagen-ubicacion.component';
import { UserRoutingModule } from './modulos/user/user-routing.module';
import { PacienteRoutingModule } from './modulos/paciente/paciente-routing.module';
import { DoctorRoutingModule } from './modulos/doctor/doctor-routing.module';
import { DiagnosticoRoutingModule } from './modulos/diagnostico/diagnostico-routing.module';
import { BodyRoutingModule } from './modulos/body/body-routing.module';

const routes: Routes = [
/*  { path : "doctor", component: DoctorListaComponent, canActivate:[JwtGuard]},
  { path : "doctor/view/:id", component: DoctorViewComponent, canActivate:[JwtGuard]},
  { path : "doctor/new", component: DoctorFormComponent, canActivate:[JwtGuard] },
  { path : "paciente/diagnostico/:id", component : DiagnosticoFormComponent, canActivate:[JwtGuard]},
  { path : "paciente/ubicacion/:id", component : ImagenUbicacionComponent, canActivate:[JwtGuard]},*/
  { path : "" , redirectTo: '/login', pathMatch:'full'},
  { path : "**", component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{enableTracing:true}),
    UserRoutingModule,
    PacienteRoutingModule,
    DoctorRoutingModule,
    DiagnosticoRoutingModule,
    BodyRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
