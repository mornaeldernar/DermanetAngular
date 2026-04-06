import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentApiService } from '../../../../services/api/appointment.api.service';
import { PacienteApiService } from '../../../../services/api/paciente.api.service';
import { DoctorApiService } from '../../../../services/api/doctor.api.service';
import { PacienteModel } from '../../../../models/paciente.model';
import { DoctorModel } from '../../../../models/doctor.model';
import { CreateAppointmentDto } from '../../../../models/appointment.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddDialogComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { horario: string },
    private appointmentApi: AppointmentApiService,
    private patientApi: PacienteApiService,
    private doctorApi: DoctorApiService
  ) { }

  ngOnInit(): void {
    this.generateTimeOptions();
    this.initForm();
    // Don't load all patients/doctors upfront - search dynamically
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
    const selectedDate = this.data.horario ? new Date(this.data.horario) : new Date();
    const dateStr = selectedDate.getFullYear() + '-' +
      (selectedDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
      selectedDate.getDate().toString().padStart(2, '0');

    // Round time to nearest 15 min
    let minutes = selectedDate.getMinutes();
    const remainder = minutes % 15;
    if (remainder !== 0) {
      minutes = minutes + (15 - remainder);
    }
    const roundedDate = new Date(selectedDate);
    roundedDate.setMinutes(minutes);

    const timeStr = roundedDate.getHours().toString().padStart(2, '0') + ':' +
      roundedDate.getMinutes().toString().padStart(2, '0');

    this.appointmentForm = this.fb.group({
      patientSearch: ['', Validators.required],
      doctorSearch: ['', Validators.required],
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      dateOnly: [dateStr, Validators.required],
      startTime: [timeStr, Validators.required],
      endTimeOnly: [''],
      reason: ['', [Validators.required, Validators.minLength(3)]],
      notes: ['']
    });

    // Listen to patient search changes - search on server
    this.appointmentForm.get('patientSearch')?.valueChanges.subscribe(value => {
      if (this.isSelectingPatient) {
        return; // Don't search when programmatically setting value
      }
      if (typeof value === 'string' && value.length >= 3) {
        this.searchPatients(value);
      } else {
        this.showPatientSuggestions = false;
        this.filteredPatients = [];
      }
    });

    // Listen to doctor search changes - search on server
    this.appointmentForm.get('doctorSearch')?.valueChanges.subscribe(value => {
      if (this.isSelectingDoctor) {
        return; // Don't search when programmatically setting value
      }
      if (typeof value === 'string' && value.length >= 3) {
        this.searchDoctors(value);
      } else {
        this.showDoctorSuggestions = false;
        this.filteredDoctors = [];
      }
    });

    // Listen to start time changes to auto-set end time (30 minutes later)
    this.appointmentForm.get('startTime')?.valueChanges.subscribe(value => {
      if (value) {
        const index = this.timeOptions.indexOf(value);
        if (index !== -1 && index + 2 < this.timeOptions.length) {
          // Add 30 mins (2 slots of 15 mins)
          this.appointmentForm.patchValue({
            endTimeOnly: this.timeOptions[index + 2]
          });
        } else if (index !== -1) {
          // Handle overflow to next day if needed, or just leave empty
          // For now, if it goes beyond 23:45, we might wrap around or just not set it
        }
      }
    });
  }

  searchPatients(searchTerm: string): void {
    this.loading = true;
    // Use the filter API to search by name and lastName
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
    // Use the filter API to search doctors
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
    this.isSelectingPatient = true; // Set flag before updating value
    this.appointmentForm.patchValue({
      patientSearch: `${patient.name} ${patient.lastName}${patient.email ? ' - ' + patient.email : ''}`,
      patientId: patient.id
    });
    this.showPatientSuggestions = false;
    this.filteredPatients = []; // Clear suggestions
    setTimeout(() => this.isSelectingPatient = false, 100); // Reset flag after a short delay
  }

  selectDoctor(doctor: DoctorModel): void {
    this.selectedDoctor = doctor;
    this.isSelectingDoctor = true; // Set flag before updating value
    this.appointmentForm.patchValue({
      doctorSearch: `Dr. ${doctor.name} ${doctor.lastName}`,
      doctorId: doctor.id
    });
    this.showDoctorSuggestions = false;
    this.filteredDoctors = []; // Clear suggestions
    setTimeout(() => this.isSelectingDoctor = false, 100); // Reset flag after a short delay
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

      const appointment: CreateAppointmentDto = {
        patientId: Number(formValue.patientId),
        doctorId: Number(formValue.doctorId),
        date: date,
        endTime: endTime,
        reason: formValue.reason,
        notes: formValue.notes || undefined,
        syncWithGoogleCalendar: false
      };

      this.appointmentApi.createAppointment(appointment).subscribe({
        next: (result) => {
          this.submitting = false;
          this.dialogRef.close(result);
        },
        error: (error: any) => {
          console.error('Error creating appointment:', error);
          this.submitting = false;
          alert('Error al crear la cita: ' + (error.error?.message || 'Error desconocido'));
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
