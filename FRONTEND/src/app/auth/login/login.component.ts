import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppState } from "../reducers";
import { Store } from '@ngrx/store';
import { login } from "../+state/auth.actions";
import { AuthService } from "../auth.service";
import { ToastService } from "../../theme/shared/toast/toast.service";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    isLoading = false
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    })
    showPassword = false

    constructor(private store: Store<AppState>, private router: Router, private authService: AuthService,
                private toastService: ToastService) {}

    getErrorMessage(controlName: string) {
        const control = this.loginForm.get(controlName) as FormControl
        if(control.hasError('email')) return 'Please provide a valid email address'
        
        return 'This field is required'
    }

    login() {
        if(this.loginForm.valid) {
            this.isLoading = true;

            this.authService.login(this.loginForm.value).subscribe(
                (res: any) => {
                    this.store.dispatch(login({user: res}))
                    this.router.navigateByUrl('/dashboard')
                },
                (error) => {
                    this.isLoading = false
                    const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again."
                    this.toastService.error(message)
                },
                () => this.isLoading = false
            )
        }
    }
}
