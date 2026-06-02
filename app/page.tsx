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
    </>
  );
}
