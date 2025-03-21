import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, catchError, debounceTime, merge, startWith, switchMap, tap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { PageInfo } from "../../theme/shared/entities/page-info";
import { ConfirmationPopupComponent } from "../../theme/shared/confirmation-popup/confirmation-popup.component";
import { Admin } from "../../auth/entities/user";
import { AdminService } from "../admin.service";
import { CreateAdminComponent } from "../create-admin/create-admin.component";
import { EditAdminComponent } from "../edit-admin/edit-admin.component";

@Component({
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminsComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
    isLoading = true
    isLoadingRoles = false
    isProcessingAction = false
    displayedColumns = ['user', 'email', 'actions']
    dataSource: MatTableDataSource<Admin> = new MatTableDataSource<Admin>()
    tableSubscription: Subscription = new Subscription()
    roles: any[]

    constructor(private adminService: AdminService, private toastService: ToastService, public dialog: MatDialog) {}

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

        return this.adminService.getAdmins(pagination)
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

                this.adminService.resetPassword(id).subscribe(
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

                this.adminService.deleteAdmin(id).subscribe(
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
        const dialogRef = this.dialog.open(CreateAdminComponent, {
            width: '400px',
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(userCreated => {
            if(userCreated) {
                this.paginator.pageIndex = 0
                this.paginator.page.emit()
            }
        })
    }

    editUser(user: Admin) {
        const dialogRef = this.dialog.open(EditAdminComponent, {
            width: '400px',
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