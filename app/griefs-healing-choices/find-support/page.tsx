import type { Metadata } from 'next';
import { FindSupportPage } from './FindSupportPage';

export const metadata: Metadata = {
  title: "Find Support | Grief's Healing Choices",
  description: "Find a small, private group of people who understand the kind of loss you're living through.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <FindSupportPage />;
}
