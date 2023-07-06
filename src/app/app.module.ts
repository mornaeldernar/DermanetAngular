import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

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
import { BodyModule } from './modulos/body/body.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PacienteModule,
    UserModule,
    DoctorModule,
    DiagnosticoModule,
    BodyModule

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
