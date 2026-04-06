import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentApiService } from '../../../../services/api/appointment.api.service';
import { PacienteApiService } from '../../../../services/api/paciente.api.service';
import { DoctorApiService } from '../../../../services/api/doctor.api.service';
import { PacienteModel } from '../../../../models/paciente.model';
import { DoctorModel } from '../../../../models/doctor.model';
import { AppointmentModel, AppointmentStatus, UpdateAppointmentDto } from '../../../../models/appointment.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  appointmentForm!: FormGroup;
  patients: PacienteModel[] = [];
  doctors: DoctorModel[] = [];
  filteredPatients: PacienteModel[] = [];
  filteredDoctors: DoctorModel[] = [];
  selectedPatient: PacienteModel | null = null;
  selectedDoctor: DoctorModel | null = null;
  showPatientSuggestions: boolean = false;
  showDoctorSuggestions: boolean = false;
  loading: boolean = false;
  submitting: boolean = false;
  isSelectingPatient: boolean = false; // Flag to prevent search on selection
  isSelectingDoctor: boolean = false; // Flag to prevent search on selection
  timeOptions: string[] = [];
  statuses = Object.values(AppointmentStatus);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: AppointmentModel },
    private appointmentApi: AppointmentApiService,
    private patientApi: PacienteApiService,
    private doctorApi: DoctorApiService
  ) { }

  ngOnInit(): void {
    this.generateTimeOptions();
    this.initForm();
    // We don't load all patients/doctors anymore
  }

  generateTimeOptions(): void {
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        this.timeOptions.push(`${hour}:${minute}`);
      }
    }
  }

  initForm(): void {
    const apt = this.data.appointment;
    const startDate = new Date(apt.date);
    const endDate = apt.endTime ? new Date(apt.endTime) : null;

    const dateStr = startDate.getFullYear() + '-' +
      (startDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
      startDate.getDate().toString().padStart(2, '0');

    const startTimeStr = startDate.getHours().toString().padStart(2, '0') + ':' +
      startDate.getMinutes().toString().padStart(2, '0');

    let endTimeStr = '';
    if (endDate) {
      endTimeStr = endDate.getHours().toString().padStart(2, '0') + ':' +
        endDate.getMinutes().toString().padStart(2, '0');
    }

    // Pre-fill selected patient/doctor for UI state
    this.selectedPatient = {
      id: apt.patientId,
      name: apt.patientName || '',
      lastName: '',
      email: '',
      phone: '',
      sex: '',
      birthdate: new Date(),
      profesion: ''
    } as PacienteModel;

    this.selectedDoctor = {
      id: apt.doctorId,
      name: apt.doctorName || '',
      lastName: '',
      speciality: { id: 0, name: '' }
    } as DoctorModel;

    this.appointmentForm = this.fb.group({
      patientSearch: [apt.patientName || '', Validators.required],
      doctorSearch: [apt.doctorName || '', Validators.required],
      patientId: [apt.patientId, Validators.required],
      doctorId: [apt.doctorId, Validators.required],
      dateOnly: [dateStr, Validators.required],
      startTime: [startTimeStr, Validators.required],
      endTimeOnly: [endTimeStr],
      reason: [apt.reason, [Validators.required, Validators.minLength(3)]],
      status: [apt.status, Validators.required],
      notes: [apt.notes || '']
    });

    // Listen to patient search changes
    this.appointmentForm.get('patientSearch')?.valueChanges.subscribe(value => {
      if (this.isSelectingPatient) return;
      if (typeof value === 'string' && value.length >= 3) {
        this.searchPatients(value);
      } else {
        this.showPatientSuggestions = false;
        this.filteredPatients = [];
      }
    });

    // Listen to doctor search changes
    this.appointmentForm.get('doctorSearch')?.valueChanges.subscribe(value => {
      if (this.isSelectingDoctor) return;
      if (typeof value === 'string' && value.length >= 3) {
        this.searchDoctors(value);
      } else {
        this.showDoctorSuggestions = false;
        this.filteredDoctors = [];
      }
    });

    // Listen to start time changes to auto-set end time
    this.appointmentForm.get('startTime')?.valueChanges.subscribe(value => {
      if (value) {
        const index = this.timeOptions.indexOf(value);
        if (index !== -1 && index + 2 < this.timeOptions.length) {
          this.appointmentForm.patchValue({
            endTimeOnly: this.timeOptions[index + 2]
          });
        }
      }
    });
  }

  searchPatients(searchTerm: string): void {
    this.loading = true;
    const words = searchTerm.trim().split(' ');
    const firstName = words[0] || '';
    const lastName = words.slice(1).join(' ') || '';

    this.patientApi.filtraPacientes(firstName, lastName, 0).subscribe({
      next: (response: any) => {
        this.filteredPatients = response.content;
        this.showPatientSuggestions = this.filteredPatients.length > 0 || searchTerm.length >= 3;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error searching patients:', error);
        this.filteredPatients = [];
        this.showPatientSuggestions = false;
        this.loading = false;
      }
    });
  }

  searchDoctors(searchTerm: string): void {
    const words = searchTerm.trim().split(' ');
    const firstName = words[0] || '';
    const lastName = words.slice(1).join(' ') || '';

    this.doctorApi.filtraDoctors(firstName, lastName, 0).subscribe({
      next: (response: any) => {
        this.filteredDoctors = response.content;
        this.showDoctorSuggestions = this.filteredDoctors.length > 0 || searchTerm.length >= 3;
      },
      error: (error: any) => {
        console.error('Error searching doctors:', error);
        this.filteredDoctors = [];
        this.showDoctorSuggestions = false;
      }
    });
  }

  selectPatient(patient: PacienteModel): void {
    this.selectedPatient = patient;
    this.isSelectingPatient = true;
    this.appointmentForm.patchValue({
      patientSearch: `${patient.name} ${patient.lastName}${patient.email ? ' - ' + patient.email : ''}`,
      patientId: patient.id
    });
    this.showPatientSuggestions = false;
    this.filteredPatients = [];
    setTimeout(() => this.isSelectingPatient = false, 100);
  }

  selectDoctor(doctor: DoctorModel): void {
    this.selectedDoctor = doctor;
    this.isSelectingDoctor = true;
    this.appointmentForm.patchValue({
      doctorSearch: `Dr. ${doctor.name} ${doctor.lastName}`,
      doctorId: doctor.id
    });
    this.showDoctorSuggestions = false;
    this.filteredDoctors = [];
    setTimeout(() => this.isSelectingDoctor = false, 100);
  }

  clearPatient(): void {
    this.selectedPatient = null;
    this.appointmentForm.patchValue({
      patientSearch: '',
      patientId: ''
    });
    this.showPatientSuggestions = false;
  }

  clearDoctor(): void {
    this.selectedDoctor = null;
    this.appointmentForm.patchValue({
      doctorSearch: '',
      doctorId: ''
    });
    this.showDoctorSuggestions = false;
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      this.submitting = true;
      const formValue = this.appointmentForm.value;

      // Create dates using UTC to avoid timezone shifts when sending to backend
      const dateParts = formValue.dateOnly.split('-');
      const timeParts = formValue.startTime.split(':');

      const date = new Date(Date.UTC(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2]),
        parseInt(timeParts[0]),
        parseInt(timeParts[1])
      ));

      let endTime: Date | undefined;
      if (formValue.endTimeOnly) {
        const endTimeParts = formValue.endTimeOnly.split(':');
        endTime = new Date(Date.UTC(
          parseInt(dateParts[0]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[2]),
          parseInt(endTimeParts[0]),
          parseInt(endTimeParts[1])
        ));
      }

      const appointment: UpdateAppointmentDto = {
        patientId: Number(formValue.patientId),
        doctorId: Number(formValue.doctorId),
        date: date,
        endTime: endTime,
        reason: formValue.reason,
        status: formValue.status,
        notes: formValue.notes || undefined,
        syncWithGoogleCalendar: false
      };

      this.appointmentApi.updateAppointment(this.data.appointment.id!, appointment).subscribe({
        next: () => {
          this.submitting = false;
          this.dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error updating appointment:', error);
          this.submitting = false;
          alert('Error al actualizar la cita: ' + (error.error?.message || 'Error desconocido'));
        }
      });
    }
  }

  onCancel(): void {
    if (confirm('¿Está seguro de cancelar esta cita?')) {
      this.appointmentApi.cancelAppointment(this.data.appointment.id!).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error: any) => {
          console.error('Error cancelling appointment:', error);
          alert('Error al cancelar la cita: ' + (error.error?.message || 'Error desconocido'));
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
