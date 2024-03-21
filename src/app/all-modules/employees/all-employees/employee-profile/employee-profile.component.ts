import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
// import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { DataServiceService } from '../../../../service/data-service.service';
import { isDate } from "util";

declare const $: any;
@Component({
  // selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.css"],
})
export class EmployeeProfileComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) 
  public dtElement: DataTableDirective;
  public dtTrigger1: Subject<any> = new Subject();
  public dtOptions1: DataTables.Settings = {};
  public addEmployeeForm: FormGroup;
  public editEmpPersnalForm: FormGroup;
  public editEmployeeForm: FormGroup;
  public editBankForm: FormGroup;
  public editEmergencyDelForm: FormGroup;
  public lstPersnolEmployeeDetail: any[];
  public lstBankInfo: any[];
  public lstEmerDel: any[];
  public lstEmployee: any[];
  public pipe = new DatePipe("en-US");
  public DateOfBirth: any;
  public formtype :string
  public rows = [];
  public srch = [];
  public tempId: any;
  public editId: number;
  url: string | ArrayBuffer;
  public Joiningdate: any;
  public locationName: any = [];
  public departmentName: any = [];
  public designationName: any = [];
  public supervisorName: any = [];
  public gradeName: any = [];
  public siteName: any = [];
  public selected: any = [];
  public selectedRecord : {};
  public getrecordforedit : any[];
  constructor(
    // private srvModuleService: AllModulesService,
    private data: DataServiceService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  };
  ngOnInit(): void {
    //employee-profile.component
    this.addEmployeeForm = this.formBuilder.group({
      client: ["", [Validators.required]],
    });
    this.editEmpPersnalForm = this.formBuilder.group({
      Genter: ["", [Validators.required]],
      Religion: ["", [Validators.required]],
      Maritalstatus: ["", [Validators.required]],
      NoofChildren: ["", [Validators.required]],
      DateOfBirth: ["", [Validators.required]],
      Nationality: ["", [Validators.required]],
      PersonalPhoneNumber: ["", [Validators.required]],
      PersonalEmailAddress: ["", [Validators.required]],
      EmploymentOfSpouse: ["", [Validators.required]],
      BloodGroup: ["", [Validators.required]],
      EducationalQualifications: ["", [Validators.required]],
      WorkExperience: ["", [Validators.required]],
      SkillSet: ["", [Validators.required]],
      ReferenceDetails: ["", [Validators.required]],
      IdentityProofName: ["", [Validators.required]],
      IdentityProofDetails: ["", [Validators.required]],
      PresentAddress: ["", [Validators.required]],
      PresentAddress2: ["", [Validators.required]],
      PresentCityTown: ["", [Validators.required]],
      PresentPostal_code: ["", [Validators.required]],
      PermanentAddress: ["", [Validators.required]],
      PermanentAddress2: ["", [Validators.required]],
      PermanentCityTown: ["", [Validators.required]],
      PermanentPostal_code: ["", [Validators.required]],
      PresentCountry: ["", [Validators.required]],
      PresentState: ["", [Validators.required]],
      PermanentCountry: ["", [Validators.required]],
      PermanentState: ["", [Validators.required]],
    });

    // edit form validation
    this.editEmployeeForm = this.formBuilder.group({
      firstname: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      EmpCode: ["", [Validators.required]],
      Joiningdate: ["", [Validators.required]],
      EmpStatus: ["", [Validators.required]],
      CmpPhoneNo: ["", [Validators.required]],
      Location_uid: ["", [Validators.required]],
      Department_uid: ["", [Validators.required]],
      Designation_uid: ["", [Validators.required]],
      CompanyEmaiID: ["", [Validators.required]],
      UserID: ["", [Validators.required]],
      EmpPassword: ["", [Validators.required]],
      Salary: ["", [Validators.required]],
      EmpCurrency: ["", [Validators.required]],
      sitemaster_uid: ["", [Validators.required]],
      Supervisor_uid: ["", [Validators.required]],
      //Grade_uid: ["", [Validators.required]],
       EmpActive: ["", [Validators.required]],
    });

    
    this.editBankForm = this.formBuilder.group({
      BankName: ["", [Validators.required]],
      BankAccountName: ["", [Validators.required]],
      BankAccountNo: ["", [Validators.required]],
      IFSCCode: ["", [Validators.required]],
      PANno: ["", [Validators.required]],
      IBANno: ["", [Validators.required]],
    });

    
    this.editEmergencyDelForm = this.formBuilder.group({
      ContactName: ["", [Validators.required]],
      Relationship: ["", [Validators.required]],
      ContactNumber: ["", [Validators.required]],
      ContactEmailID: ["", [Validators.required]],
      Notes: ["", [Validators.required]],
    });
    this.loadEmployee();
    //this.loadPerDetails();
    //this.loadBankInfo();
    //this.loadEmerDel();
    this.Fillpaymentcombo();
  }

  Fillpaymentcombo() {
    this.data.runQuery('SELECT uid,code,name FROM location;').subscribe((data) => {
      console.log(data)
      this.locationName = data;
    });
    this.data.runQuery('SELECT uid,code,name FROM department;').subscribe((data) => {
      console.log(data)
      this.departmentName = data;
    });
    this.data.runQuery('SELECT uid,code,name FROM designation;').subscribe((data) => {
      console.log(data)
      this.designationName = data;
    });
    this.data.runQuery('SELECT uid,code,name FROM sitemaster;').subscribe((data) => {
      console.log(data)
      this.siteName = data;
    });
    this.data.runQuery('SELECT uid,code,name FROM grade;').subscribe((data) => {
      console.log(data)
      this.gradeName = data;
    });
    this.data.runQuery('SELECT uid,Empcode code,Firstname name  FROM empmaster;').subscribe((data) => {
      console.log(data)
      this.supervisorName = data;
    });
  }
  PmtSelected(event: any) {
      let selectElement = event.target;
      var optionIndex = selectElement.selectedIndex;
      var optionText = selectElement.options[optionIndex];
      this.selected=this.locationName[optionIndex-1];
      this.selected=this.departmentName[optionIndex-1];
      this.selected=this.siteName[optionIndex-1];
      this.selected=this.gradeName[optionIndex-1];
      this.selected=this.supervisorName[optionIndex-1];
      console.log(this.selected);
      //   this.addEmployeeForm = this.formBuilder.group({
      //   PackageAmount: this.selected['Amount'],
      //   NoofUserAllowed: this.selected['NoofUsers'],
      //   NoofEmployee: this.selected['NoofEmployee'],
      // });  
  }

  from(data) {
    this.Joiningdate = this.pipe.transform(data, "yyyy-MM-dd");
  }
  // to know the date picker changes

  

  // Load Employee Details
  loadEmployee() {
    let sql =""
    sql=" SELECT l.uid,l.company_uid, l.EmpCode,l.firstname,l.LastName," +
    " l.Joiningdate,l.EmpStatus,l.CmpPhoneNo,e.name  location,d.name department ," +
    " n.name designation,l.CompanyEmaiID, l.loginid,l.EmpPassword,l.Salary,l.empcurrency," +
    " s.name sitemaster,su.firstname supervisior," +
    " gr.name grade , l.status FROM empmaster l  " +
    " LEFT outer JOIN  location e  ON  l.Location_uid=e.uid" +
    " LEFT OUTER JOIN department d  ON   l.Department_uid=d.uid" +
    " LEFT outer JOIN designation n  ON   l.Designation_uid=n.uid" +
    " LEFT OUTER JOIN sitemaster s  ON l.sitemaster_uid=s.uid" +
    " LEFT outer JOIN empmaster su  ON  l.Supervisor_uid=su.uid" + 
    " LEFT outer JOIN grade gr  ON  l.Grade_uid=gr.uid "
  console.log(sql);
  this.data.runQuery(sql).subscribe((data) => {
    //this.data.runQuery('SELECT uid,company_uid,empmaster_uid,EmpCode,firstname,LastName,Joiningdate,EmpStatus,CmpPhoneNo,Location_uid,Department_uid,Designation_uid,CompanyEmaiID,UserID,EmpPassword,Salary,EmpCurrency,sitemaster_uid,Supervisor_uid,Grade_uid FROM empmaster;').subscribe((data) => {
      this.lstEmployee = data.map(item=>{return {uid:item.uid,
        empmaster_uid:item.empmaster_uid,
        EmpCode:item.EmpCode,
        firstname:item.firstname,
        LastName:item.LastName,
        Joiningdate:item.Joiningdate,
        CompanyEmaiID:item.CompanyEmaiID,
        EmpStatus:item.EmpStatus,
        CmpPhoneNo:item.CmpPhoneNo,
        department:item.department,
        designation:item.designation,
        sitemaster:item.sitemaster,
        supervisor:item.supervisor,
        location:item.location,
        grade:item.grade,
        empcurrency:item.empcurrency,
        status:item.empactive==='Y'? 'Active':'Inactive'}});
      
      this.dtTrigger1.next();
      this.rows = this.lstEmployee;
      this.srch = [...this.rows];
    });
  // }
  }
  

  // Edit Employee Details
  editEmployee() {
   console.log('formtype UPDATED',this.formtype)
   let sql='NOT UPDATED'
   console.log(sql)
   // if(this.editEmployeeForm.valid) {
     
      let Joiningdate = this.pipe.transform(
        this.editEmployeeForm.value.Joiningdate,
        "yyyy-MM-dd"
      );
    
    
      let obj = {
        uid: this.editId,
        firstname: this.editEmployeeForm.value.firstname,
        LastName: this.editEmployeeForm.value.LastName,
        Joiningdate: this.editEmployeeForm.value.Joiningdate,
        EmpCode: this.editEmployeeForm.value.EmpCode,
        EmpStatus: this.editEmployeeForm.value.EmpStatus,
        CmpPhoneNo: this.editEmployeeForm.value.CmpPhoneNo,
        Location_uid: this.editEmployeeForm.value.Location_uid,
        Department_uid: this.editEmployeeForm.value.Department_uid,
        Designation_uid: this.editEmployeeForm.value.Designation_uid,
        CompanyEmaiID: this.editEmployeeForm.value.CompanyEmaiID,
        UserID: this.editEmployeeForm.value.UserID,
        EmpPassword: this.editEmployeeForm.value.EmpPassword,
        EmpCurrency: this.editEmployeeForm.value.EmpCurrency,
        Salary: this.editEmployeeForm.value.Salary,
        sitemaster_uid: this.editEmployeeForm.value.sitemaster_uid,
        Supervisor_uid: this.editEmployeeForm.value.Supervisor_uid,
        Grade_uid: this.editEmployeeForm.value.Grade_uid,
        // EmpActive: this.editEmployeeForm.value.EmpActive,
        
      };

if (this.formtype=='EDIT')
{
      sql = "Update empmaster set firstname ='" + obj.firstname 
      + "',LastName ='" + obj.LastName 
      + "',Joiningdate ='" + Joiningdate 
      + "',EmpCode ='" + obj.EmpCode 
      + "',EmpStatus ='" + obj.EmpStatus 
      + "',CmpPhoneNo ='" + obj.CmpPhoneNo 
      + "',Location_uid ='" + obj.Location_uid 
      + "',Department_uid ='" + obj.Department_uid 
      + "',Designation_uid ='" + obj.Designation_uid 
      + "',CompanyEmaiID ='" + obj.CompanyEmaiID 
      + "',loginid ='" + obj.UserID 
      + "',EmpCurrency ='" + obj.EmpCurrency 
      + "',Salary ='" + obj.Salary 
      + "',EmpPassword ='" + obj.EmpPassword 
      + "',sitemaster_uid ='" + obj.sitemaster_uid
      + "',Supervisor_uid ='" + obj.Supervisor_uid 
     // + "',Grade_uid ='" + obj.Grade_uid 
      // + "',EmpActive ='" + obj.EmpActive 
      + "' where uid ='" + this.editId +"'"
      console.log(sql)
}
if (this.formtype=='NEW')
{
   sql = "insert into  empmaster ( company_uid,firstname,"+
  "LastName, Joiningdate,EmpCode,EmpStatus,CmpPhoneNo,Location_uid,Department_uid,"+
  "Designation_uid,CompanyEmaiID,loginid,EmpCurrency,EmpPassword,salary,sitemaster_uid,"+
  "Supervisor_uid ) values ('1','"+ obj.firstname +"','" + obj.LastName 
      +  "','" + Joiningdate  +"','"
       + obj.EmpCode 
      +  "','" + obj.EmpStatus  +"','"
      + obj.CmpPhoneNo  +"','"
      + obj.Location_uid  +"','"
      + obj.Department_uid  +"','"
      + obj.Designation_uid  +"','"
      + obj.CompanyEmaiID  +"','"
      + obj.UserID  +"','"
      + obj.EmpCurrency  +"','"
      + obj.EmpPassword  +"','"
      + obj.Salary  +"','"
      + obj.sitemaster_uid +"','"
      + obj.Supervisor_uid  +"')"
  
      console.log(sql)

      
    
      this.data.runQuery(sql).subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.loadEmployee();
        $("#edit_employee").modal("hide");
        this.toastr.success("Employeee Updated sucessfully...!", "Success");
        });
      }
          
    } 
 // }


  editEmp(value) {
    this.editId = value;
   console.log('uid value is ',value)
    //if ( this.editId==0) {this.formtype="NEW"} else {this.formtype=="EDIT"}
    this.formtype="EDIT"
    console.log('form type',this.formtype)
    var sql="SELECT uid,company_uid,EmpCode,firstname,LastName,Joiningdate," + 
    "EmpStatus,CmpPhoneNo,Location_uid,Department_uid,Designation_uid,CompanyEmaiID," + 
    "loginid,EmpPassword,Salary,EmpCurrency,sitemaster_uid,Supervisor_uid,EmpActive FROM empmaster where uid ='"+ this.editId +"'"
      console.log('sql edit',sql)
    this.data.runQuery(sql).subscribe(data => {
          this.getrecordforedit=data;
          this.selectedRecord=this.getrecordforedit[0];
     if (!isDate(this.selectedRecord['Joiningdate'])) 
     {this.Joiningdate=new Date()} else { this.Joiningdate= this.pipe.transform(this.selectedRecord['Joiningdate'], "dd-MM-yyyy")}
         console.log(this.Joiningdate)
         
          this.editEmployeeForm.setValue({ 
            firstname: this.selectedRecord['firstname'],
            LastName: this.selectedRecord['LastName'],
            Joiningdate: this.Joiningdate,
            EmpCode: this.selectedRecord['EmpCode'],
            EmpStatus: this.selectedRecord['EmpStatus'],
            CmpPhoneNo: this.selectedRecord['CmpPhoneNo'],
            Location_uid: this.selectedRecord['Location_uid'],
            Department_uid: this.selectedRecord['Department_uid'],
            Designation_uid: this.selectedRecord['Designation_uid'],
            CompanyEmaiID: this.selectedRecord['CompanyEmaiID'],
            UserID: this.selectedRecord['loginid'],
            EmpCurrency: this.selectedRecord['EmpCurrency'],
            Salary: this.selectedRecord['Salary'],
            EmpPassword: this.selectedRecord['EmpPassword'],
            sitemaster_uid: this.selectedRecord['sitemaster_uid'],
            Supervisor_uid: this.selectedRecord['Supervisor_uid'],
            EmpActive: this.selectedRecord['EmpActive']
            
       });
     // console.log(this.getrecordforedit)
    });
  }

  // /* 

  // loadPerDetails() {
  //   let sql =""
  //   sql= "SELECT * FROM emppersonaldetails;"
  //   console.log(sql);
  //     this.data.runQuery(sql).subscribe((data) => {
  //       this.lstPersnolEmployeeDetail = data.map(item=>{return {uid:item.uid,
  //         empmaster_uid:item.empmaster_uid,
  //         Genter:item.Genter,
  //         Religion:item.Religion,
  //         Maritalstatus:item.Maritalstatus,
  //         NoofChildren:item.NoofChildren,
  //         DateOfBirth:item.DateOfBirth,
  //         Nationality:item.Nationality,
  //         PersonalPhoneNumber:item.PersonalPhoneNumber,
  //         PersonalEmailAddress:item.PersonalEmailAddress,
  //         EmploymentOfSpouse:item.EmploymentOfSpouse,
  //         BloodGroup:item.BloodGroup,
  //         EducationalQualifications:item.EducationalQualifications,
  //         WorkExperience:item.WorkExperience,
  //         SkillSet:item.SkillSet,
  //         ReferenceDetails:item.ReferenceDetails,
  //         IdentityProofName:item.IdentityProofName,
  //         IdentityProofDetails:item.IdentityProofDetails,
  //         PresentAddress:item.PresentAddress,
  //         PresentAddress2:item.PresentAddress2,
  //         PermanentAddress:item.PermanentAddress,
  //         PermanentAddress2:item.PermanentAddress2,
  //         PresentPostal_code:item.PresentPostal_code,
  //         PresentCityTown:item.PresentCityTown,
  //         PermanentCityTown:item.PermanentCityTown,
  //         PermanentPostal_code:item.PermanentPostal_code,
  //         PresentCountry:item.PresentCountry,
  //         PresentState:item.PresentState,
  //         PermanentCountry:item.PermanentCountry,
  //         PermanentState:item.PermanentState,
  //       }});
  //       this.dtTrigger2.next();
  //       this.rows = this.lstPersnolEmployeeDetail;
  //       this.srch = [...this.rows];
  //     });
  //   }
  //   */ //Load Personal Details

    fromDOB(data) {
      this.DateOfBirth = this.pipe.transform(data, "yyyy-MM-dd");
    }

    editPersonalDetails() {
      if (this.editEmpPersnalForm.valid) {
        let DateOfBirth = this.pipe.transform(
          this.editEmpPersnalForm.value.DateOfBirth,
          "yyyy-MM-dd"
        );
        let obj = {
          uid: this.editId,
          Genter: this.editEmpPersnalForm.value.Genter,
          DateOfBirth: this.editEmpPersnalForm.value.DateOfBirth,
          Religion: this.editEmpPersnalForm.value.Religion,
          Maritalstatus: this.editEmpPersnalForm.value.Maritalstatus,
          NoofChildren: this.editEmpPersnalForm.value.NoofChildren,
          Nationality: this.editEmpPersnalForm.value.Nationality,
          PersonalPhoneNumber: this.editEmpPersnalForm.value.PersonalPhoneNumber,
          PersonalEmailAddress: this.editEmpPersnalForm.value.PersonalEmailAddress,
          EmploymentOfSpouse: this.editEmpPersnalForm.value.EmploymentOfSpouse,
          BloodGroup: this.editEmpPersnalForm.value.BloodGroup,
          EducationalQualifications: this.editEmpPersnalForm.value.EducationalQualifications,
          WorkExperience: this.editEmpPersnalForm.value.WorkExperience,
          SkillSet: this.editEmpPersnalForm.value.SkillSet,
          ReferenceDetails: this.editEmpPersnalForm.value.ReferenceDetails,
          IdentityProofName: this.editEmpPersnalForm.value.IdentityProofName,
          IdentityProofDetails: this.editEmpPersnalForm.value.IdentityProofDetails,
          PresentAddress: this.editEmpPersnalForm.value.PresentAddress,
          PresentAddress2: this.editEmpPersnalForm.value.PresentAddress2,
          PermanentAddress: this.editEmpPersnalForm.value.PermanentAddress,
          PermanentAddress2: this.editEmpPersnalForm.value.PermanentAddress2,
          PresentPostal_code: this.editEmpPersnalForm.value.PresentPostal_code,
          PresentCityTown: this.editEmpPersnalForm.value.PresentCityTown,
          PermanentCityTown: this.editEmpPersnalForm.value.PermanentCityTown,
          PermanentPostal_code: this.editEmpPersnalForm.value.PermanentPostal_code,
          PresentCountry: this.editEmpPersnalForm.value.PresentCountry,
          PresentState: this.editEmpPersnalForm.value.PresentState,
          PermanentCountry: this.editEmpPersnalForm.value.PermanentCountry,
          PermanentState: this.editEmpPersnalForm.value.PermanentState,
        };
        console.log(obj)
        // sulaiman start
        const sql = "Update empmaster set Gender ='" + obj.Genter
                    + "',DateOfBirth ='" + DateOfBirth
                    + "',Religion ='" + obj.Religion
                    + "',Maritalstatus ='" + obj.Maritalstatus
                    + "',NoofChildren ='" + obj.NoofChildren
                    + "',Nationality ='" + obj.Nationality
                    + "',PersonalPhoneNumber ='" + obj.PersonalPhoneNumber
                    + "',PersonalEmailAddress ='" + obj.PersonalEmailAddress
                    + "',EmploymentOfSpouse ='" + obj.EmploymentOfSpouse
                    + "',BloodGroup ='" + obj.BloodGroup
                    + "',EducationalQualifications ='" + obj.EducationalQualifications
                    + "',WorkExperience ='" + obj.WorkExperience
                    + "',SkillSet ='" + obj.SkillSet
                    + "',ReferenceDetails ='" + obj.ReferenceDetails
                    + "',IdentityProofName ='" + obj.IdentityProofName
                    + "',IdentityProofDetails ='" + obj.IdentityProofDetails
                    + "',PresentAddress ='" + obj.PresentAddress
                    + "',PresentAddress2 ='" + obj.PresentAddress2
                    + "',PermanentAddress ='" + obj.PermanentAddress
                    + "',PermanentAddress2 ='" + obj.PermanentAddress2
                    + "',PresentPostal_code ='" + obj.PresentPostal_code
                    + "',PresentCityTown ='" + obj.PresentCityTown
                    + "',PermanentCityTown ='" + obj.PermanentCityTown
                    + "',PermanentPostal_code ='" + obj.PermanentPostal_code
                    + "',PresentCountry ='" + obj.PresentCountry
                    + "',PresentState ='" + obj.PresentState
                    + "',PermanentCountry ='" + obj.PermanentCountry
                    + "',PermanentState ='" + obj.PermanentState
                    + "'where uid =" + this.editId
            console.log ('Update',sql)        
        this.data.runQuery(sql).subscribe((data) => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
         //   this.loadPerDetails();
            $("#personal_info_modal").modal("hide");
            // this.editEmpPersnalForm.reset();
            this.toastr.success("Personal Details Updated sucessfully...!", "Success");
          });
        });
      }
    }

    editPer(value) {
      this.editId = value;
       console.log(this.editId)
     let sql=""
      sql="SELECT Gender,Religion,Maritalstatus,Nationality,NoofChildren,DateOfBirth,DateOfBirth," + 
    "PersonalPhoneNumber,PersonalEmailAddress,EmploymentOfSpouse,BloodGroup,EducationalQualifications," + 
    "WorkExperience,SkillSet,ReferenceDetails,IdentityProofName,IdentityProofDetails,"+
    "PresentAddress,PresentAddress2,PermanentAddress,PermanentAddress2,PresentPostal_code,"+
   "PresentCityTown,PermanentCityTown,PermanentPostal_code,PresentCountry,PresentState,"+
    "PermanentCountry,PermanentState from empmaster where uid='" + this.editId +"'"
    console.log('sql edit',sql)
    
    this.data.runQuery(sql).subscribe(data => {
          this.getrecordforedit=data;
          this.selectedRecord=this.getrecordforedit[0];
          let DateOfBirth = this.pipe.transform(
            new Date(),"yyyy-MM-dd" );
          if (!isDate(this.selectedRecord['F'])) { let DateOfBirth=this.pipe.transform(
         new Date(),"yyyy-MM-dd" )} 
          else 
      { let DateOfBirth= this.pipe.transform(this.selectedRecord['DateOfBirth'], "dd-MM-yyyy")}
       
         console.log(this.selectedRecord)
      this.editEmpPersnalForm.setValue({
        Genter: this.selectedRecord['Gender'],   // added sulaiman
        Religion: this.selectedRecord['Religion'],
        NoofChildren: this.selectedRecord['NoofChildren'],
        Maritalstatus: this.selectedRecord['Maritalstatus'],
        DateOfBirth: DateOfBirth,
        Nationality: this.selectedRecord['Nationality'],
        PersonalPhoneNumber: this.selectedRecord['PersonalPhoneNumber'],
        PersonalEmailAddress: this.selectedRecord['PersonalEmailAddress'],
        EmploymentOfSpouse: this.selectedRecord['EmploymentOfSpouse'],
        BloodGroup: this.selectedRecord['BloodGroup'],
        EducationalQualifications: this.selectedRecord['EducationalQualifications'],
        WorkExperience: this.selectedRecord['WorkExperience'],
        SkillSet: this.selectedRecord['SkillSet'],
        ReferenceDetails: this.selectedRecord['ReferenceDetails'],
        IdentityProofName: this.selectedRecord['IdentityProofName'],
        IdentityProofDetails: this.selectedRecord['IdentityProofDetails'],
        PresentAddress: this.selectedRecord['PresentAddress'],
        PresentAddress2: this.selectedRecord['PresentAddress2'],
        PermanentAddress: this.selectedRecord['PermanentAddress'],
        PermanentAddress2: this.selectedRecord['PermanentAddress2'],
        PresentPostal_code: this.selectedRecord['PresentPostal_code'],
        PresentCityTown: this.selectedRecord['PresentCityTown'],
        PermanentCityTown: this.selectedRecord['PermanentCityTown'],
        PermanentPostal_code: this.selectedRecord['PermanentPostal_code'],
        PresentCountry: this.selectedRecord['PresentCountry'],
        PresentState: this.selectedRecord['PresentState'],
        PermanentCountry: this.selectedRecord['PermanentCountry'],
        PermanentState: this.selectedRecord['PermanentState'],
      })

      
      }); 
    }



    // loadBankInfo() {
    //   let sql =""
    //   sql= "SELECT * FROM empbankinformation;"
    //   console.log(sql);
    //     this.data.runQuery(sql).subscribe((data) => {
    //       this.lstBankInfo = data.map(item=>{return {uid:item.uid,
    //         empmaster_uid:item.empmaster_uid,
    //         BankName:item.BankName,
    //         BankAccountName:item.BankAccountName,
    //         BankAccountNo:item.BankAccountNo,
    //         IFSCCode:item.IFSCCode,
    //         PANno:item.PANno,
    //         IBANno:item.IBANno,
    //       }});
    //       this.dtTrigger3.next();
    //       this.rows = this.lstBankInfo;
    //       this.srch = [...this.rows];
    //     });
    // }


    editBank() {
      if (this.editBankForm.valid) {
        let obj = {
          uid: this.editId,
          BankName: this.editBankForm.value.BankName,
          BankAccountName: this.editBankForm.value.BankAccountName,
          BankAccountNo: this.editBankForm.value.BankAccountNo,
          IFSCCode: this.editBankForm.value.IFSCCode,
          PANno: this.editBankForm.value.PANno,
          IBANno: this.editBankForm.value.IBANno,
        };
        console.log(obj)
        // sulaiman start
        const sql = "Update empmaster set BankName ='" + obj.BankName
                    + "',BankAccountName ='" + obj.BankAccountName
                    + "',BankAccountNo ='" + obj.BankAccountNo
                    + "',IFSCCode ='" + obj.IFSCCode
                    + "',PANno ='" + obj.PANno
                    + "',IBANno ='" + obj.IBANno
                    + "' where uid =" + this.editId
      console.log('update Ayya',sql)
                    this.data.runQuery(sql).subscribe((data) => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
      //      this.loadBankInfo();
            $("#edit_bank").modal("hide");
            // this.editEmpPersnalForm.reset();
            this.toastr.success("Bank Information Updated sucessfully...!", "Success");
          });
        });
      }
    }

    editBankINFO(value) {
     this.editId = value;
     console.log(this.editId)
     let sql=""
     sql="SELECT BankName,BankAccountName,BankAccountNo,IFSCCode," +
     "PANno,IBANno from empmaster where uid='" + this.editId +"'"
     console.log('sql edit',sql)
       
   this.data.runQuery(sql).subscribe(data => {
   this.getrecordforedit=data;
   this.selectedRecord=this.getrecordforedit[0];
   console.log(this.selectedRecord)
   this.editBankForm.setValue({
        BankName: this.selectedRecord['BankName'],
        BankAccountName: this.selectedRecord['BankAccountName'],
        BankAccountNo:this.selectedRecord['BankAccountNo'],
        IFSCCode: this.selectedRecord['IFSCCode'],
        PANno: this.selectedRecord['PANno'],
        IBANno: this.selectedRecord['IBANno'],
      })

    }); 
  }


    // loadEmerDel() {
    //   let sql =""
    //   sql= "SELECT * FROM empemergencydetails;"
    //   console.log(sql);
    //     this.data.runQuery(sql).subscribe((data) => {
    //       this.lstEmerDel = data.map(item=>{return {uid:item.uid,
    //         empmaster_uid:item.empmaster_uid,
    //         ContactName:item.ContactName,
    //         Relationship:item.Relationship,
    //         ContactNumber:item.ContactNumber,
    //         ContactEmailID:item.ContactEmailID,
    //         Notes:item.Notes,
    //       }});
    //       this.dtTrigger4.next();
    //       this.rows = this.lstEmerDel;
    //       this.srch = [...this.rows];
    //     });
    // }

     editEmergencyDel() {
      if (this.editEmergencyDelForm.valid) {
        let obj = {
          uid: this.editId,
          ContactName: this.editEmergencyDelForm.value.ContactName,
          Relationship: this.editEmergencyDelForm.value.Relationship,
          ContactNumber: this.editEmergencyDelForm.value.ContactNumber,
          ContactEmailID: this.editEmergencyDelForm.value.ContactEmailID,
          Notes: this.editEmergencyDelForm.value.Notes,
        };
        console.log(obj)
        // sulaiman start
        const sql = "Update empmaster set ContactName ='" + obj.ContactName
                    + "',Relationship ='" + obj.Relationship
                    + "',ContactNumber ='" + obj.ContactNumber
                    + "',ContactEmailID ='" + obj.ContactEmailID
                    + "',Notes ='" + obj.Notes
                    + "'where uid =" + this.editId
        this.data.runQuery(sql).subscribe((data) => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
       //     this.loadEmerDel();
            $("#edit_EmergencyDel").modal("hide");
            // this.editEmpPersnalForm.reset();
            this.toastr.success("Emergency Details Updated sucessfully...!", "Success");
          });
        });
      }
    }

    editEmerDel(value) {
      this.editId = value;
      console.log(this.editId)
      // set the value from grid row by passing the id value
      const index = this.lstEmerDel.findIndex((item) => {
        return item.uid === value;
      });
      let toSetValues = this.lstEmerDel[index];
      console.log(toSetValues)
      this.editEmergencyDelForm.setValue({
          ContactName: toSetValues.ContactName,
          Relationship: toSetValues.Relationship,
          ContactNumber: toSetValues.ContactNumber,
          ContactEmailID: toSetValues.ContactEmailID,
          Notes: toSetValues.Notes,
      });
    }


  // addPersonalDetails() {
  //   if (this.addEmpPersnalForm.valid) {
      
  //     let obj = {
  //       Genter: this.addEmpPersnalForm.value.Genter,
  //       Religion: this.addEmpPersnalForm.value.Religion,
  //       uid: 0,
  //     };
  //     const sql = "insert into emppersonaldetails (empmaster_uid,Genter,Religion) values ('1','1','" 
  //      + obj.Genter + "','" + obj.Religion + "')"
  //     console.log(obj);
  //     this.data.runQuery(sql)
  //     .subscribe((data) => {
  //       // $("#datatable").DataTable().clear();
  //       this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //         dtInstance.destroy();
  //       });
  //       console.log(sql);
  //       this.loadPerDetails();
  //       //$("#personal_info_modal").modal("hide");
  //       this.addEmpPersnalForm.reset();
  //       this.toastr.success("Employee Personal Details added sucessfully...!", "Success");
  //     });
  //   }
  // }

  

    

  onSubmit() {
    this.toastr.success("Bank & statutory added", "Success");
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger1.unsubscribe();
  }
}
