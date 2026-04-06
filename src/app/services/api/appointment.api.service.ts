import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AppointmentModel, CreateAppointmentDto, UpdateAppointmentDto, AppointmentFilters } from 'src/app/models/appointment.model';
import { PageingResponseDto } from 'src/app/models/dto/pageing.response.dto';

@Injectable({
    providedIn: 'root'
})
export class AppointmentApiService {
    private apiUrl = environment.apiUrl + environment.endpoints.appointment;

    constructor(private http: HttpClient) { }

    listAppointments(filters?: AppointmentFilters): Observable<PageingResponseDto<AppointmentModel>> {
        let params = new HttpParams();

        if (filters) {
            if (filters.doctorId) params = params.set('doctorId', filters.doctorId.toString());
            if (filters.patientId) params = params.set('patientId', filters.patientId.toString());
            if (filters.startDate) params = params.set('startDate', filters.startDate.toISOString());
            if (filters.endDate) params = params.set('endDate', filters.endDate.toISOString());
            if (filters.status) params = params.set('status', filters.status);
            if (filters.page !== undefined) params = params.set('page', filters.page.toString());
            if (filters.size !== undefined) params = params.set('size', filters.size.toString());
        }

        return this.http.get<PageingResponseDto<AppointmentModel>>(this.apiUrl, { params });
    }

    getAppointmentById(id: number): Observable<AppointmentModel> {
        return this.http.get<AppointmentModel>(`${this.apiUrl}/${id}`);
    }

    getAppointmentsByDoctor(doctorId: number, startDate?: Date, endDate?: Date): Observable<AppointmentModel[]> {
        let params = new HttpParams();
        if (startDate) params = params.set('startDate', startDate.toISOString());
        if (endDate) params = params.set('endDate', endDate.toISOString());

        return this.http.get<AppointmentModel[]>(`${this.apiUrl}/doctor/${doctorId}`, { params });
    }

    getAppointmentsByPatient(patientId: number, startDate?: Date, endDate?: Date): Observable<AppointmentModel[]> {
        let params = new HttpParams();
        if (startDate) params = params.set('startDate', startDate.toISOString());
        if (endDate) params = params.set('endDate', endDate.toISOString());

        return this.http.get<AppointmentModel[]>(`${this.apiUrl}/patient/${patientId}`, { params });
    }

    createAppointment(appointment: CreateAppointmentDto): Observable<AppointmentModel> {
        return this.http.post<AppointmentModel>(this.apiUrl, appointment);
    }

    updateAppointment(id: number, appointment: UpdateAppointmentDto): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, appointment);
    }

    cancelAppointment(id: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/${id}/cancel`, {});
    }

    checkAvailability(doctorId: number, startTime: Date, endTime: Date, excludeAppointmentId?: number): Observable<{ available: boolean }> {
        let params = new HttpParams()
            .set('doctorId', doctorId.toString())
            .set('startTime', startTime.toISOString())
            .set('endTime', endTime.toISOString());

        if (excludeAppointmentId) {
            params = params.set('excludeAppointmentId', excludeAppointmentId.toString());
        }

        return this.http.get<{ available: boolean }>(`${this.apiUrl}/check-availability`, { params });
    }
}
