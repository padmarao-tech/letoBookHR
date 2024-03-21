import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";

import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: "app-leaves-admin",
  templateUrl: "./leaves-admin.component.html",
})
export class LeavesAdminComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public lstLeave: any;
  public url: any = "adminleaves";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addLeaveadminForm: FormGroup;
  public editLeaveadminForm: FormGroup;
  public editFromDate: any;
  public editToDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $(document).ready(function(){
      $(".get-pdf").click(function () {
        var octocatPNG = './assets/img/login-logo.png';
        var doc = new jsPDF('l', 'pt', 'letter');
        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth= doc.internal.pageSize.height || doc.internal.pageSize.getWidth();
      
        doc.addImage(octocatPNG, "PNG", 15, 35, 100, 40);
        var addSignatureBlock = function(){
          doc.setFontSize(12);
          doc.setLineWidth(1);
          doc.setDrawColor(0,0,0);
          //assign a variable to pull T&C's HERE
          // if (doc.autoTable.previous.finalY > pageHeight - 100/*later adjust this to make room for T&C's*/){
          //   doc.addPage();
          //   doc.text("Authorized Signature:", 25, pageHeight - 85)
          //   doc.line(143, pageHeight - 85, 400, pageHeight - 85)
          //   doc.text("Date:", 415, pageHeight - 85)
          //   doc.line(447, pageHeight - 85, pageWidth - 25, pageHeight - 85)
          //   doc.text("Vendor Acknowledgement:", 25, pageHeight - 50)
          //   doc.line(171, pageHeight - 50, 400, pageHeight - 50)
          //   doc.text("Date:", 415, pageHeight - 50)
          //   doc.line(447, pageHeight - 50, pageWidth - 25, pageHeight - 50)
          // }else{
          //   //add T&C's
          //   doc.text("Authorized Signature:", 25, pageHeight - 85)
          //   doc.line(143, pageHeight - 85, 400, pageHeight - 85)
          //   doc.text("Date:", 415, pageHeight - 85)
          //   doc.line(447, pageHeight - 85, pageWidth - 25, pageHeight - 85)
          //   doc.text("Vendor Acknowledgement:", 25, pageHeight - 50)
          //   doc.line(171, pageHeight - 50, 400, pageHeight - 50)
          //   doc.text("Date:", 415, pageHeight - 50)
          //   doc.line(447, pageHeight - 50, pageWidth - 25, pageHeight - 50)
          // }
        }
        //doc.setFontSize(18)
        //doc.text('Purchase Requisition', pageWidth - 25, 45, 'right');
        //doc.setFontSize(14)
        //doc.text('PO : 0000023', pageWidth - 25, 62, 'right');
        var elemA = document.getElementById("pdfSection");
        var resA = doc.autoTableHtmlToJson(elemA);  
        doc.autoTable(resA.columns, resA.data, {
              addPageContent: function(data) {
                doc.setFontSize(14);
                doc.text("Leave Admin", 350, 112);
                doc.setFontSize(14);
                doc.setFontType("bold");
                doc.text("Leto System Pvt Lt", 25, 90);

                
              },
              startY: 125,
              pageBreak: 'auto',
              theme: 'grid',
              tableWidth: 'auto',
              styles: {
                columnWidth: 'auto',
                fillColor: [255,255,255],
                textColor: [0,0,0],
                lineColor: [0,0,0],
                lineWidth: 0.75
              },
              headerStyles: {
                fillColor: [240,240,240]
              },
              margin: {right: 25, left: 25, top: 70, bottom: 50}
            });
          // addSignatureBlock();
          // doc.autoTable(resA.columns, resA.data, {
          //     startY: doc.autoTable.previous.finalY + 75,
          //     pageBreak: 'always',
          //     theme: 'grid',
          //     tableWidth: 'auto',
          //     styles: {
          //       columnWidth: 'auto',
          //       fillColor: [255,255,255],
          //       textColor: [0,0,0],
          //       lineColor: [0,0,0],
          //       lineWidth: 0.75
          //     },
          //     headerStyles: {
          //       fillColor: [240,240,240]
          //     },
          //     margin: {right: 25, left: 25, top: 70, bottom: 50}
          //   });
      
          doc.save('Leave_Admin.pdf')
      });
  });

  $(document).ready(function(){  
    $('.exceller').click(function () {
        var uri = 'data:application/vnd.ms-excel;base64,',
          template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
          base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)))
          },
          format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
              return c[p];
            })
          }
        var toExcel = document.getElementById("pdfSection").innerHTML;
      
        var ctx = {
          worksheet: name || '',
          table :toExcel,
        };
        
        var link = document.createElement("a");
        link.download = "Leave_Admin.xls";
        link.href = uri + base64(format(template, ctx))
        link.click();
      });
  });

    // for floating label
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    this.loadLeaves();

    this.addLeaveadminForm = this.formBuilder.group({
      LeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: ["", [Validators.required]],
      LeaveReason: ["", [Validators.required]],
    });

    // Edit leaveadmin Form Validation And Getting Values

    this.editLeaveadminForm = this.formBuilder.group({
      LeaveType: ["", [Validators.required]],
      From: ["", [Validators.required]],
      To: ["", [Validators.required]],
      NoOfDays: ["", [Validators.required]],
      RemainLeaves: ["", [Validators.required]],
      LeaveReason: ["", [Validators.required]],
    });

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.lstLeave = [];
    this.loadLeaves();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  // Get leave  Api Call
  loadLeaves() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstLeave = data;
      this.rows = this.lstLeave;
      this.srch = [...this.rows];
    });
  }

  // Add leaves for admin Modal Api Call
  addleaves() {
    if (this.addLeaveadminForm.valid) {
      let fromDate = this.pipe.transform(
        this.addLeaveadminForm.value.From,
        "dd-MM-yyyy"
      );
      let toDate = this.pipe.transform(
        this.addLeaveadminForm.value.To,
        "dd-MM-yyyy"
      );
      let obj = {
        employeeName: "Mike Litorus",
        designation: "web developer",
        leaveType: this.addLeaveadminForm.value.LeaveType,
        from: fromDate,
        to: toDate,
        noofDays: this.addLeaveadminForm.value.NoOfDays,
        remainleaves: this.addLeaveadminForm.value.RemainLeaves,
        reason: this.addLeaveadminForm.value.LeaveReason,
        status: "Approved",
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadLeaves();
      $("#add_leave").modal("hide");
      this.addLeaveadminForm.reset();
      this.toastr.success("Leaves added sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // to know the date picker changes

  from(data) {
    this.editFromDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editToDate = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit leaves Modal Api Call
  editLeaves() {
    if (this.editLeaveadminForm.valid) {
      let obj = {
        employeeName: "Mike Litorus",
        designation: "web developer",
        leaveType: this.editLeaveadminForm.value.LeaveType,
        from: this.editFromDate,
        to: this.editToDate,
        noofDays: this.editLeaveadminForm.value.NoOfDays,
        remainleaves: this.editLeaveadminForm.value.RemainLeaves,
        reason: this.editLeaveadminForm.value.LeaveReason,
        status: "Approved",
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadLeaves();
      $("#edit_leave").modal("hide");
      this.toastr.success("Leaves Updated sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }
  // Delete leaves Modal Api Call
  deleteleaves() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadLeaves();
    $("#delete_approve").modal("hide");
    this.toastr.success("Leaves deleted sucessfully..!", "Success");
  }

  // To Get The leaves Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
    const index = this.lstLeave.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstLeave[index];
    this.editLeaveadminForm.setValue({
      LeaveType: toSetValues.leaveType,
      From: toSetValues.from,
      To: toSetValues.to,
      NoOfDays: toSetValues.noofDays,
      RemainLeaves: toSetValues.remainleaves,
      LeaveReason: toSetValues.reason,
    });
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.employeeName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by status
  searchType(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.leaveType.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase
  searchByFrom(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.from.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //search by warranty
  searchByTo(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.to.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
