import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentTypeService } from "./document-type.service";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { CreateDocumentTypeComponent } from "./create-type/create-type.component";
import { DocumentTypesComponent } from "./types/types.component";

const routes: Routes = [
    {
        path: '',
        component: DocumentTypesComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    declarations: [
        DocumentTypesComponent,
        CreateDocumentTypeComponent
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
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    exports: [],
    providers: [
        DocumentTypeService
    ]
})

export class DocumentTypeModule {}