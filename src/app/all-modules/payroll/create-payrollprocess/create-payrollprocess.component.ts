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
  // selector: "app-create-payrollprocess",
  templateUrl: "./create-payrollprocess.component.html",
})
export class Createpayrollprocesscomponent implements OnInit {
  public timesheetform: FormGroup;
  obsevableResponseArray: Array<any> = [];
  promiseResponseArray: Array<any> = [];
  public id;
  public viewsalaryprocesslist=[];
  public viewempsalarylist=[];
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
    $("#sp-div").find("*").prop('disabled', true);
    console.log('year and month',this.tyear,this.tmonth,"edit",this.edit)
    this.salaryprocesslist()
}
 
  }

run_salary_proc(){
  let ttyear=getYear(this.tyear)
  let ttmonth=getMonth(this.tmonth)+1
  let sql =   "call sp_SalaryProcess('1','"+ ttyear + "','"+ ttmonth+ "')"
  console.log(sql)   
  this.data.runQuery(sql).subscribe((data) => {
    this.salaryprocesslist() 
  });
 
}   
salaryprocesslist()
{
 this.ngOnDestroy()
 let ttable="";
 if ( this.edit=='yes') 
   ttable="salaryprocessdetail where tyear='"+this.tyear +"' and tmonth='"+ this.tmonth + "' and company_uid='1'"
 else 
 ttable="salaryprocess_temp";
 
 let sql ="SELECT  company_uid,empmaster_uid,empname,totalhrs,normalhrs,othrs," +
  "grosssalary,salarydeduct,perhrrate,basic,hra,da,conveyance,allowance,"+
  "medicalallowance,others,cbasic,chra,cda,cconveyance,callowance,"+
  "cmedicalallowance,cothers,tds,esi,pf,loanAmount,addition," + 
  "deduction,totalsalary,netdeduction,netsalary from " + ttable

//console.log('sql:',sql)
  this.data.runQuery(sql).subscribe((data) => {
    console.log(data)
     this.viewsalaryprocesslist = data.map(item=>{return {
      empmaster_uid:item.empmaster_uid,
        empname:item.empname,
        totalhrs:item.totalhrs,
        normalhrs:item.normalhrs,
        othrs:item.othrs,
        grosssalary:item.grosssalary,
        salarydeduct:item.salarydeduct,
        perhrrate:item.perhrrate,
        basic:item.basic,
        hra:item.hra,
        da:item.da,
        allowance:item.allowance,
        medicalallowance:item.medicalallowance,
        others:item.others,
        cbasic:item.cbasic,
        chra:item.chra,
        cda:item.cda,
        cconveyance:item.cconveyance,
        callowance:item.callowance,
        cmedicalallowance:item.cmedicalallowance,
        cothers:item.cothers,
        dts:item.dts,
        esi:item.esi,
        pf:item.pf,
        loanAmount:item.loanAmount,
        addition:item.addition,
        deduction:item.deduction, 
        totalsalary:item.totalsalary,
        netdeduction:item.netdeduction,
        netsalary:item.netsalary,    
  }

    
});
console.log( this.viewsalaryprocesslist);  
  this.dtTrigger.next();
   this.rows = this.viewsalaryprocesslist;
   this.srch = [...this.rows];

   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
  });
});
}


viewtimesheet( empid : any)
{
 this.ngOnDestroy()
  let sql ="SELECT empmaster_uid,"+
  "dates,leavetype_code,totalhrs,normalhrs,othrs" +
" from dts_temp where empmaster_uid='"+ empid +"'"
console.log('sql:',sql)
  this.data.runQuery(sql).subscribe((data) => {
    console.log(data)
     this.viewempsalarylist = data.map(item=>{return {
     
      empmaster_uid:item.empmaster_uid,
       empname:item.empname,
       dates:item.dates,
       leavetype_code:item.leavetype_code,
       totalhrs:item.totalhrs,
       normalhrs:item.normalhrs,
       othrs:item.othrs,
           
  }

    
});
console.log( this.viewempsalarylist);  
  this.dtTrigger.next();
   this.rows = this.viewempsalarylist;
   this.srch = [...this.rows];

   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
  });
});
}


deletetimesheet() {
  let sql="";
  if ( this.edit=='yes') 
  sql=" Delete from salaryprocessdetail where tyear='"+this.tyear +"' and tmonth='" 
    + this.tmonth + "' and company_uid='1' and empmaster_uid='"+ this.tempId +"'"
  else 
  sql=" Delete from salaryprocess_temp where empmaster_uid='"+ this.tempId +"'"
  this.data.runQuery(sql)
  .subscribe((data) => {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.run_salary_proc();
    $("#delete_emptimesheet").modal("hide");
    this.toastr.success("Employee deleted sucessfully..!", "Success");
  });
  // sulaiman end
}

savesend()
{
  let sql =   "call sp_insert_sp('1','"+ getYear(this.tyear) +"','"+ getMonth(this.tmonth )+"')"
  console.log(sql)   
  this.data.runQuery(sql).subscribe((data) => {
    this.run_salary_proc() 
    this.toastr.success("Salaries inserted sucessfully..!", "Success");
  });
}
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
