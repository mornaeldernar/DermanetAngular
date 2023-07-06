import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JwtGuard } from "src/app/guard/jwt.guard";
import { DoctorComponent } from "./doctor.component";
import { DoctorListaComponent } from "./components/doctor.lista/doctor.lista.component";
import { DoctorViewComponent } from "./components/doctor.view/doctor.view.component";
import { DoctorFormComponent } from "./components/doctor.form/doctor.form.component";

const routes : Routes = [
  {
    path:'doctor', component:DoctorComponent,canActivate:[JwtGuard],
    children:[
      { path : "", component: DoctorListaComponent},
      { path : "view/:id", component: DoctorViewComponent},
      { path : "new", component: DoctorFormComponent},
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

export class DoctorRoutingModule { }
