import { Component, Inject, OnInit } from "@angular/core";
import { EmployeeService } from "../employees.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { Employee } from "../entities/employee";
import { DocumentTypeService } from "../../document-types/document-type.service";

@Component({
    templateUrl: './create-submission-request.component.html',
    styleUrls: ['./create-submission-request.component.scss']
})

export class CreateSubmissionRequestComponent implements OnInit {
    isLoading = false
    isLoadingTypes = false
    createRequestForm = new FormGroup({
        email: new FormControl(this.data.length > 1 ? 'Multiple' : this.data[0].email),
        document_title: new FormControl('', Validators.required)
    })
    documentTypes: any[] = []

    constructor(private employeeService: EmployeeService, private toastService: ToastService, private router: Router,
                public dialogRef: MatDialogRef<CreateSubmissionRequestComponent>, @Inject(MAT_DIALOG_DATA) public data: Employee[],
                private typeService: DocumentTypeService) {}

    ngOnInit(): void {
        this.getTypes()
    }

    createRequest() {
        if(this.createRequestForm.valid) {
            this.isLoading = true;

            const request: any = {
                document_title: this.createRequestForm.value.document_title
            }

            if(this.data.length > 1) {
                request.employee_ids = this.data.map(e => e.id)

                this.employeeService.createSubmissionRequestBulk(request).subscribe(
                    (res: any) => {
                        this.toastService.success("Requests sent successfully")
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
            else {
                request.employee_id = this.data[0].id

                this.employeeService.createSubmissionRequest(request).subscribe(
                    (res: any) => {
                        this.toastService.success("Request sent successfully")
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
    }

    getTypes() {
        this.isLoadingTypes = true

        this.typeService.getDocumentTypes(this.data[0].employer_id).subscribe({
            next: (res: any) => {
                this.documentTypes = res
            },
            error: (error) => {
                this.isLoadingTypes = false
                const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again"
                this.toastService.error(message)
            },
            complete: () => this.isLoadingTypes = false
        })
    }

    getErrorMessage(controlName: string) {
        const control = this.createRequestForm.get(controlName) as FormControl

        return 'This field is required'
    }
}