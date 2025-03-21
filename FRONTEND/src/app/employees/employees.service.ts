import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../config/api.config";
import { PageInfo } from "../theme/shared/entities/page-info";
import { Employee } from "./entities/employee";


@Injectable({providedIn: 'root'})
export class EmployeeService {
    private apiUrl = `${API_BASE_URL}/employees`
    
    constructor(private http: HttpClient) {}
    
    getEmployees(page: PageInfo, filters: any) {
        const params = { ...page, ...filters }

        return this.http.get(`${this.apiUrl}`, { params })
    }

    getEmployee(id: number) {
        return this.http.get(`${this.apiUrl}/${id}`)
    }

    createEmployee(employee: any) {
        return this.http.post(`${this.apiUrl}`, employee)
    }

    createMultipleEmployees(employees: any) {
        return this.http.post(`${this.apiUrl}/bulk-create`, employees)
    }

    editEmployee(employee: any, id: number) {
        return this.http.put(`${this.apiUrl}/${id}`, employee)
    }

    deleteEmployee(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    getSubmissionRequests(page: PageInfo, employee_id: number) {
        const params = { ...page, employee_id }

        return this.http.get(`${API_BASE_URL}/submission-requests`, { params })
    }

    createSubmissionRequest(request: any) {
        return this.http.post(`${API_BASE_URL}/submission-requests`, request)
    }

    editSubmissionRequest(request: any, id: number) {
        return this.http.put(`${API_BASE_URL}/submission-requests/${id}`, request)
    }

    createSubmissionRequestBulk(request: any) {
        return this.http.post(`${API_BASE_URL}/submission-requests/bulk/store`, request)
    }

}