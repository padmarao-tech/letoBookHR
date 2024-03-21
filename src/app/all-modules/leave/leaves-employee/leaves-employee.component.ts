import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
// import { AllModulesService } from "../../all-modules.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DataServiceService } from "../../../service/data-service.service";
 import { map } from "jquery";
// import { debug } from "console";
declare const $: any;

@Component({
  // selector: "app-leaves-employee",
  templateUrl: "./leaves-employee.component.html",
})
export class LeavesEmployeeComponent implements OnInit, OnDestroy {
  lstLeave: any[];
  emplist : any = [];
  LeaveTypeList : any = [];
  public url: any = "employeeleaves";
  public tempId: any;
  public editId: any;

  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public rows = [];
  public srch = [];
  public getrecordforedit = [];
  public selectedRecord : {};
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public addLeaveadminForm: FormGroup;
  public editLeaveadminForm: FormGroup;
  public editFromDate: any;
  public editToDate: any;
  public noofdays: any;
  constructor(
    private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private data: DataServiceService
  ) {}

  ngOnInit() {
    this.noofdays=0;
    this.addLeaveadminForm = this.formBuilder.group({
       aEmpmaster_uid: ["", [Validators.required]],
       aLeavetype_uid: ["", [Validators.required]],
       aLeave_from: ["", [Validators.required]],
       aLeave_upto: ["", [Validators.required]],
       anoofdays : ["", [Validators.required]]
     });

    // Edit leaveadmin Form Validation And Getting Values

    this.editLeaveadminForm = this.formBuilder.group({
         eEmpmaster_uid: ["", [Validators.required]],
         eLeavetype_uid: ["", [Validators.required]],
         eLeave_from: ["", [Validators.required]],
         eLeave_upto: ["", [Validators.required]],
         eNoOfDays : ["", [Validators.required]],
         enotes : ["", [Validators.required]]
    });
    //let currentDate: Date = new Date();
    //this.addLeaveadminForm.value.aLeave_upto=currentDate
    //this.addLeaveadminForm.value.aLeave_from=currentDate


    // for data table configuration
    this.dtOptions = {
      pageLength: 10,
      dom: "lrtip",
    };
  
    this.loadLeaves()
    this.leaveCodedropdown()
    this.empdropdowncombo()

  }

  // Get leave  Api Call
  loadLeaves() {
   let sql =""
   sql= " SELECT l.Uid,l.Company_uid,l.Empmaster_uid,e.firstname employeename," +
   "Entry_date,Leave_from,Leave_upto,l.Leavetype_uid," +
   "NAME LeaveName,l.Nofdays FROM leaverequest l " +
   " INNER JOIN empmaster e "+
   " ON l.Empmaster_uid=e.uid AND l.company_uid=e.company_uid"+
   " INNER JOIN leavetype lt  ON  l.Leavetype_uid=lt.uid "+
   " AND l.company_uid=lt.company_uid where l.company_uid='1'"
console.log(sql)
   this.data.runQuery(sql).subscribe((data) => {
      this.lstLeave = data.map(item=>{return {
        uid:item.Uid,
        Empmaster_uid:item.Empmaster_uid,
        employeename:item.employeename,
        Leavetype_uid:item.Leavetype_uid,
        LeaveName:item.LeaveName,
        Entry_date:item.Entry_date,
        Leave_from:item.Leave_from,
        Leave_upto:item.Leave_upto,
        Nofdays:item.Nofdays
   }});
   console.log('load');
   console.log(this.lstLeave);
    this.dtTrigger.next();
    this.rows = this.lstLeave;
    this.srch = [...this.rows];
 });
}

//emplist employee dropdown

empdropdowncombo() {
  this.data.runQuery('SELECT uid,firstname Name FROM empmaster where company_uid=1;').subscribe((data) => { 
    console.log(data)
    this.emplist = data
    console.log(this.emplist)
    });
  }

