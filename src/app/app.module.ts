import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PacienteModule } from './modulos/paciente/paciente.module';
import { UserModule } from './modulos/user/user.module';
import { DoctorModule } from './modulos/doctor/doctor.module';
import { DiagnosticoModule } from './modulos/diagnostico/diagnostico.module';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';

//Locales
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from './modulos/calendar/calendar.module';
import { PagesModule } from './pages/pages.module';
import { MyHttpInterceptor } from './interceptor/my-http.interceptor';

@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
        NotFoundComponent,
        DashboardComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        PacienteModule,
        UserModule,
        CalendarModule,
        DoctorModule,
        DiagnosticoModule,
        FullCalendarModule,
        PagesModule
      ],
      providers: [
        { provide: LOCALE_ID, useValue: navigator.language ?? 'es' },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi:true},
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
  constructor() {
    // 2. Register the locales
    registerLocaleData(localeEs, 'es');
    registerLocaleData(localeEn, 'en');
  }
}
