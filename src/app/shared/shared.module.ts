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



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    BodylistComponent,
    BodyitemComponent,
    MicrolistComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
    BodylistComponent,
    BodyitemComponent,
    MicrolistComponent
  ]
})
export class SharedModule { }
