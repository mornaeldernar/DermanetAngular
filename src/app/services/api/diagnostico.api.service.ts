import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiagnosticoModel } from 'src/app/models/diagnostico.model';
import { LocalStorageService } from '../local-storage.service';
import { environment } from 'src/environment/environment';

export interface CreateDiagnosticDto {
  name: string;
  observations?: string;
  patientId: number;
  bodyPart: string;
  bodyPartCoordinates: string;
  macroscopicImages: DiagnosticImageDto[];
  microscopicImages: DiagnosticImageDto[];
}

export interface DiagnosticImageDto {
  fileName: string;
  base64Content: string;
  contentType: string;
}

export interface DiagnosticDto {
  id: number;
  name: string;
  observations?: string;
  bodyPart: string;
  bodyPartCoordinates?: string;
  createdAt: Date;
  modifiedAt?: Date;
  patientId: number;
  macroscopicImages: ImageInfoDto[];
  microscopicImages: ImageInfoDto[];
}

export interface ImageInfoDto {
  id: number;
  name: string;
  location: string;
  morphology?: string;
  createdAt: string;
  macroId?: number; // For microscopic images
}

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoApiService {

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  private getAuthHeaders() {
    let token = localStorage.getItem("token") || "";
    if (token.startsWith("\"")) {
      token = token.slice(1, -1);
    }
    return { 'Authorization': 'Bearer ' + token };
  }

  listDiagnostics(): Observable<DiagnosticoModel[]> {
    return this.http.get<DiagnosticoModel[]>(
      environment.apiUrl + environment.endpoints.image.base,
      { headers: this.getAuthHeaders() }
    );
  }

  createDiagnostic(data: CreateDiagnosticDto): Observable<DiagnosticDto> {
    return this.http.post<DiagnosticDto>(
      `${environment.apiUrl}/diagnostic`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  getDiagnosticById(id: number): Observable<DiagnosticDto> {
    return this.http.get<DiagnosticDto>(
      `${environment.apiUrl}/diagnostic/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  getDiagnosticsByPatient(patientId: number): Observable<DiagnosticDto[]> {
    return this.http.get<DiagnosticDto[]>(
      `${environment.apiUrl}/diagnostic/patient/${patientId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  addImagesToDiagnostic(diagnosticId: number, data: { macroscopicImages: DiagnosticImageDto[], microscopicImages: DiagnosticImageDto[] }): Observable<DiagnosticDto> {
    return this.http.post<DiagnosticDto>(
      `${environment.apiUrl}/diagnostic/${diagnosticId}/images`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }
}
