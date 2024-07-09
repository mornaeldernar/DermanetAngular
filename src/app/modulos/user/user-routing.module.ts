import { RouterModule, Routes } from "@angular/router";
import { LogoutComponent } from "./components/logout/logout.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JwtGuard } from "src/app/guard/jwt.guard";

const routes : Routes = [
  /*{ path : "login", component: LoginComponent, canActivate:[LoggedInGuard] },*/
  { path : "logout", component: LogoutComponent, canActivate:[JwtGuard] },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})

export class UserRoutingModule {}
