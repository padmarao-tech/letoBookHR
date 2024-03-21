import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
//import { AllModulesService } from "../../all-modules.service";
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
  url: any = "leaveType";
  public allLeaveType: any=[];
  public addLeaveType: FormGroup;
  public editLeaveType: FormGroup;
  public editId: any;
  public tempId: any;
  public rows = [];
  public srch = [];
  public pipe = new DatePipe("en-US");
  
  constructor(
    //private allModuleService: AllModulesService,
    private data: DataServiceService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    
  ) {}

  ngOnInit(): void {
    
    // for data table configuration
    // this.dtOptions = {
    //   pageLength: 10,
    //   dom: "lrtip",
    // };

    // Add Provident Form Validation And Getting Values
    this.loadleavetype()

    this.addLeaveType = this.formBuilder.group({
      addLeaveType:["", [Validators.required]],
      addLeaveName:["", [Validators.required]],
      addLeaveAllocateHrs:["", [Validators.required]],
    });

    // Edit Provident Form Validation And Getting Values

    this.editLeaveType = this.formBuilder.group({
      editLeavecode:["", [Validators.required]],
      editDescription:["", [Validators.required]],
      editAllocateHrs:["", [Validators.required]],
    });
  }



 // getLeaveType() {
   // this.data.runQuery('SELECT  UID,HolidayType,HolidayName,HolidayDate,notes FROM holidaysetting;').subscribe((data) => {
     // this.allLeaveType = data;

      //this.dtTrigger.next();
    //});
  //}

  loadleavetype() {
    this.data.runQuery('SELECT Uid,company_uid,Code,Name,Allocate_hours FROM leavetype where company_uid+1;').subscribe((data) => {   //where company_uid=1
         this.allLeaveType = data.map(item=>{return {
          uid:item.Uid,
          company_uid:item.company_uid,
          LeaveType:item.Code,
          LeaveName:item.Name,
          LeaveAllocateHrs:item.Allocate_hours,
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
        LeaveType:this.addLeaveType.value.addLeaveType,
        LeaveName:this.addLeaveType.value.addLeaveName,
        LeaveAllocateHrs:this.addLeaveType.value.addLeaveAllocateHrs,
        //  HolidayNotes: this.addLeaveType.value.Notes,
        uid:0,
      };
      console.log(obj);
      //SELECT Uid,company_uid,Code,Name,Allocate_hours FROM leavetype where company_uid=1
      const sql ="insert into leavetype (company_uid,Code,Name,Allocate_hours where company_uid=1;) values ('1','" 
      + obj.LeaveType + "','" + obj.LeaveName + "','" + obj.LeaveAllocateHrs + "')"
      console.log(sql)
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.loadleavetype();
        $("#add_leavetype").modal("hide");
        this.allLeaveType.reset();
        //this.addLeaveType.reset();
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
      const sql = "Update leavetype set Code ='" + obj.editLeavecode
      + "',Name ='" + obj.editDescription + "',Allocate_hours ='"+ obj.editAllocateHrs + "' where uid =" + this.editId
     // console.log(sql)
       this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.loadleavetype();
        $("#edit_leavetype").modal("hide");
        this.toastr.success("LeaveType is Updated sucessfully...!", "Success");
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
        editLeavecode: toSetValues.LeaveType,
        editDescription: toSetValues.LeaveName,
        editAllocateHrs: toSetValues.LeaveAllocateHrs,
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


