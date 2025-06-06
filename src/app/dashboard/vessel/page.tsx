
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
import { DataTable } from "@/components/ui/data-table";
import VesselCard from "@/components/dashboard/vessel/VesselCard";
import { createVesselColumns } from "./columns";
import { getVesselStatusName, getVesselTypeCategory, allVesselTypeCategories, allVesselStatuses, type VesselStatus, type VesselTypeCategory } from '@/lib/vesselUtils';
import { Search, ListFilter, LayoutGrid, List, SlidersHorizontal, X, Upload, Plus, Edit } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import VesselDetailsModal from "@/components/dashboard/vessel/VesselDetailsModal";
import AddVesselModal, { type AddVesselFormValues } from "@/components/dashboard/vessel/AddVesselModal";
import EditVesselModal, { type EditVesselFormValues } from "@/components/dashboard/vessel/EditVesselModal";
import DeleteVesselDialog from "@/components/dashboard/vessel/DeleteVesselDialog";
import { useToast } from "@/hooks/use-toast";


export interface Vessel {
  id: string;
  MMSI: number;
  IMO?: number;
  NAME: string;
  CALLSIGN?: string;
  TYPE: number; // AIS Vessel Type Code
  SPEED: number; // Knots
  HEADING?: number; // Course in degrees
  LAT: number;
  LON: number;
  DESTINATION?: string;
  ETA?: string; // ISO Date string
  NAV_STATUS?: number; // AIS Navigation Status Code
  DISTANCE_REMAINING?: number; // Nautical miles
}

