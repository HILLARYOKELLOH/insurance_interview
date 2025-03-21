import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { UploadsService } from "./uploads.service";
import { UploadsComponent } from "./uploads/uploads.component";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { RequestUploadComponent } from "./request-upload/request-upload.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
    {
        path: '',
        component: UploadsComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    declarations: [
        UploadsComponent,
        RequestUploadComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatTooltipModule,
        DropzoneModule
    ],
    exports: [],
    providers: [
        UploadsService
    ]
})

export class UploadModule {}