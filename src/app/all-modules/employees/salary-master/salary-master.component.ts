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
  // selector: "app-salary-master",
  templateUrl: "./salary-master.component.html",
})
export class SalaryMasterComponent implements OnInit, OnDestroy {
  emplist : any = [];
  salarymasterlst : any = [];
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
  public addsalarymasterform: FormGroup;
  public editsalarymasterform: FormGroup;
  public editFromDate: any;
  public editToDate: any;
public netsalary : number;
public grosssalary : number;
public totaldeduction :number;

  constructor(
    private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private data: DataServiceService
  ) {}

  ngOnInit() {
    
    this.addsalarymasterform = this.formBuilder.group({
       aempmaster_uid: ["", [Validators.required]],
       aeffect_year : ["", [Validators.required]],
       aeffect_month :  ["", [Validators.required]],
       abasic: ["", [Validators.required]],
       ahra: ["", [Validators.required]],
       ada: ["", [Validators.required]],
       aconveyance : ["", [Validators.required]],
       aallowance: ["", [Validators.required]],
       amedicalallowance : ["", [Validators.required]],
       aothers : ["", [Validators.required]], 
       aesi:["", [Validators.required]], 
       atds:["", [Validators.required]], 
       apf:["", [Validators.required]], 
       agross_salary : ["", [Validators.required]], 
       atotal_deduction : ["", [Validators.required]], 
       anet_salary : ["", [Validators.required]], 
          });

    // Edit leaveadmin Form Validation And Getting Values

     this.editsalarymasterform = this.formBuilder.group({
      eempmaster_uid: ["", [Validators.required]],
      eeffect_year : ["", [Validators.required]],
      eeffect_month :  ["", [Validators.required]],
      ebasic: ["", [Validators.required]],
      ehra: ["", [Validators.required]],
      eda: ["", [Validators.required]],
      econveyance : ["", [Validators.required]],
      eallowance: ["", [Validators.required]],
      emedicalallowance : ["", [Validators.required]],
      eothers : ["", [Validators.required]], 
      eesi:["", [Validators.required]], 
      etds:["", [Validators.required]], 
      epf:["", [Validators.required]], 
      egross_salary : ["", [Validators.required]], 
      etotal_deduction : ["", [Validators.required]], 
      enet_salary : ["", [Validators.required]], 
    });
  

    // for data table configuration
    this.dtOptions = {
      pageLength: 10,
      dom: "lrtip",
    };
    this.addsalarymasterform.reset
   
    this.Loadsalarymaster()
     this.empdropdowncombo()

  }

findcalculationA() {
  const basic =this.addsalarymasterform.value.abasic;
  const  hra=this.addsalarymasterform.value.ahra;
  const da=this.addsalarymasterform.value.ada;
  const conveyance =this.addsalarymasterform.value.aconveyance;
  const allowance=this.addsalarymasterform.value.aallowance;
  const medicalallowance=this.addsalarymasterform.value.amedicalallowance;
  const others=this.addsalarymasterform.value.aothers;
  const esi=this.addsalarymasterform.value.aesi;
  const tds=this.addsalarymasterform.value.atds;
  const pf=this.addsalarymasterform.value.apf;
 this.grosssalary=basic+hra+conveyance+allowance+da+medicalallowance+others
 this.totaldeduction=this.grosssalary-(esi+tds+pf)
 this.netsalary=this.grosssalary-this.totaldeduction
 console.log('Net Salary:',this.netsalary)
}
findcalculationE() {
  let basic =this.editsalarymasterform.value.ebasic;
  let hra=this.editsalarymasterform.value.ehra;
  let da=this.editsalarymasterform.value.eda;
  let conveyance =this.editsalarymasterform.value.econveyance;
  let allowance=this.editsalarymasterform.value.eallowance;
  let medicalallowance=this.editsalarymasterform.value.emedicalallowance;
  let others=this.editsalarymasterform.value.eothers;
  let esi=this.editsalarymasterform.value.eesi;
  let tds=this.editsalarymasterform.value.etds;
  let pf=this.editsalarymasterform.value.epf;
 this.grosssalary=basic+hra+conveyance+allowance+da+medicalallowance+others
 this.totaldeduction=(esi+tds+pf)
 this.netsalary=this.grosssalary-this.totaldeduction
 console.log('gross:',this.grosssalary)
 console.log('deduction:',this.totaldeduction)
 console.log('net salary:',this.netsalary)
}
  // Get leave  Api Call

