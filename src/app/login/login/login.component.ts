import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms";

import { DataServiceService } from "../../service/data-service.service";
import { ToastrService } from "ngx-toastr";
@Component({
  // selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private data: DataServiceService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}
  public loginForm: FormGroup;
  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   username: ["", [Validators.required]],
    //   password: ["", [Validators.required]],
    // });
  }
  onSubmit(form: NgForm) {
    console.log("click");
    // this.router.navigate(["/dashboard/admin"]);
    // this.data.loginUser();
    const email1 = form.value.email;
    const password1 = form.value.password;

    if (form.valid) {
      let obj = {
        username: email1, // added sulaiman
        password: password1,
      };
      console.log(obj);
      this.data.loginUser(obj.username, obj.password).subscribe(
        (res) => {
          console.log(res);
          const loggedUser = res["user"];
          const token = res["token"];
          console.log(loggedUser, token);
          localStorage.setItem("token", token);
          this.router.navigate(["/dashboard/admin"]);
        },
        (err) => {
          this.toastr.warning("Invalid credintials", "");
        }
      );
    } else {
      console.log("Not valid");
      this.toastr.warning("Username or password  not valid...!", "Not valid");
    }
  }
  // onSubmit() {}
}
