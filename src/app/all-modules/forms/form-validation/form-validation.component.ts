import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  // selector: "app-form-validation",
  templateUrl: "./form-validation.component.html",
})
export class FormValidationComponent implements OnInit {
  public basicForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.basicForm = this.formBuilder.group({
      txt: [""],
    });
  }

  basicFormSubmit() {
    console.log("");
  }
}
