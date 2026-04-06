import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorModel } from 'src/app/models/doctor.model';
import { DoctorApiService } from 'src/app/services/api/doctor.api.service';
import { AppointmentApiService } from 'src/app/services/api/appointment.api.service';
import { AppointmentModel } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-doctor.view',
  templateUrl: './doctor.view.component.html',
  styleUrls: ['./doctor.view.component.scss']
})
export class DoctorViewComponent implements OnInit {
  doctor: DoctorModel | null = null;
  loading: boolean = true;
  error: string | null = null;

  upcomingAppointments: AppointmentModel[] = [];
  pastAppointments: AppointmentModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorApi: DoctorApiService,
    private appointmentApi: AppointmentApiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDoctor(+id);
    }
  }

  loadDoctor(id: number): void {
    this.loading = true;
    this.doctorApi.getDoctorById(id).subscribe({
      next: (data) => {
        this.doctor = data;
        this.loading = false;
        this.getAppointments(id);
      },
      error: (error) => {
        console.error('Error loading doctor:', error);
        this.error = 'Error al cargar la información del doctor';
        this.loading = false;
      }
    });
  }

  getAppointments(doctorId: number): void {
    this.appointmentApi.getAppointmentsByDoctor(doctorId).subscribe({
      next: (data) => {
        const now = new Date();
        this.upcomingAppointments = data.filter(a => new Date(a.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        this.pastAppointments = data.filter(a => new Date(a.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      error: (e) => {
        console.error('Error loading appointments', e);
      }
    });
  }

  editDoctor(): void {
    if (this.doctor?.id) {
      this.router.navigate(['/doctor/edit', this.doctor.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/doctor']);
  }
}
