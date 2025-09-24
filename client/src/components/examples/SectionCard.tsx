import SectionCard from '../SectionCard';
import type { Section } from '@shared/schema';

const mockSection: Section = {
  id: '1',
  name: 'Hero Banner Pro',
  description: 'A stunning hero section with animated backgrounds and call-to-action buttons. Perfect for landing pages and promotional content.',
  category: 'Hero Banners',
  price: '12.99',
  isFree: false,
  previewImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
  liquidCode: '',
  settingsSchema: null,
  isPopular: true,
  downloads: 1250,
  rating: '4.8',
  createdAt: new Date(),
};

export default function SectionCardExample() {
  const handlePreview = (section: Section) => {
    console.log('Preview section:', section.name);
  };

  const handleInstall = (section: Section) => {
    console.log('Install section:', section.name);
  };

  return (
    <div className="max-w-sm">
      <SectionCard 
        section={mockSection} 
        onPreview={handlePreview}
        onInstall={handleInstall}
      />
    </div>
  );
}