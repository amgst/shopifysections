import { useState } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import SectionGrid from "@/components/SectionGrid";
import SectionPreviewModal from "@/components/SectionPreviewModal";
import type { Section } from "@shared/schema";

// Mock data for demonstration //todo: remove mock functionality
const mockSections: Section[] = [
  {
    id: '1',
    name: 'Hero Banner Pro',
    description: 'A stunning hero section with animated backgrounds, call-to-action buttons, and video backgrounds. Perfect for landing pages and promotional content.',
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
    name: 'Customer Reviews Widget',
    description: 'Display customer testimonials with star ratings, customer photos, and social proof indicators.',
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
    name: 'Product Showcase Grid',
    description: 'Feature your best products with elegant grid layout, hover effects, and quick view functionality.',
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
    description: 'Interactive FAQ section with smooth accordion animations and search functionality.',
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
  {
    id: '5',
    name: 'Image Gallery Masonry',
    description: 'Beautiful masonry layout gallery with lightbox functionality and image lazy loading.',
    category: 'Image Galleries',
    price: '9.99',
    isFree: false,
    previewImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    liquidCode: '',
    settingsSchema: null,
    isPopular: true,
    downloads: 734,
    rating: '4.7',
    createdAt: new Date(),
  },
  {
    id: '6',
    name: 'Newsletter Signup Form',
    description: 'Convert visitors with beautiful newsletter signup forms and email collection widgets.',
    category: 'Newsletter Signup',
    price: '0.00',
    isFree: true,
    previewImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
    liquidCode: '',
    settingsSchema: null,
    isPopular: false,
    downloads: 1456,
    rating: '4.4',
    createdAt: new Date(),
  },
  {
    id: '7',
    name: 'Countdown Timer',
    description: 'Create urgency with beautiful countdown timers for sales, launches, and special events.',
    category: 'Countdown Timers',
    price: '7.99',
    isFree: false,
    previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    liquidCode: '',
    settingsSchema: null,
    isPopular: true,
    downloads: 923,
    rating: '4.6',
    createdAt: new Date(),
  },
  {
    id: '8',
    name: 'Contact Form Builder',
    description: 'Professional contact forms with validation, spam protection, and email notifications.',
    category: 'Contact Forms',
    price: '6.99',
    isFree: false,
    previewImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
    liquidCode: '',
    settingsSchema: null,
    isPopular: false,
    downloads: 445,
    rating: '4.3',
    createdAt: new Date(),
  },
];

export default function SectionMarketplace() {
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Preview modal state
  const [previewSection, setPreviewSection] = useState<Section | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Filter sections based on current filters //todo: remove mock functionality
  const filteredSections = mockSections.filter(section => {
    const matchesSearch = searchQuery === '' || 
      section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || 
      section.category === selectedCategory;
    
    const matchesPrice = (() => {
      switch (priceFilter) {
        case 'Free Only':
          return section.isFree;
        case 'Under $5':
          return !section.isFree && parseFloat(section.price) < 5;
        case '$5 - $15':
          return !section.isFree && parseFloat(section.price) >= 5 && parseFloat(section.price) <= 15;
        case '$15 - $25':
          return !section.isFree && parseFloat(section.price) > 15 && parseFloat(section.price) <= 25;
        case 'Over $25':
          return !section.isFree && parseFloat(section.price) > 25;
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handlePreview = (section: Section) => {
    console.log('Opening preview for:', section.name);
    setPreviewSection(section);
    setIsPreviewOpen(true);
  };

  const handleInstall = (section: Section) => {
    console.log('Installing section:', section.name);
    // todo: remove mock functionality - Replace with actual installation logic
    alert(`Installing "${section.name}" to your theme!\n\nThis would normally:\n1. Add the section to your theme\n2. Make it available in the theme editor\n3. Update your billing if it's a paid section`);
  };

  const handleLoadMore = () => {
    console.log('Loading more sections...');
    // todo: remove mock functionality - Replace with actual API call
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        shopName="Demo Fashion Store" 
        installedSectionsCount={3} // todo: remove mock functionality
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
            Browse Sections
          </h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            Discover 500+ professional theme sections to enhance your Shopify store. 
            No coding required - install sections with one click.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Section Grid */}
        <SectionGrid
          sections={filteredSections}
          viewMode={viewMode}
          isLoading={isLoading}
          onPreview={handlePreview}
          onInstall={handleInstall}
          onLoadMore={handleLoadMore}
          hasMore={filteredSections.length > 0}
        />

        {/* Preview Modal */}
        <SectionPreviewModal
          section={previewSection}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onInstall={handleInstall}
        />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Section Factory</h3>
              <p className="text-sm text-muted-foreground">
                Professional theme sections for Shopify stores. 
                No coding required.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Hero Banners</li>
                <li>Product Features</li>
                <li>Testimonials</li>
                <li>Image Galleries</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact Support</li>
                <li>Request Section</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Refund Policy</li>
                <li>License Agreement</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Section Factory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}