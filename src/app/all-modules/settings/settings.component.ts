import { Component, OnInit, HostListener, NgZone } from "@angular/core";
import { NavigationEnd, Event, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AllModulesService } from "src/app/all-modules/all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { FormControl } from '@angular/forms';
import {NgForm} from '@angular/forms';

import 'jspdf';

declare var jsPDF: any;
declare const $: any;
@Component({
  // selector: "app-settings",
  templateUrl: "./settings.component.html",
})
@HostListener("window: resize", ["$event"])
export class SettingsComponent implements OnInit {
  public innerHeight: any;
  public pipe = new DatePipe("en-US");
  public urlComplete = {
    mainUrl: "",
    subUrl: "",
    childUrl: "",
  };
  getScreenHeight() {
    this.innerHeight = window.innerHeight + "px";
  }

  constructor(private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,private ngZone: NgZone, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url.split("/");
        this.urlComplete.mainUrl = url[1];
        this.urlComplete.subUrl = url[2];
        this.urlComplete.childUrl = url[3];
      }
    });
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + "px";
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
    
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + "px";
  }
  onSubmit(form: NgForm) {
      console.log('Your form data : ', form.value);
  }
}
