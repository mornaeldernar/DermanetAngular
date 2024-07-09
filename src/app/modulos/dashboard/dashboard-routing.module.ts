import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JwtGuard } from "src/app/guard/jwt.guard";
import { HomeComponent } from "./components/home/home.component";
import { DashboardComponent } from "./dashboard.component";

const routes : Routes = [
  {
    path:'dashboard', component:DashboardComponent,canActivate:[JwtGuard],
    children:[
      {path : 'home',component:HomeComponent, data:{title:'Dashboard'}},
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

export class DashboardRoutingModule { }
