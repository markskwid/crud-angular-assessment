import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { setData } from '../store/app.action';

// Assuming your state structure is like this:
interface AppState {
  data: {
    data: any[]; // Adjust this type based on your actual data structure
  };
}

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}
}
