import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddDialogComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { MatDialogModule, MatDialog , MatDialogRef } from '@angular/material/dialog';



@NgModule({
  declarations: [
    CalendarComponent,
    EditComponent,
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    AddDialogComponent
  ]
})
export class CalendarModule { }
