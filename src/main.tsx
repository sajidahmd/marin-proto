import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, createBrowserRouter, RouterProvider,} from "react-router";
import Home from "@/app/page";
import '@/app/globals.css'
import ApplyForMembershipPage from "@/app/apply-for-membership/page";
import SignInPage from "@/app/sign-in/page";
import ForgotPasswordPage from "@/app/forgot-password/page";
import DashboardLayout from "@/app/dashboard/layout";
import DashboardHomePage from "@/app/dashboard/page";
import CompanyPage from "@/app/dashboard/company/page";
import VesselPage from "@/app/dashboard/vessel/page";
import EmployeePage from "@/app/dashboard/employee/page";
import NotificationPage from "@/app/dashboard/notification/page";
import InteractionsPage from "@/app/dashboard/interactions/page";
import SchedulerPage from "@/app/dashboard/scheduler/page";
import QuotationsPage from "@/app/dashboard/quotations/page";
import AnalyticsPage from "@/app/dashboard/analytics/page";
import UsersPage from "@/app/dashboard/admin/users/page";
import RolesPage from "@/app/dashboard/admin/roles/page";
import PermissionsPage from "@/app/dashboard/admin/permissions/page";
import AuditLogsPage from "@/app/dashboard/admin/audit-logs/page";
import SettingsPage from "@/app/dashboard/settings/page";
import ProfilePage from "@/app/dashboard/settings/profile/page";


let router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    children: [
      {index: true, Component: Home},
      /* here the public routes will be added as children but need to finalize the layout)*/
    ],
  },
  {path: 'apply-for-membership', Component: ApplyForMembershipPage},
  {path: 'sign-in', Component: SignInPage},
  {path: 'forgot-password', Component: ForgotPasswordPage},
  {
    path: '/dashboard', Component: DashboardLayout,
    children: [
      {index: true, Component: DashboardHomePage},
      {path: 'company', Component: CompanyPage},
      {path: 'vessel', Component: VesselPage},
      {path: 'employee', Component: EmployeePage},
      {path: 'notification', Component: NotificationPage},
      {path: 'interactions', Component: InteractionsPage},
      {path: 'schedular', Component: SchedulerPage},
      {path: 'quotation', Component: QuotationsPage},
      {path: 'analytics', Component: AnalyticsPage},
      {
        path: "admin",
        children: [
          {path: 'users', index: true, Component: UsersPage},
          {path: 'roles', Component: RolesPage},
          {path: 'permissions', Component: PermissionsPage},
          {path: 'audit-logs', Component: AuditLogsPage}
        ]
      },
      {
        path: 'settings', Component: SettingsPage,
        children: [
          { index: true, Component:ProfilePage},
          {path:'account',  },
          {path:'notification', },
          {path:'appearance', },
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)


