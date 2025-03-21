import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription, catchError, debounceTime, merge, startWith, switchMap, tap } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { Upload } from "../entities/upload";
import { UploadsService } from "../uploads.service";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { PageInfo } from "../../theme/shared/entities/page-info";
import { ConfirmationPopupComponent } from "../../theme/shared/confirmation-popup/confirmation-popup.component";
import { RequestUploadComponent } from "../request-upload/request-upload.component";

@Component({
    templateUrl: './uploads.component.html',
    styleUrls: ['./uploads.component.scss']
})

export class UploadsComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
    isLoading = true
    isProcessingAction = false
    displayedColumns = ['user', 'uploaded_by', 'created_at', 'actions']
    dataSource: MatTableDataSource<Upload> = new MatTableDataSource<Upload>()
    tableSubscription: Subscription = new Subscription()

    constructor(private uploadService: UploadsService, private toastService: ToastService, public dialog: MatDialog) {}

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
            switchMap(() => this.getUploads()),
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

    getUploads() {
        const pagination: PageInfo = {
            page_index: this.paginator.pageIndex + 1,
            page_size: this.paginator.pageSize
        }

        return this.uploadService.getUploads(pagination)
    }

    refreshUploads () {
        this.paginator.pageIndex = 0
        this.paginator.page.emit()
    }

    deleteUpload(id: number) {
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
                        this.paginator.page.emit()
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

    sendUploadRequest() {
        const dialogRef = this.dialog.open(RequestUploadComponent, {
            width: '400px'
        })
    }

    downloadDocument(url: string) {
        window.open(url, '_blank')
    }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if (file) {
          this.uploadFile(file);
        }
    }
    
    uploadFile(file: File): void {
        this.isProcessingAction = true
        
        const formData = new FormData();
        formData.append('file', file);

        this.uploadService.bulkRequestUpload(formData).subscribe({
            next: () => {
                this.toastService.success('Uploads requested successfully.')
            },
            error: (error) => {
                this.isProcessingAction = false
                const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again."
                this.toastService.error(message)
            },
            complete: () => this.isProcessingAction = false
        });
    }

    downloadTemplate() {
        const link = document.createElement('a')
        link.href = 'assets/files/template.xls'
        link.download = 'template.xls'
        link.click()
    }
}