import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { EmployeePageContentComponent } from './all-employees/employee-page-content/employee-page-content.component';
import { EmployeeListComponent } from './all-employees/employee-list/employee-list.component';
import { EmployeeProfileComponent } from './all-employees/employee-profile/employee-profile.component';
// import { HolidaysComponent } from './holidays/holidays.component';
import { LeavesAdminComponent } from './leaves-admin/leaves-admin.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';
import { AttendanceAdminComponent } from './attendance-admin/attendance-admin.component';
import { AttendanceEmployeeComponent } from './attendance-employee/attendance-employee.component';
import { GradeComponent } from './grade/grade.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationComponent } from './designation/designation.component';
import { LocationComponent } from './location/location.component';
import { SiteComponent } from './site/site.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { OvertimeComponent } from './overtime/overtime.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import { PickListModule } from 'primeng/picklist';
import { CategoryComponent } from './category/category.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { LoanComponent } from './loan/loan.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsTypeComponent } from './documents-type/documents-type.component';
import { EmployeeGradeComponent } from './employee-grade/employee-grade.component';
import { LoanTypeComponent } from './loan-type/loan-type.component';
import { TimesheetAdminComponent } from './timesheet-admin/timesheet-admin.component';
import { TimesheetEmployeeComponent } from './timesheet-employee/timesheet-employee.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { AssetsComponent } from './assets/assets.component';
import {NgxPrintModule} from 'ngx-print';
import { CompanyComponent } from './company/company.component';
import { SalaryMasterComponent } from './salary-master/salary-master.component';

import { BrowserModule } from "@angular/platform-browser";
import { NgxBarcodeModule } from 'ngx-barcode';



@NgModule({
  declarations: [EmployeesComponent, AllEmployeesComponent, 
    EmployeePageContentComponent, EmployeeListComponent, EmployeeProfileComponent,
     LeavesAdminComponent, LeaveSettingsComponent, AttendanceAdminComponent, 
     AttendanceEmployeeComponent, GradeComponent, DesignationComponent, 
     TimesheetComponent, OvertimeComponent, CategoryComponent,
     LeaveTypeComponent, LoanComponent, SupervisorComponent,
     DocumentsComponent, DocumentsTypeComponent, EmployeeGradeComponent,
     LoanTypeComponent, TimesheetAdminComponent, TimesheetEmployeeComponent, 
     EmployeeSalaryComponent, DepartmentsComponent,LocationComponent,
     SiteComponent,AssetsComponent, CompanyComponent, SalaryMasterComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharingModule,
    ReactiveFormsModule,
    PickListModule,
    EmployeesRoutingModule, PickListModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    NgxPrintModule,NgxBarcodeModule
  ]
})
export class EmployeesModule { }
