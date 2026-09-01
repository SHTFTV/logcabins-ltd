import React, { useState } from 'react';
import {
  Trees,
  Layers,
  ShieldCheck,
  Flame,
  Sparkles,
  Info,
  Check,
  Compass,
  Maximize2,
  Droplets,
  Thermometer,
  Zap
} from 'lucide-react';

export interface TimberOption {
  id: string;
  name: string;
  species: string;
  origin: string;
  densityKgM3: number;
  durabilityClass: string;
  thermalConductivity: string;
  textureSampleUrl: string;
  grainPattern: string;
  finishTones: string[];
  description: string;
  priceDelta: number; // £ added to base kit
  sustainability: string;
  recommendedFor: string;
}

export interface RoofingSlateOption {
  id: string;
  name: string;
  type: string;
  origin: string;
  lifespanYears: string;
  weightKgM2: number;
  textureSampleUrl: string;
  colorTone: string;
  description: string;
  priceDelta: number;
  acousticDampingDb: number;
  snowLoadRating: string;
}

export interface InsulationOption {
  id: string;
  name: string;
  material: string;
  uValueTarget: string; // e.g. "0.12 W/m²K (Passivhaus)"
  thicknessMm: number;
  vaporPermeability: string;
  textureSampleUrl: string;
  ecoRating: string;
  description: string;
  priceDelta: number;
  fireRating: string;
}

export const TIMBER_OPTIONS: TimberOption[] = [
  {
    id: 'nordic-spruce-glulam',
    name: 'Nordic Polar Spruce (Glulam)',
    species: 'Picea abies',
    origin: 'Northern Finland & Sweden (sustainably managed forestry)',
    densityKgM3: 470,
    durabilityClass: 'Class 3 / Engineered Stability',
    thermalConductivity: '0.11 W/mK',
    textureSampleUrl: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80',
    grainPattern: 'Tight, uniform annular rings with fine pale honey grain and minimal knots.',
    finishTones: ['Natural Scandinavian Clear', 'White Mist Glaze', 'Nordic Honey Oil'],
    description: 'Slow-grown near the Arctic Circle over 80+ years. High dimensional stability with kiln-dried 12% moisture content. The quintessential modern log cabin timber.',
    priceDelta: 0,
    sustainability: 'Sustainably sourced, low carbon footprint',
    recommendedFor: 'Contemporary residential homes, cathedral vaulted living rooms.',
  },
  {
    id: 'siberian-larch-glulam',
    name: 'Siberian Larch (High Resin Glulam)',
    species: 'Larix sibirica',
    origin: 'Cold-Climate Taiga (sustainably managed forestry)',
    densityKgM3: 590,
    durabilityClass: 'Class 2 / High Natural Resilience',
    thermalConductivity: '0.13 W/mK',
    textureSampleUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    grainPattern: 'Pronounced striking golden-amber grain with natural resin protection.',
    finishTones: ['Golden Amber Patina', 'Weathered Driftwood Grey', 'Teak Tone Oiled'],
    description: 'Exceptionally dense and naturally rot-resistant due to high resin content. Does not require chemical biocides. Naturally silvers gracefully if left unpigmented.',
    priceDelta: 4200,
    sustainability: '100% Sustainable Harvested, Zero Chemical Impregnation',
    recommendedFor: 'Exposed coastal plots, harsh Highland rainfall, and lakeside lodges.',
  },
  {
    id: 'finnish-pine-heartwood',
    name: 'Finnish Arctic Pine (Heartwood Select)',
    species: 'Pinus sylvestris',
    origin: 'Karelia / Lapland Forest Reserve',
    densityKgM3: 510,
    durabilityClass: 'Class 3 / High Natural Resistance',
    thermalConductivity: '0.12 W/mK',
    textureSampleUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    grainPattern: 'Warm reddish-gold heartwood with distinctive organic character knots.',
    finishTones: ['Smoked Oak Tint', 'Traditional Falun Red', 'Osmo UV Clear'],
    description: 'Rich in natural terpenes and heartwood tannins. Provides a warm, fragrant alpine aroma and classical heritage log aesthetic.',
    priceDelta: 2400,
    sustainability: 'Sustainably managed alpine forestry',
    recommendedFor: 'Heritage rustic retreats, bespoke hunting lodges, and woodland glamping.',
  },
  {
    id: 'thermo-aspen-spa',
    name: 'Thermo-Treated Aspen & Spruce (Carbonized)',
    species: 'Populus tremula & Picea abies',
    origin: 'Central Scandinavia (Thermal Modification)',
    densityKgM3: 420,
    durabilityClass: 'Class 1 / Maximum Durability',
    thermalConductivity: '0.09 W/mK',
    textureSampleUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    grainPattern: 'Deep carbonized cocoa-bronze tone with silky satin tactile surface.',
    finishTones: ['Thermal Dark Walnut', 'Ebony Carbon Glaze', 'Satin Wax'],
    description: 'Thermally modified at 215°C using only heat and steam. 0% resin, completely immune to fungal decay and wood-boring insects. Outstanding thermal insulation.',
    priceDelta: 6800,
    sustainability: '100% Chemical-Free Non-Toxic Thermal Treatment',
    recommendedFor: 'Luxury wellness cabins, integrated spa annexes, and humid environments.',
  }
];

