
"use client";

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
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, PlusCircle, SlidersHorizontal } from "lucide-react";
import { createPermissionColumns, type Permission } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialPermissionsData: Permission[] = [
  { id: "perm_1", title: "create_user" },
  { id: "perm_2", title: "delete_role" },
  { id: "perm_3", title: "/dashboard/analytics" },
  { id: "perm_4", title: "view_reports" },
  { id: "perm_5", title: "ADMIN_ACCESS" },
  { id: "perm_6", title: "manage_settings" },
  { id: "perm_7", title: "/admin/users" },
  { id: "perm_8", title: "edit_company" },
  { id: "perm_9", title: "USR_001" },
  { id: "perm_10", title: "vessel_management" },
];

export default function PermissionsPage() {
  const [permissions] = React.useState<Permission[]>(initialPermissionsData);
  const [searchInput, setSearchInput] = React.useState("");
  
  const handleAddPermission = () => {
    console.log("Add Permission button clicked (visual only)");
  };

  const handleEditPermission = (permission: Permission) => {
    console.log("Edit Permission button clicked (visual only) for permission:", permission.title);
  };

  const handleDeletePermission = (permissionId: string) => {
    const permission = permissions.find(p => p.id === permissionId);
    console.log("Delete Permission button clicked (visual only) for permission ID:", permissionId, "Title:", permission?.title);
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const columns = React.useMemo(
    () => createPermissionColumns({ onEdit: handleEditPermission, onDelete: handleDeletePermission }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] 
  );

  const tableData = permissions; 

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
          <h1 className="text-3xl font-bold text-foreground">Permissions</h1>
          <p className="text-muted-foreground">Manage system permissions here.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className='space-x-1' onClick={handleAddPermission}>
            <span>Add Permission</span> <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-grow items-center gap-2 flex-wrap">
          <div className="relative flex-grow sm:flex-grow-0 min-w-[200px] sm:min-w-[280px] md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter permissions..."
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
                  let displayName = column.id;
                  if (column.id === 'title') displayName = 'Permission Title';
                  
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
