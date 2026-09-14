'use client';

import { useState } from 'react';
import { GriefCategory, Group } from '../types';
import { GRIEF_CATEGORIES } from '../types';
import { MOCK_GROUPS } from '../data/mockGroups';

type Step = 'q1' | 'q2' | 'q3' | 'q4' | 'matches' | 'join' | 'confirmation';
type Format = 'Online' | 'In-Person' | 'Either';
type Frequency = 'Weekly' | 'Every other week' | 'Monthly' | 'Flexible';
type Vibe = 'Faith-based' | 'Practical' | 'Just be heard' | 'Any';

// Supplemental personality tags per group id
const GROUP_TAGS: Record<string, string[]> = {
  'sp-1': ['Reflective', 'Community-driven'],
  'sp-2': ['Early grief', 'In-person warmth'],
  'sp-3': ['Faith-grounded', 'Long-term healing'],
  'sp-4': ['Hopeful', 'Action-oriented'],
  'sp-5': ['Faith-based', 'Prayerful'],
  'sp-6': ['Caregiver grief', 'Compassionate'],
  'sp-7': ['Solo parenting', 'Resilient'],
  'sp-8': ['Intimate', 'Welcoming'],
  'sp-9': ['Rebuilding', 'Identity work'],
  'sp-10': ['Younger adults', 'Relatable'],
  'ch-1': ['Faith-based', 'Weekly connection'],
  'ch-2': ['Long-term support', 'Meaningful'],
  'ch-3': ['Infant loss', 'Sacred space'],
  'ch-4': ['Adult child loss', 'Seen & heard'],
  'pa-1': ['Reflective', 'Community-driven'],
  'pa-2': ['Complex grief', 'Non-judgmental'],
  'pa-3': ['Dementia grief', 'Compassionate'],
  'si-1': ['Overlooked grief', 'Validating'],
  'si-2': ['Close bonds', 'Intimate'],
  'fr-1': ['Chosen family', 'Warm'],
  'fr-2': ['In-person warmth', 'Relaxed'],
  'fr-3': ['Deep friendship', 'Meaningful'],
  'pe-1': ['Non-judgmental', 'Welcoming'],
  'pe-2': ['Gentle', 'Cozy community'],
};

function matchScore(group: Group, category: GriefCategory, format: Format, frequency: Frequency, vibe: Vibe): number {
  let score = 0;
  if (group.category === category) score += 40;
  if (format === 'Either' || group.format === format || (format === 'Either' && true)) score += 20;
  if (format !== 'Either' && group.format === format) score += 10;
  if (frequency === 'Flexible') score += 15;
  else if (group.meetingSchedule.toLowerCase().includes(frequency.toLowerCase())) score += 20;
  const tags = GROUP_TAGS[group.id] ?? [];
  if (vibe === 'Any') score += 10;
  else if (vibe === 'Faith-based' && tags.some(t => t.toLowerCase().includes('faith') || t.toLowerCase().includes('prayer'))) score += 15;
  else if (vibe === 'Practical' && tags.some(t => ['action-oriented', 'rebuilding', 'resilient'].includes(t.toLowerCase()))) score += 15;
  else if (vibe === 'Just be heard' && tags.some(t => ['reflective', 'intimate', 'welcoming', 'validating', 'seen & heard'].includes(t.toLowerCase()))) score += 15;
  if (group.status === 'Open') score += 10;
  return score;
}

function MatchPercent({ score }: { score: number }) {
  const pct = Math.min(99, Math.round((score / 95) * 100));
  const color = pct >= 80 ? '#2d6a4f' : pct >= 60 ? '#5278b8' : '#9a7020';
  return (
    <span className="match-pct" style={{ color }}>
      {pct}% match
    </span>
  );
}

function QuizOption({ label, sub, selected, onClick }: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`quiz-option${selected ? ' quiz-option--selected' : ''}`}
      onClick={onClick}
    >
      <span className="quiz-option__label">{label}</span>
      {sub && <span className="quiz-option__sub">{sub}</span>}
    </button>
  );
}

