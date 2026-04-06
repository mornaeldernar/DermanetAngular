import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteSubmit } from 'src/app/models/dto/paciente.submit';
import { PacienteApiService } from 'src/app/services/api/paciente.api.service';

@Component({
  selector: 'app-paciente.form',
  templateUrl: './paciente.form.component.html',
  styleUrls: ['./paciente.form.component.scss']
})
export class PacienteFormComponent implements OnInit {
  error: boolean = false;
  paciente: FormGroup;
  isSubmitting: boolean = false;
  today: string = '';
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private api: PacienteApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paciente = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      birthdate: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      profesion: ['']
    });
  }

  ngOnInit(): void {
    // Establecer fecha máxima (hoy)
    const today = new Date();
    this.today = today.toISOString().split('T')[0];

    // Verificar si es edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.loadPaciente(this.id);
      }
    });

  }

  loadPaciente(id: number): void {
    this.api.verPaciente(id).subscribe({
      next: (data) => {

        // Formatear fecha para input type="date" (YYYY-MM-DD)
        let birthdateFormatted = '';
        if (data.birthdate) {
          const date = new Date(data.birthdate);
          birthdateFormatted = date.toISOString().split('T')[0];
        }

        this.paciente.patchValue({
          name: data.name,
          lastName: data.lastName,
          birthdate: birthdateFormatted,
          sex: data.sex,
          phone: data.phone,
          email: data.email,
          profesion: data.profesion
        });
      },
      error: (e) => {
        console.error('❌ Error al cargar paciente:', e);
        this.router.navigate(['/paciente']);
      }
    });
  }

  save(): void {
    // Marcar todos los campos como tocados para mostrar errores
    if (this.paciente.invalid) {
      Object.keys(this.paciente.controls).forEach(key => {
        this.paciente.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.error = false;

    // Limpiar el teléfono antes de enviar
    const phoneValue = this.paciente.get('phone')?.value;
    const cleanPhone = phoneValue.replace(/\D/g, ''); // Solo números

    const pacienteSubmit: PacienteSubmit = {
      id: this.id || 0,
      name: this.paciente.get('name')?.value.trim(),
      lastName: this.paciente.get('lastName')?.value.trim(),
      birthdate: new Date(this.paciente.get('birthdate')?.value),
      sex: this.paciente.get('sex')?.value,
      phone: cleanPhone,
      email: this.paciente.get('email')?.value.trim().toLowerCase(),
      profession: this.paciente.get('profession')?.value?.trim() || ''
    };


    const request = this.id
      ? this.api.actualizar(this.id, pacienteSubmit)
      : this.api.guardar(pacienteSubmit);

    request.subscribe({
      next: datos => {
        this.isSubmitting = false;
        // Si es actualización, datos podría ser null o vacío dependiendo del backend (204 No Content)
        // Si es creación, devuelve el objeto creado
        const targetId = this.id || datos?.id;
        if (targetId) {
          this.router.navigate(['/paciente/view/' + targetId]);
        } else {
          this.router.navigate(['/paciente']);
        }
      },
      error: (e) => {
        console.error('❌ Error al guardar paciente:', e);
        this.error = true;
        this.isSubmitting = false;

        // Scroll al top para mostrar el error
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}