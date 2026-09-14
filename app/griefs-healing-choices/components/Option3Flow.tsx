'use client';

import { useState } from 'react';
import { GriefCategory, Group } from '../types';
import { GRIEF_CATEGORIES } from '../types';
import { getGroupsByCategory } from '../data/mockGroups';

type View =
  | 'choose-path'
  | 'categories'
  | 'groups'
  | 'join'
  | 'join-confirmation'
  | 'start-group'
  | 'start-confirmation';

const EMPTY_JOIN = { firstName: '', email: '', note: '' };
const EMPTY_START = { firstName: '', email: '', lossType: '' as GriefCategory | '', experience: '', why: '' };

function GroupCard({ group, onJoin }: { group: Group; onJoin: (g: Group) => void }) {
  const spotsLeft = group.capacity - group.currentMembers;
  return (
    <article className="group-card">
      <div className="group-card__header">
        <span className={`group-status group-status--${group.status.toLowerCase()}`}>
          {group.status === 'Open' ? 'Accepting members' : group.status === 'Full' ? 'Currently full' : 'Closed'}
        </span>
      </div>
      <h4 className="group-card__name">{group.name}</h4>
      <p className="group-card__description">{group.description}</p>
      <div className="group-card__meta">
        <span className="group-card__meta-item">{group.format}</span>
        <span className="group-card__meta-item">{group.meetingSchedule}</span>
        <span className="group-card__meta-item">
          {group.status === 'Open' ? `${spotsLeft} spots remaining` : `${group.currentMembers} members`}
        </span>
      </div>
      <div className="group-card__footer">
        <span className="group-card__leader">Led by {group.leaderName}</span>
        {group.status === 'Open' ? (
          <button className="btn-primary" onClick={() => onJoin(group)} type="button">Request to Join</button>
        ) : (
          <span className="group-card__full-note">This group is currently full.</span>
        )}
      </div>
    </article>
  );
}

