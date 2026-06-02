import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/article.html', destination: '/articles/trying-to-fit-in', permanent: true },
      { source: '/article-two.html', destination: '/articles/the-day-i-hit-post', permanent: true },
      { source: '/article-three.html', destination: '/articles/more-to-the-story', permanent: true },
    ];
  },
};

export default nextConfig;