export function Option4Flow() {
  const [step, setStep] = useState<Step>('q1');
  const [category, setCategory] = useState<GriefCategory | null>(null);
  const [format, setFormat] = useState<Format | null>(null);
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [matches, setMatches] = useState<(Group & { score: number })[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [joinForm, setJoinForm] = useState({ firstName: '', email: '', note: '' });
  const [confirmedName, setConfirmedName] = useState('');

  function runMatching() {
    if (!category || !format || !frequency || !vibe) return;
    const scored = MOCK_GROUPS
      .map(g => ({ ...g, score: matchScore(g, category, format, frequency, vibe) }))
      .filter(g => g.score > 30)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setMatches(scored);
    setStep('matches');
  }

  function reset() {
    setStep('q1');
    setCategory(null);
    setFormat(null);
    setFrequency(null);
    setVibe(null);
    setMatches([]);
    setSelectedGroup(null);
    setJoinForm({ firstName: '', email: '', note: '' });
    setConfirmedName('');
  }

  // ── Q1: Type of loss ──────────────────────────────────────────────────────
  if (step === 'q1') {
    return (
      <div className="find-group__step">
        <div className="quiz-progress"><span className="quiz-progress__bar" style={{ width: '25%' }} /></div>
        <p className="quiz-step-label">Question 1 of 4</p>
        <h3 className="find-group__question">What kind of loss are you navigating?</h3>
        <div className="quiz-grid">
          {GRIEF_CATEGORIES.map(cat => (
            <QuizOption
              key={cat}
              label={cat.replace('Loss of a ', '')}
              selected={category === cat}
              onClick={() => { setCategory(cat); setStep('q2'); }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Q2: Format preference ─────────────────────────────────────────────────
  if (step === 'q2') {
    return (
      <div className="find-group__step">
        <button className="find-group__back" type="button" onClick={() => setStep('q1')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <div className="quiz-progress"><span className="quiz-progress__bar" style={{ width: '50%' }} /></div>
        <p className="quiz-step-label">Question 2 of 4</p>
        <h3 className="find-group__question">How do you prefer to meet?</h3>
        <div className="quiz-options-col">
          {(['Online', 'In-Person', 'Either'] as Format[]).map(f => (
            <QuizOption key={f} label={f}
              sub={f === 'Online' ? 'Join from anywhere, on your schedule' : f === 'In-Person' ? 'Local meetups with people near you' : 'No preference — show me all options'}
              selected={format === f}
              onClick={() => { setFormat(f); setStep('q3'); }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Q3: Frequency ─────────────────────────────────────────────────────────
  if (step === 'q3') {
    return (
      <div className="find-group__step">
        <button className="find-group__back" type="button" onClick={() => setStep('q2')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <div className="quiz-progress"><span className="quiz-progress__bar" style={{ width: '75%' }} /></div>
        <p className="quiz-step-label">Question 3 of 4</p>
        <h3 className="find-group__question">How often works best for you?</h3>
        <div className="quiz-options-col">
          {(['Weekly', 'Every other week', 'Monthly', 'Flexible'] as Frequency[]).map(f => (
            <QuizOption key={f} label={f}
              sub={f === 'Weekly' ? 'Consistent support, week to week' : f === 'Every other week' ? 'Regular rhythm without the pressure' : f === 'Monthly' ? 'A steady touchpoint once a month' : 'I\'m open to anything'}
              selected={frequency === f}
              onClick={() => { setFrequency(f); setStep('q4'); }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Q4: Group vibe ────────────────────────────────────────────────────────
  if (step === 'q4') {
    return (
      <div className="find-group__step">
        <button className="find-group__back" type="button" onClick={() => setStep('q3')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back
        </button>
        <div className="quiz-progress"><span className="quiz-progress__bar" style={{ width: '100%' }} /></div>
        <p className="quiz-step-label">Question 4 of 4</p>
        <h3 className="find-group__question">What matters most to you in a group?</h3>
        <div className="quiz-options-col">
          {([
            ['Faith-based', 'A community grounded in faith and prayer'],
            ['Practical', 'Actionable support and forward momentum'],
            ['Just be heard', 'A quiet, reflective space to process and feel seen'],
            ['Any', 'I\'m open — show me what fits best overall'],
          ] as [Vibe, string][]).map(([v, sub]) => (
            <QuizOption key={v} label={v} sub={sub}
              selected={vibe === v}
              onClick={() => { setVibe(v); runMatching(); }}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Matches ───────────────────────────────────────────────────────────────
  if (step === 'matches') {
    return (
      <div className="find-group__step">
        <div className="matches-header">
          <h3 className="find-group__question" style={{ marginBottom: '6px' }}>
            {matches.length > 0
              ? `We found ${matches.length} group${matches.length === 1 ? '' : 's'} for you.`
              : 'No strong matches right now.'}
          </h3>
          <p className="find-group__question-sub">
            {matches.length > 0
              ? 'Based on your answers — ranked by how well they fit.'
              : 'Try adjusting your preferences, or reach out and we\'ll help you find something.'}
          </p>
          <button className="quiz-restart" type="button" onClick={reset}>Start over</button>
        </div>

        <div className="group-list match-list">
          {matches.map(group => {
            const tags = GROUP_TAGS[group.id] ?? [];
            return (
              <article key={group.id} className="group-card match-card">
                <div className="match-card__top">
                  <MatchPercent score={group.score} />
                  <span className={`group-status group-status--${group.status.toLowerCase()}`}>
                    {group.status === 'Open' ? 'Accepting members' : 'Currently full'}
                  </span>
                </div>
                <h4 className="group-card__name">{group.name}</h4>
                <p className="group-card__description">{group.description}</p>
                {tags.length > 0 && (
                  <div className="match-tags">
                    {tags.map(t => <span key={t} className="match-tag">{t}</span>)}
                  </div>
                )}
                <div className="group-card__meta">
                  <span className="group-card__meta-item">{group.format}</span>
                  <span className="group-card__meta-item">{group.meetingSchedule}</span>
                  <span className="group-card__meta-item">
                    {group.status === 'Open'
                      ? `${group.capacity - group.currentMembers} spots remaining`
                      : `${group.currentMembers} members`}
                  </span>
                </div>
                <div className="group-card__footer">
                  <span className="group-card__leader">Led by {group.leaderName}</span>
                  {group.status === 'Open' ? (
                    <button className="btn-primary" type="button"
                      onClick={() => { setSelectedGroup(group); setStep('join'); }}>
                      Connect
                    </button>
                  ) : (
                    <span className="group-card__full-note">Currently full</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Join form ─────────────────────────────────────────────────────────────
  if (step === 'join' && selectedGroup) {
    return (
      <div className="find-group__step">
        <button className="find-group__back" type="button" onClick={() => setStep('matches')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to matches
        </button>
        <h3 className="find-group__question">Connect with <em>{selectedGroup.name}</em></h3>
        <p className="find-group__question-sub">
          Led by {selectedGroup.leaderName} · {selectedGroup.format} · {selectedGroup.meetingSchedule}
        </p>
        <form className="ghc-form" noValidate
          onSubmit={e => { e.preventDefault(); setConfirmedName(joinForm.firstName); setStep('confirmation'); }}>
          <div className="ghc-form__row">
            <div className="ghc-form__field">
              <label className="ghc-form__label" htmlFor="o4-name">First name</label>
              <input id="o4-name" type="text" className="ghc-form__input" placeholder="Your first name" required
                value={joinForm.firstName} onChange={e => setJoinForm(f => ({ ...f, firstName: e.target.value }))} />
            </div>
            <div className="ghc-form__field">
              <label className="ghc-form__label" htmlFor="o4-email">Email address</label>
              <input id="o4-email" type="email" className="ghc-form__input" placeholder="you@example.com" required
                value={joinForm.email} onChange={e => setJoinForm(f => ({ ...f, email: e.target.value }))} />
            </div>
          </div>
          <div className="ghc-form__field">
            <label className="ghc-form__label" htmlFor="o4-note">
              A note for the leader <span className="ghc-form__optional">(optional)</span>
            </label>
            <textarea id="o4-note" className="ghc-form__textarea" rows={3}
              placeholder="Anything that would help the leader welcome you well."
              value={joinForm.note} onChange={e => setJoinForm(f => ({ ...f, note: e.target.value }))} />
          </div>
          <button type="submit" className="btn-primary" disabled={!joinForm.firstName || !joinForm.email}>
            Send connection request
          </button>
        </form>
      </div>
    );
  }

  // ── Confirmation ──────────────────────────────────────────────────────────
  if (step === 'confirmation') {
    return (
      <div className="find-group__step">
        <div className="find-group__confirmation">
          <div className="confirmation__icon" aria-hidden="true">✦</div>
          <h3>You&apos;re connected, {confirmedName}.</h3>
          <p>
            {selectedGroup?.leaderName} will reach out soon. You don&apos;t have to carry
            this alone anymore.
          </p>
          <button className="btn-secondary" type="button" onClick={reset}>Start over</button>
        </div>
      </div>
    );
  }

  return null;
}
