import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DataServiceService } from "../../../service/data-service.service";
// import { AllModulesService } from "../../all-modules.service";
import { map } from "jquery";
import { not } from "@angular/compiler/src/output/output_ast";
import { YEAR } from "ngx-bootstrap/chronos/units/constants";
import { getMonth } from "ngx-bootstrap";
import { getYear } from "date-fns";
// import { debug } from "console";
declare const $: any
@Component({
  // selector: "app-create-dailytimesheet",
  templateUrl: "./create-dailytimesheet.component.html",
})
export class CreateDailytimesheetComponent implements OnInit {
  public timesheetform: FormGroup;
  obsevableResponseArray: Array<any> = [];
  promiseResponseArray: Array<any> = [];
  public id;
  public timesheetdetailslist=[];
  public viewemplist=[];
   @ViewChild(DataTableDirective, { static: false })
  public rows = [];
  public srch = [];
  public pipe = new DatePipe("en-US");
  public dtTrigger: Subject<any> = new Subject();
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public editFromDate: any;
  public editToDate: any;
  public uniqueid :any
  public tempId :any
  public tyear :any
  public tmonth:any
  public edit:any
  public tick: string = "assets/img/profiles/avatar-05.jpg"
  public untick: string = "assets/img/profiles/avatar-05.jpg"
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private allModulesService: AllModulesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private data: DataServiceService
  ) {}

  ngOnInit() {
    //get id value of invoice list
    if (localStorage.getItem('edit')=='yes') 
{
    this.edit= localStorage.getItem('edit');
    this.tyear= localStorage.getItem('ttyear');
    this.tmonth=localStorage.getItem('ttmonth');
    localStorage.removeItem("ttyear");
    localStorage.removeItem("ttmonth");
    localStorage.removeItem("edit");
    console.log('year and month',this.tyear,this.tmonth,"edit",this.edit)
   // $('#button').attr('disabled','disabled');
    $("#dts-div").find("*").prop('disabled', true);
    this.filltimesheetdetails();
  }
 
  }
  run_timesheet_proc()
  {
    let ttyear=getYear(this.tyear)
    let ttmonth=getMonth(this.tmonth)+1
    let sql =   "call sp_insert_timesheet_temp('1','"+ ttyear + "','"+ ttmonth+ "')"
    console.log(sql)   
    this.data.runQuery(sql).subscribe((data) => {
      this.filltimesheetdetails() 
    });
   
  }

     
