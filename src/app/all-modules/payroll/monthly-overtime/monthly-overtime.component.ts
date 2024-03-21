import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
// import { AllModulesService } from "../../all-modules.service";
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
// import { debug } from "console";
declare const $: any;
@Component({
  // selector: 'app-monthly-overtime',
  templateUrl: './monthly-overtime.component.html',
})
export class MonthlyOvertimeComponent implements OnInit, OnDestroy {
  myCurrentData: Array<any> = [];
  obsevableResponseArray: Array<any> = [];
  promiseResponseArray: Array<any> = [];
  public emplist : any = [];
  public ottypelist : any=[];
  public loandetaillst : any = [];
  public lstloanheader : any=[];
  public url: any = "salary-master";
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
  public addloandetailsform: FormGroup;
  //public editsalarymasterform: FormGroup;
  public editFromDate: any;
  public editToDate: any;
  public uniqueid :any
  public tyear :any
  public tmonth:any
  constructor(
  private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private data: DataServiceService
    
  ) {}

  ngOnInit(): void 
  {
  this.addloandetailsform= this.formBuilder.group
    ({
      entrydate : ["", [Validators.required]],
      aempmaster_uid :  ["", [Validators.required]],
    });
  this.ottypecombo();
  this.Supervisiorcombo();
  this.loandeductedlistsummary()
  
  }
  //start the function
 addfromdt()
 {};
 
 Insertintoloan() {
  let sql ="SELECT 0 tick, l.uid loanid,l.empmaster_uid,e.Firstname employee," +
  "lt.name loantype,l.loantype_uid,l.loanamount,l.total_paidamount," +
  "l.monthly_deduction,l.still_tobe_paid,l.thismonth_due FROM vw_loan_tobe_paid l " +
  "INNER JOIN empmaster e ON e.uid=l.company_uid AND e.company_uid=l.company_uid " +
  "INNER JOIN loantype lt ON l.loantype_uid=lt.uid  WHERE l.company_uid='1'"

  this.data.runQuery(sql).subscribe((data) => {
    console.log(data)
     this.loandetaillst = data.map(item=>{return {
      tick:item.tick,
      uid:item.loanid,
       empmaster_uid:item.empmaster_uid,
       employee:item.employee,
       loantype:item.loantype,
       loantype_uid:item.loantype_uid,
       loanamount:item.loanamount,
       total_paidamount:item.total_paidamount,
       monthly_deduction:item.monthly_deduction,
       still_tobe_paid:item.still_tobe_paid,
       thismonth_due:item.thismonth_due,
     
  }});

  this.dtTrigger.next();
   this.rows = this.loandetaillst;
   this.srch = [...this.rows];

   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
  });
});
}
// this.loandetaillst.forEach(function (arrayItem) 

loandeductedlistsummary()
{
  let sql ="SELECT uid  , tyear, tmonth, notes from adddeductheader where company_uid='1'"

  this.data.runQuery(sql).subscribe((data) => {
    console.log(data)
     this.loandetaillst = data.map(item=>{return {
       uid:item.uid,
       tyear:item.tyear,
       tmonth:item.tmonth,
       notes:item.notes,
     
  }});

  this.dtTrigger.next();
   this.rows = this.loandetaillst;
   this.srch = [...this.rows];

   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
  });
});
}


insertheaderanddetails()
{
  //inserting data into header and detail table
  //find updated latest uid 
  this.finlatestid()
  
}

headerinsert()
   {
   // this.tyear=  this.pipe.transform(data, "dd-MM-yyyy");
   let ttyear= getYear(this.tyear)
   let ttmonth= getMonth(this.tmonth)
   console.log('year',this.addloandetailsform.value.effect_year)
     console.log('year and month',this.tyear,this.tmonth)
    let sql=""
     sql =   "insert into adddeductheader (company_uid,uid,tyear,tmonth) values( '1','" +
    this.uniqueid  + "','" + 
    ttyear + "','" +    
    ttmonth + "')"     
    console.log(sql)   
          this.data.runQuery(sql).subscribe((data) => {
          },
          (error) => {
            throw error; 
           }
          );
      
     }
async loandetailinsert () {
  for (let  Item of this.loandetaillst) {
    console.log('count',Item.tick) 
   if (Item.tick==1)
   {
    let sql="insert into adddeductdetail (adddeductheader_uid,"+ 
    "adddeduct_type_uid,empmaster_uid,amount,notes) values('" + this.uniqueid +"','" +
    Item.loantype_uid +"','" + Item.empmaster_uid +"','" + Item.thismonth_due +"','" +
    "notes')"
    console.log('detail insert query',sql)
    await this.loandetailapi(sql);
     }  
    }
   }
  
  loandetailapi(sql:string) {
  return  new Promise((resolve, reject) => {
   //let sql ="insert into department (code,name) values('" + selectrecord. +"','500')"
    this.data.runQuery(sql).subscribe(resp => {
      resolve(true);
      });
   })
  }

  //find last id and get updated +1
  finlatestid(){
  let sql =   "SELECT max(lastnumber)+1 uid from codegenerate where company_uid='1';"
  this.data.runQuery(sql).subscribe((data) => { 
    this.getrecordforedit=data;
        this.selectedRecord =this.getrecordforedit[0]
        this.uniqueid= 'NA'
        if (Number.isInteger( this.selectedRecord['uid']))
         {
          this.uniqueid= this.selectedRecord['uid']
          this.getupdateduid(this.uniqueid) 
          this.headerinsert()
          this.loandetailinsert() 
        }
      },
      (error) => {
               throw error; 
     }
      );
     return(this.uniqueid)
      }

      getupdateduid(guid : any){
        let sql =   "update codegenerate set lastnumber='" + guid +"' where tablename='adddeductheader' and company_uid='1'"
        console.log(sql)   
        this.data.runQuery(sql).subscribe((data) => {
        });
      
        }

   

getvalueofarray() {
  console.log(this.loandetaillst)
  this.loandetaillst.forEach(function (arrayItem) {
    console.log('tick',arrayItem.tick,'due amount', arrayItem.thismonth_due );
  });
  }


  ottypecombo() {
    this.data.runQuery('SELECT uid, Name FROM overtimemaster where company_uid=1;').subscribe((data) => { 
      console.log(data)
      this.ottypelist = data
      console.log(this.ottypelist)
      });
    }
    Supervisiorcombo() {
      let sql ="SELECT e.uid,e.Firstname name FROM empmaster e INNER JOIN " +
     " (SELECT Supervisor_uid  uid , company_uid FROM empmaster GROUP BY Supervisor_uid) s " +
     " ON e.uid=s.uid AND e.company_uid=s.company_uid where e.company_uid='1'" 
     //let sql ="SELECT uid,Firstname name FROM empmaster "
     this.data.runQuery(sql).subscribe((data) => { 
        console.log(data)
        this.emplist = data
        console.log(this.emplist)
        });
      }
 ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
