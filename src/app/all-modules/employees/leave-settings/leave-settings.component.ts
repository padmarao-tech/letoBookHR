import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { PrimeNGConfig } from "primeng/api";
import { AllModulesService } from "../../all-modules.service";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
declare const $: any;

@Component({
  // selector: "app-leave-settings",
  templateUrl: "./leave-settings.component.html",
})
export class LeaveSettingsComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstLeaveSettings: any[];
  values = [];
  public sourceProducts: any;
  public targetProducts: any;
  public url1: any = "pickListNames";
  public url: any = "customPolicy";
  public allCustomPolicy: any = [];
  public addCustomPolicyForm: FormGroup;
  public editCustomPolicy: FormGroup;
  public editId: any;
  public tempId: any;

  public rows = [];
  public srch = [];
  constructor(
    private primengConfig: PrimeNGConfig,
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 5,
      dom: "lrtip",
    };
    this.LoadLeaveSettings();
    // Leave Settings button show
    $(document).on("click", ".leave-edit-btn", function () {
      $(this)
        .removeClass("leave-edit-btn")
        .addClass("btn btn-white leave-cancel-btn")
        .text("Cancel");
      $(this)
        .closest("div.leave-right")
        .append(
          '<button class="btn btn-primary leave-save-btn" type="submit">Save</button>'
        );
      $(this).parent().parent().find("input").prop("disabled", false);
      return false;
    });
    $(document).on("click", ".leave-cancel-btn", function () {
      $(this)
        .removeClass("btn btn-white leave-cancel-btn")
        .addClass("leave-edit-btn")
        .text("Edit");
      $(this).closest("div.leave-right").find(".leave-save-btn").remove();
      $(this).parent().parent().find("input").prop("disabled", true);
      return false;
    });

    $(document).on("change", ".leave-box .onoffswitch-checkbox", function () {
      var id = $(this).attr("id").split("_")[1];
      if ($(this).prop("checked") == true) {
        $("#leave_" + id + " .leave-edit-btn").prop("disabled", false);
        $("#leave_" + id + " .leave-action .btn").prop("disabled", false);
      } else {
        $("#leave_" + id + " .leave-action .btn").prop("disabled", true);
        $("#leave_" + id + " .leave-cancel-btn")
          .parent()
          .parent()
          .find("input")
          .prop("disabled", true);
        $("#leave_" + id + " .leave-cancel-btn")
          .closest("div.leave-right")
          .find(".leave-save-btn")
          .remove();
        $("#leave_" + id + " .leave-cancel-btn")
          .removeClass("btn btn-white leave-cancel-btn")
          .addClass("leave-edit-btn")
          .text("Edit");
        $("#leave_" + id + " .leave-edit-btn").prop("disabled", true);
      }
    });

    $(".leave-box .onoffswitch-checkbox").each(function () {
      var id = $(this).attr("id").split("_")[1];
      if ($(this).prop("checked") == true) {
        $("#leave_" + id + " .leave-edit-btn").prop("disabled", false);
        $("#leave_" + id + " .leave-action .btn").prop("disabled", false);
      } else {
        $("#leave_" + id + " .leave-action .btn").prop("disabled", true);
        $("#leave_" + id + " .leave-cancel-btn")
          .parent()
          .parent()
          .find("input")
          .prop("disabled", true);
        $("#leave_" + id + " .leave-cancel-btn")
          .closest("div.leave-right")
          .find(".leave-save-btn")
          .remove();
        $("#leave_" + id + " .leave-cancel-btn")
          .removeClass("btn btn-white leave-cancel-btn")
          .addClass("leave-edit-btn")
          .text("Edit");
        $("#leave_" + id + " .leave-edit-btn").prop("disabled", true);
      }
    });
    if ($("#customleave_select").length > 0) {
      $("#customleave_select").multiselect();
    }
    if ($("#edit_customleave_select").length > 0) {
      $("#edit_customleave_select").multiselect();
    }
    this.primengConfig.ripple = true;
    this.getPickList();
    this.getCustomPolicy();

    // Add CustomPolicyForm Validation And Getting Values

    this.addCustomPolicyForm = this.formBuilder.group({
      addPolicyNames: ["", [Validators.required]],
      addNames: ["", [Validators.required]],
      addDays: ["", [Validators.required]],
    });

    // Edit CustomPolicyForm Validation And Getting Values

    this.editCustomPolicy = this.formBuilder.group({
      editNames: ["", [Validators.required]],
      editDays: ["", [Validators.required]],
    });
  }

  // Get department list  Api Call
  LoadLeaveSettings() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstLeaveSettings = data;
      this.dtTrigger.next();
      this.rows = this.lstLeaveSettings;
      this.srch = [...this.rows];
    });
  }

  //get pick list
  getPickList() {
    this.allModuleService.get(this.url1).subscribe((data) => {
      this.sourceProducts = data;
      this.targetProducts = [];
    });
  }

  //get custom policy
  getCustomPolicy() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allCustomPolicy = data;
    });
  }

  // Add Custom Modal Api Call

  addCustom() {
    if (this.addCustomPolicyForm.valid) {
      let obj = {
        policyname: this.addCustomPolicyForm.value.addPolicyNames,
        name: this.addCustomPolicyForm.value.addNames,
        days: this.addCustomPolicyForm.value.addDays,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {});
      this.getCustomPolicy();
      $("#add_custom_policy").modal("hide");
      this.addCustomPolicyForm.reset();
      this.toastr.success("Custom Policy is added", "Success");
    }
  }

  // Edit Custom Modal Api Call

  editCustom() {
    let obj = {
      name: this.editCustomPolicy.value.editNames,
      days: this.editCustomPolicy.value.editDays,
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {});
    this.getCustomPolicy();
    $("#edit_custom_policy").modal("hide");
    this.toastr.success("Custom Policy is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allCustomPolicy.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allCustomPolicy[index];
    this.editCustomPolicy.setValue({
      editNames: toSetValues.name,
      editDays: toSetValues.days,
    });
  }

  // Delete Custom Modal Api Call

  deleteCustom() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.getCustomPolicy();
      $("#delete_custom_policy").modal("hide");
      this.toastr.success("Custom Policy is deleted", "Success");
    });
  }
  removevalue(i){
    this.values.splice(i,1);
  }

  addvalue(){
    this.values.push({value: ""});
  }
  addTextBox(){
    this.values.push({value: ""});
  }
}
