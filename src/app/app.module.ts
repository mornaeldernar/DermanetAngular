import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Shared Module (contiene sidebar, header, footer, etc.)
import { SharedModule } from './shared/shared.module';

// Interceptors
import { MyHttpInterceptor } from './interceptor/my-http.interceptor';

// Guards
import { JwtGuard } from './guard/jwt.guard';
import { LoggedInGuard } from './guard/logged-in.guard';

// Services
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule, // Para formularios reactivos
    FormsModule, // Para formularios template-driven
    SharedModule, // Contiene sidebar, header, footer
    AppRoutingModule // Debe ser el último
  ],
  providers: [
    AuthService,
    LocalStorageService,
    LoginService,
    JwtGuard,
    LoggedInGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
