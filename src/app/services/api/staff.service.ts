import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface RegisterStaffRequest {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
}

export interface RegisterStaffResponse {
    token: string;
    expiresIn: number;
}

export interface StaffMember {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    enabled: boolean;
    createdAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class StaffService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    registerStaff(request: RegisterStaffRequest): Observable<RegisterStaffResponse> {
        return this.http.post<RegisterStaffResponse>(`${this.apiUrl}/register/staff`, request);
    }

    getAllStaff(): Observable<StaffMember[]> {
        return this.http.get<StaffMember[]>(`${this.apiUrl}/staff`);
    }

    toggleStaffStatus(staffId: number): Observable<{ enabled: boolean; message: string }> {
        return this.http.patch<{ enabled: boolean; message: string }>(`${this.apiUrl}/staff/${staffId}/toggle-status`, {});
    }
}
