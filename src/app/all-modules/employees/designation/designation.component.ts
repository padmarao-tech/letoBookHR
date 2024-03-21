import { Component, OnDestroy, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import 'jspdf';
// import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from "../../../service/data-service.service";

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: 'app-designation',
  templateUrl: './designation.component.html',
})
export class DesignationComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  lstDesignation: any[];
  url: any = "designation";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public addDesignationForm: FormGroup;
  public editDesignationForm: FormGroup;
  // public designationlist:String[];
  sql: string;
  constructor(
    // private route: ActivatedRoute,
    private data: DataServiceService,
    private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    
    // this.data.getDesignation().subscribe(
    //   data => {  
    //     this.designationlist = data as string[];
    //     console.log(data)
    //    }  
    // )

    // this.sql="Select * from designation"
    // this.data.runQuery(this.sql).subscribe(
    //   data => {  
    //     this.designationlist = data as string[];
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
                  doc.text("Designation", 350, 112);
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
        
            doc.save('Designation.pdf')
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
          link.download = "Designation.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });
    // this.dtOptions = {
    //   pageLength: 10,
    //   dom: "lrtip",
    // };
    this.LoadDesignation();

    this.addDesignationForm = this.formBuilder.group({
      DesignationCode: ["", [Validators.required]],
      DesignationName: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
    });

    this.editDesignationForm = this.formBuilder.group({
      DesignationCode: ["", [Validators.required]],
      DesignationName: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
    });
  }

  // Get designation list  Api Call
  LoadDesignation() {
    this.data.runQuery('SELECT 0 myselect,uid,code,name,department,status FROM designation;').subscribe((data) => {
      console.log(data)
      this.lstDesignation = data.map(item=>{return {
        myselect:item.myselect,
        uid:item.uid,
        designationCode:item.code,
        designationName:item.name,
        departmentName:item.department,
        status:item.status==='Y'? 'Active':'Inactive'}});
      // console.log(this.lstDepartment)
      this.dtTrigger.next();
      this.rows = this.lstDesignation;
      this.srch = [...this.rows];
    });
  }
  // Add Designation  Modal Api Call
  addDesignation() {
    if (this.addDesignationForm.valid) {
      let obj = {
        designationCode: this.addDesignationForm.value.DesignationCode,
        designationName: this.addDesignationForm.value.DesignationName,
        departmentName: this.addDesignationForm.value.DepartmentName,
        uid: 0,
      };
      // sulaiman start
      const sql = "insert into designation (code,name,department) values ('" +
                obj.designationCode + "','" +
                obj.designationName + "','" +
                // obj.designationName + "')"
                obj.departmentName + "')"
   console.log(sql)
                this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadDesignation();
        $("#add_designation").modal("hide");
        this.addDesignationForm.reset();
        this.toastr.success("Designation added sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }

  editDesignation() {
    if (this.editDesignationForm.valid) {
      let obj = {
        designationCode: this.editDesignationForm.value.DesignationCode,
        designationName: this.editDesignationForm.value.DesignationName,
        departmentName: this.editDesignationForm.value.DepartmentName,
        uid: this.editId,
      };
      console.log(obj)
      // sulaiman start
      const sql = "Update designation set code='" + obj.designationCode
                  + "'name ='" + obj.designationName
                  + "'department ='" + obj.departmentName
                  + "'where uid =" + this.editId
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadDesignation();
        $("#edit_designation").modal("hide");
        this.toastr.success("Designation Updated sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    console.log(this.editId)
    // set the value from grid row by passing the id value
    const index = this.lstDesignation.findIndex((item) => {
      return item.uid === value;
    });
    let toSetValues = this.lstDesignation[index];
    console.log(toSetValues)
    this.editDesignationForm.setValue({
      // uid: toSetValues.item.id,
      DesignationCode: toSetValues.designationCode, 
      DesignationName: toSetValues.designationName, // added sulaiman
      DepartmentName: toSetValues.departmentName,
    });
  }

  // Delete timedsheet Modal Api Call

  deleteDesignation() {
    const sql = "Delete from designation  where uid =" + this.tempId
    this.data.runQuery(sql)
    .subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadDesignation();
      $("#delete_designation").modal("hide");
      this.toastr.success("Designation deleted sucessfully..!", "Success");
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  // getDesignation(){
  //   this.data.getDesignation().subscribe(result=>{
  //     console.log(result)
  //   })
  // }
  // sulaiman start
  getvalueofarray() {
    console.log(this.lstDesignation)
    this.lstDesignation.forEach(function (arrayItem) {
      console.log('Checked status',arrayItem.myselect,'uid', arrayItem.uid );
    });
    }


  getStatus(status,uid){
    const statusValue = status==='Active' ? 'Y' : 'N';
    const sql = "Update designation set status='" + statusValue + "' where uid =" + uid
    this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadDesignation();
        // $("#edit_department").modal("hide");
        this.toastr.success("Designation Updated sucessfully...!", "Success");
      });
  }
  // sulaiman end
}
