'use client';

import { useState } from 'react';

const videoPreviewUrl =
  'https://drive.google.com/file/d/1sQo5BW9Ka_wBKDHD_lxL5i2UALmA4pCU/preview';

export function GriefsHealingChoices() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Libre+Caslon+Display&display=swap"
        rel="stylesheet"
      />
      <link href="/griefs-healing-choices/styles.css" rel="stylesheet" />

      <main className="hero">
        <div className="hero__shade" />

        <header className="site-header">
          <a className="brand" href="#" aria-label="Grief's Healing Choices home">
            <img src="/griefs-healing-choices/assets/logo.png" alt="" />
            <span>
              <strong>Grief&apos;s Healing Choices</strong>
            </span>
          </a>

          <button
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav
            className={`ghc-nav${menuOpen ? ' open' : ''}`}
            aria-label="Grief's Healing Choices navigation"
            onClick={() => setMenuOpen(false)}
          >
            <a className="active" href="#">
              Home
            </a>
            <a href="#support">Find Support</a>
            <a href="#resources">Resources</a>
            <a href="#about">About Us</a>
          </nav>

          <a className="header-cta" href="#explore">
            Join a support group
            <span aria-hidden="true">→</span>
          </a>
        </header>

        <section className="hero__content">
          <div className="hero__card">
            <h1>
              <span>When loss changes everything,</span>
              <em>you don&apos;t have to find your way alone.</em>
            </h1>

            <p className="hero__intro">
              You&apos;ll find a community that understands and listens without
              judgment, and walks beside you with hope.
            </p>

            <p className="welcome-note">
              <span aria-hidden="true">✦</span>
              Wherever you are in your grief, you are welcome here.
              <span aria-hidden="true">✦</span>
            </p>
          </div>
        </section>

        <div className="hero__footer">
          <a href="#explore">
            Begin finding support <span aria-hidden="true">↓</span>
          </a>
        </div>
      </main>

      <section className="stories" id="explore" aria-labelledby="stories-title">
        <div className="stories__inner">
          <div className="stories__copy">
            <p className="stories__eyebrow">Stories from our community</p>
            <h2 id="stories-title">
              Real stories. <em>Real hope.</em>
            </h2>
            <p className="stories__intro">
              Grief looks different for everyone, but no one should have to face
              it alone. Hear from people who found understanding, community, and
              hope through Grief&apos;s Healing Choices.
            </p>
          </div>

          <div
            className={`video-placeholder${videoPlaying ? ' is-playing' : ''}`}
            id="stories-video"
          >
            {videoPlaying && (
              <iframe
                className="stories-video"
                src={videoPreviewUrl}
                title="Stories from the Grief's Healing Choices community"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
            <button
              className="video-play"
              type="button"
              aria-label="Play stories video"
              onClick={() => setVideoPlaying(true)}
            >
              <span aria-hidden="true">▶</span>
              <small>Watch Their Stories</small>
            </button>
            <div className="video-placeholder__caption">
              <span>Understanding begins when someone feels heard.</span>
              <small>Community stories</small>
            </div>
          </div>
        </div>
      </section>

      <section className="next-steps" aria-labelledby="next-steps-title">
        <div className="next-steps__inner">
          <div className="next-steps__heading">
            <p className="next-steps__eyebrow">Continue at your own pace</p>
            <h2 id="next-steps-title">
              Take the <em>next step.</em>
            </h2>
            <p>
              Wherever you are in your grief journey, you don&apos;t have to
              figure it out on your own. Explore free resources or connect with
              a supportive community.
            </p>
          </div>

          <div className="resource-grid" id="resources">
            <article className="resource-card">
              <div className="resource-card__icon" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                  <path d="M5.5 6.5h8.2c1.6 0 2.3.8 2.3 2.2v17c0-1.8-1.1-2.7-3.1-2.7H5.5V6.5Z" />
                  <path d="M26.5 6.5h-8.2c-1.6 0-2.3.8-2.3 2.2v17c0-1.8 1.1-2.7 3.1-2.7h7.4V6.5Z" />
                </svg>
              </div>
              <div>
                <h3>Resources</h3>
                <p>
                  Practical guides, downloadable resources, and recommended
                  books to help you navigate grief one step at a time.
                </p>
              </div>
              <a href="#resources">
                Explore Resources <span aria-hidden="true">→</span>
              </a>
            </article>

            <article className="resource-card" id="support">
              <div className="resource-card__icon" aria-hidden="true">
                <svg viewBox="0 0 32 32">
                  <circle cx="16" cy="10" r="4" />
                  <circle cx="7.5" cy="13" r="3" />
                  <circle cx="24.5" cy="13" r="3" />
                  <path d="M9.5 26v-2.7c0-4 2.5-6.3 6.5-6.3s6.5 2.3 6.5 6.3V26" />
                  <path d="M3.5 25v-2c0-3 1.6-4.8 4.5-5.2M28.5 25v-2c0-3-1.6-4.8-4.5-5.2" />
                </svg>
              </div>
              <div>
                <h3>Join Our Community</h3>
                <p>
                  Connect with others who understand your journey through our
                  private Facebook community for encouragement, conversation,
                  and support.
                </p>
              </div>
              <a href="#support">
                Join the Community <span aria-hidden="true">→</span>
              </a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
