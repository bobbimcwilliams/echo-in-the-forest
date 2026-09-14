'use client';

import { useState } from 'react';
import { GriefCategory } from '../types';

type O5Step = 'loss' | 'q-connection' | 'q-timing' | 'q-format' | 'cards' | 'connect' | 'confirmation';
type ConnectionType = 'Someone who has been through something similar' | 'A few people I can talk with' | 'An ongoing small group' | 'I\'m not really sure yet';
type Timing = 'Weekday' | 'Evening' | 'Weekend' | 'I\'m flexible';
type MeetFormat = 'Online' | 'In person' | 'Either is okay';

type LossLabel = 'Spouse or Partner' | 'Child' | 'Parent' | 'Sibling' | 'Friend' | 'Pet';
const LOSS_LABELS: LossLabel[] = ['Spouse or Partner', 'Child', 'Parent', 'Sibling', 'Friend', 'Pet'];

const CATEGORY_MAP: Record<LossLabel, GriefCategory> = {
  'Spouse or Partner': 'Loss of a Spouse or Partner',
  'Child': 'Loss of a Child',
  'Parent': 'Loss of a Parent',
  'Sibling': 'Loss of a Sibling',
  'Friend': 'Loss of a Friend',
  'Pet': 'Loss of a Pet',
};

interface ConnectionCard {
  id: string;
  category: GriefCategory;
  lossTimeLabel: string;
  hope: string;
  timing: string;
  format: string;
  accentIndex: number;
}

const CONNECTION_CARDS: ConnectionCard[] = [
  { id: 'c1', category: 'Loss of a Spouse or Partner', lossTimeLabel: 'Within the last year', hope: 'Hoping to find a few people who understand what the quiet feels like — the spaces they used to fill.', timing: 'Evenings', format: 'Online', accentIndex: 0 },
  { id: 'c2', category: 'Loss of a Spouse or Partner', lossTimeLabel: 'About a year ago', hope: 'Looking for others who are also figuring out what comes next — not rushing, just not doing it alone.', timing: 'Weekends', format: 'Either', accentIndex: 1 },
  { id: 'c3', category: 'Loss of a Spouse or Partner', lossTimeLabel: 'A few years in', hope: 'Navigating the longer grief — the anniversaries, the second-guessing, the slow rebuilding. Hoping for a small group that meets regularly.', timing: 'Flexible', format: 'Online', accentIndex: 2 },
  { id: 'c4', category: 'Loss of a Spouse or Partner', lossTimeLabel: 'Several years ago', hope: 'Still carries it. Wants to connect with people who understand that grief doesn\'t follow a timeline.', timing: 'Evenings', format: 'In person', accentIndex: 0 },
  { id: 'c5', category: 'Loss of a Spouse or Partner', lossTimeLabel: 'Recently', hope: 'Not ready to talk much yet — just wants to be around others who understand without having to explain everything.', timing: 'Weekdays', format: 'Online', accentIndex: 1 },

  { id: 'c6', category: 'Loss of a Child', lossTimeLabel: 'Within the last year', hope: 'Looking for people who understand this specific kind of loss — the one that doesn\'t make sense, that others struggle to hold.', timing: 'Evenings', format: 'Online', accentIndex: 2 },
  { id: 'c7', category: 'Loss of a Child', lossTimeLabel: 'A few years in', hope: 'Wants a quiet, steady place to process — not fix, just be with people who already know why this is so hard.', timing: 'Weekends', format: 'Either', accentIndex: 0 },
  { id: 'c8', category: 'Loss of a Child', lossTimeLabel: 'Recently', hope: 'Navigating infant loss. Hoping to find others who understand the particular grief of a life that was briefly here.', timing: 'Flexible', format: 'Online', accentIndex: 1 },

  { id: 'c9', category: 'Loss of a Parent', lossTimeLabel: 'Within the last year', hope: 'The loss feels bigger than expected. Looking for people who understand how much a parent can shape who you are.', timing: 'Evenings', format: 'Online', accentIndex: 2 },
  { id: 'c10', category: 'Loss of a Parent', lossTimeLabel: 'Recently', hope: 'Still in the early fog. Wants connection that doesn\'t require having it all together.', timing: 'Weekdays', format: 'Either', accentIndex: 0 },

  { id: 'c11', category: 'Loss of a Sibling', lossTimeLabel: 'Within the last year', hope: 'Sibling loss is often overlooked. Hoping to find people who understand the depth of this relationship and this grief.', timing: 'Evenings', format: 'Online', accentIndex: 1 },
  { id: 'c12', category: 'Loss of a Sibling', lossTimeLabel: 'A few years in', hope: 'Still missing a lifelong companion. Looking for a small, steady group to return to.', timing: 'Flexible', format: 'Either', accentIndex: 2 },

  { id: 'c13', category: 'Loss of a Friend', lossTimeLabel: 'Within the last year', hope: 'Chosen family. This loss doesn\'t always get the recognition it deserves. Hoping to find people who get that.', timing: 'Weekends', format: 'Online', accentIndex: 0 },
  { id: 'c14', category: 'Loss of a Friend', lossTimeLabel: 'Recently', hope: 'Looking for warmth — a place to talk about someone they loved without having to justify why it still hurts.', timing: 'Evenings', format: 'In person', accentIndex: 1 },

  { id: 'c15', category: 'Loss of a Pet', lossTimeLabel: 'Within the last year', hope: 'Pets are family. Hoping to find people who understand that — no explanation needed.', timing: 'Flexible', format: 'Online', accentIndex: 2 },
  { id: 'c16', category: 'Loss of a Pet', lossTimeLabel: 'Recently', hope: 'The house feels very empty. Looking for a gentle, understanding space to grieve without apology.', timing: 'Evenings', format: 'Either', accentIndex: 0 },
];

