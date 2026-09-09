export type GroupStatus = 'Open' | 'Full' | 'Closed';
export type GroupFormat = 'Online' | 'In-Person' | 'Hybrid';

export type GriefCategory =
  | 'Loss of a Spouse or Partner'
  | 'Loss of a Child'
  | 'Loss of a Parent'
  | 'Loss of a Sibling'
  | 'Loss of a Friend'
  | 'Loss of a Pet';

export const GRIEF_CATEGORIES: GriefCategory[] = [
  'Loss of a Spouse or Partner',
  'Loss of a Child',
  'Loss of a Parent',
  'Loss of a Sibling',
  'Loss of a Friend',
  'Loss of a Pet',
];

export interface Group {
  id: string;
  name: string;
  category: GriefCategory;
  description: string;
  format: GroupFormat;
  meetingSchedule: string;
  currentMembers: number;
  capacity: number;
  status: GroupStatus;
  leaderName: string;
}
