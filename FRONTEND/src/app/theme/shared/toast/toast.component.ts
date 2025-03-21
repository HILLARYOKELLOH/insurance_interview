import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'toast-ui',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent implements OnInit {

  dismissTimeout!: any;
  TOASTR_DURATION = 5000;

  constructor(public snackBarRef: MatSnackBarRef<ToastComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: { message: string, legend: string, type: 'error' | 'info' | 'success' }) {}

  ngOnInit(): void {
    
    this.toasterNoHover();
  }

  toasterHover() {

    clearTimeout(this.dismissTimeout);
  }

  toasterNoHover() {

    this.dismissTimeout = setTimeout(() => this.closeToast(), this.TOASTR_DURATION);
  }

  closeToast = () => {
    
    clearTimeout(this.dismissTimeout);
    this.snackBarRef.dismiss();
  }

  getToastIcon() {

    if (this.data.type === 'error') {

      return 'cancel';
    }

    if (this.data.type === 'info') {

      return 'error';
    }

    return 'check_circle';
  }

}
