import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JwtGuard } from "src/app/guard/jwt.guard";
import { CalendarComponent } from './calendar.component'

const routes : Routes = [
  {
    path:'calendario', component:CalendarComponent,canActivate:[JwtGuard],
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})

export class CalendarRoutingModule { }
