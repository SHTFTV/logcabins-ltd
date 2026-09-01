import React, { useState, useMemo } from 'react';
import { CabinModel } from '../types';
import { CABIN_MODELS } from '../data/mockData';
import { 
  X, 
  Plus, 
  Check, 
  Minus, 
  Sparkles, 
  SlidersHorizontal, 
  Phone, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  ShieldCheck, 
  Layers, 
  TreePine, 
  DollarSign, 
  Maximize2, 
  Bed, 
  Bath, 
  Clock, 
  FileText, 
  HelpCircle,
  TrendingUp,
  Sliders,
  Scale
} from 'lucide-react';

interface CabinComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCabinIds: string[];
  onUpdateSelectedCabinIds?: (ids: string[]) => void;
  onConfigureCabin: (cabinId: string) => void;
  onBookSurvey: (cabinName: string) => void;
}

// Extended specs metadata helper for realistic architectural comparison
const getExtendedCabinSpecs = (cabin: CabinModel) => {
  const isLuxury = cabin.category === 'luxury';
  const isGarden = cabin.category === 'garden';
  const isCommercial = cabin.category === 'commercial';

  // Calculations
  const pricePerSqM = Math.round(cabin.price / cabin.areaSqM);
  const sqFt = Math.round(cabin.areaSqM * 10.7639);
  
  // Thermal U-values based on wall thickness
  let wallUValue = '0.18 W/m²K';
  let upgradedArcticUValue = '0.12 W/m²K';
  let acousticRating = '44 dB';
  let thermalPhaseShift = '10.5 Hours';
  let estimatedAnnualHeating = '£180 – £240/yr';
  let carbonOffsetKg = Math.round(cabin.areaSqM * 280);
  let erectionDays = '4 – 6 Days';
  let planningType = 'Full Planning Permission';
  let holidayNightlyRate = '£160 – £220/nt';

  if (cabin.wallThicknessMm >= 240) {
    wallUValue = '0.10 W/m²K';
    upgradedArcticUValue = '0.08 W/m²K';
    acousticRating = '52 dB';
    thermalPhaseShift = '14.8 Hours';
    estimatedAnnualHeating = '£110 – £160/yr';
    erectionDays = '12 – 16 Days';
    holidayNightlyRate = '£380 – £580/nt';
  } else if (cabin.wallThicknessMm >= 200) {
    wallUValue = '0.12 W/m²K';
    upgradedArcticUValue = '0.09 W/m²K';
    acousticRating = '49 dB';
    thermalPhaseShift = '13.2 Hours';
    estimatedAnnualHeating = '£140 – £190/yr';
    erectionDays = '8 – 12 Days';
    holidayNightlyRate = '£290 – £420/nt';
  } else if (cabin.wallThicknessMm <= 70) {
    wallUValue = '0.22 W/m²K';
    upgradedArcticUValue = '0.15 W/m²K';
    acousticRating = '40 dB';
    thermalPhaseShift = '8.0 Hours';
    estimatedAnnualHeating = '£90 – £140/yr';
    erectionDays = '2 – 3 Days';
    planningType = 'Permitted Development (No Planning Required)';
    holidayNightlyRate = '£95 – £145/nt';
  }

  const featuresMap = {
    cathedralCeilings: cabin.features.some(f => f.toLowerCase().includes('cathedral') || f.toLowerCase().includes('vaulted') || isLuxury),
    integratedSauna: cabin.features.some(f => f.toLowerCase().includes('sauna') || cabin.id.includes('aspen') || cabin.id.includes('glacier')),
    tripleGlazing: cabin.features.some(f => f.toLowerCase().includes('triple') || cabin.energyRating.includes('A')),
    wrapAroundDeck: cabin.features.some(f => f.toLowerCase().includes('deck') || f.toLowerCase().includes('veranda') || isLuxury),
    hiddenConduits: cabin.features.some(f => f.toLowerCase().includes('conduit') || f.toLowerCase().includes('wiring') || cabin.wallThicknessMm >= 90),
    offGridReady: true,
  };

  return {
    pricePerSqM,
    sqFt,
    wallUValue,
    upgradedArcticUValue,
    acousticRating,
    thermalPhaseShift,
    estimatedAnnualHeating,
    carbonOffsetKg,
    erectionDays,
    planningType,
    holidayNightlyRate,
    featuresMap
  };
};

