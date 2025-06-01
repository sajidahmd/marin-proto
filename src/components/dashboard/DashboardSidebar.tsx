
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
  KeyRound,
  ShieldAlert, // Changed from ShieldCheck to avoid exact duplicate if parent uses it
  ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const mainNavItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/company', label: 'Company', icon: Building2 },
  { href: '/dashboard/vessel', label: 'Vessel', icon: Ship },
  { href: '/dashboard/employee', label: 'Employee', icon: Users },
  { href: '/dashboard/notification', label: 'Notification', icon: Bell },
  { href: '/dashboard/interactions', label: 'Interactions', icon: MessagesSquare },
  { href: '/dashboard/scheduler', label: 'Scheduler', icon: CalendarDays },
  { href: '/dashboard/quotations', label: 'Quotations', icon: FileText },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
];

const adminSubNavItems = [
  { href: '/dashboard/admin/users', label: 'Users', icon: Users },
  { href: '/dashboard/admin/roles', label: 'Roles', icon: KeyRound },
  { href: '/dashboard/admin/permissions', label: 'Permissions', icon: ShieldAlert },
  { href: '/dashboard/admin/audit-logs', label: 'Audit Logs', icon: ClipboardList },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { setOpenMobile, open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="h-16 items-center justify-center border-b border-sidebar-border p-2">
        <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Building2 className="size-6 text-sidebar-primary" />
          <h2 className="text-lg font-semibold text-sidebar-primary group-data-[collapsible=icon]:hidden">
            Admin Panel
          </h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {mainNavItems.map((item) => (
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
          
          <SidebarMenuSub defaultOpen={pathname.startsWith('/dashboard/admin')}>
            <SidebarMenuButton 
              isSubTrigger 
              isActive={pathname.startsWith('/dashboard/admin')}
              tooltip={{children: "Admin"}}
            >
              <ShieldCheck />
              <span>Admin</span>
            </SidebarMenuButton>
            {adminSubNavItems.map((subItem) => (
              <SidebarMenuSubItem key={subItem.label}>
                <Link href={subItem.href} passHref legacyBehavior>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === subItem.href}
                    onClick={() => setOpenMobile(false)}
                    tooltip={{children: subItem.label}}
                  >
                    <a>
                      <subItem.icon className="size-3.5" /> {/* Smaller icon for subitems */}
                      <span>{subItem.label}</span>
                    </a>
                  </SidebarMenuSubButton>
                </Link>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>

        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <SidebarMenu>
            <SidebarMenuItem>
                 <Link href="/dashboard/settings" passHref legacyBehavior> {/* Updated path */}
                    <SidebarMenuButton 
                        asChild 
                        onClick={() => setOpenMobile(false)} 
                        tooltip={{children: "Settings"}}
                        isActive={pathname === '/dashboard/settings'}
                    >
                        <a>
                            <Settings />
                            <span>Settings</span>
                        </a>
                    </SidebarMenuButton>
                 </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {console.log('Logout'); setOpenMobile(false);}} tooltip={{children: "Log Out"}}>
                    <LogOut />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
