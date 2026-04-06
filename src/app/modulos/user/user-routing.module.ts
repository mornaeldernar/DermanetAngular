import { RouterModule, Routes } from "@angular/router";
import { LogoutComponent } from "./components/logout/logout.component";
import { RegisterStaffComponent } from "./components/register-staff/register-staff.component";
import { StaffListComponent } from "./components/staff-list/staff-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JwtGuard } from "src/app/guard/jwt.guard";

const routes: Routes = [
  { path: "logout", component: LogoutComponent, canActivate: [JwtGuard], data: { titulo: 'Cerrar Sesión' } },
  { path: "register-staff", component: RegisterStaffComponent, canActivate: [JwtGuard], data: { titulo: 'Registrar Personal' } },
  { path: "staff-list", component: StaffListComponent, canActivate: [JwtGuard], data: { titulo: 'Personal Registrado' } }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class UserRoutingModule { }
