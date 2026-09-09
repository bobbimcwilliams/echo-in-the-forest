'use client';

import { useState } from 'react';
import { Group, GriefCategory } from '../types';

interface Props {
  category: GriefCategory;
  group: Group | null;
  formType: 'join' | 'interest';
  onBack: () => void;
  onSubmit: () => void;
}

export function JoinForm({ category, group, formType, onBack, onSubmit }: Props) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  const isJoin = formType === 'join';

  const heading = isJoin
    ? `Join ${group?.name}`
    : `I'm interested in a group`;

  const intro = isJoin
    ? `We'll pass your name along to ${group?.leaderName}, the group's facilitator, and they'll reach out personally to welcome you.`
    : `We'll keep your information private and reach out when a group forms for ${category.toLowerCase()}.`;

  const submitLabel = isJoin ? 'Send My Request' : 'Let Them Know';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="find-group__step">
      <button className="find-group__back" onClick={onBack} type="button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </button>

      <div className="ghc-form__intro">
        <p className="find-group__category-label">{category}</p>
        <h3 className="find-group__question">{heading}</h3>
        <p className="find-group__question-sub">{intro}</p>
        <p className="ghc-form__privacy-note">
          Your information is private and will only be used to connect you with this group.
        </p>
      </div>

      <form className="ghc-form" onSubmit={handleSubmit} noValidate>
        <div className="ghc-form__field">
          <label className="ghc-form__label" htmlFor="ghc-first-name">
            First name <span aria-hidden="true">*</span>
          </label>
          <input
            id="ghc-first-name"
            className="ghc-form__input"
            type="text"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
          />
        </div>

        <div className="ghc-form__field">
          <label className="ghc-form__label" htmlFor="ghc-email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="ghc-email"
            className="ghc-form__input"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        <div className="ghc-form__field">
          <label className="ghc-form__label" htmlFor="ghc-note">
            Is there anything you&apos;d like us to know?{' '}
            <span className="ghc-form__optional">(optional)</span>
          </label>
          <textarea
            id="ghc-note"
            className="ghc-form__textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Share whatever feels right. There's no pressure."
            rows={4}
          />
        </div>

        <div className="ghc-form__actions">
          <button
            className="btn-primary"
            type="submit"
            disabled={!firstName.trim() || !email.trim()}
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
