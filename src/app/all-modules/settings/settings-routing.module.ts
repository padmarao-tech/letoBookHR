import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { LocalizationComponent } from './localization/localization.component';
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';
import { RoleComponent } from './role/role.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { InvoiceSettingsComponent } from './invoice-settings/invoice-settings.component';
import { SalarySettingsComponent } from './salary-settings/salary-settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { BanksComponent } from './banks/banks.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';

const routes: Routes = [
  {
    path:"",
    component:SettingsComponent,
    children:[
      {
        path:"company-settings",
        component:CompanySettingsComponent
      },
      {
        path:"localization",
        component:LocalizationComponent
      },
      {
        path:"theme-settings",
        component:ThemeSettingsComponent
      },
      {
        path:"role",
        component:RoleComponent
      },
      {
        path:"email-settings",
        component:EmailSettingsComponent
      },
      {
        path:"invoice-settings",
        component:InvoiceSettingsComponent
      },
      {
        path:"salary-settings",
        component:SalarySettingsComponent
      },
      {
        path:"notifications",
        component:NotificationsComponent
      },
      {
        path:"change-password",
        component:ChangePasswordComponent
      },
      {
        path:"leave-type",
        component:LeaveTypeComponent
      },
      {
        path:"banks",
        component:BanksComponent
      },
      {
        path:"holidays",
        component:HolidaysComponent
      },
      {
        path:"leave-settings",
        component:LeaveSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
