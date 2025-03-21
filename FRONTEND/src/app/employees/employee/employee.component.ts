import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, catchError, debounceTime, merge, of, startWith, switchMap, tap } from "rxjs";

import { Employee } from "../entities/employee";
import { EmployeeService } from "../employees.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { AuthService } from "../../auth/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { User } from "../../auth/entities/user";
import { PageInfo } from "../../theme/shared/entities/page-info";
import { ConfirmationPopupComponent } from "../../theme/shared/confirmation-popup/confirmation-popup.component";
import { EditEmployeeComponent } from "../edit-employee/edit-employee.component";
import { CreateSubmissionRequestComponent } from "../create-submission-request/create-submission-request.component";
import { UploadsService } from "../../uploads/uploads.service";
import { UploadDocumentComponent } from "../upload-document/upload-document.component";

@Component({
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit, OnDestroy {
    @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
    isLoadingEmployee = true
    isLoadingSubmissionRequests = false
    isLoadingUploads = false
    isProcessingAction = false
    displayedColumns = ['document_title',  'created_at', 'actions']
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
    uploadsDisplayedColumns = ['document_title', 'created_at', 'actions']
    uploadsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
    tableSubscription: Subscription = new Subscription()
    uploadsTableSubscription: Subscription = new Subscription()
    employee_id: number
    employee: Employee
    user: User | undefined
    isAuthenticated: boolean

    constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private toastService: ToastService, 
                public dialog: MatDialog, private router: Router, private authService: AuthService, private uploadService: UploadsService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            if(params['employee']) {
                this.employee_id = params['employee']
                this.authService.user$.subscribe(user => {
                    this.user = user
                    if(user) this.isAuthenticated = true
                })
                this.getEmployee()
            }
        })
    }

    ngOnDestroy(): void {
        this.tableSubscription.unsubscribe()
        this.uploadsTableSubscription.unsubscribe()
    }

    buildTableContent() {
        this.isLoadingSubmissionRequests = true

        this.tableSubscription = merge(this.paginator.toArray()[0].page).pipe(
            tap(() => {
                this.isLoadingSubmissionRequests = true
                this.dataSource.data = []
            }),
            startWith(''),
            debounceTime(600),
            switchMap(() => this.getSubmissionRequests()),
            catchError((error) => {
                this.isLoadingSubmissionRequests = false;
                const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again."
                this.toastService.error(message)
                throw error
            })
            ).subscribe((res: any) => {
    
            this.dataSource.data = res['data'];
            this.paginator.toArray()[0].length = res['total'];
            this.isLoadingSubmissionRequests = false;
        });
    }

    getSubmissionRequests() {
        const pagination: PageInfo = {
            page_index: this.paginator.toArray()[0].pageIndex + 1,
            page_size: this.paginator.toArray()[0].pageSize
        }

        return this.employeeService.getSubmissionRequests(pagination, this.employee_id)
    }

    getEmployee() {
        this.isLoadingEmployee = true

        this.employeeService.getEmployee(this.employee_id).subscribe(
            (res: any) => {
                if(!res) {
                    this.router.navigateByUrl('/employees')
                    this.toastService.error('Employee not found')
                }
                this.employee = res
                this.buildTableContent()
                this.buildUploadsTableContent()
            },
            (error) => {
                this.isLoadingEmployee = false
                const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again"
                this.toastService.error(message)
            },
            () => this.isLoadingEmployee = false
        )
    }

    editEmployee() {
        const dialogRef = this.dialog.open(EditEmployeeComponent, {
            width: '600px',
            data: this.employee,
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(updated => {
            if(updated) {
                this.getEmployee()
            }
        })
    }

    markComplete(request: any) {
        const confirmationMessage = "Mark request as complete?"

        const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
            width: '400px',
            data: confirmationMessage
        })

        dialogRef.afterClosed().subscribe(confirmed => {
            if(confirmed) {
                this.isProcessingAction = true

                this.employeeService.editSubmissionRequest({ status: 'COMPLETED' }, request.id).subscribe(
                    () => {
                        this.toastService.success("Marked as complete")
                        this.paginator.toArray()[0].page.emit()
                    },
                    (error) => {
                        this.isProcessingAction = false
                        const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again"
                        this.toastService.error(message)
                    },
                    () => this.isProcessingAction = false
                )
            }
        })
    }

    deleteEmployee() {
        const confirmationMessage = "Are you sure you want to delete this employee?"

        const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
            width: '400px',
            data: confirmationMessage
        })

        dialogRef.afterClosed().subscribe(confirmed => {
            if(confirmed) {
                this.isProcessingAction = true

                this.employeeService.deleteEmployee(this.employee_id).subscribe(
                    () => {
                        this.router.navigateByUrl('/employees')
                        this.toastService.success('Employee deleted successfully')
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

    createSubmissionRequest() {
        const dialogRef = this.dialog.open(CreateSubmissionRequestComponent, {
            width: '400px',
            data: [this.employee],
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(created => {
            if(created) {
                this.paginator.toArray()[0].pageIndex = 0
                this.paginator.toArray()[0].page.emit()
            }
        })
    }

    uploadDocument() {
        const dialogRef = this.dialog.open(UploadDocumentComponent, {
            width: '500px',
            data: this.employee,
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(created => {
            if(created) {
                this.paginator.toArray()[1].pageIndex = 0
                this.paginator.toArray()[1].page.emit()
            }
        })
    }

    buildUploadsTableContent() {
        this.isLoadingUploads = true

        this.uploadsTableSubscription = merge(this.paginator.toArray()[1].page).pipe(
            tap(() => {
                this.isLoadingUploads = true
                this.uploadsDataSource.data = []
            }),
            startWith(''),
            debounceTime(600),
            switchMap(() => this.getUploads()),
            catchError((error) => {
                this.isLoadingUploads = false;
                const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again."
                this.toastService.error(message)
                throw error
            })
            ).subscribe((res: any) => {
    
            this.uploadsDataSource.data = res['data'];
            this.paginator.toArray()[1].length = res['total'];
            this.isLoadingUploads = false;
        });
    }

    getUploads() {
        const pagination: PageInfo = {
            page_index: this.paginator.toArray()[1].pageIndex + 1,
            page_size: this.paginator.toArray()[1].pageSize
        }

        return this.uploadService.getUploads(pagination, this.employee_id)
    }

    deleteDocument(id: number) {
        const confirmationMessage = "Are you sure you want to delete this upload?"

        const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
            width: '400px',
            data: confirmationMessage
        })

        dialogRef.afterClosed().subscribe(confirmed => {
            if(confirmed) {
                this.isProcessingAction = true

                this.uploadService.deleteUpload(id).subscribe(
                    () => {
                        this.paginator.toArray()[1].page.emit()
                        this.toastService.success('Upload deleted successfully.')
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

    downloadDocument(url: string) {
        window.open(url, '_blank')
    }
}