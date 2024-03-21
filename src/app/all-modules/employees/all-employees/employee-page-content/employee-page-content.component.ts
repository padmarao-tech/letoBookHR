import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { id } from "src/assets/all-modules-data/id";
import { FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';
import 'jspdf';

declare let jsPDF: new () => any;
declare const $: any;
@Component({
  // selector: "app-employee-page-content",
  templateUrl: "./employee-page-content.component.html",
  styleUrls: ["./employee-page-content.component.css"],
})
export class EmployeePageContentComponent implements OnInit {
  c_name  = new  FormControl('');
  c_relationship = new  FormControl('');
  c_no =  new FormControl('');
  c_email_id =  new FormControl(''); 
  notes = new FormControl(''); 
   
  public lstEmployee: any[];
  public url: any = "employeelist";
  public tempId: any;
  public editId: any;
  public addEmployeeForm: FormGroup;
  public editEmployeeForm: FormGroup;
  public addEmployeeForm1: FormGroup;

  public pipe = new DatePipe("en-US");
  public rows = [];
  public srch = [];
  public statusValue;
  constructor(
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
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
  ngOnInit() {
    // $(document).ready(function(){
    //   $(".prtEmpDetails").click(function(){
    //       var pdf = new jsPDF();
    //       pdf.autoPrint();
    //   });
    // });
    $(document).ready(function(){
      $(".bdfButtomTable").click(function(){
        var pdf = new jsPDF();
        var octocatPNG = './assets/img/login-logo.png';
        pdf.addImage(octocatPNG, "PNG", 9, 5, 25, 10);
        //Employee Details
        var firstname = $( 'input[name=firstname]').val();
        var lastname = $('input[name=lastname]').val();
        var JoingDate = $('input[name=joingDate]').val();
        var EmployeeId = $('input[name=Emp_id]').val();
        var Employment_Status = $('select[name=employment_status]').val();
        var Company_Phone = $('input[name=company_phone]').val();
        var Location = $('select[name=location]').val();
        var Department = $('select[name=department]').val();
        var Designation = $('select[name=designation]').val();
        var EmployeeCompanyEmailID = $('input[name=Emp_CompanyEmailID]').val();
        var UserId = $('input[name=user_id]').val();
        var UserPassword = $('input[name=user_password]').val();
        var Supervisor = $('select[name=supervisor]').val();
        var Active = $('input[name=onoffswitch]').val();

        

        pdf.setFillColor(227,227,227);
        pdf.rect(11, 44, 45, 10, 'F');
        pdf.rect(11, 44, 45, 10);
        pdf.rect(56, 44, 49, 10);

        pdf.rect(105, 44, 47, 10, 'F');
        pdf.rect(105, 44, 47, 10);
        pdf.rect(152, 44, 49, 10);

        pdf.rect(11, 54, 45, 10, 'F');
        pdf.rect(11, 54, 45, 10);
        pdf.rect(56, 54, 49, 10);

        pdf.rect(105, 54, 47, 10, 'F');
        pdf.rect(105, 54, 47, 10);
        pdf.rect(152, 54, 49, 10);

        pdf.rect(11, 64, 45, 10, 'F');
        pdf.rect(11, 64, 45, 10);
        pdf.rect(56, 64, 49, 10);

        pdf.rect(105, 64, 47, 10, 'F');
        pdf.rect(105, 64, 47, 10);
        pdf.rect(152, 64, 49, 10);

        pdf.rect(11, 74, 45, 10, 'F');
        pdf.rect(11, 74, 45, 10);
        pdf.rect(56, 74, 49, 10);

        pdf.rect(105, 74, 47, 10, 'F');
        pdf.rect(105, 74, 47, 10);
        pdf.rect(152, 74, 49, 10);

        pdf.rect(11, 84, 45, 15, 'F');
        pdf.rect(11, 84, 45, 15);
        pdf.rect(56, 84, 49, 15);

        pdf.rect(105, 84, 47, 15, 'F');
        pdf.rect(105, 84, 47, 15);
        pdf.rect(152, 84, 49, 15);

        pdf.rect(11, 99, 45, 10, 'F');
        pdf.rect(11, 99, 45, 10);
        pdf.rect(56, 99, 49, 10);

        pdf.rect(105, 99, 47, 10, 'F');
        pdf.rect(105, 99, 47, 10);
        pdf.rect(152, 99, 49, 10);

        pdf.rect(11, 109, 45, 10, 'F');
        pdf.rect(11, 109, 45, 10);
        pdf.rect(56, 109, 49, 10);

        pdf.rect(105, 109, 47, 10, 'F');
        pdf.rect(105, 109, 47, 10);
        pdf.rect(152, 109, 49, 10);


        
        

        var specialElementHandlers = {
          '.button': function(element, renderer){
            return true;
          },
          '.controls': function(element, renderer){
            return true;
          }
        };

        pdf.setFontSize(7);
        pdf.fromHTML($('#CompanyName').get(0), 11, 12, {
          'width': 170, 
          'elementHandlers': specialElementHandlers
        });

        pdf.setFontSize(4);
        pdf.fromHTML($('#CompanyAddress').get(0), 11, 14, {
          'width': 170, 
          'elementHandlers': specialElementHandlers
        });

        
        pdf.setFontSize(16);
        pdf.fromHTML($('#EmpDetailsTitle').get(0), 88, 32, {
          'width': 170, 
          'elementHandlers': specialElementHandlers
        });

        // pdf.setFontSize(7);
        // pdf.fromHTML($('#CompanyLogo').get(0), 11, 8, {
        //   'width': 170, 
        //   'elementHandlers': specialElementHandlers
        // });

        // pdf.setFontSize(7);
        // pdf.fromHTML($('#CompanyName1').get(0), 11, 13, {
        //   'width': 170, 
        //   'elementHandlers': specialElementHandlers
        // });

        
        // pdf.setFontSize(16);
        // pdf.fromHTML($('#EmpDetailsTitle1').get(0), 88, 32, {
        //   'width': 170, 
        //   'elementHandlers': specialElementHandlers
        // });

        pdf.setFontSize(11);
        pdf.text("First Name" , 13,50);pdf.text(firstname , 60,50);
        pdf.text("Last Name" , 107,50);pdf.text(lastname , 154,50);

        pdf.text("Joing Date" , 13,60);pdf.text(JoingDate , 60,60);
        pdf.text("Employee Id" , 107,60);pdf.text(EmployeeId , 154,60);

        pdf.text("Employment Status" , 13,70);pdf.text(Employment_Status , 60,70);
        pdf.text("Company Phone" , 107,70);pdf.text(Company_Phone , 154,70);

        pdf.text("Location" , 13,80);pdf.text(Location , 60,80);
        pdf.text("Department" , 107,80);pdf.text(Department , 154,80);

        pdf.text("Designation" , 13,93);pdf.text(Designation , 60,93);
        pdf.text("Employee Company" , 107,90);pdf.text("Email Id" , 107,95);pdf.text(EmployeeCompanyEmailID , 154,93);

        pdf.text("User Id" , 13,105);pdf.text(UserId , 60,105);
        pdf.text("User Password" , 107,105);pdf.text(UserPassword , 154,105);

        pdf.text("Supervisor" , 13,115);pdf.text(Supervisor , 60,115);
        pdf.text("Active" , 107,115);pdf.text(Active , 154,115);


        pdf.setFontSize(16);
        pdf.fromHTML($('#PersonalDetails').get(0), 88, 120, {
          'width': 170, 
          'elementHandlers': specialElementHandlers
        });

        

        //Personal Details
        pdf.setFillColor(227,227,227);
        pdf.rect(11, 130, 45, 10, 'F');
        pdf.rect(11, 130, 45, 10);
        pdf.rect(56, 130, 49, 10);

        pdf.rect(105, 130, 47, 10, 'F');
        pdf.rect(105, 130, 47, 10);
        pdf.rect(152, 130, 49, 10);

        pdf.rect(11, 140, 45, 10, 'F');
        pdf.rect(11, 140, 45, 10);
        pdf.rect(56, 140, 49, 10);

        pdf.rect(105, 140, 47, 10, 'F');
        pdf.rect(105, 140, 47, 10);
        pdf.rect(152, 140, 49, 10);

        pdf.rect(11, 150, 45, 10, 'F');
        pdf.rect(11, 150, 45, 10);
        pdf.rect(56, 150, 49, 10);

        pdf.rect(105, 150, 47, 10, 'F');
        pdf.rect(105, 150, 47, 10);
        pdf.rect(152, 150, 49, 10);

        pdf.rect(11, 160, 45, 10, 'F');
        pdf.rect(11, 160, 45, 10);
        pdf.rect(56, 160, 49, 10);

        pdf.rect(105, 160, 47, 10, 'F');
        pdf.rect(105, 160, 47, 10);
        pdf.rect(152, 160, 49, 10);

        pdf.rect(11, 170, 45, 10, 'F');
        pdf.rect(11, 170, 45, 10);
        pdf.rect(56, 170, 49, 10);

        pdf.rect(105, 170, 47, 10, 'F');
        pdf.rect(105, 170, 47, 10);
        pdf.rect(152, 170, 49, 10);

        pdf.rect(11, 180, 50, 10, 'F');
        pdf.rect(11, 180, 50, 10);
        pdf.rect(61, 180, 140, 10);

        pdf.rect(11, 190, 50, 10, 'F');
        pdf.rect(11, 190, 50, 10);
        pdf.rect(61, 190, 140, 10);

        pdf.rect(11, 200, 50, 10, 'F');
        pdf.rect(11, 200, 50, 10);
        pdf.rect(61, 200, 140, 10);

        pdf.rect(11, 210, 50, 10, 'F');
        pdf.rect(11, 210, 50, 10);
        pdf.rect(61, 210, 140, 10);

        pdf.rect(11, 220, 45, 10, 'F');
        pdf.rect(11, 220, 45, 10);
        pdf.rect(56, 220, 49, 10);

        pdf.rect(105, 220, 47, 10, 'F');
        pdf.rect(105, 220, 47, 10);
        pdf.rect(152, 220, 49, 10);

        pdf.rect(11, 230, 69, 10, 'F');
        pdf.rect(11, 230, 69, 10);
        pdf.rect(11, 240, 69, 40);

        pdf.rect(80, 230, 78, 10, 'F');
        pdf.rect(80, 230, 78, 10);
        pdf.rect(80, 240, 78, 40);

        pdf.rect(158, 230, 43, 10, 'F');
        pdf.rect(158, 230, 43, 10);
        pdf.rect(158, 240, 43, 40);
      

        //Personal Details
        var Genter = $('select[name=genter]').val();
        var DateOfBirth =  $('input[name=dob]').val();
        var Relegion =  $('select[name=Relegion]').val();
        var Nationality =  $('select[name=nationality]').val();
        var MaritalStatus =  $('select[name=marital_status]').val();
        var NoOfChildren =  $('input[name=noofChildren]').val();
        var PersnolPhoneNumber =  $('input[name=PersnolPhoneNumber]').val();
        var PersnolEmailAddress =  $('input[name=PersnolEmailAddress]').val();
        var OnOffWwitch =  $('input[name=onoffswitch]').val();
        var BloodGroup =  $('select[name=blood_group]').val();
        var EducationalQualifications =  $('textarea[name=EducationalQualifications]').val();
        var WorkExperience =  $('textarea[name=work_experience]').val();
        var SkillSet =  $('textarea[name=skillSet]').val();
        var ReferenceDetails =  $('textarea[name=reference_details]').val();
        var IdentityProofName =  $('select[name=IdentityProofName]').val();
        var IdentityProofDetails =  $('input[name=IdentityProofDetails]').val();

        //PresentAddress
        var PresentAddress1 =  $('input[name=present_address1]').val();
        var PresentAddress2 =  $('input[name=present_address2]').val();
        var PresentCityTown =  $('input[name=PresentCityTown]').val();
        var PresentCountry =  $('input[name=PresentCountry]').val();
        var PostalCode =  $('input[name=postal_code]').val();
        var State =  $('input[name=state]').val();

        //Permanent Address
        var PermanentAddress1 =  $('input[name=permanent_address1]').val();
        var PermanentAddress2 =  $('input[name=permanent_address2]').val();
        var PermanentCityTown =  $('input[name=PermanentCityTown]').val();
        var PermanentCountry =  $('input[name=PermanentCountry]').val();
        var PostalCode2 =  $('input[name=postal_code2]').val();
        var State2 =  $('input[name=state2]').val();


        var EmployeePhoto =  $('input[name=Employee_Photo]').val();

        pdf.setFontSize(11);
        pdf.text("Genter" ,13,136);pdf.text(Genter ,60,136);
        pdf.text("Date Of Birth" ,107,136);pdf.text(DateOfBirth ,154,136);
        pdf.text("Relegion" ,13,146);pdf.text(Relegion ,60,146);
        pdf.text("Nationality" ,107,146);pdf.text(Nationality ,154,146);
        pdf.text("Marital Status" ,13,156);pdf.text(MaritalStatus ,60,156);
        pdf.text("No Of Children" ,107,156);pdf.text(NoOfChildren ,154,156);
        pdf.text("Persnol Phone Number" ,13,166);pdf.text(PersnolPhoneNumber ,60,166);
        pdf.text("Persnol Email Address" ,107,166);pdf.text(PersnolEmailAddress ,154,166);
        pdf.text("Employment Of Spouse" ,13,176);pdf.text(OnOffWwitch ,60,176);
        pdf.text("Blood Group" ,107,176);pdf.text(BloodGroup ,154,176);
        pdf.text("Educational Qualifications" ,13,186);pdf.text(EducationalQualifications ,63,186);
        pdf.text("Work Experience" ,13,196);pdf.text(WorkExperience ,63,196);
        pdf.text("Skill Set" ,13,206);pdf.text(SkillSet ,63,206);
        pdf.text("Reference Details" ,13,216);pdf.text(ReferenceDetails ,63,216);
        pdf.text("Identity Proof Name" ,13,226);pdf.text(IdentityProofName ,60,226);
        pdf.text("Identity Proof Details" ,107,226);pdf.text(IdentityProofDetails ,154,226);

        //Present Address
        pdf.text("Present Address" ,13,236);
        pdf.text(PresentAddress1 ,13,246);
        pdf.text(PresentAddress2 ,13,251);
        pdf.text(PresentCityTown ,13,256);
        pdf.text(PresentCountry ,13,261);
        pdf.text(PostalCode ,13,266);
        pdf.text(State ,13,271);

        //Permanent Address
        pdf.text("Permanent Address" ,82,236);
        pdf.text(PermanentAddress1 ,82,246);
        pdf.text(PermanentAddress2 ,82,251);
        pdf.text(PermanentCityTown ,82,256);
        pdf.text(PermanentCountry ,82,261);
        pdf.text(PostalCode2 ,82,266);
        pdf.text(State2 ,82,271);

        pdf.text("Employee Photo" ,160,236);pdf.text(EmployeePhoto ,160,246);

        pdf.addPage();
        pdf.setFontSize(16);
        pdf.fromHTML($('#BankInformationTitle').get(0), 92, 15, {
          'width': 170, 
          'elementHandlers': specialElementHandlers
        });

        pdf.setFillColor(227,227,227);
        pdf.rect(11, 27, 45, 10, 'F');
        pdf.rect(11, 27, 45, 10);
        pdf.rect(56, 27, 49, 10);

        pdf.rect(105, 27, 47, 10, 'F');
        pdf.rect(105, 27, 47, 10);
        pdf.rect(152, 27, 49, 10);

        pdf.rect(11, 37, 45, 10, 'F');
        pdf.rect(11, 37, 45, 10);
        pdf.rect(56, 37, 49, 10);

        pdf.rect(105, 37, 47, 10, 'F');
        pdf.rect(105, 37, 47, 10);
        pdf.rect(152, 37, 49, 10);

        pdf.rect(11, 47, 45, 10, 'F');
        pdf.rect(11, 47, 45, 10);
        pdf.rect(56, 47, 49, 10);

        pdf.rect(105, 47, 47, 10, 'F');
        pdf.rect(105, 47, 47, 10);
        pdf.rect(152, 47, 49, 10);

        var BankName =  $('select[name=BankName]').val();
        var BankAccountName =  $('input[name=BankAccountName]').val();
        var BankAccountNo =  $('input[name=BankAccountNo]').val();
        var IFSCCode =  $('input[name=ifscCode]').val();
        var PAN_No =  $('input[name=pan_no]').val();
        var IBAN_NO =  $('input[name=iban_no]').val();

        pdf.setFontSize(11);
        pdf.text("Bank Name" , 13,33);pdf.text(BankName , 60,33);
        pdf.text("Bank Account Name" , 107,33);pdf.text(BankAccountName , 154,33);
        pdf.text("Bank Account No" , 13,43);pdf.text(BankAccountNo , 60,43);
        pdf.text("IFSC Code" , 107,43);pdf.text(IFSCCode , 154,43);
        pdf.text("PAN No" , 13,53);pdf.text(PAN_No , 60,53);
        pdf.text("IBAN NO" , 107,53);pdf.text( IBAN_NO , 154,53);

        pdf.setFontSize(16);
        pdf.fromHTML($('#EmergencyDetailsTitle').get(0), 92, 57, {
          'width': 170, 
          'elementHandlers': specialElementHandlers
        });

        pdf.setFillColor(227,227,227);
        pdf.rect(11, 67, 45, 10, 'F');
        pdf.rect(11, 67, 45, 10);
        pdf.rect(56, 67, 49, 10);

        pdf.rect(105, 67, 47, 10, 'F');
        pdf.rect(105, 67, 47, 10);
        pdf.rect(152, 67, 49, 10);

        pdf.rect(11, 77, 45, 10, 'F');
        pdf.rect(11, 77, 45, 10);
        pdf.rect(56, 77, 49, 10);

        pdf.rect(105, 77, 47, 10, 'F');
        pdf.rect(105, 77, 47, 10);
        pdf.rect(152, 77, 49, 10);

        pdf.rect(11, 87, 15, 10, 'F');
        pdf.rect(11, 87, 15, 10);
        pdf.rect(26, 87, 175, 10);


        var ContactName =  $('input[name=contact_name]').val();
        var Relationship =  $('input[name=relationship]').val();
        var ContactNumber =  $('input[name=contact_no]').val();
        var ContactEmailID =  $('input[name=contact_emailId]').val();
        var Notes =  $('textarea[name=notes]').val();

        pdf.setFontSize(11);
        pdf.text("Contact Name" , 13,73);pdf.text(ContactName , 60,73);
        pdf.text("Relationship" , 107,73);pdf.text(Relationship , 154,73);
        pdf.text("Contact Number" , 13,83);pdf.text(ContactNumber , 60,83);
        pdf.text("Contact Email ID" , 107,83);pdf.text(ContactEmailID , 154,83);
        pdf.text("Notes" , 13,93);pdf.text(Notes , 28,93);

        pdf.save("Employee_Details.pdf");
      });
    });

    this.loadEmployee();
    this.addEmployeeForm = this.formBuilder.group({
      //Employee Details
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      JoiningDate: ["", [Validators.required]],
      EmployeeID: ["", [Validators.required]],
      EmploymentStatus: ["", [Validators.required]],
      CompanyPhone: ["", [Validators.required]],
      Location: ["", [Validators.required]],
      Department: ["", [Validators.required]],
      Designation: ["", [Validators.required]],
      EmpCompanyEmailID: ["", [Validators.required]],
      UserId: ["", [Validators.required]],
      UserPassword: ["", [Validators.required]],
      Supervisor: ["", [Validators.required]],

      //Personal Details
      Genter: ["", [Validators.required]],
      DOB: ["", [Validators.required]],
      Relegion: ["", [Validators.required]],
      Nationality: ["", [Validators.required]],
      MaritalStatus: ["", [Validators.required]],
      NoOfChildren: ["", [Validators.required]],
      PersnolPhoneNumber: ["", [Validators.required]],
      PersnolEmailAddress: ["", [Validators.required]],
      BloodGroup: ["", [Validators.required]],
      EducationalQualifications: ["", [Validators.required]],
      WorkExperience: ["", [Validators.required]],
      SkillSet: ["", [Validators.required]],
      ReferenceDetails: ["", [Validators.required]],
      IdentityProofName: ["", [Validators.required]],
      IdentityProofDetails: ["", [Validators.required]],

      Address1: ["", [Validators.required]],
      Address2: ["", [Validators.required]],
      CityTown: ["", [Validators.required]],
      PostalCode: ["", [Validators.required]],
      Country: ["", [Validators.required]],
      State: ["", [Validators.required]],

      PermanentAddress1: ["", [Validators.required]],
      PermanentAddress2: ["", [Validators.required]],
      CityTown2: ["", [Validators.required]],
      PostalCode2: ["", [Validators.required]],
      Country2: ["", [Validators.required]],
      State2: ["", [Validators.required]],

      //Bank Information
      BankName: ["", [Validators.required]],
      BankAccountName: ["", [Validators.required]],
      BankAccountNo: ["", [Validators.required]],
      IFSCCode: ["", [Validators.required]],
      PAN_NO: ["", [Validators.required]],
      IBAN_NO: ["", [Validators.required]],


      //Emergency Details
      ContactName: ["", [Validators.required]],
      Relationship: ["", [Validators.required]],
      ContactNumber: ["", [Validators.required]],
      ContactEmailID: ["", [Validators.required]],
      Notes: ["", [Validators.required]],


      UserName: ["", [Validators.required]],
      Password: ["", [Validators.required]],
      ConfirmPassword: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
      // Designation: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      PhoneNumber: ["", [Validators.required]],
      JoinDate: ["", [Validators.required]],
      CompanyName: ["", [Validators.required]],
      // EmployeeID: ["", [Validators.required]],
    });

    this.editEmployeeForm = this.formBuilder.group({
      //Employee Details
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      JoiningDate: ["", [Validators.required]],
      EmployeeID: ["", [Validators.required]],
      EmploymentStatus: ["", [Validators.required]],
      CompanyPhone: ["", [Validators.required]],
      Location: ["", [Validators.required]],
      Department: ["", [Validators.required]],
      Designation: ["", [Validators.required]],
      EmpCompanyEmailID: ["", [Validators.required]],
      UserId: ["", [Validators.required]],
      UserPassword: ["", [Validators.required]],
      Supervisor: ["", [Validators.required]],

      //Personal Details
      Genter: ["", [Validators.required]],
      DOB: ["", [Validators.required]],
      Relegion: ["", [Validators.required]],
      Nationality: ["", [Validators.required]],
      MaritalStatus: ["", [Validators.required]],
      NoOfChildren: ["", [Validators.required]],
      PersnolPhoneNumber: ["", [Validators.required]],
      PersnolEmailAddress: ["", [Validators.required]],
      BloodGroup: ["", [Validators.required]],
      EducationalQualifications: ["", [Validators.required]],
      WorkExperience: ["", [Validators.required]],
      SkillSet: ["", [Validators.required]],
      ReferenceDetails: ["", [Validators.required]],
      IdentityProofName: ["", [Validators.required]],
      IdentityProofDetails: ["", [Validators.required]],

      Address1: ["", [Validators.required]],
      Address2: ["", [Validators.required]],
      CityTown: ["", [Validators.required]],
      PostalCode: ["", [Validators.required]],
      Country: ["", [Validators.required]],
      State: ["", [Validators.required]],

      PermanentAddress1: ["", [Validators.required]],
      PermanentAddress2: ["", [Validators.required]],
      CityTown2: ["", [Validators.required]],
      PostalCode2: ["", [Validators.required]],
      Country2: ["", [Validators.required]],
      State2: ["", [Validators.required]],

      //Bank Information
      BankName: ["", [Validators.required]],
      BankAccountName: ["", [Validators.required]],
      BankAccountNo: ["", [Validators.required]],
      IFSCCode: ["", [Validators.required]],
      PAN_NO: ["", [Validators.required]],
      IBAN_NO: ["", [Validators.required]],


      //Emergency Details
      ContactName: ["", [Validators.required]],
      Relationship: ["", [Validators.required]],
      ContactNumber: ["", [Validators.required]],
      ContactEmailID: ["", [Validators.required]],
      Notes: ["", [Validators.required]],



      UserName: ["", [Validators.required]],
      Password: ["", [Validators.required]],
      ConfirmPassword: ["", [Validators.required]],
      DepartmentName: ["", [Validators.required]],
      // Designation: ["", [Validators.required]],
      Email: ["", [Validators.required]],
      PhoneNumber: ["", [Validators.required]],
      JoinDate: ["", [Validators.required]],
      CompanyName: ["", [Validators.required]],
      // EmployeeID: ["", [Validators.required]],
    });
  }

  // Get Employee  Api Call
  loadEmployee() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstEmployee = data;
      this.rows = this.lstEmployee;
      this.srch = [...this.rows];
    });
  }

  // Add employee  Modal Api Call
  addEmployee() {

    let DateJoin = this.pipe.transform(
      this.addEmployeeForm.value.JoinDate,
      "dd-MM-yyyy"
    );
    let DateJoining = this.pipe.transform(
      this.addEmployeeForm.value.Joiningdate,
      "dd-MM-yyyy"
    );
    let DateofBirth = this.pipe.transform(
      this.editEmployeeForm.value.DOB,
      "dd-MM-yyyy"
    );
    let obj = {
      //Employee Details
      firstname: this.addEmployeeForm.value.FirstName,
      lastname: this.addEmployeeForm.value.LastName,
      joiningdate: DateJoining,
      employeeId: this.addEmployeeForm.value.EmployeeID,
      employmentStatus: this.addEmployeeForm.value.EmploymentStatus,
      companyPhone: this.addEmployeeForm.value.CompanyPhone,
      location: this.addEmployeeForm.value.Location,
      department: this.addEmployeeForm.value.Department,
      designation: this.addEmployeeForm.value.Designation,
      empCompanyEmailID: this.addEmployeeForm.value.EmpCompanyEmailID,
      userId: this.addEmployeeForm.value.UserId,
      userPassword: this.addEmployeeForm.value.UserPassword,
      supervisor: this.addEmployeeForm.value.Supervisor,

      //Personal Details
      genter: this.addEmployeeForm.value.Genter,
      dob: DateofBirth,
      relegion: this.addEmployeeForm.value.Relegion,
      nationality: this.addEmployeeForm.value.Nationality,
      maritalStatus: this.addEmployeeForm.value.MaritalStatus,
      noOfChildren: this.addEmployeeForm.value.NoOfChildren,
      persnolPhoneNumber: this.addEmployeeForm.value.PersnolPhoneNumber,
      persnolEmailAddress: this.addEmployeeForm.value.PersnolEmailAddress,
      bloodGroup: this.addEmployeeForm.value.BloodGroup,
      educationalQualifications: this.addEmployeeForm.value.EducationalQualifications,
      workExperience: this.addEmployeeForm.value.WorkExperience,
      skillSet: this.addEmployeeForm.value.SkillSet,
      referenceDetails: this.addEmployeeForm.value.ReferenceDetails,
      identityProofName: this.addEmployeeForm.value.IdentityProofName,
      identityProofDetails: this.addEmployeeForm.value.IdentityProofDetails,

      address1: this.addEmployeeForm.value.Address1,
      address2: this.addEmployeeForm.value.Address2,
      cityTown: this.addEmployeeForm.value.CityTown,
      postalCode: this.addEmployeeForm.value.PostalCode,
      country: this.addEmployeeForm.value.Country,
      state: this.addEmployeeForm.value.State,

      permanentAddress1: this.addEmployeeForm.value.PermanentAddress1,
      permanentAddress2: this.addEmployeeForm.value.PermanentAddress2,
      cityTown2: this.addEmployeeForm.value.CityTown2,
      postalCode2: this.addEmployeeForm.value.PostalCode2,
      country2: this.addEmployeeForm.value.Country2,
      state2: this.addEmployeeForm.value.State2,

      //Bank Information
      bankName: this.addEmployeeForm.value.BankName,
      bankAccountName: this.addEmployeeForm.value.BankAccountName,
      bankAccountNo: this.addEmployeeForm.value.BankAccountNo,
      ifscCode: this.addEmployeeForm.value.IFSCCode,
      panNo: this.addEmployeeForm.value.PAN_NO,
      ibanNO: this.addEmployeeForm.value.IBAN_NO,


      //Emergency Details
      contactName: this.addEmployeeForm.value.ContactName,
      relationship: this.addEmployeeForm.value.Relationship,
      contactNumber: this.addEmployeeForm.value.ContactNumber,
      contactEmailID: this.addEmployeeForm.value.ContactEmailID,
      notes: this.addEmployeeForm.value.Notes,

      username: this.addEmployeeForm.value.UserName,
      email: this.addEmployeeForm.value.Email,
      password: this.addEmployeeForm.value.Password,
      confirmpassword: this.addEmployeeForm.value.ConfirmPassword,
      joindate: DateJoin,
      phone: this.addEmployeeForm.value.PhoneNumber,
      company: this.addEmployeeForm.value.CompanyName,
      // department: this.addEmployeeForm.value.DepartmentName,
      // designation: this.addEmployeeForm.value.Designation,
      mobile: "9944996335",
      role: "Web developer",
    };
    this.srvModuleService.add(obj, this.url).subscribe((data) => {});
    this.loadEmployee();
    $("#add_employee").modal("hide");
    this.addEmployeeForm.reset();
    this.toastr.success("Employeee added sucessfully...!", "Success");
  }

  editEmployee() {
    let DateJoin = this.pipe.transform(
      this.editEmployeeForm.value.JoinDate,
      "dd-MM-yyyy"
    );
    let DateJoining = this.pipe.transform(
      this.editEmployeeForm.value.Joiningdate,
      "dd-MM-yyyy"
    );
    let DateofBirth = this.pipe.transform(
      this.editEmployeeForm.value.DOB,
      "dd-MM-yyyy"
    );
    let obj = {
      //Employee Details
      firstname: this.editEmployeeForm.value.FirstName,
      lastname: this.editEmployeeForm.value.LastName,
      joiningdate: DateJoining,
      employeeId: this.editEmployeeForm.value.EmployeeID,
      employmentStatus: this.editEmployeeForm.value.EmploymentStatus,
      companyPhone: this.editEmployeeForm.value.CompanyPhone,
      location: this.editEmployeeForm.value.Location,
      department: this.editEmployeeForm.value.Department,
      designation: this.editEmployeeForm.value.Designation,
      empCompanyEmailID: this.editEmployeeForm.value.EmpCompanyEmailID,
      userId: this.editEmployeeForm.value.UserId,
      userPassword: this.editEmployeeForm.value.UserPassword,
      supervisor: this.editEmployeeForm.value.Supervisor,

      //Personal Details
      genter: this.editEmployeeForm.value.Genter,
      dob: DateofBirth,
      relegion: this.editEmployeeForm.value.Relegion,
      nationality: this.editEmployeeForm.value.Nationality,
      maritalStatus: this.editEmployeeForm.value.MaritalStatus,
      noOfChildren: this.editEmployeeForm.value.NoOfChildren,
      persnolPhoneNumber: this.editEmployeeForm.value.PersnolPhoneNumber,
      persnolEmailAddress: this.editEmployeeForm.value.PersnolEmailAddress,
      bloodGroup: this.editEmployeeForm.value.BloodGroup,
      educationalQualifications: this.editEmployeeForm.value.EducationalQualifications,
      workExperience: this.editEmployeeForm.value.WorkExperience,
      skillSet: this.editEmployeeForm.value.SkillSet,
      referenceDetails: this.editEmployeeForm.value.ReferenceDetails,
      identityProofName: this.editEmployeeForm.value.IdentityProofName,
      identityProofDetails: this.editEmployeeForm.value.IdentityProofDetails,

      address1: this.editEmployeeForm.value.Address1,
      address2: this.editEmployeeForm.value.Address2,
      cityTown: this.editEmployeeForm.value.CityTown,
      postalCode: this.editEmployeeForm.value.PostalCode,
      country: this.editEmployeeForm.value.Country,
      state: this.editEmployeeForm.value.State,

      permanentAddress1: this.editEmployeeForm.value.PermanentAddress1,
      permanentAddress2: this.editEmployeeForm.value.PermanentAddress2,
      cityTown2: this.editEmployeeForm.value.CityTown2,
      postalCode2: this.editEmployeeForm.value.PostalCode2,
      country2: this.editEmployeeForm.value.Country2,
      state2: this.editEmployeeForm.value.State2,

      //Bank Information
      bankName: this.editEmployeeForm.value.BankName,
      bankAccountName: this.editEmployeeForm.value.BankAccountName,
      bankAccountNo: this.editEmployeeForm.value.BankAccountNo,
      ifscCode: this.editEmployeeForm.value.IFSCCode,
      panNo: this.editEmployeeForm.value.PAN_NO,
      ibanNO: this.editEmployeeForm.value.IBAN_NO,


      //Emergency Details
      contactName: this.editEmployeeForm.value.ContactName,
      relationship: this.editEmployeeForm.value.Relationship,
      contactNumber: this.editEmployeeForm.value.ContactNumber,
      contactEmailID: this.editEmployeeForm.value.ContactEmailID,
      notes: this.editEmployeeForm.value.Notes,
      
      username: this.editEmployeeForm.value.UserName,
      email: this.editEmployeeForm.value.Email,
      password: this.editEmployeeForm.value.Password,
      confirmpassword: this.editEmployeeForm.value.ConfirmPassword,
      // employeeId: this.editEmployeeForm.value.EmployeeID,
      joindate: DateJoin,
      phone: this.editEmployeeForm.value.PhoneNumber,
      company: this.editEmployeeForm.value.CompanyName,
      // department: this.editEmployeeForm.value.DepartmentName,
      // designation: this.editEmployeeForm.value.Designation,
      mobile: "9944996335",
      role: "Web developer",
      id: this.editId,
    };
    this.srvModuleService.update(obj, this.url).subscribe((data1) => {});
    this.loadEmployee();
    $("#edit_employee").modal("hide");
    this.toastr.success("Employeee Updated sucessfully...!", "Success");
  }

  // To Get The employee Edit Id And Set Values To Edit Modal Form
  editEmp(value) {
    this.editId = value;
    const index = this.lstEmployee.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.lstEmployee[index];
    this.editEmployeeForm.setValue({
      //Employee Details
      FirstName: toSetValues.firstname,
      LastName: toSetValues.lastname,
      JoiningDate: toSetValues.joiningdate,
      EmployeeID: toSetValues.employeeId,
      EmploymentStatus: toSetValues.employmentStatus,
      CompanyPhone: toSetValues.companyPhone,
      Location: toSetValues.location,
      Department: toSetValues.department,
      Designation: toSetValues.designation,
      EmpCompanyEmailID: toSetValues.empCompanyEmailID,
      UserId: toSetValues.userId,
      UserPassword: toSetValues.userPassword,
      Supervisor: toSetValues.supervisor,

      //Personal Details
      Genter: toSetValues.genter,
      DOB: toSetValues.dob,
      Relegion: toSetValues.relegion,
      Nationality: toSetValues.nationality,
      MaritalStatus: toSetValues.maritalStatus,
      NoOfChildren: toSetValues.noOfChildren,
      PersnolPhoneNumber: toSetValues.persnolPhoneNumber,
      PersnolEmailAddress: toSetValues.persnolEmailAddress,
      BloodGroup: toSetValues.bloodGroup,
      EducationalQualifications: toSetValues.educationalQualifications,
      WorkExperience: toSetValues.workExperience,
      SkillSet: toSetValues.skillSet,
      ReferenceDetails: toSetValues.referenceDetails,
      IdentityProofName: toSetValues.identityProofName,
      IdentityProofDetails: toSetValues.identityProofDetails,

      Address1: toSetValues.address1,
      Address2: toSetValues.address2,
      CityTown: toSetValues.cityTown,
      PostalCode: toSetValues.postalCode,
      Country: toSetValues.country,
      State: toSetValues.state,

      PermanentAddress1: toSetValues.permanentAddress1,
      PermanentAddress2: toSetValues.permanentAddress2,
      CityTown2: toSetValues.cityTown2,
      PostalCode2: toSetValues.postalCode2,
      Country2: toSetValues.country2,
      State2: toSetValues.state2,

      //Bank Information
      BankName: toSetValues.bankName,
      BankAccountName: toSetValues.bankAccountName,
      BankAccountNo: toSetValues.bankAccountNo,
      IFSCCode: toSetValues.ifscCode,
      PAN_NO: toSetValues.panNo,
      IBAN_NO: toSetValues.ibanNO,


      //Emergency Details
      ContactName: toSetValues.contactName,
      Relationship: toSetValues.relationship,
      ContactNumber: toSetValues.contactNumber,
      ContactEmailID: toSetValues.contactEmailID,
      Notes: toSetValues.notes,


      UserName: toSetValues.username,
      Email: toSetValues.email,
      Password: toSetValues.password,
      ConfirmPassword: toSetValues.confirmpassword,
      
      JoinDate: toSetValues.joindate,
      PhoneNumber: toSetValues.phone,
      CompanyName: toSetValues.company,
      DepartmentName: toSetValues.department,
      // Designation: toSetValues.designation,
    });
  }

  // edit update data set
  public edit(value: any) {
    let data = this.lstEmployee.filter((client) => client.id === value);
    this.editEmployeeForm.setValue({
      //Employee Details
      FirstName: data[0].firstname,
      LastName: data[0].lastname,
      JoiningDate: data[0].joiningdate,
      EmployeeID: data[0].employeeId,
      EmploymentStatus: data[0].employmentStatus,
      CompanyPhone: data[0].companyPhone,
      Location: data[0].location,
      Department: data[0].department,
      Designation: data[0].designation,
      EmpCompanyEmailID: data[0].empCompanyEmailID,
      UserId: data[0].userId,
      UserPassword: data[0].userPassword,
      Supervisor: data[0].supervisor,

      //Personal Details
      Genter: data[0].genter,
      DOB: data[0].dob,
      Relegion: data[0].relegion,
      Nationality: data[0].nationality,
      MaritalStatus: data[0].maritalStatus,
      NoOfChildren: data[0].noOfChildren,
      PersnolPhoneNumber: data[0].persnolPhoneNumber,
      PersnolEmailAddress: data[0].persnolEmailAddress,
      BloodGroup: data[0].bloodGroup,
      EducationalQualifications: data[0].educationalQualifications,
      WorkExperience: data[0].workExperience,
      SkillSet: data[0].skillSet,
      ReferenceDetails: data[0].referenceDetails,
      IdentityProofName: data[0].identityProofName,
      IdentityProofDetails: data[0].identityProofDetails,

      Address1: data[0].address1,
      Address2: data[0].address2,
      CityTown: data[0].cityTown,
      PostalCode: data[0].postalCode,
      Country: data[0].country,
      State: data[0].state,

      PermanentAddress1: data[0].permanentAddress1,
      PermanentAddress2: data[0].permanentAddress2,
      CityTown2: data[0].cityTown2,
      PostalCode2: data[0].postalCode2,
      Country2: data[0].country2,
      State2: data[0].state2,


      //Bank Information
      BankName: data[0].bankName,
      BankAccountName: data[0].bankAccountName,
      BankAccountNo: data[0].bankAccountNo,
      IFSCCode: data[0].ifscCode,
      PAN_NO: data[0].panNo,
      IBAN_NO: data[0].ibanNO,


      //Emergency Details
      ContactName: data[0].contactName,
      Relationship: data[0].relationship,
      ContactNumber: data[0].contactNumber,
      ContactEmailID: data[0].contactEmailID,
      Notes: data[0].notes,

      

      UserName: data[0].username,
      Email: data[0].email,
      Password: data[0].password,
      ConfirmPassword: data[0].confirmpassword,
      JoinDate: data[0].joindate,
      // PhoneNumber: data[0].phone,
      // CompanyName: data[0].company,
      // DepartmentName: data[0].department,
      // Designation: data[0].designation,
      Id: data[0].id,
    });
  }

  // delete api call
  deleteEmployee() {
    this.srvModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.loadEmployee();
      $("#delete_employee").modal("hide");
      this.toastr.success("Employee deleted sucessfully..!", "Success");
    });
  }

  //search by name
  searchId(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.employeeId.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.firstname.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //search by designation
  searchByDesignation(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.designation.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

  //getting the status value
  getStatus(data) {
    this.statusValue = data;
  }
  updateEmail() {  
    this.c_name.setValue('');
    this.c_relationship.setValue('');
    this.c_no.setValue('');
    this.c_email_id.setValue('');
    this.notes.setValue('');  
  } 
  onSubmit(form: NgForm) {
      console.log('Your form data : ', form.value);
  }
}
