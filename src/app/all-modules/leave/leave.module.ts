import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveComponent } from './leave.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { LeavesAdminComponent } from './leaves-admin/leaves-admin.component';
import { LeavesEmployeeComponent } from './leaves-employee/leaves-employee.component';
import { LeaveSettlementComponent } from './leave-settlement/leave-settlement.component';
import { LeaveSettlementPdfComponent } from './leave-settlement-pdf/leave-settlement-pdf.component';
import {NgxPrintModule} from 'ngx-print';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FinalSettlementComponent } from './final-settlement/final-settlement.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LeaveComponent, LeaveTypeComponent, LeavesAdminComponent, LeavesEmployeeComponent, LeaveSettlementComponent, LeaveSettlementPdfComponent, FinalSettlementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LeaveRoutingModule,
    NgxPrintModule,
    PdfViewerModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule
  ]
})
export class LeaveModule { }