export const CabinComparisonModal: React.FC<CabinComparisonModalProps> = ({
  isOpen,
  onClose,
  selectedCabinIds,
  onUpdateSelectedCabinIds,
  onConfigureCabin,
  onBookSurvey,
}) => {
  // Local state for compared cabins (up to 3)
  const [comparedIds, setComparedIds] = useState<string[]>(() => {
    if (selectedCabinIds && selectedCabinIds.length > 0) {
      return selectedCabinIds.slice(0, 3);
    }
    // Default 3 popular cabins
    return ['aspen-panorama-140', 'nordic-valhalla-95', 'highland-hideaway-60'];
  });

  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(false);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [isAddingSlot, setIsAddingSlot] = useState<boolean>(false);

  // Sync if parent updates
  React.useEffect(() => {
    if (selectedCabinIds && selectedCabinIds.length > 0) {
      setComparedIds(selectedCabinIds.slice(0, 3));
    }
  }, [selectedCabinIds]);

  const updateComparedIds = (newIds: string[]) => {
    setComparedIds(newIds);
    if (onUpdateSelectedCabinIds) {
      onUpdateSelectedCabinIds(newIds);
    }
  };

  const handleAddCabin = (cabinId: string) => {
    if (comparedIds.includes(cabinId)) return;
    if (comparedIds.length >= 3) {
      // replace last
      const next = [...comparedIds.slice(0, 2), cabinId];
      updateComparedIds(next);
    } else {
      updateComparedIds([...comparedIds, cabinId]);
    }
    setIsAddingSlot(false);
  };

  const handleRemoveCabin = (cabinId: string) => {
    if (comparedIds.length <= 1) return; // Keep at least 1
    updateComparedIds(comparedIds.filter(id => id !== cabinId));
  };

  const handleReplaceCabin = (index: number, newCabinId: string) => {
    const next = [...comparedIds];
    next[index] = newCabinId;
    updateComparedIds(next);
  };

  // Selected cabin objects
  const comparedCabins = useMemo(() => {
    return comparedIds
      .map(id => CABIN_MODELS.find(c => c.id === id))
      .filter((c): c is CabinModel => Boolean(c));
  }, [comparedIds]);

  // Unselected cabins for the "+ Add Model" dropdown/drawer
  const availableCabinsToAdd = useMemo(() => {
    return CABIN_MODELS.filter(c => !comparedIds.includes(c.id));
  }, [comparedIds]);

  // Presets
  const applyPreset = (presetIds: string[]) => {
    updateComparedIds(presetIds);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-stone-900/90 border-b border-stone-800 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-2">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Side-by-Side Model Benchmarking</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                Log Cabin Model Comparison
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl">
                Compare up to 3 architectural glulam models across turnkey pricing, thermal envelope U-values, living dimensions, and PassivHaus insulation standards.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-stone-950/80 border border-stone-700 text-stone-300 hover:text-white transition-colors shrink-0 cursor-pointer"
              title="Close comparison modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Presets & Control Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800/80">
            {/* Quick Presets */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-stone-400 font-medium mr-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick Benchmarks:</span>
              </span>
              <button
                onClick={() => applyPreset(['aspen-panorama-140', 'glacier-estate-220', 'nordic-valhalla-95'])}
                className="px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                Luxury & Flagship
              </button>
              <button
                onClick={() => applyPreset(['nordic-valhalla-95', 'highland-hideaway-60', 'nordic-cluster-resort-80'])}
                className="px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                Family 2–3 Bed
              </button>
              <button
                onClick={() => applyPreset(['timber-studio-pod-28', 'highland-hideaway-60', 'nordic-valhalla-95'])}
                className="px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                Garden to Residential
              </button>
            </div>

            {/* View options */}
            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={() => setHighlightDifferences(!highlightDifferences)}
                className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  highlightDifferences
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>Highlight Differences</span>
              </button>

              <div className="flex items-center bg-stone-950 rounded-lg border border-stone-800 p-0.5">
                <button
                  onClick={() => setUnitSystem('metric')}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    unitSystem === 'metric' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Metric (m²)
                </button>
                <button
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    unitSystem === 'imperial' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Imperial (sq ft)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Comparison Table Area */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-8 space-y-8">
          
          {/* Top Sticky Cabin Model Headers / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch min-w-[700px]">
            {/* Slot 0: Attribute Guide Column */}
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Model Selector ({comparedCabins.length}/3)
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-1">
                  Active Comparison
                </h3>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  Select, swap, or remove cabin models in any slot below to re-calculate comparative parameters in real-time.
                </p>
              </div>

              {comparedCabins.length < 3 && (
                <div className="mt-4 pt-4 border-t border-stone-800">
                  <button
                    onClick={() => setIsAddingSlot(!isAddingSlot)}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add 3rd Cabin Model</span>
                  </button>
                </div>
              )}
            </div>

            {/* Model Columns (Up to 3) */}
            {comparedCabins.map((cabin, idx) => {
              const specs = getExtendedCabinSpecs(cabin);
              return (
                <div
                  key={cabin.id}
                  className="relative p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between hover:border-stone-700 transition-colors shadow-lg"
                >
                  {/* Remove button */}
                  {comparedCabins.length > 1 && (
                    <button
                      onClick={() => handleRemoveCabin(cabin.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-stone-950/80 hover:bg-rose-950 border border-stone-700 hover:border-rose-700 text-stone-400 hover:text-rose-300 transition-colors cursor-pointer z-10"
                      title="Remove model from comparison"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div>
                    {/* Image & Category */}
                    <div className="relative h-36 rounded-xl overflow-hidden bg-stone-950 mb-3.5 border border-stone-800">
                      <img
                        src={cabin.image}
                        alt={cabin.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-[10px] font-bold uppercase tracking-wider">
                        {cabin.category}
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-stone-950/90 text-stone-200 text-[10px] border border-stone-700 font-mono">
                        {cabin.energyRating.split(' ')[0]}
                      </div>
                    </div>

                    {/* Model Switcher Dropdown */}
                    <div className="mb-2">
                      <select
                        aria-label={`Switch cabin in slot ${idx + 1}`}
                        value={cabin.id}
                        onChange={(e) => handleReplaceCabin(idx, e.target.value)}
                        className="w-full text-xs font-semibold bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        {CABIN_MODELS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name} (£{opt.price.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white line-clamp-1">
                      {cabin.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5">
                      {cabin.tagline}
                    </p>

                    {/* Turnkey Kit Price */}
                    <div className="mt-3 p-3 rounded-xl bg-stone-950 border border-stone-800">
                      <div className="text-[10px] uppercase text-stone-400 font-semibold">Turnkey Kit From</div>
                      <div className="text-xl font-bold font-mono text-amber-400">
                        £{cabin.price.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        ~£{specs.pricePerSqM}/m² • ~{cabin.leadTimeWeeks} Wks Lead Time
                      </div>
                    </div>
                  </div>

                  {/* Actions for this specific cabin */}
                  <div className="mt-4 pt-3 border-t border-stone-800 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onConfigureCabin(cabin.id);
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Configure & Price</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onBookSurvey(`Site Survey for ${cabin.name}`);
                      }}
                      className="w-full py-1.5 px-3 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3 h-3 text-amber-400" />
                      <span>Book Survey</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Empty Slot (if less than 3) */}
            {comparedCabins.length < 3 && isAddingSlot && (
              <div className="p-5 rounded-2xl bg-stone-900/40 border border-dashed border-stone-700 flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-amber-400">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-stone-200">Select Model for Slot {comparedCabins.length + 1}</h4>
                  <p className="text-xs text-stone-400 mt-1">Choose from our available catalogue</p>
                </div>
                <div className="w-full space-y-1 max-h-48 overflow-y-auto pr-1">
                  {availableCabinsToAdd.map((avail) => (
                    <button
                      key={avail.id}
                      onClick={() => handleAddCabin(avail.id)}
                      className="w-full p-2 rounded-lg bg-stone-950 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-600/50 text-left text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer"
                    >
                      <span className="font-medium text-stone-200 truncate">{avail.name}</span>
                      <span className="font-mono text-amber-400 text-[11px]">£{avail.price.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 1: Financial & Valuation Metrics */}
          <div className="space-y-3 min-w-[700px]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>1. Financial & Investment Metrics</span>
            </div>

            <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden divide-y divide-stone-800 text-xs">
              {/* Turnkey Base Price */}
              <div className={`grid grid-cols-1 md:grid-cols-4 p-4 items-center ${highlightDifferences ? 'bg-amber-950/10' : ''}`}>
                <div className="font-semibold text-stone-300">Turnkey Kit Base Price</div>
                {comparedCabins.map((c) => (
                  <div key={c.id} className="font-mono font-bold text-amber-400 text-sm">
                    £{c.price.toLocaleString()}
                  </div>
                ))}
              </div>

              {/* Price per Unit Area */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Rate per Floor Area</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="font-mono text-stone-200">
                      {unitSystem === 'metric' ? `£${specs.pricePerSqM} / m²` : `£${Math.round(c.price / specs.sqFt)} / sq ft`}
                    </div>
                  );
                })}
              </div>

              {/* Holiday Let Potential */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Nightly Rental Potential (UK Tourism)</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="font-medium text-emerald-400">
                      {specs.holidayNightlyRate}
                    </div>
                  );
                })}
              </div>

              {/* Factory Lead Time */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Milling & Factory Lead Time</div>
                {comparedCabins.map((c) => (
                  <div key={c.id} className="text-stone-300">
                    ~{c.leadTimeWeeks} Weeks
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: Dimensions & Layout Specifications */}
          <div className="space-y-3 min-w-[700px]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Maximize2 className="w-4 h-4 text-amber-400" />
              <span>2. Dimensions & Spatial Layout</span>
            </div>

            <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden divide-y divide-stone-800 text-xs">
              {/* Floor Area */}
              <div className={`grid grid-cols-1 md:grid-cols-4 p-4 items-center ${highlightDifferences ? 'bg-amber-950/10' : ''}`}>
                <div className="font-semibold text-stone-300">Total Usable Floor Area</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="font-bold text-white text-sm">
                      {unitSystem === 'metric' ? `${c.areaSqM} m²` : `${specs.sqFt} sq ft`}
                    </div>
                  );
                })}
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Bedrooms / Bathrooms</div>
                {comparedCabins.map((c) => (
                  <div key={c.id} className="text-stone-200">
                    {c.bedrooms} Bed • {c.bathrooms} {c.bathrooms === 1 ? 'Bath' : 'Baths'}
                  </div>
                ))}
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Footprint Dimensions (W x L)</div>
                {comparedCabins.map((c) => (
                  <div key={c.id} className="font-mono text-stone-300">
                    {c.dimensions}
                  </div>
                ))}
              </div>

              {/* Planning Category */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">UK Planning Status Guidance</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="text-stone-300">
                      {specs.planningType}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 3: Energy Rating & Environmental Performance */}
          <div className="space-y-3 min-w-[700px]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>3. Energy Rating & Environmental Standards</span>
            </div>

            <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden divide-y divide-stone-800 text-xs">
              {/* Energy Rating */}
              <div className={`grid grid-cols-1 md:grid-cols-4 p-4 items-center ${highlightDifferences ? 'bg-amber-950/10' : ''}`}>
                <div className="font-semibold text-stone-300">Energy Performance Certification (EPC)</div>
                {comparedCabins.map((c) => (
                  <div key={c.id}>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-950 border border-emerald-700/60 text-emerald-300 font-mono font-bold text-xs">
                      {c.energyRating}
                    </span>
                  </div>
                ))}
              </div>

              {/* Estimated Annual Heating Bill */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Annual Heat Pump Heating Cost (Est.)</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="font-mono text-emerald-400 font-semibold">
                      {specs.estimatedAnnualHeating}
                    </div>
                  );
                })}
              </div>

              {/* Carbon Sequestration */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Embodied Carbon Offset (Timber Mass)</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="text-stone-300">
                      ~{specs.carbonOffsetKg.toLocaleString()} kg CO₂e
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 4: Insulation & Thermal Envelope Specs */}
          <div className="space-y-3 min-w-[700px]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>4. Insulation Specs & Glulam Wall Profiles</span>
            </div>

            <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden divide-y divide-stone-800 text-xs">
              {/* Log Wall Thickness */}
              <div className={`grid grid-cols-1 md:grid-cols-4 p-4 items-center ${highlightDifferences ? 'bg-amber-950/10' : ''}`}>
                <div className="font-semibold text-stone-300">Structural Wall Thickness</div>
                {comparedCabins.map((c) => (
                  <div key={c.id} className="font-bold text-amber-400 text-sm">
                    {c.wallThicknessMm}mm Glulam Profile
                  </div>
                ))}
              </div>

              {/* Timber Type */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Timber Species & Certification</div>
                {comparedCabins.map((c) => (
                  <div key={c.id} className="text-stone-200">
                    {c.timberType}
                  </div>
                ))}
              </div>

              {/* Standard Wall U-Value */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Standard Wall U-Value (W/m²K)</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="font-mono text-stone-200">
                      {specs.wallUValue}
                    </div>
                  );
                })}
              </div>

              {/* Arctic Passive Upgraded U-Value */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Arctic Passive Upgraded U-Value</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="font-mono text-cyan-300 font-semibold">
                      {specs.upgradedArcticUValue}
                    </div>
                  );
                })}
              </div>

              {/* Acoustic Damping Rating */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Acoustic Soundproofing (Rw)</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="text-stone-300">
                      {specs.acousticRating}
                    </div>
                  );
                })}
              </div>

              {/* Thermal Phase Shift */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Summer Phase Shift Delay</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="text-stone-300">
                      {specs.thermalPhaseShift}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION 5: Architectural Features & Inclusions Matrix */}
          <div className="space-y-3 min-w-[700px]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <TreePine className="w-4 h-4 text-amber-400" />
              <span>5. Architectural Inclusions & Features</span>
            </div>

            <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden divide-y divide-stone-800 text-xs">
              {/* Cathedral Vaulted Ceilings */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-300 font-medium">Cathedral Vaulted Great Room</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="flex items-center gap-1.5">
                      {specs.featuresMap.cathedralCeilings ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <Check className="w-4 h-4" /> Included
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-stone-500">
                          <Minus className="w-4 h-4" /> Standard Flat / Truss
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Integrated Sauna */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-300 font-medium">Integral Scandinavian Cedar Sauna</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="flex items-center gap-1.5">
                      {specs.featuresMap.integratedSauna ? (
                        <span className="flex items-center gap-1 text-amber-400 font-semibold">
                          <Check className="w-4 h-4" /> Built-in
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-stone-400">
                          <Plus className="w-3.5 h-3.5 text-stone-500" /> Modular Add-on Available
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Triple Glazed Low-E Glass */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-300 font-medium">Triple-Glazed Argon Glass Units</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="flex items-center gap-1.5">
                      {specs.featuresMap.tripleGlazing ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <Check className="w-4 h-4" /> Standard Low-E
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-stone-400">
                          Double (Triple Upgradeable)
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pre-milled Hidden MEP Conduits */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-300 font-medium">Pre-milled Hidden Cable Channels</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="flex items-center gap-1.5">
                      {specs.featuresMap.hiddenConduits ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <Check className="w-4 h-4" /> Pre-machined in Core
                        </span>
                      ) : (
                        <span className="text-stone-400">Surface / Floor Trunking</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* On-Site Erection Duration */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 items-center">
                <div className="text-stone-400">Weather-Tight Shell Assembly Time</div>
                {comparedCabins.map((c) => {
                  const specs = getExtendedCabinSpecs(c);
                  return (
                    <div key={c.id} className="text-stone-200">
                      {specs.erectionDays}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer with CTA */}
        <div className="p-4 sm:p-6 bg-stone-900 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-stone-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Structural engineer calculations are provided for every model. Ask your installer about warranty options and Building Regulations compliance for your build.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onBookSurvey('Comparison Consultation');
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Discuss Comparison With Architect</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors shadow-lg cursor-pointer"
            >
              Done Comparing
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
