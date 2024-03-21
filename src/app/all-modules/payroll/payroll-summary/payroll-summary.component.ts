import { Component , OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormBuilder, FormGroup , Validator } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
//import { Subject } from "rxjs";

import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: 'app-payroll-summary',
  templateUrl: './payroll-summary.component.html',
})
export class PayrollSummaryComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  // public addEmployeeForm: FormGroup;
  // public editEmployeeForm: FormGroup;
  //public dtTrigger: Subject<any> = new Subject();
  public lstPayrollSummary: any[];
  public url: any = "payrolllist";
  // public rows = [];
  // public srch = [];

  constructor(
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    //this.loadPayrollSummary();
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
                    doc.text("Payroll Summary", 350, 112);
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
          
              doc.save('Payroll Summary.pdf')
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
            link.download = "Payroll Summary.xls";
            link.href = uri + base64(format(template, ctx))
            link.click();
          });
      });
    $(document).ready(function(){
      //First Row Datatable Grid status 
      $(".comShowDrop").hide(); 
      $(".penShowHide").hide();
      $(".payslip-print").prop('disabled', true);
      $(".payslip-print2").prop('disabled', true);
      $(".payslip-print3").prop('disabled', true);
      $(".comShowHide").click(function(){
        $(".comShowDrop").show();
        $(".penShowHide").show();
        $(".penShowHideDrop").hide();
        $(".payslip-print").prop('disabled', false);
      });

       
      $(".comShowDrop").click(function(){
          $(".comShowHide").show(); 
          $(".penShowHide").show(); 
          $(".payslip-print").prop('disabled', false);
      });

      $(".penShowHideDrop").click(function(){
        $(".comShowHide").show(); 
        $(".penShowHide").show(); 
        $(".payslip-print").prop('disabled', true);
      });

      $(".penShowHide").click(function(){
        $(".comShowDrop").hide();
        $(".penShowHide").show();
        $(".penShowHideDrop").show();
        $(".payslip-print").prop('disabled', true);
      });
      // First Row td End

      // Second Row td
      $(".comShowDrop2").hide(); 
      $(".penShowHide2").hide();
      
      $(".comShowHide2").click(function(){
        $(".comShowDrop2").show();
        $(".penShowHide2").show();
        $(".penShowHideDrop2").hide();
        $(".payslip-print2").prop('disabled', false);
      });

       
      $(".comShowDrop2").click(function(){
          $(".comShowHide2").show(); 
          $(".penShowHide2").show(); 
          $(".payslip-print2").prop('disabled', false);
      });

      $(".penShowHideDrop2").click(function(){
        $(".comShowHide2").show(); 
        $(".penShowHide2").show(); 
        $(".payslip-print2").prop('disabled', true);
      });

      $(".penShowHide2").click(function(){
        $(".comShowDrop2").hide();
        $(".penShowHide2").show();
        $(".penShowHideDrop2").show();
        $(".payslip-print2").prop('disabled', true);
      });
      // Second Row td End

      // Third Row td
      $(".comShowDrop3").hide(); 
      $(".penShowHide3").hide();
      
      $(".comShowHide3").click(function(){
        $(".comShowDrop3").show();
        $(".penShowHide3").show();
        $(".penShowHideDrop3").hide();
        $(".payslip-print3").prop('disabled', false);
      });

       
      $(".comShowDrop3").click(function(){
          $(".comShowHide3").show(); 
          $(".penShowHide3").show(); 
          $(".payslip-print3").prop('disabled', false);
      });

      $(".penShowHideDrop3").click(function(){
        $(".comShowHide3").show(); 
        $(".penShowHide3").show(); 
        $(".payslip-print3").prop('disabled', true);
      });

      $(".penShowHide3").click(function(){
        $(".comShowDrop3").hide();
        $(".penShowHide3").show();
        $(".penShowHideDrop3").show();
        $(".payslip-print3").prop('disabled', true);
      });
      // Third Row td End

      //this html is hide  
      // $(".penShowHide").show();
      //   $(".payslip-print").prop('disabled', true);
      //   $(".payslip-print2").prop('disabled', true);

      //   $(".penShowHide").click(function(){
      //       $(".penShowHide").show();  
      //   });

      //   $(".comShowHide").click(function(){
      //       $(".payslip-print").prop('disabled', false);
      //   });

      //   $(".penShowHide2").click(function(){
      //       $(".penShowHide2").show();  
      //   });

      //   $(".comShowHide2").click(function(){
      //       $(".payslip-print2").prop('disabled', false);
      //   });

      //   $(".comShowCancel").click(function(){
      //       $(".penShowHide").show();  
      //       $(".comShowHide").hide(); 
      //       $(".payslip-print").prop('disabled', true);
      //   });
      //   $(".comShowCancel2").click(function(){
      //       $(".penShowHide2").show();  
      //       $(".comShowHide2").hide(); 
      //       $(".payslip-print2").prop('disabled', true);
      //   });

      //   $(".comShow2").hide();
      //   $(".comShowCancel2").hide();

      //   $(".comShow").click(function(){
      //       $(".comShow2").hide();
      //       $(".comShowHide").show();
      //       $(".penShowHide").hide();
      //       $(".payslip-print").prop('disabled', false);
      //   });

      //   $(".comShow2").click(function(){
      //       $(".comShow").hide();
      //       $(".comShowHide2").show();
      //       $(".penShowHide2").hide();
      //       $(".payslip-print2").prop('disabled', false);
      // });

        //payslip model hide
        $(".payslip-modelHide").click(function(){
            $(".modal-backdrop.show").hide();
        });

        
    });
  }
  // loadPayrollSummary() {
  //   this.srvModuleService.get(this.url).subscribe((data) => {
  //     this.lstPayrollSummary = data;
  //     this.rows = this.lstPayrollSummary;
  //     this.srch = [...this.rows];
  //   });
  // }
 ngOnDestroy(): void {
    
    //this.dtTrigger.unsubscribe();
  } 
  
}
