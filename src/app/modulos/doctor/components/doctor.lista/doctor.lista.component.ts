import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DoctorModel } from 'src/app/models/doctor.model';
import { DoctorApiService } from 'src/app/services/api/doctor.api.service';
import { UserApiService } from 'src/app/services/api/user.api.service';

@Component({
  selector: 'app-doctor.lista',
  templateUrl: './doctor.lista.component.html',
  styleUrls: ['./doctor.lista.component.scss']
})
export class DoctorListaComponent  implements OnInit {
  listDoctor : DoctorModel[] = [];

  constructor(private fb: FormBuilder, private api : DoctorApiService) {

  }
  ngOnInit(): void {
    this.api.listDoctors().subscribe({
      next : datos => {
        this.listDoctor = datos;
        console.log(datos);
      },
      error: (e) => {
      }
    })

  }


}
