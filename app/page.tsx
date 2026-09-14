import Link from 'next/link';
import { CuriousThing } from '@/components/CuriousThing';
import { EchoesSection } from '@/components/EchoesSection';
import { HomeHero } from '@/components/HomeHero';
import { SiteNav } from '@/components/SiteNav';
import { getAllArticles } from '@/lib/articles';

export default function HomePage() {
  return (
    <>
      <SiteNav variant="home" />
      <HomeHero />
      <EchoesSection articles={getAllArticles()} />
      <CuriousThing />
      <div style={{ textAlign: 'center', padding: '24px 16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <Link href="/griefs-healing-choices/find-support" style={{ fontSize: '0.875rem', color: '#6b7a99', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
          Grief&apos;s Healing Choices — Find Support
        </Link>
      </div>
    </>
  );
}
