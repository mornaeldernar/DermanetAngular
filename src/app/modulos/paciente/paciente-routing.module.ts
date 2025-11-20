import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteListComponent } from './components/paciente.list/paciente.list.component';
import { PacienteViewComponent } from './components/paciente.view/paciente.view.component';
import { PacienteFormComponent } from './components/paciente.form/paciente.form.component';
import { VerHistoriaClinicaComponent } from './components/ver-historia-clinica/ver-historia-clinica.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PacienteListComponent
      },
      {
        path: 'new',
        component: PacienteFormComponent
      },
      {
        path: 'editar/:id',
        component: PacienteFormComponent
      },
      {
        path: 'view/:id',
        component: PacienteViewComponent
      },
      {
        path: 'view/:id/historiaClinica/:hcid',
        component: VerHistoriaClinicaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
