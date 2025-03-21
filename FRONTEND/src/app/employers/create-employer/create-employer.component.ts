import { Component } from "@angular/core";
import { EmployerService } from "../employer.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";

@Component({
    templateUrl: './create-employer.component.html',
    styleUrls: ['./create-employer.component.scss']
})

export class CreateEmployerComponent {
    isLoading = false
    isLoadingRoles = false
    createUserForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
    })
    showPassword = false

    constructor(private employerService: EmployerService, private toastService: ToastService, public dialogRef: MatDialogRef<CreateEmployerComponent>) {}

    createUser() {
        if(this.createUserForm.valid) {
            this.isLoading = true;

            this.employerService.createEmployer(this.createUserForm.value).subscribe({
                next: () => {
                    this.toastService.success("Employer created successfully")
                    this.dialogRef.close(true)
                },
                error: (error) => {
                    this.isLoading = false
                    const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again"
                    this.toastService.error(message)
                },
                complete: () => this.isLoading = false
            })
        }
    }

    getErrorMessage(controlName: string) {
        const control = this.createUserForm.get(controlName) as FormControl
        
        if(control.hasError('email')) return 'Please provide a valid email address'

        return 'This field is required'
    }
}