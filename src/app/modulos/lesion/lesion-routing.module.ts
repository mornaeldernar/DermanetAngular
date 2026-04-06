import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LesionComponent } from './lesion.component';
import { DiagnosticListComponent } from './components/diagnostic-list/diagnostic-list.component';
import { LesionFormComponent } from './components/lesion-form/lesion-form.component';
import { DiagnosticDetailComponent } from './components/diagnostic-detail/diagnostic-detail.component';
import { RoleGuard } from 'src/app/guards/role.guard';

const routes: Routes = [
    {
        path: '',
        component: LesionComponent,
        canActivate: [RoleGuard],
        data: { deniedRoles: ['Recepcionista'], titulo: 'Lesiones' },
        children: [
            {
                path: 'paciente/:id',
                component: DiagnosticListComponent,
                data: { titulo: 'Lista de Diagnósticos' }
            },
            {
                path: 'paciente/:id/nueva-lesion',
                component: LesionFormComponent,
                data: { titulo: 'Nueva Lesión' }
            },
            {
                path: 'diagnostico/:diagnosticId/agregar-fotos',
                component: LesionFormComponent,
                data: { titulo: 'Agregar Fotos' }
            },
            {
                path: 'diagnostico/:id',
                component: DiagnosticDetailComponent,
                data: { titulo: 'Detalle de Diagnóstico' }
            },
            {
                path: '',
                redirectTo: 'paciente/1',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LesionRoutingModule { }
