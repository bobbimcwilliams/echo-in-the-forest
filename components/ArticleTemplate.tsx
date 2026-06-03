import Link from 'next/link';
import type { Article } from '@/lib/articles';
import { getRelatedArticles } from '@/lib/articles';
import { SiteNav } from './SiteNav';

export function ArticleTemplate({ article }: { article: Article }) {
  const related = getRelatedArticles(article);
  return (
    <div className="article-page">
      <div className="article-bg" />
      <SiteNav variant="article" />
      <main>
        <header className="article-hero article-banner article-one-banner">
          <div className="article-banner-content">
            <p className="article-date">{article.date}</p>
            <h1>{article.title}</h1>
            <p className="article-subtitle">{article.subtitle}</p>
          </div>
        </header>
        <div className="article-transition" aria-hidden="true">
          <span />
        </div>
        <article className="article-body">
          {renderMarkdown(article.body)}
        </article>
        <section className="article-closing">
          <div className="article-divider"><span /></div>
          <h2>Before You Go</h2>
          <p>Keep what resonates.<br />Leave the rest in the forest.</p>
          <nav className="article-nav">
            <Link href="/">Home</Link>
            <Link href="/#echoes">Writings</Link>
          </nav>
        </section>
        <section className="related-writings">
          <h2>Related Writings</h2>
          <div className="related-grid">
            {related.map((item) => (
              <Link className="related-card" href={`/articles/${item.slug}`} key={item.slug}>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function renderMarkdown(markdown: string) {
  return markdown.split(/\n\n+/).map((block, index) => {
    const clean = block.trim();
    if (clean.startsWith('>')) {
      return <blockquote className="pull-quote" key={index}><p>{clean.replace(/^>\s?/, '')}</p></blockquote>;
    }
    return <p key={index}>{clean}</p>;
  });
}
