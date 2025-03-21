import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EmployeeService } from "./employees.service";
import { EmployeesComponent } from "./employees/employees.component";
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
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { EmployeeComponent } from "./employee/employee.component";
import { CreateSubmissionRequestComponent } from "./create-submission-request/create-submission-request.component";
import { UploadDocumentComponent } from "./upload-document/upload-document.component";
import { CreateMultipleEmployeesComponent } from "./create-multiple-employees/create-multiple-employees.component";
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes: Routes = [
    {
        path: '',
        component: EmployeesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':employee',
        component: EmployeeComponent
    }
]

@NgModule({
    declarations: [
        EmployeesComponent,
        EmployeeComponent,
        CreateEmployeeComponent,
        EditEmployeeComponent,
        CreateSubmissionRequestComponent,
        UploadDocumentComponent,
        CreateMultipleEmployeesComponent
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
        MatSelectModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule
    ],
    exports: [],
    providers: [
        EmployeeService
    ]
})

export class EmployeeModule {}