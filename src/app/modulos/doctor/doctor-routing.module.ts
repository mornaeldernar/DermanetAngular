import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListaComponent } from './components/doctor.lista/doctor.lista.component';
import { DoctorViewComponent } from './components/doctor.view/doctor.view.component';
import { DoctorFormComponent } from './components/doctor.form/doctor.form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DoctorListaComponent
      },
      {
        path: 'new',
        component: DoctorFormComponent
      },
      {
        path: 'edit/:id',
        component: DoctorFormComponent
      },
      {
        path: 'view/:id',
        component: DoctorViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
