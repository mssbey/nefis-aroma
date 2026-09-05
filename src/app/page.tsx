import { Hero } from '@/components/home/Hero';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { Diy25Section } from '@/components/home/Diy25Section';
import { FlavorExplorer } from '@/components/home/FlavorExplorer';
import { SignatureCollections } from '@/components/home/SignatureCollections';
import { AromaFinderSection } from '@/components/home/AromaFinderSection';
import { LabProcess } from '@/components/home/LabProcess';
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection';
import { CampaignBanner } from '@/components/home/CampaignBanner';
import { GuideTeaser } from '@/components/home/GuideTeaser';
import { Testimonials } from '@/components/home/Testimonials';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <Diy25Section />
      <FlavorExplorer />
      <SignatureCollections />
      <AromaFinderSection />
      <LabProcess />
      <NewArrivalsSection />
      <CampaignBanner />
      <GuideTeaser />
      <Testimonials />
      <InstagramFeed />
      <NewsletterSection />
    </>
  );
}
