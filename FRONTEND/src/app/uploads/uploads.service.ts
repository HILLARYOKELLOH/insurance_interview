import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../config/api.config";
import { PageInfo } from "../theme/shared/entities/page-info";

@Injectable({providedIn: 'root'})
export class UploadsService {
    private apiUrl = `${API_BASE_URL}/uploads`
    
    constructor(private http: HttpClient) {}
    
    getUploads(page: PageInfo, employee_id: number) {
        const params = { ...page, employee_id }

        return this.http.get(`${this.apiUrl}`, { params })
    }

    createUpload(upload: any) {
        return this.http.post(`${this.apiUrl}`, upload)
    }

    editUpload(upload: any, id: number) {
        return this.http.put(`${this.apiUrl}/${id}`, upload)
    }

    deleteUpload(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    requestUpload(user: any) {
        return this.http.post(`${this.apiUrl}/request`, user)
    }

    bulkRequestUpload(file: any) {
        return this.http.post(`${this.apiUrl}/bulk-request`, file)
    }
}