    leaveCodedropdown() {
      this.data.runQuery('SELECT uid,Name FROM leavetype where company_uid=1;').subscribe((data) => {
        console.log(data)
        this.LeaveTypeList = data
    });
  }
// LeaveTypeList  leave type dropdown


// Add leaves for admin Modal Api Call
  addleaves() 
  {
  

  //  console.log( this.addLeaveadminForm.value.aLeave_from);
  //  console.log( this.addLeaveadminForm.value.aLeave_upto);
   // console.log( this.addLeaveadminForm.value.aEmpmaster_uid);
   // console.log( this.addLeaveadminForm.value.aLeavetype_uid);
   

   // if (this.addLeaveadminForm.valid) {
      
        let fromDate = this.pipe.transform(
        this.addLeaveadminForm.value.aLeave_from,
        "yyyy-MM-dd"
      );
      let toDate = this.pipe.transform(
        this.addLeaveadminForm.value.aLeave_upto,
        "yyyy-MM-dd"
      );
   
      let currentDate: Date = new Date();
      var date1 : any = new Date(this.addLeaveadminForm.value.aLeave_from);
      var  date2 : any  = new Date(this.addLeaveadminForm.value.aLeave_upto);
      var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
      let obj = {
        aEmpmaster_uid: this.addLeaveadminForm.value.aEmpmaster_uid,
        aLeavetype_uid: this.addLeaveadminForm.value.aLeavetype_uid,
        aLeave_from: fromDate,
        aLeave_upto: toDate,
        status: "Approved",
        noofdays : diffDays+1,
        aentrydate: this.pipe.transform(currentDate, 'yyyy-MM-dd')
      };
 
var sql="";
sql="insert into leaverequest(Company_uid,Empmaster_uid,LeaveType_uid,"
+"Entry_date,Leave_from,Leave_upto,Nofdays,Approved_uid) values('1','" 
+ obj.aEmpmaster_uid  + "','" +  obj.aLeavetype_uid +"','"  + obj.aentrydate + "','" + obj.aLeave_from + "','"
+obj.aLeave_upto + "','" + obj.noofdays + "','0')"
console.log(sql);
console.log(obj);
console.log(this.lstLeave)
this.data.runQuery(sql)
.subscribe((data) => {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
    });
        this.loadLeaves();
        // console.log(sql);
        $("#add_leave").modal("hide");
        this.addLeaveadminForm.reset();
        this.toastr.success("Leaves added sucessfully...!", "Success");
    }
  )

 //   else {
  //    this.toastr.warning("Mandatory fields required", "");
//    }

}

