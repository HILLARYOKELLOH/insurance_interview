import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { User } from "../auth/entities/user";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule
    ],
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss']
})

export class SupportComponent implements OnInit {
    user: User

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user as User
        })
    }
}