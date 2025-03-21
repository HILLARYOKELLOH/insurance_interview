import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../config/api.config";

@Injectable({providedIn: 'root'})
export class DocumentTypeService {
    private apiUrl = `${API_BASE_URL}/document-types`
    
    constructor(private http: HttpClient) {}
    
    getDocumentTypes(employer_id: number) {
        const params = { employer_id }

        return this.http.get(`${this.apiUrl}`, { params })
    }

    createDocumentType(document_type: any) {
        return this.http.post(`${this.apiUrl}`, document_type)
    }

    deleteDocumentType(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }
}