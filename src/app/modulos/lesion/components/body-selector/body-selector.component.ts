import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { BodyPartModel, BODY_PARTS } from '../../models/body-part.model';

export interface BodyPartSelection {
    bodyPart: BodyPartModel;
    coordinates: { x: number; y: number };
}

@Component({
    selector: 'app-body-selector',
    templateUrl: './body-selector.component.html',
    styleUrls: ['./body-selector.component.scss']
})
export class BodySelectorComponent {
    @Output() bodyPartSelected = new EventEmitter<BodyPartSelection>();

    currentView: 'front' | 'back' = 'front';
    selectedBodyPart: BodyPartModel | null = null;
    hoveredBodyPart: BodyPartModel | null = null;

    bodyParts = BODY_PARTS;

    constructor(private renderer: Renderer2) { }

    get currentBodyParts(): BodyPartModel[] {
        return this.bodyParts.filter(bp => bp.view === this.currentView);
    }

    toggleView(): void {
        this.currentView = this.currentView === 'front' ? 'back' : 'front';
        this.selectedBodyPart = null;
    }

    onSvgClick(event: MouseEvent): void {
        const svg = event.currentTarget as SVGSVGElement;
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;

        const matrix = svg.getScreenCTM();
        if (matrix) {
            const svgPoint = point.matrixTransform(matrix.inverse());

            // Find which body part was clicked
            for (const bodyPart of this.currentBodyParts) {
                const pathElement = document.getElementById(`path-${bodyPart.name}`) as SVGPathElement | null;
                if (pathElement && this.isPointInPath(pathElement, svgPoint.x, svgPoint.y)) {
                    this.selectedBodyPart = bodyPart;
                    this.bodyPartSelected.emit({
                        bodyPart: bodyPart,
                        coordinates: { x: svgPoint.x, y: svgPoint.y }
                    });
                    break;
                }
            }
        }
    }

    onPathHover(bodyPart: BodyPartModel): void {
        this.hoveredBodyPart = bodyPart;
    }

    onPathLeave(): void {
        this.hoveredBodyPart = null;
    }

    private isPointInPath(path: SVGPathElement, x: number, y: number): boolean {
        const svg = path.ownerSVGElement as SVGSVGElement;
        if (svg) {
            const point = svg.createSVGPoint();
            point.x = x;
            point.y = y;
            return path.isPointInFill(point);
        }
        return false;
    }

    getPathClass(bodyPart: BodyPartModel): string {
        const classes = ['body-part'];
        if (this.selectedBodyPart?.name === bodyPart.name) {
            classes.push('selected');
        }
        if (this.hoveredBodyPart?.name === bodyPart.name) {
            classes.push('hovered');
        }
        return classes.join(' ');
    }
}
