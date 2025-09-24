import { useState } from 'react';
import SectionPreviewModal from '../SectionPreviewModal';
import { Button } from '@/components/ui/button';
import type { Section } from '@shared/schema';

const mockSection: Section = {
  id: '1',
  name: 'Hero Banner Pro',
  description: 'A stunning hero section with animated backgrounds and call-to-action buttons. Perfect for landing pages and promotional content that converts visitors into customers.',
  category: 'Hero Banners',
  price: '12.99',
  isFree: false,
  previewImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
  liquidCode: '',
  settingsSchema: null,
  isPopular: true,
  downloads: 1250,
  rating: '4.8',
  createdAt: new Date(),
};

export default function SectionPreviewModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleInstall = (section: Section) => {
    console.log('Install section:', section.name);
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-modal">
        Open Section Preview
      </Button>
      
      <SectionPreviewModal
        section={mockSection}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onInstall={handleInstall}
      />
    </div>
  );
}