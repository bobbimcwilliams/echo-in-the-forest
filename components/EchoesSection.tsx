import Link from 'next/link';
import type { Article } from '@/lib/articles';

export function EchoesSection({ articles }: { articles: Article[] }) {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const others = articles.filter((article) => article.slug !== featured.slug);
  const placeholders = [
    { title: "Peace Arrived When I Stopped Editing Myself", excerpt: "I didn't find peace by figuring everything out. I found it the morning I stopped rehearsing who I was before I walked into a room." },
    { title: "Religion Without Humanity Is Mere Performance", excerpt: "I have sat in rooms that felt holy and rooms that felt hollow. The difference was whether people were seen." },
    { title: "The Difference Between Being Liked and Being Known", excerpt: "Being liked is easy if you're willing to be slightly less than yourself. Being known requires honesty." },
  ];
  const gridItems = others.slice(0, 3);
  const rowItems = others.slice(3, 5);
  const gridPlaceholderCount = Math.max(0, 3 - gridItems.length);
  const gridPlaceholders = placeholders.slice(0, gridPlaceholderCount);
  const rowPlaceholders = placeholders.slice(gridPlaceholderCount, gridPlaceholderCount + Math.max(0, 2 - rowItems.length));
  return (
    <section className="echoes" id="echoes">
      <div className="echoes-bg-texture" />
      <div className="echoes-container">
        <div className="echoes-header">
          <p className="echoes-label">While We Walk</p>
          <h2 className="echoes-title">There&apos;s something I&apos;ve been thinking about...</h2>
        </div>
        <hr className="echoes-rule" />
        <ArticleCard article={featured} featured />
        <div className="cards-grid">
          {gridItems.map((article) => <ArticleCard article={article} key={article.slug} />)}
          {gridPlaceholders.map((item) => <Placeholder title={item.title} excerpt={item.excerpt} key={item.title} />)}
        </div>
        <div className="cards-row2">
          {rowItems.map((article) => <ArticleCard article={article} key={article.slug} />)}
          {rowPlaceholders.map((item) => <Placeholder title={item.title} excerpt={item.excerpt} key={item.title} />)}
        </div>
        <div className="browse-wrap">
          <p className="browse-note">Some thoughts stay on the path,<br />and others chase squirrels.</p>
          <a className="browse-btn" href="#">Browse All Echoes</a>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const className = featured ? 'featured-card' : 'grid-card';
  const inner = (
    <>
      <h3 className="card-title">{article.title}</h3>
      <p className="card-excerpt">{article.excerpt}</p>
      <Link className="card-link" href={`/articles/${article.slug}`}>Continue Reading →</Link>
    </>
  );
  return featured ? <div className={className}><div className="featured-left">{inner}</div></div> : <div className={className}>{inner}</div>;
}

function Placeholder({ title, excerpt }: { title: string; excerpt: string }) {
  return <div className="grid-card"><h3 className="card-title">{title}</h3><p className="card-excerpt">{excerpt}</p><a href="#" className="card-link">Continue Reading →</a></div>;
}