export function Option3Flow() {
  const [view, setView] = useState<View>('choose-path');
  const [category, setCategory] = useState<GriefCategory | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [joinForm, setJoinForm] = useState(EMPTY_JOIN);
  const [startForm, setStartForm] = useState(EMPTY_START);
  const [confirmedName, setConfirmedName] = useState('');

  function reset() {
    setView('choose-path');
    setCategory(null);
    setSelectedGroup(null);
    setJoinForm(EMPTY_JOIN);
    setStartForm(EMPTY_START);
    setConfirmedName('');
  }

  // ── Path chooser ─────────────────────────────────────────────────────────
  if (view === 'choose-path') {
    return (
      <div className="find-group__step">
        <h3 className="find-group__question">What are you here for today?</h3>
        <p className="find-group__question-sub">
          Whether you&apos;re looking for a place to belong or feel called to create one —
          there&apos;s a path for you here.
        </p>
        <div className="option3-directions">
          <button className="option3-direction-btn" type="button" onClick={() => setView('categories')}>
            <span className="option3-direction-btn__title">Find a group</span>
            <span className="option3-direction-btn__desc">
              Browse groups by the type of loss you&apos;re navigating and request to join one that feels right.
            </span>
          </button>
          <button className="option3-direction-btn" type="button" onClick={() => setView('start-group')}>
            <span className="option3-direction-btn__title">Start a group</span>
            <span className="option3-direction-btn__desc">
              You&apos;ve lived through loss and feel ready to walk alongside others. Tell us about yourself and we&apos;ll be in touch.
            </span>
          </button>
        </div>
      </div>
    );
  }

  // ── Category picker ───────────────────────────────────────────────────────
  if (view === 'categories') {
    return (
      <div className="find-group__step">
        <button className="find-group__back" type="button" onClick={() => setView('choose-path')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <h3 className="find-group__question">What kind of loss brought you here?</h3>
        <p className="find-group__question-sub">
          Choose the category that fits. You can always reach out if nothing quite captures it.
        </p>
        <div className="category-grid">
          {GRIEF_CATEGORIES.map(cat => (
            <button key={cat} className="category-card" type="button"
              onClick={() => { setCategory(cat); setView('groups'); }}>
              <span className="category-card__name">{cat.replace('Loss of a ', '')}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Group list ────────────────────────────────────────────────────────────
  if (view === 'groups' && category) {
    const groups = getGroupsByCategory(category);
    const hasOpen = groups.some(g => g.status === 'Open');
    return (
      <div className="find-group__step">
        <button className="find-group__back" type="button" onClick={() => setView('categories')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <p className="find-group__category-label">{category}</p>
        {groups.length === 0 ? (
          <div className="no-groups">
            <h3 className="no-groups__heading">No group yet for this type of loss</h3>
            <p className="no-groups__body">
              You&apos;re not alone in this — we just don&apos;t have a group here yet.
              Consider starting one.
            </p>
          </div>
        ) : (
          <>
            <h3 className="find-group__question" style={{ marginBottom: '8px' }}>
              {groups.length === 1 ? 'There is 1 group for you.' : `There are ${groups.length} groups for you.`}
            </h3>
            <p className="find-group__question-sub" style={{ marginBottom: '28px' }}>
              Small, private groups led by a caring facilitator.
              {!hasOpen && ' All are currently full.'}
            </p>
            <div className="group-list">
              {groups.map(g => <GroupCard key={g.id} group={g} onJoin={g => { setSelectedGroup(g); setView('join'); }} />)}
            </div>
          </>
        )}
        <div className="start-group-nudge">
          <p className="start-group-nudge__text">Don&apos;t see a group that fits — or feel called to lead one?</p>
          <button className="btn-secondary" type="button" onClick={() => setView('start-group')}>
            I&apos;d like to start a group
          </button>
        </div>
      </div>
    );
  }

  // ── Join form ─────────────────────────────────────────────────────────────
  if (view === 'join' && selectedGroup) {
    return (
      <div className="find-group__step">
        <button className="find-group__back" type="button" onClick={() => setView('groups')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <h3 className="find-group__question">Request to join <em>{selectedGroup.name}</em></h3>
        <p className="find-group__question-sub">
          Led by {selectedGroup.leaderName} · {selectedGroup.format} · {selectedGroup.meetingSchedule}
        </p>
        <form className="ghc-form" noValidate onSubmit={e => { e.preventDefault(); setConfirmedName(joinForm.firstName); setView('join-confirmation'); }}>
          <div className="ghc-form__row">
            <div className="ghc-form__field">
              <label className="ghc-form__label" htmlFor="o3-name">First name</label>
              <input id="o3-name" type="text" className="ghc-form__input" placeholder="Your first name" required
                value={joinForm.firstName} onChange={e => setJoinForm(f => ({ ...f, firstName: e.target.value }))} />
            </div>
            <div className="ghc-form__field">
              <label className="ghc-form__label" htmlFor="o3-email">Email address</label>
              <input id="o3-email" type="email" className="ghc-form__input" placeholder="you@example.com" required
                value={joinForm.email} onChange={e => setJoinForm(f => ({ ...f, email: e.target.value }))} />
            </div>
          </div>
          <div className="ghc-form__field">
            <label className="ghc-form__label" htmlFor="o3-note">
              A note for the leader <span className="ghc-form__optional">(optional)</span>
            </label>
            <textarea id="o3-note" className="ghc-form__textarea" rows={3}
              placeholder="Share anything that might help the leader welcome you well."
              value={joinForm.note} onChange={e => setJoinForm(f => ({ ...f, note: e.target.value }))} />
          </div>
          <button type="submit" className="btn-primary" disabled={!joinForm.firstName || !joinForm.email}>Send my request</button>
        </form>
      </div>
    );
  }

  // ── Join confirmation ─────────────────────────────────────────────────────
  if (view === 'join-confirmation') {
    return (
      <div className="find-group__step">
        <div className="find-group__confirmation">
          <div className="confirmation__icon" aria-hidden="true">✦</div>
          <h3>Your request has been sent.</h3>
          <p>Thank you, {confirmedName}. {selectedGroup?.leaderName} will be in touch soon. You took a brave step today.</p>
          <button className="btn-secondary" type="button" onClick={reset}>Start over</button>
        </div>
      </div>
    );
  }

  // ── Start a group form ────────────────────────────────────────────────────
  if (view === 'start-group') {
    return (
      <div className="find-group__step">
        <button className="find-group__back" type="button" onClick={() => setView('choose-path')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <h3 className="find-group__question">Start a group</h3>
        <p className="find-group__question-sub">
          Tell us about yourself. Someone from our team will reach out to talk through next steps.
        </p>
        <form className="ghc-form" noValidate onSubmit={e => { e.preventDefault(); setConfirmedName(startForm.firstName); setView('start-confirmation'); }}>
          <div className="ghc-form__row">
            <div className="ghc-form__field">
              <label className="ghc-form__label" htmlFor="o3-start-name">First name</label>
              <input id="o3-start-name" type="text" className="ghc-form__input" placeholder="Your first name" required
                value={startForm.firstName} onChange={e => setStartForm(f => ({ ...f, firstName: e.target.value }))} />
            </div>
            <div className="ghc-form__field">
              <label className="ghc-form__label" htmlFor="o3-start-email">Email address</label>
              <input id="o3-start-email" type="email" className="ghc-form__input" placeholder="you@example.com" required
                value={startForm.email} onChange={e => setStartForm(f => ({ ...f, email: e.target.value }))} />
            </div>
          </div>
          <div className="ghc-form__field">
            <label className="ghc-form__label" htmlFor="o3-start-type">What type of loss would your group focus on?</label>
            <select id="o3-start-type" className="ghc-form__input ghc-form__select"
              value={startForm.lossType} onChange={e => setStartForm(f => ({ ...f, lossType: e.target.value as GriefCategory | '' }))}>
              <option value="">Not sure yet</option>
              {GRIEF_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="ghc-form__field">
            <label className="ghc-form__label" htmlFor="o3-start-exp">
              Any relevant background? <span className="ghc-form__optional">(optional)</span>
            </label>
            <textarea id="o3-start-exp" className="ghc-form__textarea" rows={3}
              placeholder="Grief support experience, ministry, lived experience — anything you'd like to share."
              value={startForm.experience} onChange={e => setStartForm(f => ({ ...f, experience: e.target.value }))} />
          </div>
          <div className="ghc-form__field">
            <label className="ghc-form__label" htmlFor="o3-start-why">
              What draws you to this? <span className="ghc-form__optional">(optional)</span>
            </label>
            <textarea id="o3-start-why" className="ghc-form__textarea" rows={3}
              placeholder="No right answer — we just want to understand your heart for this."
              value={startForm.why} onChange={e => setStartForm(f => ({ ...f, why: e.target.value }))} />
          </div>
          <button type="submit" className="btn-primary" disabled={!startForm.firstName || !startForm.email}>Submit my interest</button>
        </form>
      </div>
    );
  }

  // ── Start confirmation ────────────────────────────────────────────────────
  if (view === 'start-confirmation') {
    return (
      <div className="find-group__step">
        <div className="find-group__confirmation">
          <div className="confirmation__icon" aria-hidden="true">✦</div>
          <h3>Thank you, {confirmedName}.</h3>
          <p>We&apos;re honored you&apos;d consider this. Someone from our team will reach out to talk through what starting a group could look like for you.</p>
          <button className="btn-secondary" type="button" onClick={reset}>Start over</button>
        </div>
      </div>
    );
  }

  return null;
}
