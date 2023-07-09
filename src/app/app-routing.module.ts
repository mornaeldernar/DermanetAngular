import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserRoutingModule } from './modulos/user/user-routing.module';
import { PacienteRoutingModule } from './modulos/paciente/paciente-routing.module';
import { DoctorRoutingModule } from './modulos/doctor/doctor-routing.module';
import { DiagnosticoRoutingModule } from './modulos/diagnostico/diagnostico-routing.module';

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
    DiagnosticoRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