filltimesheetdetails()
{
 this.ngOnDestroy()
 let ttable="";
 if ( this.edit=='yes') 
   ttable="vw_dts_summary where tyear='"+this.tyear +"' and tmonth='"+ this.tmonth + "' and company_uid='1'"
 else 
 ttable="vw_dts_summary_temp";
 
  let sql ="SELECT empmaster_uid,empname,"+
  "DAY1_nrhrs,DAY2_nrhrs,DAY3_nrhrs,DAY4_nrhrs,DAY5_nrhrs," +
  "DAY6_nrhrs,DAY7_nrhrs,DAY8_nrhrs,DAY9_nrhrs,DAY10_nrhrs," +
  "DAY11_nrhrs,DAY12_nrhrs,DAY13_nrhrs,DAY14_nrhrs,DAY15_nrhrs," +
  "DAY16_nrhrs,DAY17_nrhrs,DAY18_nrhrs,DAY19_nrhrs,DAY20_nrhrs," +
  "DAY21_nrhrs,DAY22_nrhrs,DAY23_nrhrs,DAY24_nrhrs,DAY25_nrhrs," +
  "DAY26_nrhrs,DAY27_nrhrs,DAY28_nrhrs,DAY29_nrhrs,DAY30_nrhrs," +
  "DAY31_nrhrs,totalhrs,totalothrs from " + ttable
  console.log(sql);
  this.data.runQuery(sql).subscribe((data) => {
    console.log(data)
     this.timesheetdetailslist = data.map(item=>{return {
     
      empmaster_uid:item.empmaster_uid,
       empname:item.empname,
       DAY1_nrhrs:item.DAY1_nrhrs,
       DAY2_nrhrs:item.DAY2_nrhrs,
       DAY3_nrhrs:item.DAY3_nrhrs,
       DAY4_nrhrs:item.DAY4_nrhrs,
       DAY5_nrhrs:item.DAY5_nrhrs,
       DAY6_nrhrs:item.DAY6_nrhrs,
       DAY7_nrhrs:item.DAY7_nrhrs,
       DAY8_nrhrs:item.DAY8_nrhrs,
       DAY9_nrhrs:item.DAY9_nrhrs,
       DAY10_nrhrs:item.DAY10_nrhrs,
       DAY11_nrhrs:item.DAY11_nrhrs,
       DAY12_nrhrs:item.DAY12_nrhrs,
       DAY13_nrhrs:item.DAY13_nrhrs,
       DAY14_nrhrs:item.DAY4_nrhrs,
       DAY15_nrhrs:item.DAY15_nrhrs,
       DAY16_nrhrs:item.DAY16_nrhrs,
       DAY17_nrhrs:item.DAY17_nrhrs,
       DAY18_nrhrs:item.DAY18_nrhrs,
       DAY19_nrhrs:item.DAY19_nrhrs,
       DAY20_nrhrs:item.DAY20_nrhrs,
       DAY21_nrhrs:item.DAY21_nrhrs,
       DAY22_nrhrs:item.DAY22_nrhrs,
       DAY23_nrhrs:item.DAY23_nrhrs,
       DAY24_nrhrs:item.DAY24_nrhrs,
       DAY25_nrhrs:item.DAY25_nrhrs,
       DAY26_nrhrs:item.DAY26_nrhrs,
       DAY27_nrhrs:item.DAY27_nrhrs,
       DAY28_nrhrs:item.DAY28_nrhrs,
       DAY29_nrhrs:item.DAY29_nrhrs,
       DAY30_nrhrs:item.DAY30_nrhrs,
       DAY31_nrhrs:item.DAY31_nrhrs,
       totalhrs:item.totalhrs,
       totalothrs:item.totalothrs,
  }

    
});
console.log( this.timesheetdetailslist);  
  this.dtTrigger.next();
   this.rows = this.timesheetdetailslist;
   this.srch = [...this.rows];
   this.toastr.success("Timesheet Filled sucessfully..!", "Success");
   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
  });
});
}
         
     
viewtimesheet( empid : any)
{
 this.ngOnDestroy()
 let ttable="";
 if ( this.edit=='yes') 
   ttable=" dailytimesheetdetails where tyear='"+this.tyear +"' and tmonth='" 
   + this.tmonth + "' and company_uid='1' and empmaster_uid='"+ empid +"'"
 else 
 ttable=" dts_temp where empmaster_uid='"+ empid +"'"

 let sql ="SELECT empmaster_uid,"+
  "dates,leavetype_code,totalhrs,normalhrs,othrs from" + ttable
 console.log('sql:',sql,'')
  this.data.runQuery(sql).subscribe((data) => {
    console.log(data)
     this.viewemplist = data.map(item=>{return {
     
      empmaster_uid:item.empmaster_uid,
       empname:item.empname,
       dates:item.dates,
       leavetype_code:item.leavetype_code,
       totalhrs:item.totalhrs,
       normalhrs:item.normalhrs,
       othrs:item.othrs,
           
  }

    
});
console.log( this.viewemplist);  
  this.dtTrigger.next();
   this.rows = this.viewemplist;
   this.srch = [...this.rows];

   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
  });
});
}


deletetimesheet() {
  // sulaiman start
  let sql="";
 if ( this.edit=='yes') 
 sql=" Delete from dailytimesheetdetails where tyear='"+this.tyear +"' and tmonth='" 
   + this.tmonth + "' and company_uid='1' and empmaster_uid='"+ this.tempId +"'"
 else 
 sql=" Delete from dts_temp where empmaster_uid='"+ this.tempId +"'"
 console.log(sql);
  this.data.runQuery(sql)
  .subscribe((data) => {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    $("#delete_emptimesheet").modal("hide");
    this.toastr.success("Timesheet deleted sucessfully..!", "Success");
    this.filltimesheetdetails();
  });
}

savesend()
{
  let sql =   "call sp_insert_dts_real()"
  console.log(sql)   
  this.data.runQuery(sql).subscribe((data) => {
    this.filltimesheetdetails() 
    this.toastr.success("Timesheet inserted sucessfully..!", "Success");
  });
}
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
