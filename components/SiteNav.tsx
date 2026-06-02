'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function SiteNav({ variant = 'home' }: { variant?: 'home' | 'article' }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={`site-nav ${variant === 'home' ? 'home-nav' : 'article-site-nav'} ${isOpen ? 'is-open' : ''}`}>
      <Link className="site-brand" href="/">
        <Image src="/assets/echo-logo5.png" alt="Echo in the Forest" width={160} height={78} priority />
      </Link>
      <button className="nav-toggle" type="button" aria-label="Open navigation menu" onClick={() => setIsOpen(!isOpen)}>
        <span /><span /><span />
      </button>
      <div className="site-nav-links">
        <Link href="/">Home</Link>
        <Link href="/#echoes">Writings</Link>
      </div>
    </nav>
  );
}
