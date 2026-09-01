import React, { useState } from 'react';
import { LandPlot, CabinModel } from '../types';
import { SURROUNDING_LAND_PLOTS, CABIN_MODELS } from '../data/mockData';
import { MapPin, Trees, Compass, CheckCircle2, ArrowRight, Layers, Sparkles, SlidersHorizontal, Eye } from 'lucide-react';

interface LandPlotsExplorerProps {
  onSelectPlot: (plot: LandPlot) => void;
  onPairWithCabin: (plot: LandPlot, cabinId?: string) => void;
}

export const LandPlotsExplorer: React.FC<LandPlotsExplorerProps> = ({
  onSelectPlot,
  onPairWithCabin,
}) => {
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [planningFilter, setPlanningFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [hoveredPlotId, setHoveredPlotId] = useState<string | null>(null);

  const filteredPlots = SURROUNDING_LAND_PLOTS.filter((plot) => {
    if (regionFilter !== 'all' && plot.region !== regionFilter) return false;
    if (planningFilter !== 'all' && !plot.planningStatus.toLowerCase().includes(planningFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <section id="surrounding-land" className="py-16 bg-stone-950 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Trees className="w-4 h-4" />
              <span>Prime Acreage & Build-Ready Sites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight">
              Surrounding Real Estate & Land Sales
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl">
              Carefully scouted wilderness parcels, loch-side plots, and mountain meadows for handcrafted log homes -- always confirm access, legal boundaries, and planning feasibility during your own due diligence.
            </p>
          </div>

          {/* View toggle & Actions */}
          <div className="flex items-center gap-3">
            <div className="bg-stone-900 p-1 rounded-xl border border-stone-800 flex items-center">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'grid' ? 'bg-amber-600 text-white font-semibold' : 'text-stone-400 hover:text-white'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'map' ? 'bg-amber-600 text-white font-semibold' : 'text-stone-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Interactive Plot Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Region Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-stone-800/80">
          {[
            { id: 'all', label: 'All Regions' },
            { id: 'highlands', label: 'Scottish Highlands' },
            { id: 'lakes', label: 'Lake District' },
            { id: 'wales', label: 'Snowdonia (Wales)' },
            { id: 'cotswolds', label: 'Cotswolds AONB' },
            { id: 'yorkshire', label: 'Yorkshire Dales' },
          ].map((reg) => (
            <button
              key={reg.id}
              onClick={() => setRegionFilter(reg.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                regionFilter === reg.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {reg.label}
            </button>
          ))}

          {/* Planning Filter Dropdown */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-stone-400">Planning:</span>
            <select
              value={planningFilter}
              onChange={(e) => setPlanningFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Planning Types</option>
              <option value="Residential">Full Residential Planning</option>
              <option value="Tourism">Tourism / Holiday Park</option>
              <option value="Outline">Outline Consent</option>
            </select>
          </div>
        </div>

        {/* MAP VIEW MODE */}
        {viewMode === 'map' && (
          <div className="mb-12 rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-2xl p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                  UK & Highlands Scenic Land Parcel Radar
                </span>
              </div>
              <span className="text-xs text-stone-400">Click any plot marker to inspect details</span>
            </div>

            {/* Stylized UK Regional Radar / Map Canvas */}
            <div className="relative w-full h-96 bg-stone-950 rounded-xl border border-stone-800 overflow-hidden flex items-center justify-center p-4">
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#292524_1px,transparent_1px),linear-gradient(to_bottom,#292524_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

              {/* Geographic contours representation */}
              <div className="absolute inset-8 rounded-full border border-amber-900/20 pointer-events-none" />
              <div className="absolute inset-20 rounded-full border border-amber-800/10 pointer-events-none" />

              {/* Plot Pins */}
              {filteredPlots.map((plot) => {
                const isHovered = hoveredPlotId === plot.id;
                return (
                  <div
                    key={plot.id}
                    style={{ left: `${plot.coordinates.x}%`, top: `${plot.coordinates.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                    onClick={() => onSelectPlot(plot)}
                    onMouseEnter={() => setHoveredPlotId(plot.id)}
                    onMouseLeave={() => setHoveredPlotId(null)}
                  >
                    <div className={`relative flex items-center justify-center p-2 rounded-full transition-all ${
                      isHovered ? 'scale-125 bg-amber-500 text-stone-950 shadow-xl shadow-amber-500/50 ring-4 ring-amber-500/30' : 'bg-stone-900 text-amber-400 border border-amber-500/60 shadow-lg'
                    }`}>
                      <Trees className="w-4 h-4" />
                    </div>

                    {/* Tooltip Card */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 rounded-xl bg-stone-900/95 border border-stone-700 shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      <div className="text-[11px] font-bold text-amber-400 line-clamp-1">{plot.title}</div>
                      <div className="text-[10px] text-stone-400">{plot.location}</div>
                      <div className="mt-1 flex items-center justify-between text-xs font-mono">
                        <span className="text-stone-300">{plot.acreage} Acres</span>
                        <span className="text-amber-300 font-bold">£{plot.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="absolute bottom-4 left-4 bg-stone-900/90 border border-stone-800 px-3 py-2 rounded-lg text-[11px] text-stone-400 space-y-1 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>Available Land Plot with Building Rights</span>
                </div>
                <div>All parcels surveyed for log cabin ground-screw suitability.</div>
              </div>
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlots.map((plot) => (
            <div
              key={plot.id}
              id={`plot-card-${plot.id}`}
              className="group flex flex-col rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden bg-stone-950">
                <img
                  src={plot.image}
                  alt={plot.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-stone-950/90 border border-stone-700 text-amber-400 text-[11px] font-bold backdrop-blur-sm">
                    {plot.acreage} ACRES
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-medium backdrop-blur-sm">
                    {plot.planningStatus}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-stone-950/90 border border-amber-500/40 backdrop-blur-md">
                  <div className="text-[10px] uppercase text-stone-400 font-medium">Land Price</div>
                  <div className="text-amber-400 font-bold text-lg font-mono">
                    £{plot.price.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{plot.location}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    {plot.title}
                  </h3>

                  <p className="text-stone-400 text-xs line-clamp-2 mt-2 leading-relaxed">
                    {plot.description}
                  </p>

                  {/* Terrain & Infrastructure */}
                  <div className="mt-4 p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-2 text-xs">
                    <div className="text-stone-300">
                      <span className="text-stone-500 font-medium">Terrain:</span> {plot.terrain}
                    </div>
                    <div className="text-stone-300">
                      <span className="text-stone-500 font-medium">Utilities:</span> {plot.waterElectricStatus}
                    </div>
                  </div>

                  {/* Views */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {plot.views.map((v, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-stone-800 text-[10px] text-stone-300">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions & Bundle saving */}
                <div className="pt-5 mt-4 border-t border-stone-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectPlot(plot)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Plot</span>
                  </button>

                  <button
                    onClick={() => onPairWithCabin(plot)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-950/40 cursor-pointer"
                    title="Combine Land Plot + Cabin Build for 8% Bundle Discount"
                  >
                    <span>Pair Cabin</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
