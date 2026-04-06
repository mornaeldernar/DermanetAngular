import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from 'src/app/services/api/staff.service';

@Component({
    selector: 'app-register-staff',
    templateUrl: './register-staff.component.html',
    styleUrls: ['./register-staff.component.scss']
})
export class RegisterStaffComponent implements OnInit {
    staffForm: FormGroup;
    loading = false;
    successMessage = '';
    errorMessage = '';

    roles = [
        { value: 'Recepcionista', label: 'Recepcionista' },
        { value: 'Nurse', label: 'Enfermera' }
    ];

    constructor(
        private fb: FormBuilder,
        private staffService: StaffService
    ) {
        this.staffForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]],
            role: ['', [Validators.required]]
        }, {
            validators: this.passwordMatchValidator
        });
    }

    ngOnInit(): void { }

    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;

        if (password !== confirmPassword) {
            form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
        } else {
            return null;
        }
        return null;
    }

    onSubmit() {
        if (this.staffForm.invalid) {
            this.staffForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const formValue = this.staffForm.value;
        const request = {
            email: formValue.email,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            password: formValue.password,
            role: formValue.role
        };

        this.staffService.registerStaff(request).subscribe({
            next: (response) => {
                this.loading = false;
                this.successMessage = `¡Personal registrado exitosamente! ${formValue.firstName} ${formValue.lastName} puede iniciar sesión ahora.`;
                this.staffForm.reset();
            },
            error: (error) => {
                this.loading = false;
                this.errorMessage = error.error?.message || 'Error al registrar personal. Por favor intente nuevamente.';
            }
        });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.staffForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    getFieldError(fieldName: string): string {
        const field = this.staffForm.get(fieldName);

        if (field?.errors?.['required']) {
            return 'Este campo es requerido';
        }
        if (field?.errors?.['email']) {
            return 'Email inválido';
        }
        if (field?.errors?.['minlength']) {
            const minLength = field.errors['minlength'].requiredLength;
            return `Mínimo ${minLength} caracteres`;
        }
        if (field?.errors?.['passwordMismatch']) {
            return 'Las contraseñas no coinciden';
        }

        return '';
    }
}
