import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { SpecialityModel } from 'src/app/models/speciality.model';

@Injectable({
    providedIn: 'root'
})
export class SpecialityApiService {

    constructor(private http: HttpClient) { }

    listSpecialities() {
        let token = localStorage.getItem("token") || "";
        if (token.startsWith("\"")) {
            token = token.slice(1, -1)
        }
        return this.http.get<SpecialityModel[]>(environment.apiUrl + '/speciality', { headers: { 'Authorization': 'Bearer ' + token } });
    }
}
