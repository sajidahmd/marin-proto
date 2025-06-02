
"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel, 
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Search, UserRoundPlus, ListFilter, X, SlidersHorizontal } from "lucide-react";
import { columns, type User } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Expanded sample data for pagination testing
const usersData: User[] = [
  { id: "usr_1", name: "Alice Wonderland", email: "alice@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_2", name: "Bob The Builder", email: "bob@example.com", role: "Manager", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_3", name: "Charlie Brown", email: "charlie@example.com", role: "Employee", status: "Inactive" },
  { id: "usr_4", name: "Diana Prince", email: "diana@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_5", name: "Edward Scissorhands", email: "edward@example.com", role: "Viewer", status: "Active" },
  { id: "usr_6", name: "Fiona Gallagher", email: "fiona@example.com", role: "Manager", status: "Inactive", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_7", name: "George Jetson", email: "george@example.com", role: "Admin", status: "Active" },
  { id: "usr_8", name: "Hannah Montana", email: "hannah@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_9", name: "Iris West", email: "iris@example.com", role: "Viewer", status: "Inactive" },
  { id: "usr_10", name: "Jack Sparrow", email: "jack@example.com", role: "Manager", status: "Active" },
  { id: "usr_11", name: "Kara Danvers", email: "kara@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_12", name: "Leo Fitz", email: "leo@example.com", role: "Employee", status: "Inactive" },
  { id: "usr_13", name: "Monica Geller", email: "monica@example.com", role: "Manager", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_14", name: "Ned Flanders", email: "ned@example.com", role: "Viewer", status: "Active" },
  { id: "usr_15", name: "Olivia Pope", email: "olivia@example.com", role: "Admin", status: "Inactive" },
  { id: "usr_16", name: "Peter Parker", email: "peter@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_17", name: "Quinn Fabray", email: "quinn@example.com", role: "Employee", status: "Active" },
  { id: "usr_18", name: "Rachel Green", email: "rachel@example.com", role: "Manager", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_19", name: "Steve Rogers", email: "steve@example.com", role: "Admin", status: "Inactive" },
  { id: "usr_20", name: "Tony Stark", email: "tony@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_21", name: "Ursula Buffay", email: "ursula@example.com", role: "Viewer", status: "Active" },
  { id: "usr_22", name: "Victor Stone", email: "victor@example.com", role: "Employee", status: "Inactive", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_23", name: "Wanda Maximoff", email: "wanda@example.com", role: "Manager", status: "Active" },
  { id: "usr_24", name: "Xavier Charles", email: "xavier@example.com", role: "Admin", status: "Active" },
  { id: "usr_25", name: "Yvonne Strahovski", email: "yvonne@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_26", name: "Zelda Spellman", email: "zelda@example.com", role: "Manager", status: "Inactive" },
  { id: "usr_27", name: "Arthur Curry", email: "arthur@example.com", role: "Viewer", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_28", name: "Bruce Wayne", email: "bruce@example.com", role: "Admin", status: "Active" },
  { id: "usr_29", name: "Clark Kent", email: "clark@example.com", role: "Employee", status: "Inactive" },
  { id: "usr_30", name: "Selina Kyle", email: "selina@example.com", role: "Manager", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_31", name: "Barry Allen", email: "barry@example.com", role: "Employee", status: "Active" },
  { id: "usr_32", name: "Hal Jordan", email: "hal@example.com", role: "Admin", status: "Inactive", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_33", name: "Jessica Cruz", email: "jessica@example.com", role: "Viewer", status: "Active" },
  { id: "usr_34", name: "John Stewart", email: "john@example.com", role: "Manager", status: "Active" },
  { id: "usr_35", name: "Kyle Rayner", email: "kyle@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_36", name: "Lois Lane", email: "lois@example.com", role: "Admin", status: "Inactive" },
  { id: "usr_37", name: "Oliver Queen", email: "oliver@example.com", role: "Manager", status: "Active" },
  { id: "usr_38", name: "Pamela Isley", email: "pamela@example.com", role: "Viewer", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_39", name: "Harvey Dent", email: "harvey@example.com", role: "Employee", status: "Inactive" },
  { id: "usr_40", name: "James Gordon", email: "james@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/32x32.png" },
];

const userRoles: User['role'][] = ["Admin", "Manager", "Employee", "Viewer"];
const userStatuses: User['status'][] = ["Active", "Inactive"];

export default function UsersPage() {
  const [searchInput, setSearchInput] = React.useState(""); 
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<User['status']>>(new Set());
  const [selectedRoles, setSelectedRoles] = React.useState<Set<User['role']>>(new Set());

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleStatusChange = (status: User['status'], checked: boolean) => {
    setSelectedStatuses(prev => {
      const next = new Set(prev);
      if (checked) next.add(status);
      else next.delete(status);
      return next;
    });
     setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const handleRoleChange = (role: User['role'], checked: boolean) => {
    setSelectedRoles(prev => {
      const next = new Set(prev);
      if (checked) next.add(role);
      else next.delete(role);
      return next;
    });
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const resetFilters = () => {
    setSelectedStatuses(new Set());
    setSelectedRoles(new Set());
    setSearchInput("");
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const filteredUsers = React.useMemo(() => {
    let users = usersData;
    
    if (searchInput) {
        users = users.filter(user =>
            user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.email.toLowerCase().includes(searchInput.toLowerCase())
        );
    }
    if (selectedStatuses.size > 0) {
      users = users.filter(user => selectedStatuses.has(user.status));
    }
    if (selectedRoles.size > 0) {
      users = users.filter(user => selectedRoles.has(user.role));
    }
    return users;
  }, [selectedStatuses, selectedRoles, searchInput]);

  const table = useReactTable({
    data: filteredUsers,
    columns,
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), 
    manualPagination: false, 
    manualFiltering: true, 
    manualSorting: false, 
  });

  const activeFilterCount = selectedStatuses.size + selectedRoles.size;

  return (
    <div className="space-y-6">
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div>
          <h1 className="text-3xl font-bold text-foreground">User List</h1>
          <p className="text-muted-foreground">Manage your users and their roles here.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className='space-x-1' onClick={() => console.log('Add user clicked')}>
            <span>Add User</span> <UserRoundPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-grow items-center gap-2 flex-wrap">
          <div className="relative flex-grow sm:flex-grow-0 min-w-[200px] sm:min-w-[280px] md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter users..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPagination(prev => ({ ...prev, pageIndex: 0 }));
              }}
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                Status
                {selectedStatuses.size > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal lg:hidden">
                    {selectedStatuses.size}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userStatuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={selectedStatuses.has(status)}
                  onCheckedChange={(checked) => handleStatusChange(status, !!checked)}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                Role
                {selectedRoles.size > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal lg:hidden">
                    {selectedRoles.size}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userRoles.map((role) => (
                <DropdownMenuCheckboxItem
                  key={role}
                  checked={selectedRoles.has(role)}
                  onCheckedChange={(checked) => handleRoleChange(role, !!checked)}
                >
                  {role}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {activeFilterCount > 0 && (
            <Button variant="ghost" onClick={resetFilters} className="text-muted-foreground hover:text-foreground h-9 px-3">
              Reset
              <X className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1">
                    <SlidersHorizontal className="h-4 w-4" /> View
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[150px]">
                    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                        typeof column.columnDef.accessorFn !== "undefined" && column.getCanHide()
                    )
                    .map((column) => {
                        return (
                        <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                            {column.id}
                        </DropdownMenuCheckboxItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {Array.from(selectedStatuses).map(status => (
            <Badge key={`status-${status}`} variant="secondary" className="py-1 px-2 gap-1">
              Status: {status}
              <button 
                onClick={() => handleStatusChange(status, false)} 
                className="rounded-full hover:bg-muted-foreground/20 p-0.5 focus:outline-none focus:ring-1 focus:ring-ring"
                aria-label={`Remove status filter: ${status}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {Array.from(selectedRoles).map(role => (
            <Badge key={`role-${role}`} variant="secondary" className="py-1 px-2 gap-1">
              Role: {role}
              <button 
                onClick={() => handleRoleChange(role, false)} 
                className="rounded-full hover:bg-muted-foreground/20 p-0.5 focus:outline-none focus:ring-1 focus:ring-ring"
                aria-label={`Remove role filter: ${role}`}
                >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      <Card>
        <CardContent className="p-0">
          <DataTable table={table} />
        </CardContent>
      </Card>
    </div>
  );
}

      