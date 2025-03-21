import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './auth/reducers';
import { login } from './auth/+state/auth.actions';
import { Observable } from 'rxjs';
import { isLoggedIn } from './auth/+state/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isLoggedIn$: Observable<boolean> = this.store.select(isLoggedIn)
  isMenuExpanded = true

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user')

    if(user) {
      this.store.dispatch(login({user: JSON.parse(user)}))
    }
  }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded
  }

  isRootPage(): boolean {
    return this.router.url === '/' || this.router.url === '/support';
  }
}
