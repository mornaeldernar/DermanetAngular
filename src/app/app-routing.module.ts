import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserRoutingModule } from './modulos/user/user-routing.module';
import { PacienteRoutingModule } from './modulos/paciente/paciente-routing.module';
import { DoctorRoutingModule } from './modulos/doctor/doctor-routing.module';
import { DiagnosticoRoutingModule } from './modulos/diagnostico/diagnostico-routing.module';
import { DashboardRoutingModule } from './modulos/dashboard/dashboard-routing.module';
import { CalendarRoutingModule } from './modulos/calendar/calendar-routing.module';
import { LoggedInGuard } from './guard/logged-in.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path : "login", component: LoginComponent, canActivate:[LoggedInGuard]},
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
    DashboardRoutingModule,
    CalendarRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
