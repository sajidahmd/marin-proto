import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub, 
  SidebarMenuSubContent, 
  SidebarMenuSubNavList, 
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
  ShieldAlert,
  ClipboardList,
  ChevronDown,
} from 'lucide-react';

const mainNavItems = [
  { to: '/dashboard', label: 'Home', icon: Home },
  { to: '/dashboard/company', label: 'Company', icon: Building2 },
  { to: '/dashboard/vessel', label: 'Vessel', icon: Ship },
  { to: '/dashboard/employee', label: 'Employee', icon: Users },
  { to: '/dashboard/notification', label: 'Notification', icon: Bell },
  { to: '/dashboard/interactions', label: 'Interactions', icon: MessagesSquare },
  { to: '/dashboard/scheduler', label: 'Scheduler', icon: CalendarDays },
  { to: '/dashboard/quotations', label: 'Quotations', icon: FileText },
  { to: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
];

const adminSubNavItems = [
  { to: '/dashboard/admin/users', label: 'Users', icon: Users },
  { to: '/dashboard/admin/roles', label: 'Roles', icon: KeyRound },
  { to: '/dashboard/admin/permissions', label: 'Permissions', icon: ShieldAlert },
  { to: '/dashboard/admin/audit-logs', label: 'Audit Logs', icon: ClipboardList },
];

export default function DashboardSidebar() {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="h-16 items-center justify-center border-b border-sidebar-border p-2">
        <Link to="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
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
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to))}
                onClick={() => setOpenMobile(false)}
                tooltip={{ children: item.label }}
              >
                <Link to={item.to}>
                  <item.icon />
                  <span className="flex-1">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <SidebarMenuSub defaultOpen={location.pathname.startsWith('/dashboard/admin')}>
            <SidebarMenuButton 
              isSubTrigger 
              isActive={location.pathname.startsWith('/dashboard/admin')}
              tooltip={{children: "Admin"}}
            >
              <ShieldCheck />
              <span className="flex-1">Admin</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-sidebar-foreground/70 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
            <SidebarMenuSubContent>
              <SidebarMenuSubNavList>
                {adminSubNavItems.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.label}>
                    <SidebarMenuSubButton
                      asChild
                      isActive={location.pathname === subItem.to}
                      onClick={() => setOpenMobile(false)}
                      // tooltip={{children: subItem.label}}
                    >
                      <Link to={subItem.to}>
                        <subItem.icon className="size-3.5" />
                        <span>{subItem.label}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSubNavList>
            </SidebarMenuSubContent>
          </SidebarMenuSub>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              onClick={() => setOpenMobile(false)} 
              tooltip={{children: "Settings"}}
              isActive={location.pathname === '/dashboard/settings'}
            >
              <Link to="/dashboard/settings">
                <Settings />
                <span className="flex-1">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => {console.log('Logout'); setOpenMobile(false);}} tooltip={{children: "Log Out"}}>
              <LogOut />
              <span className="flex-1">Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}