import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './custom-toast/toast.service';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from './model/model';
import * as DataActions from './store/app.action';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl: string = 'http://localhost:3000/users';
  private editDataSubject = new Subject<Customer>();
  private modalState = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private store: Store
  ) {}

  tryFetch() {
    return this.http.get<any>(this.apiUrl);
  }

  getModalSubject() {
    return this.modalState.asObservable();
  }

  openModal() {
    this.modalState.next(true);
  }

  closeModal() {
    this.modalState.next(false);
  }

  getEditsubject() {
    return this.editDataSubject.asObservable();
  }

  setEditData(customerData: any) {
    this.editDataSubject.next(customerData);
  }

  getUserInfo(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addCustomer(customerData: Customer) {
    const newData = { ...customerData, id: uuidv4() };

    this.http.post(this.apiUrl, newData).subscribe({
      next: (data: any) => {
        this.store.dispatch(
          DataActions.addData({
            data: data,
          })
        );
        this.toastService.show('Success adding a new customer', true, false);
      },
      error: (error) => {
        this.toastService.show('Error adding data', false, true);
      },
    });
  }

  updateUser(id: string, updatedUserData: Customer) {
    this.http.put(`${this.apiUrl}/${id}`, updatedUserData).subscribe({
      next: (data) => {
        this.store.dispatch(
          DataActions.updateData({ userId: id, data: updatedUserData })
        );
        this.toastService.show('Changes saved', true, false);
        console.log(data);
      },

      error: (error) => {
        console.log('Error updating the data');
        this.toastService.show('Error updating user', false, true);
      },
    });
  }

  deleteCustomer(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.store.dispatch(DataActions.deleteData({ userId: id }));
        this.toastService.show('Successfully deleted a data', true, false);
      },
      error: (error) => {
        this.toastService.show('Error deleting the data', false, true);
      },
    });
  }
}
