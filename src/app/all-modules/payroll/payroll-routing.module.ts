import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollComponent } from './payroll.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { PayrollItemsComponent } from './payroll-items/payroll-items.component';
import { PayrollSummaryComponent } from './payroll-summary/payroll-summary.component';
import { SalarySettingsComponent } from './salary-settings/salary-settings.component';
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
const routes: Routes = [
  {
    path:"",
    component:PayrollComponent,
    children:[
      {
        path:"employee-salary",
        component:EmployeeSalaryComponent
      },
      {

        path:"salary-view",
        component:SalaryViewComponent
      },
      {
        path:"payroll-items",
        component:PayrollItemsComponent
      },
      {
        path:"payroll-summary",
        component:PayrollSummaryComponent
      },
      {
        path:"salary-settings",
        component:SalarySettingsComponent
      },
      {
        path:"payroll-register",
        component:PayrollRegisterComponent
      },
      {
        path:"payroll-comparison-report",
        component:PayrollComparisonReportComponent
      },
      {
        path:"monthly-loan-deduction",
        component:MonthlyLoanDeductionComponent
      },
      {
        path:"monthly-addition",
        component:MonthlyAdditionComponent
      },
      {
        path:"monthly-deduction",
        component:MonthlyDeductionComponent
      },
          {
        path:"payroll-process",
        component:PayrollProcessComponent
      },
      {
        path:"daily-timesheet-details",
        component:DailyTimesheetDetailsComponent
      },
      {
        path:"create-dailytimesheet",
        component:CreateDailytimesheetComponent
      },
      {
        path:"create-payrollprocess",
        component:Createpayrollprocesscomponent
      },
      {
        path:"create-addition",
        component:CreateAdditionComponent
      },
      {
        path:"create-deduction",
        component:CreateDeductionComponent
      },
      {
        path:"monthly-overtime",
        component:MonthlyOvertimeComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
