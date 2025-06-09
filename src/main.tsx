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
      {index: true, Component: DashboardHomePage}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)


