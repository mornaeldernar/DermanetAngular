import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { LogoutComponent } from './components/logout/logout.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    LogoutComponent
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
