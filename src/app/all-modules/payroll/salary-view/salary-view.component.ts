import { Component , OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormBuilder, FormGroup , Validator } from "@angular/forms";
import { ToastrService } from "ngx-toastr";


declare const $: any;
@Component({
  // selector: 'app-salary-view',
  templateUrl: './salary-view.component.html',
})
export class SalaryViewComponent implements OnInit {
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  
  constructor(
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

  }

}
