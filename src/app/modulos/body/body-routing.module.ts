import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JwtGuard } from "src/app/guard/jwt.guard";
import { BodyComponent } from "./body.component";
import { FullbodyComponent } from "./fullbody/fullbody.component";

const routes : Routes = [
  {
    path:'body', component:BodyComponent,canActivate:[JwtGuard],
    children:[
      {path : '',component:FullbodyComponent},
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

export class BodyRoutingModule { }
