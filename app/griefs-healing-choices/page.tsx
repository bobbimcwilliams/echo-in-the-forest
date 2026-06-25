import type { Metadata } from 'next';
import { GriefsHealingChoices } from './GriefsHealingChoices';

export const metadata: Metadata = {
  title: "Grief's Healing Choices",
  description:
    "A caring community, practical support, and gentle hope for people navigating grief.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GriefsHealingChoicesPage() {
  return <GriefsHealingChoices />;
}
