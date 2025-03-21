import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "./reducers";
import { user } from "./+state/auth.selectors";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL } from "../config/api.config";

@Injectable({providedIn: 'root'})
export class AuthService {
    private apiUrl = `${API_BASE_URL}/auth`
    user$ = this.store.select(user)
    
    constructor(private store: Store<AppState>, private http: HttpClient) {}

    getAuthenticationToken() {
        const user = JSON.parse(localStorage.getItem('user') as string)

        return user ? user.token : null
    }
    
    login(user: any) {
        return this.http.post(`${this.apiUrl}/login`, user)
    }

    register(user: any) {
        return this.http.post(`${API_BASE_URL}/employers`, user)
    }

    logout() {
        return this.http.get(`${this.apiUrl}/logout`)
    }
}