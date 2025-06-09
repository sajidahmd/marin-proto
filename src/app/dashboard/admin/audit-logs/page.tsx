

import * as React from "react";
import {
  SortingState,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  VisibilityState,
  ColumnDef,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";
import { auditLogColumns, type AuditLogEntry } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialAuditLogData: AuditLogEntry[] = [
  { id: "log_1", timestamp: "2025-06-02 09:15 AM", user: "alice@example.com", action: "Logged in successfully." },
  { id: "log_2", timestamp: "2025-06-02 09:18 AM", user: "Admin", action: "Created user bob@example.com with role Manager." },
  { id: "log_3", timestamp: "2025-06-02 09:25 AM", user: "bob@example.com", action: "Updated vessel 'Sea Explorer' status to 'Active'." },
  { id: "log_4", timestamp: "2025-06-02 10:05 AM", user: "Admin", action: "Deleted role 'Intern'." },
  { id: "log_5", timestamp: "2025-06-02 10:30 AM", user: "System", action: "Scheduled weekly backup started." },
  { id: "log_6", timestamp: "2025-06-02 11:15 AM", user: "charlie@example.com", action: "Accessed analytics dashboard." },
  { id: "log_7", timestamp: "2025-06-02 11:45 AM", user: "Admin", action: "Updated user John Doe (john@example.com) role to 'Manager'." },
  { id: "log_8", timestamp: "2025-06-02 12:00 PM", user: "ManagerKate", action: "Created vessel 'Ocean Star'." },
  { id: "log_9", timestamp: "2025-06-02 12:30 PM", user: "HR Staff", action: "Updated employee 'Eve Smith' contact details." },
  { id: "log_10", timestamp: "2025-06-02 01:00 PM", user: "System", action: "Failed login attempt for user 'intruder@example.com'." },
  { id: "log_11", timestamp: "2025-06-02 01:15 PM", user: "Admin", action: "Granted 'view_reports' permission to role 'Analyst'." },
  { id: "log_12", timestamp: "2025-06-02 02:00 PM", user: "ManagerTom", action: "Created company 'Atlantic Shipping'." },
  { id: "log_13", timestamp: "2025-06-02 02:30 PM", user: "System", action: "Monthly report 'Sales_May_2025.pdf' generated." },
  { id: "log_14", timestamp: "2025-06-02 03:00 PM", user: "Admin", action: "Uploaded 50 vessels from fleet_update.csv (45 success, 5 failed)." },
  { id: "log_15", timestamp: "2025-06-02 03:45 PM", user: "Admin", action: "Revoked 'delete_user' permission from role 'Support'." },
  { id: "log_16", timestamp: "2025-06-02 04:00 PM", user: "alice@example.com", action: "Updated vessel 'Ocean Star' status to 'Maintenance'." },
  { id: "log_17", timestamp: "2025-06-02 04:10 PM", user: "Admin", action: "Deleted company 'Old Maritime Co'."},
  { id: "log_18", timestamp: "2025-06-02 04:30 PM", user: "System", action: "Scheduled weekly backup completed successfully." },
  { id: "log_19", timestamp: "2025-06-02 05:00 PM", user: "bob@example.com", action: "Logged out." },
  { id: "log_20", timestamp: "2025-06-02 05:05 PM", user: "Admin", action: "Changed password for user 'system_svc_account'." },
];

export default function AuditLogsPage() {
  const [auditLogs] = React.useState<AuditLogEntry[]>(initialAuditLogData);
  const [searchInput, setSearchInput] = React.useState("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const columns = React.useMemo<ColumnDef<AuditLogEntry>[]>(() => auditLogColumns, []);

  const tableData = auditLogs; 

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      pagination,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false, 
    manualFiltering: true, // Search input is visual only for now
    manualSorting: false,
  });

  return (
    <div className="space-y-6">
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">View system activity and user actions.</p>
        </div>
        {/* No "Add" button for Audit Logs */}
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-grow items-center gap-2 flex-wrap">
          <div className="relative flex-grow sm:flex-grow-0 min-w-[200px] sm:min-w-[280px] md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search audit logs..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </div>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter(column => column.getCanHide()) 
                .map((column) => {
                  let displayName = column.id.charAt(0).toUpperCase() + column.id.slice(1);
                  // Custom display names if needed, e.g., if column.id is "userIdentifier" -> "User ID"
                  if (column.id === 'timestamp') displayName = 'Timestamp';
                  if (column.id === 'user') displayName = 'User';
                  if (column.id === 'action') displayName = 'Action';

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {displayName}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
