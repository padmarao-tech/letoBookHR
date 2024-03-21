import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrLabourReportRoutingModule } from './hr-labour-report-routing.module';
import { HrLabourReportComponent } from './hr-labour-report.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import {NgxPrintModule} from 'ngx-print';
import { FormBComponent } from './form-b/form-b.component';
import { FormCComponent } from './form-c/form-c.component';
import { FormDComponent } from './form-d/form-d.component';
import { FormHComponent } from './form-h/form-h.component';
import { FormPComponent } from './form-p/form-p.component';
import { FormQComponent } from './form-q/form-q.component';
import { FormRComponent } from './form-r/form-r.component';
import { FormSComponent } from './form-s/form-s.component';
import { FormTComponent } from './form-t/form-t.component';
import { FormXIXComponent } from './form-xix/form-xix.component';
import { FormXXIXComponent } from './form-xxix/form-xxix.component';
import { FormXXVIComponent } from './form-xxvi/form-xxvi.component';
import { FormXXVIIComponent } from './form-xxvii/form-xxvii.component';

@NgModule({
  declarations: [HrLabourReportComponent, FormBComponent, FormCComponent, FormDComponent, FormHComponent, FormPComponent, FormQComponent, FormRComponent, FormSComponent, FormTComponent, FormXIXComponent, FormXXIXComponent, FormXXVIComponent, FormXXVIIComponent],
  imports: [
    CommonModule,
    HrLabourReportRoutingModule,
    DataTablesModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    SharingModule,
    NgxPrintModule
  ]
})
export class HrLabourReportModule { }
