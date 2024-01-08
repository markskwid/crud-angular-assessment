import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Customer } from '../model/model';

@Component({
  selector: 'app-grid-display',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  constructor(private dataService: DataService) {}
  @Input() data: Customer[];

  ngOnInit() {}

  handleDelete(id: string) {
    this.dataService.deleteCustomer(id);
  }

  handleEdit(param: Customer) {
    this.dataService.openModal();
    this.dataService.setEditData(param);
  }
}
