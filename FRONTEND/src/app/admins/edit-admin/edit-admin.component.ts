import { Component, Inject } from "@angular/core";
import { AdminService } from "../admin.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { Admin } from "../../auth/entities/user";

@Component({
    templateUrl: './edit-admin.component.html',
    styleUrls: ['./edit-admin.component.scss']
})

export class EditAdminComponent {
    isLoading = false
    editUserForm = new FormGroup({
        name: new FormControl(this.data.name, Validators.required),
        email: new FormControl(this.data.email, [Validators.required, Validators.email]),
    })

    constructor(private adminService: AdminService, private toastService: ToastService, 
            @Inject(MAT_DIALOG_DATA) public data: Admin, public dialogRef: MatDialogRef<EditAdminComponent>) {}

    editUser() {
        if(this.editUserForm.valid) {
            this.isLoading = true;

            this.adminService.editAdmin(this.editUserForm.value, this.data.id as number).subscribe(
                () => {
                    this.toastService.success("User updated successfully")
                    this.dialogRef.close(true)
                },
                (error) => {
                    this.isLoading = false
                    const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again"
                    this.toastService.error(message)
                },
                () => this.isLoading = false
            )
        }
    }

    getErrorMessage(controlName: string) {
        const control = this.editUserForm.get(controlName) as FormControl
        
        if(control.hasError('email')) return 'Please provide a valid email address'

        return 'This field is required'
    }
}