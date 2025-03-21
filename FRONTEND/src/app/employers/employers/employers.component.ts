import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, catchError, debounceTime, merge, startWith, switchMap, tap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { PageInfo } from "../../theme/shared/entities/page-info";
import { ConfirmationPopupComponent } from "../../theme/shared/confirmation-popup/confirmation-popup.component";
import { Admin, Employer } from "../../auth/entities/user";
import { EmployerService } from "../employer.service";
import { CreateEmployerComponent } from "../create-employer/create-employer.component";
import { EditEmployerComponent } from "../edit-employer/edit-employer.component";

@Component({
    templateUrl: './employers.component.html',
    styleUrls: ['./employers.component.scss']
})

export class EmployersComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
    isLoading = true
    isLoadingRoles = false
    isProcessingAction = false
    displayedColumns = ['user', 'email', 'phone', 'address', 'actions']
    dataSource: MatTableDataSource<Admin> = new MatTableDataSource<Admin>()
    tableSubscription: Subscription = new Subscription()
    roles: any[]

    constructor(private employerService: EmployerService, private toastService: ToastService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.buildTableContent()
    }

    ngOnDestroy(): void {
        this.tableSubscription.unsubscribe()
    }

    buildTableContent() {
        this.tableSubscription = merge(this.paginator.page).pipe(
            tap(() => {
                this.isLoading = true
                this.dataSource.data = []
            }),
            startWith(''),
            debounceTime(600),
            switchMap(() => this.getUsers()),
            catchError((error) => {
                this.isLoading = false;
                const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again."
                this.toastService.error(message)
                throw error
            })
            ).subscribe((res: any) => {
    
            this.dataSource.data = res['data'];
            this.paginator.length = res['total'];
            this.isLoading = false;
        });
    }

    getUsers() {
        const pagination: PageInfo = {
            page_index: this.paginator.pageIndex,
            page_size: this.paginator.pageSize
        }

        return this.employerService.getEmployers(pagination)
    }

    resetPassword(id: number) {
        const confirmationMessage = "Are you sure you want to reset this user password?"

        const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
            width: '400px',
            data: confirmationMessage
        })

        dialogRef.afterClosed().subscribe(confirmed => {
            if(confirmed) {
                this.isProcessingAction = true

                this.employerService.resetPassword(id).subscribe(
                    () => {
                        this.paginator.page.emit()
                        this.toastService.success('User password reset successfully.')
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

    deleteUser(id: number) {
        const confirmationMessage = "Are you sure you want to delete this user?"

        const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
            width: '400px',
            data: confirmationMessage
        })

        dialogRef.afterClosed().subscribe(confirmed => {
            if(confirmed) {
                this.isProcessingAction = true

                this.employerService.deleteEmployer(id).subscribe(
                    () => {
                        this.paginator.page.emit()
                        this.toastService.success('User deleted successfully.')
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

    createUser() {
        const dialogRef = this.dialog.open(CreateEmployerComponent, {
            width: '600px',
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(userCreated => {
            if(userCreated) {
                this.paginator.pageIndex = 0
                this.paginator.page.emit()
            }
        })
    }

    editUser(user: Employer) {
        const dialogRef = this.dialog.open(EditEmployerComponent, {
            width: '600px',
            data: user,
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(userUpdated => {
            if(userUpdated) {
                this.paginator.page.emit()
            }
        })
    }
}