import { Component, Input } from "@angular/core";
import { MenuItem } from "../entities/menu-item";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../auth/reducers";
import { logout } from "../../../auth/+state/auth.actions";
import { AuthService } from "../../../auth/auth.service";

@Component({
    selector: 'theme-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
    @Input() isMenuExpanded: boolean
    topMenu: MenuItem[] = [
        {
            name: 'Home',
            path: '/',
            icon: 'home'
        },
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: 'dashboard'
        },
        {
            name: 'Employees',
            icon: 'bar_chart',
            path: '/employees'
        },
        {
            name: 'Employers',
            icon: 'bar_chart',
            path: '/employers'
        },
        // {
        //     name: 'Document types',
        //     icon: 'description',
        //     path: '/document-types'
        // }
    ]
    bottomMenu: MenuItem[] = [
        {
            name: 'Admins',
            icon: 'group',
            path: '/admins'
        }
    ]

    constructor(private router: Router, private store: Store<AppState>, private authService: AuthService) {
        this.authService.user$.subscribe(user => {
            (this.bottomMenu.find(m => m.name === 'Admins') as MenuItem).hidden = user?.user.account_type === 'EMPLOYER';
            (this.topMenu.find(m => m.name === 'Employers') as MenuItem).hidden = user?.user.account_type === 'EMPLOYER';
            (this.topMenu.find(m => m.name === 'Employees') as MenuItem).hidden = user?.user.account_type === 'ADMIN';
            // (this.topMenu.find(m => m.name === 'Document types') as MenuItem).hidden = user?.user.account_type === 'ADMIN';
        })
    }

    isRouteActive(menu: MenuItem) {
        const path = this.router.url.split('?')[0]

        return path === menu.path
    }

    logout() {
        this.store.dispatch(logout())
    }
}