import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
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

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: "app-assets-main",
  templateUrl: "./assets.component.html",
})
export class AssetsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public url: any = "assets";
  public allAssets: any = [];
  public addAssets: FormGroup;
  public editAssets: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public editPurchaseDateFormat;
  public editPurchaseToDateFormat;
  constructor(
    private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
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
                  doc.text("Assets", 350, 112);
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
        
            doc.save('Assets.pdf')
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
          link.download = "Assets.xls";
          link.href = uri + base64(format(template, ctx))
          link.click();
        });
    });
    // for floating label

    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");

    // get assets data from API

    this.getAssets();

    // Add Assets Form Validation And Getting Values

    this.addAssets = this.formBuilder.group({
      assetName: ["", [Validators.required]],
      assetId: ["", [Validators.required]],
      purchaseDate: ["", [Validators.required]],
      purchaseTo: ["", [Validators.required]],
      warranty: ["", [Validators.required]],
      value: ["", [Validators.required]],
      assetUser: ["", [Validators.required]],
      assetStatus: ["", [Validators.required]],
    });

    // Edit Assets Form Validation And Getting Values

    this.editAssets = this.formBuilder.group({
      editAssetsName: ["", [Validators.required]],
      editPurchaseDate: ["", [Validators.required]],
      editPurchaseTo: ["", [Validators.required]],
      editWarranty: ["", [Validators.required]],
      editvalue: ["", [Validators.required]],
      editAssetUser: ["", [Validators.required]],
      editAssetId: ["", [Validators.required]],
      editAssetStatus: ["", [Validators.required]],
    });

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
  }

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
    this.allAssets = [];
    this.getAssets();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  //get data for data table
  getAssets() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allAssets = data;
      this.rows = this.allAssets;
      this.srch = [...this.rows];
    });
  }

  // Add Assets Modal Api Call
  addAssetsSubmit() {
    if (this.addAssets.valid) {
      let purchaseDateFormat = this.pipe.transform(
        this.addAssets.value.purchaseDate,
        "dd-MM-yyyy"
      );
      let purchaseToDateFormat = this.pipe.transform(
        this.addAssets.value.purchaseTo,
        "dd-MM-yyyy"
      );
      let obj = {
        assetName: this.addAssets.value.assetName,
        assetId: this.addAssets.value.assetId,
        purchaseDate: purchaseDateFormat,
        warrenty: this.addAssets.value.warranty,
        Amount: this.addAssets.value.value,
        assetUser: this.addAssets.value.assetUser,
        warrentyEnd: purchaseToDateFormat,
        assetStatus: this.addAssets.value.assetStatus,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getAssets();
      $("#add_asset").modal("hide");
      this.addAssets.reset();
      this.toastr.success("Assets is added", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // to know the date picker changes

  from(data) {
    this.editPurchaseDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }
  to(data) {
    this.editPurchaseToDateFormat = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit Assets Modal Api Call
  editAssetSubmit() {
    if (this.editAssets.valid) {
      let obj = {
        assetName: this.editAssets.value.editAssetsName,
        assetId: this.editAssets.value.editAssetId,
        purchaseDate: this.editPurchaseDateFormat,
        warrenty: this.editAssets.value.editWarranty,
        Amount: this.editAssets.value.editvalue,
        assetUser: this.editAssets.value.editAssetUser,
        warrentyEnd: this.editPurchaseToDateFormat,
        assetStatus: this.editAssets.value.editAssetStatus,
        id: this.editId,
      };
      this.allModuleService.update(obj, this.url).subscribe((data1) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.getAssets();
      $("#edit_asset").modal("hide");
      this.toastr.success("Assets is edited", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // for set values to editassets form
  edit(value) {
    this.editId = value;
    const index = this.allAssets.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allAssets[index];
    this.editAssets.setValue({
      editAssetsName: toSetValues.assetName,
      editPurchaseDate: toSetValues.purchaseDate,
      editPurchaseTo: toSetValues.warrentyEnd,
      editWarranty: toSetValues.warrenty,
      editvalue: toSetValues.Amount,
      editAssetUser: toSetValues.assetUser,
      editAssetId: toSetValues.assetId,
      editAssetStatus: toSetValues.assetStatus,
    });
  }

  // Delete Assets Modal Api Call
  deleteAssets() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getAssets();
    $("#delete_asset").modal("hide");
    this.toastr.success("Assets is deleted", "Success");
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.assetUser.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by status
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.assetStatus.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase

  searchByPurchase(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.purchaseDate.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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

  //search by warranty
  searchByWarranty(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.warrentyEnd.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
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

  //for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
