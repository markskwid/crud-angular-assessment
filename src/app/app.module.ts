import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { ModalComponent } from './modal/modal.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomToastComponent } from './custom-toast/custom-toast.component';

//service
import { DataService } from './data.service';
import { ToastService } from './custom-toast/toast.service';
//pipe
import { FormatNumber } from './my-pipe';
import { HttpClientModule } from '@angular/common/http';
import { CustomerTableComponent } from './table-component/customer-table.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './store/app.reducer';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'user/:id', component: ViewCustomerComponent },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    ModalComponent,
    ViewCustomerComponent,
    IndexPageComponent,
    FormatNumber,
    CustomToastComponent,
    CustomerTableComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      contact: appReducer,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [DataService, ToastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
