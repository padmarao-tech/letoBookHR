import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";

// import { ActivatedRoute , Router } from '@angular/router';
import { DataServiceService } from '../../../service/data-service.service';
import { FormBuilder } from '@angular/forms';
// import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';

import 'jspdf';
declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: 'app-site',
  templateUrl: './site.component.html',
})
export class SiteComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: true })
  // @ViewChild('exports') exports: ElementRef;
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public addSiteForm: FormGroup;
  public editSiteForm: FormGroup;
  public lstSite: any[];
  url: any = "site";
  public tempId: any;
  public editId: any;
  // site:any [];
  // sql: string;
  public rows = [];
  public srch = [];
  constructor(
    // private route: ActivatedRoute,
    private data: DataServiceService,
    private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {
    
   }

  ngOnInit(): void {
    // this.sql="Select * from sitemaster"
    // this.data.runQuery(this.sql).subscribe(
    //   data => {  
    //     this.sitelist = data as string[];
    //     console.log(data)
    //    }  
    // )
    

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
                  doc.text("Site", 350, 112);
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
        
            doc.save('Site.pdf')
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
            // worksheet: name || '',
            table :toExcel,
          };
          
          var link = document.createElement("a");
          link.download = "Site.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });

    // this.dtOptions = {
    //   pageLength: 10,
    //   dom: "lrtip",
    // };
    this.LoadSite();

    this.addSiteForm = this.formBuilder.group({
      SiteCode: ["", [Validators.required]],
      SiteName: ["", [Validators.required]],
    });

    this.editSiteForm = this.formBuilder.group({
      SiteCode: ["", [Validators.required]],
      SiteName: ["", [Validators.required]],
    });
  }
  
  LoadSite() {
    this.data.runQuery('SELECT * FROM sitemaster;').subscribe((data) => {
      // console.log(data)
      this.lstSite = data.map(item=>{return {uid:item.uid,
        siteCode:item.code,
        siteName:item.name,
        status:item.Status==='Y'? 'Active':'Inactive'}});
      // console.log(this.lstDepartment)
      this.dtTrigger.next();
      this.rows = this.lstSite;
      this.srch = [...this.rows];
    });
  }

  // Add Department  Modal Api Call
  addSite() {
    if (this.addSiteForm.valid) {
      let obj = {
        siteCode: this.addSiteForm.value.SiteCode,
        siteName: this.addSiteForm.value.SiteName,
        uid: 0,
      };
      // sulaiman start
      const sql = "insert into sitemaster (code,name) values ('" +
      obj.siteCode + "','" +
      obj.siteName + "')"
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadSite();
        $("#add_Site").modal("hide");
        this.addSiteForm.reset();
        this.toastr.success("Site added sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }
  editSite() {
    if (this.editSiteForm.valid) {
      let obj = {
        uid: this.editId,
        siteCode: this.editSiteForm.value.SiteCode,
        siteName: this.editSiteForm.value.SiteName,
      };
      console.log(obj)
      // sulaiman start
      const sql = "Update sitemaster set code='" + obj.siteCode
      + "',name ='" + obj.siteName
      + "'where uid =" + this.editId
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadSite();
        $("#edit_Site").modal("hide");
        this.toastr.success("Site Updated sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }
  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    console.log(this.editId)
    // set the value from grid row by passing the id value
    const index = this.lstSite.findIndex((item) => {
      return item.uid === value;
    });
    let toSetValues = this.lstSite[index];
    console.log(toSetValues)
    this.editSiteForm.setValue({
      // uid: toSetValues.item.id,
      SiteCode: toSetValues.siteCode,   // added sulaiman
      SiteName: toSetValues.siteName,
    });
  }
  deleteSite() {
    // sulaiman start
    const sql = "Delete from sitemaster where uid =" + this.tempId
    this.data.runQuery(sql)
    .subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadSite();
      $("#delete_Site").modal("hide");
      this.toastr.success("Site deleted sucessfully..!", "Success");
    });
    // sulaiman end
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  getStatus(status,uid){
    const statusValue = status==='Active' ? 'Y' : 'N';
    const sql = "Update sitemaster set status='" + statusValue + "' where uid =" + uid
    this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();

        });
        this.LoadSite();
        // $("#edit_department").modal("hide");
        this.toastr.success("Site Updated sucessfully...!", "Success");
      });
  }
  
}
