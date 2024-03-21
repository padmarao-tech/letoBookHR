import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AllModulesService } from "../../all-modules.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: "app-performance-indicator",
  templateUrl: "./performance-indicator.component.html",
})
export class PerformanceIndicatorComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  lstData: any[];
  url: any = "performanceindicator";

  public tempId: any;
  public editId: any;

  public addIndicatorForm: FormGroup;
  public editIndicatorForm: FormGroup;
  public pipe = new DatePipe("en-US");
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}

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
                  doc.text("Performance Indicator", 350, 112);
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
        
            doc.save('Performance Indicator.pdf')
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
          link.download = "Performance Indicator.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });
    this.loadData();
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.addIndicatorForm = this.formBuilder.group({
      designationName: ["", [Validators.required]],
      experienceName: ["", [Validators.required]],
      marketingName: ["", [Validators.required]],
      AdministrationName: ["", [Validators.required]],
      presentationName: ["", [Validators.required]],

      QualityName: ["", [Validators.required]],
      effientcyName: ["", [Validators.required]],
      integrityName: ["", [Validators.required]],

      professionalismName: ["", [Validators.required]],
      teamWork: ["", [Validators.required]],
      criticalName: ["", [Validators.required]],

      ManagementName: ["", [Validators.required]],
      AttendanceName: ["", [Validators.required]],
      deadLineName: ["", [Validators.required]],
      statusName: ["", [Validators.required]],
    });

    this.editIndicatorForm = this.formBuilder.group({
      designationName: ["", [Validators.required]],
      experienceName: ["", [Validators.required]],
      marketingName: ["", [Validators.required]],
      AdministrationName: ["", [Validators.required]],
      presentationName: ["", [Validators.required]],

      QualityName: ["", [Validators.required]],
      effientcyName: ["", [Validators.required]],
      integrityName: ["", [Validators.required]],

      professionalismName: ["", [Validators.required]],
      teamWork: ["", [Validators.required]],
      criticalName: ["", [Validators.required]],

      ManagementName: ["", [Validators.required]],
      AttendanceName: ["", [Validators.required]],
      deadLineName: ["", [Validators.required]],
      statusName: ["", [Validators.required]],
    });

    // $(document).ready(function(){
    //     $(".tech-show").show();
    //     $(".techClass").click(function() {
    //         $(".tech-show").show();
    //         $(".tech-show").addClass("col-md-12");
    //         $(".org-show").hide();
    //     }); 
    //     $(".orgClass").click(function() {
           
    //         $(".org-show").addClass("col-md-12");
    //         $(".org-show").show();
    //         $(".tech-show").hide();
    //     });
    // });
  }

  // Get  trainer Api Call
  loadData() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstData = data;
      this.dtTrigger.next();
      this.rows = this.lstData;
      this.srch = [...this.rows];
    });
  }

  // Add  goal type  Modal Api Call
  addIndicator() {
    if (this.addIndicatorForm.valid) {
      let obj = {
        designation: this.addIndicatorForm.value.designationName,
        department: "Web Development",
        experience: this.addIndicatorForm.value.experienceName,
        Marketing: this.addIndicatorForm.value.marketingName,
        adminstartion: this.addIndicatorForm.value.AdministrationName,
        presentationskil: this.addIndicatorForm.value.presentationName,

        qualityofwork: this.addIndicatorForm.value.QualityName,
        effientcy: this.addIndicatorForm.value.effientcyName,
        integrirty: this.addIndicatorForm.value.integrityName,

        professionalism: this.addIndicatorForm.value.professionalismName,
        teamwork: this.addIndicatorForm.value.teamWork,
        criticalthinking: this.addIndicatorForm.value.criticalName,

        conflictmanagement: this.addIndicatorForm.value.ManagementName,
        attendance: this.addIndicatorForm.value.AttendanceName,
        meetdeadline: this.addIndicatorForm.value.deadLineName,
        addedBy: "Mike Litorus",
        createdBy: "28 Feb 2019",
        status: this.addIndicatorForm.value.statusName,
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadData();
      $("#add_indicator").modal("hide");
      this.addIndicatorForm.reset();
      this.toastr.success("Indicator added sucessfully...!", "Success");
    }
  }

  editIndicator() {
    if (this.editIndicatorForm.valid) {
      let obj = {
        designation: this.editIndicatorForm.value.designationName,
        department: "Web Development",
        experience: this.editIndicatorForm.value.experienceName,
        Marketing: this.editIndicatorForm.value.marketingName,
        adminstartion: this.editIndicatorForm.value.AdministrationName,
        presentationskil: this.editIndicatorForm.value.presentationName,

        qualityofwork: this.editIndicatorForm.value.QualityName,
        effientcy: this.editIndicatorForm.value.effientcyName,
        integrirty: this.editIndicatorForm.value.integrityName,

        professionalism: this.editIndicatorForm.value.professionalismName,
        teamwork: this.editIndicatorForm.value.teamWork,
        criticalthinking: this.editIndicatorForm.value.criticalName,

        conflictmanagement: this.editIndicatorForm.value.ManagementName,
        attendance: this.editIndicatorForm.value.AttendanceName,
        meetdeadline: this.editIndicatorForm.value.deadLineName,
        addedBy: "Mike Litorus",
        createdBy: "28 Feb 2019",
        status: this.editIndicatorForm.value.statusName,
        id: this.editId,
      };
      this.srvModuleService.update(obj, this.url).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadData();
      $("#edit_indicator").modal("hide");
      this.toastr.success("Indicator Updated sucessfully...!", "Success");
    }
  }

  // To Get The indicator type Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    const index = this.lstData.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstData[index];
    this.editIndicatorForm.setValue({
      designationName: toSetValues.designation,
      experienceName: toSetValues.experience,
      marketingName: toSetValues.Marketing,
      AdministrationName: toSetValues.adminstartion,
      presentationName: toSetValues.presentationskil,
      QualityName: toSetValues.qualityofwork,
      effientcyName: toSetValues.effientcy,
      integrityName: toSetValues.integrirty,
      professionalismName: toSetValues.professionalism,
      teamWork: toSetValues.teamwork,
      criticalName: toSetValues.criticalthinking,
      ManagementName: toSetValues.conflictmanagement,
      AttendanceName: toSetValues.attendance,
      deadLineName: toSetValues.meetdeadline,
      statusName: toSetValues.status,
    });
  }

  deleteIndicator() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.loadData();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      $("#delete_indicator").modal("hide");
      this.toastr.success("Indicator  deleted sucessfully..!", "Success");
    });
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
