import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  isModalOpen: boolean = false;

  isEdit: boolean = false;
  isSubmitted: boolean = false;
  private userId: string;

  editDataSubscription: Subscription;
  modalSubscription: Subscription;

  closeModal() {
    this.dataService.closeModal();
    this.myForm.reset();
    this.isSubmitted = false;
    this.isEdit = false;
  }

  constructor(private dataService: DataService) {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.myForm.valid) {
      if (this.isEdit) {
        //edited state
        const formValue = this.myForm.value;
        this.dataService.updateUser(this.userId, formValue);
        this.closeModal();
      } else {
        //submit form if it is all valid
        const formValue = this.myForm.value;
        this.dataService.addCustomer(formValue);
        this.closeModal();
      }
    } else {
      // handle error on form
      console.log('Wrong input in the form');
    }
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
    this.editDataSubscription.unsubscribe();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9\\s\\.]+$'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^.+@.+\\.com$'),
      ]),
      contact: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^09\\d{9}$'),
      ]),
    });
    this.modalSubscription = this.dataService
      .getModalSubject()
      .subscribe((state) => {
        this.isModalOpen = state;
      });

    this.editDataSubscription = this.dataService
      .getEditsubject()
      .subscribe((data) => {
        if (data?.name && data) {
          this.isEdit = true;
          this.userId = data.id;
          // console.log(data);
          this.myForm.setValue({
            name: data.name,
            email: data.email,
            contact: data.contact,
          });
        } else {
          this.isEdit = false;
        }
      });
  }
}
