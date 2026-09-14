'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FindAGroup } from '../components/FindAGroup';
import { Option2Flow } from '../components/Option2Flow';
import { Option3Flow } from '../components/Option3Flow';
import { Option4Flow } from '../components/Option4Flow';
import { Option5Flow } from '../components/Option5Flow';

export function FindSupportPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Caslon+Display&display=swap"
        rel="stylesheet"
      />
      <link href="/griefs-healing-choices/styles.css?v=20260910-option5" rel="stylesheet" />

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

              {/* Option 1 — Browse and join a group */}
              <div className="support-option-card">
                <span className="option-pill">Option 1</span>
                <FindAGroup />
              </div>

              {/* Option 2 — Inquiry form sent to a leader */}
              <div className="support-option-card">
                <span className="option-pill">Option 2</span>
                <div className="find-group__panel">
                  <Option2Flow />
                </div>
              </div>

              {/* Option 3 — Browse groups + start a group path */}
              <div className="support-option-card">
                <span className="option-pill">Option 3</span>
                <div className="find-group__panel">
                  <Option3Flow />
                </div>
              </div>

              {/* Option 4 — Matching quiz */}
              <div className="support-option-card">
                <span className="option-pill">Option 4</span>
                <div className="find-group__panel">
                  <Option4Flow />
                </div>
              </div>

              {/* Option 5 — Find people like me */}
              <div className="support-option-card">
                <span className="option-pill">Option 5</span>
                <div className="find-group__panel">
                  <Option5Flow />
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