export const ROOFING_SLATE_OPTIONS: RoofingSlateOption[] = [
  {
    id: 'standing-seam-anthracite',
    name: 'Tata Steel Standing-Seam (Anthracite 7016)',
    type: 'Architectural Zinc-Coated Aluminum-Steel',
    origin: 'Port Talbot, UK / Nordic GreenCoat Steel',
    lifespanYears: '60+ Years',
    weightKgM2: 6.8,
    textureSampleUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    colorTone: 'Anthracite Matt (RAL 7016)',
    description: 'Ultra-clean Scandinavian minimalist profile with hidden concealed fasteners. Outstanding storm resistance in high-wind zones with integrated solar clip brackets.',
    priceDelta: 0,
    acousticDampingDb: 38,
    snowLoadRating: '3.2 kN/m² Arctic Grade',
  },
  {
    id: 'welsh-penrhyn-slate',
    name: 'Natural Welsh Slate (Penrhyn Heather Blue)',
    type: 'Quarried Natural Metamorphic Slate',
    origin: 'Bethesda, Snowdonia, Wales',
    lifespanYears: '100+ Years Typical Lifespan',
    weightKgM2: 34.5,
    textureSampleUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    colorTone: 'Deep Heather Blue / Slate Charcoal',
    description: 'A benchmark architectural slate with heritage aesthetics, resistant to frost, acid rain, and UV fading. Frequently used in National Parks & Conservation zones -- always confirm suitability with your Local Planning Authority.',
    priceDelta: 6500,
    acousticDampingDb: 46,
    snowLoadRating: '4.0 kN/m² Heavy Structural Slate',
  },
  {
    id: 'sedum-green-roof',
    name: 'Nordic Living Wildflower & Sedum Green Roof',
    type: 'Bio-Diverse Living Substrate Blanket',
    origin: 'UK Grown Native Sedum & Meadow Flora',
    lifespanYears: '50+ Years (Protects Roof Membrane)',
    weightKgM2: 75.0,
    textureSampleUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    colorTone: 'Living Emerald Green with Seasonal Flora Blooms',
    description: 'Transforms the cabin roof into a vibrant pollinator haven with superior thermal cooling in summer and acoustic insulation during heavy downpours. High SuDS rainwater attenuation.',
    priceDelta: 7900,
    acousticDampingDb: 52,
    snowLoadRating: 'Reinforced 4.5 kN/m² Living Roof Raft',
  },
  {
    id: 'cedar-shingle-handcut',
    name: 'Hand-Split Canadian Red Cedar Shingles',
    type: 'No. 1 Grade Certigrade Western Red Cedar',
    origin: 'British Columbia (Sustainable Forestry)',
    lifespanYears: '45+ Years',
    weightKgM2: 12.0,
    textureSampleUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    colorTone: 'Warm Russet Brown aging to Silver Silken Cedar',
    description: 'Natural rustic alpine charm with aromatic cedar oils that repel moss and insects. Blends seamlessly into woodland landscapes.',
    priceDelta: 4800,
    acousticDampingDb: 42,
    snowLoadRating: '2.8 kN/m² Alpine Shingle',
  }
];

