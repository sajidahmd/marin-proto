
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Vessel } from '@/app/dashboard/vessel/page'; // Adjust path as needed
import { getVesselStatusName, getVesselStatusColor, formatETADate, getVesselTypeCategory } from '@/lib/vesselUtils';
import { Thermometer, Gauge, Compass, Anchor, CalendarClock, Ship, Tag, MapPin } from 'lucide-react';

interface VesselCardProps {
  vessel: Vessel;
}

export default function VesselCard({ vessel }: VesselCardProps) {
  const statusName = getVesselStatusName(vessel.NAV_STATUS);
  const statusColor = getVesselStatusColor(vessel.NAV_STATUS);
  const vesselType = getVesselTypeCategory(vessel.TYPE);

  const getImageHint = (type: VesselTypeCategory): string => {
    switch (type) {
      case 'Cargo': return 'cargo ship';
      case 'Tanker': return 'oil tanker';
      case 'Passenger': return 'cruise ship';
      case 'Fishing': return 'fishing boat';
      case 'High-Speed Craft': return 'fast ferry';
      case 'Special Craft': return 'tugboat ship';
      default: return 'ship ocean';
    }
  };
  
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0 relative">
        <Image
          src={`https://placehold.co/600x400.png`}
          data-ai-hint={getImageHint(vesselType)}
          alt={`Image of ${vessel.NAME}`}
          width={600}
          height={400}
          className="object-cover w-full h-48"
        />
         <div className="absolute top-2 right-2">
          <Badge className={cn("text-xs font-semibold py-1 px-2 border", statusColor)}>
            {statusName}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-3">
        <CardTitle className="text-xl font-bold text-foreground truncate" title={vessel.NAME}>
          {vessel.NAME}
        </CardTitle>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Ship className="h-4 w-4 text-primary" />
            <span className="font-medium">MMSI:</span> {vessel.MMSI}
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="h-4 w-4 text-primary" />
            <span className="font-medium">IMO:</span> {vessel.IMO || 'N/A'}
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4 text-primary" />
            <span className="font-medium">Speed:</span> {vessel.SPEED !== undefined ? `${vessel.SPEED.toFixed(1)} kn` : 'N/A'}
          </div>
          <div className="flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-primary" />
            <span className="font-medium">Course:</span> {vessel.HEADING !== undefined ? `${vessel.HEADING}°` : 'N/A'}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">Destination:</span> {vessel.DESTINATION || 'N/A'}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarClock className="h-4 w-4 text-primary" />
            <span className="font-medium">ETA:</span> {formatETADate(vessel.ETA)}
        </div>
         <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Anchor className="h-4 w-4 text-primary" />
            <span className="font-medium">Type:</span> {vesselType}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => console.log('View details for:', vessel.NAME)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

function cn(...inputs: Array<string | undefined | null | boolean>): string {
  return inputs.filter(Boolean).join(' ');
}
