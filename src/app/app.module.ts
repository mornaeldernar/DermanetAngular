import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Componentes
import { NavbarComponent } from './components/navbar/navbar.component';
import { DoctorModule } from './modulos/doctor/doctor.module';
import { UserModule } from './modulos/user/user.module';
import { DiagnosticoModule } from './modulos/diagnostico/diagnostico.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PacienteModule } from './modulos/paciente/paciente.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DoctorModule,
    PacienteModule,
    DiagnosticoModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
