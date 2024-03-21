import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery'
import 'jquery'

import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: 'app-attendance-admin',
  templateUrl: './attendance-admin.component.html',
})
export class AttendanceAdminComponent implements OnInit {
  fakeArray = new Array(30);
  constructor() { }

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
                  doc.text("Attendance Admin", 350, 112);
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
        
            doc.save('Attendance_Admin.pdf')
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
          link.download = "Attendance_Admin.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });
    $(document).ready(function(){
         //First Row
          $(".untik").click(function(){
              $(".tik").show();  
              $(".untik").hide();
          });
          $(".tik").click(function(){
              $(".tik").hide();  
              $(".untik").show();
          });

          $(".untik1").click(function(){
              $(".tik1").show();  
              $(".untik1").hide();
          });
          $(".tik1").click(function(){
              $(".tik1").hide();  
              $(".untik1").show();
          });

          $(".untik2").click(function(){
              $(".tik2").show();  
              $(".untik2").hide();
          });
          $(".tik2").click(function(){
              $(".tik2").hide();  
              $(".untik2").show();
          });

          $(".untik3").click(function(){
              $(".tik3").show();  
              $(".untik3").hide();
          });
          $(".tik3").click(function(){
              $(".tik3").hide();  
              $(".untik3").show();
          });

          $(".untik4").click(function(){
              $(".tik4").show();  
              $(".untik4").hide();
          });
          $(".tik4").click(function(){
              $(".tik4").hide();  
              $(".untik4").show();
          });

          $(".untik5").click(function(){
            $(".tik5").show();  
            $(".untik5").hide();
          });
          $(".tik5").click(function(){
              $(".tik5").hide();  
              $(".untik5").show();
          });

          $(".untik6").click(function(){
            $(".tik6").show();  
            $(".untik6").hide();
          });
          $(".tik6").click(function(){
              $(".tik6").hide();  
              $(".untik6").show();
          });

          $(".untik7").click(function(){
              $(".tik7").show();  
              $(".untik7").hide();
          });
          $(".tik7").click(function(){
              $(".tik7").hide();  
              $(".untik7").show();
          });

          $(".untik8").click(function(){
              $(".tik8").show();  
              $(".untik8").hide();
          });
          $(".tik8").click(function(){
              $(".tik8").hide();  
              $(".untik8").show();
          });

          $(".untik9").click(function(){
              $(".tik9").show();  
              $(".untik9").hide();
          });
          $(".tik9").click(function(){
              $(".tik9").hide();  
              $(".untik9").show();
          });

          $(".untik10").click(function(){
              $(".tik10").show();  
              $(".untik10").hide();
          });
          $(".tik10").click(function(){
              $(".tik10").hide();  
              $(".untik10").show();
          });

          $(".untik11").click(function(){
            $(".tik11").show();  
            $(".untik11").hide();
          });
          $(".tik11").click(function(){
              $(".tik11").hide();  
              $(".untik11").show();
          });

          $(".untik12").click(function(){
            $(".tik12").show();  
            $(".untik12").hide();
          });
          $(".tik12").click(function(){
              $(".tik12").hide();  
              $(".untik12").show();
          });

          $(".untik13").click(function(){
            $(".tik13").show();  
            $(".untik13").hide();
          });
          $(".tik13").click(function(){
              $(".tik13").hide();  
              $(".untik13").show();
          });

          $(".untik14").click(function(){
            $(".tik14").show();  
            $(".untik14").hide();
          });
          $(".tik14").click(function(){
              $(".tik14").hide();  
              $(".untik14").show();
          });

          $(".untik15").click(function(){
            $(".tik15").show();  
            $(".untik15").hide();
          });
          $(".tik15").click(function(){
              $(".tik15").hide();  
              $(".untik15").show();
          });

          $(".untik16").click(function(){
            $(".tik16").show();  
            $(".untik16").hide();
          });
          $(".tik16").click(function(){
              $(".tik16").hide();  
              $(".untik16").show();
          });

          $(".untik17").click(function(){
            $(".tik17").show();  
            $(".untik17").hide();
          });
          $(".tik17").click(function(){
              $(".tik17").hide();  
              $(".untik17").show();
          });
          
          $(".untik18").click(function(){
            $(".tik18").show();  
            $(".untik18").hide();
          });
          $(".tik18").click(function(){
              $(".tik18").hide();  
              $(".untik18").show();
          });
          
          $(".untik19").click(function(){
            $(".tik19").show();  
            $(".untik19").hide();
          });
          $(".tik19").click(function(){
              $(".tik19").hide();  
              $(".untik19").show();
          });
          
          $(".untik20").click(function(){
            $(".tik20").show();  
            $(".untik20").hide();
          });
          $(".tik20").click(function(){
              $(".tik20").hide();  
              $(".untik20").show();
          });
          
          $(".untik21").click(function(){
                $(".tik21").show();  
                $(".untik21").hide();
          });
          $(".tik21").click(function(){
                $(".tik21").hide();  
                $(".untik21").show();
          });

          $(".untik22").click(function(){
            $(".tik22").show();  
            $(".untik22").hide();
        });
        $(".tik22").click(function(){
                $(".tik22").hide();  
                $(".untik22").show();
        });

        $(".untik23").click(function(){
            $(".tik23").show();  
            $(".untik23").hide();
        });
        $(".tik23").click(function(){
                $(".tik23").hide();  
                $(".untik23").show();
        });

        $(".untik24").click(function(){
            $(".tik24").show();  
            $(".untik24").hide();
        });
        $(".tik24").click(function(){
                $(".tik24").hide();  
                $(".untik24").show();
        });

        $(".untik25").click(function(){
            $(".tik25").show();  
            $(".untik25").hide();
        });
        $(".tik25").click(function(){
                $(".tik25").hide();  
                $(".untik25").show();
        });

        $(".untik26").click(function(){
            $(".tik26").show();  
            $(".untik26").hide();
        });
        $(".tik26").click(function(){
                $(".tik26").hide();  
                $(".untik26").show();
        });

        $(".untik27").click(function(){
            $(".tik27").show();  
            $(".untik27").hide();
        });
        $(".tik27").click(function(){
                $(".tik27").hide();  
                $(".untik27").show();
        });

        $(".untik28").click(function(){
            $(".tik28").show();  
            $(".untik28").hide();
        });
        $(".tik28").click(function(){
                $(".tik28").hide();  
                $(".untik28").show();
        });

        $(".untik29").click(function(){
            $(".tik29").show();  
            $(".untik29").hide();
        });
        $(".tik29").click(function(){
            $(".tik29").hide();  
            $(".untik29").show();
        });

       //Second Row 
        $(".untik30").click(function(){
            $(".tik30").show();  
            $(".untik30").hide();
        });
        $(".tik30").click(function(){
            $(".tik30").hide();  
            $(".untik30").show();
        });

        $(".untik31").click(function(){
            $(".tik31").show();  
            $(".untik31").hide();
        });
        $(".tik31").click(function(){
            $(".tik31").hide();  
            $(".untik31").show();
        });

        $(".untik2").click(function(){
            $(".tik2").show();  
            $(".untik2").hide();
        });
        $(".tik2").click(function(){
            $(".tik2").hide();  
            $(".untik2").show();
        });

        $(".untik3").click(function(){
            $(".tik3").show();  
            $(".untik3").hide();
        });
        $(".tik3").click(function(){
            $(".tik3").hide();  
            $(".untik3").show();
        });

        $(".untik4").click(function(){
            $(".tik4").show();  
            $(".untik4").hide();
        });
        $(".tik4").click(function(){
            $(".tik4").hide();  
            $(".untik4").show();
        });

        $(".untik5").click(function(){
          $(".tik5").show();  
          $(".untik5").hide();
        });
        $(".tik5").click(function(){
            $(".tik5").hide();  
            $(".untik5").show();
        });

        $(".untik6").click(function(){
          $(".tik6").show();  
          $(".untik6").hide();
        });
        $(".tik6").click(function(){
            $(".tik6").hide();  
            $(".untik6").show();
        });

        $(".untik7").click(function(){
            $(".tik7").show();  
            $(".untik7").hide();
        });
        $(".tik7").click(function(){
            $(".tik7").hide();  
            $(".untik7").show();
        });

        $(".untik8").click(function(){
            $(".tik8").show();  
            $(".untik8").hide();
        });
        $(".tik8").click(function(){
            $(".tik8").hide();  
            $(".untik8").show();
        });

        $(".untik9").click(function(){
            $(".tik9").show();  
            $(".untik9").hide();
        });
        $(".tik9").click(function(){
            $(".tik9").hide();  
            $(".untik9").show();
        });

        $(".untik10").click(function(){
            $(".tik10").show();  
            $(".untik10").hide();
        });
        $(".tik10").click(function(){
            $(".tik10").hide();  
            $(".untik10").show();
        });

        $(".untik11").click(function(){
          $(".tik11").show();  
          $(".untik11").hide();
        });
        $(".tik11").click(function(){
            $(".tik11").hide();  
            $(".untik11").show();
        });

        $(".untik12").click(function(){
          $(".tik12").show();  
          $(".untik12").hide();
        });
        $(".tik12").click(function(){
            $(".tik12").hide();  
            $(".untik12").show();
        });

        $(".untik13").click(function(){
          $(".tik13").show();  
          $(".untik13").hide();
        });
        $(".tik13").click(function(){
            $(".tik13").hide();  
            $(".untik13").show();
        });

        $(".untik14").click(function(){
          $(".tik14").show();  
          $(".untik14").hide();
        });
        $(".tik14").click(function(){
            $(".tik14").hide();  
            $(".untik14").show();
        });

        $(".untik15").click(function(){
          $(".tik15").show();  
          $(".untik15").hide();
        });
        $(".tik15").click(function(){
            $(".tik15").hide();  
            $(".untik15").show();
        });

        $(".untik16").click(function(){
          $(".tik16").show();  
          $(".untik16").hide();
        });
        $(".tik16").click(function(){
            $(".tik16").hide();  
            $(".untik16").show();
        });

        $(".untik17").click(function(){
          $(".tik17").show();  
          $(".untik17").hide();
        });
        $(".tik17").click(function(){
            $(".tik17").hide();  
            $(".untik17").show();
        });
        
        $(".untik18").click(function(){
          $(".tik18").show();  
          $(".untik18").hide();
        });
        $(".tik18").click(function(){
            $(".tik18").hide();  
            $(".untik18").show();
        });
        
        $(".untik19").click(function(){
          $(".tik19").show();  
          $(".untik19").hide();
        });
        $(".tik19").click(function(){
            $(".tik19").hide();  
            $(".untik19").show();
        });
        
        $(".untik20").click(function(){
          $(".tik20").show();  
          $(".untik20").hide();
        });
        $(".tik20").click(function(){
            $(".tik20").hide();  
            $(".untik20").show();
        });
        
        $(".untik21").click(function(){
              $(".tik21").show();  
              $(".untik21").hide();
        });
        $(".tik21").click(function(){
              $(".tik21").hide();  
              $(".untik21").show();
        });

        $(".untik22").click(function(){
          $(".tik22").show();  
          $(".untik22").hide();
      });
      $(".tik22").click(function(){
              $(".tik22").hide();  
              $(".untik22").show();
      });

      $(".untik23").click(function(){
          $(".tik23").show();  
          $(".untik23").hide();
      });
      $(".tik23").click(function(){
              $(".tik23").hide();  
              $(".untik23").show();
      });

      $(".untik24").click(function(){
          $(".tik24").show();  
          $(".untik24").hide();
      });
      $(".tik24").click(function(){
              $(".tik24").hide();  
              $(".untik24").show();
      });

      $(".untik25").click(function(){
          $(".tik25").show();  
          $(".untik25").hide();
      });
      $(".tik25").click(function(){
              $(".tik25").hide();  
              $(".untik25").show();
      });

      $(".untik26").click(function(){
          $(".tik26").show();  
          $(".untik26").hide();
      });
      $(".tik26").click(function(){
              $(".tik26").hide();  
              $(".untik26").show();
      });

      $(".untik27").click(function(){
          $(".tik27").show();  
          $(".untik27").hide();
      });
      $(".tik27").click(function(){
              $(".tik27").hide();  
              $(".untik27").show();
      });

      $(".untik28").click(function(){
          $(".tik28").show();  
          $(".untik28").hide();
      });
      $(".tik28").click(function(){
              $(".tik28").hide();  
              $(".untik28").show();
      });

      $(".untik29").click(function(){
          $(".tik29").show();  
          $(".untik29").hide();
      });
      $(".tik29").click(function(){
          $(".tik29").hide();  
          $(".untik29").show();
      });
    });
  }
}
