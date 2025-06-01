
"use client";

import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { PanelLeft, Home as HomeIcon, ChevronRight } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden">
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </SidebarTrigger>
      <nav aria-label="breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </li>
          <li>
            <span className="text-sm font-semibold text-foreground">Dashboard</span>
          </li>
        </ol>
      </nav>
      {/* Future elements like User Menu or Search can go here */}
    </header>
  );
}

    