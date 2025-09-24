import { useState } from "react";
import SectionCard from "./SectionCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { Section } from "@shared/schema";

interface SectionGridProps {
  sections: Section[];
  viewMode: 'grid' | 'list';
  isLoading?: boolean;
  onPreview: (section: Section) => void;
  onInstall: (section: Section) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  installedSectionIds?: string[];
}

export default function SectionGrid({
  sections,
  viewMode,
  isLoading = false,
  onPreview,
  onInstall,
  onLoadMore,
  hasMore = false,
  installedSectionIds = []
}: SectionGridProps) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (!onLoadMore || isLoadingMore) return;
    
    console.log('Loading more sections...');
    setIsLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
    onLoadMore();
    setIsLoadingMore(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading sections...</span>
        </div>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="font-semibold mb-2" data-testid="text-no-sections">No sections found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search terms to find sections.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground" data-testid="text-results-count">
          Showing {sections.length} sections
        </p>
      </div>

      {/* Grid/List Layout */}
      <div 
        className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
        data-testid="container-sections"
      >
        {sections.map((section) => (
          <div key={section.id} className={viewMode === 'list' ? 'max-w-sm' : ''}>
            <SectionCard
              section={section}
              onPreview={onPreview}
              onInstall={onInstall}
              isInstalled={installedSectionIds.includes(section.id)}
            />
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            data-testid="button-load-more"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Sections'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}