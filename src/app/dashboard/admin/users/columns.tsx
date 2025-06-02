
"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Matches the type in page.tsx
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Employee' | 'Viewer';
  status: 'Active' | 'Inactive';
  avatar?: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const user = row.original
        return (
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
                <span className="font-medium">{user.name}</span>
            </div>
        )
    },
    enableHiding: false, // Keep name column always visible
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as User["status"]
      return (
        <Badge
          className={cn(
            "capitalize px-2 py-0.5 text-xs",
            status === 'Active'
              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800/30 dark:text-green-400 border border-green-200 dark:border-green-700"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700/30 dark:text-gray-400 border border-gray-200 dark:border-gray-600"
          )}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      // const user = row.original; // If needed for action handlers
      return (
        <div className="flex items-center justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-300 transform transition-transform duration-150 ease-in-out hover:scale-105"
            onClick={() => console.log("Edit user:", row.original.id)}
          >
            <Edit className="mr-1 h-3.5 w-3.5" /> Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/50 dark:hover:text-red-300 transform transition-transform duration-150 ease-in-out hover:scale-105"
            onClick={() => console.log("Delete user:", row.original.id)}
          >
            <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
          </Button>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]
