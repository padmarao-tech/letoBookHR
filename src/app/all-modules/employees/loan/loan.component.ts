import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { DataServiceService } from "../../../service/data-service.service";
declare const $: any;
@Component({
  // selector: 'app-loan',
  templateUrl: './loan.component.html',
})
export class LoanComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public lstloanlist: any;
  public url: any = "adminleaves";
  public tempId: any;
  public editId: any;
  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  public loantypelist=[];
  public getrecordforedit=[];
  public selectedRecord : {};
  public emplist=[];
  public addLoanForm: FormGroup;
  public editLoanForm: FormGroup;
  public editFromDate: any;
  public editToDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private data: DataServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {

    this.loadLoans();
    this.leaveCodedropdown();
    this.empdropdowncombo();
    // for floating label
    // $(".floating")
    //   .on("focus blur", function (e) {
    //     $(this)
    //       .parents(".form-focus")
    //       .toggleClass("focused", e.type === "focus" || this.value.length > 0);
    //   })
    //   .trigger("blur");

   
 // uid,employee,loantype,req_date, amount,noofintallment,monthly_deduction
  //  reason,approver,apr_date,Apr_status 
    this.addLoanForm = this.formBuilder.group({
      aempmaster_uid: ["", [Validators.required]],
      aleavetype_uid: ["", [Validators.required]],
      areq_date: ["", [Validators.required]],
      aamount: ["", [Validators.required]],
      anoofintallment: ["", [Validators.required]],
      amonthly_deduction: ["", [Validators.required]],
      areason: ["", [Validators.required]],
    });

    // Edit leaveadmin Form Validation And Getting Values

    this.editLoanForm = this.formBuilder.group({
      eempmaster_uid: ["", [Validators.required]],
      eloantype_uid: ["", [Validators.required]],
      ereq_date: ["", [Validators.required]],
      eamount: ["", [Validators.required]],
      enoofintallment: ["", [Validators.required]],
      emonthly_deduction: ["", [Validators.required]],
      ereason: ["", [Validators.required]],
    });

    // for data table configuration
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    //table status  click
    $(document).ready(function(){
      //First Row Datatable Grid status 
        $(".comShowHide").click(function(){
          alert();
        });
    });
      // First Row td End
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.lstloanlist = [];
    this.loadLoans();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  // Get leave  Api Call
  loadLoans() {
  // uid,employee,loantype,req_date, amount,noofintallment,monthly_deduction
  //  reason,approver,apr_date,Apr_status  
    let sql =""
    sql="SELECT l.uid, e.Firstname employee,lt.name loantype,DATE_FORMAT( l.req_date,'%d-%m-%Y')  req_date,amount,l.noofintallment," +
    " monthly_deduction,l.reason,a.firstname approver, l.apr_status" + 
    " FROM loansettings l INNER JOIN loantype lt ON lt.company_uid=l.Company_uid" + 
    " AND lt.uid=l.Loantype_uid" +
    " INNER JOIN empmaster e ON e.company_uid=l.Company_uid AND e.uid=l.empmaster_uid" + 
    " INNER JOIN empmaster a ON a.company_uid=l.Company_uid AND a.uid=l.apr_uid " +
    " WHERE l.company_uid='1'"
 
    this.data.runQuery(sql).subscribe((data) => {
       this.lstloanlist = data;
       console.log('load data')
       console.log(this.lstloanlist)
      this.rows = this.lstloanlist;
      this.srch = [...this.rows];
    });
  }

  // Add leaves for admin Modal Api Call
  addloan() {
    if (this.addLoanForm.valid) {
      let Requestdate = this.pipe.transform(
        this.addLoanForm.value.areq_date,
        "yyyy-MM-dd"
      );

    const amount=this.addLoanForm.value.aamount;
    const inst=this.addLoanForm.value.anoofintallment;
    const permonth=amount/inst;
     console.log('Per Month',permonth)
      let obj = {
        aempmaster_uid: this.addLoanForm.value.aempmaster_uid,
        aloantype_uid: this.addLoanForm.value.aleavetype_uid,
        areq_date: Requestdate,
        aamount: this.addLoanForm.value.aamount,
        anoofintallment: this.addLoanForm.value.anoofintallment,
        amonthly_deduction: permonth,  //this.addLoanForm.value.monthly_deduction,
        areason: this.addLoanForm.value.areason,
        aapr_status: "NEW",
      };

      var sql=""
sql="insert into loansettings( Company_uid,empmaster_uid,loantype_uid,req_date,"
+ "amount,noofintallment,monthly_deduction,reason,apr_status)values('1','" 
+ obj.aempmaster_uid  +"','" +  obj.aloantype_uid +"','"  + obj.areq_date +"','"  + obj.aamount +"','" + obj.anoofintallment +"','"
+ obj.amonthly_deduction +"','" + obj.areason +"','" + obj.aapr_status + "')"
console.log(sql);
//insert into leaverequest( Company_uid,empmaster_uid,loantype_uid,req_date,
 /// NaN6','undefined','06-07-2021','1200','6','200','nmjk','NEW')
this.data.runQuery(sql).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadLoans();
      $("#add_leave").modal("hide");
      this.addLoanForm.reset();
      this.toastr.success("Loan added sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }

  // to know the date picker changes

  fromdate(data) {
    this.editFromDate = this.pipe.transform(data, "dd-MM-yyyy");
  }
  todate(data) {
    this.editToDate = this.pipe.transform(data, "dd-MM-yyyy");
  }

  // Edit leaves Modal Api Call
  editLeaves() {
    if (this.editLoanForm.valid) {
    
      let fromDate = this.pipe.transform(
        this.editLoanForm.value.ereq_date,
        "yyyy-MM-dd"
      );
      const amount=this.editLoanForm.value.eamount;
      const inst=this.editLoanForm.value.enoofintallment;
      const permonth=amount/inst;
      let currentDate: Date = new Date();
     
      let obj = {
        eempmaster_uid: this.editLoanForm.value.eempmaster_uid,
        eloantype_uid: this.editLoanForm.value.eloantype_uid,
        ereq_date:  fromDate,
        eamount: this.editLoanForm.value.eamount,
        enoofintallment: this.editLoanForm.value.enoofintallment,
        emonthly_deduction: permonth,
        ereason:  this.editLoanForm.value.ereason,
        uid:this.editId
      };
 
      const sql = "update loansettings set empmaster_uid ='" + obj.eempmaster_uid + "'," + 
      "Loantype_uid ='" + obj.eloantype_uid + "'," +
      "req_date ='" + fromDate + "'," +
      "amount ='" + obj.eamount + "'," +
      "noofintallment ='" + obj.enoofintallment + "'," +
      "reason ='" + obj.ereason + "'," +
      "monthly_deduction ='" + obj.emonthly_deduction + "' where uid='" + obj.uid +"'"
      console.log(sql);

this.data.runQuery(sql).subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
      this.loadLoans();
      $("#edit_leave").modal("hide");
      this.toastr.success("Loan Updated sucessfully...!", "Success");
    } else {
      this.toastr.warning("Mandatory fields required", "");
    }
  }
 
 
 
  // Delete leaves Modal Api Call
  deleteleaves() {
      const sql = "Delete from loansettings  where uid =" + this.tempId
    this.data.runQuery(sql)
    .subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.loadLoans();
    $("#delete_approve").modal("hide");
    this.toastr.success("Leaves deleted sucessfully..!", "Success");
  }

  // To Get The leaves Edit Id And Set Values To Edit Modal Form

  edit(value)  {
    this.editId = value;
      var sql="SELECT empmaster_uid,loantype_uid,req_date,"+
    "amount,noofintallment,monthly_deduction,ifnull(reason,'None') reason from loansettings where uid=" + "'"+ this.editId +"'"
      console.log('sql',sql)
    this.data.runQuery(sql).subscribe(data => {
          this.getrecordforedit=data;
          this.selectedRecord=this.getrecordforedit[0];
          this.editFromDate = this.pipe.transform(this.selectedRecord['req_date'], "dd-MM-yyyy");
          this.editLoanForm.setValue(
            {  
            eempmaster_uid: this.selectedRecord['empmaster_uid'],
            eloantype_uid: this.selectedRecord['loantype_uid'],
            ereq_date:  this.editFromDate,
            eamount: this.selectedRecord['amount'],
            enoofintallment: this.selectedRecord['noofintallment'],
            emonthly_deduction: this.selectedRecord['monthly_deduction'],
            ereason:  this.selectedRecord['reason'],
       });
         });
        }
      
  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.employeeName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by status
  searchType(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.leaveType.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by purchase
  searchByFrom(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.from.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //search by warranty
  searchByTo(val) {
    let mySimpleFormat = this.pipe.transform(val, "dd-MM-yyyy");
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      return d.to.indexOf(mySimpleFormat) !== -1 || !mySimpleFormat;
    });
    this.rows.push(...temp);
    $(".floating")
      .on("focus blur", function (e) {
        $(this)
          .parents(".form-focus")
          .toggleClass("focused", e.type === "focus" || this.value.length > 0);
      })
      .trigger("blur");
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }


  leaveCodedropdown() {
    this.data.runQuery('SELECT uid,Name FROM loantype where company_uid=1;').subscribe((data) => {
       console.log(data)
      this.loantypelist = data
        
              });
                  
      }

      empdropdowncombo() {
        this.data.runQuery('SELECT uid,firstname Name FROM empmaster where company_uid=1;').subscribe((data) => {
           console.log(data)
          this.emplist = data
            console.log(this.emplist)
                  });
                      
          }
       installmentchange(e : Number) {
       console.log('going inside the function',e)
      // const inst: any  =  this.addLoanForm.get("anoofintallment").value;
      // const Amount: any  =  this.addLoanForm.get("aamount").value;
      // console.log('install:',inst)
      // this.addLoanForm.get('amonthly_deduction').setValue(Amount/inst);
    return 300;
    };
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
