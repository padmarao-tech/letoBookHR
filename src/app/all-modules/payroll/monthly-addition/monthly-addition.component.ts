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
  // selector: 'app-monthly-addition',
  templateUrl: './monthly-addition.component.html',
})
export class MonthlyAdditionComponent implements OnInit {

  myCurrentData: Array<any> = [];
  obsevableResponseArray: Array<any> = [];
  promiseResponseArray: Array<any> = [];
  public montlyadditionlist : any = [];
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
  let sql ="SELECT uid,tyear,tmonth,notes  FROM adddeductheader WHERE company_uid='1' and ttype='ADD' " + 
  " ORDER BY tyear,tmonth"

  this.data.runQuery(sql).subscribe((data) => {
    console.log(data)
     this.montlyadditionlist = data.map(item=>{return {
      uid:item.uid,
      tyear:item.tyear,
       tmonth:item.tmonth,
       notes:item.notes,
         
  }});

  this.dtTrigger.next();
   this.rows = this.montlyadditionlist;
   this.srch = [...this.rows];

   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
  });
});
}
yearandmonthcopy(uid)
{
  localStorage.setItem('edit', 'yes');
  localStorage.setItem('uid', uid);
  this.router.navigate(["/payroll/create-addition"])
  console.log ('uid',uid)
}
 ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
