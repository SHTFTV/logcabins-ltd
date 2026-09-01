import React from 'react';
import { Trees, Compass, Home, Hammer, Sparkles, Phone, Calculator, Heart, Menu, X, Scale, Camera, MapPin } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoritesCount: number;
  onOpenAdvisor: () => void;
  onOpenBooking: () => void;
  onOpenRoi: () => void;
  onOpenComparison?: () => void;
  comparedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenAdvisor,
  onOpenBooking,
  onOpenRoi,
  onOpenComparison,
  comparedCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'cabins', label: 'Cabins For Sale', icon: Home },
    { id: 'projects', label: 'Completed Builds', icon: Camera },
    { id: 'land', label: 'Land Plots', icon: Trees },
    { id: 'configurator', label: 'Configurator', icon: Compass },
    { id: 'financing', label: 'Mortgage & Finance', icon: Calculator },
    { id: 'services', label: 'Turnkey Services', icon: Hammer },
    { id: 'bc-canada', label: 'BC, Canada', icon: MapPin },
  ];


  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setActiveTab('cabins');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-950/50 border border-amber-500/30 group-hover:scale-105 transition-transform">
              <Trees className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors">
                  LogCabins<span className="text-amber-500 font-sans text-sm font-semibold ml-0.5 px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800/50">.ltd</span>
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-wider text-stone-400 uppercase">
                Sales • Turnkey Service • Real Estate
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-900/90 px-3 py-1.5 rounded-full border border-stone-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    const targetMap: Record<string, string> = {
                      cabins: 'cabin-listings',
                      projects: 'completed-projects',
                      land: 'surrounding-land',
                      configurator: 'configurator',
                      financing: 'financing-calculator',
                      services: 'turnkey-services',
                      'bc-canada': 'bc-canada-service',
                    };
                    const targetId = targetMap[item.id];
                    if (targetId) {
                      const elem = document.getElementById(targetId);
                      if (elem) {
                        elem.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-950/40'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-amber-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>


          {/* Action Tools & Booking */}
          <div className="hidden md:flex items-center gap-2.5">
            {onOpenComparison && (
              <button
                id="nav-compare-btn"
                onClick={onOpenComparison}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-stone-300 bg-stone-900 border border-stone-800 hover:text-white hover:border-amber-500/50 transition-colors"
                title="Compare up to 3 cabin models side-by-side"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Compare</span>
                {comparedCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold">
                    {comparedCount}
                  </span>
                )}
              </button>
            )}

            <button
              id="nav-ai-advisor-btn"
              onClick={onOpenAdvisor}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-700/50 hover:bg-amber-900/40 transition-colors"
              title="AI Land Suitability & Architectural Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>AI Advisor</span>
            </button>

            <button
              id="nav-roi-calc-btn"
              onClick={onOpenRoi}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-stone-300 bg-stone-900 border border-stone-800 hover:text-white hover:border-stone-700 transition-colors"
              title="Holiday Let ROI Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-stone-400" />
              <span>ROI Calc</span>
            </button>

            <button
              id="nav-book-survey-btn"
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-950/50 transition-all active:scale-95 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Book Survey</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenComparison && (
              <button
                onClick={onOpenComparison}
                className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-xs flex items-center gap-1"
                title="Compare cabins"
              >
                <Scale className="w-4 h-4 text-amber-400" />
                {comparedCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                    {comparedCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={onOpenAdvisor}
              className="p-2 rounded-lg bg-amber-950/50 border border-amber-800/60 text-amber-400 text-xs flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                    const targetMap: Record<string, string> = {
                      cabins: 'cabin-listings',
                      projects: 'completed-projects',
                      land: 'surrounding-land',
                      configurator: 'configurator',
                      financing: 'financing-calculator',
                      services: 'turnkey-services',
                      'bc-canada': 'bc-canada-service',
                    };
                    const targetId = targetMap[item.id];
                    if (targetId) {
                      const elem = document.getElementById(targetId);
                      if (elem) {
                        elem.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    isActive ? 'bg-amber-600 text-white' : 'bg-stone-900 text-stone-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}

          </div>

          <div className="pt-2 border-t border-stone-800 flex gap-2">
            {onOpenComparison && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenComparison();
                }}
                className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-stone-900 border border-stone-800 text-stone-200 flex items-center justify-center gap-1.5"
              >
                <Scale className="w-4 h-4 text-amber-400" /> Compare Models
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdvisor();
              }}
              className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-amber-950/60 border border-amber-800 text-amber-300 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> AI Land Advisor
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold bg-amber-500 text-stone-950 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Book Survey
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
