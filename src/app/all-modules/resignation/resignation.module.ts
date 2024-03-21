import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResignationRoutingModule } from './resignation-routing.module';
import { ResignationComponent } from './resignation.component';
import { ResignationMainComponent } from './resignation-main/resignation-main.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { SharingModule } from 'src/app/sharing/sharing.module';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [ResignationComponent, ResignationMainComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharingModule,
    ResignationRoutingModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    NgxPrintModule,
    SharingModule
  ]
})
export class ResignationModule { }
