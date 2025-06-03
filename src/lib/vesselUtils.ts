
import type { Vessel } from '@/app/dashboard/vessel/page'; // Adjust path as needed

export type VesselStatus =
  | 'Underway'
  | 'At Anchor'
  | 'Not Under Command'
  | 'Restricted Manoeuverability'
  | 'Constrained by Draught'
  | 'Moored'
  | 'Aground'
  | 'Engaged in Fishing'
  | 'Sailing'
  | 'Reserved'
  | 'Unknown';

export const vesselStatusMap: Record<number, VesselStatus> = {
  0: 'Underway',
  1: 'At Anchor',
  2: 'Not Under Command',
  3: 'Restricted Manoeuverability',
  4: 'Constrained by Draught',
  5: 'Moored',
  6: 'Aground',
  7: 'Engaged in Fishing',
  8: 'Sailing',
  15: 'Reserved', // Not defined (default)
};

export function getVesselStatusName(statusCode?: number): VesselStatus {
  if (statusCode === undefined || statusCode === null) return 'Unknown';
  return vesselStatusMap[statusCode] || 'Unknown';
}

export function getVesselStatusColor(statusCode?: number): string {
  const statusName = getVesselStatusName(statusCode);
  switch (statusName) {
    case 'Underway':
    case 'Sailing':
      return 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400 border-green-200 dark:border-green-700';
    case 'Moored':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400 border-blue-200 dark:border-blue-700';
    case 'At Anchor':
    case 'Aground':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-400 border-orange-200 dark:border-orange-700';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-400 border-gray-200 dark:border-gray-600';
  }
}

export type VesselTypeCategory =
  | 'Cargo'
  | 'Tanker'
  | 'Passenger'
  | 'Fishing'
  | 'High-Speed Craft'
  | 'Special Craft'
  | 'Other'
  | 'Unknown';

export function getVesselTypeCategory(typeCode?: number): VesselTypeCategory {
  if (typeCode === undefined || typeCode === null) return 'Unknown';
  if (typeCode >= 70 && typeCode <= 79) return 'Cargo';
  if (typeCode >= 80 && typeCode <= 89) return 'Tanker';
  if (typeCode >= 60 && typeCode <= 69) return 'Passenger';
  if (typeCode >= 30 && typeCode <= 39) return 'Fishing';
  if (typeCode >= 40 && typeCode <= 49) return 'High-Speed Craft';
  if (typeCode >= 50 && typeCode <= 59) return 'Special Craft'; // Tug, Pilot, SAR, Port Tender
  if (typeCode === 0) return 'Unknown'; // AIS type 0 can mean unavailable
  return 'Other';
}

export function formatETADate(etaString?: string): string {
  if (!etaString) return 'N/A';
  try {
    const date = new Date(etaString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    return 'Invalid Date';
  }
}

export const allVesselStatuses: VesselStatus[] = [
    'Underway',
    'At Anchor',
    'Moored',
    'Not Under Command',
    'Restricted Manoeuverability',
    'Constrained by Draught',
    'Engaged in Fishing',
    'Sailing',
    'Unknown',
];

export const allVesselTypeCategories: VesselTypeCategory[] = [
    'Cargo',
    'Tanker',
    'Passenger',
    'Fishing',
    'High-Speed Craft',
    'Special Craft',
    'Other',
    'Unknown',
];