const ACCENT_COLORS = [
  'rgba(82, 120, 184, 0.18)',
  'rgba(125, 162, 120, 0.18)',
  'rgba(184, 140, 82, 0.18)',
];

const BACK_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

function O5Back({ onClick }: { onClick: () => void }) {
  return (
    <button className="find-group__back" type="button" onClick={onClick}>
      {BACK_ICON} Back
    </button>
  );
}

function O5Option({ label, sub, selected, onClick }: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`o5-option${selected ? ' o5-option--selected' : ''}`}
      onClick={onClick}
    >
      <span className="o5-option__label">{label}</span>
      {sub && <span className="o5-option__sub">{sub}</span>}
    </button>
  );
}

function getCards(category: GriefCategory): ConnectionCard[] {
  const matching = CONNECTION_CARDS.filter(c => c.category === category);
  return matching.slice(0, 4);
}

export function Option5Flow() {
  const [step, setStep] = useState<O5Step>('loss');
  const [lossLabel, setLossLabel] = useState<LossLabel | null>(null);
  const [connectionType, setConnectionType] = useState<ConnectionType | null>(null);
  const [timing, setTiming] = useState<Timing | null>(null);
  const [meetFormat, setMeetFormat] = useState<MeetFormat | null>(null);
  const [selectedCard, setSelectedCard] = useState<ConnectionCard | null>(null);
  const [form, setForm] = useState({ firstName: '', email: '', note: '' });
  const [confirmedName, setConfirmedName] = useState('');

  function reset() {
    setStep('loss');
    setLossLabel(null);
    setConnectionType(null);
    setTiming(null);
    setMeetFormat(null);
    setSelectedCard(null);
    setForm({ firstName: '', email: '', note: '' });
    setConfirmedName('');
  }

  // ── Step 1: Loss type ─────────────────────────────────────────────────────
  if (step === 'loss') {
    return (
      <div className="find-group__step o5-step">
        <div className="o5-intro">
          <h3 className="o5-intro__heading">Find people who get it.</h3>
          <p className="o5-intro__body">
            There are some things you shouldn&apos;t have to explain. Somewhere here,
            there are people carrying something very similar to what you&apos;re carrying —
            and they&apos;re looking too.
          </p>
        </div>
        <p className="o5-prompt">What kind of loss brought you here?</p>
        <div className="o5-loss-grid">
          {LOSS_LABELS.map(label => (
            <button
              key={label}
              type="button"
              className={`o5-loss-btn${lossLabel === label ? ' o5-loss-btn--selected' : ''}`}
              onClick={() => { setLossLabel(label); setStep('q-connection'); }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Step 2a: What kind of connection? ─────────────────────────────────────
  if (step === 'q-connection') {
    return (
      <div className="find-group__step o5-step">
        <O5Back onClick={() => setStep('loss')} />
        <p className="o5-prompt">What would feel helpful right now?</p>
        <div className="o5-options-col">
          {([
            ['Someone who has been through something similar', 'Just one person who already understands'],
            ['A few people I can talk with', 'A small, informal circle'],
            ['An ongoing small group', 'Something regular I can return to'],
            ['I\'m not really sure yet', 'That\'s okay — we\'ll go from there'],
          ] as [ConnectionType, string][]).map(([label, sub]) => (
            <O5Option key={label} label={label} sub={sub}
              selected={connectionType === label}
              onClick={() => { setConnectionType(label); setStep('q-timing'); }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Step 2b: Timing ───────────────────────────────────────────────────────
  if (step === 'q-timing') {
    return (
      <div className="find-group__step o5-step">
        <O5Back onClick={() => setStep('q-connection')} />
        <p className="o5-prompt">When would connecting be easiest for you?</p>
        <div className="o5-options-col">
          {([
            ['Weekday', 'During the week'],
            ['Evening', 'After work or after dinner'],
            ['Weekend', 'Saturday or Sunday'],
            ['I\'m flexible', 'Whatever works for others'],
          ] as [Timing, string][]).map(([label, sub]) => (
            <O5Option key={label} label={label} sub={sub}
              selected={timing === label}
              onClick={() => { setTiming(label); setStep('q-format'); }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Step 2c: Format ───────────────────────────────────────────────────────
  if (step === 'q-format') {
    return (
      <div className="find-group__step o5-step">
        <O5Back onClick={() => setStep('q-timing')} />
        <p className="o5-prompt">How would you feel most comfortable meeting?</p>
        <div className="o5-options-col">
          {([
            ['Online', 'From wherever you are'],
            ['In person', 'With people nearby'],
            ['Either is okay', 'Open to either'],
          ] as [MeetFormat, string][]).map(([label, sub]) => (
            <O5Option key={label} label={label} sub={sub}
              selected={meetFormat === label}
              onClick={() => { setMeetFormat(label); setStep('cards'); }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Step 3: Connection cards ──────────────────────────────────────────────
  if (step === 'cards' && lossLabel) {
    const category = CATEGORY_MAP[lossLabel];
    const cards = getCards(category);
    return (
      <div className="find-group__step o5-step">
        <O5Back onClick={() => setStep('q-format')} />
        <div className="o5-cards-header">
          <h3 className="o5-cards-heading">
            There are people here who understand.
          </h3>
          <p className="o5-cards-sub">
            These are real people — their details are kept private — who have
            been through something similar and are also looking for connection.
          </p>
        </div>
        <div className="o5-cards">
          {cards.map((card, i) => (
            <article
              key={card.id}
              className="o5-card"
              style={{ '--o5-accent': ACCENT_COLORS[card.accentIndex] } as React.CSSProperties}
            >
              <div className="o5-card__loss-line">
                <span className="o5-card__category">{lossLabel}</span>
                <span className="o5-card__dot" aria-hidden="true">·</span>
                <span className="o5-card__time">{card.lossTimeLabel}</span>
              </div>
              <p className="o5-card__hope">{card.hope}</p>
              <div className="o5-card__prefs">
                <span>{card.format}</span>
                <span aria-hidden="true">·</span>
                <span>{card.timing}</span>
              </div>
              <div className="o5-card__footer">
                <button
                  type="button"
                  className="o5-card__cta"
                  onClick={() => { setSelectedCard(card); setStep('connect'); }}
                >
                  {i === 0 ? 'This feels like me' : 'I\'d like to connect'}
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="o5-cards-note">
          <p>Don&apos;t see yourself here? <button type="button" className="o5-text-link" onClick={() => setStep('connect')}>Reach out anyway.</button> We&apos;ll find the right connection for you.</p>
        </div>
      </div>
    );
  }

  // ── Step 4: Connect form ──────────────────────────────────────────────────
  if (step === 'connect') {
    return (
      <div className="find-group__step o5-step">
        <O5Back onClick={() => setStep('cards')} />
        <div className="o5-intro-connect">
          <h3 className="o5-intro-connect__heading">We&apos;ll help make the introduction.</h3>
          <p className="o5-intro-connect__body">
            You&apos;re not reaching out to a stranger on your own. Grief&apos;s Healing Choices
            helps bring people with similar experiences together in a private,
            comfortable setting — at a pace that feels right for you.
          </p>
        </div>
        {lossLabel && (
          <div className="o5-carried-prefs">
            <span className="o5-carried-pref">{lossLabel}</span>
            {connectionType && <span className="o5-carried-pref">{connectionType}</span>}
            {meetFormat && <span className="o5-carried-pref">{meetFormat}</span>}
            {timing && <span className="o5-carried-pref">{timing}</span>}
          </div>
        )}
        <form className="ghc-form" noValidate
          onSubmit={e => { e.preventDefault(); setConfirmedName(form.firstName); setStep('confirmation'); }}>
          <div className="ghc-form__row">
            <div className="ghc-form__field">
              <label className="ghc-form__label" htmlFor="o5-name">First name</label>
              <input id="o5-name" type="text" className="ghc-form__input" placeholder="Your first name" required
                value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
            </div>
            <div className="ghc-form__field">
              <label className="ghc-form__label" htmlFor="o5-email">Email address</label>
              <input id="o5-email" type="email" className="ghc-form__input" placeholder="you@example.com" required
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
          </div>
          <div className="ghc-form__field">
            <label className="ghc-form__label" htmlFor="o5-note">
              Anything you&apos;d like us to know? <span className="ghc-form__optional">(optional)</span>
            </label>
            <textarea id="o5-note" className="ghc-form__textarea" rows={3}
              placeholder="Share as little or as much as you like."
              value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
          </div>
          <button type="submit" className="btn-primary" disabled={!form.firstName || !form.email}>
            I&apos;d like to connect
          </button>
        </form>
      </div>
    );
  }

  // ── Confirmation ──────────────────────────────────────────────────────────
  if (step === 'confirmation') {
    return (
      <div className="find-group__step o5-step">
        <div className="find-group__confirmation">
          <div className="confirmation__icon" aria-hidden="true">✦</div>
          <h3>You&apos;re not alone in this, {confirmedName}.</h3>
          <p>
            Someone from Grief&apos;s Healing Choices will be in touch soon.
            We&apos;ll work quietly behind the scenes to find the right connection for you.
          </p>
          <button className="btn-secondary" type="button" onClick={reset}>Start over</button>
        </div>
      </div>
    );
  }

  return null;
}
