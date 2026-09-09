'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FindAGroup } from '../components/FindAGroup';
import { GRIEF_CATEGORIES, GriefCategory } from '../types';

const EMPTY_FORM = { firstName: '', email: '', category: '' as GriefCategory | '', message: '' };

export function FindSupportPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Caslon+Display&display=swap"
        rel="stylesheet"
      />
      <link href="/griefs-healing-choices/styles.css?v=20260908-options" rel="stylesheet" />

      <div className="find-support-page">
        <header className="site-header">
          <Link className="brand" href="/griefs-healing-choices" aria-label="Grief's Healing Choices home">
            <img src="/griefs-healing-choices/assets/logo.png" alt="" />
            <span>
              <strong>Grief&apos;s Healing Choices</strong>
            </span>
          </Link>

          <button
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
          </button>

          <nav
            className={`ghc-nav${menuOpen ? ' open' : ''}`}
            aria-label="Grief's Healing Choices navigation"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/griefs-healing-choices">Home</Link>
            <Link href="/griefs-healing-choices/find-support" className="active">Find Support</Link>
            <Link href="/griefs-healing-choices#resources">Resources</Link>
            <Link href="/griefs-healing-choices#about">About Us</Link>
          </nav>

          <Link className="header-cta" href="/griefs-healing-choices/find-support">
            Connect with others
            <span aria-hidden="true">→</span>
          </Link>
        </header>

        <main className="find-support-page__main">
          <div className="find-group__inner">
            <div className="find-group__heading">
              <p className="find-group__heading-eyebrow">Find Support</p>
              <h1 id="find-group-title" className="find-support-page__h1">
                Connect with <em>Others.</em>
              </h1>
              <p>
                Grief is heavier when carried in silence. Sometimes what helps most
                is simply being with people who already understand.
              </p>
            </div>

            <div className="support-options">

              {/* Option 1 — Browse & join a group */}
              <div className="support-option-card">
                <span className="option-pill">Option 1</span>
                <FindAGroup />
              </div>

              {/* Option 2 — Request more information */}
              <div className="support-option-card">
                <span className="option-pill">Option 2</span>

                {submitted ? (
                  <div className="find-group__step">
                    <div className="find-group__confirmation">
                      <div className="confirmation__icon" aria-hidden="true">✦</div>
                      <h3>We&apos;ll be in touch soon.</h3>
                      <p>
                        Thank you, {form.firstName}. Someone from our team will reach out
                        to {form.email} with information about{' '}
                        {form.category ? `groups for ${form.category.toLowerCase()}` : 'support groups'}.
                        You don&apos;t have to figure this out alone.
                      </p>
                      <button
                        className="btn-secondary"
                        type="button"
                        onClick={() => { setForm(EMPTY_FORM); setSubmitted(false); }}
                      >
                        Submit another request
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="find-group__step">
                    <h3 className="find-group__question">Not sure where to start?</h3>
                    <p className="find-group__question-sub">
                      Tell us a little about what you&apos;re carrying and we&apos;ll
                      reach out personally with the right information for you.
                    </p>

                    <form className="ghc-form" onSubmit={handleSubmit} noValidate>
                      <div className="ghc-form__row">
                        <div className="ghc-form__field">
                          <label className="ghc-form__label" htmlFor="inq-first-name">
                            First name
                          </label>
                          <input
                            id="inq-first-name"
                            type="text"
                            className="ghc-form__input"
                            placeholder="Your first name"
                            required
                            value={form.firstName}
                            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                          />
                        </div>

                        <div className="ghc-form__field">
                          <label className="ghc-form__label" htmlFor="inq-email">
                            Email address
                          </label>
                          <input
                            id="inq-email"
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
                        <label className="ghc-form__label" htmlFor="inq-category">
                          What kind of loss are you experiencing?
                        </label>
                        <select
                          id="inq-category"
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
                        <label className="ghc-form__label" htmlFor="inq-message">
                          Anything else you&apos;d like us to know? <span className="ghc-form__optional">(optional)</span>
                        </label>
                        <textarea
                          id="inq-message"
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
                )}
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
