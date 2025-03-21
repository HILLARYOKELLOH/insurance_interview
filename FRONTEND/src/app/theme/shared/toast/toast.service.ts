import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ToastComponent } from './toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {

  constructor(private readonly ngZone: NgZone, private snackBar: MatSnackBar) {

  }

  info(message: string, legend = ''): void {

    this.ngZone.run(() =>

      this.snackBar.openFromComponent(ToastComponent, { data: { message, legend, type: 'info' }, panelClass: 'toast-info' })
    );
  }

  success(message: string, legend = ''): void {

    this.ngZone.run(() =>

      this.snackBar.openFromComponent(ToastComponent, { data: { message, legend, type: 'success' }, panelClass: 'toast-success' })
    );
  }

  error(message: string, legend = ''): void {

    this.ngZone.run(() =>

      this.snackBar.openFromComponent(ToastComponent, { data: { message, legend, type: 'error' }, panelClass: ['toast-error'] })
    );
  }

}
