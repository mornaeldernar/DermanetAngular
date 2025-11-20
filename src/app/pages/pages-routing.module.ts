import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoggedInGuard } from "src/app/guard/logged-in.guard";
import { LoginComponent } from "./login/login.component";
import { LockscreenComponent } from "./lockscreen/lockscreen.component";

const routes : Routes = [
  { path : "login", component: LoginComponent, canActivate:[LoggedInGuard] },
  { path : "forgot-password", component: LoginComponent, canActivate:[LoggedInGuard] },
  { path : "lock-screen", component: LockscreenComponent, canActivate:[LoggedInGuard] },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})

export class PagesRoutingModule {}
