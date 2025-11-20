import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './components/add/add.component';

declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  horario: string = '';

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    locale: esLocale, // ✅ Usar importación correcta del locale
    dateClick: this.handleDateClick.bind(this), // ✅ Bind correcto del contexto
    eventClick: this.handleEventClick.bind(this),
    now: new Date(),
    nowIndicator: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    events: [
      // Eventos de ejemplo
      {
        title: 'Cita Dr. García',
        start: new Date(),
        backgroundColor: '#007bff',
        borderColor: '#007bff'
      }
    ]
  };

  constructor(private dialog: MatDialog) {
    console.log('📅 CalendarComponent - Constructor');
  }

  ngOnInit(): void {
    console.log('📅 CalendarComponent - ngOnInit');
  }

  handleDateClick(arg: any): void {
    console.log('📅 Fecha clickeada:', arg.dateStr);
    this.horario = arg.dateStr;

    // Opción 1: Usar jQuery modal (si tienes Bootstrap)
    if (typeof $ !== 'undefined') {
      $('#add-event').modal('show');
    } else {
      // Opción 2: Usar Material Dialog (recomendado)
      this.openAddDialog();
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '500px',
      data: { horario: this.horario }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog cerrado:', result);
      if (result) {
        // Agregar el evento al calendario
        this.addEventToCalendar(result);
      }
    });
  }

  handleEventClick(arg: any): void {
    console.log('📅 Evento clickeado:', arg.event.title);
    // Implementar lógica para editar/eliminar evento
  }

  addEventToCalendar(eventData: any): void {
    // Lógica para agregar evento
    console.log('Agregando evento:', eventData);
  }
}
