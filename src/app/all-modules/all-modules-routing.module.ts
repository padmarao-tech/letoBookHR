import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../login/auth/auth.guard";
import { AllModulesComponent } from "./all-modules.component";
import { HrLabourReportComponent } from "./hr-labour-report/hr-labour-report.component";

// import { SiteComponent } from './site/site.component';
const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: AllModulesComponent,
    children: [
      // {
      //   path: 'login',
      //   loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
      // },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: "apps",
        loadChildren: () =>
          import("./apps/apps.module").then((m) => m.AppsModule),
      },
      {
        path: "employees",
        loadChildren: () =>
          import("./employees/employees.module").then((m) => m.EmployeesModule),
        canActivate: [AuthGuard],
      },
      {
        path: "clients",
        loadChildren: () =>
          import("./clients/clients.module").then((m) => m.ClientsModule),
      },
      {
        path: "projects",
        loadChildren: () =>
          import("./projects/projects.module").then((m) => m.ProjectsModule),
      },
      {
        path: "leads",
        loadChildren: () =>
          import("./leads/leads.module").then((m) => m.LeadsModule),
      },
      {
        path: "tickets",
        loadChildren: () =>
          import("./tickets/tickets.module").then((m) => m.TicketsModule),
      },
      {
        path: "accounts",
        loadChildren: () =>
          import("./accounts/accounts.module").then((m) => m.AccountsModule),
      },
      // {
      //   path: 'expenses',
      //   loadChildren: () => import('./accounts/expenses/expenses.module').then(m => m.ExpensesModule)
      // },
      {
        path: "payroll",
        loadChildren: () =>
          import("./payroll/payroll.module").then((m) => m.PayrollModule),
      },
      {
        path: "policies",
        loadChildren: () =>
          import("./policies/policies.module").then((m) => m.PoliciesModule),
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./reports/reports.module").then((m) => m.ReportsModule),
      },
      {
        path: "performance",
        loadChildren: () =>
          import("./performance/performance.module").then(
            (m) => m.PerformanceModule
          ),
      },
      {
        path: "goals",
        loadChildren: () =>
          import("./goals/goals.module").then((m) => m.GoalsModule),
      },

      {
        path: "promotion",
        loadChildren: () =>
          import("./promotion/promotion.module").then((m) => m.PromotionModule),
      },
      {
        path: "resignation",
        loadChildren: () =>
          import("./resignation/resignation.module").then(
            (m) => m.ResignationModule
          ),
      },
      {
        path: "termination",
        loadChildren: () =>
          import("./termination/termination.module").then(
            (m) => m.TerminationModule
          ),
      },
      {
        path: "jobs",
        loadChildren: () =>
          import("./jobs/jobs.module").then((m) => m.JobsModule),
      },
      {
        path: "knowledgebase",
        loadChildren: () =>
          import("./knowledgebase/knowledgebase.module").then(
            (m) => m.KnowledgebaseModule
          ),
      },
      {
        path: "activities",
        loadChildren: () =>
          import("./activities/activities.module").then(
            (m) => m.ActivitiesModule
          ),
      },
      {
        path: "users",
        loadChildren: () =>
          import("./users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./settings/settings.module").then((m) => m.SettingsModule),
      },
      {
        path: "pages",
        loadChildren: () =>
          import("./pages/pages.module").then((m) => m.PagesModule),
      },
      {
        path: "components",
        loadChildren: () =>
          import("./components/components.module").then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then((m) => m.FormsModule),
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then((m) => m.TablesModule),
      },
      {
        path: "leave",
        loadChildren: () =>
          import("./leave/leave.module").then((m) => m.LeaveModule),
      },
      {
        path: "expenses",
        loadChildren: () =>
          import("./expenses/expenses.module").then((m) => m.ExpensesModule),
      },
      // {
      //   path: 'location',
      //   loadChildren: () => import('./location/location.module').then(m => m.LocationModule)
      // },
      // {
      //   path: 'departments',
      //   loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule)
      // },
      // {
      //   path: 'designation',
      //   loadChildren: () => import('./designation/designation.module').then(m => m.DesignationModule)
      // },
      // {
      //   path: 'site',
      //   loadChildren: () => import('./site/site.module').then(m => m.SiteModule)
      // },
      {
        path: "hr-labour-report",
        loadChildren: () =>
          import("./hr-labour-report/hr-labour-report.module").then(
            (m) => m.HrLabourReportModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllModulesRoutingModule {}
