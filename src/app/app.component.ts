import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { DataService } from './data.service';
import { ToastService } from './custom-toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}
}
