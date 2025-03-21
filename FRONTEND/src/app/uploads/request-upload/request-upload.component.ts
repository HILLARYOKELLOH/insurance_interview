import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { UploadsService } from "../uploads.service";

@Component({
    templateUrl: './request-upload.component.html',
    styleUrls: ['./request-upload.component.scss']
})

export class RequestUploadComponent {
    isLoading = false
    isLoadingRoles = false
    requestUploadForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
    })

    constructor(private toastService: ToastService, public dialogRef: MatDialogRef<RequestUploadComponent>,
        private uploadsService: UploadsService) {}

    requestUpload() {
        if(this.requestUploadForm.valid) {
            this.isLoading = true;

            this.uploadsService.requestUpload(this.requestUploadForm.value).subscribe({
                next: () => {
                    this.toastService.success("Request sent successfully")
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
        const control = this.requestUploadForm.get(controlName) as FormControl
        
        if(control.hasError('email')) return 'Please provide a valid email address'

        return 'This field is required'
    }
}