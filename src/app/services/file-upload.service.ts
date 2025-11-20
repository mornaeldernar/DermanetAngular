import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

export interface UploadProgress{
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  fileName: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) { }

  validateFile(file: File):  { valid: boolean; error?: string } {

    if (file.size > environment.config.maxFileSize) {
      return {
        valid: false,
        error: `El tamaño del archivo excede el límite de ${environment.config.maxFileSize / (1024 * 1024)} MB.`
      }
    }

    if (!environment.config.allowedFileTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Tipo de archivo no permitido. Tipos permitidos: ${environment.config.allowedFileTypes.join(', ')}.`
      }
    };

    return { valid: true };
  }

  uploadFile(file: File, pacienteId: number, endpoint: string): Observable<UploadProgress> {

    const validation = this.validateFile(file);

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('pacienteId', pacienteId.toString());

    return this.http.post(endpoint, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = event.total ? Math.round((event.loaded / event.total) * 100) : 0;
            return {
              progress,
              status: 'uploading' as const,
              fileName: file.name
            };
          case HttpEventType.Response:
            return {
              progress: 100,
              status: 'completed' as const,
              fileName: file.name
            };
          default:
            return {
              progress: 0,
              status: 'pending' as const,
              fileName: file.name
            };
        }
      })
    );
  }
}
