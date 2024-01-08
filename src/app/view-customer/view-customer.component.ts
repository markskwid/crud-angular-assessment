import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
})
export class ViewCustomerComponent implements OnInit {
  user: any;
  id: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.dataService.getUserInfo(this.id).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
    });

    // this.user = this.dataService.getUserInfo(Number(this.id));
  }
}
