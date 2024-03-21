import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AllModulesRoutingModule } from './all-modules-routing.module';
import { AllModulesComponent } from './all-modules.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

// Api Interaction 
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'

// Perfect Scrollbar
import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';
import { HeaderService } from '../header/header.service';
import { AllModulesService } from './all-modules.service';

// Api All Modules Database
import { AllModulesData } from 'src/assets/all-modules-data/all-modules-data';

import { LeaveComponent } from './leave/leave.component';
// import { LocationComponent } from './location/location.component';
// import { ExpensesComponent } from './expenses/expenses.component';
// import { DepartmentsComponent } from './departments/departments.component';
// import { DesignationComponent } from './designation/designation.component';
// import { SiteComponent } from './site/site.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

import {NgxPrintModule} from 'ngx-print';
import { HrLabourReportComponent } from './hr-labour-report/hr-labour-report.component';

import { BrowserModule } from '@angular/platform-browser';
import { ExpensesComponent } from './expenses/expenses.component';
import { AdminComponent } from './admin/admin.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

@NgModule({
  declarations: [
    AllModulesComponent,
    HeaderComponent,
    SidebarComponent,
    // LocationComponent,
    ExpensesComponent,
    // DepartmentsComponent,
    // DesignationComponent,
    // SiteComponent,
    LeaveComponent,
    
    HrLabourReportComponent,
    
    AdminComponent
    ,
    
    // ExpensesComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AllModulesData),
    PerfectScrollbarModule,
    AllModulesRoutingModule,
    NgxPrintModule,
    BsDatepickerModule.forRoot()

  ],
  providers: [
    AllModulesService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    HeaderService
  ]
})
export class AllModulesModule { }
