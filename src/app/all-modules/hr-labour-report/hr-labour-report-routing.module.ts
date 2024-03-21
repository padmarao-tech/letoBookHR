import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrLabourReportComponent } from './hr-labour-report.component';
import { FormBComponent } from './form-b/form-b.component';
import { FormCComponent } from './form-c/form-c.component';
import { FormDComponent } from './form-d/form-d.component';
import { FormHComponent } from './form-h/form-h.component';
import { FormPComponent } from './form-p/form-p.component';
import { FormQComponent } from './form-q/form-q.component';
import { FormRComponent } from './form-r/form-r.component';
import { FormSComponent } from './form-s/form-s.component';
import { FormTComponent } from './form-t/form-t.component';
import { FormXIXComponent } from './form-xix/form-xix.component';
import { FormXXIXComponent } from './form-xxix/form-xxix.component';
import { FormXXVIComponent } from './form-xxvi/form-xxvi.component';
import { FormXXVIIComponent } from './form-xxvii/form-xxvii.component';


const routes: Routes = [
  {
    path:"",
    component:HrLabourReportComponent,
    children:[
      {
        path:"form-b",
        component:FormBComponent
      },
      {
        path:"form-c",
        component:FormCComponent
      },
      {
        path:"form-d",
        component:FormDComponent
      },
      {
        path:"form-h",
        component:FormHComponent
      },
      {
        path:"form-p",
        component:FormPComponent
      },
      {
        path:"form-q",
        component:FormQComponent
      },
      {
        path:"form-r",
        component:FormRComponent
      },
      {
        path:"form-s",
        component:FormSComponent
      },
      {
        path:"form-t",
        component:FormTComponent
      },
      {
        path:"form-xix",
        component:FormXIXComponent
      },
      {
        path:"form-xxix",
        component:FormXXIXComponent
      },
      {
        path:"form-xxvi",
        component:FormXXVIComponent
      },
      {
        path:"form-xxvii",
        component:FormXXVIIComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrLabourReportRoutingModule { }
