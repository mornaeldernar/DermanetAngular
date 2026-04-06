import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosticoApiService } from 'src/app/services/api/diagnostico.api.service';
import { environment } from 'src/environment/environment';

@Component({
    selector: 'app-diagnostic-detail',
    templateUrl: './diagnostic-detail.component.html',
    styleUrls: ['./diagnostic-detail.component.scss']
})
export class DiagnosticDetailComponent implements OnInit {
    diagnosticId!: number;
    diagnostic: any;
    loading: boolean = true;
    error: string | null = null;
    selectedMacroId: number | null = null;
    filteredMicroscopicImages: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private diagnosticoService: DiagnosticoApiService
    ) { }

    ngOnInit(): void {
        this.diagnosticId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadDiagnostic();
    }

    loadDiagnostic(): void {
        this.loading = true;
        this.error = null;

        this.diagnosticoService.getDiagnosticById(this.diagnosticId).subscribe({
            next: (data) => {
                this.diagnostic = data;
                this.filteredMicroscopicImages = data.microscopicImages || [];
                this.loading = false;

                // Debug: Log macro and micro images to see the structure
                console.log('Diagnostic data:', data);
                console.log('Macroscopic images:', data.macroscopicImages);
                console.log('Microscopic images:', data.microscopicImages);

                if (data.microscopicImages && data.microscopicImages.length > 0) {
                    console.log('First micro MacroId:', data.microscopicImages[0].macroId);
                }
            },
            error: (err) => {
                console.error('Error loading diagnostic:', err);
                this.error = 'Error al cargar la información del diagnóstico';
                this.loading = false;
            }
        });
    }

    goBack(): void {
        // Get patient ID from the loaded diagnostic
        const patientId = this.diagnostic?.patientId || 1;
        this.router.navigate(['/lesion/paciente', patientId]);
    }

    editDiagnostic(): void {
        alert('Funcionalidad de edición pendiente');
    }

    deleteDiagnostic(): void {
        if (confirm('¿Estás seguro de que deseas eliminar esta lesión?')) {
            alert('Funcionalidad de eliminación pendiente');
            this.goBack();
        }
    }

    addEvolutionRecord(): void {
        console.log('Navigating to add photos for diagnostic:', this.diagnosticId);
        this.router.navigate(['/lesion/diagnostico', this.diagnosticId, 'agregar-fotos']);
    }

    // Helper method to get full image URL
    getImageUrl(location: string): string {
        if (!location) return './assets/no-image.avif';
        if (location.startsWith('http')) return location;
        return environment.apiUrl + location;
    }

    // Select a macro and filter microscopic images
    selectMacro(macroImageId: number): void {
        this.selectedMacroId = macroImageId;

        // Find the macro image to get its MacroId (entity ID, not image ID)
        const macroImage = this.diagnostic.macroscopicImages.find((img: any) => img.id === macroImageId);

        if (macroImage && macroImage.macroId) {
            // Filter microscopic images that have this macro's entity ID
            this.filteredMicroscopicImages = this.diagnostic.microscopicImages.filter((micro: any) =>
                micro.macroId === macroImage.macroId
            );

            console.log(`Selected macro image ${macroImageId}, macro entity ID: ${macroImage.macroId}, found ${this.filteredMicroscopicImages.length} microscopic images`);
        } else {
            console.log(`Macro image ${macroImageId} doesn't have macroId, showing all`);
            this.filteredMicroscopicImages = this.diagnostic.microscopicImages;
        }
    }

    // Show all microscopic images
    showAllMicros(): void {
        this.selectedMacroId = null;
        this.filteredMicroscopicImages = this.diagnostic.microscopicImages || [];
    }
}
