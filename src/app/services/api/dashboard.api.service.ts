import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AppointmentModel } from 'src/app/models/appointment.model';

export interface DashboardStats {
    totalPatients: number;
    totalAppointments: number;
    pendingAppointments: number;
}

export interface MonthlyStats {
    month: number;
    year: number;
    count: number;
}

export interface DailyStats {
    statusCounts: { [key: string]: number };
    totalToday: number;
}

@Injectable({
    providedIn: 'root'
})
export class DashboardApiService {
    private apiUrl = environment.apiUrl + '/dashboard';

    constructor(private http: HttpClient) { }

    getStats(): Observable<DashboardStats> {
        return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
    }

    getMonthlyStats(): Observable<MonthlyStats[]> {
        return this.http.get<MonthlyStats[]>(`${this.apiUrl}/charts/monthly`);
    }

    getDailyStats(): Observable<DailyStats> {
        return this.http.get<DailyStats>(`${this.apiUrl}/charts/daily`);
    }

    getUpcomingAppointments(count: number = 10): Observable<AppointmentModel[]> {
        return this.http.get<AppointmentModel[]>(`${this.apiUrl}/appointments/upcoming?count=${count}`);
    }
}
