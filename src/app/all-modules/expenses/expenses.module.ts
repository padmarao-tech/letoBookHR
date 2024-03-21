import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesComponent } from './expenses.component';

import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import { ExpensesTypeComponent } from './expenses-type/expenses-type.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component'
import { BsDatepickerModule } from 'ngx-bootstrap';
import {NgxPrintModule} from 'ngx-print';
@NgModule({
  declarations: [ExpensesComponent, ExpensesTypeComponent, ExpensesListComponent],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxPrintModule,
    NgxMaskModule.forRoot({
      showMaskTyped : false,
      // clearIfNotMatch : true
    }) 
  ]
})
export class ExpensesModule { }
