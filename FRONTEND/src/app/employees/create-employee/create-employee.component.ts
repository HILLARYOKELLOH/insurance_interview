import { Component } from "@angular/core";
import { EmployeeService } from "../employees.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ToastService } from "../../theme/shared/toast/toast.service";
import moment from "moment";

@Component({
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.scss']
})

export class CreateEmployeeComponent {
    isLoading = false
    createEmployeeForm = new FormGroup({
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        dob: new FormControl('', Validators.required),
        is_internal: new FormControl('', Validators.required),
        ext_organization: new FormControl(null)
    })

    constructor(private employeeService: EmployeeService, private toastService: ToastService, private router: Router,
                public dialogRef: MatDialogRef<CreateEmployeeComponent>) {}

    createEmployee() {
        if(this.createEmployeeForm.valid) {
            this.isLoading = true;

            const employee = {
                ...this.createEmployeeForm.value,
                dob: moment(this.createEmployeeForm.value.dob as string).format('YYYY-MM-DD')
            }

            this.employeeService.createEmployee(employee).subscribe(
                (res: any) => {
                    this.toastService.success("Employee created successfully")
                    this.dialogRef.close(true)
                    this.router.navigateByUrl(`/employees/${res.id}`)
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
        const control = this.createEmployeeForm.get(controlName) as FormControl

        return 'This field is required'
    }

    isExternalEmployee(): boolean {
        const isInternal = this.createEmployeeForm.value.is_internal
        if(this.createEmployeeForm.get('is_internal')?.invalid) return false
        return !isInternal
    }

    toggleValidator() {
        const isInternal = this.createEmployeeForm.value.is_internal
        if (isInternal) {
            this.createEmployeeForm.get('ext_organization')?.removeValidators(Validators.required)
            this.createEmployeeForm.get('ext_organization')?.setErrors(null)
        }
        else this.createEmployeeForm.get('ext_organization')?.addValidators(Validators.required)
    }
}