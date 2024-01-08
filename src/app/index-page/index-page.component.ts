import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as DataActions from '../store/app.action';
import { Customer } from '../model/model';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
})
export class IndexPageComponent implements OnInit, OnDestroy {
  data$: Observable<Customer[]> = this.store.select(
    (state: any) => state.contact.data
  );
  private dataSubscription: Subscription;

  constructor(private dataService: DataService, private store: Store) {}

  customers: Customer[] = [];
  isError: boolean = false;
  displayStyle: boolean = true; // true meaning on the grid style
  isShow: boolean = false;

  setGrid() {
    this.displayStyle = false;
  }

  setTable() {
    this.displayStyle = true;
  }
  ngOnInit() {
    this.dataSubscription = this.dataService.tryFetch().subscribe({
      next: (data) => {
        this.store.dispatch(DataActions.setData({ data: data }));
      },
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  openModal() {
    this.dataService.openModal();
  }
}
