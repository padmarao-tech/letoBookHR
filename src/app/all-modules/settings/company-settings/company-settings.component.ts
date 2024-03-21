import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { id } from "src/assets/all-modules-data/id";
import { FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';

declare const $: any;
@Component({
  // selector: "app-company-settings",
  templateUrl: "./company-settings.component.html",
})
export class CompanySettingsComponent implements OnInit {

  public companySettings: FormGroup;
  public pipe = new DatePipe("en-US");
  public rows = [];
  public srch = [];
  public statusValue;
  public lstCompanySetting: any[];
  public url: any = "companySettings";
  public tempId: any;
  public editId: any;
  public addCompanySettingForm: FormGroup;
  public editCompanySettingForm: FormGroup;
  constructor(
    private srvModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.companySettings = this.formBuilder.group({
      companyName: ["Delta Technoligies", [Validators.required]],
      contactPerson: ["Mclaren", [Validators.required]],
      address: ["Penning street", [Validators.required]],
      country: ["USA", [Validators.required]],
      city: ["Nyanose", [Validators.required]],
      state: ["Alabama", [Validators.required]],
      postalCode: ["845321", [Validators.required]],
      email: ["mclaren@deltatechnoligies.com", [Validators.required]],
      phoneNumber: ["071-654124", [Validators.required]],
      mobileNumber: ["8547522541", [Validators.required]],
      fax: ["012-456213", [Validators.required]],
      website: ["www.deltatechnoligies.com", [Validators.required]],
      JoinDate: ["", [Validators.required]],
    });
  }

  submitCompany() {
    if (this.companySettings.valid) {
      this.toastr.success("Company Settings is added", "Success");
    }
  }
  onSubmit(form: NgForm) {
      console.log('Your form data : ', form.value);
  }
}
