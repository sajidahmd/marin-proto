import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Vessel } from "@/app/dashboard/vessel/page";
import { getVesselStatusName, getVesselTypeCategory, formatETADate } from "@/lib/vesselUtils";
import { Globe, Ship as ShipIcon, CalendarClock, Gauge, Compass, MapPin, Tag, Fingerprint, Sailboat, Info, BellPlus, Trash } from 'lucide-react';

interface VesselDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vessel: Vessel | null;
  onInitiateDelete: (vessel: Vessel) => void;
}

const DetailItem: React.FC<{ label: string; value?: string | number | null; icon?: React.ElementType; children?: React.ReactNode }> = ({ label, value, icon: Icon, children }) => (
  <div className="flex items-start space-x-3">
    {Icon && <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />}
    <div className="flex-grow">
      <p className="text-sm font-medium text-primary">{label}</p>
      {value !== undefined && value !== null ? <p className="text-base text-foreground break-words">{value}</p> : children}
    </div>
  </div>
);

const calculateEtaCountdown = (etaString?: string): string => {
  if (!etaString) return "N/A";
  const etaDate = new Date(etaString);
  if (isNaN(etaDate.getTime())) return "Invalid Date";

  const now = new Date();
  let diff = etaDate.getTime() - now.getTime();

  if (diff <= 0) return "Arrived / Past ETA";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));

  let countdownStr = "";
  if (days > 0) countdownStr += `${days}d `;
  if (hours > 0) countdownStr += `${hours}h `;
  if (minutes > 0 || (days === 0 && hours === 0)) countdownStr += `${minutes}m`;

  return countdownStr.trim() || "Approaching";
};


export default function VesselDetailsModal({ isOpen, onClose, vessel, onInitiateDelete }: VesselDetailsModalProps) {
  const [etaCountdown, setEtaCountdown] = React.useState<string>("Calculating...");
  const [formattedDisplayEta, setFormattedDisplayEta] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen && vessel) {
      const updateEtaFields = () => {
        if (vessel.ETA) {
          setEtaCountdown(calculateEtaCountdown(vessel.ETA));
          setFormattedDisplayEta(formatETADate(vessel.ETA));
        } else {
          setEtaCountdown("N/A");
          setFormattedDisplayEta("N/A");
        }
      };
      updateEtaFields();
      const intervalId = setInterval(updateEtaFields, 60000); 

      return () => clearInterval(intervalId);
    } else if (!isOpen) {
      setEtaCountdown("Calculating...");
      setFormattedDisplayEta(null);
    }
  }, [isOpen, vessel]);

  if (!vessel) return null;

  const vesselTypeDisplay = `${vessel.TYPE} (${getVesselTypeCategory(vessel.TYPE)})`;
  const navStatusDisplay = getVesselStatusName(vessel.NAV_STATUS);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] grid-rows-[auto_1fr_auto] p-0" onPointerDownOutside={(e) => {
        if (e.target && (e.target as HTMLElement).hasAttribute('data-radix-dialog-overlay')) {
          onClose();
        }
      }}>
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-semibold">{vessel.NAME || 'Vessel Details'}</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6 overflow-y-auto max-h-[calc(80vh-180px)]"> {/* Adjusted max-height for footer */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-full sm:w-[150px] h-auto sm:h-[100px] rounded-md overflow-hidden border bg-muted flex-shrink-0">
              <img
                src={`https://placehold.co/300x200.png`}
                data-ai-hint={`${getVesselTypeCategory(vessel.TYPE).toLowerCase()} ship`}
                alt={`Image of ${vessel.NAME}`}
                width={300}
                height={200}
                className="object-cover w-full h-full"
                // loading="lazy"
              />
            </div>
            <div className="space-y-1 flex-grow">
              <h2 className="text-2xl font-bold text-foreground">{vessel.NAME}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <DetailItem label="MMSI:" value={vessel.MMSI} icon={Fingerprint}/>
                <DetailItem label="IMO:" value={vessel.IMO || 'N/A'} icon={Tag}/>
                <DetailItem label="Call Sign:" value={vessel.CALLSIGN || 'N/A'} icon={Info}/>
                <DetailItem label="Type:" value={vesselTypeDisplay} icon={Sailboat}/>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Globe className="h-5 w-5 mr-2 text-primary" />
              Real-Time Tracking
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <DetailItem label="Position:" value={`${vessel.LAT.toFixed(4)}°N, ${vessel.LON.toFixed(4)}°E`} icon={MapPin} />
              <DetailItem label="Speed:" value={vessel.SPEED !== undefined ? `${vessel.SPEED.toFixed(1)} knots` : 'N/A'} icon={Gauge}/>
              <DetailItem label="Course:" value={`${vessel.HEADING !== undefined ? vessel.HEADING : 'N/A'}°`} icon={Compass} />
              <DetailItem label="Nav Status:" value={navStatusDisplay} icon={ShipIcon} />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <ShipIcon className="h-5 w-5 mr-2 text-primary" />
              Voyage Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <DetailItem label="Destination:" value={vessel.DESTINATION || 'N/A'} icon={MapPin}/>
              <DetailItem label="ETA:" value={formattedDisplayEta || (vessel.ETA ? "Loading..." : "N/A")} icon={CalendarClock} />
              <DetailItem label="Arriving In:" value={etaCountdown} icon={CalendarClock}/>
              <DetailItem label="Distance Rem.:" value={vessel.DISTANCE_REMAINING !== undefined ? `${vessel.DISTANCE_REMAINING} NM` : 'N/A'} icon={Gauge} />
            </div>
            <div className="mt-4 pt-2">
              <Button variant="default" size="sm" onClick={() => console.log('Set Alert clicked for vessel:', vessel.NAME)}>
                <BellPlus className="mr-2 h-4 w-4" />
                Set Alert
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6 pt-4 border-t flex justify-between items-center">
             <Button 
                variant="destructive" 
                onClick={() => onInitiateDelete(vessel)}
                aria-label={`Delete vessel ${vessel.NAME}`}
             >
                <Trash className="mr-2 h-4 w-4" />
                Delete Vessel
             </Button>
             <Button variant="default" onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
