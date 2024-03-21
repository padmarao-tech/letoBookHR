import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { DataTablesModule } from 'angular-datatables';
import { PayrollItemsComponent } from './payroll-items/payroll-items.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayrollSummaryComponent } from './payroll-summary/payroll-summary.component';
import { SalarySettingsComponent } from './salary-settings/salary-settings.component';
import {NgxPrintModule} from 'ngx-print';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PayrollRegisterComponent } from './payroll-register/payroll-register.component';
import { PayrollComparisonReportComponent } from './payroll-comparison-report/payroll-comparison-report.component';
import { MonthlyLoanDeductionComponent } from './monthly-loan-deduction/monthly-loan-deduction.component';
import { MonthlyAdditionComponent } from './monthly-addition/monthly-addition.component';
import { MonthlyDeductionComponent } from './monthly-deduction/monthly-deduction.component';
import { PayrollProcessComponent } from './payroll-process/payroll-process.component';
import { DailyTimesheetDetailsComponent } from './daily-timesheet-details/daily-timesheet-details.component';
import { CreateDailytimesheetComponent } from './create-dailytimesheet/create-dailytimesheet.component';
import { Createpayrollprocesscomponent } from './create-payrollprocess/create-payrollprocess.component';
import { CreateAdditionComponent } from './create-addition/create-addition.component';
import { CreateDeductionComponent } from './create-deduction/create-deduction.component';
import { MonthlyOvertimeComponent } from './monthly-overtime/monthly-overtime.component';
@NgModule({
  declarations: [PayrollComponent, EmployeeSalaryComponent, SalaryViewComponent,
  PayrollItemsComponent, PayrollSummaryComponent, SalarySettingsComponent,
  PayrollRegisterComponent, PayrollComparisonReportComponent,
  MonthlyLoanDeductionComponent, MonthlyAdditionComponent,
  MonthlyDeductionComponent, PayrollProcessComponent,
  DailyTimesheetDetailsComponent,CreateDailytimesheetComponent,Createpayrollprocesscomponent,
  CreateAdditionComponent,CreateDeductionComponent,MonthlyOvertimeComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharingModule,
    PayrollRoutingModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    SharingModule,
    ReactiveFormsModule,
    NgxPrintModule,
    NgMultiSelectDropDownModule
  ]
})
export class PayrollModule { }

