import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoggedInGuard } from "src/app/guard/logged-in.guard";
import { LoginComponent } from "./login/login.component";

const routes : Routes = [
  { path : "login", component: LoginComponent, canActivate:[LoggedInGuard] }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})

export class PagesRoutingModule {}
