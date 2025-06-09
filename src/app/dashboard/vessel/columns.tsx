
   

import * as React from 'react'; 
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit as EditIcon } from "lucide-react"; // Renamed Edit to EditIcon
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Vessel } from "./page";
import { getVesselStatusName, getVesselStatusColor, formatETADate, getVesselTypeCategory } from '@/lib/vesselUtils';

interface VesselColumnsProps {
  onOpenDetails: (vessel: Vessel) => void;
  onOpenEditModal: (vessel: Vessel) => void;
}

const FormattedEtaCell = ({ etaString }: { etaString?: string }) => {
  const [formattedDate, setFormattedDate] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (etaString) {
      setFormattedDate(formatETADate(etaString));
    } else {
      setFormattedDate("N/A");
    }
  }, [etaString]);

  return <div className="whitespace-nowrap">{formattedDate || (etaString ? "Loading..." : "N/A")}</div>;
};

export const createVesselColumns = ({ onOpenDetails, onOpenEditModal }: VesselColumnsProps): ColumnDef<Vessel>[] => [
  {
    accessorKey: "NAME",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="-ml-4">
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium whitespace-nowrap">{row.original.NAME}</div>,
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
    cell: ({ row }) => <div className="whitespace-nowrap">{getVesselTypeCategory(row.original.TYPE)}</div>,
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
    cell: ({ row }) => `${row.original.SPEED !== undefined ? row.original.SPEED.toFixed(1) : 'N/A'} knots`,
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
    cell: ({ row }) => <div className="whitespace-nowrap">{row.original.DESTINATION || "N/A"}</div>,
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
    cell: ({ row }) => <FormattedEtaCell etaString={row.original.ETA} />,
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
        <Badge className={cn("capitalize px-2 py-0.5 text-xs border whitespace-nowrap", statusColor)}>
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
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpenEditModal(row.original)}
          className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-300"
        >
          <EditIcon className="mr-1 h-3.5 w-3.5" /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpenDetails(row.original)}
          className="whitespace-nowrap"
        >
          Details
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

