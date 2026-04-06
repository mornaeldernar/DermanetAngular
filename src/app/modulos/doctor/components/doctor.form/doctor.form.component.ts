import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorApiService } from 'src/app/services/api/doctor.api.service';
import { SpecialityApiService } from 'src/app/services/api/speciality.api.service';
import { SpecialityModel } from 'src/app/models/speciality.model';

@Component({
  selector: 'app-doctor.form',
  templateUrl: './doctor.form.component.html',
  styleUrls: ['./doctor.form.component.scss']
})
export class DoctorFormComponent implements OnInit {
  doctorForm: FormGroup;
  isEditMode: boolean = false;
  doctorId: number | null = null;
  pageTitle: string = 'Nuevo Doctor';
  loading: boolean = false;
  specialities: SpecialityModel[] = [];
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doctorApi: DoctorApiService,
    private specialityApi: SpecialityApiService
  ) {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      specialityId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadSpecialities();

    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.doctorId = +params['id'];
        this.pageTitle = 'Modificar Doctor';
        this.loadDoctorData(this.doctorId);

        // Remove password validation in edit mode
        this.doctorForm.get('password')?.clearValidators();
        this.doctorForm.get('confirmPassword')?.clearValidators();
        this.doctorForm.get('password')?.updateValueAndValidity();
        this.doctorForm.get('confirmPassword')?.updateValueAndValidity();
      }
    });
  }

  loadSpecialities(): void {
    this.specialityApi.listSpecialities().subscribe({
      next: (data) => {
        this.specialities = data;
      },
      error: (error) => {
        console.error('Error loading specialities:', error);
      }
    });
  }

  loadDoctorData(id: number): void {
    this.loading = true;
    this.doctorApi.getDoctorById(id).subscribe({
      next: (doctor) => {
        this.doctorForm.patchValue({
          name: doctor.name,
          lastName: doctor.lastName,
          email: doctor.email,
          specialityId: doctor.specialityId
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading doctor:', error);
        this.loading = false;
        alert('Error al cargar los datos del doctor');
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.doctorForm.invalid) {
      return;
    }

    // Validate password match in create mode
    if (!this.isEditMode) {
      if (this.doctorForm.value.password !== this.doctorForm.value.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
    }

    this.loading = true;

    const doctorData = {
      name: this.doctorForm.value.name,
      lastName: this.doctorForm.value.lastName,
      email: this.doctorForm.value.email,
      specialityId: this.doctorForm.value.specialityId,
      ...((!this.isEditMode) && { password: this.doctorForm.value.password })
    };

    if (this.isEditMode && this.doctorId) {
      this.doctorApi.updateDoctor(this.doctorId, doctorData).subscribe({
        next: () => {
          this.loading = false;
          alert('Doctor actualizado exitosamente');
          this.router.navigate(['/doctor']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error updating doctor:', error);
          alert('Error al actualizar el doctor: ' + (error.error?.message || 'Error desconocido'));
        }
      });
    } else {
      this.doctorApi.createDoctor(doctorData).subscribe({
        next: () => {
          this.loading = false;
          alert('Doctor creado exitosamente');
          this.router.navigate(['/doctor']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error creating doctor:', error);
          alert('Error al crear el doctor: ' + (error.error?.message || 'Error desconocido'));
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/doctor']);
  }

  get f() {
    return this.doctorForm.controls;
  }
}
