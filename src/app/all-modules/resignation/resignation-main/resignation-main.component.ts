import { Component, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DatePipe } from "@angular/common";
import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: "app-resignation-main",
  templateUrl: "./resignation-main.component.html",
})
export class ResignationMainComponent implements OnInit {
  lstResignation: any[];

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "resignationmain";
  public tempId: any;
  public editId: any;
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addResignForm: FormGroup;
  public editResignForm: FormGroup;
  public NoticedDate;
  public ResignDate;
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
                  doc.text("Resignation", 350, 112);
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
        
            doc.save('Resignation.pdf')
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
          link.download = "Resignation.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });
    this.loadResignation();
    this.dtOptions = {
      // ... skipped ...
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.addResignForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      ResignationDate: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });

    this.editResignForm = this.formBuilder.group({
      EmployeeName: ["", [Validators.required]],
      NoticeDated: ["", [Validators.required]],
      ResignationDate: ["", [Validators.required]],
      ReasonName: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // Get  resignation Api Call
  loadResignation() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstResignation = data;
      this.rows = this.lstResignation;
      this.srch = [...this.rows];
    });
  }

  // Add Resignation  Modal Api Call
  addResignation() {
    if (this.addResignForm.valid) {
      let noticedDate = this.pipe.transform(
        this.addResignForm.value.NoticeDated,
        "dd-MM-yyyy"
      );
      let resignationDate = this.pipe.transform(
        this.addResignForm.value.ResignationDate,
        "dd-MM-yyyy"
      );
      let obj = {
        employee: this.addResignForm.value.EmployeeName,
        department: "Web development",
        noticedDate: noticedDate,
        resignDate: resignationDate,
        reason: this.addResignForm.value.ReasonName,
        id: 0,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadResignation();
      $("#add_resignation").modal("hide");
      this.addResignForm.reset();
      this.toastr.success("Resignation added sucessfully...!", "Success");
    }
  }

  // to know the date picker changes

  from(data) {
    this.NoticedDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.ResignDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  //update api call
  editResignation() {
    if (this.editResignForm.valid) {
      let obj = {
        employee: this.editResignForm.value.EmployeeName,
        department: "Web development",
        noticedDate: this.NoticedDate,
        resignDate: this.ResignDate,
        reason: this.editResignForm.value.ReasonName,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadResignation();
      $("#edit_resignation").modal("hide");
      this.toastr.success("Resignation Updated sucessfully...!", "Success");
    }
  }

  // To Get The goal type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstResignation.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstResignation[index];
    this.editResignForm.setValue({
      EmployeeName: toSetValues.employee,
      NoticeDated: toSetValues.noticedDate,
      ResignationDate: toSetValues.resignDate,
      ReasonName: toSetValues.reason,
    });
  }

  // delete api call
  deleteResignation() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadResignation();
    $("#delete_resignation").modal("hide");
    this.toastr.success("Resignation  deleted sucessfully..!", "Success");
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
