import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { ToastService } from "../../theme/shared/toast/toast.service";

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
    isLoading = false
    registerForm = new FormGroup({
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', Validators.required),
        function: new FormControl('', Validators.required),
        billing_email: new FormControl('', Validators.required),
        kvk_number: new FormControl('', Validators.required),
        organization: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        location: new FormControl('', Validators.required),
        postcode: new FormControl('', Validators.required)
    })

    constructor(private router: Router, private authService: AuthService,
                private toastService: ToastService) {}

    getErrorMessage(controlName: string) {
        const control = this.registerForm.get(controlName) as FormControl
        if(control.hasError('email')) return 'Please provide a valid email address'
        
        return 'This field is required'
    }

    register() {
        if(this.registerForm.valid) {
            this.isLoading = true;

            this.authService.register(this.registerForm.value).subscribe(
                (res: any) => {
                    this.router.navigateByUrl('/')
                    this.toastService.success('Please check your email for login credentials')
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
