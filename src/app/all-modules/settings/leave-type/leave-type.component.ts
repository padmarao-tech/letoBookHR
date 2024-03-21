import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DataServiceService } from "../../../service/data-service.service";
 import { map } from "jquery";
declare const $: any;
@Component({
  // selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
})
export class LeaveTypeComponent implements  OnInit, OnDestroy {

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "leaveType";
  public allLeaveType: any = [];
  public addLeaveType: FormGroup;
  public editLeaveType: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public pipe = new DatePipe("en-US");
  constructor(
    //private allModuleService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private data: DataServiceService
  ) {}

  ngOnInit() {
    
    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    // Add Provident Form Validation And Getting Values

    this.addLeaveType = this.formBuilder.group({
      addLeaveType: ["", [Validators.required]],
      addLeaveName: ["", [Validators.required]],
      addLeaveAllocateHrs: ["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editLeaveType = this.formBuilder.group({
      editLeavecode: ["", [Validators.required]],
      editDescription: ["", [Validators.required]],
      editAllocateHrs: ["", [Validators.required]],
    });
    
    this.loadleavetype()

  }



 // getLeaveType() {
   // this.data.runQuery('SELECT  UID,HolidayType,HolidayName,HolidayDate,notes FROM holidaysetting;').subscribe((data) => {
     // this.allLeaveType = data;

      //this.dtTrigger.next();
    //});
  //}

  loadleavetype() {
    this.data.runQuery('SELECT * FROM leavetype;').subscribe((data) => {
         this.allLeaveType = data.map(item=>{return {
          uid:item.uid,
          leaveType:item.Code,
          leaveName:item.Name,
          AllocateHour:item.Allocate_hours
            }});
     console.log(this.allLeaveType)
            this.dtTrigger.next();
       this.srch = [...this.rows];
    });
  }

  // Add Provident Modal Api Call

  addLeave() {
   //verify form validation
    if (this.addLeaveType.valid) {
           
      let obj = {
        LeaveType: this.addLeaveType.value.addLeaveType,
        LeaveName: this.addLeaveType.value.addLeaveName,
        LeaveAllocateHrs: this.addLeaveType.value.addLeaveAllocateHrs,
      //  HolidayNotes: this.addLeaveType.value.Notes,
        uid: 0,
      };
         //SELECT Uid,company_uid,Code,Name,Allocate_hours FROM leavetype where company_uid=1
      const sql = "insert into leavetype (company_uid,Code,Name,Allocate_hours) values ('1','" +
      obj.LeaveType + "','" +
      obj.LeaveName + "','" + obj.LeaveAllocateHrs +  "')"
      console.log(sql)
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.loadleavetype();
        $("#add_leavetype").modal("hide");
        this.addLeaveType.reset(); //forms
        this.toastr.success("Leave settings added sucessfully...!", "Success");
      });
    }
  }
  
  editLeave() {
    if (this.editLeaveType.valid) {
      let obj = {
        uid: this.editId,
        editLeavecode: this.editLeaveType.value.editLeavecode, // added sulaiman
        editDescription: this.editLeaveType.value.editDescription,
        editAllocateHrs: this.editLeaveType.value.editAllocateHrs,
      };
        //leavetype (company_uid,Code,Name,Allocate_hours
      const sql = "Update leavetype set Code='" + obj.editLeavecode
                  + "',Name ='" + obj.editDescription + "',Allocate_hours ='"+ obj.editAllocateHrs
                  + "' where uid =" + this.editId
     // console.log(sql)
       this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.loadleavetype();
        $("#edit_leavetype").modal("hide");
        this.toastr.success("Holiday is Updated sucessfully...!", "Success");
      });
    }
  }
  edit(value) {
    this.editId = value;
    //console.log('UId is ', this.editId)
    const index = this.allLeaveType.findIndex((item) => {
      return item.uid === value;
    });
    let toSetValues = this.allLeaveType[index];
    //console.log('Ayyappan')
    // console.log(toSetValues);
      this.editLeaveType.setValue({
        editLeavecode: toSetValues.leaveType,
        editDescription: toSetValues.leaveName,
        editAllocateHrs: toSetValues.AllocateHour,
     // editHolidlayNote: toSetValues.HolidayNotes,
     
    });
  }

 // Delete holidays Modal Api Call

 deleteLeave() {
  const sql = "Delete from leavetype  where uid =" + this.tempId
 this.data.runQuery(sql)
 .subscribe((data) => {
   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
     dtInstance.destroy();
   });
   this.loadleavetype();
   $("#delete_leavetype").modal("hide");
   this.toastr.success("Deleted sucessfully..!", "Success");
 });
  }

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
  
  }


