import { Component } from "@angular/core";
import { AdminService } from "../admin.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";

@Component({
    templateUrl: './create-admin.component.html',
    styleUrls: ['./create-admin.component.scss']
})

export class CreateAdminComponent {
    isLoading = false
    isLoadingRoles = false
    createUserForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
    })
    showPassword = false

    constructor(private adminService: AdminService, private toastService: ToastService, public dialogRef: MatDialogRef<CreateAdminComponent>) {}

    createUser() {
        if(this.createUserForm.valid) {
            this.isLoading = true;

            this.adminService.createAdmin(this.createUserForm.value).subscribe({
                next: () => {
                    this.toastService.success("Admin created successfully")
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