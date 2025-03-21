import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { AuthService } from "../../auth/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { Employer } from "../../auth/entities/user";
import { ConfirmationPopupComponent } from "../../theme/shared/confirmation-popup/confirmation-popup.component";
import { EmployerService } from "../employer.service";
import { EditEmployeeComponent } from "../../employees/edit-employee/edit-employee.component";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    templateUrl: './employer.component.html',
    styleUrls: ['./employer.component.scss']
})

export class EmployerComponent implements OnInit {
    isLoadingEmployer = true
    isLoadingRequests = true
    isProcessingAction = false
    employer_id: number
    employer: Employer
    displayedColumns = ['month',  'count']
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()

    constructor(private employerService: EmployerService, private route: ActivatedRoute, private toastService: ToastService, 
                public dialog: MatDialog, private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if(params['employer']) {
                this.employer_id = params['employer']
                this.getEmployer()
                this.getRequestLog()
            }
        })
    }

    getEmployer() {
        this.isLoadingEmployer = true

        this.employerService.getEmployer(this.employer_id).subscribe(
            (res: any) => {
                if(!res) {
                    this.router.navigateByUrl('/employers')
                    this.toastService.error('Employer not found')
                }
                this.employer = res
            },
            (error) => {
                this.isLoadingEmployer = false
                const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again"
                this.toastService.error(message)
            },
            () => this.isLoadingEmployer = false
        )
    }

    getRequestLog() {
        this.isLoadingRequests = true

        this.employerService.getRequestLog(this.employer_id).subscribe(
            (res: any) => {
                this.dataSource.data = res
            },
            (error) => {
                this.isLoadingRequests = false
                const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again"
                this.toastService.error(message)
            },
            () => this.isLoadingRequests = false
        )
    }

    editEmployer() {
        const dialogRef = this.dialog.open(EditEmployeeComponent, {
            width: '600px',
            data: this.employer,
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(updated => {
            if(updated) {
                this.getEmployer()
            }
        })
    }

    deleteEmployer() {
        const confirmationMessage = "Are you sure you want to delete this employer?"

        const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
            width: '400px',
            data: confirmationMessage
        })

        dialogRef.afterClosed().subscribe(confirmed => {
            if(confirmed) {
                this.isProcessingAction = true

                this.employerService.deleteEmployer(this.employer_id).subscribe(
                    () => {
                        this.router.navigateByUrl('/employers')
                        this.toastService.success('Employer deleted successfully')
                    },
                    (error) => {
                        this.isProcessingAction = false
                        const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again."
                        this.toastService.error(message)
                    },
                    () => this.isProcessingAction = false
                )
            }
        })
    }
}