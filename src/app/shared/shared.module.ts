import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes compartidos
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SecureImageComponent } from './secure-image/secure-image.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { BodylistComponent } from './bodylist/bodylist.component';
import { MicrolistComponent } from './microlist/microlist.component';

// Importar BodyitemComponent si existe
import { BodyitemComponent } from './bodylist/bodyitem/bodyitem.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    HistoriaClinicaComponent,
    BodylistComponent,
    MicrolistComponent,
    BodyitemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SecureImageComponent // Standalone component - se importa, no se declara
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    SecureImageComponent,
    HistoriaClinicaComponent,
    BodylistComponent,
    MicrolistComponent,
    BodyitemComponent
  ]
})
export class SharedModule { }
