import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesComponent } from './policies.component';
import { PoliciesContentComponent } from './policies-content/policies-content.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [PoliciesComponent, PoliciesContentComponent],
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ]
})
export class PoliciesModule { }
