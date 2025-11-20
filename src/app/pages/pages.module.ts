import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LockscreenComponent } from './lockscreen/lockscreen.component';

@NgModule({
  declarations: [
    // Aquí irían componentes específicos de pages si los hay
    LockscreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
