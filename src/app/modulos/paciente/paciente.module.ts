import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { PacienteListComponent } from './components/paciente.list/paciente.list.component';
import { PacienteViewComponent } from './components/paciente.view/paciente.view.component';
import { PacienteFormComponent } from './components/paciente.form/paciente.form.component';
import { ImagenUbicacionComponent } from './components/imagen-ubicacion/imagen-ubicacion.component';
import { VerHistoriaClinicaComponent } from './components/ver-historia-clinica/ver-historia-clinica.component';
import { PhoneFormatPipe } from '../../pipe/PhoneFormatPipe';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';
// Importar SharedModule si usas componentes compartidos
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PacienteComponent,
    PacienteListComponent,
    PacienteViewComponent,
    PacienteFormComponent,
    ImagenUbicacionComponent,
    VerHistoriaClinicaComponent,
    PhoneFormatPipe,
    PhoneMaskDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PacienteRoutingModule
  ]
})
export class PacienteModule { }
