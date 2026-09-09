import { Group, GriefCategory } from '../types';
import { getGroupsByCategory } from '../data/mockGroups';

interface Props {
  category: GriefCategory;
  onBack: () => void;
  onJoin: (group: Group) => void;
  onInterest: () => void;
}

function StatusBadge({ status }: { status: Group['status'] }) {
  const cls =
    status === 'Open'
      ? 'group-status group-status--open'
      : status === 'Full'
      ? 'group-status group-status--full'
      : 'group-status group-status--closed';
  const label = status === 'Open' ? 'Accepting members' : status === 'Full' ? 'Currently full' : 'Closed';
  return <span className={cls}>{label}</span>;
}

function FormatIcon({ format }: { format: Group['format'] }) {
  if (format === 'Online') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GroupCard({ group, onJoin }: { group: Group; onJoin: (g: Group) => void }) {
  const spotsLeft = group.capacity - group.currentMembers;
  const canJoin = group.status === 'Open';

  return (
    <article className="group-card">
      <div className="group-card__header">
        <StatusBadge status={group.status} />
      </div>

      <h4 className="group-card__name">{group.name}</h4>
      <p className="group-card__description">{group.description}</p>

      <div className="group-card__meta">
        <span className="group-card__meta-item">
          <FormatIcon format={group.format} />
          {group.format}
        </span>
        <span className="group-card__meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {group.meetingSchedule}
        </span>
        <span className="group-card__meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {group.status === 'Open'
            ? `${spotsLeft} ${spotsLeft === 1 ? 'spot' : 'spots'} remaining`
            : `${group.currentMembers} members`}
        </span>
      </div>

      <div className="group-card__footer">
        <span className="group-card__leader">Led by {group.leaderName}</span>
        {canJoin ? (
          <button className="btn-primary" onClick={() => onJoin(group)} type="button">
            Request to Join
          </button>
        ) : (
          <span className="group-card__full-note">
            {group.status === 'Full' ? 'This group is currently full.' : 'This group is not accepting new members.'}
          </span>
        )}
      </div>
    </article>
  );
}

export function GroupList({ category, onBack, onJoin, onInterest }: Props) {
  const groups = getGroupsByCategory(category);
  const hasOpenGroup = groups.some((g) => g.status === 'Open');

  return (
    <div className="find-group__step">
      <button className="find-group__back" onClick={onBack} type="button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </button>

      <p className="find-group__category-label">{category}</p>

      {groups.length === 0 ? (
        <div className="no-groups">
          <div className="no-groups__icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="24" cy="20" r="8" />
              <path d="M8 44v-4c0-7 7-12 16-12s16 5 16 12v4" />
            </svg>
          </div>
          <h3 className="no-groups__heading">No group yet for this type of loss</h3>
          <p className="no-groups__body">
            You&apos;re not alone in this. We don&apos;t have an open group for{' '}
            <em>{category.toLowerCase()}</em> right now, but we&apos;d love to know
            you&apos;re looking. When enough people express interest, we&apos;ll form a
            new group.
          </p>
          <button className="btn-primary" onClick={onInterest} type="button">
            I&apos;m Interested in a Group
          </button>
        </div>
      ) : (
        <>
          <h3 className="find-group__question" style={{ marginBottom: '8px' }}>
            {groups.length === 1 ? 'There is a group for you.' : `There are ${groups.length} groups for you.`}
          </h3>
          <p className="find-group__question-sub" style={{ marginBottom: '28px' }}>
            These are small, private groups led by a caring facilitator.
            {!hasOpenGroup && ' All groups are currently full — you can express interest below.'}
          </p>

          <div className="group-list">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} onJoin={onJoin} />
            ))}
          </div>

          {!hasOpenGroup && (
            <div className="group-list__interest">
              <p>All groups are currently full. We&apos;ll let you know as soon as a spot opens up.</p>
              <button className="btn-secondary" onClick={onInterest} type="button">
                Notify me when a spot opens
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
