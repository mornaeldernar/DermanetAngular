import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';
import { JwtGuard } from './guard/jwt.guard';
import { LoggedInGuard } from './guard/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '',
    component: PagesComponent,
    canActivate: [JwtGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modulos/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'calendario',
        loadChildren: () => import('./modulos/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'paciente',
        loadChildren: () => import('./modulos/paciente/paciente.module').then(m => m.PacienteModule)
      },
      {
        path: 'doctor',
        loadChildren: () => import('./modulos/doctor/doctor.module').then(m => m.DoctorModule)
      },
      {
        path: 'diagnostico',
        loadChildren: () => import('./modulos/diagnostico/diagnostico.module').then(m => m.DiagnosticoModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./modulos/user/user.module').then(m => m.UserModule)
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Cambiar a true para ver logs de routing
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
