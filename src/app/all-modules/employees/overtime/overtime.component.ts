import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
import  'jspdf';

declare let jsPDF: new () => any;
declare const $: any;
@Component({
  // selector: "app-overtime",
  templateUrl: "./overtime.component.html",
})
export class OvertimeComponent implements OnInit {
  lstOvertime: any[];
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  url: any = "overtime";
  public tempId: any;
  public editId: any;
  public addOvertimeForm: FormGroup;
  public editOvertimeForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    $(document).ready(function(){
          $(".get-pdf").click(function () {
            var octocatPNG = './assets/img/login-logo.png';
            var doc = new jsPDF();
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
                    doc.text("Overtime", 350, 112);
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
          
              doc.save('Overtime.pdf')
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
            link.download = "Overtime.xls";
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

    this.LoadOvertime();
    this.addOvertimeForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      OtDate: ["", [Validators.required]],
      OtHrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });

    this.editOvertimeForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      OtDate: ["", [Validators.required]],
      OtHrs: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    });
  }

  // Get overtime list  Api Call
  LoadOvertime() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstOvertime = data;
      this.dtTrigger.next();
      this.rows = this.lstOvertime;
      this.srch = [...this.rows];
    });
  }

  // Add overtime  Modal Api Call
  addOvertime() {
    if (this.addOvertimeForm.valid) {
      let Datetime = this.pipe.transform(
        this.addOvertimeForm.value.OtDate,
        "dd-MM-yyyy"
      );
      let obj = {
        name: this.addOvertimeForm.value.EmployeeName,
        otDate: Datetime,
        otHrs: this.addOvertimeForm.value.OtHrs,
        otType: "Normal day OT 1.5x",
        status: "New",
        approvedBy: "Richard Miles",
        description: this.addOvertimeForm.value.Description,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadOvertime();
      $("#add_overtime").modal("hide");
      this.addOvertimeForm.reset();
      this.toastr.success("Overtime added sucessfully...!", "Success");
    }
  }

  editOvertime() {
    if (this.editOvertimeForm.valid) {
      let Datetime = this.pipe.transform(
        this.editOvertimeForm.value.OtDate,
        "dd-MM-yyyy"
      );
      let obj = {
        name: this.editOvertimeForm.value.EmployeeName,
        otDate: Datetime,
        otHrs: this.editOvertimeForm.value.OtHrs,
        otType: "Normal day OT 1.5x",
        status: "New",
        approvedBy: "Richard Miles",
        description: this.editOvertimeForm.value.Description,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.LoadOvertime();
      $("#edit_overtime").modal("hide");
      this.toastr.success("Overtime Updated sucessfully...!", "Success");
    }
  }

  // To Get The Overtime Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstOvertime.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstOvertime[index];
    this.editOvertimeForm.setValue({
      EmployeeName: toSetValues.name,
      OtDate: toSetValues.otDate,
      OtHrs: toSetValues.otHrs,
      Description: toSetValues.description,
    });
  }

  // Delete Overtime Modal Api Call

  deleteOvetime() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadOvertime();
      $("#delete_overtime").modal("hide");
      this.toastr.success("Overtime deleted sucessfully..!", "Success");
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
