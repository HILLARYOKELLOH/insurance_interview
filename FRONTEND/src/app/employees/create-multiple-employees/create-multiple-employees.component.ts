import { Component } from "@angular/core";
import { EmployeeService } from "../employees.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastService } from "../../theme/shared/toast/toast.service";

@Component({
    templateUrl: './create-multiple-employees.component.html',
    styleUrls: ['./create-multiple-employees.component.scss']
})

export class CreateMultipleEmployeesComponent {
    isLoading = false
    createEmployeeForm = new FormGroup({
        is_internal: new FormControl('', Validators.required)
    })
    file: File

    constructor(private employeeService: EmployeeService, private toastService: ToastService, private router: Router,
                public dialogRef: MatDialogRef<CreateMultipleEmployeesComponent>) {}

    createEmployees() {
        if(this.createEmployeeForm.valid && this.file) {
            this.isLoading = true;

            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('is_internal', this.createEmployeeForm.value.is_internal as string)

            this.employeeService.createMultipleEmployees(formData).subscribe({
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
        const control = this.createEmployeeForm.get(controlName) as FormControl

        return 'This field is required'
    }

    downloadTemplate() {
        const link = document.createElement('a')
        link.href = 'assets/files/template.xls'
        link.download = 'template.xls'
        link.click()
    }
}