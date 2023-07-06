import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullbodyComponent } from './fullbody/fullbody.component';
import { BodyComponent } from './body.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FullbodyComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BodyModule { }
