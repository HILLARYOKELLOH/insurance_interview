import { Component, Inject } from "@angular/core";
import { EmployerService } from "../employer.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { Employer } from "../../auth/entities/user";

@Component({
    templateUrl: './edit-employer.component.html',
    styleUrls: ['./edit-employer.component.scss']
})

export class EditEmployerComponent {
    isLoading = false
    editUserForm = new FormGroup({
        first_name: new FormControl(this.data.first_name, Validators.required),
        email: new FormControl(this.data.email, [Validators.required, Validators.email]),
        phone: new FormControl(this.data.phone, Validators.required),
        address: new FormControl(this.data.address, Validators.required),
    })

    constructor(private employerService: EmployerService, private toastService: ToastService, 
            @Inject(MAT_DIALOG_DATA) public data: Employer, public dialogRef: MatDialogRef<EditEmployerComponent>) {}

    editUser() {
        if(this.editUserForm.valid) {
            this.isLoading = true;

            this.employerService.editEmployer(this.editUserForm.value, this.data.id as number).subscribe(
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