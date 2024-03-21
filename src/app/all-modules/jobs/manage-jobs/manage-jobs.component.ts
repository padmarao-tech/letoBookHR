import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";

import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: "app-manage-jobs",
  templateUrl: "./manage-jobs.component.html",
})
export class ManageJobsComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "manageJobs";
  public allManageJobs: any = [];
  public addManageJobs: FormGroup;
  public editManageJobs: FormGroup;
  public editId: any;
  public tempId: any;
  public pipe = new DatePipe("en-US");
  public purchaseDateFormat;
  public purchaseToDateFormat;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
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
                  doc.text("Manage Jobs", 350, 112);
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
        
            doc.save('Manage Jobs.pdf')
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
          link.download = "Manage Jobs.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });
    this.getManageJobs();

    // Add Provident Form Validation And Getting Values

    this.addManageJobs = this.formBuilder.group({
      addJobTitle: ["", [Validators.required]],
      addDepartment: ["", [Validators.required]],
      addStartDate: ["", [Validators.required]],
      addExpireDate: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editManageJobs = this.formBuilder.group({
      editJobTitle: ["", [Validators.required]],
      editDepartment: ["", [Validators.required]],
      editStartDate: ["", [Validators.required]],
      editExpireDate: ["", [Validators.required]],
    });

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getManageJobs() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allManageJobs = data;
      this.dtTrigger.next();
    });
  }

  // Add Provident Modal Api Call

  addJobs() {
    if (this.addManageJobs.valid) {
      let purchaseDateFormat = this.pipe.transform(
        this.addManageJobs.value.addStartDate,
        "dd-MM-yyyy"
      );
      let purchaseToDateFormat = this.pipe.transform(
        this.addManageJobs.value.addExpireDate,
        "dd-MM-yyyy"
      );
      let obj = {
        jobTitle: this.addManageJobs.value.addJobTitle,
        department: this.addManageJobs.value.addDepartment,
        startDate: purchaseDateFormat,
        expireDate: purchaseToDateFormat,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.getManageJobs();
      $("#add_job").modal("hide");
      this.addManageJobs.reset();
      this.toastr.success("Job is added", "Success");
    }
  }
  // to know the date picker changes

  from(data) {
    this.purchaseDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.purchaseToDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit Provident Modal Api Call

  editJobs() {
    let obj = {
      jobTitle: this.editManageJobs.value.editJobTitle,
      department: this.editManageJobs.value.editDepartment,
      startDate: this.purchaseDateFormat,
      expireDate: this.purchaseToDateFormat,
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
    this.getManageJobs();
    $("#edit_job").modal("hide");
    this.toastr.success("Job is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allManageJobs.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allManageJobs[index];
    this.editManageJobs.setValue({
      editJobTitle: toSetValues.jobTitle,
      editDepartment: toSetValues.department,
      editStartDate: toSetValues.startDate,
      editExpireDate: toSetValues.expireDate,
    });
  }

  // Delete Provident Modal Api Call

  deleteJobs() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.getManageJobs();
      $("#delete_job").modal("hide");
      this.toastr.success("Job is deleted", "Success");
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
