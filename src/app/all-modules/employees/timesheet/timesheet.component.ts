import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: "app-timesheet",
  templateUrl: "./timesheet.component.html",
  styleUrls: ["./timesheet.component.css"],
})
export class TimesheetComponent implements OnInit {
  lstTimesheet: any[];

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  url: any = "timesheet";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addTimesheetForm: FormGroup;
  public editTimesheetForm: FormGroup;
  public editDatetime: any;
  public editDeadline: any;
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
                    doc.text("Timesheet", 350, 112);
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
          
              doc.save('Timesheet.pdf')
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
            link.download = "Timesheet.xls";
            link.href = uri + base64(format(template, ctx))
            link.click();
          });
      });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.LoadTimewsheet();
    this.addTimesheetForm = this.formBuilder.group({
      Project: ["", [Validators.required]],
      TimeDate: ["", [Validators.required]],
      DeadlineName: ["", [Validators.required]],
      totalHours: ["", [Validators.required]],
      remainingHours: ["", [Validators.required]],
      Hrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });

    this.editTimesheetForm = this.formBuilder.group({
      Project: ["", [Validators.required]],
      TimeDate: ["", [Validators.required]],
      DeadlineName: ["", [Validators.required]],
      totalHours: ["", [Validators.required]],
      remainingHours: ["", [Validators.required]],
      Hrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get Timesheet list  Api Call
  LoadTimewsheet() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTimesheet = data;
      this.rows = this.lstTimesheet;
      this.srch = [...this.rows];
    });
  }

  // Add Department  Modal Api Call
  addTimesheet() {
    if (this.addTimesheetForm.valid) {
      let Datetime = this.pipe.transform(
        this.addTimesheetForm.value.TimeDate,
        "dd-MM-yyyy"
      );
      let deadLine = this.pipe.transform(
        this.addTimesheetForm.value.DeadlineName,
        "dd-MM-yyyy"
      );
      let obj = {
        id: 6,
        employee: "John doe Galaviz",
        project: this.addTimesheetForm.value.Project,
        date: Datetime,
        deadline: deadLine,
        totalhrs: this.addTimesheetForm.value.totalHours,
        remainHrs: this.addTimesheetForm.value.remainingHours,
        assignedhours: "20",
        hrs: this.addTimesheetForm.value.Hrs,
        description: this.addTimesheetForm.value.Description,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.LoadTimewsheet();
      $("#add_todaywork").modal("hide");
      this.addTimesheetForm.reset();
      this.toastr.success("Timesheet added sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // to know the date picker changes

  from(data) {
    this.editDatetime = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editDeadline = this.pipe.transform(data, "dd-MM-yyyy");
  }
  editTimesheet() {
    if (this.editTimesheetForm.valid) {
      let obj = {
        employee: "John doe Galaviz",
        project: this.editTimesheetForm.value.Project,
        date: this.editDatetime,
        deadline: this.editDeadline,
        totalhrs: this.editTimesheetForm.value.totalHours,
        remainHrs: this.editTimesheetForm.value.remainingHours,
        assignedhours: "20",
        hrs: this.editTimesheetForm.value.Hrs,
        description: this.editTimesheetForm.value.Description,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.LoadTimewsheet();
      $("#edit_todaywork").modal("hide");
      this.toastr.success("Timesheet Updated sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // To Get The timesheet Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstTimesheet.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstTimesheet[index];
    this.editTimesheetForm.setValue({
      Project: toSetValues.project,
      TimeDate: toSetValues.date,
      DeadlineName: toSetValues.deadline,
      totalHours: toSetValues.totalhrs,
      remainingHours: toSetValues.remainHrs,
      Hrs: toSetValues.hrs,
      Description: toSetValues.description,
    });
  }

  // Delete timedsheet Modal Api Call

  deleteTimesheet() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
      this.LoadTimewsheet();
      $("#delete_timesheet").modal("hide");
      this.toastr.success("Timesheet deleted sucessfully..!", "Success");
    });
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
