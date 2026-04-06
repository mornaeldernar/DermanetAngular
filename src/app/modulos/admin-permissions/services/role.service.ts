import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role, CreateRoleDto, UpdateRoleDto, Module } from '../models/role.model';
import { environment } from '../../../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private apiUrl = `${environment.apiUrl}/role`;

    constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(this.apiUrl);
    }

    getRole(id: number): Observable<Role> {
        return this.http.get<Role>(`${this.apiUrl}/${id}`);
    }

    createRole(role: CreateRoleDto): Observable<Role> {
        return this.http.post<Role>(this.apiUrl, role);
    }

    updateRole(id: number, role: UpdateRoleDto): Observable<Role> {
        return this.http.put<Role>(`${this.apiUrl}/${id}`, role);
    }

    deleteRole(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getModules(): Observable<Module[]> {
        return this.http.get<Module[]>(`${this.apiUrl}/modules`);
    }
}