export const INSULATION_OPTIONS: InsulationOption[] = [
  {
    id: 'steico-wood-fibre',
    name: 'Steico Flex Ecological Wood-Fibre (Passivhaus Standard)',
    material: 'Natural Hydrophobic Breathable Wood Fibre',
    uValueTarget: '0.12 W/m²K (Passivhaus-adjacent standard)',
    thicknessMm: 240,
    vaporPermeability: 'Continuous Vapor-Permeable Diffusion Open (Sd 0.02m)',
    textureSampleUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    ecoRating: 'A+ Carbon Negative Bio-Insulation',
    description: '100% natural wood fibre providing unmatched phase-shift thermal mass damping (prevents summer overheating while trapping winter warmth). Non-toxic and breathable.',
    priceDelta: 8400,
    fireRating: 'Euroclass B-s1, d0 (Fire Retarded Core)',
  },
  {
    id: 'kingspan-aerogel-pir',
    name: 'Kingspan Thermafloor PIR with Aerogel Slimline Matrix',
    material: 'Foil-Faced High Performance Polyisocyanurate',
    uValueTarget: '0.14 W/m²K (UK Building Regs Part L Ultra)',
    thicknessMm: 160,
    vaporPermeability: 'Vapor-Impermeable Closed Cell Core',
    textureSampleUrl: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=800&q=80',
    ecoRating: 'Class A Zero ODP Low GWP',
    description: 'Ultra-thin profile maximizing internal habitable floor space while exceeding standard Building Regulations Part L thermal insulation targets.',
    priceDelta: 3200,
    fireRating: 'Class 0 / Low Smoke Emission',
  },
  {
    id: 'sheeps-wool-thermafleece',
    name: 'Thermafleece British Sheep\'s Wool Insulation',
    material: '100% British Mountain Sheep\'s Wool',
    uValueTarget: '0.15 W/m²K (Natural Bio-Thermal)',
    thicknessMm: 200,
    vaporPermeability: 'Natural Hygroscopic Breathable Moisture Buffer',
    textureSampleUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    ecoRating: '100% Renewable British Agricultural Byproduct',
    description: 'Locally sheared British wool that naturally absorbs and neutralizes indoor air toxins (VOCs) while regulating humidity through hygroscopic moisture absorption.',
    priceDelta: 4900,
    fireRating: 'Naturally Flame Retardant (BS 5803-4)',
  },
  {
    id: 'nordic-mineral-rockwool',
    name: 'Nordic High-Density Acoustic Rockwool (Standard Kit)',
    material: 'Basalt Volcanic Stone Mineral Fibre',
    uValueTarget: '0.16 W/m²K (Standard UK Compliant)',
    thicknessMm: 180,
    vaporPermeability: 'Breathable Mineral Core',
    textureSampleUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    ecoRating: 'A+ Recyclable Stone Mineral',
    description: 'Our standard high-density volcanic rockwool insulation. Complete non-combustibility with excellent acoustic decoupling across external walls and roof purlins.',
    priceDelta: 0,
    fireRating: 'Euroclass A1 Non-Combustible (Maximum Safety)',
  }
];

