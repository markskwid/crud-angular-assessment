import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastData } from '../model/model';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast = new BehaviorSubject<ToastData | null>(null);

  getToastState() {
    return this.toast.asObservable();
  }

  show(message: string = '', success: boolean = false, error: boolean = false) {
    this.toast.next({ message, success, error });
  }

  hide() {
    this.toast.next(null);
  }
}
