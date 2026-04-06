import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterStaffComponent } from './components/register-staff/register-staff.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    LogoutComponent,
    RegisterStaffComponent,
    StaffListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
