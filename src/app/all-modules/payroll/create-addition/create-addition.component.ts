import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
//import { FormGroup, FormControl, Formuilder, Validators, FormArray, ValidatorFn, ValidationErrors, FormBuilder } from '@angular/forms';
import { FormGroup, FormBuilder,FormControl, Validators, FormArray , ValidatorFn, ValidationErrors} from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { DataServiceService } from "../../../service/data-service.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { DataTableDirective } from "angular-datatables";
import { getYear } from "date-fns";
import { getMonth } from "ngx-bootstrap";
@Component({
  // selector: "app-create-addition",
  templateUrl: "./create-addition.component.html",
})
export class CreateAdditionComponent implements OnInit {
  public addInvoiceForm: FormGroup;
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public total;
   public id;
   public pipe = new DatePipe("en-US");
  public employeelist :any[];
  public adddeductlist :any[];
  public filldetailsrecord =[];
  public itemfill :any[];
  public getrecordforedit = [];
  public selectedRecord : {};
  public edit :string;
  public uniqueid : any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private allModulesService: AllModulesService,
    private toastr: ToastrService,
    private data: DataServiceService,
    private formBuilder: FormBuilder,
  
  ) {}

  ngOnInit() {
   // let langArr = <FormArray>this.addInvoiceForm.controls["items"];
  //   langArr.controls[i].patchValue(true); 
    this.empdropdowncombo()
    this.adddeductcombo()
      this.addInvoiceForm = this.formBuilder.group({
      tyear: ["", [Validators.required]],
      tmonth: ["", [Validators.required]],
      entry_date: ["", [Validators.required]],
      other_information: ["", [Validators.required]],
      totalamount: ["", [Validators.required]],
     items: this.formBuilder.array([]),
    });
    this.addItems();
    //get id value of invoice list
   // this.id = this.route.snapshot.queryParams["id"];
    if (localStorage.getItem('edit')=='yes') 
{

  this.edit= localStorage.getItem('edit');
    this.id = localStorage.getItem('uid');
    this.uniqueid=this.id;
    localStorage.removeItem("edit");
    localStorage.removeItem("uid");
    this.formedit(this.uniqueid)
       // $('#button').attr('disabled','disabled');
    $("#dts-div").find("*").prop('disabled', true);
  
   // const items = (<FormArray>this.addInvoiceForm.get('items'));
    // for (let i = 0; i < items.length; i++) {
    // items.removeAt(i);
     // }
 
    }

}

  //function start
  //for adding new array
  get itemsList(): FormArray {
    return this.addInvoiceForm.get("items") as FormArray;
  }


  newItem(): FormGroup {
    return this.formBuilder.group({
      aempmaster_uid: "",
      altype_uid:"",
      description: "",
      amount: "",
    });
  }

  //for calculating total amount
  changePrice(i) {
      let total = 0;
    this.addInvoiceForm.get("items").value.forEach((item) => {
      total += Number(item.amount);
    });
    this.total = total;
    this.addInvoiceForm.get("totalamount").setValue(total);
   }

  addItems() {
    this.itemsList.push(this.newItem());
  }

  removeItems(i) {
    this.itemsList.removeAt(i);
   this.changePrice(i);
  }


  empdropdowncombo() {
    this.data.runQuery('SELECT uid,firstname Name FROM empmaster where company_uid=1;').subscribe((data) => { 
      console.log(data)
      this.employeelist = data
      console.log(this.employeelist)
      });
    }
    adddeductcombo() {
      this.data.runQuery("SELECT uid,code Name FROM adddeductmaster where company_uid=1 and action='1'").subscribe((data) => { 
        console.log(data)
        this.adddeductlist = data
        console.log(this.adddeductlist)
        });
      }
     //Fill item list on edit time
      fillitemlist(id) {
        let  sql="SELECT empmaster_uid aempmaster_uid,adddeduct_type_uid altype_uid,notes description,amount FROM adddeductdetail " + 
        " where adddeductheader_uid='"+ id +"'"
         this.data.runQuery(sql).subscribe((data) => { 
         this.itemfill = data;
        const control = <FormArray>this.addInvoiceForm.controls.items;
        control.clear();
        this.itemfill.forEach(x => {
          console.log(x)
          control.push(this.formBuilder.group(x));
        })
          },
      (error) => {
        throw error; 
       }
      );
}

      insertheaderanddetails()
      {
        //inserting data into header and detail table
        //find updated latest uid 
        console.log("Edit Region before calling save button", this.edit);
        this.savesend()
        
      }
      
        //find last id and get updated +1
  savesend()
  {
     if (this.edit=="yes")
     {
      console.log("Edit Region", this.edit);
       this.uniqueid=this.id ;
       this.headerinsert()
       this.loandetailinsert() 
     }
     else
     
      {   
      let sql =   "SELECT max(lastnumber)+1 uid from codegenerate where company_uid='1';"
             this.data.runQuery(sql).subscribe((data) => { 
             this.getrecordforedit=data;
              this.selectedRecord =this.getrecordforedit[0]
              this.uniqueid= 'NA'
              if (Number.isInteger( this.selectedRecord['uid']))
               {
                this.uniqueid= this.selectedRecord['uid'];
                this.getupdateduid(this.uniqueid) ;
                this.headerinsert();
                this.loandetailinsert() ;
              }
            },
            (error) => {
              throw error; 
             }
            );
    }  
   }      
        
          getupdateduid(guid : any)
            {
              let sql =   "update codegenerate set lastnumber='" + guid +"' where tablename='adddeductheader' and company_uid='1'"
              console.log(sql)   
              this.data.runQuery(sql).subscribe((data) => {
              });
            
              }

    headerinsert()
          {
            if (this.edit=="yes")
            {
             console.log('detail record to be deleted', this.edit )
              this.deletedetailrecords(); 
            }; //'delete if it is edit
              // this.tyear=  this.pipe.transform(data, "dd-MM-yyyy");
              let amount = this.addInvoiceForm.value.totalamount.toString();
              let invoiceDateFormat = this.pipe.transform(
               this.addInvoiceForm.value.entry_date,"dd-MM-yyyy");
              let obj = {
               uniqueid: this.uniqueid ,
               tyear: this.addInvoiceForm.value.tyear,
               tmonth: this.addInvoiceForm.value.tmonth,
               entry_date: invoiceDateFormat,
               other_information: this.addInvoiceForm.value.other_information,
               status: "Pending",
               totalamount: amount,};
     
                let sql=""
                if (this.edit=="yes")
                 {
                  console.log("edit header sql");
                   sql = "update adddeductheader set " + 
                   " tyear='" + obj.tyear + "',tmonth='" +    
                    obj.tmonth +  "',notes='" + obj.other_information +  "',amount='" + obj.totalamount +  "',ttype='ADD'" +
                    " where uid='"+ this.uniqueid +"'"  
                 }
                else
                 {
                  console.log("insert header sql");
                   sql =   "insert into adddeductheader (company_uid,uid,tyear,tmonth,notes,amount,ttype)" 
                   + " values( '1','" + obj.uniqueid  + "','" + obj.tyear + "','"   
                   + obj.tmonth +  "','" + obj.other_information +   "','" + obj.totalamount + "','ADD')" 
               
                 }
            
                 console.log(sql)   
                     this.data.runQuery(sql).subscribe((data) => {
                     },
                     (error) => {
                       throw error; 
                      }
                     );
                 
                }
          
            async loandetailinsert () {
             let getItems = this.addInvoiceForm.get("items").value;
             for (let  Item of getItems) {
              let sql="insert into adddeductdetail (adddeductheader_uid,"+ 
               "empmaster_uid,adddeduct_type_uid,amount,notes) values('" +  this.uniqueid +"','" +
               Item.aempmaster_uid +"','" + Item.altype_uid +"','" + Item.amount +"','" +
               Item.description +"')"
            
               await this.loandetailapi(sql);
                
               }
              }
             
             loandetailapi(sql:string) {
               console.log('detail insert query',sql);
             return  new Promise((resolve, reject) => {
               this.data.runQuery(sql).subscribe(resp => {
                 resolve(true);
               },
               (error) => {
                 throw error; 
                }
               );
              })
             }
           
          


              async formedit(id :number)  {
                this.id=id 
                var sql="select tyear,tmonth,entry_date,"+
                "amount,ifnull(notes,'None') notes from adddeductheader where uid=" + "'"+ this.id +"'"
                console.log('sql',sql)
                this.data.runQuery(sql).subscribe(data => {
                      this.getrecordforedit=data;
                      this.selectedRecord=this.getrecordforedit[0];
                      console.log(this.selectedRecord);
                    let tentrydate  = this.pipe.transform(this.selectedRecord['entry_date'], "dd-MM-yyyy");
                   
                     this.addInvoiceForm.patchValue(
                        {  
                          tyear: this.selectedRecord['tyear'],
                          tmonth: this.selectedRecord['tmonth'],
                          totalamount: this.selectedRecord['amount'],
                          entry_date:this.selectedRecord['entry_date'],
                          other_information: this.selectedRecord['notes'],
                       //   items: this.filldetailsrecord   //this.initFormArray ,  // this.filldetailsrecord //  this.setUsersForm() 
                          });
                         
                     });
                  this.fillitemlist(id); // fill records for items array
                                         
             }

  
  deletedetailrecords() {
  let sql = "Delete from adddeductdetail  where adddeductheader_uid =" + this.uniqueid
  console.log('delete reocord',sql);
  this.data.runQuery(sql)
   .subscribe((data) => {
  this.toastr.success("monthly addition deleted sucessfully..!", "Success");
  },
  (error) => {  throw error;  }
  );
 
} 

}
