
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, PlusCircle, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Employee' | 'Viewer';
  status: 'Active' | 'Inactive';
  avatar?: string;
};

const users: User[] = [
  { id: "usr_1", name: "Alice Wonderland", email: "alice@example.com", role: "Admin", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_2", name: "Bob The Builder", email: "bob@example.com", role: "Manager", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_3", name: "Charlie Brown", email: "charlie@example.com", role: "Employee", status: "Inactive" },
  { id: "usr_4", name: "Diana Prince", email: "diana@example.com", role: "Employee", status: "Active", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_5", name: "Edward Scissorhands", email: "edward@example.com", role: "Viewer", status: "Active" },
  { id: "usr_6", name: "Fiona Gallagher", email: "fiona@example.com", role: "Manager", status: "Inactive", avatar: "https://placehold.co/32x32.png" },
  { id: "usr_7", name: "George Jetson", email: "george@example.com", role: "Admin", status: "Active" },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
        <div className="flex w-full md:w-auto items-center space-x-2">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create User
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          data-ai-hint="user avatar" 
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      )}
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground lg:hidden">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.role}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "capitalize px-2 py-0.5 text-xs",
                        user.status === 'Active'
                          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/30 dark:text-green-400 border border-green-200 dark:border-green-700"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700/30 dark:text-gray-400 border border-gray-200 dark:border-gray-600"
                      )}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">User actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Update
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 dark:focus:bg-destructive dark:focus:text-destructive-foreground">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
