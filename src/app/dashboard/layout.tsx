import type {ReactNode} from 'react';
import {SidebarProvider, SidebarInset} from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import {Outlet} from "react-router";


export default function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex w-full min-h-screen bg-muted/40">
        <DashboardSidebar/>
        <SidebarInset>
          <DashboardHeader/>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet/>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

    