
"use client";

import * as React from "react";
import {
  ColumnDef,
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
import { Search, UserRoundPlus, ListFilter, X, SlidersHorizontal } from "lucide-react";
import { createUserColumns, type User } from "./columns";
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
import AddUserModal, { type AddUserFormValues } from "@/components/admin/users/AddUserModal";
import EditUserModal, { type EditUserFormValues } from "@/components/admin/users/EditUserModal";
import DeleteUserDialog from "@/components/admin/users/DeleteUserDialog"; // Import DeleteUserDialog
import { useToast } from "@/hooks/use-toast";

const initialUsersData: User[] = [
  { id: "usr_1", name: "Alice Wonderland", username: "alicew", email: "alice@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "123-456-7890" },
  { id: "usr_2", name: "Bob The Builder", username: "bob_b", email: "bob@example.com", role: "Manager", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "234-567-8901" },
  { id: "usr_3", name: "Charlie Brown", username: "charlieb", email: "charlie@example.com", role: "Employee", status: "Inactive", phoneNumber: "" },
  { id: "usr_4", name: "Diana Prince", username: "wonder_d", email: "diana@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "345-678-9012" },
  { id: "usr_5", name: "Edward Scissorhands", username: "ed_scissor", email: "edward@example.com", role: "Viewer", status: "Active", phoneNumber: "456-789-0123" },
  { id: "usr_6", name: "Fiona Gallagher", username: "fiona_g", email: "fiona@example.com", role: "Manager", status: "Inactive", avatar: "https://placehold.co/32x32.png", phoneNumber: "567-890-1234" },
  { id: "usr_7", name: "George Jetson", username: "georgej", email: "george@example.com", role: "Admin", status: "Active", phoneNumber: "678-901-2345" },
  { id: "usr_8", name: "Hannah Montana", username: "hannah_m", email: "hannah@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "789-012-3456" },
  { id: "usr_9", name: "Iris West", username: "irisw", email: "iris@example.com", role: "Viewer", status: "Inactive", phoneNumber: "890-123-4567" },
  { id: "usr_10", name: "Jack Sparrow", username: "captain_jack", email: "jack@example.com", role: "Manager", status: "Active", phoneNumber: "901-234-5678" },
  { id: "usr_11", name: "Kara Danvers", username: "supergirl", email: "kara@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "012-345-6789" },
  { id: "usr_12", name: "Leo Fitz", username: "leof", email: "leo@example.com", role: "Employee", status: "Inactive", phoneNumber: "112-233-4455" },
  { id: "usr_13", name: "Monica Geller", username: "monica_g", email: "monica@example.com", role: "Manager", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "223-344-5566" },
  { id: "usr_14", name: "Ned Flanders", username: "ned_f", email: "ned@example.com", role: "Viewer", status: "Active", phoneNumber: "334-455-6677" },
  { id: "usr_15", name: "Olivia Pope", username: "olivia_p", email: "olivia@example.com", role: "Admin", status: "Inactive", phoneNumber: "445-566-7788" },
  { id: "usr_16", name: "Peter Parker", username: "spidey", email: "peter@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "556-677-8899" },
  { id: "usr_17", name: "Quinn Fabray", username: "quinn_f", email: "quinn@example.com", role: "Employee", status: "Active", phoneNumber: "667-788-9900" },
  { id: "usr_18", name: "Rachel Green", username: "rachel_g", email: "rachel@example.com", role: "Manager", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "778-899-0011" },
  { id: "usr_19", name: "Steve Rogers", username: "cap_america", email: "steve@example.com", role: "Admin", status: "Inactive", phoneNumber: "889-900-1122" },
  { id: "usr_20", name: "Tony Stark", username: "ironman", email: "tony@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "990-011-2233" },
  { id: "usr_21", name: "Ursula Buffay", username: "ursula_b", email: "ursula@example.com", role: "Viewer", status: "Active", phoneNumber: "001-122-3344" },
  { id: "usr_22", name: "Victor Stone", username: "cyborg", email: "victor@example.com", role: "Employee", status: "Inactive", avatar: "https://placehold.co/32x32.png", phoneNumber: "121-232-3435" },
  { id: "usr_23", name: "Wanda Maximoff", username: "scarlet_w", email: "wanda@example.com", role: "Manager", status: "Active", phoneNumber: "232-343-4546" },
  { id: "usr_24", name: "Xavier Charles", username: "prof_x", email: "xavier@example.com", role: "Admin", status: "Active", phoneNumber: "343-454-5657" },
  { id: "usr_25", name: "Yvonne Strahovski", username: "yvonne_s", email: "yvonne@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "454-565-6768" },
  { id: "usr_26", name: "Zelda Spellman", username: "zelda_s", email: "zelda@example.com", role: "Manager", status: "Inactive", phoneNumber: "565-676-7879" },
  { id: "usr_27", name: "Arthur Curry", username: "aquaman", email: "arthur@example.com", role: "Viewer", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "676-787-8980" },
  { id: "usr_28", name: "Bruce Wayne", username: "batman", email: "bruce@example.com", role: "Admin", status: "Active", phoneNumber: "787-898-9091" },
  { id: "usr_29", name: "Clark Kent", username: "superman", email: "clark@example.com", role: "Employee", status: "Inactive", phoneNumber: "898-909-0102" },
  { id: "usr_30", name: "Selina Kyle", username: "catwoman", email: "selina@example.com", role: "Manager", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "909-010-1213" },
  { id: "usr_31", name: "Barry Allen", username: "flash", email: "barry@example.com", role: "Employee", status: "Active", phoneNumber: "010-121-2324" },
  { id: "usr_32", name: "Hal Jordan", username: "green_lantern", email: "hal@example.com", role: "Admin", status: "Inactive", avatar: "https://placehold.co/32x32.png", phoneNumber: "120-231-3425" },
  { id: "usr_33", name: "Jessica Cruz", username: "jess_cruz_gl", email: "jessica@example.com", role: "Viewer", status: "Active", phoneNumber: "231-342-4536" },
  { id: "usr_34", name: "John Stewart", username: "john_stewart_gl", email: "john@example.com", role: "Manager", status: "Active", phoneNumber: "342-453-5647" },
  { id: "usr_35", name: "Kyle Rayner", username: "kyle_r_gl", email: "kyle@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "453-564-6758" },
  { id: "usr_36", name: "Lois Lane", username: "lois_l", email: "lois@example.com", role: "Admin", status: "Inactive", phoneNumber: "564-675-7869" },
  { id: "usr_37", name: "Oliver Queen", username: "green_arrow", email: "oliver@example.com", role: "Manager", status: "Active", phoneNumber: "675-786-8970" },
  { id: "usr_38", name: "Pamela Isley", username: "poison_ivy", email: "pamela@example.com", role: "Viewer", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "786-897-9081" },
  { id: "usr_39", name: "Harvey Dent", username: "two_face", email: "harvey@example.com", role: "Employee", status: "Inactive", phoneNumber: "897-908-0192" },
  { id: "usr_40", name: "James Gordon", username: "commissioner_g", email: "james@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/32x32.png", phoneNumber: "908-019-1203" },
];

const userRoles: User['role'][] = ["Admin", "Manager", "Employee", "Viewer"];
const userStatuses: User['status'][] = ["Active", "Inactive"];

export default function UsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = React.useState<User[]>(initialUsersData);
  const [searchInput, setSearchInput] = React.useState("");
  const [selectedStatuses, setSelectedStatuses] = React.useState<Set<User['status']>>(new Set());
  const [selectedRoles, setSelectedRoles] = React.useState<Set<User['role']>>(new Set());
  
  const [isAddUserModalOpen, setIsAddUserModalOpen] = React.useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = React.useState(false);
  const [currentUserToEdit, setCurrentUserToEdit] = React.useState<User | null>(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState<User | null>(null);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});


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

  const handleAddNewUser = (data: AddUserFormValues) => {
    const newUser: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${data.firstName} ${data.lastName}`,
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber || undefined,
      role: data.role,
      status: 'Inactive', 
    };
    setUsers(prevUsers => [newUser, ...prevUsers]);
    setIsAddUserModalOpen(false);
    toast({
      title: "User Created",
      description: `User ${newUser.name} has been successfully created.`,
    });
  };

  const handleOpenEditModal = (user: User) => {
    setCurrentUserToEdit(user);
    setIsEditUserModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setCurrentUserToEdit(null);
    setIsEditUserModalOpen(false);
  };
  
  const handleUpdateUser = (data: EditUserFormValues) => {
    if (!currentUserToEdit) return;

    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === currentUserToEdit.id
          ? {
              ...user,
              name: `${data.firstName} ${data.lastName}`,
              username: data.username,
              email: data.email,
              phoneNumber: data.phoneNumber || undefined,
              role: data.role,
            }
          : user
      )
    );
    handleCloseEditModal();
    toast({
      title: "User Updated",
      description: `User ${data.firstName} ${data.lastName} has been successfully updated.`,
    });
  };
  
  const handleOpenDeleteDialog = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUserToDelete(user);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setUserToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
    toast({
      title: "User Deleted",
      description: `User ${userToDelete.name} has been successfully deleted.`,
      variant: "default",
    });
    handleCloseDeleteDialog();
  };


  const columns = React.useMemo(
    () => createUserColumns({ onEdit: handleOpenEditModal, onDelete: handleOpenDeleteDialog }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // Removed users dependency to prevent re-render loops with table instance.
       // If columns need to react to users changes, a more specific dependency is needed.
  );

  const filteredUsers = React.useMemo(() => {
    let currentUsers = users;
    
    if (searchInput) {
        currentUsers = currentUsers.filter(user =>
            user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.username.toLowerCase().includes(searchInput.toLowerCase())
        );
    }
    if (selectedStatuses.size > 0) {
      currentUsers = currentUsers.filter(user => selectedStatuses.has(user.status));
    }
    if (selectedRoles.size > 0) {
      currentUsers = currentUsers.filter(user => selectedRoles.has(user.role));
    }
    return currentUsers;
  }, [users, selectedStatuses, selectedRoles, searchInput]);

  const table = useReactTable({
    data: filteredUsers,
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
    manualFiltering: true, 
    manualSorting: false,
  });

  const activeFilterCount = selectedStatuses.size + selectedRoles.size + (searchInput ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div>
          <h1 className="text-3xl font-bold text-foreground">User List</h1>
          <p className="text-muted-foreground">Manage your users and their roles here.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className='space-x-1' onClick={() => setIsAddUserModalOpen(true)}>
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
         {/* "View" Dropdown for column visibility - Removed per previous request */}
      </div>

      {activeFilterCount > 0 && !searchInput && (selectedStatuses.size > 0 || selectedRoles.size > 0) && (
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
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onSave={handleAddNewUser}
      />
      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleUpdateUser}
        userToEdit={currentUserToEdit}
      />
      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        userName={userToDelete?.name || ""}
      />
    </div>
  );
}
