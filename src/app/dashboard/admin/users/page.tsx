
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, PlusCircle } from "lucide-react";
import { columns, type User } from "./columns"; 
import { DataTable } from "@/components/ui/data-table";


// Expanded sample data for pagination testing
const users: User[] = [
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
