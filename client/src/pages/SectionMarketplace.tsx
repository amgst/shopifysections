import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import SectionGrid from "@/components/SectionGrid";
import SectionPreviewModal from "@/components/SectionPreviewModal";
import { useToast } from "@/hooks/use-toast";
import type { Section } from "@shared/schema";

export default function SectionMarketplace() {
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Preview modal state
  const [previewSection, setPreviewSection] = useState<Section | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Shop context (in a real app, this would come from Shopify authentication)
  const shopDomain = 'demo-fashion-store.myshopify.com';
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch sections with filters
  const { data: sections = [], isLoading } = useQuery({
    queryKey: ['sections', { category: selectedCategory, search: searchQuery, priceFilter }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All Categories') params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      if (priceFilter !== 'All Prices') params.append('price_filter', priceFilter);
      
      const response = await fetch(`/api/sections?${params}`);
      if (!response.ok) throw new Error('Failed to fetch sections');
      return response.json();
    },
  });

  // Install section mutation
  const installMutation = useMutation({
    mutationFn: async (sectionId: string) => {
      const response = await fetch(`/api/sections/${sectionId}/install`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopDomain }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to install section');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Section Installed!",
        description: `${data.section.name} has been added to your theme. You can now use it in the Shopify theme editor.`,
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['sections'] });
      queryClient.invalidateQueries({ queryKey: ['installations'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Installation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handlePreview = (section: Section) => {
    console.log('Opening preview for:', section.name);
    setPreviewSection(section);
    setIsPreviewOpen(true);
  };

  const handleInstall = (section: Section) => {
    console.log('Installing section:', section.name);
    installMutation.mutate(section.id);
  };

  const handleLoadMore = () => {
    console.log('Loading more sections...');
    // In a real implementation, this would fetch the next page of results
    // For now, we show all results at once
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
          sections={sections}
          viewMode={viewMode}
          isLoading={isLoading}
          onPreview={handlePreview}
          onInstall={handleInstall}
          onLoadMore={handleLoadMore}
          hasMore={false}
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