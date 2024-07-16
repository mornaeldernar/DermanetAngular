import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BodylistComponent } from './bodylist/bodylist.component';
import { BodyitemComponent } from './bodylist/bodyitem/bodyitem.component';
import { MicrolistComponent } from './microlist/microlist.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { SecureImageComponent } from './secure-image/secure-image.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    BodylistComponent,
    BodyitemComponent,
    MicrolistComponent,
    HistoriaClinicaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SecureImageComponent
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    BodylistComponent,
    BodyitemComponent,
    MicrolistComponent,
    HistoriaClinicaComponent,
    SecureImageComponent
  ]
})
export class SharedModule { }
