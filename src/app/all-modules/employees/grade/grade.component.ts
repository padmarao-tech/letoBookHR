import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../../service/data-service.service';
declare const $: any;
@Component({
  // selector: "app-grade",
  templateUrl: "./grade.component.html",
})
export class GradeComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public lstGrade: any[];
  public url: any = "grade";
  public tempId: any;
  public editId: any;

  public rows = [];
  public srch = [];
  public addGradeForm: FormGroup;
  public editGradeForm: FormGroup;
  sql: string;
  constructor( 
    // private route: ActivatedRoute,
    private data: DataServiceService,
    private formBuilder: FormBuilder,
    // private srvModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}


  ngOnInit() {
    // this.sql="Select * from grade"
    // this.data.runQuery(this.sql).subscribe(
    //   data => {  
    //     this.gradelist = data as string[];
    //     console.log(data)
    //    }  
    // )

    this.LoadGrade();

    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };

    this.addGradeForm = this.formBuilder.group({
      GradeCode: ["", [Validators.required]],
      GradeName: ["", [Validators.required]],
    });

    this.editGradeForm = this.formBuilder.group({
      GradeCode: ["", [Validators.required]],
      GradeName: ["", [Validators.required]],
    });
  }

  LoadGrade() {
    this.data.runQuery('SELECT * FROM grade;').subscribe((data) => {
      // console.log(data)
      this.lstGrade = data.map(item=>{return {uid:item.uid,
        gradeCode:item.code,
        gradeName:item.name,
        status:item.Status==='Y'? 'Active':'Inactive'}});
      // console.log(this.lstDepartment)
      this.dtTrigger.next();
      this.rows = this.lstGrade;
      this.srch = [...this.rows];
    });
  }
  // Add Department  Modal Api Call
  addGrade() {
    if (this.addGradeForm.valid) {
      let obj = {
        gradeCode: this.addGradeForm.value.GradeCode,
        gradeName: this.addGradeForm.value.GradeName,
        uid: 0,
      };
      // sulaiman start
      const sql = "insert into grade (code,name) values ('" +
      obj.gradeCode + "','" +
      obj.gradeName + "')"
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadGrade();
        $("#add_Grade").modal("hide");
        this.addGradeForm.reset();
        this.toastr.success("Grade added sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }
  
  editGrade() {
    if (this.editGradeForm.valid) {
      let obj = {
        uid: this.editId,
        gradeCode: this.editGradeForm.value.GradeCode,
        gradeName: this.editGradeForm.value.GradeName,
      };
      console.log(obj)
      // sulaiman start
      const sql = "Update grade set code='" + obj.gradeCode
      + "',name ='" + obj.gradeName
      + "'where uid =" + this.editId
      this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.LoadGrade();
        $("#edit_Grade").modal("hide");
        this.toastr.success("Grade Updated sucessfully...!", "Success");
      });
      // sulaiman end
    }
  }
  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editId = value;
    console.log(this.editId)
    // set the value from grid row by passing the id value
    const index = this.lstGrade.findIndex((item) => {
      return item.uid === value;
    });
    let toSetValues = this.lstGrade[index];
    console.log(toSetValues)
    this.editGradeForm.setValue({
      // uid: toSetValues.item.id,
      GradeCode: toSetValues.gradeCode,   // added sulaiman
      GradeName: toSetValues.gradeName,
    });
  }
  deleteGrade() {
    // sulaiman start
    const sql = "Delete from grade where uid =" + this.tempId
    this.data.runQuery(sql)
    .subscribe((data) => {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.LoadGrade();
      $("#delete_Grade").modal("hide");
      this.toastr.success("Grade deleted sucessfully..!", "Success");
    });
    // sulaiman end
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  getStatus(status,uid){
    const statusValue = status==='Active' ? 'Y' : 'N';
    const sql = "Update grade set status='" + statusValue + "' where uid =" + uid
    this.data.runQuery(sql)
      .subscribe((data) => {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();

        });
        this.LoadGrade();
        // $("#edit_department").modal("hide");
        this.toastr.success("Grade Updated sucessfully...!", "Success");
      });
  }
  
}
