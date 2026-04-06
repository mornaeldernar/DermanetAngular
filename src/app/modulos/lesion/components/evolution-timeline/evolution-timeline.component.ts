import { Component, Input } from '@angular/core';

export interface EvolutionRecord {
    id: number;
    date: Date;
    observations: string;
    doctorName: string;
}

@Component({
    selector: 'app-evolution-timeline',
    templateUrl: './evolution-timeline.component.html',
    styleUrls: ['./evolution-timeline.component.scss']
})
export class EvolutionTimelineComponent {
    @Input() evolutionRecords: EvolutionRecord[] = [];

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getTimeDifference(date: Date): string {
        const now = new Date();
        const recordDate = new Date(date);
        const diffTime = Math.abs(now.getTime() - recordDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 30) return `Hace ${diffDays} días`;
        if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
        return `Hace ${Math.floor(diffDays / 365)} años`;
    }
}
