import React, { useState, useMemo } from 'react';
import { CABIN_MODELS, SURROUNDING_LAND_PLOTS } from '../data/mockData';
import { CabinModel, LandPlot } from '../types';
import {
  MaterialLibrary,
  TIMBER_OPTIONS,
  ROOFING_SLATE_OPTIONS,
  INSULATION_OPTIONS,
  TimberOption,
  RoofingSlateOption,
  InsulationOption,
} from './MaterialLibrary';
import {
  SlidersHorizontal,
  Check,
  Zap,
  Flame,
  Trees,
  Compass,
  Download,
  Phone,
  ShieldCheck,
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  Eye,
  CheckCircle2,
  Sparkle
} from 'lucide-react';

interface CabinConfiguratorProps {
  initialCabinId?: string;
  initialPlotId?: string | null;
  onBookConsultation: (configSummary: string) => void;
}

export const CabinConfigurator: React.FC<CabinConfiguratorProps> = ({
  initialCabinId = 'aspen-panorama-140',
  initialPlotId = null,
  onBookConsultation,
}) => {
  const [selectedCabinId, setSelectedCabinId] = useState<string>(initialCabinId);
  const [selectedPlotId, setSelectedPlotId] = useState<string | null>(initialPlotId);

  // Material Library State Selections
  const [selectedTimberId, setSelectedTimberId] = useState<string>('nordic-spruce-glulam');
  const [selectedRoofingId, setSelectedRoofingId] = useState<string>('standing-seam-anthracite');
  const [selectedInsulationId, setSelectedInsulationId] = useState<string>('steico-wood-fibre');

  // Options
  const [foundationType, setFoundationType] = useState<'ground-screws' | 'concrete-slab' | 'timber-stilts'>('ground-screws');
  const [heatingSystem, setHeatingSystem] = useState<'heat-pump-underfloor' | 'wood-stove' | 'hybrid-both'>('hybrid-both');
  const [addOffGridPackage, setAddOffGridPackage] = useState<boolean>(false);
  const [addSaunaModule, setAddSaunaModule] = useState<boolean>(true);
  const [addWraparoundDeck, setAddWraparoundDeck] = useState<boolean>(true);
  const [addTurnkeyInteriors, setAddTurnkeyInteriors] = useState<boolean>(true);

  // Active Cabin & Plot objects
  const currentCabin = useMemo(() => {
    return CABIN_MODELS.find((c) => c.id === selectedCabinId) || CABIN_MODELS[0];
  }, [selectedCabinId]);

  const currentPlot = useMemo(() => {
    return selectedPlotId ? SURROUNDING_LAND_PLOTS.find((p) => p.id === selectedPlotId) || null : null;
  }, [selectedPlotId]);

  // Active Material objects
  const selectedTimber = useMemo(() => {
    return TIMBER_OPTIONS.find((t) => t.id === selectedTimberId) || TIMBER_OPTIONS[0];
  }, [selectedTimberId]);

  const selectedRoofing = useMemo(() => {
    return ROOFING_SLATE_OPTIONS.find((r) => r.id === selectedRoofingId) || ROOFING_SLATE_OPTIONS[0];
  }, [selectedRoofingId]);

  const selectedInsulation = useMemo(() => {
    return INSULATION_OPTIONS.find((i) => i.id === selectedInsulationId) || INSULATION_OPTIONS[0];
  }, [selectedInsulationId]);

  // Price calculations
  const calculation = useMemo(() => {
    const baseCabinPrice = currentCabin.price;
    const landPrice = currentPlot ? currentPlot.price : 0;

    let foundationPrice = 7500;
    if (foundationType === 'concrete-slab') foundationPrice = 14500;
    if (foundationType === 'timber-stilts') foundationPrice = 9800;

    const timberPriceDelta = selectedTimber.priceDelta;
    const roofingPriceDelta = selectedRoofing.priceDelta;
    const insulationPriceDelta = selectedInsulation.priceDelta;

    let heatingPrice = 5200;
    if (heatingSystem === 'wood-stove') heatingPrice = 3800;
    if (heatingSystem === 'hybrid-both') heatingPrice = 7800;

    const offGridPrice = addOffGridPackage ? 19500 : 0;
    const saunaPrice = addSaunaModule ? 8500 : 0;
    const deckPrice = addWraparoundDeck ? Math.round(currentCabin.areaSqM * 65) : 0;
    const turnkeyInteriorPrice = addTurnkeyInteriors ? Math.round(currentCabin.areaSqM * 190) : 0;

    // Subtotal build costs
    const totalBuildAndExtras =
      baseCabinPrice +
      timberPriceDelta +
      roofingPriceDelta +
      insulationPriceDelta +
      foundationPrice +
      heatingPrice +
      offGridPrice +
      saunaPrice +
      deckPrice +
      turnkeyInteriorPrice;

    // Bundle discount if land is included (7% off cabin build)
    const bundleDiscount = currentPlot ? Math.round(baseCabinPrice * 0.07) : 0;

    const grandTotal = totalBuildAndExtras + landPrice - bundleDiscount;

    return {
      baseCabinPrice,
      timberPriceDelta,
      roofingPriceDelta,
      insulationPriceDelta,
      landPrice,
      foundationPrice,
      heatingPrice,
      offGridPrice,
      saunaPrice,
      deckPrice,
      turnkeyInteriorPrice,
      totalBuildAndExtras,
      bundleDiscount,
      grandTotal,
      estimatedMonthlyFinance: Math.round((grandTotal * 0.8 * 0.065) / 12),
    };
  }, [
    currentCabin,
    currentPlot,
    selectedTimber,
    selectedRoofing,
    selectedInsulation,
    foundationType,
    heatingSystem,
    addOffGridPackage,
    addSaunaModule,
    addWraparoundDeck,
    addTurnkeyInteriors,
  ]);

  const handleDownloadSpec = () => {
    const specText = `
LOGCABINS.LTD - CUSTOM BESPOKE SPECIFICATION & QUOTE
Generated: ${new Date().toLocaleDateString()}

========================================
1. CABIN MODEL
Model: ${currentCabin.name} (${currentCabin.category.toUpperCase()})
Footprint: ${currentCabin.areaSqM} m² (${currentCabin.bedrooms} Beds / ${currentCabin.bathrooms} Baths)
Wall Profile: ${currentCabin.wallThicknessMm}mm Precision Interlock
Base Kit Price: £${currentCabin.price.toLocaleString()}

========================================
2. MATERIAL LIBRARY SPECIFICATION
Timber Species: ${selectedTimber.name} (${selectedTimber.species}, ${selectedTimber.densityKgM3} kg/m³)
  - Price Adjustment: +£${selectedTimber.priceDelta.toLocaleString()}
Roofing / Slate: ${selectedRoofing.name} (${selectedRoofing.type}, Rating: ${selectedRoofing.snowLoadRating})
  - Price Adjustment: +£${selectedRoofing.priceDelta.toLocaleString()}
Bio-Insulation: ${selectedInsulation.name} (Target: ${selectedInsulation.uValueTarget})
  - Price Adjustment: +£${selectedInsulation.priceDelta.toLocaleString()}

========================================
3. LAND & SITE ACQUISITION
Selected Plot: ${currentPlot ? `${currentPlot.title} (${currentPlot.acreage} Acres, ${currentPlot.location})` : 'Client Owned Plot / Site'}
Land Cost: £${calculation.landPrice.toLocaleString()}
Bundle Land + Cabin Savings: -£${calculation.bundleDiscount.toLocaleString()}

========================================
4. ENGINEERING & FOUNDATION
Foundation: ${foundationType.toUpperCase()} (£${calculation.foundationPrice.toLocaleString()})
Heating & Energy: ${heatingSystem.toUpperCase()} (£${calculation.heatingPrice.toLocaleString()})

========================================
5. UPGRADES & TURNKEY OPTIONS
Off-Grid Power/Water Package: ${addOffGridPackage ? 'YES (£19,500)' : 'NO'}
Cedar Sauna Module: ${addSaunaModule ? 'YES (£8,500)' : 'NO'}
Wraparound Cedar Decking: ${addWraparoundDeck ? `YES (£${calculation.deckPrice.toLocaleString()})` : 'NO'}
Full Turnkey Luxury Interior Fitout: ${addTurnkeyInteriors ? `YES (£${calculation.turnkeyInteriorPrice.toLocaleString()})` : 'NO'}

========================================
TOTAL TURNKEY PROJECT ESTIMATE: £${calculation.grandTotal.toLocaleString()}
Ask your installer about warranty options available for your build.
Lead Time: ~${currentCabin.leadTimeWeeks} Weeks to Site Delivery
    `.trim();

    const blob = new Blob([specText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LogCabins_Spec_${currentCabin.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="configurator" className="py-16 bg-stone-950 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Interactive Bespoke Build & Price Estimator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight">
            Configure Your Log Cabin, Materials & Land Package
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2">
            Explore architectural timber species, genuine roofing slates, ecological bio-insulation grades, foundation systems, and surrounding land plots in real time.
          </p>
        </div>

        {/* 2-Column Configurator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center Configuration Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Select Cabin Model */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
                  Select Base Cabin Architectural Model
                </h3>
                <span className="text-xs text-amber-400 font-mono font-medium">
                  {currentCabin.bedrooms} Bed / {currentCabin.areaSqM} m²
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CABIN_MODELS.map((cabin) => {
                  const isSelected = cabin.id === selectedCabinId;
                  return (
                    <button
                      key={cabin.id}
                      onClick={() => setSelectedCabinId(cabin.id)}
                      className={`p-3 rounded-xl text-left transition-all border ${
                        isSelected
                          ? 'bg-amber-950/60 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                          : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                      }`}
                    >
                      <div className="font-semibold text-xs text-stone-100 line-clamp-1">{cabin.name}</div>
                      <div className="text-[11px] text-stone-400 mt-0.5">{cabin.areaSqM} m² • {cabin.bedrooms} Bed</div>
                      <div className="text-xs font-mono font-bold text-amber-400 mt-2">
                        £{cabin.price.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Material Library (Timber, Roofing Slate, Insulation) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-sans font-bold shrink-0">2</span>
                <span className="font-serif text-lg font-bold text-stone-100">Bespoke Material Library & Architectural Finishes</span>
              </div>
              <MaterialLibrary
                selectedTimberId={selectedTimberId}
                selectedRoofingId={selectedRoofingId}
                selectedInsulationId={selectedInsulationId}
                onSelectTimber={setSelectedTimberId}
                onSelectRoofing={setSelectedRoofingId}
                onSelectInsulation={setSelectedInsulationId}
              />
            </div>

            {/* Step 3: Surrounding Land Plot Pairing (Optional Bundle) */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
                    Surrounding Land Plot (Bundle & Save 7%)
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Select a build-ready plot or choose "I already have land / building site".
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedPlotId(null)}
                  className={`w-full p-3 rounded-xl text-left text-xs font-medium border flex items-center justify-between transition-all ${
                    selectedPlotId === null
                      ? 'bg-amber-950/50 border-amber-500 text-white'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPlotId === null ? 'border-amber-400 bg-amber-500' : 'border-stone-600'}`}>
                      {selectedPlotId === null && <Check className="w-3 h-3 text-stone-950" />}
                    </div>
                    <span>I already own land or am sourcing my own plot</span>
                  </div>
                  <span className="text-stone-500">No Land Added</span>
                </button>

                {SURROUNDING_LAND_PLOTS.map((plot) => {
                  const isSelected = selectedPlotId === plot.id;
                  return (
                    <button
                      key={plot.id}
                      onClick={() => setSelectedPlotId(plot.id)}
                      className={`w-full p-3 rounded-xl text-left text-xs font-medium border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-950/50 border-amber-500 text-white'
                          : 'bg-stone-950 border-stone-800 text-stone-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-amber-400 bg-amber-500' : 'border-stone-600'}`}>
                          {isSelected && <Check className="w-3 h-3 text-stone-950" />}
                        </div>
                        <div>
                          <span className="font-semibold text-stone-100">{plot.title}</span>
                          <span className="text-[11px] text-stone-400 ml-2">({plot.acreage} Acres, {plot.location})</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-amber-400 font-bold">£{plot.price.toLocaleString()}</span>
                        <span className="block text-[10px] text-emerald-400 font-semibold">Includes 7% Bundle Rebate</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Foundation & Substructure */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
              <h3 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-sans font-bold">4</span>
                Foundation & Site Engineering
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'ground-screws',
                    title: 'Eco Ground Screws',
                    sub: 'Zero concrete, rapid 2-day install, minimal ecology impact',
                    price: '£7,500'
                  },
                  {
                    id: 'concrete-slab',
                    title: 'Insulated Concrete Raft',
                    sub: 'Max structural mass, integrated underfloor heating slab',
                    price: '£14,500'
                  },
                  {
                    id: 'timber-stilts',
                    title: 'Raised Timber Stilts',
                    sub: 'Ideal for steep slopes, wetlands & dramatic hillside vistas',
                    price: '£9,800'
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFoundationType(item.id as any)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      foundationType === item.id
                        ? 'bg-amber-950/60 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                        : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="font-semibold text-xs text-stone-100">{item.title}</div>
                    <div className="text-[11px] text-stone-400 mt-1 leading-tight">{item.sub}</div>
                    <div className="mt-2 text-xs font-mono font-bold text-amber-400">{item.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Turnkey Extras & Off-Grid Tech */}
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
              <h3 className="font-serif text-lg font-bold text-stone-100 flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-sans font-bold">5</span>
                Turnkey Extras & Off-Grid Technologies
              </h3>

              <div className="space-y-3">
                {/* Off grid package */}
                <div
                  onClick={() => setAddOffGridPackage(!addOffGridPackage)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    addOffGridPackage
                      ? 'bg-amber-950/50 border-amber-500 text-white'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${addOffGridPackage ? 'border-amber-400 bg-amber-500 text-stone-950' : 'border-stone-700'}`}>
                      {addOffGridPackage && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-100 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>Off-Grid Wilderness Package (Solar PV + Battery + Borehole UV Water)</span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        10kW Victron solar + 20kWh lithium battery bank + deep borehole water filtration & Bio-septic digester.
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 shrink-0 ml-4">+£19,500</span>
                </div>

                {/* Sauna module */}
                <div
                  onClick={() => setAddSaunaModule(!addSaunaModule)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    addSaunaModule
                      ? 'bg-amber-950/50 border-amber-500 text-white'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${addSaunaModule ? 'border-amber-400 bg-amber-500 text-stone-950' : 'border-stone-700'}`}>
                      {addSaunaModule && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-100 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-400" />
                        <span>Integrated Finnish Cedar Sauna Module</span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        Thermo-cedar benching, Harvia electric or wood-burning heater, tempered bronze glass door.
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 shrink-0 ml-4">+£8,500</span>
                </div>

                {/* Wrap around deck */}
                <div
                  onClick={() => setAddWraparoundDeck(!addWraparoundDeck)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    addWraparoundDeck
                      ? 'bg-amber-950/50 border-amber-500 text-white'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${addWraparoundDeck ? 'border-amber-400 bg-amber-500 text-stone-950' : 'border-stone-700'}`}>
                      {addWraparoundDeck && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-100 flex items-center gap-2">
                        <Trees className="w-4 h-4 text-amber-400" />
                        <span>Wraparound Siberian Larch Decking & Pergola</span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        Deep outdoor terrace framing panoramic views with integrated LED step illumination.
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 shrink-0 ml-4">+£{calculation.deckPrice.toLocaleString()}</span>
                </div>

                {/* Turnkey interior fitout */}
                <div
                  onClick={() => setAddTurnkeyInteriors(!addTurnkeyInteriors)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    addTurnkeyInteriors
                      ? 'bg-amber-950/50 border-amber-500 text-white'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700 text-stone-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${addTurnkeyInteriors ? 'border-amber-400 bg-amber-500 text-stone-950' : 'border-stone-700'}`}>
                      {addTurnkeyInteriors && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-100 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Full Turnkey Luxury Interior Fitout & Kitchen</span>
                      </div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        Handcrafted solid oak & quartz kitchen, Bosch appliances, luxury wetrooms, underfloor heating.
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 shrink-0 ml-4">+£{calculation.turnkeyInteriorPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Live Summary & Visual Material Card (5 Cols sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl p-6 overflow-hidden relative">
              {/* Top accent glow */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />

              {/* Cabin preview banner with Live Material Overlay */}
              <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden group">
                <img
                  src={currentCabin.image}
                  alt={currentCabin.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                
                {/* Live Swatch Badge Overlays */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-950/85 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono font-bold text-amber-400 shadow-lg">
                    LIVE CONFIGURATION
                  </span>
                  <span className="px-2 py-1 rounded bg-stone-950/90 text-stone-200 text-[10px] font-mono border border-stone-700">
                    {currentCabin.areaSqM} m² • {currentCabin.energyRating}
                  </span>
                </div>

                <div className="absolute bottom-3 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Configured Build</span>
                    <h4 className="font-serif text-xl font-bold text-white">{currentCabin.name}</h4>
                  </div>
                </div>
              </div>

              {/* Visual Material Swatches Preview Box */}
              <div className="p-4 mb-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-stone-800/80 pb-2">
                  <span className="text-stone-400 font-mono uppercase text-[10px] flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-amber-400" />
                    <span>Active Material Swatches</span>
                  </span>
                  <span className="text-amber-400 font-mono text-[10px] font-semibold">Live Visual Specs</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Timber swatch */}
                  <div className="p-2 rounded-xl bg-stone-900 border border-amber-500/40 flex flex-col items-center text-center">
                    <div className="w-full h-10 rounded-lg overflow-hidden mb-1.5 border border-stone-700">
                      <img src={selectedTimber.textureSampleUrl} alt={selectedTimber.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-stone-200 line-clamp-1">{selectedTimber.name.split('(')[0]}</span>
                    <span className="text-[9px] text-amber-400 font-mono mt-0.5">{selectedTimber.densityKgM3} kg/m³</span>
                  </div>

                  {/* Roofing swatch */}
                  <div className="p-2 rounded-xl bg-stone-900 border border-blue-500/40 flex flex-col items-center text-center">
                    <div className="w-full h-10 rounded-lg overflow-hidden mb-1.5 border border-stone-700">
                      <img src={selectedRoofing.textureSampleUrl} alt={selectedRoofing.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-stone-200 line-clamp-1">{selectedRoofing.name.split('(')[0]}</span>
                    <span className="text-[9px] text-blue-400 font-mono mt-0.5">{selectedRoofing.lifespanYears.split(' ')[0]}</span>
                  </div>

                  {/* Insulation swatch */}
                  <div className="p-2 rounded-xl bg-stone-900 border border-emerald-500/40 flex flex-col items-center text-center">
                    <div className="w-full h-10 rounded-lg overflow-hidden mb-1.5 border border-stone-700">
                      <img src={selectedInsulation.textureSampleUrl} alt={selectedInsulation.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-stone-200 line-clamp-1">{selectedInsulation.name.split('(')[0]}</span>
                    <span className="text-[9px] text-emerald-400 font-mono mt-0.5">{selectedInsulation.uValueTarget.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown Items */}
              <div className="space-y-2.5 text-xs text-stone-300 border-b border-stone-800 pb-5">
                <div className="flex justify-between">
                  <span className="text-stone-400">Base Cabin Architectural Kit:</span>
                  <span className="font-mono text-stone-100">£{calculation.baseCabinPrice.toLocaleString()}</span>
                </div>

                {/* Timber Upgrade */}
                {selectedTimber.priceDelta > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Timber ({selectedTimber.name.slice(0, 20)}...):</span>
                    <span className="font-mono font-semibold">+£{selectedTimber.priceDelta.toLocaleString()}</span>
                  </div>
                )}

                {/* Roofing Upgrade */}
                {selectedRoofing.priceDelta > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Roofing ({selectedRoofing.name.slice(0, 20)}...):</span>
                    <span className="font-mono font-semibold">+£{selectedRoofing.priceDelta.toLocaleString()}</span>
                  </div>
                )}

                {/* Insulation Upgrade */}
                {selectedInsulation.priceDelta > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Insulation ({selectedInsulation.name.slice(0, 20)}...):</span>
                    <span className="font-mono font-semibold">+£{selectedInsulation.priceDelta.toLocaleString()}</span>
                  </div>
                )}

                {currentPlot && (
                  <div className="flex justify-between text-amber-300">
                    <span>Land ({currentPlot.title.slice(0, 20)}...):</span>
                    <span className="font-mono font-semibold">£{calculation.landPrice.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-stone-400">Foundation ({foundationType}):</span>
                  <span className="font-mono text-stone-100">£{calculation.foundationPrice.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-400">Heating & HVAC:</span>
                  <span className="font-mono text-stone-100">£{calculation.heatingPrice.toLocaleString()}</span>
                </div>

                {addOffGridPackage && (
                  <div className="flex justify-between text-amber-400">
                    <span>Off-Grid Solar & Borehole:</span>
                    <span className="font-mono">£{calculation.offGridPrice.toLocaleString()}</span>
                  </div>
                )}

                {addSaunaModule && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Cedar Sauna Module:</span>
                    <span className="font-mono text-stone-100">£{calculation.saunaPrice.toLocaleString()}</span>
                  </div>
                )}

                {addWraparoundDeck && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Wraparound Siberian Larch Deck:</span>
                    <span className="font-mono text-stone-100">£{calculation.deckPrice.toLocaleString()}</span>
                  </div>
                )}

                {addTurnkeyInteriors && (
                  <div className="flex justify-between">
                    <span className="text-stone-400">Turnkey Luxury Interior Fitout:</span>
                    <span className="font-mono text-stone-100">£{calculation.turnkeyInteriorPrice.toLocaleString()}</span>
                  </div>
                )}

                {calculation.bundleDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold pt-1 border-t border-stone-800/80">
                    <span>Land + Cabin Bundle Rebate (7%):</span>
                    <span className="font-mono">-£{calculation.bundleDiscount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Total Price Display */}
              <div className="pt-4 pb-2">
                <div className="text-xs uppercase text-stone-400 font-medium">Estimated Turnkey Investment</div>
                <div className="text-3xl font-serif font-bold text-amber-400 font-mono mt-1">
                  £{calculation.grandTotal.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-400 mt-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-stone-500" />
                  <span>Estimated finance from <strong>£{calculation.estimatedMonthlyFinance.toLocaleString()}/mo</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4">
                <button
                  id="config-book-survey-btn"
                  onClick={() =>
                    onBookConsultation(
                      `Configured ${currentCabin.name} with ${selectedTimber.name}, ${selectedRoofing.name}, ${selectedInsulation.name} (£${calculation.grandTotal.toLocaleString()}) ${
                        currentPlot ? `with ${currentPlot.title}` : ''
                      }`
                    )
                  }
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Book Site Survey & Lock Price</span>
                </button>

                <button
                  onClick={handleDownloadSpec}
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-stone-300 bg-stone-950 hover:bg-stone-850 hover:text-white border border-stone-800 text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Detailed Spec Sheet (TXT)</span>
                </button>
              </div>

              {/* Structural Assurance */}
              <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-center gap-2.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  This is an estimate based on your configuration. Ask your installer about warranty options and timber compliance documentation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

