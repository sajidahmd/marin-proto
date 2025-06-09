import{Link} from "react-router-dom";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { PanelLeft, Home as HomeIcon, ChevronRight } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4">
      <SidebarTrigger> {/* Removed sm:hidden to make it visible on all screen sizes */}
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </SidebarTrigger>
      <nav aria-label="breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <HomeIcon className="h-4 w-4" />
              Dashboard
            </Link>
          </li>
        </ol>
      </nav>
      {/* Future elements like User Menu or Search can go here */}
    </header>
  );
}
