'use client';

import { useState } from 'react';
import { GRIEF_CATEGORIES, GriefCategory } from '../types';

const EMPTY = { firstName: '', email: '', category: '' as GriefCategory | '', message: '' };

export function Option2Flow() {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="find-group__step">
        <div className="find-group__confirmation">
          <div className="confirmation__icon" aria-hidden="true">✦</div>
          <h3>We&apos;ll be in touch soon.</h3>
          <p>
            Thank you, {form.firstName}. A group leader will reach out to{' '}
            {form.email} with information tailored to your situation. You
            don&apos;t have to figure this out alone.
          </p>
          <button
            className="btn-secondary"
            type="button"
            onClick={() => { setForm(EMPTY); setSubmitted(false); }}
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="find-group__step">
      <h3 className="find-group__question">Not sure where to start?</h3>
      <p className="find-group__question-sub">
        Tell us a little about what you&apos;re carrying. A group leader will
        reach out personally with the right information for you.
      </p>

      <form className="ghc-form" onSubmit={handleSubmit} noValidate>
        <div className="ghc-form__row">
          <div className="ghc-form__field">
            <label className="ghc-form__label" htmlFor="o2-first-name">First name</label>
            <input
              id="o2-first-name"
              type="text"
              className="ghc-form__input"
              placeholder="Your first name"
              required
              value={form.firstName}
              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
            />
          </div>
          <div className="ghc-form__field">
            <label className="ghc-form__label" htmlFor="o2-email">Email address</label>
            <input
              id="o2-email"
              type="email"
              className="ghc-form__input"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
        </div>

        <div className="ghc-form__field">
          <label className="ghc-form__label" htmlFor="o2-category">
            What kind of loss are you experiencing?
          </label>
          <select
            id="o2-category"
            className="ghc-form__input ghc-form__select"
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value as GriefCategory | '' }))}
          >
            <option value="">I&apos;d prefer not to say / not sure yet</option>
            {GRIEF_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="ghc-form__field">
          <label className="ghc-form__label" htmlFor="o2-message">
            Anything else you&apos;d like us to know?{' '}
            <span className="ghc-form__optional">(optional)</span>
          </label>
          <textarea
            id="o2-message"
            className="ghc-form__textarea"
            rows={4}
            placeholder="Share as much or as little as you&apos;d like."
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={!form.firstName || !form.email}
        >
          Send my request
        </button>
      </form>
    </div>
  );
}
