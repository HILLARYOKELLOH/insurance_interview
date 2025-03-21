import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../config/api.config";
import { PageInfo } from "../theme/shared/entities/page-info";

@Injectable({providedIn: 'root'})
export class EmployerService {
    private apiUrl = `${API_BASE_URL}/employers`
    
    constructor(private http: HttpClient) {}
    
    getEmployers(page: PageInfo) {
        const params = { ...page }

        return this.http.get(`${this.apiUrl}`, { params })
    }

    getEmployer(id: number) {
        return this.http.get(`${this.apiUrl}/${id}`)
    }

    createEmployer(employer: any) {
        return this.http.post(`${this.apiUrl}`, employer)
    }

    editEmployer(employer: any, id: number) {
        return this.http.put(`${this.apiUrl}/${id}`, employer)
    }

    deleteEmployer(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    resetPassword(user_id: number) {
        return this.http.get(`${API_BASE_URL}/auth/${user_id}/reset-password`)
    }

    getRequestLog(employer_id: number) {
        return this.http.get(`${API_BASE_URL}/request-logs/${employer_id}`)
    }
}