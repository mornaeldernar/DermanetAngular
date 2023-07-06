import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteSubmit } from 'src/app/models/dto/paciente.submit';
import { PacienteApiService } from 'src/app/services/api/paciente.api.service';

@Component({
  selector: 'app-paciente.form',
  templateUrl: './paciente.form.component.html',
  styleUrls: ['./paciente.form.component.scss']
})
export class PacienteFormComponent {
  error:boolean = false;
  paciente: FormGroup;

  constructor(private fb: FormBuilder,
    private api : PacienteApiService,
    private router : Router
  ) {
    this.paciente = this.fb.group({
      name: ['',[Validators.required]],
      lastName: ['',[Validators.required]],
      birthdate: ['',[Validators.required]]
    })
  }
  save(){
    const paciente : PacienteSubmit = {
      id : 0,
      name : this.paciente.get("name")?.value,
      lastName : this.paciente.get("lastName")?.value,
      birthdate : new Date(this.paciente.get("birthdate")?.value),
    }
    this.api.guardar(paciente).subscribe({
      next: datos => {
        console.log(datos);
        this.router.navigate(["/pactients"]);
      },
      error: (e) => {
        this.error= true;
        console.log(paciente)
      }
    })
  }
}
