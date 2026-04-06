import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyPartSelection } from '../body-selector/body-selector.component';
import { PhotoCaptureResult } from '../photo-capture/photo-capture.component';
import { DiagnosticoApiService, CreateDiagnosticDto, DiagnosticImageDto } from 'src/app/services/api/diagnostico.api.service';

@Component({
    selector: 'app-lesion-form',
    templateUrl: './lesion-form.component.html',
    styleUrls: ['./lesion-form.component.scss']
})
export class LesionFormComponent implements OnInit {
    currentStep: number = 1;
    totalSteps: number = 4;
    pacienteId!: number;
    diagnosticId: number | null = null; // For add mode
    isAddMode: boolean = false; // True when adding photos to existing diagnostic

    lesionForm!: FormGroup;
    selectedBodyPart: BodyPartSelection | null = null;
    macroscopicPhotos: PhotoCaptureResult[] = [];
    microscopicPhotos: PhotoCaptureResult[] = [];
    isLoading: boolean = false;
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private diagnosticoService: DiagnosticoApiService
    ) { }

    ngOnInit(): void {
        this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));

        // Initialize form first
        this.initForm();

        // Check if diagnosticId is provided (add mode)
        const diagnosticIdParam = this.route.snapshot.paramMap.get('diagnosticId');
        if (diagnosticIdParam) {
            this.diagnosticId = Number(diagnosticIdParam);
            this.isAddMode = true;
            this.currentStep = 2; // Start at photo capture step

            // Load diagnostic to get body part info
            this.loadDiagnostic();
        }
    }

    loadDiagnostic(): void {
        if (this.diagnosticId) {
            this.diagnosticoService.getDiagnosticById(this.diagnosticId).subscribe({
                next: (diagnostic) => {
                    console.log('Loaded diagnostic in add mode:', diagnostic);
                    console.log('BodyPart value:', diagnostic.bodyPart);

                    // In add mode, just populate the form with existing values
                    this.lesionForm.patchValue({
                        name: diagnostic.name,
                        observations: diagnostic.observations || '',
                        bodyPart: diagnostic.bodyPart,
                        bodyPartCoordinates: diagnostic.bodyPartCoordinates
                    });

                    console.log('Form values after patch:', this.lesionForm.value);
                },
                error: (err) => {
                    console.error('Error loading diagnostic:', err);
                    this.errorMessage = 'Error al cargar el diagnóstico';
                }
            });
        }
    }

    initForm(): void {
        // In add mode, bodyPart and bodyPartCoordinates are not required
        // because they come from the existing diagnostic
        if (this.isAddMode) {
            this.lesionForm = this.fb.group({
                name: ['', [Validators.required, Validators.minLength(3)]],
                observations: [''],
                bodyPart: [''],
                bodyPartCoordinates: ['']
            });
        } else {
            this.lesionForm = this.fb.group({
                name: ['', [Validators.required, Validators.minLength(3)]],
                observations: [''],
                bodyPart: ['', Validators.required],
                bodyPartCoordinates: ['', Validators.required]
            });
        }
    }

    onBodyPartSelected(selection: BodyPartSelection): void {
        this.selectedBodyPart = selection;
        this.lesionForm.patchValue({
            bodyPart: selection.bodyPart.displayName,
            bodyPartCoordinates: JSON.stringify(selection.coordinates)
        });
    }

    onMacroscopicPhotosCaptured(photos: PhotoCaptureResult[]): void {
        this.macroscopicPhotos = photos;
    }

    onMicroscopicPhotosCaptured(photos: PhotoCaptureResult[]): void {
        this.microscopicPhotos = photos;
    }

    nextStep(): void {
        if (this.canProceedToNextStep()) {
            this.currentStep++;
        }
    }

    previousStep(): void {
        // In add mode, cannot go back to step 1
        const minStep = this.isAddMode ? 2 : 1;
        if (this.currentStep > minStep) {
            this.currentStep--;
        }
    }

    canProceedToNextStep(): boolean {
        switch (this.currentStep) {
            case 1:
                return this.selectedBodyPart !== null;
            case 2:
                return this.macroscopicPhotos.length > 0;
            case 3:
                return this.microscopicPhotos.length > 0;
            case 4:
                return this.lesionForm.valid;
            default:
                return false;
        }
    }

    getStepTitle(): string {
        const titles = [
            'Seleccionar Parte del Cuerpo',
            'Foto Macroscópica',
            'Fotos Microscópicas',
            'Información de la Lesión'
        ];
        return titles[this.currentStep - 1];
    }

    getStepDescription(): string {
        const descriptions = [
            'Selecciona la ubicación de la lesión en el diagrama del cuerpo',
            'Captura o sube una foto general de la lesión',
            'Captura o sube fotos tomadas con el dermatoscopio',
            'Completa la información adicional sobre la lesión'
        ];
        return descriptions[this.currentStep - 1];
    }

    async onSubmit(): Promise<void> {
        if (this.lesionForm.valid && this.macroscopicPhotos.length > 0) {
            this.isLoading = true;
            this.errorMessage = null;

            try {
                // Convert photos to base64 DTOs
                const macroscopicImages = await this.convertPhotosToDto(this.macroscopicPhotos);
                const microscopicImages = await this.convertPhotosToDto(this.microscopicPhotos);

                if (this.isAddMode && this.diagnosticId) {
                    // Add mode: add images to existing diagnostic
                    const addDto = {
                        macroscopicImages,
                        microscopicImages
                    };

                    this.diagnosticoService.addImagesToDiagnostic(this.diagnosticId, addDto).subscribe({
                        next: (result) => {
                            console.log('Images added successfully:', result);
                            this.isLoading = false;
                            this.router.navigate(['/lesion/diagnostico', this.diagnosticId]);
                        },
                        error: (error) => {
                            console.error('Error adding images:', error);
                            this.errorMessage = 'Error al agregar las imágenes. Por favor, intenta de nuevo.';
                            this.isLoading = false;
                        }
                    });
                } else {
                    // Create mode: create new diagnostic
                    const createDto: CreateDiagnosticDto = {
                        name: this.lesionForm.value.name,
                        observations: this.lesionForm.value.observations || undefined,
                        patientId: this.pacienteId,
                        bodyPart: this.lesionForm.value.bodyPart,
                        bodyPartCoordinates: this.lesionForm.value.bodyPartCoordinates,
                        macroscopicImages,
                        microscopicImages
                    };

                    this.diagnosticoService.createDiagnostic(createDto).subscribe({
                        next: (result) => {
                            console.log('Diagnostic created successfully:', result);
                            this.isLoading = false;
                            this.router.navigate(['/lesion/paciente', this.pacienteId]);
                        },
                        error: (error) => {
                            console.error('Error creating diagnostic:', error);
                            this.errorMessage = 'Error al guardar la lesión. Por favor, intenta de nuevo.';
                            this.isLoading = false;
                        }
                    });
                }
            } catch (error) {
                console.error('Error converting images:', error);
                this.errorMessage = 'Error al procesar las imágenes. Por favor, intenta de nuevo.';
                this.isLoading = false;
            }
        }
    }

    private async convertPhotosToDto(photos: PhotoCaptureResult[]): Promise<DiagnosticImageDto[]> {
        const result: DiagnosticImageDto[] = [];

        for (const photo of photos) {
            // Extract base64 content from data URL
            const base64Content = photo.preview.split(',')[1];

            result.push({
                fileName: photo.file.name,
                base64Content: base64Content,
                contentType: photo.file.type
            });
        }

        return result;
    }

    cancel(): void {
        if (confirm('¿Estás seguro de que deseas cancelar? Se perderán todos los datos ingresados.')) {
            this.router.navigate(['/lesion/paciente', this.pacienteId]);
        }
    }
}
