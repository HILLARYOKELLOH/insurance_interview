import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminService } from "./admin.service";
import { AdminsComponent } from "./admins/admin.component";
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
import { CreateAdminComponent } from "./create-admin/create-admin.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { EditAdminComponent } from "./edit-admin/edit-admin.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";

const routes: Routes = [
    {
        path: '',
        component: AdminsComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    declarations: [
        AdminsComponent,
        CreateAdminComponent,
        EditAdminComponent
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
        AdminService
    ]
})

export class AdminModule {}