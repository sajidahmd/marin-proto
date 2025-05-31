
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  Building2,
  Ship,
  Users,
  Bell,
  MessagesSquare,
  CalendarDays,
  FileText,
  BarChart3,
  ShieldCheck,
  LogOut,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/company', label: 'Company', icon: Building2 },
  { href: '/dashboard/vessel', label: 'Vessel', icon: Ship },
  { href: '/dashboard/employee', label: 'Employee', icon: Users },
  { href: '/dashboard/notification', label: 'Notification', icon: Bell },
  { href: '/dashboard/interactions', label: 'Interactions', icon: MessagesSquare },
  { href: '/dashboard/scheduler', label: 'Scheduler', icon: CalendarDays },
  { href: '/dashboard/quotations', label: 'Quotations', icon: FileText },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/admin', label: 'Admin', icon: ShieldCheck },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="h-16 items-center justify-center border-b border-sidebar-border p-2">
        <h2 className="text-lg font-semibold text-sidebar-primary group-data-[collapsible=icon]:hidden">
          Admin Panel
        </h2>
        <Building2 className="size-6 text-sidebar-primary group-data-[collapsible=icon]:block hidden" />
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                  onClick={() => setOpenMobile(false)}
                  tooltip={{ children: item.label }}
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <SidebarMenu>
            <SidebarMenuItem>
                 <Link href="/settings" passHref legacyBehavior>
                    <SidebarMenuButton asChild onClick={() => setOpenMobile(false)} tooltip={{children: "Settings"}}>
                        <a>
                            <Settings />
                            <span>Settings</span>
                        </a>
                    </SidebarMenuButton>
                 </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => console.log('Logout')} tooltip={{children: "Log Out"}}>
                    <LogOut />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

    