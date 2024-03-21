import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { IDropdownSettings } from 'ng-multiselect-dropdown';

import 'jspdf';

declare var jsPDF: any;
declare const $: any;

@Component({
  // selector: "app-payroll-items",
  templateUrl: "./payroll-items.component.html",
})
export class PayrollItemsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  public urlAdd: any = "payrollAddition";
  public urlOver: any = "payrollOvertime";
  public urlDeduct: any = "payrollDeduction";
  public allAddPayroll: any = [];
  public allOverPayroll: any = [];
  public allDeductPayroll: any = [];
  public addPayrollForm: FormGroup;
  public addOverForm: FormGroup;
  public addDeductForm: FormGroup;
  public editPayrollForm: FormGroup;
  public editOverForm: FormGroup;
  public editDeductForm: FormGroup;
  public editAddId: any;
  public editOverId: any;
  public editDeductId: any;
  public tempAddId: any;
  public tempOverId: any;
  public tempDeductId: any;


  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    //Addition
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
            var elemA = document.getElementById("pdfSectionAddition");
            var resA = doc.autoTableHtmlToJson(elemA);  
            doc.autoTable(resA.columns, resA.data, {
                  addPageContent: function(data) {
                    doc.setFontSize(14);
                    doc.text("Addition", 350, 112);
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
          
              doc.save('Addition.pdf')
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
            var toExcel = document.getElementById("pdfSectionAddition").innerHTML;
          
            var ctx = {
              worksheet: name || '',
              table :toExcel,
            };
            
            var link = document.createElement("a");
            link.download = "Addition.xls";
            link.href = uri + base64(format(template, ctx))
            link.click();
          });
      });

      //Addition End

      //Overtime
      $(document).ready(function(){
        $(".get-pdf1").click(function () {
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
          var elemA = document.getElementById("pdfSectionOvertime");
          var resA = doc.autoTableHtmlToJson(elemA);  
          doc.autoTable(resA.columns, resA.data, {
                addPageContent: function(data) {
                  doc.setFontSize(14);
                  doc.text("Overtime", 350, 112);
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
        
            doc.save('Overtime.pdf')
        });
    });

    $(document).ready(function(){  
      $('.exceller1').click(function () {
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
          var toExcel = document.getElementById("pdfSectionOvertime").innerHTML;
        
          var ctx = {
            worksheet: name || '',
            table :toExcel,
          };
          
          var link = document.createElement("a");
          link.download = "Overtime.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });

    //Overtime End

    //Overtime
    $(document).ready(function(){
      $(".get-pdf2").click(function () {
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
        var elemA = document.getElementById("pdfSectionDeduction");
        var resA = doc.autoTableHtmlToJson(elemA);  
        doc.autoTable(resA.columns, resA.data, {
              addPageContent: function(data) {
                doc.setFontSize(14);
                doc.text("Deduction", 350, 112);
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
      
          doc.save('Deduction.pdf')
      });
  });

  $(document).ready(function(){  
    $('.exceller2').click(function () {
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
        var toExcel = document.getElementById("pdfSectionDeduction").innerHTML;
      
        var ctx = {
          worksheet: name || '',
          table :toExcel,
        };
        
        var link = document.createElement("a");
        link.download = "Deduction.xls";
        link.href = uri + base64(format(template, ctx))
        link.click();
      });
  });

  //Deduction End


    //get add payroll
    this.getAddPayroll();

    //get over payroll
    this.getOverpayroll();

    //get deduct payroll
    this.getDeductPayroll();

    // Add payroll Form Validation And Getting Values

    this.addPayrollForm = this.formBuilder.group({
      addPayrollName: ["", [Validators.required]],
      addPayrollCategory: ["", [Validators.required]],
      addPayrollUnit: ["", [Validators.required]],
    });

    // Edit payroll Form Validation And Getting Values

    this.editPayrollForm = this.formBuilder.group({
      editPayrollName: ["", [Validators.required]],
      editPayrollCategory: ["", [Validators.required]],
      editPayrollUnit: ["", [Validators.required]],
    });

    // Add overTime Form Validation And Getting Values

    this.addOverForm = this.formBuilder.group({
      addOverName: ["", [Validators.required]],
      addOverRate: ["", [Validators.required]],
    });

    // Edit overtime Form Validation And Getting Values

    this.editOverForm = this.formBuilder.group({
      editOverName: ["", [Validators.required]],
      editOverRate: ["", [Validators.required]],
    });

    // Add deduction Form Validation And Getting Values

    this.addDeductForm = this.formBuilder.group({
      addDeductName: ["", [Validators.required]],
      addDeductUnit: ["", [Validators.required]],
    });

    // Edit deduction Form Validation And Getting Values

    this.editDeductForm = this.formBuilder.group({
      editDeductName: ["", [Validators.required]],
      editDeductunit: ["", [Validators.required]],
    });

    // //data table configuration
    // this.dtOptions = {
    //   // ... skipped ...
    //   dom: "lrtip",
    // };



    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true,
    };
  }

  // get payroll
  getAddPayroll() {
    this.allModuleService.get(this.urlAdd).subscribe((data) => {
      this.allAddPayroll = data;
      $("#datatable1").DataTable().clear();
    });
  }

  // get overtime
  getOverpayroll() {
    this.allModuleService.get(this.urlOver).subscribe((data) => {
      this.allOverPayroll = data;
      $("#datatable2").DataTable().clear();
    });
  }

  // get deducts
  getDeductPayroll() {
    this.allModuleService.get(this.urlDeduct).subscribe((data) => {
      this.allDeductPayroll = data;
      $("#datatable3").DataTable().clear();
    });
  }

  // Add payroll Modal Api Call

  addPayroll() {
    if (this.addPayrollForm.valid) {
      let obj = {
        name: this.addPayrollForm.value.addPayrollName,
        category: this.addPayrollForm.value.addPayrollCategory,
        unitCost: this.addPayrollForm.value.addPayrollUnit,
      };
      this.allModuleService.add(obj, this.urlAdd).subscribe((data) => {});
      this.getAddPayroll();
      $("#add_addition").modal("hide");
      this.addPayrollForm.reset();
      this.toastr.success("Payroll added", "Success");
    }
  }

  // Edit payroll Modal Api Call

  editPayroll() {
    let obj = {
      name: this.editPayrollForm.value.editPayrollName,
      category: this.editPayrollForm.value.editPayrollCategory,
      unitCost: this.editPayrollForm.value.editPayrollUnit,
      id: this.editAddId,
    };
    this.allModuleService.update(obj, this.urlAdd).subscribe((data1) => {});
    this.getAddPayroll();
    $("#edit_addition").modal("hide");
    this.toastr.success("Payroll edited", "Success");
  }

  editAdd(value) {
    this.editAddId = value;
    const index = this.allAddPayroll.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allAddPayroll[index];
    this.editPayrollForm.setValue({
      editPayrollName: toSetValues.name,
      editPayrollCategory: toSetValues.category,
      editPayrollUnit: toSetValues.unitCost,
    });
  }

  // Delete payroll Modal Api Call

  deletePayroll() {
    this.allModuleService
      .delete(this.tempAddId, this.urlAdd)
      .subscribe((data) => {
        this.getAddPayroll();
        $("#delete_addition").modal("hide");
      });
    this.toastr.success("Payroll deleted", "Success");
  }

  // Add overtime Modal Api Call

  addOver() {
    if (this.addOverForm.valid) {
      let obj = {
        name: this.addOverForm.value.addOverName,
        rate: this.addOverForm.value.addOverRate,
      };
      this.allModuleService.add(obj, this.urlOver).subscribe((data) => {});
      this.getOverpayroll();
      $("#add_overtime").modal("hide");
      this.addOverForm.reset();
      this.toastr.success("Overtime added", "Success");
    }
  }

  // Edit overtime Modal Api Call

  editOverSubmit() {
    let obj = {
      name: this.editOverForm.value.editOverName,
      rate: this.editOverForm.value.editOverRate,
      id: this.editOverId,
    };
    this.allModuleService.update(obj, this.urlOver).subscribe((data1) => {});
    this.getOverpayroll();
    $("#edit_overtime").modal("hide");
    this.toastr.success("Overtime edited", "Success");
  }

  editOver(value) {
    this.editOverId = value;
    const index = this.allOverPayroll.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allOverPayroll[index];
    this.editOverForm.setValue({
      editOverName: toSetValues.name,
      editOverRate: toSetValues.rate,
    });
  }

  // Delete overtime Modal Api Call

  deleteOver() {
    this.allModuleService
      .delete(this.tempOverId, this.urlOver)
      .subscribe((data) => {
        this.getOverpayroll();
        $("#delete_overtime").modal("hide");
      });
    this.toastr.success("Overtime deleted", "Success");
  }

  // Add deduction Modal Api Call

  addDeducts() {
    if (this.addDeductForm.valid) {
      let obj = {
        name: this.addDeductForm.value.addDeductName,
        unitCost: this.addDeductForm.value.addDeductUnit,
      };
      this.allModuleService.add(obj, this.urlDeduct).subscribe((data) => {});
      this.getDeductPayroll();
      $("#add_deduction").modal("hide");
      this.addDeductForm.reset();
      this.toastr.success("Deduction added", "Success");
    }
  }

  // Edit deduction Modal Api Call

  editDeductSubmit() {
    let obj = {
      name: this.editDeductForm.value.editDeductName,
      unitCost: this.editDeductForm.value.editDeductunit,
      id: this.editDeductId,
    };
    this.allModuleService.update(obj, this.urlDeduct).subscribe((data1) => {});
    this.getDeductPayroll();
    $("#edit_deduction").modal("hide");
    this.toastr.success("Deducts edited", "Success");
  }
  editDeduct(value) {
    this.editDeductId = value;
    const index = this.allDeductPayroll.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allDeductPayroll[index];
    this.editDeductForm.setValue({
      editDeductName: toSetValues.name,
      editDeductunit: toSetValues.unitCost,
    });
  }

  // Delete deduction Modal Api Call

  deleteDeduct() {
    this.allModuleService
      .delete(this.tempDeductId, this.urlDeduct)
      .subscribe((data) => {
        this.getDeductPayroll();
        $("#delete_deduction").modal("hide");
      });
    this.toastr.success("Deduction deleted", "Success");
  }
}
