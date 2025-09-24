import SectionGrid from '../SectionGrid';
import type { Section } from '@shared/schema';

// Mock sections data
const mockSections: Section[] = [
  {
    id: '1',
    name: 'Hero Banner Pro',
    description: 'A stunning hero section with animated backgrounds and call-to-action buttons.',
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
  },
  {
    id: '2',
    name: 'Customer Reviews',
    description: 'Display customer testimonials with star ratings and photos.',
    category: 'Testimonials',
    price: '0.00',
    isFree: true,
    previewImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    liquidCode: '',
    settingsSchema: null,
    isPopular: false,
    downloads: 892,
    rating: '4.6',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Product Showcase',
    description: 'Feature your best products with elegant grid layout and hover effects.',
    category: 'Product Features',
    price: '8.99',
    isFree: false,
    previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    liquidCode: '',
    settingsSchema: null,
    isPopular: true,
    downloads: 2103,
    rating: '4.9',
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'FAQ Accordion',
    description: 'Interactive FAQ section with smooth accordion animations.',
    category: 'FAQ Sections',
    price: '5.99',
    isFree: false,
    previewImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    liquidCode: '',
    settingsSchema: null,
    isPopular: false,
    downloads: 567,
    rating: '4.5',
    createdAt: new Date(),
  },
];

export default function SectionGridExample() {
  const handlePreview = (section: Section) => {
    console.log('Preview section:', section.name);
  };

  const handleInstall = (section: Section) => {
    console.log('Install section:', section.name);
  };

  const handleLoadMore = () => {
    console.log('Load more sections');
  };

  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-xl font-semibold mb-6">Grid View</h2>
      <SectionGrid
        sections={mockSections}
        viewMode="grid"
        onPreview={handlePreview}
        onInstall={handleInstall}
        onLoadMore={handleLoadMore}
        hasMore={true}
      />
      
      <h2 className="text-xl font-semibold mb-6 mt-12">List View</h2>
      <SectionGrid
        sections={mockSections.slice(0, 2)}
        viewMode="list"
        onPreview={handlePreview}
        onInstall={handleInstall}
      />
    </div>
  );
}