import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { logout } from '../+state/auth.actions';
import { AuthService } from '../auth.service';
import { ToastService } from '../../theme/shared/toast/toast.service';

@Injectable({ providedIn: 'root' })

export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store, private toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authenticationToken = this.authService.getAuthenticationToken();

    if (authenticationToken) {

      request = request.clone({
        setHeaders: {
          Accept: 'application/json',
          Authorization: `Bearer ${authenticationToken}`
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.toastService.error('Your session has expired.')
            this.store.dispatch(logout());
          }
        }

        return throwError(err);
      })
    )
  }

}