

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Permission = {
  id: string;
  title: string; // Changed from 'name' to 'title' as per requirements
};

interface PermissionColumnsProps {
  onEdit: (permission: Permission) => void;
  onDelete: (permissionId: string) => void;
}

export const createPermissionColumns = ({ onEdit, onDelete }: PermissionColumnsProps): ColumnDef<Permission>[] => [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Permission Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const permission = row.original
        return <div className="font-medium">{permission.title}</div>
    },
    enableHiding: true,
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const permission = row.original;
      return (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-300 transform transition-transform duration-150 ease-in-out hover:scale-105"
            onClick={() => onEdit(permission)} // Visual only for now
          >
            <Edit className="mr-1 h-3.5 w-3.5" /> Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/50 dark:hover:text-red-300 transform transition-transform duration-150 ease-in-out hover:scale-105"
            onClick={() => onDelete(permission.id)} // Visual only for now
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
