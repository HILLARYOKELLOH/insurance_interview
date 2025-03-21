import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EmployerService } from "./employer.service";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
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
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EmployersComponent } from "./employers/employers.component";
import { CreateEmployerComponent } from "./create-employer/create-employer.component";
import { EditEmployerComponent } from "./edit-employer/edit-employer.component";
import { EmployerComponent } from "./employer/employer.component";

const routes: Routes = [
    {
        path: '',
        component: EmployersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':employer',
        component: EmployerComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    declarations: [
        EmployersComponent,
        CreateEmployerComponent,
        EditEmployerComponent,
        EmployerComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatTooltipModule
    ],
    exports: [],
    providers: [
        EmployerService
    ]
})

export class EmployerModule {}