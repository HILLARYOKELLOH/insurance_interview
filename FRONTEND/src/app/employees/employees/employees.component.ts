import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, catchError, debounceTime, merge, startWith, switchMap, tap } from "rxjs";
import { FormControl } from "@angular/forms";
import { Employee } from "../entities/employee";
import { EmployeeService } from "../employees.service";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { MatDialog } from "@angular/material/dialog";
import { PageInfo } from "../../theme/shared/entities/page-info";
import { ConfirmationPopupComponent } from "../../theme/shared/confirmation-popup/confirmation-popup.component";
import { CreateEmployeeComponent } from "../create-employee/create-employee.component";
import { EditEmployeeComponent } from "../edit-employee/edit-employee.component";
import { CreateMultipleEmployeesComponent } from "../create-multiple-employees/create-multiple-employees.component";
import { CreateSubmissionRequestComponent } from "../create-submission-request/create-submission-request.component";
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
    isLoading = true
    isProcessingAction = false
    displayedColumns = ['select', 'name', 'email', 'dob', 'is_internal', 'actions']
    dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>()
    tableSubscription: Subscription = new Subscription()
    internalFilter = new FormControl('')
    selection = new SelectionModel<any>(true, []);

    constructor(private employeeService: EmployeeService, private toastService: ToastService, public dialog: MatDialog) {}

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
            switchMap(() => this.getEmployees()),
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

    getEmployees() {
        const pagination: PageInfo = {
            page_index: this.paginator.pageIndex + 1,
            page_size: this.paginator.pageSize
        }

        let filters: any = {}
        if(this.internalFilter.value !== '') filters.is_internal = this.internalFilter.value

        return this.employeeService.getEmployees(pagination, filters)
    }

    deleteEmployee(id: number) {
        const confirmationMessage = "Are you sure you want to delete this employee?"

        const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
            width: '400px',
            data: confirmationMessage
        })

        dialogRef.afterClosed().subscribe(confirmed => {
            if(confirmed) {
                this.isProcessingAction = true

                this.employeeService.deleteEmployee(id).subscribe(
                    () => {
                        this.paginator.page.emit()
                        this.toastService.success('Employee deleted successfully.')
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

    createEmployee() {
        const dialogRef = this.dialog.open(CreateEmployeeComponent, {
            width: '600px',
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(created => {
            if(created) {
                this.paginator.pageIndex = 0
                this.paginator.page.emit()
            }
        })
    }

    createMultipleEmployees() {
        const dialogRef = this.dialog.open(CreateMultipleEmployeesComponent, {
            width: '500px',
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(created => {
            if(created) {
                this.paginator.pageIndex = 0
                this.paginator.page.emit()
            }
        })
    }

    editEmployee(employee: Employee) {
        const dialogRef = this.dialog.open(EditEmployeeComponent, {
            width: '600px',
            data: employee,
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(updated => {
            if(updated) {
                this.paginator.page.emit()
            }
        })
    }

    refreshGrid() {
        this.paginator.pageIndex = 0;
        this.paginator.page.emit();
    }

    createBulkSubmissionRequest() {
        const dialogRef = this.dialog.open(CreateSubmissionRequestComponent, {
            width: '400px',
            data: this.selection.selected,
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(sent => {
            if(sent) {
                this.selection.clear()
            }
        })
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;

        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    }
}