import React from 'react';
import { ArrowRight, Trees, Hammer, Compass, Sparkles, MapPin, Camera } from 'lucide-react';

interface HeroSectionProps {
  onBrowseListings: () => void;
  onExploreLand: () => void;
  onOpenConfigurator: (cabinId?: string) => void;
  onOpenAdvisor: () => void;
  onViewProjects?: () => void;
  onOpenBooking?: (topic?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBrowseListings,
  onExploreLand,
  onOpenConfigurator,
  onOpenAdvisor,
  onViewProjects,
  onOpenBooking,
}) => {

  return (
    <section className="relative w-full overflow-hidden bg-stone-950 border-b border-stone-800 text-stone-100">
      {/* Background Hero Layer with Atmospheric Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Timber Log Cabin in Forest"
          className="w-full h-full object-cover object-center brightness-40 contrast-110 scale-105 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
        <div className="absolute inset-0 bg-radial-at-c from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wide backdrop-blur-md shadow-lg shadow-amber-950/40">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-amber-200">LogCabins.ltd</span>
            <span className="text-amber-400/60">•</span>
            <span>Turnkey Sales, Build Services & Surrounding Plots</span>
          </div>

          {/* Heading with Playfair Display */}
          <h1
            id="hero-heading"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-stone-100 leading-[1.1]"
          >
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">Wilderness</span> Escape
          </h1>

          {/* Sub-headline detailing turnkey cabin services */}
          <p
            id="hero-subheadline"
            className="text-lg sm:text-xl text-stone-300 font-normal leading-relaxed max-w-2xl"
          >
            We engineer and construct bespoke Nordic timber log homes, deliver full turnkey groundworks, planning permissions, and off-grid utilities, and curate prime build-ready real estate plots across breathtaking highland and forest landscapes.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              id="hero-browse-listings-cta"
              onClick={onBrowseListings}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-950/60 transition-all hover:scale-[1.02] active:scale-95 text-base cursor-pointer"
            >
              <span>Browse Listings</span>
              <ArrowRight className="w-5 h-5 text-stone-950" />
            </button>

            <button
              id="hero-explore-land-cta"
              onClick={onExploreLand}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-stone-200 bg-stone-900/80 hover:bg-stone-850 hover:text-white border border-stone-700/80 hover:border-amber-500/50 backdrop-blur-sm transition-all text-base cursor-pointer"
            >
              <Trees className="w-5 h-5 text-amber-400" />
              <span>Surrounding Land</span>
            </button>

            {onViewProjects && (
              <button
                id="hero-completed-projects-cta"
                onClick={onViewProjects}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-stone-200 bg-stone-900/80 hover:bg-stone-850 hover:text-white border border-stone-700/80 hover:border-amber-500/50 backdrop-blur-sm transition-all text-base cursor-pointer"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Completed Builds</span>
              </button>
            )}

            <button
              id="hero-ai-advisor-cta"
              onClick={onOpenAdvisor}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-600/40 transition-all text-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Land Advisor</span>
            </button>

          </div>

          {/* Trust Value Pillars */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone-800/80 text-xs">
            <div className="flex items-center gap-2.5 text-stone-300">
              <Hammer className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-stone-100">Full Turnkey Service</div>
                <div className="text-stone-400 text-[11px]">Groundwork to interior fit</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-stone-300">
              <Compass className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-stone-100">Planning Approved</div>
                <div className="text-stone-400 text-[11px]">Council & warrant support</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-stone-300">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-stone-100">Surrounding Land</div>
                <div className="text-stone-400 text-[11px]">Build-ready scenic acreage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
