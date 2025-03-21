import { Component, Inject, OnInit } from "@angular/core";
import { EmployeeService } from "../employees.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { Employee } from "../entities/employee";
import moment from "moment";

@Component({
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.scss']
})

export class EditEmployeeComponent {
    isLoading = false
    editEmployeeForm = new FormGroup({
        first_name: new FormControl(this.data.first_name, Validators.required),
        last_name: new FormControl(this.data.last_name, Validators.required),
        email: new FormControl(this.data.email, Validators.required),
        is_internal: new FormControl(!!this.data.is_internal, Validators.required),
        dob: new FormControl(this.data.dob, Validators.required),
        ext_organization: new FormControl(this.data.ext_organization)
    })

    constructor(private employeeService: EmployeeService, private toastService: ToastService, 
            @Inject(MAT_DIALOG_DATA) public data: Employee, public dialogRef: MatDialogRef<EditEmployeeComponent>) {}

    editEmployee() {
        if(this.editEmployeeForm.valid) {
            this.isLoading = true;

            const employee = {
                ...this.editEmployeeForm.value,
                dob: moment(this.editEmployeeForm.value.dob as string).format('YYYY-MM-DD')
            }

            this.employeeService.editEmployee(employee, this.data.id as number).subscribe(
                () => {
                    this.toastService.success("Employee updated successfully")
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
        const control = this.editEmployeeForm.get(controlName) as FormControl

        return 'This field is required'
    }

    isExternalEmployee(): boolean {
        const isInternal = this.editEmployeeForm.value.is_internal
        if(this.editEmployeeForm.get('is_internal')?.invalid) return false
        return !isInternal
    }

    toggleValidator() {
        const isInternal = this.editEmployeeForm.value.is_internal
        if (isInternal) {
            this.editEmployeeForm.get('ext_organization')?.removeValidators(Validators.required)
            this.editEmployeeForm.get('ext_organization')?.setErrors(null)
        }
        else this.editEmployeeForm.get('ext_organization')?.addValidators(Validators.required)
    }
}