import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: { dark: '#0d1f10', mid: '#1a3320' },
        cream: '#f5f0e8',
        gold: '#8b7355',
      },
      fontFamily: {
        body: ['Bitter', 'Georgia', 'serif'],
        display: ['Sorts Mill Goudy', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
