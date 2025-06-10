import { 
  User,
  Settings2,
  Palette, 
  Bell,
  Monitor
} from 'lucide-react';
import {Separator} from "@/components/ui/separator";
import {Outlet} from "react-router";
import SidebarNav from "@/components/dashboard/settings/SidebarNav";

const sidebarNavItems = [
  {
    title: 'Profile',
    icon: <User size={18} />,
    href: '/settings',
  },
  {
    title: 'Account',
    icon: <Settings2 size={18} />,
    href: '/settings/account',
  },
  {
    title: 'Appearance',
    icon: <Palette size={18} />,
    href: '/settings/appearance',
  },
  {
    title: 'Notifications',
    icon: <Bell size={18} />,
    href: '/settings/notifications',
  },
  {
    title: 'Display',
    icon: <Monitor size={18} />,
    href: '/settings/display',
  },
];

export default function SettingsPage() {
  // Rest of the component remains the same
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      </div>
      <div className='space-y-0.5'>
        <p className='text-muted-foreground'>
          Manage your account settings
        </p>
      </div>
      <Separator className='my-4 lg:my-6' />
      <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
        <aside className='top-0 lg:sticky lg:w-1/5'>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className='flex w-full overflow-y-hidden p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}