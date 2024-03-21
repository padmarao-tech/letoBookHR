import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { ExpensesComponent } from './expenses.component';
import { ExpensesTypeComponent } from './expenses-type/expenses-type.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';

@NgModule({
  declarations: [ ExpensesComponent , ExpensesTypeComponent, ExpensesListComponent ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ExpensesRoutingModule,
    BsDatepickerModule.forRoot(),
    SharingModule
  ]
})
export class ExpensesModule { }
