import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: "app-termination-main",
  templateUrl: "./termination-main.component.html",
})
export class TerminationMainComponent implements OnInit {
  lstTermination: any[];

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  url: any = "terminationmain";

  public tempId: any;
  public editId: any;

  public addTerminationForm: FormGroup;
  public editTerminationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) { }

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
                  doc.text("Termination", 350, 112);
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
        
            doc.save('Termination.pdf')
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
          link.download = "Termination.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });
    this.loadTermination();
    this.dtOptions = {

      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    }

    this.addTerminationForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      TerminationTyped: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      TerminationDated: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });

    this.editTerminationForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      TerminationTyped: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      TerminationDated: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get  termination Api Call
  loadTermination() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTermination = data;
      this.rows = this.lstTermination;
      this.srch = [...this.rows];
    });
  }

  // Add  termination  Modal Api Call
  addTermination() {
    if (this.addTerminationForm.valid) {
      let noticedDate = this.pipe.transform(
        this.addTerminationForm.value.NoticeDated,
        "dd-MM-yyyy"
      );
      let terminationDate = this.pipe.transform(
        this.addTerminationForm.value.TerminationDated,
        "dd-MM-yyyy"
      );
      let obj = {
        employee: this.addTerminationForm.value.EmployeeName,
        department: "Web development",
        terminationType: this.addTerminationForm.value.TerminationTyped,
        noticedDate: noticedDate,
        terminationDate: terminationDate,
        reason: this.addTerminationForm.value.ReasonName,
        id: 0,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadTermination();
      $("#add_termination").modal("hide");
      this.addTerminationForm.reset();
      this.toastr.success("Termination added sucessfully...!", "Success");
    }
  }

  // update api call 
  editTermination() {
    if (this.editTerminationForm.valid) {
      // let noticed = this.pipe.transform(
      //   this.editTerminationForm.value.NoticeDated,
      //   "dd-MM-yyyy"
      // );
      // let termination = this.pipe.transform(
      //   this.editTerminationForm.value.TerminationDated,
      //   "dd-MM-yyyy"
      // );
      let obj = {
        employee: this.editTerminationForm.value.EmployeeName,
        department: "Web development",
        terminationType: this.editTerminationForm.value.TerminationTyped,
        noticedDate: this.editTerminationForm.value.NoticeDated,
        terminationDate: this.editTerminationForm.value.TerminationDated,
        reason: this.editTerminationForm.value.ReasonName,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadTermination();
      $("#edit_termination").modal("hide");
      this.toastr.success("Termination Updated sucessfully...!", "Success");
    }
  }


  // To Get The termination Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstTermination.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstTermination[index];
    this.editTerminationForm.setValue({
      EmployeeName: toSetValues.employee,
      TerminationTyped: toSetValues.terminationType,
      NoticeDated: toSetValues.noticedDate,
      TerminationDated: toSetValues.terminationDate,
      ReasonName: toSetValues.reason,
    });
  }


  // delete api call
  deleteTermination() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadTermination();
    $("#delete_termination").modal("hide");
    this.toastr.success("Termination  deleted sucessfully..!", "Success");
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
