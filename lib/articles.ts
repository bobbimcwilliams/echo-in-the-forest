import fs from 'node:fs';
import path from 'node:path';

export type Article = {
  title: string;
  slug: string;
  date: string;
  subtitle: string;
  excerpt: string;
  featured: boolean;
  order: number;
  related: string[];
  body: string;
};

const dir = path.join(process.cwd(), 'content/articles');

function parseValue(value: string) {
  const trimmed = value.trim();
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  if (trimmed.startsWith('[')) return trimmed.slice(1, -1).split(',').map((item) => item.trim()).filter(Boolean);
  return trimmed;
}

function parseFile(fileName: string): Article {
  const raw = fs.readFileSync(path.join(dir, fileName), 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${fileName} is missing front matter`);
  const data = match[1].split('\n').reduce<Record<string, unknown>>((acc, line) => {
    const index = line.indexOf(':');
    if (index > -1) acc[line.slice(0, index).trim()] = parseValue(line.slice(index + 1));
    return acc;
  }, {});
  return {
    title: String(data.title),
    slug: String(data.slug),
    date: String(data.date),
    subtitle: String(data.subtitle),
    excerpt: String(data.excerpt),
    featured: Boolean(data.featured),
    order: Number(data.order),
    related: Array.isArray(data.related) ? data.related.map(String) : [],
    body: match[2].trim(),
  };
}

export function getAllArticles() {
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md')).map(parseFile).sort((a, b) => a.order - b.order);
}

export function getArticleBySlug(slug: string) {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article) {
  const all = getAllArticles().filter((item) => item.slug !== article.slug);
  return [...article.related.map((slug) => all.find((item) => item.slug === slug)).filter(Boolean), ...all].slice(0, 3) as Article[];
}