//find no of days
findnoofdays()
{
  let currentDate: Date = new Date();
  var date1 : any = new Date(this.addLeaveadminForm.value.aLeave_from);
  var  date2 : any  = new Date(this.addLeaveadminForm.value.aLeave_upto);
  var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

 addfromdt()
 {
  let currentDate: Date = new Date();
  var date1 : any = new Date(this.addLeaveadminForm.value.aLeave_from);
  var  date2 : any  = new Date(this.addLeaveadminForm.value.aLeave_upto);
  var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
  this.noofdays=diffDays; 
  console.log(this.noofdays)
}

 addtodt()
 {
  let currentDate: Date = new Date();
  var date1 : any = new Date(this.addLeaveadminForm.value.aLeave_from);
  var  date2 : any  = new Date(this.addLeaveadminForm.value.aLeave_upto);
  var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
  this.noofdays=diffDays;
  console.log(this.noofdays)
 }

  from(data) {
    this.editFromDate = this.pipe.transform(data, "dd-MM-yyyy");
    let currentDate: Date = new Date();
    var date1 : any = new Date(this.addLeaveadminForm.value.aLeave_from);
    var  date2 : any  = new Date(this.addLeaveadminForm.value.aLeave_upto);
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
    this.noofdays=diffDays; 
    console.log(this.noofdays)
  }
  to(data) {
    this.editToDate = this.pipe.transform(data, "dd-MM-yyyy");
    let currentDate: Date = new Date();
    var date1 : any = new Date(this.addLeaveadminForm.value.aLeave_from);
    var  date2 : any  = new Date(this.addLeaveadminForm.value.aLeave_upto);
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
    this.noofdays=diffDays; 
    console.log(this.noofdays)
  }

  // Edit leaves Modal Api Call
  editLeaves() {
    if (this.editLeaveadminForm.valid) {

      
     let FromDate= this.pipe.transform(
        this.editLeaveadminForm.value.eLeave_from,
        "yyyy-MM-dd"
      );
     let ToDate = this.pipe.transform(
        this.editLeaveadminForm.value.eLeave_upto,
        "yyyy-MM-dd"
      );

     var date1 : any = new Date(FromDate);
     var  date2 : any  = new Date(ToDate);
     var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
     
      let obj = {
        eEmpmaster_uid: this.editLeaveadminForm.value.eEmpmaster_uid,
        eLeavetype_uid: this.editLeaveadminForm.value.eLeavetype_uid,
        eLeave_from: FromDate ,
        eLeave_upto: ToDate,
        eNoOfDays :  diffDays ,
        enotes: this.editLeaveadminForm.value.enotes,
        id: this.editId
      };
      const sql = "update leaverequest set Empmaster_uid='" + obj.eEmpmaster_uid + "'," + 
      "Leavetype_uid ='" + obj.eEmpmaster_uid + "'," +
      "Leave_from ='" + obj.eLeave_from + "'," +
      "Leave_upto ='" + obj.eLeave_upto + "'," +
      "NOfDays ='" + obj.eNoOfDays + "'," +
      "notes ='" + obj.enotes + "' where uid='" + obj.id +"'"
      console.log(sql);
      this.data.runQuery(sql).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.loadLeaves();
      $("#edit_leave").modal("hide");
      this.toastr.success("Leaves Updated sucessfully...!", "Success");
    } 
    else {
    this.toastr.warning("Mandatory fields required", "");
  }
  }

  // Delete leaves Modal Api Call

  deleteleaves() {
    const sql = "Delete from leaverequest  where uid =" + this.tempId
    this.data.runQuery(sql)
    .subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
     
      this.loadLeaves();
      $("#delete_approve").modal("hide");
      this.toastr.success("Leaves deleted sucessfully..!", "Success");
    });
  }

  // To Get The leaves Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
   
   // const index = this.lstLeave.findIndex((item) => {
   //   return item.id === value;
   // });
    //let toSetValues = this.lstLeave[index];
    var sql="SELECT Company_uid,Empmaster_uid,LeaveType_uid,Entry_date,Leave_from,"+
    "Leave_upto,Nofdays,notes,Approved_uid FROM leaverequest where uid=" + "'"+ this.editId +"'"
      console.log('sql',sql)
    this.data.runQuery(sql).subscribe(data => {
          this.getrecordforedit=data;
          this.selectedRecord=this.getrecordforedit[0];
          this.editFromDate = this.pipe.transform(this.selectedRecord['Leave_from'], "dd-MM-yyyy");
          this.editToDate= this.pipe.transform(this.selectedRecord['Leave_upto'], "dd-MM-yyyy");
          this.editLeaveadminForm.setValue({  
            eEmpmaster_uid: this.selectedRecord['Empmaster_uid'],
            eLeavetype_uid: this.selectedRecord['LeaveType_uid'],
            eLeave_from: this.editFromDate ,
            eLeave_upto: this.editToDate,
            eNoOfDays :this.selectedRecord['Nofdays'],
            enotes: this.selectedRecord['notes']
         
       });
     // console.log(this.getrecordforedit)
    });
     

//this.editToDate = this.lstLeave.filter(x => x.uid == this.editId);
          
    
    // $("empid")[0].selectedIndex = 1;
 
   
  }

  

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

    
}
