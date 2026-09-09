import { Group } from '../types';

export const MOCK_GROUPS: Group[] = [
  // Loss of a Spouse or Partner — 1 open
  {
    id: 'g1',
    name: 'Walking Together',
    category: 'Loss of a Spouse or Partner',
    description:
      'A gentle space for those who have lost a spouse or life partner. We share stories, listen without judgment, and find small steps forward together.',
    format: 'Online',
    meetingSchedule: 'Tuesdays at 7:00 PM ET · Every other week',
    currentMembers: 6,
    capacity: 10,
    status: 'Open',
    leaderName: 'Carol M.',
  },

  // Loss of a Child — 1 open, 1 full
  {
    id: 'g2',
    name: 'Held in Hope',
    category: 'Loss of a Child',
    description:
      'For parents who have lost a child at any age. This group meets in a spirit of compassion and faith, holding one another through unimaginable grief.',
    format: 'Online',
    meetingSchedule: 'Mondays at 6:30 PM ET · Weekly',
    currentMembers: 8,
    capacity: 10,
    status: 'Open',
    leaderName: 'James R.',
  },
  {
    id: 'g3',
    name: 'Carrying On',
    category: 'Loss of a Child',
    description:
      'A group for parents navigating grief in the months and years after loss, focused on finding meaning and continuing to live fully.',
    format: 'Online',
    meetingSchedule: 'Thursdays at 8:00 PM ET · Every other week',
    currentMembers: 10,
    capacity: 10,
    status: 'Full',
    leaderName: 'Sandra K.',
  },

  // Loss of a Parent — 1 open
  {
    id: 'g4',
    name: 'Still Their Child',
    category: 'Loss of a Parent',
    description:
      'Losing a parent changes something fundamental about who we are. This group is for adults processing the death of a mother, father, or parental figure.',
    format: 'Online',
    meetingSchedule: 'Wednesdays at 7:00 PM ET · Every other week',
    currentMembers: 5,
    capacity: 8,
    status: 'Open',
    leaderName: 'Linda P.',
  },

  // Loss of a Sibling — none (no-group flow)

  // Loss of a Friend — none (no-group flow)

  // Loss of a Pet — 1 open
  {
    id: 'g5',
    name: 'Paws & Peace',
    category: 'Loss of a Pet',
    description:
      'The grief of losing a beloved animal companion is real and often misunderstood. This group offers a warm, non-judgmental space to mourn and heal.',
    format: 'Online',
    meetingSchedule: 'Saturdays at 10:00 AM ET · Every other week',
    currentMembers: 4,
    capacity: 8,
    status: 'Open',
    leaderName: 'Amy T.',
  },
];

export function getGroupsByCategory(category: string): Group[] {
  return MOCK_GROUPS.filter((g) => g.category === category);
}
