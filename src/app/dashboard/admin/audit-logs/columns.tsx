

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type AuditLogEntry = {
  id: string;
  timestamp: string; // Using string for simplicity in sample data
  user: string;
  action: string;
};

export const auditLogColumns: ColumnDef<AuditLogEntry>[] = [
  {
    accessorKey: "timestamp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Timestamp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const entry = row.original
        return <div className="font-medium whitespace-nowrap">{entry.timestamp}</div>
    },
    enableHiding: true,
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const entry = row.original
        return <div className="font-medium">{entry.user}</div>
    },
    enableHiding: true,
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Action
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const entry = row.original
        return <div>{entry.action}</div>
    },
    enableHiding: true,
  },
]
