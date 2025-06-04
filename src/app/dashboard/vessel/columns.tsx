
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Vessel } from "./page"; 
import { getVesselStatusName, getVesselStatusColor, formatETADate, getVesselTypeCategory } from '@/lib/vesselUtils';

interface VesselColumnsProps {
  onOpenDetails: (vessel: Vessel) => void;
}

export const createVesselColumns = ({ onOpenDetails }: VesselColumnsProps): ColumnDef<Vessel>[] => [
  {
    accessorKey: "NAME",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4">
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.original.NAME}</div>,
  },
  {
    accessorKey: "MMSI",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4">
        MMSI <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "IMO",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4">
        IMO <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.original.IMO || "N/A",
  },
  {
    accessorKey: "TYPE",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4">
        Type <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => getVesselTypeCategory(row.original.TYPE),
    filterFn: (row, id, value) => {
      return value.includes(getVesselTypeCategory(row.getValue(id)))
    },
  },
  {
    accessorKey: "SPEED",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4">
        Speed <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => `${row.original.SPEED !== undefined ? row.original.SPEED.toFixed(1) : 'N/A'} kn`,
  },
  {
    accessorKey: "HEADING",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4">
        Course <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => `${row.original.HEADING !== undefined ? row.original.HEADING : 'N/A'}°`,
  },
  {
    accessorKey: "DESTINATION",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4">
        Destination <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.original.DESTINATION || "N/A",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "ETA",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4">
        ETA <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => formatETADate(row.original.ETA),
    sortingFn: 'datetime',
  },
  {
    accessorKey: "NAV_STATUS",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4">
        Status <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const statusName = getVesselStatusName(row.original.NAV_STATUS);
      const statusColor = getVesselStatusColor(row.original.NAV_STATUS);
      return (
        <Badge className={cn("capitalize px-2 py-0.5 text-xs border", statusColor)}>
          {statusName}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(getVesselStatusName(row.getValue(id)))
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onOpenDetails(row.original)}
        >
          Details
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

