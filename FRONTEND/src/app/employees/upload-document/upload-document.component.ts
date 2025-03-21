import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { Employee } from "../entities/employee";
import { UploadsService } from "../../uploads/uploads.service";

@Component({
    templateUrl: './upload-document.component.html',
    styleUrls: ['./upload-document.component.scss']
})

export class UploadDocumentComponent {
    isLoading = false
    uploadDocumentForm = new FormGroup({
        document_title: new FormControl('', Validators.required)
    })
    file: File

    constructor(private uploadService: UploadsService, private toastService: ToastService,
                public dialogRef: MatDialogRef<UploadDocumentComponent>, @Inject(MAT_DIALOG_DATA) public data: Employee) {}

    uploadDocument() {
        if(this.uploadDocumentForm.valid && this.file) {
            this.isLoading = true;

            const formData = new FormData();
            formData.append('document', this.file);
            formData.append('employee_id', this.data.id + '')
            formData.append('document_title', this.uploadDocumentForm.value.document_title as string)

            this.uploadService.createUpload(formData).subscribe({
                next: () => {
                    this.dialogRef.close(true)
                },
                error: (error) => {
                    this.isLoading = false
                    const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again."
                    this.toastService.error(message)
                },
                complete: () => this.isLoading = false
            });
        }
    }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if (file) {
          this.file = file;
        }
    }

    getErrorMessage(controlName: string) {
        const control = this.uploadDocumentForm.get(controlName) as FormControl

        return 'This field is required'
    }
}