  Loadsalarymaster() {
   let sql =""
  sql=" SELECT s.uid,e.Firstname employee,s.effect_year,s.effect_month," +
  "basic,hra,da,conveyance,allowance,medicalallowance,others,"+
   "gross_salary,total_deduction,net_salary FROM salarymaster s" +
   " INNER JOIN empmaster e ON e.uid=s.empmaster_uid" +
   " where s.company_uid='1' ORDER BY e.Firstname,s.effect_year, s.effect_month"
 
   this.data.runQuery(sql).subscribe((data) => {
      this.salarymasterlst = data.map(item=>{return {
        uid:item.uid,
        employee:item.employee,
        effect_year:item.effect_year,
        effect_month:item.effect_month,
        basic:item.basic,
        hra:item.hra,
        conveyance:item.conveyance,
        allowance:item.allowance,
        medicalallowance:item.medicalallowance,
        others:item.others,
        gross_salary:item.gross_salary,
        total_deduction:item.total_deduction,
        net_salary:item.net_salary,
   }});
 
    this.dtTrigger.next();
    this.rows = this.salarymasterlst;
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

 

// Add leaves for admin Modal Api Call
addsalarymaster() 
  {
     // if (this.addsalarymasterform.valid) {
      
        let tyear = this.pipe.transform(
        this.addsalarymasterform.value.aeffect_year,
        "yyyy"
      );
      let tmonth = this.pipe.transform(
        this.addsalarymasterform.value.aeffect_month,
        "MM"
      );
   
      let currentDate =  this.pipe.transform(new Date(),"yyyy-MM-dd");
      
      console.log('medical');
      console.log(this.addsalarymasterform.value.amedicalallowance);

      let obj = {
        aempmaster_uid: this.addsalarymasterform.value.aempmaster_uid,
        aeffect_year:tyear,
        aeffect_month:tmonth,
        abasic:this.addsalarymasterform.value.abasic,
        ahra:this.addsalarymasterform.value.ahra,
        ada:this.addsalarymasterform.value.ada,
        aconveyance:this.addsalarymasterform.value.aconveyance,
        aallowance:this.addsalarymasterform.value.aallowance,
        amedicalallowance:this.addsalarymasterform.value.amedicalallowance,
        aothers:this.addsalarymasterform.value.aothers,
        agross_salary:this.addsalarymasterform.value.agross_salary,
        atotal_deduction:this.addsalarymasterform.value.atotal_deduction,
        anet_salary:this.addsalarymasterform.value.anet_salary,
        entrydate:currentDate,
      };
      
var sql="";
sql="insert into salarymaster(Company_uid,empmaster_uid,effect_year,effect_month" +
"basic,hra,da,conveyance,allowance,medicalallowance,others,"+
"gross_salary,total_deduction,net_salary,entrydate)values('1','" +
 obj.aempmaster_uid  + "','" + 
 obj.aeffect_year + "','"  + 
 obj.aeffect_month + "','" +
 obj.abasic + "','" +
 obj.ahra  + "','" +  
 obj.ada +"','"  +
 obj.aconveyance + "','" +
 obj.aallowance + "','" + 
 obj.amedicalallowance + "','" +
 obj.aothers +"','"  +
 obj.agross_salary + "','" +
 obj.atotal_deduction + "','" +
 obj.anet_salary + "','"
 +obj.entrydate + "')" 
 console.log('sql');
 console.log(sql);
console.log(obj);

this.data.runQuery(sql)
.subscribe((data) => {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.destroy();
    });
        this.Loadsalarymaster();
        // console.log(sql);
        $("#add_salarymaster").modal("hide");
        this.addsalarymasterform.reset();
        this.toastr.success("salary added sucessfully...!", "Success");
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
  var date1 : any = new Date(this.addsalarymasterform.value.aLeave_from);
  var  date2 : any  = new Date(this.addsalarymasterform.value.aLeave_upto);
  var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

 addfromdt()
 {
  //this.addsalarymasterform.value.noofdays= this.findnoofdays()
  //this.addsalarymasterform.setValue({
   // noofdays: this.findnoofdays()
   // }); 

  // this.addsalarymasterform = this.formBuilder.group({
  //  noofdays: this.findnoofdays()
 // });

}

 addtodt()
 {
 // this.addsalarymasterform.value.noofdays= this.findnoofdays()
  //this.addsalarymasterform.setValue({
   // noofdays: this.findnoofdays()
   // });

 //  this.addsalarymasterform = this.formBuilder.group({
 //  noofdays: this.findnoofdays()  });
 }

  from(data) {
    this.editFromDate = this.pipe.transform(data, "dd-MM-yyyy");
    
  }
  to(data) {
    this.editToDate = this.pipe.transform(data, "dd-MM-yyyy");
    
  }

  // Edit leaves Modal Api Call
  editsalarymaster() {
    if (this.editsalarymasterform.valid) {

      
      let obj = {
        eempmaster_uid: this.editsalarymasterform.value.eempmaster_uid,
        eeffect_year: this.editsalarymasterform.value.eeffect_year,
        eeffect_month: this.editsalarymasterform.value.eeffect_month,
        ebasic: this.editsalarymasterform.value.ebasic,
        ehra: this.editsalarymasterform.value.ehra,
        eda: this.editsalarymasterform.value.eda,
        econveyance: this.editsalarymasterform.value.econveyance,
        eallowance: this.editsalarymasterform.value.eallowance,
        emedicalallowance: this.editsalarymasterform.value.emedicalallowance,
        eothers: this.editsalarymasterform.value.eothers,
        egross_salary: this.editsalarymasterform.value.egross_salary,
        eesi: this.editsalarymasterform.value.eesi,
        etds: this.editsalarymasterform.value.etds,
        epf:this.editsalarymasterform.value.epf,
        etotal_deduction: this.editsalarymasterform.value.etotal_deduction,
        enet_salary: this.editsalarymasterform.value.enet_salary,
    
        id: this.editId
      };
      const sql = "update salarymaster set " +
      "empmaster_uid='" + obj.eempmaster_uid + "'," + 
      "effect_year ='" + obj.eeffect_year + "'," +
      "effect_month ='" + obj.eeffect_month + "'," +
      "basic ='" + obj.ebasic + "'," +
      "hra ='" + obj.ehra + "'," +
      "da ='" + obj.eda + "'," +
      "conveyance ='" + obj.econveyance + "'," +
      "allowance ='" + obj.eallowance + "'," +
      "medicalallowance ='" + obj.emedicalallowance + "'," +
      "others ='" + obj.eothers + "'," +
      "gross_salary ='" + obj.egross_salary + "'," +
      "esi ='" + obj.eesi + "'," +
      "pf ='" + obj.epf + "'," +
      "tds ='" + obj.etds + "'," +
      "total_deduction ='" + obj.etotal_deduction + "'," +
      "net_salary ='" + obj.enet_salary + "'" +
      " where uid='" + obj.id +"'"
      console.log(sql);
      this.data.runQuery(sql).subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
      });
      this.Loadsalarymaster();
      $("#edit_salary").modal("hide");
      this.toastr.success("salary Updated sucessfully...!", "Success");
    } 
    else {
    this.toastr.warning("Mandatory fields required", "");
  }
  }

  // Delete leaves Modal Api Call

  deleteleaves() {
    const sql = "Delete from salarymaster  where uid =" + this.tempId
    this.data.runQuery(sql)
    .subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
     
      this.Loadsalarymaster();
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
    var sql="SELECT empmaster_uid,effect_year,effect_month," +
    "basic,hra,da,conveyance,allowance,medicalallowance,others, esi,tds,pf,"+
    "gross_salary,total_deduction,net_salary FROM salarymaster where company_uid='1' and uid=" + "'"+ this.editId +"'"
    //  console.log('sql',sql)
    this.data.runQuery(sql).subscribe(data => {
          this.getrecordforedit=data;
          this.selectedRecord=this.getrecordforedit[0];
      //    console.log(this.selectedRecord);
        //  this.editFromDate = this.pipe.transform(this.selectedRecord['entrydate'], "dd-MM-yyyy");
          this.editsalarymasterform.setValue({  
            eempmaster_uid: this.selectedRecord['empmaster_uid'],
            eeffect_year: this.selectedRecord['effect_year'],
            eeffect_month: this.selectedRecord['effect_month'],
            ebasic: this.selectedRecord['basic'],
            ehra: this.selectedRecord['hra'],
            eda: this.selectedRecord['da'],
            econveyance: this.selectedRecord['conveyance'],
            eallowance: this.selectedRecord['allowance'],
            emedicalallowance: this.selectedRecord['medicalallowance'],
            eothers: this.selectedRecord['others'],
            egross_salary: this.selectedRecord['gross_salary'],
            eesi: this.selectedRecord['esi'],
            etds: this.selectedRecord['tds'],
            epf: this.selectedRecord['pf'],
            etotal_deduction: this.selectedRecord['total_deduction'],
            enet_salary: this.selectedRecord['net_salary'],
                      
       });
     // console.log(this.getrecordforedit)
    });
     }

   

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

    
}
