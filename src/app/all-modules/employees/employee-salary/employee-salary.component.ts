import {
  Component,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewInit, Input, Output, EventEmitter , ElementRef
  } from "@angular/core";
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
  import { DatePipe } from "@angular/common";
  import 'jspdf';

declare let jsPDF: new () => any;
declare const $: any;
  
  @Component({
    // selector: "app-employee-salary",
    templateUrl: "./employee-salary.component.html",
    styleUrls: ["./employee-salary.component.css"],
  })
  export class EmployeeSalaryComponent
    implements OnInit, OnDestroy, AfterViewInit {
      @ViewChild('exports') exports: ElementRef;
      @Output() newItemEvent = new EventEmitter<string>();
      items = [''];
      items2 = [''];
      // name = 'Angular 6';
  
      fieldArray: Array<any> = [
          // {
          //   'name': 'Others 1'
          // },
          // {
          //   'name': 'Others 2'
          // }
        ];
        newAttribute: any = {};
      
        firstField = false;
        firstFieldName = 'First Item name';
        isEditItems: boolean;
        isEditItems2: boolean;
      
        addNewItem(value: string) {
          //this.newItemEvent.emit(value);
          this.items.push(value);
        }
        addNewTask(value: string) {
          this.items2.push(value);
        }
        addFieldValue(index) {
            // this.fieldArray.length <= 10
            this.fieldArray.push(this.newAttribute);
            this.newAttribute = {};
            this.isEditItems = !this.isEditItems;
            this.isEditItems2 = !this.isEditItems2;        
        }
      
        // deleteFieldValue(index) {
        //   this.fieldArray.splice(index, 0);
        // }
      
        // onEditCloseItems() {
        //   this.isEditItems = !this.isEditItems;
        // }
    @ViewChild(DataTableDirective, { static: false })
  
    public dtElement: DataTableDirective;
    public dtOptions: DataTables.Settings = {};
    public url: any = "employeeSalary";
    public allSalary: any = [];
    public addSalary: FormGroup;
    public editSalary: FormGroup;
    values = [];
    textbox = [];
    // text1 = [''];
    // addNewItem(value: string) {
      
    //   this.text1.push(value);
    // }
    // addNewItem2(value: string) {
      
    //   this.items.push(value);
    // }
    public editId: any;
    public tempId: any;
    public rows = [];
    public srch = [];
    public statusValue;
    public dtTrigger: Subject<any> = new Subject();
    public pipe = new DatePipe("en-US");
    public basicValue;
    public daValue;
    public hraValue;
    public conveyanceValue;
    public allowanceValue;
    public medicalAllowanceValue;
    public othersAddValue;
    public tdsValue;
    public esiValue;
    public pfValue;
    public leaveValue;
    public profTaxValue;
    public labourValue;
    public othersDedValue;
    constructor(
      private allModuleService: AllModulesService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService
    ) {}
  
    ngOnInit(): void {
      $(document).ready(function(){
          $(".get-pdf").click(function () {
            var octocatPNG = './assets/img/login-logo.png';
            var doc = new jsPDF();
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
                    doc.text("Employee Salary", 350, 112);
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
          
              doc.save('Employee_Salary.pdf')
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
            link.download = "Employee_Salary.xls";
            link.href = uri + base64(format(template, ctx))
            link.click();
          });
      });
      $(document).ready(function(){
        $(".pdfButton").click(function(){
          var pdf = new jsPDF();
          var EmployeeId = $('input[name=Employee_Id]').val();
          var SelectStaff = $('select[name=SelectStaff]').val();
          var Designation = $('input[name=designation]').val();
          var Department = $('input[name=department]').val();
          var DateOfJoining = $('input[name=DateofJoining]').val();
          var PFNo = $('input[name=PF_No]').val();
          var ESINo = $('input[name=ESI_No]').val();

          var Basic = $('input[name=basic]').val();
          var DA = $('input[name=da]').val();
          var HRA = $('input[name=hra]').val();
          var Conveyance = $('input[name=conveyance]').val();
          var Allowance = $('input[name=allowance]').val();
          var MedicalAllowance = $('input[name=medicalAllowance]').val();

          var TDS = $('input[name=tds]').val();
          var ESI = $('input[name=esi]').val();
          var PF = $('input[name=pf]').val();
          var Leave = $('input[name=leave]').val();
          var Prof_Tax = $('input[name=prof_tax]').val();
          var Labour_Welfare = $('input[name=labour_welfare]').val();


          var GrossSalary = $('input[name=gross_salary]').val();
          var Total_Earnings = $('input[name=total_earnings').val();
          var Total_Deductions = $('input[name=total_deductions').val();
          var NetSalary = $('input[name=netSalary').val();
          

          pdf.setFillColor(227,227,227);
          pdf.rect(11, 34, 45, 10, 'F');
          pdf.rect(11, 34, 45, 10);
          pdf.rect(56, 34, 49, 10);

          pdf.rect(105, 34, 47, 10, 'F');
          pdf.rect(105, 34, 47, 10);
          pdf.rect(152, 34, 49, 10);

          pdf.rect(11, 44, 45, 10, 'F');
          pdf.rect(11, 44, 45, 10);
          pdf.rect(56, 44, 49, 10);

          pdf.rect(105, 44, 47, 10, 'F');
          pdf.rect(105, 44, 47, 10);
          pdf.rect(152, 44, 49, 10);

          pdf.rect(11, 54, 45, 10, 'F');
          pdf.rect(11, 54, 45, 10);
          pdf.rect(56, 54, 49, 10);

          pdf.rect(105, 54, 47, 10, 'F');
          pdf.rect(105, 54, 47, 10);
          pdf.rect(152, 54, 49, 10);

          pdf.rect(11, 64, 45, 10, 'F');
          pdf.rect(11, 64, 45, 10);
          pdf.rect(56, 64, 49, 10);

          pdf.rect(11, 84, 94, 10, 'F');
          pdf.rect(11, 84, 94, 10);
          

          pdf.rect(105, 84, 96, 10, 'F');
          pdf.rect(105, 84, 96, 10);


          //Earnings
          pdf.rect(11, 94, 45, 10, 'F');
          pdf.rect(11, 94, 45, 10);
          pdf.rect(56, 94, 49, 10);

          pdf.rect(11, 104, 45, 10, 'F');
          pdf.rect(11, 104, 45, 10);
          pdf.rect(56, 104, 49, 10);

          pdf.rect(11, 114, 45, 10, 'F');
          pdf.rect(11, 114, 45, 10);
          pdf.rect(56, 114, 49, 10);

          pdf.rect(11, 124, 45, 10, 'F');
          pdf.rect(11, 124, 45, 10);
          pdf.rect(56, 124, 49, 10);

          pdf.rect(11, 134, 45, 10, 'F');
          pdf.rect(11, 134, 45, 10);
          pdf.rect(56, 134, 49, 10);

          pdf.rect(11, 144, 45, 10, 'F');
          pdf.rect(11, 144, 45, 10);
          pdf.rect(56, 144, 49, 10);

          //Deductions
          pdf.rect(105, 94, 47, 10, 'F');
          pdf.rect(105, 94, 47, 10);
          pdf.rect(152, 94, 49, 10);

          pdf.rect(105, 104, 47, 10, 'F');
          pdf.rect(105, 104, 47, 10);
          pdf.rect(152, 104, 49, 10);

          pdf.rect(105, 114, 47, 10, 'F');
          pdf.rect(105, 114, 47, 10);
          pdf.rect(152, 114, 49, 10);

          pdf.rect(105, 124, 47, 10, 'F');
          pdf.rect(105, 124, 47, 10);
          pdf.rect(152, 124, 49, 10);

          pdf.rect(105, 134, 47, 10, 'F');
          pdf.rect(105, 134, 47, 10);
          pdf.rect(152, 134, 49, 10);

          pdf.rect(105, 144, 47, 10, 'F');
          pdf.rect(105, 144, 47, 10);
          pdf.rect(152, 144, 49, 10);

          pdf.rect(105, 164, 47, 10, 'F');
          pdf.rect(105, 164, 47, 10);
          pdf.rect(152, 164, 49, 10);

          pdf.rect(105, 174, 47, 10, 'F');
          pdf.rect(105, 174, 47, 10);
          pdf.rect(152, 174, 49, 10);

          pdf.rect(105, 184, 47, 10, 'F');
          pdf.rect(105, 184, 47, 10);
          pdf.rect(152, 184, 49, 10);

          pdf.rect(105, 194, 47, 10, 'F');
          pdf.rect(105, 194, 47, 10);
          pdf.rect(152, 194, 49, 10);

          

        

          var specialElementHandlers = {
            // '#getPDF': function(element, renderer){
            //   return true;
            // },
            // '.controls': function(element, renderer){
            //   return true;
            // }
          };
  
          pdf.setFontSize(20);
          pdf.fromHTML($('#CompanyName').get(0), 80, 10, {
            'width': 170, 
            'elementHandlers': specialElementHandlers
          });
  
          
          pdf.setFontSize(16);
          pdf.fromHTML($('#EmpSalaryReportTitle').get(0), 82, 22, {
            'width': 170, 
            'elementHandlers': specialElementHandlers
          });

          pdf.setFontSize(11);
          pdf.text("Employee Id" , 13,40);pdf.text(EmployeeId , 60,40);
          pdf.text("Employee Name" , 107,40);pdf.text(SelectStaff , 154,40);
          pdf.text("Designation" , 13,50);pdf.text(Designation , 60,50);
          pdf.text("Department" , 107,50);pdf.text(Department , 154,50);
          pdf.text("Date Of Joining" , 13,60);pdf.text(DateOfJoining , 60,60);
          pdf.text("PF No" , 107,60);pdf.text(PFNo , 154,60);
          pdf.text("ESI No" , 13,70);pdf.text(ESINo , 60,70);

          

          //Earnings
          pdf.text("Basic" , 13,100);pdf.text(Basic , 90,100);
          pdf.text("DA" , 13,110);pdf.text(DA , 90,110);
          pdf.text("HRA" , 13,120);pdf.text(HRA , 90,120);
          pdf.text("Conveyance" , 13,130);pdf.text(Conveyance , 90,130);
          pdf.text("Allowance" , 13,140);pdf.text(Allowance , 90,140);
          pdf.text("Medical Allowance" , 13,150);pdf.text(MedicalAllowance , 90,150);

          //Deductions
          pdf.text("TDS" , 107,100);pdf.text(TDS , 185,100);
          pdf.text("ESI" , 107,110);pdf.text(ESI , 185,110);
          pdf.text("PF" , 107,120);pdf.text(PF , 185,120);
          pdf.text("Leave" , 107,130);pdf.text(Leave , 185,130);
          pdf.text("Prof/Tax" , 107,140);pdf.text(Prof_Tax , 185,140);
          pdf.text("Labour Welfare" , 107,150);pdf.text(Labour_Welfare , 185,150);

          pdf.setFontType('bold');
          pdf.text("Earnings" , 50,90);pdf.text("Deductions" , 141,90);

          
          pdf.text("Gross Salary" , 107,170);pdf.text(GrossSalary , 185,170);
          pdf.text("Total Earnings" , 107,180);pdf.text(Total_Earnings , 185,180);
          pdf.text("Total Deductions" , 107,190);pdf.text(Total_Deductions , 185,190);
          pdf.text("Net Salary" , 107,200);pdf.text(NetSalary , 185,200);

          

          pdf.save("Employee_Salary.pdf");
        });
      });
        $(".floating")
        .on("focus blur", function (e) {
          $(this)
            .parents(".form-focus")
            .toggleClass("focused", e.type === "focus" || this.value.length > 0);
        })
        .trigger("blur");
  
      // get all salary
      this.getSalary();
   
      // Add salary form Validation And Getting Values
  
      this.addSalary = this.formBuilder.group({
        selectStaff: [""],
        netSalary: [""],
        basic: ["", [Validators.required]],
        da: [""],
        hra: [""],
        conveyance: [""],
        allowance: [""],
        medicalAllowance: [""],
        othersAdd: [""],
        tds: [""],
        esi: [""],
        pf: [""],
        leave: [""],
        profTax: [""],
        labour: [""],
        othersDed: [""],
      });
  
      // Edit salary Form Validation And Getting Values
  
      this.editSalary = this.formBuilder.group({
        editSelectStaff: [""],
        editNetSalary: [""],
        editBasic: ["", [Validators.required]],
        editDa: [""],
        editHra: [""],
        editConveyance: [""],
        editAllowance: [""],
        editMedAllowance: [""],
        editAddOthers: [""],
        editTds: [""],
        editEsi: [""],
        editPf: [""],
        editleave: [""],
        editProfTax: [""],
        editLabour: [""],
        editDedOthers: [""],
      });
  
      // for data table configuration
      this.dtOptions = {
        // ... skipped ...
        pageLength: 10,
        dom: "lrtip",
      };
    }
    // removevalue(i){
    //   this.values.splice(i,1);
    // }
    // addtextbox() {
    //   this.textbox.push({text: ""});
    // };
    // addtextbox2() {
    //   this.values.push({value: ""});
    // };
  
  
    ngAfterViewInit(): void {
      setTimeout(() => {
        this.dtTrigger.next();
      }, 1000);
    }
  
    // manually rendering Data table
  
    rerender(): void {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.allSalary = [];
      this.getSalary();
      setTimeout(() => {
        this.dtTrigger.next();
      }, 1000);
    }
  
    //get data for data table
  
    getSalary() {
      this.allModuleService.get(this.url).subscribe((data) => {
        this.allSalary = data;
        this.rows = this.allSalary;
        this.srch = [...this.rows];
      });
    }
  
    // Add salary Modal Api Call
  
    addSalarySubmit() {
      if (this.addSalary.valid) {
        let obj = {
          employee: this.addSalary.value.selectStaff,
          employeeId: "FT-0101",
          email: "johndoe@example.com",
          joinDate: "07-01-2019",
          role: "Web Developer",
          employeeRole: "Employee",
          status: "pending",
          salary: this.addSalary.value.netSalary,
          Basic: this.addSalary.value.basic,
          tDS: this.addSalary.value.tds,
          da: this.addSalary.value.da,
          hra: this.addSalary.value.hra,
          pf: this.addSalary.value.pf,
          conveyance: this.addSalary.value.conveyance,
          leave: this.addSalary.value.leave,
          allowance: this.addSalary.value.allowance,
          proTax: this.addSalary.value.profTax,
          medAllowance: this.addSalary.value.medicalAllowance,
          labourWelfare: this.addSalary.value.labour,
          othersAdd: this.addSalary.value.othersAdd,
          othersDed: this.addSalary.value.othersDed,
          esi: this.addSalary.value.esi,
        };
        this.allModuleService.add(obj, this.url).subscribe((data) => {
          $("#datatable").DataTable().clear();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
          this.dtTrigger.next();
        });
        this.getSalary();
        $("#add_salary").modal("hide");
        this.addSalary.reset();
        this.toastr.success("Salary is added", "Success");
      } else {
        this.toastr.warning("Mandatory fields required", "");
      }
    }
  
    // changes in add form feilds
    changeAddPrice(name, value) {
      switch (name) {
        case 0:
          this.addSalary.patchValue({
            basic: value,
          });
          break;
        case 1:
          this.addSalary.patchValue({
            da: value,
          });
          break;
        case 2:
          this.addSalary.patchValue({
            hra: value,
          });
          break;
        case 3:
          this.addSalary.patchValue({
            conveyance: value,
          });
          break;
        case 4:
          this.addSalary.patchValue({
            allowance: value,
          });
          break;
        case 5:
          this.addSalary.patchValue({
            medicalAllowance: value,
          });
          break;
        case 6:
          this.addSalary.patchValue({
            othersAdd: value,
          });
          break;
        case 7:
          this.addSalary.patchValue({
            tds: value,
          });
          break;
        case 8:
          this.addSalary.patchValue({
            esi: value,
          });
          break;
        case 9:
          this.addSalary.patchValue({
            pf: value,
          });
          break;
        case 10:
          this.addSalary.patchValue({
            leave: value,
          });
          break;
        case 11:
          this.addSalary.patchValue({
            profTax: value,
          });
          break;
        case 12:
          this.addSalary.patchValue({
            labour: value,
          });
          break;
        case 13:
          this.addSalary.patchValue({
            othersDed: value,
          });
          break;
        default:
          console.log("");
          break;
      }
      let basicValue = this.addSalary.value.basic;
      let daValue = this.addSalary.value.da;
      let hraValue = this.addSalary.value.hra;
      let conveyanceValue = this.addSalary.value.conveyance;
      let allowanceValue = this.addSalary.value.allowance;
      let medicalAllowanceValue = this.addSalary.value.medicalAllowance;
      let othersAddValue = this.addSalary.value.othersAdd;
      let tdsValue = this.addSalary.value.tds;
      let esiValue = this.addSalary.value.esi;
      let pfValue = this.addSalary.value.pf;
      let leaveValue = this.addSalary.value.leave;
      let profTaxValue = this.addSalary.value.profTax;
      let labourValue = this.addSalary.value.labour;
      let othersDedValue = this.addSalary.value.othersDed;
  
      let addValue =
        Number(basicValue) +
        Number(daValue) +
        Number(hraValue) +
        Number(conveyanceValue) +
        Number(allowanceValue) +
        Number(medicalAllowanceValue) +
        Number(othersAddValue);
      let dedutValue =
        Number(tdsValue) +
        Number(esiValue) +
        Number(pfValue) +
        Number(leaveValue) +
        Number(profTaxValue) +
        Number(labourValue) +
        Number(othersDedValue);
      this.addSalary.patchValue({
        netSalary: addValue - dedutValue,
      });
    }
  
    //changes in the edit form fields
    changeEditPrice(name, value) {
      switch (name) {
        case 0:
          this.editSalary.patchValue({
            editBasic: value,
          });
          break;
        case 1:
          this.editSalary.patchValue({
            editDa: value,
          });
          break;
        case 2:
          this.editSalary.patchValue({
            editHra: value,
          });
          break;
        case 3:
          this.editSalary.patchValue({
            editConveyance: value,
          });
          break;
        case 4:
          this.editSalary.patchValue({
            editAllowance: value,
          });
          break;
        case 5:
          this.editSalary.patchValue({
            editMedAllowance: value,
          });
          break;
        case 6:
          this.editSalary.patchValue({
            editAddOthers: value,
          });
          break;
        case 7:
          this.editSalary.patchValue({
            editTds: value,
          });
          break;
        case 8:
          this.editSalary.patchValue({
            editEsi: value,
          });
          break;
        case 9:
          this.editSalary.patchValue({
            editPf: value,
          });
          break;
        case 10:
          this.editSalary.patchValue({
            editleave: value,
          });
          break;
        case 11:
          this.editSalary.patchValue({
            editProfTax: value,
          });
          break;
        case 12:
          this.editSalary.patchValue({
            editLabour: value,
          });
          break;
        case 13:
          this.editSalary.patchValue({
            editDedOthers: value,
          });
          break;
        default:
          console.log("");
          break;
      }
      let basicValue = this.editSalary.value.editBasic;
      let daValue = this.editSalary.value.editDa;
      let hraValue = this.editSalary.value.editHra;
      let conveyanceValue = this.editSalary.value.editConveyance;
      let allowanceValue = this.editSalary.value.editAllowance;
      let medicalAllowanceValue = this.editSalary.value.editMedAllowance;
      let othersAddValue = this.editSalary.value.editAddOthers;
      let tdsValue = this.editSalary.value.editTds;
      let esiValue = this.editSalary.value.editEsi;
      let pfValue = this.editSalary.value.editPf;
      let leaveValue = this.editSalary.value.editleave;
      let profTaxValue = this.editSalary.value.editProfTax;
      let labourValue = this.editSalary.value.editLabour;
      let othersDedValue = this.editSalary.value.editDedOthers;
  
      let addValue =
        Number(basicValue) +
        Number(daValue) +
        Number(hraValue) +
        Number(conveyanceValue) +
        Number(allowanceValue) +
        Number(medicalAllowanceValue) +
        Number(othersAddValue);
      let dedutValue =
        Number(tdsValue) +
        Number(esiValue) +
        Number(pfValue) +
        Number(leaveValue) +
        Number(profTaxValue) +
        Number(labourValue) +
        Number(othersDedValue);
      this.editSalary.patchValue({
        editNetSalary: addValue - dedutValue,
      });
    }
  
    // Edit salary Modal Api Call
  
    editSalarySubmit() {
      if (this.editSalary.valid) {
        let obj = {
          employee: this.editSalary.value.editSelectStaff,
          employeeId: "FT-0101",
          email: "johndoe@example.com",
          joinDate: "07-01-2019",
          role: "Web Developer",
          employeeRole: "Employee",
          status: "pending",
          salary: this.editSalary.value.editNetSalary,
          Basic: this.editSalary.value.editBasic,
          tDS: this.editSalary.value.editTds,
          da: this.editSalary.value.editDa,
          hra: this.editSalary.value.editHra,
          pf: this.editSalary.value.editPf,
          conveyance: this.editSalary.value.editConveyance,
          leave: this.editSalary.value.editleave,
          allowance: this.editSalary.value.editAllowance,
          proTax: this.editSalary.value.editProfTax,
          medAllowance: this.editSalary.value.editMedAllowance,
          labourWelfare: this.editSalary.value.editLabour,
          othersAdd: this.editSalary.value.editAddOthers,
          othersDed: this.editSalary.value.editDedOthers,
          esi: this.editSalary.value.editEsi,
          id: this.editId,
        };
        this.allModuleService.update(obj, this.url).subscribe((data1) => {
          $("#datatable").DataTable().clear();
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
          });
          this.dtTrigger.next();
        });
        this.getSalary();
        $("#edit_salary").modal("hide");
        this.toastr.success("Salary is edited", "Success");
      } else {
        this.toastr.warning("Mandatory fields required", "");
      }
    }
  
    edit(value) {
      this.editId = value;
      const index = this.allSalary.findIndex((item) => {
        return item.id === value;
      });
      let toSetValues = this.allSalary[index];
      this.editSalary.patchValue({
        editSelectStaff: toSetValues.employee,
        editNetSalary: toSetValues.salary,
        editBasic: toSetValues.Basic,
        editDa: toSetValues.da,
        editHra: toSetValues.hra,
        editConveyance: toSetValues.conveyance,
        editAllowance: toSetValues.allowance,
        editMedAllowance: toSetValues.medAllowance,
        editAddOthers: toSetValues.othersAdd,
        editTds: toSetValues.tDS,
        editEsi: toSetValues.esi,
        editPf: toSetValues.pf,
        editleave: toSetValues.leave,
        editProfTax: toSetValues.proTax,
        editLabour: toSetValues.labourWelfare,
        editDedOthers: toSetValues.othersDed,
      });
    }
  
    // Delete salary Modal Api Call
  
    deleteSalary() {
      this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getSalary();
      $("#delete_salary").modal("hide");
      this.toastr.success("Salary is deleted", "Success");
    }
  
    //search by name
    searchName(val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.employee.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows.push(...temp);
    }
  
    //search by role
  
    searchRole(val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.role.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows.push(...temp);
    }
  
    //search by status
  
    searchStatus(val) {
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        val = val.toLowerCase();
        return d.status.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.rows.push(...temp);
    }
  
    //search by from value
    searchByFrom(val) {
      let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        return d.joinDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
      });
      this.rows.push(...temp);
      $(".floating")
        .on("focus blur", function (e) {
          $(this)
            .parents(".form-focus")
            .toggleClass("focused", e.type === "focus" || this.value.length > 0);
        })
        .trigger("blur");
    }
  
    //search by To value
    searchByTo(val) {
      let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
      this.rows.splice(0, this.rows.length);
      let temp = this.srch.filter(function (d) {
        return d.joinDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
      });
      this.rows.push(...temp);
      $(".floating")
        .on("focus blur", function (e) {
          $(this)
            .parents(".form-focus")
            .toggleClass("focused", e.type === "focus" || this.value.length > 0);
        })
        .trigger("blur");
    }
  
    //getting the status value
    getStatus(data) {
      this.statusValue = data;
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
  }
  