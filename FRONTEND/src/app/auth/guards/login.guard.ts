import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { select, Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { isLoggedOut } from "../+state/auth.selectors";

@Injectable()

export class LoginGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isLoggedOut),
            tap(loggedOut => {
                if(!loggedOut) {
                    this.router.navigateByUrl('/')
                }
            })
        )
    }
}