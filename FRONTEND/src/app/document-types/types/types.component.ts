import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { ToastService } from "../../theme/shared/toast/toast.service";
import { ConfirmationPopupComponent } from "../../theme/shared/confirmation-popup/confirmation-popup.component";
import { DocumentTypeService } from "../document-type.service";
import { CreateDocumentTypeComponent } from "../create-type/create-type.component";
import { AuthService } from "../../auth/auth.service";

@Component({
    templateUrl: './types.component.html',
    styleUrls: ['./types.component.scss']
})

export class DocumentTypesComponent implements OnInit {
    isLoading = true
    isProcessingAction = false
    displayedColumns = ['title', 'actions']
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
    employer_id: number

    constructor(private typeService: DocumentTypeService, private toastService: ToastService, public dialog: MatDialog,
        private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            if(user) {
                this.employer_id = user?.user.employer.id as number
                this.getTypes()
            }
        })
        
    }

    getTypes() {
        this.isLoading = true
        
        this.typeService.getDocumentTypes(this.employer_id).subscribe({
            next: (res: any) => {
                this.dataSource.data = res
            },
            error: (error) => {
                this.isLoading = false
                const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again"
                this.toastService.error(message)
            },
            complete: () => this.isLoading = false
        })
    }

    deleteType(id: number) {
        const confirmationMessage = "Are you sure you want to delete this type?"

        const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
            width: '400px',
            data: confirmationMessage
        })

        dialogRef.afterClosed().subscribe(confirmed => {
            if(confirmed) {
                this.isProcessingAction = true

                this.typeService.deleteDocumentType(id).subscribe(
                    () => {
                        this.getTypes()
                        this.toastService.success('Document type deleted successfully.')
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

    createType() {
        const dialogRef = this.dialog.open(CreateDocumentTypeComponent, {
            width: '400px',
            data: { employer_id: this.employer_id },
            disableClose: true
        })

        dialogRef.afterClosed().subscribe(created => {
            if(created) {
                this.getTypes()
            }
        })
    }
}