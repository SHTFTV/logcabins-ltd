import React, { useState } from 'react';
import { CabinModel, LandPlot } from './types';
import { CABIN_MODELS, SURROUNDING_LAND_PLOTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CabinExplorer } from './components/CabinExplorer';
import { CabinPerformanceStats } from './components/CabinPerformanceStats';
import { CompletedProjectsGallery } from './components/CompletedProjectsGallery';
import { RegionalWeatherMonitor } from './components/RegionalWeatherMonitor';
import { CabinComparisonModal } from './components/CabinComparisonModal';
import { LandPlotsExplorer } from './components/LandPlotsExplorer';
import { CabinConfigurator } from './components/CabinConfigurator';
import { CabinFinancingCalculator } from './components/CabinFinancingCalculator';
import { TurnkeyServicesSection } from './components/TurnkeyServicesSection';
import { AiLandAdvisorModal } from './components/AiLandAdvisorModal';
import { RoiCalculatorModal } from './components/RoiCalculatorModal';
import { CabinDetailModal } from './components/CabinDetailModal';
import { LandDetailModal } from './components/LandDetailModal';
import { BookingModal } from './components/BookingModal';
import { FAQAccordion } from './components/FAQAccordion';
import { Footer } from './components/Footer';
import { BCCanadaSection } from './components/BCCanadaSection';
import { BCPartnerFloater } from './components/BCPartnerFloater';
import { SUPERIOR_LOG_RESTORATIONS } from './data/bcPartner';
import { ShieldCheck, Trees, ArrowRight, Sparkles, Phone, Compass, Scale } from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('cabins');

  // Modals state
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);
  const [isRoiOpen, setIsRoiOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingTopic, setBookingTopic] = useState<string>('General Turnkey Consultation');
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [comparisonCabinIds, setComparisonCabinIds] = useState<string[]>([
    'aspen-panorama-140', 
    'nordic-valhalla-95', 
    'highland-hideaway-60'
  ]);

  // Detail modals
  const [inspectedCabin, setInspectedCabin] = useState<CabinModel | null>(null);
  const [inspectedPlot, setInspectedPlot] = useState<LandPlot | null>(null);

  // Configurator pre-selections
  const [configuredCabinId, setConfiguredCabinId] = useState<string>('aspen-panorama-140');
  const [configuredPlotId, setConfiguredPlotId] = useState<string | null>(null);

  // Handlers
  const handleToggleCompareCabin = (cabinId: string) => {
    setComparisonCabinIds(prev => {
      if (prev.includes(cabinId)) {
        return prev.filter(id => id !== cabinId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), cabinId];
      }
      return [...prev, cabinId];
    });
  };

  const handleOpenComparisonForCabin = (cabinId: string) => {
    if (!comparisonCabinIds.includes(cabinId)) {
      if (comparisonCabinIds.length >= 3) {
        setComparisonCabinIds([...comparisonCabinIds.slice(1), cabinId]);
      } else {
        setComparisonCabinIds([...comparisonCabinIds, cabinId]);
      }
    }
    setIsComparisonOpen(true);
  };

  const handleBrowseListings = () => {
    setActiveTab('cabins');
    const elem = document.getElementById('cabin-listings');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreLand = () => {
    setActiveTab('land');
    const elem = document.getElementById('surrounding-land');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewProjects = () => {
    setActiveTab('projects');
    const elem = document.getElementById('completed-projects');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConfigurator = (cabinId?: string) => {

    if (cabinId) setConfiguredCabinId(cabinId);
    setActiveTab('configurator');
    const elem = document.getElementById('configurator');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePairPlotWithCabin = (plot: LandPlot, cabinId?: string) => {
    setConfiguredPlotId(plot.id);
    if (cabinId) {
      setConfiguredCabinId(cabinId);
    } else if (plot.suitableCabinIds.length > 0) {
      setConfiguredCabinId(plot.suitableCabinIds[0]);
    }
    setActiveTab('configurator');
    const elem = document.getElementById('configurator');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (topic?: string) => {
    setBookingTopic(topic || 'Site Survey & Land Consultation');
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white flex flex-col">
      {/* Top Banner Notice */}
      <div className="bg-amber-950/70 border-b border-amber-800/40 px-4 py-2 text-center text-xs text-amber-200/90 font-medium flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Autumn 2026 Turnkey Build Slots Open: Fast 8-Week Erection Turnaround</span>
        <button
          onClick={() => handleOpenBooking('Autumn 2026 Build Slot Reservation')}
          className="ml-2 underline text-amber-400 font-bold hover:text-white cursor-pointer"
        >
          Reserve Slot →
        </button>
      </div>

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoritesCount={0}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenRoi={() => setIsRoiOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
        comparedCount={comparisonCabinIds.length}
      />

      {/* Hero Section */}
      <HeroSection
        onBrowseListings={handleBrowseListings}
        onExploreLand={handleExploreLand}
        onViewProjects={handleViewProjects}
        onOpenConfigurator={(cabinId) => handleOpenConfigurator(cabinId)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenBooking={(topic) => handleOpenBooking(topic)}
      />


      {/* Main Content Area based on tabs or all-in-one scroll */}
      <main className="flex-1">
        {/* Cabins Explorer */}
        <CabinExplorer
          onSelectCabin={(cabin) => setInspectedCabin(cabin)}
          onConfigureCabin={(cabinId) => handleOpenConfigurator(cabinId)}
          selectedCompareCabinIds={comparisonCabinIds}
          onToggleCompareCabin={handleToggleCompareCabin}
          onOpenComparisonModal={() => setIsComparisonOpen(true)}
        />

        {/* Energy Efficiency & UK Climate Performance Stats */}
        <CabinPerformanceStats
          onConfigureCabin={(cabinId) => handleOpenConfigurator(cabinId)}
          onBookConsultation={(topic) => handleOpenBooking(topic)}
        />

        {/* Real-World Completed Projects Gallery (Masonry Grid Showcase) */}
        <CompletedProjectsGallery
          onConfigureCabin={(cabinId) => handleOpenConfigurator(cabinId)}
          onBookConsultation={(topic) => handleOpenBooking(topic)}
          onCompareCabin={(cabinId) => handleOpenComparisonForCabin(cabinId)}
        />

        {/* Real-Time Regional Weather & UK Build Feasibility Monitor */}
        <RegionalWeatherMonitor
          onBookSiteSurvey={(regionName) => handleOpenBooking(`Site Feasibility Survey - ${regionName || 'UK Region'}`)}
          onExploreLandInRegion={() => handleExploreLand()}
        />


        {/* Surrounding Real Estate Land Plots */}
        <LandPlotsExplorer
          onSelectPlot={(plot) => setInspectedPlot(plot)}
          onPairWithCabin={(plot) => handlePairPlotWithCabin(plot)}
        />

        {/* Interactive Bespoke Configurator */}
        <CabinConfigurator
          initialCabinId={configuredCabinId}
          initialPlotId={configuredPlotId}
          onBookConsultation={(summary) => handleOpenBooking(summary)}
        />

        {/* Self-Build & Turnkey Mortgage Financing Calculator */}
        <CabinFinancingCalculator
          onConfigureCabin={(cabinId) => handleOpenConfigurator(cabinId)}
          onBookConsultation={(topic) => handleOpenBooking(topic)}
        />

        {/* Turnkey Services Workflow */}
        <TurnkeyServicesSection
          onBookConsultation={(serviceTitle) => handleOpenBooking(serviceTitle)}
        />

        {/* British Columbia, Canada Restoration Partner */}
        <BCCanadaSection
          onBookConsultation={(topic) => handleOpenBooking(topic)}
        />

        {/* FAQ Accordion Section */}
        <FAQAccordion
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          onOpenBooking={(topic) => handleOpenBooking(topic)}
        />

        {/* Bottom CTA Banner */}
        <section className="py-16 bg-gradient-to-b from-stone-900 to-stone-950 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Ready to Begin Your Build?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
              Start Your Log Cabin Journey Today
            </h2>
            <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Whether you need land sourced in the Highlands, architectural drawings submitted to council, or a turnkey glulam cabin erected on your private plot.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenBooking('General Inquiry')}
                className="px-8 py-3.5 rounded-xl font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl transition-all cursor-pointer text-sm"
              >
                Book a Free Site Survey
              </button>
              <button
                onClick={() => setIsAdvisorOpen(true)}
                className="px-6 py-3.5 rounded-xl font-semibold text-amber-300 bg-amber-950/40 border border-amber-600/40 hover:bg-amber-900/50 transition-all cursor-pointer text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Land Advisor</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          const targetMap: Record<string, string> = {
            cabins: 'cabin-listings',
            projects: 'completed-projects',
            land: 'surrounding-land',
            configurator: 'configurator',
            financing: 'financing-calculator',
            services: 'turnkey-services',
          };
          const targetId = targetMap[tab];
          if (targetId) {
            const elem = document.getElementById(targetId);
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />


      {/* Modals */}
      <AiLandAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onSelectCabinRecommendation={(cabinId) => {
          setIsAdvisorOpen(false);
          handleOpenConfigurator(cabinId);
        }}
      />

      <RoiCalculatorModal
        isOpen={isRoiOpen}
        onClose={() => setIsRoiOpen(false)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTopic={bookingTopic}
      />

      <CabinDetailModal
        cabin={inspectedCabin}
        onClose={() => setInspectedCabin(null)}
        onConfigure={(cabinId) => handleOpenConfigurator(cabinId)}
        onBookSurvey={(cabinName) => handleOpenBooking(`Site Survey for ${cabinName}`)}
        onCompareCabin={(cabinId) => handleOpenComparisonForCabin(cabinId)}
      />

      <CabinComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        selectedCabinIds={comparisonCabinIds}
        onUpdateSelectedCabinIds={(ids) => setComparisonCabinIds(ids)}
        onConfigureCabin={(cabinId) => handleOpenConfigurator(cabinId)}
        onBookSurvey={(cabinName) => handleOpenBooking(`Site Survey for ${cabinName}`)}
      />

      <LandDetailModal
        plot={inspectedPlot}
        onClose={() => setInspectedPlot(null)}
        onPairCabin={(plot) => handlePairPlotWithCabin(plot)}
        onBookViewing={(title) => handleOpenBooking(title)}
      />

      <BCPartnerFloater partner={SUPERIOR_LOG_RESTORATIONS} />
    </div>
  );
}

