import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
// sulaiman start
import { DataServiceService } from "../../../service/data-service.service";
 import { map } from "jquery";

declare const $: any;
@Component({
  // selector: "app-holidays",
  templateUrl: "./holidays.component.html",
})
export class HolidaysComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  lstHolidays: any[];
  url: any = "holidays";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addHolidayForm: FormGroup;
  public editHolidayForm: FormGroup;
  public editHolidayDate: any;
  constructor(
    private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private data: DataServiceService
  ) {}

  ngOnInit() {
    this.loadholidays();

    this.addHolidayForm = this.formBuilder.group({
      HolidayCode: ["", [Validators.required]],
      HolidayName: ["", [Validators.required]],
      Holidaydate: ["", [Validators.required]],
      Notes: ["", [Validators.required]],
    });

    // Edit Contact Form Validation And Getting Values

    this.editHolidayForm = this.formBuilder.group({
      editHolidayCode: ["", [Validators.required]],
      editHolidayName: ["", [Validators.required]],
      editHolidayDate: ["", [Validators.required]],
   //   editNotes: ["", [Validators.required]],
    });
  }

  // Get Employee  Api Call
  loadholidays() {
   
    this.data.runQuery('SELECT  UID,HolidayType,HolidayName,HolidayDate,notes FROM holidaysetting;').subscribe((data) => {
         this.lstHolidays = data.map(item=>{return {
          uid:item.UID,
          HolidayType:item.HolidayType,
          HolidayName:item.HolidayName,
          HolidayDate:item.HolidayDate,
          HolidayNotes:item.notes
      }});
       this.dtTrigger.next();
      this.rows = this.lstHolidays;
      this.srch = [...this.rows];
    });
  }

  // Add holidays Modal Api Call
  
  addholidays() {
    if (this.addHolidayForm.valid) {
      let holiday = this.pipe.transform(
        this.addHolidayForm.value.Holidaydate,
        "yyyy-MM-dd"
      );
      
      let obj = {
        HolidayCode: this.addHolidayForm.value.HolidayCode,
        HolidayName: this.addHolidayForm.value.HolidayName,
        HolidayDate: this.addHolidayForm.value.HolidayDate,
        HolidayNotes: this.addHolidayForm.value.Notes,
        id: 0,
      };
         //SELECT  uid,HolidayType,HolidayName,HolidayDate,notes FROM holidaysetting;
      const sql = "insert into holidaysetting (company_uid,HolidayType,HolidayName,HolidayDate,notes) values ('1','" +
      obj.HolidayCode + "','" +
      obj.HolidayName + "','" + holiday + "','" + obj.HolidayNotes  + "')"
     // console.log(sql)
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.loadholidays();
        $("#add_holiday").modal("hide");
        this.addHolidayForm.reset();
        this.toastr.success("Holiday settingns added sucessfully...!", "Success");
      });
    }
  }
    

  from(data) {
  this.editHolidayDate = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit holidays Modal Api Call

  editHolidays() {

    if (this.editHolidayForm.valid) {
      let holiday = this.pipe.transform(
        this.editHolidayForm.value.editHolidayDate,
        "yyyy-MM-dd"
      );
     
      let obj = {
        HolidayCode: this.editHolidayForm.value.editHolidayCode, // added sulaiman
        HolidayName: this.editHolidayForm.value.editHolidayName,
        HolidayDate: holiday,
        id: this.editId,
      };
        
      const sql = "Update holidaysetting set HolidayType='" + obj.HolidayCode
                  + "',HolidayName ='" + obj.HolidayName + "',HolidayDate ='"+ holiday
                  + "' where uid =" + this.editId
      console.log(sql)
       this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.loadholidays();
        $("#edit_holiday").modal("hide");
        this.toastr.success("Holiday is Updated sucessfully...!", "Success");
      });
       }
  }

  // Delete holidays Modal Api Call

  deleteHolidays() {
 
    const sql = "Delete from holidaysetting  where uid =" + this.tempId
    this.data.runQuery(sql)
    .subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.loadholidays();
      $("#delete_holiday").modal("hide");
      this.toastr.success("Deleted sucessfully..!", "Success");
    });
     }
  
  // To Get The holidays Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
    const index = this.lstHolidays.findIndex((item) => {
      return item.uid === value;
    });
    let toSetValues = this.lstHolidays[index];
    console.log('Ayyappan')
     console.log(toSetValues);
     let holiday = this.pipe.transform(
      toSetValues.HolidayDate,   "dd-MM-yyyy"  );
      console.log('Formatted Date', holiday);

     this.editHolidayForm.setValue({
      editHolidayCode: toSetValues.HolidayType,
      editHolidayName: toSetValues.HolidayName,
      editHolidayDate: holiday,
     // editHolidlayNote: toSetValues.HolidayNotes,
     
    });
        
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
