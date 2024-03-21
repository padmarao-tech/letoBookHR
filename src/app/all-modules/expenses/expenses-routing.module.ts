import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses.component';
import { ExpensesTypeComponent } from './expenses-type/expenses-type.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';

const routes: Routes = [
  {
    path:"",
    component:ExpensesComponent,
    children:[
      {
        path:"expenses",
        component:ExpensesComponent
      },
      {
        path:"expenses-type",
        component:ExpensesTypeComponent
      },
      {
        path:"expenses-list",
        component:ExpensesListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
