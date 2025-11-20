import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JwtGuard } from "src/app/guard/jwt.guard";
import { DiagnosticoComponent } from "./diagnostico.component";
import { DiagnosticoFormComponent } from "./components/diagnostico.form/diagnostico.form.component";

const routes : Routes = [
  {
    path:'diagnostic', component:DiagnosticoComponent,canActivate:[JwtGuard],
    children:[
      {path : 'new', component: DiagnosticoFormComponent,data:{title:'Nuevo paciente'}},
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})

export class DiagnosticoRoutingModule { }
