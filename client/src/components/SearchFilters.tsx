import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Search, Filter, X, Grid, List } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceFilter: string;
  onPriceFilterChange: (filter: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const categories = [
  'All Categories',
  'Hero Banners',
  'Product Features',
  'Testimonials',
  'FAQ Sections',
  'Image Galleries',
  'Newsletter Signup',
  'Countdown Timers',
  'Contact Forms',
  'Social Proof'
];

const priceFilters = [
  'All Prices',
  'Free Only',
  'Under $5',
  '$5 - $15',
  '$15 - $25',
  'Over $25'
];

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceFilter,
  onPriceFilterChange,
  viewMode,
  onViewModeChange
}: SearchFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Search query changed:', value);
    onSearchChange(value);
  };

  const handleCategoryChange = (value: string) => {
    console.log('Category changed:', value);
    onCategoryChange(value);
  };

  const handlePriceFilterChange = (value: string) => {
    console.log('Price filter changed:', value);
    onPriceFilterChange(value);
  };

  const handleViewModeToggle = (mode: 'grid' | 'list') => {
    console.log('View mode changed:', mode);
    onViewModeChange(mode);
  };

  const clearFilters = () => {
    console.log('Filters cleared');
    onSearchChange('');
    onCategoryChange('All Categories');
    onPriceFilterChange('All Prices');
  };

  const hasActiveFilters = selectedCategory !== 'All Categories' || 
                          priceFilter !== 'All Prices' || 
                          searchQuery.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search sections..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 pr-4"
          data-testid="input-search"
        />
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          {/* Mobile Filter Sheet */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden" data-testid="button-mobile-filter">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
                    !
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Filter sections by category and price
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger data-testid="select-category-mobile">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Price</label>
                  <Select value={priceFilter} onValueChange={handlePriceFilterChange}>
                    <SelectTrigger data-testid="select-price-mobile">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priceFilters.map((filter) => (
                        <SelectItem key={filter} value={filter}>
                          {filter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    onClick={() => { clearFilters(); setIsFilterOpen(false); }}
                    className="w-full"
                    data-testid="button-clear-filters-mobile"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Filters */}
          <div className="hidden md:flex items-center gap-2 flex-1">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-48" data-testid="select-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={handlePriceFilterChange}>
              <SelectTrigger className="w-36" data-testid="select-price">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceFilters.map((filter) => (
                  <SelectItem key={filter} value={filter}>
                    {filter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                data-testid="button-clear-filters"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 border rounded-md p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewModeToggle('grid')}
            className="px-2"
            data-testid="button-grid-view"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewModeToggle('list')}
            className="px-2"
            data-testid="button-list-view"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="gap-1" data-testid="badge-search-filter">
              Search: {searchQuery}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-destructive" 
                onClick={() => onSearchChange('')}
              />
            </Badge>
          )}
          {selectedCategory !== 'All Categories' && (
            <Badge variant="secondary" className="gap-1" data-testid="badge-category-filter">
              {selectedCategory}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-destructive" 
                onClick={() => onCategoryChange('All Categories')}
              />
            </Badge>
          )}
          {priceFilter !== 'All Prices' && (
            <Badge variant="secondary" className="gap-1" data-testid="badge-price-filter">
              {priceFilter}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-destructive" 
                onClick={() => onPriceFilterChange('All Prices')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}