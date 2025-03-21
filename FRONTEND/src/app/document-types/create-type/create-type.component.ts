import { Component, Inject } from "@angular/core";
import { DocumentTypeService } from "../document-type.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";

@Component({
    templateUrl: './create-type.component.html',
    styleUrls: ['./create-type.component.scss']
})

export class CreateDocumentTypeComponent {
    isLoading = false
    createTypeForm = new FormGroup({
        title: new FormControl('', Validators.required)
    })

    constructor(private typeService: DocumentTypeService, private toastService: ToastService, 
        public dialogRef: MatDialogRef<CreateDocumentTypeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

    createType() {
        if(this.createTypeForm.valid) {
            this.isLoading = true;
            const documentType = { ...this.createTypeForm.value, employer_id: this.data.employer_id }

            this.typeService.createDocumentType(documentType).subscribe({
                next: () => {
                    this.toastService.success("Document type created successfully")
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
        const control = this.createTypeForm.get(controlName) as FormControl
        
        return 'This field is required'
    }
}