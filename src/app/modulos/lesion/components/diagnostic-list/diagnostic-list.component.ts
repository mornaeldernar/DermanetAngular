import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiagnosticoApiService } from 'src/app/services/api/diagnostico.api.service';
import { environment } from 'src/environment/environment';

@Component({
    selector: 'app-diagnostic-list',
    templateUrl: './diagnostic-list.component.html',
    styleUrls: ['./diagnostic-list.component.scss']
})
export class DiagnosticListComponent implements OnInit {
    pacienteId!: number;
    diagnostics: any[] = [];
    loading: boolean = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private diagnosticoService: DiagnosticoApiService
    ) { }

    ngOnInit(): void {
        this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadDiagnostics();
    }

    loadDiagnostics(): void {
        this.loading = true;
        this.error = null;

        this.diagnosticoService.getDiagnosticsByPatient(this.pacienteId).subscribe({
            next: (data) => {
                this.diagnostics = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading diagnostics:', err);
                this.error = 'Error al cargar las lesiones del paciente';
                this.loading = false;
            }
        });
    }

    viewDiagnostic(diagnosticId: number): void {
        this.router.navigate(['/lesion/diagnostico', diagnosticId]);
    }

    createNewLesion(): void {
        this.router.navigate(['/lesion/paciente', this.pacienteId, 'nueva-lesion']);
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Helper method to get full image URL
    getImageUrl(location: string): string {
        if (!location) return './assets/no-image.avif';
        if (location.startsWith('http')) return location;
        return environment.apiUrl + location;
    }
}