const initialVesselData: Vessel[] = [
  { id: "v_1", MMSI: 211234567, IMO: 9123456, NAME: "MAERSK HANOI", CALLSIGN: "A8AB1", TYPE: 70, SPEED: 15.2, HEADING: 120, LAT: 34.0522, LON: -118.2437, DESTINATION: "BDCGP", ETA: "2025-07-21T12:00:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 1200 },
  { id: "v_2", MMSI: 366998877, IMO: 9234567, NAME: "MSC ISTANBUL", CALLSIGN: "WXYZ2", TYPE: 71, SPEED: 18.5, HEADING: 275, LAT: 25.276987, LON: 55.296249, DESTINATION: "HAMBURG", ETA: "2025-07-22T15:30:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 2500 },
  { id: "v_3", MMSI: 412222222, IMO: 9345678, NAME: "EVER ACE", CALLSIGN: "BCDE3", TYPE: 79, SPEED: 0.0, HEADING: 0, LAT: 1.3521, LON: 103.8198, DESTINATION: "SINGAPORE", ETA: "2025-07-20T08:00:00.000Z", NAV_STATUS: 5, DISTANCE_REMAINING: 0 },
  { id: "v_4", MMSI: 563333333, IMO: 9456789, NAME: "OOCL SPAIN", CALLSIGN: "DEFG4", TYPE: 70, SPEED: 1.2, HEADING: 180, LAT: 34.0522, LON: -118.2437, DESTINATION: "LOS ANGELES", ETA: "2025-07-23T10:45:00.000Z", NAV_STATUS: 1, DISTANCE_REMAINING: 50 },
  { id: "v_5", MMSI: 229988776, IMO: 9567890, NAME: "VALARIS DS-7", CALLSIGN: "EFGH5", TYPE: 80, SPEED: 10.0, HEADING: 45, LAT: 25.276987, LON: 55.296249, DESTINATION: "DUBAI", ETA: "2025-07-21T18:00:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 300 },
  { id: "v_6", MMSI: 636001234, IMO: 9678901, NAME: "ARABIAN EXPLORER", CALLSIGN: "FGHI6", TYPE: 81, SPEED: 0.0, HEADING: 0, LAT: 1.3521, LON: 103.8198, DESTINATION: "SINGAPORE", ETA: "2025-07-24T09:15:00.000Z", NAV_STATUS: 5, DISTANCE_REMAINING: 0 },
  { id: "v_7", MMSI: 311000678, IMO: 9789012, NAME: "SYMPHONY OF THE SEAS", CALLSIGN: "GHIJ7", TYPE: 60, SPEED: 20.1, HEADING: 310, LAT: 25.761681, LON: -80.191788, DESTINATION: "NASSAU", ETA: "2025-07-20T20:00:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 150 },
  { id: "v_8", MMSI: 235098765, IMO: 9890123, NAME: "QUEEN MARY 2", CALLSIGN: "HIJK8", TYPE: 69, SPEED: 0.5, HEADING: 0, LAT: 50.909698, LON: -1.404354, DESTINATION: "SOUTHAMPTON", ETA: "2025-07-25T11:30:00.000Z", NAV_STATUS: 1, DISTANCE_REMAINING: 10 },
  { id: "v_9", MMSI: 477123987, IMO: 8123450, NAME: "ATLANTIC STAR", CALLSIGN: "IJKL9", TYPE: 70, SPEED: 12.0, HEADING: 90, LAT: 40.712776, LON: -74.005974, DESTINATION: "ROTTERDAM", ETA: "2025-07-26T14:00:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 3000 },
  { id: "v_10", MMSI: 219876000, IMO: 8234501, NAME: "PACIFIC VOYAGER", CALLSIGN: "JKLM0", TYPE: 70, SPEED: 0.0, HEADING: 0, LAT: 34.0522, LON: -118.2437, DESTINATION: "LOS ANGELES", ETA: "2025-07-22T22:00:00.000Z", NAV_STATUS: 5, DISTANCE_REMAINING: 0 },
  { id: "v_11", MMSI: 257000111, IMO: 8345012, NAME: "NORTHERN LIGHT", CALLSIGN: "KLMN1", TYPE: 30, SPEED: 8.5, HEADING: 15, LAT: 60.472024, LON: 8.468946, DESTINATION: "BERGEN", ETA: "2025-07-21T05:00:00.000Z", NAV_STATUS: 7, DISTANCE_REMAINING: 50 },
  { id: "v_12", MMSI: 205222333, IMO: 8450123, NAME: "SEA HARVESTER", CALLSIGN: "LMNO2", TYPE: 31, SPEED: 5.0, HEADING: 200, LAT: 58.969975, LON: 5.733107, DESTINATION: "STAVANGER", ETA: "2025-07-23T16:30:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 25 },
  { id: "v_13", MMSI: 244333444, IMO: 8501234, NAME: "FASTCAT ANDROS", CALLSIGN: "MNOP3", TYPE: 40, SPEED: 35.0, HEADING: 180, LAT: 37.983810, LON: 23.727539, DESTINATION: "PIRAEUS", ETA: "2025-07-20T09:30:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 100 },
  { id: "v_14", MMSI: 265444555, IMO: 8012345, NAME: "PILOT ONE", CALLSIGN: "NOPQ4", TYPE: 50, SPEED: 10.0, HEADING: 0, LAT: 51.507351, LON: -0.127758, DESTINATION: "THAMES ESTUARY", ETA: "2025-07-20T19:00:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 5 },
  { id: "v_15", MMSI: 212555666, IMO: 7123456, NAME: "UNKNOWN CARRIER", CALLSIGN: "OPQR5", TYPE: 0, SPEED: 11.5, HEADING: 330, LAT: 36.778259, LON: -119.417931, DESTINATION: "OAKLAND", ETA: "2025-07-24T23:30:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 600 },
  { id: "v_16", MMSI: 355666777, IMO: 7234567, NAME: "BULKER PROGRESS", CALLSIGN: "PQRS6", TYPE: 70, SPEED: 0.8, HEADING: 0, LAT: 22.3193039, LON: 114.1693611, DESTINATION: "HONG KONG", ETA: "2025-07-20T07:00:00.000Z", NAV_STATUS: 1, DISTANCE_REMAINING: 2 },
  { id: "v_17", MMSI: 377888999, IMO: 7345678, NAME: "CHEMICAL TRADER", CALLSIGN: "QRST7", TYPE: 80, SPEED: 14.0, HEADING: 75, LAT: 29.760427, LON: -95.369804, DESTINATION: "HOUSTON", ETA: "2025-07-23T02:00:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 800 },
  { id: "v_18", MMSI: 210999000, IMO: 7456789, NAME: "CRUISE MONARCH", CALLSIGN: "RSTU8", TYPE: 60, SPEED: 19.5, HEADING: 210, LAT: 18.220833, LON: -66.590149, DESTINATION: "SAN JUAN", ETA: "2025-07-21T13:45:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 200 },
  { id: "v_19", MMSI: 271000111, IMO: 7567890, NAME: "TUG TITAN", CALLSIGN: "STUV9", TYPE: 52, SPEED: 3.0, HEADING: 0, LAT: 4.895168, LON: 103.819836, DESTINATION: "PORT KLANG", ETA: "2025-07-20T10:00:00.000Z", NAV_STATUS: 5, DISTANCE_REMAINING: 1 },
  { id: "v_20", MMSI: 224111222, IMO: 7678901, NAME: "MEDITERRANEAN CARRIER", CALLSIGN: "TUVW0", TYPE: 70, SPEED: 16.0, HEADING: 135, LAT: 39.904203, LON: 116.407394, DESTINATION: "QINGDAO", ETA: "2025-07-26T00:30:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 1500 },
  { id: "v_21", MMSI: 538222333, IMO: 9000001, NAME: "LNG MARS", CALLSIGN: "UVWX1", TYPE: 84, SPEED: 17.5, HEADING: 300, LAT: 27.950575, LON: -82.457178, DESTINATION: "TAMPA", ETA: "2025-07-21T01:00:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 400 },
  { id: "v_22", MMSI: 316333444, IMO: 9000002, NAME: "CANADIAN COAST GUARD", CALLSIGN: "VWXY2", TYPE: 55, SPEED: 0.0, HEADING: 0, LAT: 45.421530, LON: -75.697193, DESTINATION: "OTTAWA RIVER", ETA: "2025-07-27T03:00:00.000Z", NAV_STATUS: 5, DISTANCE_REMAINING: 0 },
  { id: "v_23", MMSI: 218444555, IMO: 9000003, NAME: "BALTIC RO-RO", CALLSIGN: "WXYZ3", TYPE: 75, SPEED: 13.0, HEADING: 45, LAT: 54.687157, LON: 25.279652, DESTINATION: "KLAIPEDA", ETA: "2025-07-22T06:30:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 700 },
  { id: "v_24", MMSI: 431555666, IMO: 9000004, NAME: "TOKYO EXPRESS", CALLSIGN: "XYZA4", TYPE: 70, SPEED: 19.0, HEADING: 190, LAT: 35.689487, LON: 139.691711, DESTINATION: "YOKOHAMA", ETA: "2025-07-20T14:00:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 900 },
  { id: "v_25", MMSI: 603666777, IMO: 9000005, NAME: "AFRICAN TRADER", CALLSIGN: "YZAB5", TYPE: 70, SPEED: 1.5, HEADING: 0, LAT: -33.924868, LON: 18.424055, DESTINATION: "CAPE TOWN", ETA: "2025-07-27T12:00:00.000Z", NAV_STATUS: 1, DISTANCE_REMAINING: 20 },
  { id: "v_26", MMSI: 228777888, IMO: 9000006, NAME: "LE HAVRE FREIGHTER", CALLSIGN: "ZABC6", TYPE: 70, SPEED: 0.0, HEADING: 0, LAT: 49.49437, LON: 0.107929, DESTINATION: "LE HAVRE", ETA: "2025-07-20T07:30:00.000Z", NAV_STATUS: 5, DISTANCE_REMAINING: 0 },
  { id: "v_27", MMSI: 215888999, IMO: 9000007, NAME: "MALTA SUPPLY VESSEL", CALLSIGN: "ABCD7", TYPE: 51, SPEED: 9.0, HEADING: 110, LAT: 35.937496, LON: 14.504167, DESTINATION: "VALLETTA", ETA: "2025-07-20T17:00:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 80 },
  { id: "v_28", MMSI: 249999000, IMO: 9000008, NAME: "ANTWERP CONTAINER", CALLSIGN: "BCDE8", TYPE: 73, SPEED: 15.5, HEADING: 25, LAT: 51.221350, LON: 4.402850, DESTINATION: "ANTWERP", ETA: "2025-07-22T19:30:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 1100 },
  { id: "v_29", MMSI: 232000111, IMO: 9000009, NAME: "BRISTOL BARGE", CALLSIGN: "CDEF9", TYPE: 90, SPEED: 0.0, HEADING: 0, LAT: 51.454513, LON: -2.587910, DESTINATION: "BRISTOL PORT", ETA: "2025-07-24T04:00:00.000Z", NAV_STATUS: 5, DISTANCE_REMAINING: 0 },
  { id: "v_30", MMSI: 209111222, IMO: 9000010, NAME: "CYPRUS CARRIER", CALLSIGN: "DEFG0", TYPE: 70, SPEED: 10.5, HEADING: 290, LAT: 34.916668, LON: 33.633331, DESTINATION: "LIMASSOL", ETA: "2025-07-21T10:30:00.000Z", NAV_STATUS: 0, DISTANCE_REMAINING: 250 },
];


export default function VesselPage() {
  const { toast } = useToast();
  const [vessels, setVessels] = React.useState<Vessel[]>(initialVesselData);
  const [filteredVessels, setFilteredVessels] = React.useState<Vessel[]>(initialVesselData);
  const [viewMode, setViewMode] = React.useState<'card' | 'list'>('card');
  
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedType, setSelectedType] = React.useState<VesselTypeCategory | "">("");
  const [selectedDestination, setSelectedDestination] = React.useState<string>("");
  const [selectedStatus, setSelectedStatus] = React.useState<VesselStatus | "">("");
  const [etaSort, setEtaSort] = React.useState<"earliest" | "latest" | "">("");

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);
  const [selectedVesselForDetails, setSelectedVesselForDetails] = React.useState<Vessel | null>(null);
  
  const [isAddVesselModalOpen, setIsAddVesselModalOpen] = React.useState(false);
  const [isEditVesselModalOpen, setIsEditVesselModalOpen] = React.useState(false);
  const [currentVesselToEdit, setCurrentVesselToEdit] = React.useState<Vessel | null>(null);

  const [isDeleteVesselDialogOpen, setIsDeleteVesselDialogOpen] = React.useState(false);
  const [vesselToDelete, setVesselToDelete] = React.useState<Vessel | null>(null);


  const handleOpenDetailsModal = (vessel: Vessel) => {
    setSelectedVesselForDetails(vessel);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedVesselForDetails(null);
  };

  const handleAddNewVessel = (data: AddVesselFormValues) => {
    const newVessel: Vessel = {
      id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      IMO: data.imoNumber ? parseInt(data.imoNumber.replace(/^(IMO\s?)/i, ''), 10) : undefined,
      MMSI: parseInt(data.mmsi, 10),
      NAME: data.vesselName,
      CALLSIGN: data.callSign,
      TYPE: data.vesselType,
      LAT: 0, 
      LON: 0, 
      SPEED: 0,
      NAV_STATUS: 5, 
      HEADING: undefined,
      DESTINATION: "N/A", 
      ETA: undefined,
      DISTANCE_REMAINING: undefined,
    };
    setVessels(prevVessels => [newVessel, ...prevVessels]);
    setIsAddVesselModalOpen(false);
    toast({
      title: "Vessel Added",
      description: `Vessel ${newVessel.NAME} has been successfully created.`,
    });
  };

  const handleOpenEditModal = (vessel: Vessel) => {
    setCurrentVesselToEdit(vessel);
    setIsEditVesselModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setCurrentVesselToEdit(null);
    setIsEditVesselModalOpen(false);
  };

  const handleUpdateVessel = (data: EditVesselFormValues) => {
    if (!currentVesselToEdit) return;
    setVessels(prevVessels =>
      prevVessels.map(v =>
        v.id === currentVesselToEdit.id
          ? {
              ...v,
              MMSI: parseInt(data.mmsi, 10),
              NAME: data.vesselName,
              CALLSIGN: data.callSign,
              TYPE: data.vesselType,
            }
          : v
      )
    );
    handleCloseEditModal();
    toast({
      title: "Vessel Updated",
      description: `Vessel ${data.vesselName} has been successfully updated.`,
    });
  };

  const handleOpenDeleteDialog = (vessel: Vessel) => {
    setVesselToDelete(vessel);
    setIsDeleteVesselDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setVesselToDelete(null);
    setIsDeleteVesselDialogOpen(false);
  };

  const handleConfirmDeleteVessel = () => {
    if (!vesselToDelete) return;
    setVessels(prevVessels => prevVessels.filter(v => v.id !== vesselToDelete.id));
    toast({
      title: "Vessel Deleted",
      description: `Vessel ${vesselToDelete.NAME} has been successfully deleted.`,
      variant: "default",
    });
    handleCloseDeleteDialog();
    handleCloseDetailsModal(); // Close details modal as well
  };


  React.useEffect(() => {
    const savedViewMode = localStorage.getItem('vesselViewMode') as 'card' | 'list';
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('vesselViewMode', viewMode);
  }, [viewMode]);

  
  const uniqueDestinations = React.useMemo(() => {
    const destinations = new Set(vessels.map(v => v.DESTINATION).filter(Boolean) as string[]);
    return Array.from(destinations).sort();
  }, [vessels]);


  React.useEffect(() => {
    let tempVessels = [...vessels];

    if (searchTerm) {
      tempVessels = tempVessels.filter(v =>
        v.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.MMSI.toString().includes(searchTerm) ||
        (v.IMO && v.IMO.toString().includes(searchTerm))
      );
    }

    if (selectedType) {
      tempVessels = tempVessels.filter(v => getVesselTypeCategory(v.TYPE) === selectedType);
    }

    if (selectedDestination) {
      tempVessels = tempVessels.filter(v => v.DESTINATION === selectedDestination);
    }

    if (selectedStatus) {
      tempVessels = tempVessels.filter(v => getVesselStatusName(v.NAV_STATUS) === selectedStatus);
    }
    
    if (etaSort && (etaSort === 'earliest' || etaSort === 'latest')) {
      tempVessels.sort((a, b) => {
        const dateA = a.ETA ? new Date(a.ETA).getTime() : 0;
        const dateB = b.ETA ? new Date(b.ETA).getTime() : 0;
        
        if (!dateA && !dateB) return 0; 
        if (!dateA) return etaSort === 'earliest' ? 1 : -1; 
        if (!dateB) return etaSort === 'earliest' ? -1 : 1; 
        
        return etaSort === 'earliest' ? dateA - dateB : dateB - dateA;
      });
    }

    setFilteredVessels(tempVessels);
    if(table.getState().pagination.pageIndex !== 0) {
        table.setPageIndex(0); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vessels, searchTerm, selectedType, selectedDestination, selectedStatus, etaSort]);


  const columns = React.useMemo<ColumnDef<Vessel>[]>(() => createVesselColumns({onOpenDetails: handleOpenDetailsModal, onOpenEditModal: handleOpenEditModal}), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // Dependencies array is empty as handlers don't change based on component state here.
  );

  const table = useReactTable({
    data: filteredVessels,
    columns,
    state: { sorting, pagination, columnVisibility },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), 
    manualPagination: false,
    manualFiltering: false, 
    manualSorting: false, 
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedDestination("");
    setSelectedStatus("");
    setEtaSort("");
    table.setPageIndex(0);
  };
  
  const activeFilterCount = [searchTerm, selectedType, selectedDestination, selectedStatus, etaSort].filter(Boolean).length;


  return (
    <div className="space-y-6">
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vessels</h1>
          <p className="text-muted-foreground">Monitor vessel positions and track maritime traffic.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
            <div className="relative sm:col-span-2 md:col-span-3 lg:col-span-1">
              <Label htmlFor="vessel-search" className="sr-only">Search Vessels</Label>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="vessel-search"
                type="search"
                placeholder="Search vessels (Name, MMSI, IMO)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg bg-background pl-8 h-10"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="type-filter">Type</Label>
                <Select value={selectedType} onValueChange={(value) => setSelectedType(value === "all" ? "" : value as VesselTypeCategory)}>
                    <SelectTrigger id="type-filter" className="h-10"> <SelectValue placeholder="All Types" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {allVesselTypeCategories.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="destination-filter">Destination</Label>
                <Select value={selectedDestination} onValueChange={(value) => setSelectedDestination(value === "all" ? "" : value)}>
                    <SelectTrigger id="destination-filter" className="h-10"><SelectValue placeholder="All Destinations" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Destinations</SelectItem>
                        {uniqueDestinations.map(dest => (
                            <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="status-filter">Status</Label>
                <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value === "all" ? "" : value as VesselStatus)}>
                    <SelectTrigger id="status-filter" className="h-10"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {allVesselStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-1.5">
                <Label htmlFor="eta-sort">Sort by ETA</Label>
                <Select 
                  value={etaSort === "" ? "no_sort_selected" : etaSort} 
                  onValueChange={(value) => {
                    if (value === "no_sort_selected") {
                      setEtaSort("");
                    } else {
                      setEtaSort(value as "earliest" | "latest");
                    }
                  }}
                >
                    <SelectTrigger id="eta-sort" className="h-10"><SelectValue placeholder="Default" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="no_sort_selected">Default</SelectItem>
                        <SelectItem value="earliest">Earliest First</SelectItem>
                        <SelectItem value="latest">Latest First</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="view-mode-toggle" className="text-sm font-medium">View:</Label>
              <Switch
                id="view-mode-toggle"
                checked={viewMode === 'card'}
                onCheckedChange={(checked) => setViewMode(checked ? 'card' : 'list')}
                aria-label={`Switch to ${viewMode === 'card' ? 'List' : 'Card'} view`}
              />
              {viewMode === 'card' ? 
                <LayoutGrid className="h-5 w-5 text-primary" /> : 
                <List className="h-5 w-5 text-primary" />
              }
              <span className="text-sm text-muted-foreground">{viewMode === 'card' ? 'Card View' : 'List View'}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                className="h-10"
                onClick={() => console.log("Bulk Import clicked (visual only)")}
                aria-label="Bulk Import Vessels"
              >
                <Upload className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Bulk Import</span>
              </Button>
              <Button
                className="h-10 space-x-1"
                onClick={() => setIsAddVesselModalOpen(true)}
                aria-label="Add New Vessel"
              >
                <Plus className="h-4 w-4 sm:mr-1" />
                <span className="hidden sm:inline">Add Vessel</span>
              </Button>
              {viewMode === 'list' && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto gap-1 h-10">
                      <SlidersHorizontal className="h-4 w-4" />
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table.getAllColumns().filter(column => column.getCanHide()).map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id.replace(/_/g, ' ')}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {activeFilterCount > 0 && (
                  <Button variant="ghost" onClick={clearFilters} className="h-10 text-muted-foreground hover:text-foreground">
                    Clear Filters <X className="ml-1 h-4 w-4" />
                  </Button>
              )}
            </div>
          </div>
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 items-center pt-2 border-t mt-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchTerm && <Badge variant="secondary" className="py-1 px-2">Search: {searchTerm}</Badge>}
                {selectedType && <Badge variant="secondary" className="py-1 px-2">Type: {selectedType}</Badge>}
                {selectedDestination && <Badge variant="secondary" className="py-1 px-2">Destination: {selectedDestination}</Badge>}
                {selectedStatus && <Badge variant="secondary" className="py-1 px-2">Status: {selectedStatus}</Badge>}
                {etaSort && <Badge variant="secondary" className="py-1 px-2">ETA Sort: {etaSort === "earliest" ? "Earliest" : "Latest"}</Badge>}
            </div>
          )}
        </CardContent>
      </Card>
      
      {viewMode === 'card' ? (
        filteredVessels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVessels.map((vessel) => (
              <VesselCard key={vessel.id} vessel={vessel} onOpenDetails={handleOpenDetailsModal} onOpenEditModal={handleOpenEditModal} />
            ))}
          </div>
        ) : (
           <Card className="mt-6">
            <CardContent className="p-6 text-center text-muted-foreground">
              No vessels match the current filters.
            </CardContent>
          </Card>
        )
      ) : (
        <Card className="mt-6">
          <CardContent className="p-0">
            <DataTable table={table} />
          </CardContent>
        </Card>
      )}
      <VesselDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        vessel={selectedVesselForDetails}
        onInitiateDelete={handleOpenDeleteDialog}
      />
      <AddVesselModal
        isOpen={isAddVesselModalOpen}
        onClose={() => setIsAddVesselModalOpen(false)}
        onSave={handleAddNewVessel}
      />
      <EditVesselModal
        isOpen={isEditVesselModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleUpdateVessel}
        vesselToEdit={currentVesselToEdit}
      />
      <DeleteVesselDialog
        isOpen={isDeleteVesselDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDeleteVessel}
        vesselName={vesselToDelete?.NAME || ""}
      />
    </div>
  );
}