interface MaterialLibraryProps {
  selectedTimberId: string;
  selectedRoofingId: string;
  selectedInsulationId: string;
  onSelectTimber: (timberId: string) => void;
  onSelectRoofing: (roofingId: string) => void;
  onSelectInsulation: (insulationId: string) => void;
}

export const MaterialLibrary: React.FC<MaterialLibraryProps> = ({
  selectedTimberId,
  selectedRoofingId,
  selectedInsulationId,
  onSelectTimber,
  onSelectRoofing,
  onSelectInsulation,
}) => {
  const [activeTab, setActiveTab] = useState<'timber' | 'roofing' | 'insulation'>('timber');
  const [inspectingItem, setInspectingItem] = useState<TimberOption | RoofingSlateOption | InsulationOption | null>(null);

  const currentTimber = TIMBER_OPTIONS.find((t) => t.id === selectedTimberId) || TIMBER_OPTIONS[0];
  const currentRoofing = ROOFING_SLATE_OPTIONS.find((r) => r.id === selectedRoofingId) || ROOFING_SLATE_OPTIONS[0];
  const currentInsulation = INSULATION_OPTIONS.find((i) => i.id === selectedInsulationId) || INSULATION_OPTIONS[0];

  return (
    <div id="material-library" className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Architectural Material Specification Library</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
            Select Sustainable Engineered Materials
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Toggle high-grade timbers, roofing slates, and ecological insulation to calculate real-time thermal performance and pricing.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-stone-950 p-1 rounded-2xl border border-stone-800 shrink-0 self-start sm:self-auto">
          {[
            { id: 'timber', label: '1. Timber Species', icon: Trees, count: TIMBER_OPTIONS.length },
            { id: 'roofing', label: '2. Roof & Slate', icon: Layers, count: ROOFING_SLATE_OPTIONS.length },
            { id: 'insulation', label: '3. Bio-Insulation', icon: ShieldCheck, count: INSULATION_OPTIONS.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-time Material Spec Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-stone-950 border border-stone-800/80 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
          <div className="truncate">
            <span className="text-stone-500 block text-[10px] uppercase font-mono">Wall Timber:</span>
            <strong className="text-stone-200 font-semibold truncate">{currentTimber.name}</strong>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
          <div className="truncate">
            <span className="text-stone-500 block text-[10px] uppercase font-mono">Roof Finish:</span>
            <strong className="text-stone-200 font-semibold truncate">{currentRoofing.name}</strong>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <div className="truncate">
            <span className="text-stone-500 block text-[10px] uppercase font-mono">Insulation Target:</span>
            <strong className="text-emerald-400 font-semibold truncate">{currentInsulation.uValueTarget}</strong>
          </div>
        </div>
      </div>

      {/* TAB 1: TIMBER SPECIES */}
      {activeTab === 'timber' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TIMBER_OPTIONS.map((timber) => {
              const isSelected = selectedTimberId === timber.id;
              return (
                <div
                  key={timber.id}
                  onClick={() => onSelectTimber(timber.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-amber-950/50 border-amber-500 ring-1 ring-amber-500 shadow-xl'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold font-mono flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>SELECTED</span>
                    </div>
                  )}

                  {/* Top info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-400">
                        {timber.species}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {timber.origin.split('(')[0]}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-stone-100 group-hover:text-amber-300 transition-colors">
                      {timber.name}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-sans">
                      {timber.description}
                    </p>
                  </div>

                  {/* Timber Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-[11px] font-mono">
                    <div>
                      <span className="text-stone-500 block text-[9px]">Density:</span>
                      <span className="text-stone-200 font-semibold">{timber.densityKgM3} kg/m³</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[9px]">Conductivity:</span>
                      <span className="text-stone-200 font-semibold">{timber.thermalConductivity}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[9px]">Durability:</span>
                      <span className="text-amber-400 font-semibold">{timber.durabilityClass.split('/')[0]}</span>
                    </div>
                  </div>

                  {/* Finishes & Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 text-xs">
                    <div className="text-[11px] text-stone-400">
                      <span>Grain: </span>
                      <strong className="text-stone-300">{timber.grainPattern.slice(0, 32)}...</strong>
                    </div>
                    <div className="font-mono font-bold text-amber-400 text-sm shrink-0 ml-2">
                      {timber.priceDelta === 0 ? 'Included in Kit' : `+£${timber.priceDelta.toLocaleString()}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ROOFING & SLATE */}
      {activeTab === 'roofing' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ROOFING_SLATE_OPTIONS.map((roof) => {
              const isSelected = selectedRoofingId === roof.id;
              return (
                <div
                  key={roof.id}
                  onClick={() => onSelectRoofing(roof.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-amber-950/50 border-amber-500 ring-1 ring-amber-500 shadow-xl'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold font-mono flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>SELECTED</span>
                    </div>
                  )}

                  {/* Top info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-amber-400">
                        {roof.type}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {roof.origin}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-stone-100 group-hover:text-amber-300 transition-colors">
                      {roof.name}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-sans">
                      {roof.description}
                    </p>
                  </div>

                  {/* Roof Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-[11px] font-mono">
                    <div>
                      <span className="text-stone-500 block text-[9px]">Lifespan:</span>
                      <span className="text-stone-200 font-semibold">{roof.lifespanYears}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[9px]">Acoustic Damping:</span>
                      <span className="text-emerald-400 font-semibold">-{roof.acousticDampingDb} dB</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[9px]">Snow Load:</span>
                      <span className="text-stone-200 font-semibold">{roof.snowLoadRating.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Tone & Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 text-xs">
                    <div className="text-[11px] text-stone-400">
                      <span>Tone: </span>
                      <strong className="text-stone-300">{roof.colorTone}</strong>
                    </div>
                    <div className="font-mono font-bold text-amber-400 text-sm shrink-0 ml-2">
                      {roof.priceDelta === 0 ? 'Standard Spec' : `+£${roof.priceDelta.toLocaleString()}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: BIO-INSULATION & THERMAL EFFICIENCY */}
      {activeTab === 'insulation' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INSULATION_OPTIONS.map((insul) => {
              const isSelected = selectedInsulationId === insul.id;
              return (
                <div
                  key={insul.id}
                  onClick={() => onSelectInsulation(insul.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-amber-950/50 border-amber-500 ring-1 ring-amber-500 shadow-xl'
                      : 'bg-stone-950 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold font-mono flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>SELECTED</span>
                    </div>
                  )}

                  {/* Top info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-emerald-400">
                        {insul.ecoRating}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {insul.thicknessMm}mm Core
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-stone-100 group-hover:text-amber-300 transition-colors">
                      {insul.name}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-sans">
                      {insul.description}
                    </p>
                  </div>

                  {/* Insulation Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 text-[11px] font-mono">
                    <div>
                      <span className="text-stone-500 block text-[9px]">U-Value:</span>
                      <span className="text-emerald-400 font-semibold">{insul.uValueTarget.split(' ')[0]}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[9px]">Fire Rating:</span>
                      <span className="text-stone-200 font-semibold">{insul.fireRating.split(' ')[0]}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block text-[9px]">Material:</span>
                      <span className="text-stone-300 font-semibold truncate block">{insul.material.slice(0, 14)}</span>
                    </div>
                  </div>

                  {/* Vapor & Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 text-xs">
                    <div className="text-[11px] text-stone-400">
                      <span>Diffusion: </span>
                      <strong className="text-stone-300">{insul.vaporPermeability.slice(0, 24)}...</strong>
                    </div>
                    <div className="font-mono font-bold text-amber-400 text-sm shrink-0 ml-2">
                      {insul.priceDelta === 0 ? 'Standard Spec' : `+£${insul.priceDelta.toLocaleString()}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
