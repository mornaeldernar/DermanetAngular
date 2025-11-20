import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';

import { AddDialogComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    CalendarComponent,
    AddDialogComponent,
    EditComponent
  ],
  imports: [
    CommonModule, // ✅ Usar CommonModule en lugar de BrowserModule
    RouterModule,
    FullCalendarModule,
    MatDialogModule,
    CalendarRoutingModule // ✅ Agregar routing module
  ]
})
export class CalendarModule { }
