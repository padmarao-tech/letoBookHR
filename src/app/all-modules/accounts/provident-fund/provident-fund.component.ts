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

import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: "app-provident-fund",
  templateUrl: "./provident-fund.component.html",
})
export class ProvidentFundComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "providentFund";
  public allProvidentfund: any = [];
  public addProvidentfund: FormGroup;
  public editProvidentForm: FormGroup;
  public editId: any;
  public tempId: any;
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
                    doc.text("Provident Fund", 350, 112);
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
          
              doc.save('Provident Fund.pdf')
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
            link.download = "Provident Fund.xls";
            link.href = uri + base64(format(template, ctx))
            link.click();
          });
      }); 
    this.getProvidentfund();

    // Add Provident Form Validation And Getting Values

    this.addProvidentfund = this.formBuilder.group({
      employeeName: ["", [Validators.required]],
      providentType: ["", [Validators.required]],
      employeeShare: ["", [Validators.required]],
      organisationShare: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editProvidentForm = this.formBuilder.group({
      employeeName: ["", [Validators.required]],
      providentType: ["", [Validators.required]],
      employeeShare: ["", [Validators.required]],
      organisationShare: ["", [Validators.required]],
    });
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  getProvidentfund() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allProvidentfund = data;
      this.dtTrigger.next();
    });
  }

  // Add Provident Modal Api Call

  addProvident() {
    if (this.addProvidentfund.valid) {
      let obj = {
        employeeName: this.addProvidentfund.value.employeeName,
        providentFundType: this.addProvidentfund.value.providentType,
        employeeShare: this.addProvidentfund.value.employeeShare,
        organizationShare: this.addProvidentfund.value.organisationShare,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.getProvidentfund();
      $("#add_pf").modal("hide");
      this.addProvidentfund.reset();
      this.toastr.success("Provident fund is added", "Success");
    }
  }

  // Edit Provident Modal Api Call

  editProvident() {
    let obj = {
      employeeName: this.editProvidentForm.value.employeeName,
      providentFundType: this.editProvidentForm.value.providentType,
      employeeShare: this.editProvidentForm.value.employeeShare,
      organizationShare: this.editProvidentForm.value.organisationShare,
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    });
    this.getProvidentfund();
    $("#edit_pf").modal("hide");
    this.toastr.success("Provident fund is edited", "Success");
  }

  edit(value) {
    this.editId = value;
    const index = this.allProvidentfund.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allProvidentfund[index];
    this.editProvidentForm.setValue({
      employeeName: toSetValues.employeeName,
      providentType: toSetValues.providentFundType,
      employeeShare: toSetValues.employeeShare,
      organisationShare: toSetValues.organizationShare,
    });
  }

  // Delete Provident Modal Api Call

  deleteProvident() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.getProvidentfund();
      $("#delete_pf").modal("hide");
      this.toastr.success("Tax is deleted", "Success");
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
