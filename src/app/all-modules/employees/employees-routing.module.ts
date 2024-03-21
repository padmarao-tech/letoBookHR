import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';
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
import { CategoryComponent } from './category/category.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { LoanComponent } from './loan/loan.component';
import { LoanTypeComponent } from './loan-type/loan-type.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsTypeComponent } from './documents-type/documents-type.component';
import { TimesheetAdminComponent } from './timesheet-admin/timesheet-admin.component';
import { TimesheetEmployeeComponent } from './timesheet-employee/timesheet-employee.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { AssetsComponent } from './assets/assets.component';
import { CompanyComponent } from './company/company.component';
import { SalaryMasterComponent } from './salary-master/salary-master.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      {
        path: 'employeepage',
        component: EmployeePageContentComponent
      },
      {
        path: 'employeelist',
        component: EmployeeListComponent
      },
      {
        path: 'employeeprofile',
        component: EmployeeProfileComponent
      },
      // {
      //   path: 'holidays',
      //   component: HolidaysComponent
      // },
      {
        path: 'adminleaves',
        component: LeavesAdminComponent
      },
      {
        path: 'leavesettings',
        component: LeaveSettingsComponent
      },
      {
        path: 'attendanceadmin',
        component: AttendanceAdminComponent
      },
      {
        path: 'attendanceemployee',
        component: AttendanceEmployeeComponent
      },
      {
        path: 'grade',
        component: GradeComponent
      },
      {
        path: 'departments',
        component: DepartmentsComponent
      },
      {
        path: 'designation',
        component: DesignationComponent
      },
      {
        path: 'location',
        component: LocationComponent
      },
      {
        path: 'site',
        component: SiteComponent
      },
      {
        path: 'company',
        component: CompanyComponent
      },
      {
        path: 'assets',
        component: AssetsComponent
      },
      {
        path: 'timesheet',
        component: TimesheetComponent
      },
      {
        path: 'timesheet-admin',
        component: TimesheetAdminComponent
      },
      {
        path: 'timesheet-employee',
        component: TimesheetEmployeeComponent
      },
      {
        path: 'overtime',
        component: OvertimeComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'leave-type',
        component: LeaveTypeComponent
      },
      {
        path: 'loan',
        component: LoanComponent
      },
      {
        path: 'loan-type',
        component: LoanTypeComponent
      },
      {
        path: 'supervisor',
        component: SupervisorComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'documents-type',
        component: DocumentsTypeComponent
      },
      {
        path: 'employee-salary',
        component: EmployeeSalaryComponent
      },
      {
        path: 'salary-master',
        component: SalaryMasterComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
