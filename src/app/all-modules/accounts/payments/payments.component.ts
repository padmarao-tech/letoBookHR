import { Component, OnDestroy, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { Subject } from "rxjs";

import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: "app-payments",
  templateUrl: "./payments.component.html",
})
export class PaymentsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  public url: any = "payments";
  public allPayments: any = [];
  public dtTrigger: Subject<any> = new Subject();
  constructor(private allModuleService: AllModulesService) {}

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
                  doc.text("Payments", 350, 112);
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
        
            doc.save('Payments.pdf')
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
          link.download = "Payments.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    }); 
    //get payments
    this.getPayments();

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

  // get payment API call
  getPayments() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allPayments = data;
      this.dtTrigger.next();
    });
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
