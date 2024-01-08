import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Customer } from '../model/model';

@Component({
  selector: 'app-table-display',
  templateUrl: './customer-table.component.html',
})
export class CustomerTableComponent implements OnInit {
  constructor(private dataService: DataService) {}
  @Input() data: Customer[];
  @Input() tableHead: string;
  ngOnInit() {}

  handleDelete(id: string) {
    this.dataService.deleteCustomer(id);
  }

  handleEdit(param: Customer) {
    this.dataService.openModal();
    this.dataService.setEditData(param);
    //console.log(param);
  }
}
