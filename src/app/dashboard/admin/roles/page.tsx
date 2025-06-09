

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
import { createRoleColumns, type Role } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useToast } from "@/hooks/use-toast"; // Not needed for visual-only

const initialRolesData: Role[] = [
  { id: "role_1", name: "Admin" },
  { id: "role_2", name: "Manager" },
  { id: "role_3", name: "Employee" },
  { id: "role_4", name: "Viewer" },
  { id: "role_5", name: "Supervisor" },
  { id: "role_6", name: "Coordinator" },
  { id: "role_7", name: "Lead Technician" },
  { id: "role_8", name: "Support Staff" },
];

export default function RolesPage() {
  // const { toast } = useToast(); // Visual only, no toasts for button clicks yet
  const [roles] = React.useState<Role[]>(initialRolesData);
  const [searchInput, setSearchInput] = React.useState("");

  const handleAddRole = () => {
    console.log("Add Role button clicked (visual only)");
    // toast({ title: "Add Role Clicked", description: "This is a visual placeholder for adding a new role." });
  };

  const handleEditRole = (role: Role) => {
    console.log("Edit Role button clicked (visual only) for role:", role.name);
    // toast({ title: `Edit ${role.name}`, description: "This is a visual placeholder for editing a role." });
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    console.log("Delete Role button clicked (visual only) for role ID:", roleId, "Name:", role?.name);
    // toast({ title: `Delete Role ID ${roleId}`, description: `This is a visual placeholder for deleting role ${role?.name}.` });
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const columns = React.useMemo(
    () => createRoleColumns({ onEdit: handleEditRole, onDelete: handleDeleteRole }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // No dependencies needed as handlers don't change based on roles state here
  );

  // For visual search input only, does not filter table data.
  const tableData = roles; 

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
    getFilteredRowModel: getFilteredRowModel(), // Still useful for column filters if added later
    manualPagination: false, 
    manualFiltering: true, // Search input is visual only for now
    manualSorting: false,
  });

  return (
    <div className="space-y-6">
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Roles</h1>
          <p className="text-muted-foreground">Manage user roles and permissions here.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className='space-x-1' onClick={handleAddRole}>
            <span>Add Role</span> <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-grow items-center gap-2 flex-wrap">
          <div className="relative flex-grow sm:flex-grow-0 min-w-[200px] sm:min-w-[280px] md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter roles..."
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
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter(column => column.getCanHide()) // Only show hideable columns
                .map((column) => {
                  // Attempt to create a more friendly display name
                  let displayName = column.id;
                  if (column.id === 'name') displayName = 'Role Name';
                  // Add more specific cases if other IDs are not user-friendly

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
