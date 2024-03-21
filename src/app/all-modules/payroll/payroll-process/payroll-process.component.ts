import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
// import { AllModulesService } from "../../all-modules.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DataServiceService } from "../../../service/data-service.service";
import { map } from "jquery";
import { not } from "@angular/compiler/src/output/output_ast";
import { YEAR } from "ngx-bootstrap/chronos/units/constants";
import { getMonth } from "ngx-bootstrap";
import { getYear } from "date-fns";
import { RouterLink } from "@angular/router";
// import { debug } from "console";
declare const $: any;
@Component({
  // selector: 'app-payroll-process',
  templateUrl: './payroll-process.component.html',
})
export class PayrollProcessComponent implements OnInit {
  myCurrentData: Array<any> = [];
  obsevableResponseArray: Array<any> = [];
  promiseResponseArray: Array<any> = [];
  public salaryprocesslist : any = [];
  public ttyear: any;
  public ttmonth: any;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public rows = [];
  public srch = [];
   public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
 

  constructor(
  private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private data: DataServiceService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit(): void 
  {

    this.loadtimesheet()
  
  }
  //start the function
 
 
 
// this.loandetaillst.forEach(function (arrayItem) 

loadtimesheet()
{
  let sql ="SELECT tyear,tmonth  FROM salaryprocessdetail WHERE company_uid='1' " + 
  "GROUP BY  tyear,tmonth ORDER BY tyear,tmonth"

  this.data.runQuery(sql).subscribe((data) => {
    console.log(data)
     this.salaryprocesslist = data.map(item=>{return {
       tyear:item.tyear,
       tmonth:item.tmonth,
         
  }});

  this.dtTrigger.next();
   this.rows = this.salaryprocesslist;
   this.srch = [...this.rows];

   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
  });
});
}
yearandmonthcopy(tyear :any, tmonth : any)
{
  localStorage.setItem('edit', 'yes');
  localStorage.setItem('ttyear', tyear);
  localStorage.setItem('ttmonth', tmonth);
 this.ttyear= localStorage.getItem('ttyear');
 this.ttmonth=localStorage.getItem('ttmonth');
 console.log('year:',this.ttyear, 'month:',this.ttmonth)
 this.router.navigate(["/payroll/create-payrollprocess"])
}
 ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
