import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JwtGuard } from "src/app/guard/jwt.guard";
import { PacienteListComponent } from "./components/paciente.list/paciente.list.component";
import { PacienteFormComponent } from "./components/paciente.form/paciente.form.component";
import { PacienteViewComponent } from "./components/paciente.view/paciente.view.component";
import { PacienteComponent } from "./paciente.component";

const routes : Routes = [
  {
    path:'paciente', component:PacienteComponent,canActivate:[JwtGuard],
    children:[
      {path : '',component:PacienteListComponent, data:{title:'Lista de pacientes'}},
      {path : 'view/:id', component:PacienteViewComponent},
      {path : 'new', component: PacienteFormComponent,data:{title:'Nuevo paciente'}},
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})

export class PacienteRoutingModule { }
