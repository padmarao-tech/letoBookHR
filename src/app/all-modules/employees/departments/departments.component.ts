import { Component, OnDestroy, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
// sulaiman start
import { DataServiceService } from "../../../service/data-service.service";
// sulaiman end
import 'jspdf';
// import { Console } from "console";


declare var jsPDF: any;
declare const $: any;


@Component({
  // selector: "app-departments",
  templateUrl: "./departments.component.html",
})



export class DepartmentsComponent implements OnInit, OnDestroy {
  public dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public lstDepartment: any[];
  public barcode:any='Ayyappan123'
  public url: any = "department";
  public tempId: any;
  public editId: any;
  public rows = [];
  public srch = [];
  public addDepartmentForm: FormGroup;
  public editDepartmentForm: FormGroup;
  public PaymentTypes: {};
  public dtTrigger: Subject<any> = new Subject();
  public selected : any[];
  public currLat : number;
  public currLng : number;
  public resultContainer = document.getElementById('qr-reader-results');
   sql: string;
  constructor(
    private data: DataServiceService,
    private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    // this.sql="Select * from department"
    // this.data.runQuery(this.sql).subscribe(
    //   data => {  
    //     this.lstDepartment = data as string[];
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
                doc.text("Department", 350, 112);
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
      
          doc.save('Department.pdf')
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
        link.download = "Department.xls";
        link.href = uri + base64(format(template, ctx))
        link.click();
      });
  });
  $(document).ready(function(){   
  var resultContainer = document.getElementById('qr-reader-results');
  var lastResult, countResults = 0;
 
  function onScanSuccess(decodedText, decodedResult) {
      if (decodedText !== lastResult) {
          ++countResults;
          lastResult = decodedText;
          // Handle on success condition with the decoded message.
          console.log(`Scan result ${decodedText}`, decodedResult);
      }
  }
}

);

  
    this.LoadDepartment();
    this.getCurrentLocation();
       this.addDepartmentForm = this.formBuilder.group({
      DepartmentCode: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
    });

    this.editDepartmentForm = this.formBuilder.group({
      DepartmentCode: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
    });
    
    
    
  }

  // Get department list  Api Call

  // sulaiman start
  LoadDepartment() {
    this.data.runQuery('SELECT * FROM department;').subscribe((data) => {
      // console.log(data)
      this.lstDepartment = data.map(item=>{return {
        uid:item.uid,
        departmentCode:item.code,
        departmentName:item.name,
        status:item.Status==='Active'? 'Active':'Inactive'}});
      // console.log(this.lstDepartment)
      this.dtTrigger.next();
      this.rows = this.lstDepartment;
      this.srch = [...this.rows];
    });
  }
  // sulaiman end
  //fill payment option
  Fillpaymentcombo() {
    this.data.runQuery('SELECT uid,name,Amount,NoofUsers,NoofEmployee FROM Packagemaster;').subscribe((data) => {
     this.PaymentTypes = data;
      console.log(data)
    });
  }


  
     //after change of option choose
  PmtSelected(event: any) {
      let selectElement = event.target;
        var optionIndex = selectElement.selectedIndex;
        var optionText = selectElement.options[optionIndex];
      //this.selected.push(this.PaymentTypes[optionIndex]);
      this.selected=this.PaymentTypes[optionIndex-1];
      console.log('name',this.selected['name'],this.selected['Amount']);
      this.addDepartmentForm = this.formBuilder.group({
      DepartmentCode: this.selected['code'],
      DepartmentName:this.selected['name']
    });
  }

  
  //after change of option choose
  // PmtSelected(event: any) {
  //     let selectElement = event.target;
  //     var optionIndex = selectElement.selectedIndex;
  //     var optionText = selectElement.options[optionIndex];
  //     this.selected=this.PaymentTypes[optionIndex];
  //     console.log(this.selected)
          
  //   }
 



  // Add Department  Modal Api Call
  addDepartment() {
    if (this.addDepartmentForm.valid) {
      let obj = {
        departmentCode: this.addDepartmentForm.value.DepartmentCode,
        departmentName: this.addDepartmentForm.value.DepartmentName,
        uid: 0,
      };
      // sulaiman start
      const sql = "insert into department (code,name) values ('" +
                obj.departmentCode + "','" +
                obj.departmentName + "')"
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadDepartment();
        $("#add_department").modal("hide");
        this.addDepartmentForm.reset();
        this.toastr.success("Department added sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }

  editDepartment() {
    if (this.editDepartmentForm.valid) {
      let obj = {
        uid: this.editId,
        departmentCode: this.editDepartmentForm.value.DepartmentCode, // added sulaiman
        departmentName: this.editDepartmentForm.value.DepartmentName,
      };
      console.log(obj)
      // sulaiman start
      const sql = "Update department set code='" + obj.departmentCode
                  + "',name ='" + obj.departmentName
                  + "'where uid =" + this.editId
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadDepartment();
        $("#edit_department").modal("hide");
        this.toastr.success("Department Updated sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    console.log(this.editId)
    // set the value from grid row by passing the id value
    const index = this.lstDepartment.findIndex((item) => {
      return item.uid === value;
    });
    let toSetValues = this.lstDepartment[index];
    console.log(toSetValues)
    this.editDepartmentForm.setValue({
      // uid: toSetValues.item.id,
      DepartmentCode: toSetValues.departmentCode,   // added sulaiman
      DepartmentName: toSetValues.departmentName,
    });
  }
  

  deleteDepartment() {
    // sulaiman start
    const sql = "Delete from department  where uid =" + this.tempId
    this.data.runQuery(sql)
    .subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadDepartment();
      $("#delete_department").modal("hide");
      this.toastr.success("Department deleted sucessfully..!", "Success");
    });
    // sulaiman end
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
         this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
     
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  getStatus(status,uid){
    const statusValue = status==='Active' ? 'Active' : 'Inactive';
    const sql = "Update department set status='" + statusValue + "' where uid =" + uid
    console.log(statusValue)
    this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadDepartment();
        // $("#edit_department").modal("hide");
        this.toastr.success("Department Updated sucessfully...!", "Success");
      });
  }

   onScanSuccess(decodedText, decodedResult) {
    var resultContainer = document.getElementById('qr-reader-results');
    var lastResult, countResults = 0;
    if (decodedText !== lastResult) {
        ++countResults;
        lastResult = decodedText;
        // Handle on success condition with the decoded message.
        console.log(`Scan result ${decodedText}`, decodedResult);
    }
}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  // sulaiman start
  
  // sulaiman end
}
