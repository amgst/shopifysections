import { useState } from 'react';
import SearchFilters from '../SearchFilters';

export default function SearchFiltersExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="p-4 max-w-4xl">
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
  );
}