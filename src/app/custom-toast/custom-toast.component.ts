import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService } from './toast.service';
import { Subscription } from 'rxjs';
import { ToastData } from '../model/model';

@Component({
  selector: 'app-custom-toast',
  template: `<div
    *ngIf="isShow"
    [ngClass]="isError ? 'error-toast' : 'toast'"
    class="flex"
  >
    <img
      src="../assets/images/check.svg"
      class="h-auto w-5 mr-1"
      *ngIf="!isError"
    />
    {{ message }}
  </div>`,
})
export class CustomToastComponent implements OnInit, OnDestroy {
  isShow: boolean = false;
  isError: boolean = false;
  message: string;

  private toastSubs: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnDestroy() {
    this.toastSubs.unsubscribe();
  }

  ngOnInit() {
    this.toastSubs = this.toastService.getToastState().subscribe({
      next: (data) => this.handleToastData(data),
    });
  }

  private handleToastData(data: ToastData) {
    if (data) {
      this.isError = data.error;
      this.message = data.message;
      this.isShow = true;

      setTimeout(() => {
        this.toastService.hide();
        this.isShow = false;
      }, 2000);
    }
  }
}
