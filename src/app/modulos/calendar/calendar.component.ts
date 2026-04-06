import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { AppointmentApiService } from '../../services/api/appointment.api.service';
import { AppointmentModel, AppointmentStatus } from '../../models/appointment.model';

declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  horario: string = '';
  appointments: AppointmentModel[] = [];
  loading: boolean = false;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    locale: esLocale,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    now: new Date(),
    nowIndicator: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    events: []
  };

  constructor(
    private dialog: MatDialog,
    private appointmentApi: AppointmentApiService
  ) {
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentApi.listAppointments().subscribe({
      next: (response) => {
        this.appointments = response.content;
        this.calendarOptions.events = this.mapAppointmentsToEvents(this.appointments);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
        this.loading = false;
      }
    });
  }

  mapAppointmentsToEvents(appointments: AppointmentModel[]): EventInput[] {
    return appointments.map(apt => ({
      id: apt.id?.toString(),
      title: `${apt.patientName} ${apt.patientLastName} - Dr. ${apt.doctorName}`,
      start: apt.date,
      end: apt.endTime || apt.date,
      backgroundColor: this.getColorByStatus(apt.status),
      borderColor: this.getColorByStatus(apt.status),
      extendedProps: {
        appointment: apt
      }
    }));
  }

  getColorByStatus(status: AppointmentStatus): string {
    const colors: Record<AppointmentStatus, string> = {
      [AppointmentStatus.SCHEDULED]: '#007bff',
      [AppointmentStatus.CONFIRMED]: '#28a745',
      [AppointmentStatus.CANCELLED]: '#dc3545',
      [AppointmentStatus.COMPLETED]: '#6c757d',
      [AppointmentStatus.NO_SHOW]: '#ffc107'
    };
    return colors[status] || '#007bff';
  }

  handleDateClick(arg: any): void {
    this.horario = arg.dateStr;
    this.openAddDialog();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '600px',
      data: { horario: this.horario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAppointments(); // Reload appointments after adding
      }
    });
  }

  handleEventClick(arg: any): void {
    const appointment = arg.event.extendedProps.appointment;
    this.openEditDialog(appointment);
  }

  openEditDialog(appointment: AppointmentModel): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '600px',
      data: { appointment }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAppointments(); // Reload appointments after editing
      }
    });
  }
}
