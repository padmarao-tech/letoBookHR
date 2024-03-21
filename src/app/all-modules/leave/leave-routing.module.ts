import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveComponent } from './leave.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { LeavesAdminComponent } from './leaves-admin/leaves-admin.component';
import { LeavesEmployeeComponent } from './leaves-employee/leaves-employee.component';
import { LeaveSettlementComponent } from './leave-settlement/leave-settlement.component';
import { LeaveSettlementPdfComponent } from './leave-settlement-pdf/leave-settlement-pdf.component';
import { FinalSettlementComponent } from './final-settlement/final-settlement.component';

const routes: Routes = [
  {
    path:"",
    component:LeaveComponent,
    children:[
      {
        path:"leave",
        component:LeaveComponent
      },
      {
        path:"leave-type",
        component:LeaveTypeComponent
      },
      {
        path:"leaves-admin",
        component:LeavesAdminComponent
      },
      {
        path:"leaves-employee",
        component:LeavesEmployeeComponent
      },
      {
        path:"leave-settlement",
        component:LeaveSettlementComponent
      },
      {
        path:"leave-settlement-pdf",
        component:LeaveSettlementPdfComponent
      },
      {
        path:"final-settlement",
        component:FinalSettlementComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
