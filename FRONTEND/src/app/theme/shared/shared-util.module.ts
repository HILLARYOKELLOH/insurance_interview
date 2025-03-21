import { NgModule } from "@angular/core";
import { MenuComponent } from "./menu/menu.component";

import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from "@angular/material/snack-bar";
import { ToastComponent } from "./toast/toast.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmationPopupComponent } from "./confirmation-popup/confirmation-popup.component";

@NgModule({
    declarations: [
        MenuComponent,
        ToastComponent,
        ConfirmationPopupComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatListModule,
        MatExpansionModule,
        MatIconModule,
        FlexLayoutModule,
        MatSnackBarModule,
        MatButtonModule,
        MatDialogModule
    ],
    exports: [
        MenuComponent
    ],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { horizontalPosition: 'right' } 
        }
    ]
})

export class SharedUtilModule {}