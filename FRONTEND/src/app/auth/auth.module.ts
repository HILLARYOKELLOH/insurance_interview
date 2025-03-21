import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './+state/reducers';
import { AuthGuard } from "./guards/auth.guard";
import { LoginGuard } from "./guards/login.guard";
import { AuthEffects } from "./+state/auth.effects";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthorizationInterceptor } from "./interceptors/authorization.interceptor";
import { AuthService } from "./auth.service";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginGuard]
    }
]

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
        EffectsModule.forFeature([AuthEffects])
    ],
    exports: [],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationInterceptor,
            multi: true
        }
    ]
})

export class AuthModule {
    static forRoot() {
        return {
            ngModule: AuthModule,
            providers: [
                AuthGuard,
                LoginGuard
            ]
        }
    }
}