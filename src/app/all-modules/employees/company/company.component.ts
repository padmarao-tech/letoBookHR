import { Component, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DatePipe } from "@angular/common";
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map'

// import { ActivatedRoute , Router } from '@angular/router';
import { DataServiceService } from '../../../service/data-service.service';
// import { AllModulesService } from '../../all-modules.service';
import { ToastrService } from 'ngx-toastr';

import 'jspdf';
declare var jsPDF: any;
declare const $: any;

@Component({
  // selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  // @ViewChild('exports') exports: ElementRef;
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public addCompanyForm: FormGroup;
  public editCompanyForm: FormGroup;
  public lstCompany: any[];
  url: any = "company";
  public tempId: any;
  public editId: any;
  public pipe = new DatePipe("en-US");
  // site:any [];
  // sql: string;
  public rows = [];
  public srch = [];
  // public StartDate: any;

  public PaymentTypes:{};
  public selected: any[];
  
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
                  doc.text("Company", 350, 112);
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
        
            doc.save('Company.pdf')
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
          link.download = "Company.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });

    // this.dtOptions = {
    //   pageLength: 10,
    //   dom: "lrtip",
    // };
     this.LoadCompany();
    this.Fillpaymentcombo();

    this.addCompanyForm = this.formBuilder.group({
      CompanyName: ["", [Validators.required]],
      CompanyAddress: ["", [Validators.required]],
      Pincode: ["", [Validators.required]],
      ContactPerson: ["", [Validators.required]],
      Desingnation: ["", [Validators.required]],
      PersonEmailID: ["", [Validators.required]],
      ContactNo: ["", [Validators.required]],
      CompanyEmailId: ["", [Validators.required]],
      GSTNo: ["", [Validators.required]],
      PanCardNo: ["", [Validators.required]],
      AdminId: ["", [Validators.required]],
      Password: ["", [Validators.required]],
      PackageMaster: ["", [Validators.required]],
      PackageAmount: ["", [Validators.required]],
      NoofUserAllowed: ["", [Validators.required]],
      NoofEmployee : ["", [Validators.required]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
      DisplayStatus: ["", [Validators.required]],
    });

    this.editCompanyForm = this.formBuilder.group({
      CompanyName: ["", [Validators.required]],
      CompanyAddress: ["", [Validators.required]],
      Pincode: ["", [Validators.required]],
      ContactPerson: ["", [Validators.required]],
      Desingnation: ["", [Validators.required]],
      PersonEmailID: ["", [Validators.required]],
      ContactNo: ["", [Validators.required]],
      CompanyEmailId: ["", [Validators.required]],
      GSTNo: ["", [Validators.required]],
      PanCardNo: ["", [Validators.required]],
      AdminId: ["", [Validators.required]],
      Password: ["", [Validators.required]],
      PackageMaster: ["", [Validators.required]],
      PackageAmount: ["", [Validators.required]],
      NoofUserAllowed: ["", [Validators.required]],
      NoofEmployee : ["", [Validators.required]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
      DisplayStatus: ["", [Validators.required]],
      // PaymentMode: ["", [Validators.required]],
    });
  }

  Fillpaymentcombo() {
    this.data.runQuery('SELECT Uid,Code,Name,Amount,NoofUsers,NoofEmployee FROM packagemaster;').subscribe((data) => {
      console.log(data)
      this.PaymentTypes = data;
    });
  }
  PmtSelected(event: any) {
      let selectElement = event.target;
      var optionIndex = selectElement.selectedIndex;
      var optionText = selectElement.options[optionIndex];
      this.selected=this.PaymentTypes[optionIndex-1];
      console.log(this.selected);
      this.addCompanyForm = this.formBuilder.group({
      PackageAmount: this.selected['Amount'],
      NoofUserAllowed: this.selected['NoofUsers'],
      NoofEmployee: this.selected['NoofEmployee'],
    });  
  }
  
  LoadCompany() {
    this.data.runQuery('SELECT * FROM companymaster;').subscribe((data) => {
      // console.log(data)
      this.lstCompany = data.map(item=>{return {uid:item.uid,
        companyName:item.companyname,
        companyAddress:item.Companyaddress,
        pinCode:item.pincode,
        contactPerson:item.Contact_person,
        desingnation:item.Desingnation,
        personEmailID:item.Person_EmailID,
        contactNo:item.Contact_no,
        companyEmailId:item.Company_emailid,
        gstNo:item.gstno,
        panCardNo:item.pancardno,
        adminId:item.adminid,
        password:item.password,
        packageMaster:item.Packagemaster_uid,
        packageAmount:item.PackageAmount,
        noofUserAllowed:item.Noofuserallowed,
        NoofEmployee:item.NoofEmployee,
        startDate:item.StartDate,
        endDate:item.End_date,
        displayStatus:item.Displaystatus,
        status:item.Status==='Y'? 'Active':'Inactive'}});
      // console.log(this.lstDepartment)
      this.dtTrigger.next();
      this.rows = this.lstCompany;
      this.srch = [...this.rows];
    });
  }

  addCompany() {
    if (this.addCompanyForm.valid) {
      let leavetypeStartDate = this.pipe.transform(
        this.addCompanyForm.value.StartDate,
        "yyyy-MM-dd"
      );
      let leavetypeEndDate = this.pipe.transform(
        this.addCompanyForm.value.EndDate,
        "yyyy-MM-dd"
      );
      let obj = {
        uid: 0,
        companyName: this.addCompanyForm.value.CompanyName,
        companyAddress: this.addCompanyForm.value.CompanyAddress,
        pinCode: this.addCompanyForm.value.Pincode,
        contactPerson: this.addCompanyForm.value.ContactPerson,
        desingnation: this.addCompanyForm.value.Desingnation,
        personEmailID: this.addCompanyForm.value.PersonEmailID,
        contactNo: this.addCompanyForm.value.ContactNo,
        companyEmailId: this.addCompanyForm.value.CompanyEmailId,
        gstNo: this.addCompanyForm.value.GSTNo,
        panCardNo: this.addCompanyForm.value.PanCardNo,
        adminId: this.addCompanyForm.value.AdminId,
        password: this.addCompanyForm.value.Password,
        packageMaster: this.addCompanyForm.value.PackageMaster,
        packageAmount: this.addCompanyForm.value.PackageAmount,
        noofUserAllowed: this.addCompanyForm.value.NoofUserAllowed,
        NoofEmployee: this.addCompanyForm.value.NoofEmployee,
        startDate: this.addCompanyForm.value.StartDate,
        endDate: this.addCompanyForm.value.EndDate,
        displayStatus: this.addCompanyForm.value.DisplayStatus,
      };
      console.log(obj);
      const sql = "insert into companymaster (companyname,Companyaddress,pincode,Contact_person,Desingnation,Person_EmailID,Contact_no,Company_emailid,gstno,pancardno,adminid,password,Packagemaster_uid,PackageAmount,Noofuserallowed,NoofEmployee,StartDate,End_date,Displaystatus) values ('"+ 
      obj.companyName + "','" 
      + obj.companyAddress + "','" 
      + obj.pinCode + "','" 
      + obj.contactPerson + "' , '"
      + obj.desingnation + "' , '"
      + obj.personEmailID + "' , '" 
      + obj.contactNo + "','" 
      + obj.companyEmailId + "','"
      + obj.gstNo + "','" 
      + obj.panCardNo + "','" 
      + obj.adminId + "','"
      + obj.password + "','"
      + obj.packageMaster + "','" 
      + obj.packageAmount + "','" 
      + obj.noofUserAllowed + "','"
      + obj.NoofEmployee + "','"
      + leavetypeStartDate + "','"
      + leavetypeEndDate + "','"
      + obj.displayStatus + "')"
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadCompany();
        $("#add_Company").modal("hide");
        this.addCompanyForm.reset();
        this.toastr.success("Company added sucessfully...!", "Success");
      });
    }
  }
  
  // from(data) {
  //   this.StartDate = this.pipe.transform(data, "dd-MM-yyyy");
  // }
  

  editCompany() {
    if (this.editCompanyForm.valid) {
      let leavetypeStartDate = this.pipe.transform(
        this.editCompanyForm.value.StartDate,
        "yyyy-MM-dd"
      );
      let leavetypeEndDate = this.pipe.transform(
        this.editCompanyForm.value.EndDate,
        "yyyy-MM-dd"
      );
      let obj = {
        uid: this.editId,
        companyName: this.editCompanyForm.value.CompanyName,
        companyAddress: this.editCompanyForm.value.CompanyAddress,
        pinCode:this.editCompanyForm.value.Pincode,
        contactPerson:this.editCompanyForm.value.ContactPerson,
        desingnation:this.editCompanyForm.value.Desingnation,
        personEmailID:this.editCompanyForm.value.PersonEmailID,
        contactNo:this.editCompanyForm.value.ContactNo,
        companyEmailId:this.editCompanyForm.value.CompanyEmailId,
        gstNo:this.editCompanyForm.value.GSTNo,
        panCardNo:this.editCompanyForm.value.PanCardNo,
        adminId:this.editCompanyForm.value.AdminId,
        password:this.editCompanyForm.value.Password,
        packageMaster:this.editCompanyForm.value.PackageMaster,
        packageAmount:this.editCompanyForm.value.PackageAmount,
        noofUserAllowed:this.editCompanyForm.value.NoofUserAllowed,
        NoofEmployee:this.editCompanyForm.value.NoofEmployee,
        startDate:this.editCompanyForm.value.StartDate,
        endDate:this.editCompanyForm.value.EndDate,
        displayStatus:this.editCompanyForm.value.DisplayStatus,
      };
      console.log(obj)
      // sulaiman start
      const sql = "Update companymaster set companyname ='" + obj.companyName 
      + "',Companyaddress ='" + obj.companyAddress 
      + "',pincode ='" + obj.pinCode 
      + "',Contact_person ='" + obj.contactPerson 
      +"',Desingnation ='" + obj.desingnation 
      +"',Person_EmailID ='" + obj.personEmailID 
      +"',Contact_no ='" + obj.contactNo 
      +"',Company_emailid ='" + obj.companyEmailId 
      +"',gstno ='" + obj.gstNo 
      +"',pancardno ='" + obj.panCardNo 
      +"',adminid ='" + obj.adminId 
      +"',password ='" + obj.password 
      +"',Packagemaster_uid ='" + obj.packageMaster 
      +"',PackageAmount ='" + obj.packageAmount 
      +"',Noofuserallowed ='" + obj.noofUserAllowed 
      +"',NoofEmployee ='" + obj.NoofEmployee 
      +"',StartDate ='" + leavetypeStartDate
      +"',End_date ='" + leavetypeEndDate
      +"',Displaystatus ='" + obj.displayStatus 
      + "'where uid =" + this.editId
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadCompany();
        $("#edit_Company").modal("hide");
        this.toastr.success("Company Updated sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    console.log(this.editId)
    // set the value from grid row by passing the id value
    const index = this.lstCompany.findIndex((item) => {
      return item.uid === value;
    });
    let toSetValues = this.lstCompany[index];
    console.log(toSetValues)
    this.editCompanyForm.setValue({
      // uid: toSetValues.item.uid,
      CompanyName: toSetValues.companyName,   // added sulaiman
      CompanyAddress: toSetValues.companyAddress,
      Pincode: toSetValues.pinCode,
      ContactPerson: toSetValues.contactPerson,
      Desingnation: toSetValues.desingnation,
      PersonEmailID: toSetValues.personEmailID,
      ContactNo: toSetValues.contactNo,
      CompanyEmailId: toSetValues.companyEmailId,
      GSTNo: toSetValues.gstNo,
      PanCardNo: toSetValues.panCardNo,
      AdminId:toSetValues.adminId,
      Password:toSetValues.password,
      PackageMaster:toSetValues.packageMaster,
      PackageAmount:toSetValues.packageAmount,
      NoofUserAllowed:toSetValues.noofUserAllowed,
      NoofEmployee:toSetValues.NoofEmployee,
      StartDate:toSetValues.startDate,
      EndDate:toSetValues.endDate,
      DisplayStatus:toSetValues.displayStatus,
    });
  }

  deleteCompany() {
    const sql = "Delete from companymaster where uid =" + this.tempId
    this.data.runQuery(sql)
    .subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadCompany();
      $("#delete_Company").modal("hide");
      this.toastr.success("Company deleted sucessfully..!", "Success");
    });
  }
  getStatus(status,uid){
    const statusValue = status==='Active' ? 'Y' : 'N';
    const sql = "Update companymaster set status='" + statusValue + "' where uid =" + uid
    this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadCompany();
        this.toastr.success("Company Updated sucessfully...!", "Success");
      });
  }

  
  ngOnDestroy(): void {
    
    this.dtTrigger.unsubscribe();
  }
  
}
