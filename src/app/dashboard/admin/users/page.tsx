
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, PlusCircle } from "lucide-react";
import { columns, type User } from "./columns"; 
import { DataTable } from "@/components/ui/data-table";


// Sample data (same as before, ensure User type matches columns.tsx)
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
  const [data, setData] = React.useState<User[]>(users); // For potential future client-side filtering/updates

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
              // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""} // Example for future filtering
              // onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
