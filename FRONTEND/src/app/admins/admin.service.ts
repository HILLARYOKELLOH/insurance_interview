import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../config/api.config";
import { PageInfo } from "../theme/shared/entities/page-info";

@Injectable({providedIn: 'root'})
export class AdminService {
    private apiUrl = `${API_BASE_URL}/admins`
    
    constructor(private http: HttpClient) {}
    
    getAdmins(page: PageInfo) {
        const params = { ...page }

        return this.http.get(`${this.apiUrl}`, { params })
    }

    createAdmin(admin: any) {
        return this.http.post(`${this.apiUrl}`, admin)
    }

    editAdmin(admin: any, id: number) {
        return this.http.put(`${this.apiUrl}/${id}`, admin)
    }

    deleteAdmin(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    resetPassword(user_id: number) {
        return this.http.get(`${API_BASE_URL}/auth/${user_id}/reset-password`)
    }
}