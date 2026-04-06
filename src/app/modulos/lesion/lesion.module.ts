import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LesionRoutingModule } from './lesion-routing.module';
import { LesionComponent } from './lesion.component';
import { BodySelectorComponent } from './components/body-selector/body-selector.component';
import { PhotoCaptureComponent } from './components/photo-capture/photo-capture.component';
import { LesionFormComponent } from './components/lesion-form/lesion-form.component';
import { DiagnosticListComponent } from './components/diagnostic-list/diagnostic-list.component';
import { DiagnosticDetailComponent } from './components/diagnostic-detail/diagnostic-detail.component';
import { EvolutionTimelineComponent } from './components/evolution-timeline/evolution-timeline.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        LesionComponent,
        BodySelectorComponent,
        PhotoCaptureComponent,
        LesionFormComponent,
        DiagnosticListComponent,
        DiagnosticDetailComponent,
        EvolutionTimelineComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        LesionRoutingModule
    ]
})
export class LesionModule { }
