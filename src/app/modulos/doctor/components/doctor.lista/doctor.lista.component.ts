import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DoctorModel } from 'src/app/models/doctor.model';
import { DoctorApiService } from 'src/app/services/api/doctor.api.service';
import { UserApiService } from 'src/app/services/api/user.api.service';
import { PageingResponseDto } from 'src/app/models/dto/pageing.response.dto';

@Component({
  selector: 'app-doctor.lista',
  templateUrl: './doctor.lista.component.html',
  styleUrls: ['./doctor.lista.component.scss']
})
export class DoctorListaComponent implements OnInit {
  doctores: PageingResponseDto<DoctorModel> = {} as PageingResponseDto<DoctorModel>;
  loading: boolean = true;

  listDoctor: DoctorModel[] = [];

  constructor(private fb: FormBuilder, private api: DoctorApiService) {

  }
  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.api.listDoctors().subscribe({
      next: datos => {
        this.doctores = datos;
        this.loading = false;
      },
      error: (e) => {
        console.error('Error loading doctors:', e);
        this.loading = false;
      }
    });
  }

  deleteDoctor(id: number | undefined, event: Event): void {
    event.preventDefault();
    if (id && confirm('¿Está seguro de eliminar este doctor?')) {
      // TODO: Implement delete functionality
      console.log('Delete doctor:', id);
    }
  }
}
