import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export interface AppError {
  message: string;
  statusCode?: number;
  timestamp: Date;
  path?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorLog: AppError[] = [];

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    const appError: AppError = {
      message: errorMessage,
      statusCode: error.status,
      timestamp: new Date(),
      path: error.url || undefined
    };

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
      appError.message = errorMessage;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud inválida. Por favor, verifique los datos enviados.';
          break;
        case 401:
          errorMessage = 'No autorizado. Por favor, inicie sesión.';
          break;
        case 403:
          errorMessage = 'No tiene permisos para realizar esta acción.';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intenta más tarde.';
          break;
        default:
          errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
      }
      appError.message = errorMessage;
    }

    this.errorLog.push(appError);
    console.error('Logged Error:', error);

    return throwError(() => new Error(errorMessage));

  }

  private logError(error: AppError): void {
    this.errorLog.push(error);

    if(this.errorLog.length > 50) {
      this.errorLog.shift();
    }
  }

  getErrorLog(): AppError[] {
    return [...this.errorLog];
  }

  clearErrorLog(): void {
    this.errorLog = [];
  }
}
