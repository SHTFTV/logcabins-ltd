import React, { useState, useMemo } from 'react';
import { CabinModel } from '../types';
import { CABIN_MODELS } from '../data/mockData';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  Shield, 
  ArrowUpRight, 
  Sparkles, 
  Filter, 
  SlidersHorizontal, 
  Check, 
  Tag, 
  RotateCcw,
  Search,
  ChevronDown,
  Scale,
  Plus
} from 'lucide-react';

interface CabinExplorerProps {
  onSelectCabin: (cabin: CabinModel) => void;
  onConfigureCabin: (cabinId: string) => void;
  selectedCompareCabinIds?: string[];
  onToggleCompareCabin?: (cabinId: string) => void;
  onOpenComparisonModal?: () => void;
}

export type PriceRangeOption = 'all' | 'under-50k' | '50k-100k' | '100k-200k' | 'over-200k';

export const CabinExplorer: React.FC<CabinExplorerProps> = ({
  onSelectCabin,
  onConfigureCabin,
  selectedCompareCabinIds = [],
  onToggleCompareCabin,
  onOpenComparisonModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bedroomFilter, setBedroomFilter] = useState<number | 'all'>('all');
  const [priceRange, setPriceRange] = useState<PriceRangeOption>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'area-asc'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const priceRanges: { id: PriceRangeOption; label: string; countHint?: string }[] = [
    { id: 'all', label: 'All Price Ranges' },
    { id: 'under-50k', label: 'Under £50,000', countHint: 'Garden Studios & Pods' },
    { id: '50k-100k', label: '£50,000 – £100,000', countHint: '2-3 Bed Residential Lodges' },
    { id: '100k-200k', label: '£100,000 – £200,000', countHint: 'Luxury Architectural Lodges' },
    { id: 'over-200k', label: 'Over £200,000', countHint: 'Grand Multi-Bed Estates' },
  ];

  const filteredCabins = useMemo(() => {
    return CABIN_MODELS.filter((cabin) => {
      // Category filter
      if (selectedCategory !== 'all' && cabin.category !== selectedCategory) return false;
      
      // Bedroom filter
      if (bedroomFilter !== 'all' && cabin.bedrooms !== bedroomFilter) return false;
      
      // Price range filter
      if (priceRange === 'under-50k' && cabin.price >= 50000) return false;
      if (priceRange === '50k-100k' && (cabin.price < 50000 || cabin.price > 100000)) return false;
      if (priceRange === '100k-200k' && (cabin.price < 100000 || cabin.price > 200000)) return false;
      if (priceRange === 'over-200k' && cabin.price <= 200000) return false;

      // Text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = 
          cabin.name.toLowerCase().includes(q) ||
          cabin.description.toLowerCase().includes(q) ||
          cabin.timberType.toLowerCase().includes(q) ||
          cabin.tagline.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area-desc') return b.areaSqM - a.areaSqM;
      if (sortBy === 'area-asc') return a.areaSqM - b.areaSqM;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [selectedCategory, bedroomFilter, priceRange, searchQuery, sortBy]);

  const hasActiveFilters = selectedCategory !== 'all' || bedroomFilter !== 'all' || priceRange !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setBedroomFilter('all');
    setPriceRange('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="cabin-listings" className="py-16 bg-stone-900 text-stone-100 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Engineered Timber Architectural Range</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight">
              Timber Log Cabins For Sale
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Precision-milled from sustainable slow-grown Scandinavian timber. Available as prefabricated structural timber kits or complete turnkey builds with turnkey handover.
            </p>
          </div>

          {/* Search, Price Filter & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Compare Models CTA */}
            {onOpenComparisonModal && (
              <button
                onClick={onOpenComparisonModal}
                className="px-3.5 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900/60 border border-amber-600/50 text-amber-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Compare Models</span>
                {selectedCompareCabinIds.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold">
                    {selectedCompareCabinIds.length}/3
                  </span>
                )}
              </button>
            )}

            {/* Search Input */}
            <div className="relative w-full sm:w-52">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search model or timber..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Price Range Filter Dropdown */}
            <div className="relative w-full sm:w-auto">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 focus-within:border-amber-500 transition-colors">
                <Tag className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <select
                  id="cabin-price-range-select"
                  aria-label="Filter cabins by price range"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as PriceRangeOption)}
                  className="bg-transparent text-stone-200 text-xs focus:outline-none cursor-pointer pr-1 appearance-none"
                >
                  {priceRanges.map((range) => (
                    <option key={range.id} value={range.id} className="bg-stone-900 text-stone-200 py-1">
                      {range.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 focus-within:border-amber-500 transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <select
                  id="cabin-sort-select"
                  aria-label="Sort cabins by"
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-transparent text-stone-200 text-xs focus:outline-none cursor-pointer pr-1 appearance-none"
                >
                  <option value="featured" className="bg-stone-900 text-stone-200">Sort: Featured First</option>
                  <option value="price-asc" className="bg-stone-900 text-stone-200">Price: Low to High</option>
                  <option value="price-desc" className="bg-stone-900 text-stone-200">Price: High to Low</option>
                  <option value="area-desc" className="bg-stone-900 text-stone-200">Floor Area: Largest First</option>
                  <option value="area-asc" className="bg-stone-900 text-stone-200">Floor Area: Compact First</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2 rounded-xl bg-stone-950/80 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters & Bedroom Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-stone-800/80 scrollbar-thin">
          {[
            { id: 'all', label: 'All Log Cabins' },
            { id: 'luxury', label: 'Luxury Alpine Estates' },
            { id: 'residential', label: 'Residential Homes' },
            { id: 'garden', label: 'Garden Studios & Pods' },
            { id: 'commercial', label: 'Holiday Park Lodges' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-950/40 font-semibold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}

          {/* Bedroom Filter */}
          <div className="ml-auto flex items-center gap-1.5 pl-4 border-l border-stone-800 shrink-0">
            <span className="text-xs text-stone-400 font-medium">Beds:</span>
            {['all', 1, 2, 3, 5].map((bed) => (
              <button
                key={String(bed)}
                onClick={() => setBedroomFilter(bed as any)}
                className={`w-7 h-7 rounded-lg text-xs font-medium flex items-center justify-center transition-colors cursor-pointer ${
                  bedroomFilter === bed
                    ? 'bg-amber-600 text-white font-bold'
                    : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {bed === 'all' ? 'All' : bed}
              </button>
            ))}
          </div>
        </div>

        {/* Results summary bar */}
        <div className="flex items-center justify-between text-xs text-stone-400 mb-6">
          <div>
            Showing <strong className="text-stone-200">{filteredCabins.length}</strong> of{' '}
            <strong className="text-stone-200">{CABIN_MODELS.length}</strong> log cabin models
            {priceRange !== 'all' && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-800/40 text-amber-300 text-[11px]">
                Budget: {priceRanges.find(r => r.id === priceRange)?.label}
              </span>
            )}
          </div>
          {filteredCabins.length > 0 && (
            <div className="text-[11px] text-stone-500 hidden sm:block">
              Prices include structural Glulam kit and architectural plans
            </div>
          )}
        </div>

        {/* Cabins Grid */}
        {filteredCabins.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-stone-950/50 border border-stone-800 space-y-4">
            <Tag className="w-10 h-10 text-amber-500/50 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-stone-200">No Cabins Match Your Selected Budget</h3>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Try widening your price range filter or resetting active categories to explore our full timber range.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCabins.map((cabin) => {
              const isCompared = selectedCompareCabinIds.includes(cabin.id);

              return (
                <div
                  key={cabin.id}
                  id={`cabin-card-${cabin.id}`}
                  className={`group flex flex-col rounded-2xl bg-stone-950 border transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-950/20 relative ${
                    isCompared
                      ? 'border-amber-500 ring-1 ring-amber-500/50'
                      : 'border-stone-800 hover:border-amber-500/50'
                  }`}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden bg-stone-900">
                    <img
                      src={cabin.image}
                      alt={cabin.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                    {/* Badge tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {cabin.popular && (
                        <span className="px-2.5 py-1 rounded-md bg-amber-500 text-stone-950 text-[11px] font-bold tracking-wide shadow-md">
                          FEATURED
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-md bg-stone-900/90 border border-stone-700 text-stone-200 text-[11px] font-medium backdrop-blur-sm">
                        {cabin.wallThicknessMm}mm Log Profile
                      </span>
                    </div>

                    {/* Compare Checkbox / Toggle Button on top right */}
                    {onToggleCompareCabin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCompareCabin(cabin.id);
                        }}
                        className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1 cursor-pointer shadow-md ${
                          isCompared
                            ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-amber-950/50'
                            : 'bg-stone-950/80 text-stone-300 border-stone-700 hover:text-white hover:border-stone-500'
                        }`}
                        title={isCompared ? 'Remove from comparison' : 'Add to side-by-side comparison'}
                      >
                        <Scale className="w-3 h-3" />
                        <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                      </button>
                    )}

                    {/* Price pill */}
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-stone-950/90 border border-amber-500/40 backdrop-blur-md">
                      <div className="text-[10px] uppercase text-stone-400 font-medium">Turnkey Kit From</div>
                      <div className="text-amber-400 font-bold text-lg font-mono">
                        £{cabin.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                        {cabin.name}
                      </h3>
                      <p className="text-stone-400 text-xs line-clamp-2 mt-1.5 leading-relaxed">
                        {cabin.tagline}
                      </p>

                      {/* Core Metrics */}
                      <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-stone-800/80 text-xs">
                        <div className="flex items-center gap-1.5 text-stone-300">
                          <Maximize2 className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{cabin.areaSqM} m²</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-stone-300">
                          <Bed className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{cabin.bedrooms} {cabin.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-stone-300">
                          <Bath className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>{cabin.bathrooms} {cabin.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div className="space-y-1.5 mb-6">
                        {cabin.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                            <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => onSelectCabin(cabin)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Full Specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                      </button>

                      <button
                        onClick={() => onConfigureCabin(cabin.id)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-950/50 cursor-pointer"
                      >
                        <span>Configure</span>
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Bottom Comparison Drawer Bar (if at least 1 cabin is selected) */}
        {selectedCompareCabinIds.length > 0 && onOpenComparisonModal && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-2xl bg-stone-950/95 border border-amber-500/60 backdrop-blur-xl p-3 sm:p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                {selectedCompareCabinIds.length}/3
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-white">Models Selected For Comparison</div>
                <div className="text-[11px] text-stone-400 truncate max-w-xs">
                  {selectedCompareCabinIds
                    .map(id => CABIN_MODELS.find(c => c.id === id)?.name)
                    .filter(Boolean)
                    .join(', ')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenComparisonModal}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-amber-950/50"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Side-by-Side</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

