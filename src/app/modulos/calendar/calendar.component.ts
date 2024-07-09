import { Component,Inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin  from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { AddDialogComponent } from './components/add/add.component';
import {  MatDialog } from '@angular/material/dialog';
declare var $:any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  horario:any='';

  constructor(private dialog: MatDialog) {}

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin,listPlugin,interactionPlugin],
    headerToolbar: {
      left:'prev,next,today',
      center:'title',
      right:'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    locale: 'es',
    dateClick: this.openAddDialog,
    eventClick: this.handleEventClick,
    now: Date.now(),
    nowIndicator: true
  };
  openAddDialog(arg:any) {
    this.horario = arg.dateStr;
    console.log(this.horario);
    $("#add-event").modal('show');
    //alert('event click! ' + arg.dateStr)
  }
  handleEventClick(arg:any) {
    //alert('event click! ' + args.dateStr)
  }
}
