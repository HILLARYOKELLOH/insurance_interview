import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { User } from "../auth/entities/user";
import { EmployerService } from "../employers/employer.service";
import { ToastService } from "../theme/shared/toast/toast.service";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    user: User
    isLoadingRequests = false
    requestLogs: any[] = []

    constructor(private authService: AuthService, private employerService: EmployerService, private toastService: ToastService) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user as User
            this.getRequestLog()
        })
    }

    getName() {
        if(this.user) {
            return this.user.user.account_type === 'ADMIN' ? this.user.user.admin.name : this.user.user.employer.first_name
        }

        return ''
    }

    getRequestLog() {
        if(this.user.user.account_type === 'EMPLOYER') {
            this.isLoadingRequests = true

            this.employerService.getRequestLog(this.user.user.employer.id).subscribe(
                (res: any) => {
                    this.requestLogs = res
                },
                (error) => {
                    this.isLoadingRequests = false
                    const message = error.error.message ? error.error.message : "An unexpected error occurred. Please try again"
                    this.toastService.error(message)
                },
                () => this.isLoadingRequests = false
            )
        }
    }
}