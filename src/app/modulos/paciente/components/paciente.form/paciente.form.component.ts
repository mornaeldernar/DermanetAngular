import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private api: PacienteApiService,
    private router: Router
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
    
    console.log('📋 Formulario de paciente inicializado');
  }

  save(): void {
    // Marcar todos los campos como tocados para mostrar errores
    if (this.paciente.invalid) {
      Object.keys(this.paciente.controls).forEach(key => {
        this.paciente.get(key)?.markAsTouched();
      });
      console.warn('⚠️ Formulario inválido');
      return;
    }

    this.isSubmitting = true;
    this.error = false;

    // Limpiar el teléfono antes de enviar
    const phoneValue = this.paciente.get('phone')?.value;
    const cleanPhone = phoneValue.replace(/\D/g, ''); // Solo números

    const paciente: PacienteSubmit = {
      id: 0,
      name: this.paciente.get('name')?.value.trim(),
      lastName: this.paciente.get('lastName')?.value.trim(),
      birthdate: new Date(this.paciente.get('birthdate')?.value),
      sex: this.paciente.get('sex')?.value,
      phone: cleanPhone,
      email: this.paciente.get('email')?.value.trim().toLowerCase(),
      profesion: this.paciente.get('profesion')?.value?.trim() || ''
    };

    console.log('💾 Guardando paciente:', paciente);

    this.api.guardar(paciente).subscribe({
      next: datos => {
        console.log('✅ Paciente guardado exitosamente:', datos.id);
        this.isSubmitting = false;
        this.router.navigate(['/paciente/view/' + datos.id]);
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