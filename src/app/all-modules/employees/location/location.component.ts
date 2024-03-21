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
  // selector: 'app-location',
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstLocation: any[];
  public url: any = "location";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public addLocationForm: FormGroup;
  public editLocationForm: FormGroup;
  sql: string;
  constructor(
    private data: DataServiceService,
    private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    ) {
    
   }

  ngOnInit(): void {
    // this.sql="Select * from location"
    // this.data.runQuery(this.sql).subscribe(
    //   data => {  
    //     this.lstLocation = data as string[];
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
                  doc.text("Location", 350, 112);
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
        
            doc.save('Location.pdf')
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
            //worksheet: name || '',
            table :toExcel,
          };
          
          var link = document.createElement("a");
          link.download = "Location.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });

    // this.dtOptions = {
     
    //   pageLength: 10,
    //   dom: "lrtip",
    // };
    this.LoadLocation();

    this.addLocationForm = this.formBuilder.group({
      LocationCode: ["", [Validators.required]],
      LocationName: ["", [Validators.required]],
    });

    this.editLocationForm = this.formBuilder.group({
      LocationCode: ["", [Validators.required]],
      LocationName: ["", [Validators.required]],
    });
  }

  LoadLocation() {
    this.data.runQuery('SELECT * FROM location;').subscribe((data) => {
      // console.log(data)
      this.lstLocation = data.map(item=>{return {uid:item.uid,
        locationCode:item.code,
        locationName:item.name,
        status:item.Status==='Y'? 'Active':'Inactive'}});

      // console.log(this.lstDepartment)
      this.dtTrigger.next();
      this.rows = this.lstLocation;
      this.srch = [...this.rows];
    });
  }
  // Add Department  Modal Api Call
  addLocation() {
    if (this.addLocationForm.valid) {
      let obj = {
        locationCode: this.addLocationForm.value.LocationCode,
        locationName: this.addLocationForm.value.LocationName,
        uid: 0,
      };
      // sulaiman start
      const sql = "insert into location (code,name) values ('" +
      obj.locationCode + "','" +
      obj.locationName + "')"
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadLocation();
        $("#add_Location").modal("hide");
        this.addLocationForm.reset();
        this.toastr.success("Location added sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }
  editLocation() {
    if (this.editLocationForm.valid) {
      let obj = {
        uid: this.editId,
        locationCode: this.editLocationForm.value.LocationCode,
        locationName: this.editLocationForm.value.LocationName,
      };
      console.log(obj)
      // sulaiman start
      const sql = "Update location set code='" + obj.locationCode
      + "',name ='" + obj.locationName
      + "'where uid =" + this.editId
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadLocation();
        $("#edit_Location").modal("hide");
        this.toastr.success("Location Updated sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }
  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    console.log(this.editId)
    // set the value from grid row by passing the id value
    const index = this.lstLocation.findIndex((item) => {
      return item.uid === value;
    });
    let toSetValues = this.lstLocation[index];
    console.log(toSetValues)
    this.editLocationForm.setValue({
      // uid: toSetValues.item.id,
      LocationCode: toSetValues.locationCode,   // added sulaiman
      LocationName: toSetValues.locationName,
    });
  }
  deleteLocation() {
    // sulaiman start
    const sql = "Delete from location where uid =" + this.tempId
    this.data.runQuery(sql)
    .subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadLocation();
      $("#delete_Location").modal("hide");
      this.toastr.success("Location deleted sucessfully..!", "Success");
    });
    // sulaiman end
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  getStatus(status,uid){
    const statusValue = status==='Active' ? 'Y' : 'N';
    const sql = "Update location set status='" + statusValue + "' where uid =" + uid
    this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadLocation();
        // $("#edit_department").modal("hide");
        this.toastr.success("Location Updated sucessfully...!", "Success");
      });
  }
  
}

