import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Maximize2,
  Minimize2,
  Camera,
  Layers,
  Clock,
  Hammer,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Eye,
  Sun,
  Flame,
  Trees,
  HardHat,
  Compass,
  ArrowRight,
  Info,
  Calendar,
  Zap,
  Activity,
  Award
} from 'lucide-react';

interface TimelapseStage {
  dayNumber: number;
  stageName: string;
  shortName: string;
  durationLabel: string;
  completionPct: number;
  imageUrl: string;
  cameraView: string;
  timecode: string;
  crewActivity: string;
  structuralMetric: {
    label: string;
    value: string;
  };
  environmentalMetric: {
    label: string;
    value: string;
  };
  deliverableSignedOff: string;
  description: string;
}

interface CabinBuildScenario {
  id: string;
  title: string;
  modelName: string;
  location: string;
  totalDays: number;
  timberProfile: string;
  footprintSqM: number;
  stages: TimelapseStage[];
}

const TIMELAPSE_SCENARIOS: CabinBuildScenario[] = [
  {
    id: 'highland-horizon',
    title: 'Highland Horizon 202mm Glulam Twin-Wing',
    modelName: 'Highland Alpine Master 145',
    location: 'Cairngorms National Park, Scotland',
    totalDays: 14,
    timberProfile: '202mm Solid Nordic Laminated Glulam',
    footprintSqM: 145,
    stages: [
      {
        dayNumber: 1,
        stageName: 'Stage 1: Digital Torque Eco Ground Screws',
        shortName: 'Ground Screws',
        durationLabel: 'Day 1–2',
        completionPct: 15,
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'North-West Drone Survey 45°',
        timecode: 'DAY 01 // 08:30:15 GMT',
        crewActivity: 'Hydraulic excavator driving 32x 2.5m galvanised ground screws into rocky subsoil.',
        structuralMetric: { label: 'Torque Capacity', value: '45.2 kN/pile' },
        environmentalMetric: { label: 'Zero Concrete', value: '0.0m³ Cement Used' },
        deliverableSignedOff: 'Digital Soil Torque Validation & Laser Level Grid Sign-Off',
        description: 'Zero soil spoil excavation. Heavy-duty ground screws installed in 7 hours without concrete curing delays.'
      },
      {
        dayNumber: 3,
        stageName: 'Stage 2: Insulated Subframe & Structural Ring Beam',
        shortName: 'Subfloor Platform',
        durationLabel: 'Day 3–4',
        completionPct: 30,
        imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Isometric High-Angle Rig',
        timecode: 'DAY 03 // 11:15:00 GMT',
        crewActivity: 'Laying pressure-treated Siberian larch base perimeter beams with dual damp-proof bitumen gaskets.',
        structuralMetric: { label: 'Subfloor U-Value', value: '0.12 W/m²K' },
        environmentalMetric: { label: 'Vapour Barrier', value: '100% Continuous Membrane' },
        deliverableSignedOff: 'Perimeter Level Tolerance (±1.5mm) & Acoustic Base Isolation',
        description: 'Constructing the structural cassette base loaded with 200mm wood-fibre breathable insulation.'
      },
      {
        dayNumber: 6,
        stageName: 'Stage 3: Interlocking Glulam Wall Assembly & Rod Rigging',
        shortName: 'Glulam Walls',
        durationLabel: 'Day 5–7',
        completionPct: 55,
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'South Elevation Ground Cam',
        timecode: 'DAY 06 // 14:40:22 GMT',
        crewActivity: 'Master carpentry team interlocking tongue-and-groove 202mm glulam logs with internal compression rods.',
        structuralMetric: { label: 'Milled Timber Placed', value: '18.4 Metric Tonnes' },
        environmentalMetric: { label: 'Concealed Conduits', value: '100% Pre-routed M&E' },
        deliverableSignedOff: 'Wall Plumb Verticals & Interlock Compression Seal Quality Log',
        description: 'Rapid interlocking assembly of precision factory-milled Nordic Spruce logs at 1.2 vertical meters per shift.'
      },
      {
        dayNumber: 9,
        stageName: 'Stage 4: Structural Ridge Beams & Roof Cassettes',
        shortName: 'Roof Purlins',
        durationLabel: 'Day 8–10',
        completionPct: 75,
        imageUrl: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Gable End Sky Cam',
        timecode: 'DAY 09 // 16:10:45 GMT',
        crewActivity: 'Mobile crane lifting 12m laminated timber ridge purlins; fixing insulated roof structural cassettes.',
        structuralMetric: { label: 'Snow Load Rating', value: '2.85 kN/m² Alpine' },
        environmentalMetric: { label: 'Breathable Shield', value: 'Tyvek Supro Plus' },
        deliverableSignedOff: 'Nordic "Roof-Wetting" Structural Integrity Milestone Passed',
        description: 'Heavy glulam purlins hoisted into place to form cathedral ceilings before securing waterproof breathable membranes.'
      },
      {
        dayNumber: 12,
        stageName: 'Stage 5: Standing Seam Roof & Triple Glazing Enclosure',
        shortName: 'Weather-Tight Shell',
        durationLabel: 'Day 11–12',
        completionPct: 90,
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Front Vista Sunset Cam',
        timecode: 'DAY 12 // 17:35:10 GMT',
        crewActivity: 'Installing German triple-glazed panoramic glass gable walls and anthra-zinc standing seam roof.',
        structuralMetric: { label: 'Glazing U-Value', value: '0.78 W/m²K (Argon)' },
        environmentalMetric: { label: 'Air Permeability', value: '0.82 ACH@50Pa' },
        deliverableSignedOff: 'Building Control Weather-Tight Shell Certificate',
        description: 'Complete thermal barrier lockup with German Schuco-profile timber-aluminium doors and concealed perimeter flashings.'
      },
      {
        dayNumber: 14,
        stageName: 'Stage 6: Handcrafted Fitout, Sauna & Golden Key Handover',
        shortName: 'Completed Turnkey',
        durationLabel: 'Day 13–14',
        completionPct: 100,
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Architectural Dusk Panorama',
        timecode: 'DAY 14 // 20:00:00 GMT',
        crewActivity: 'Osmo UV protective oil buffing, wood-burning stove commissioning, cedar sauna fire-up, and key presentation.',
        structuralMetric: { label: 'Handover Status', value: 'Keys Delivered' },
        environmentalMetric: { label: 'EPC Energy Rating', value: 'A+ (Passivhaus Norm)' },
        deliverableSignedOff: 'Final Local Authority Completion Certificate & Golden Keys Handed',
        description: 'Pristine turnkey finish. Glowing warm architectural lighting, fully heated floors, and immediate residential readiness.'
      }
    ]
  },
  {
    id: 'lakeside-aurora',
    title: 'Lochside Aurora Glasshouse 88m²',
    modelName: 'Aurora Panoramic Studio 88',
    location: 'Lake Windermere, Cumbria',
    totalDays: 10,
    timberProfile: '160mm Glulam + Full-Height Structural Glazing',
    footprintSqM: 88,
    stages: [
      {
        dayNumber: 1,
        stageName: 'Stage 1: Zero-Vibration Lakefront Ground Anchoring',
        shortName: 'Lakeside Anchors',
        durationLabel: 'Day 1–2',
        completionPct: 20,
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Waterfront Aerial 30°',
        timecode: 'DAY 01 // 09:00:00 GMT',
        crewActivity: 'Low-impact ground screws driven through alluvial soils to bedrock without disturbing tree roots.',
        structuralMetric: { label: 'Bedrock Depth', value: '3.1m Depth' },
        environmentalMetric: { label: 'Tree Root Protection', value: '100% Tree Canopy Safe' },
        deliverableSignedOff: 'National Park Protected Tree Root Zone Sign-Off',
        description: 'Eco-sensitive foundation installation right at the water boundary with zero environmental runoff.'
      },
      {
        dayNumber: 4,
        stageName: 'Stage 2: Glulam Frame & Panoramic Cantilever Deck',
        shortName: 'Frame & Deck',
        durationLabel: 'Day 3–5',
        completionPct: 50,
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Lakeside Jetty Cam',
        timecode: 'DAY 04 // 13:20:00 GMT',
        crewActivity: 'Erecting high-load glulam corner posts and extended thermal larch cantilever sun deck over shoreline.',
        structuralMetric: { label: 'Deck Cantilever', value: '2.8m Free Span' },
        environmentalMetric: { label: 'Timber Grade', value: 'C24 Kiln-Dried Nordic' },
        deliverableSignedOff: 'Structural Cantilever Deflection Certification (<1/500)',
        description: 'Timber framing designed specifically to accommodate massive structural glass apertures facing the lake.'
      },
      {
        dayNumber: 7,
        stageName: 'Stage 3: Oversized Sky-Frame Glass Walls & Roof Shell',
        shortName: 'Glass & Roof',
        durationLabel: 'Day 6–8',
        completionPct: 80,
        imageUrl: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Front Panorama Cam',
        timecode: 'DAY 07 // 15:45:00 GMT',
        crewActivity: 'Vacuum lifter placing 300kg triple-glazed glass panes with acoustic solar-control coatings.',
        structuralMetric: { label: 'Acoustic Rating', value: '44 dB Sound Dampening' },
        environmentalMetric: { label: 'Solar Heat Gain', value: 'g-value 0.38 Anti-Glare' },
        deliverableSignedOff: 'Weatherproof Glazing Envelope Pressure Seal Certificate',
        description: 'Floor-to-ceiling glass installation providing unobstructed lake reflections with zero thermal bridging.'
      },
      {
        dayNumber: 10,
        stageName: 'Stage 4: Cedar Hot Tub, Underfloor Heat & Handover',
        shortName: 'Turnkey Luxury',
        durationLabel: 'Day 9–10',
        completionPct: 100,
        imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Twilight Drone Perspective',
        timecode: 'DAY 10 // 19:30:00 GMT',
        crewActivity: 'Filling wood-fired cedar tub, connecting smart Daikin air-source climate control, and handing over keys.',
        structuralMetric: { label: 'Air Permeability', value: '0.69 ACH@50Pa' },
        environmentalMetric: { label: 'Airbnb Yield', value: '£380/night Projection' },
        deliverableSignedOff: 'Building Control Completion Pack & Handover Documentation',
        description: 'Complete luxury tourism retreat handed over in exactly 10 working days from bare grass to guest-ready luxury.'
      }
    ]
  },
  {
    id: 'eco-studio-sovereign',
    title: 'Sovereign Garden Eco-Lodge 45m²',
    modelName: 'Sovereign Garden Sanctuary 45',
    location: 'Cotswolds AONB, Oxfordshire',
    totalDays: 6,
    timberProfile: '134mm Precision Milled Glulam',
    footprintSqM: 45,
    stages: [
      {
        dayNumber: 1,
        stageName: 'Stage 1: 4-Hour Rapid Ground Screw Grid',
        shortName: 'Rapid Foundations',
        durationLabel: 'Day 1',
        completionPct: 25,
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Garden Lawn Wide Cam',
        timecode: 'DAY 01 // 10:00:00 GMT',
        crewActivity: 'Handheld electric torque drive inserting 16 ground screws directly through residential garden turf.',
        structuralMetric: { label: 'Installation Time', value: '3.5 Hours' },
        environmentalMetric: { label: 'Lawn Damage', value: 'Zero Soil Disruption' },
        deliverableSignedOff: 'Laser Level Base Datum Confirmed',
        description: 'Permitted development garden foundation completed before lunchtime with zero heavy plant lawn ruts.'
      },
      {
        dayNumber: 3,
        stageName: 'Stage 2: 134mm Interlocking Wall & Glass Facade',
        shortName: 'Log Walls & Roof',
        durationLabel: 'Day 2–3',
        completionPct: 60,
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Garden Path Front Angle',
        timecode: 'DAY 03 // 14:15:00 GMT',
        crewActivity: '3-man joinery team interlocking milled spruce logs and hanging bi-fold aluminium glass doors.',
        structuralMetric: { label: 'Wall Assembly', value: '1.5 Days Total' },
        environmentalMetric: { label: 'Carbon Stored', value: '8.2 Tonnes CO₂e' },
        deliverableSignedOff: 'Structural Timber Alignment & Door Operation Validation',
        description: 'Rapid modular interlocking log construction with pre-cut factory joints requiring zero on-site sawing noise.'
      },
      {
        dayNumber: 6,
        stageName: 'Stage 3: Green Sedum Roof, Electrics & Handover',
        shortName: 'Sedum Roof & Studio',
        durationLabel: 'Day 5–6',
        completionPct: 100,
        imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80',
        cameraView: 'Garden Twilight Reveal',
        timecode: 'DAY 06 // 17:00:00 GMT',
        crewActivity: 'Laying living wildflower sedum blanket, connecting high-speed Cat6 fibre & smart infrared heating panels.',
        structuralMetric: { label: 'Living Roof', value: 'Wildflower Biodiversity' },
        environmentalMetric: { label: 'Permitted Dev', value: '100% Certificate of Lawfulness' },
        deliverableSignedOff: 'Electrical Safety Certificate (Part P) & Keys Handed',
        description: 'Turnkey home executive office and garden guest lodge ready for occupancy in under 1 calendar week.'
      }
    ]
  }
];

interface ConstructionTimelapseProps {
  onConfigureCabin: (cabinId: string) => void;
  onBookConsultation: (topic: string) => void;
}

export const ConstructionTimelapse: React.FC<ConstructionTimelapseProps> = ({
  onConfigureCabin,
  onBookConsultation,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('highland-horizon');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1); // 0.5x, 1x, 2x, 4x
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [compareSliderPos, setCompareSliderPos] = useState<number>(50); // 0 to 100%
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showTelemetry, setShowTelemetry] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  const activeScenario = useMemo(() => {
    return TIMELAPSE_SCENARIOS.find((s) => s.id === selectedScenarioId) || TIMELAPSE_SCENARIOS[0];
  }, [selectedScenarioId]);

  const currentStage = activeScenario.stages[activeStageIndex] || activeScenario.stages[0];

  // Auto-play interval loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = Math.round(2400 / playbackSpeed);

    timerRef.current = setInterval(() => {
      setActiveStageIndex((prev) => {
        if (prev >= activeScenario.stages.length - 1) {
          return 0; // Loop back to start
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, activeScenario.stages.length]);

  // Reset stage index when scenario changes
  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setActiveStageIndex(0);
    setIsPlaying(true);
  };

  const handleNextStage = () => {
    setIsPlaying(false);
    setActiveStageIndex((prev) => (prev + 1) % activeScenario.stages.length);
  };

  const handlePrevStage = () => {
    setIsPlaying(false);
    setActiveStageIndex((prev) => (prev - 1 + activeScenario.stages.length) % activeScenario.stages.length);
  };

  const handleJumpToStage = (idx: number) => {
    setIsPlaying(false);
    setActiveStageIndex(idx);
  };

  const firstStage = activeScenario.stages[0];
  const finalStage = activeScenario.stages[activeScenario.stages.length - 1];

  return (
    <div className="mt-16 pt-12 border-t border-stone-800 text-stone-100" ref={containerRef}>
      
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-3">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulated Construction Timelapse & Assembly Stages</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-100">
            From Ground Screws to Ridge Beam: Watch the Build
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            A simulated, illustrative walkthrough of a typical precision timber erection process. Actual timelines, crews, and metrics will vary by project -- offsite CNC prefabrication is designed to enable efficient on-site interlocking assembly with Building Control sign-offs at every stage.
          </p>
        </div>

        {/* Project Model Scenario Switcher */}
        <div className="flex items-center gap-2 bg-stone-950 p-1.5 rounded-2xl border border-stone-800 self-start lg:self-auto overflow-x-auto max-w-full">
          {TIMELAPSE_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(sc.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedScenarioId === sc.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {sc.title.split(' ')[0]} {sc.title.split(' ')[1]} ({sc.totalDays}d)
            </button>
          ))}
        </div>
      </div>

      {/* Main Video & Timelapse Stage Canvas */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl space-y-6">
        
        {/* Project Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-950 border border-amber-600/40 text-amber-400">
              <HardHat className="w-4 h-4" />
            </div>
            <div>
              <div className="font-serif font-bold text-stone-100 text-sm sm:text-base">
                {activeScenario.title}
              </div>
              <div className="text-stone-400 text-[11px] font-mono">
                {activeScenario.location} • {activeScenario.footprintSqM} m² • {activeScenario.timberProfile}
              </div>
            </div>
          </div>

          {/* Mode Toggles: Telemetry & Compare */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                isCompareMode
                  ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                  : 'bg-stone-900 border-stone-700 text-stone-300 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isCompareMode ? 'Exit Split Slider' : 'Compare Day 1 vs Final'}</span>
            </button>

            <button
              onClick={() => setShowTelemetry(!showTelemetry)}
              className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                showTelemetry
                  ? 'bg-stone-900 border-stone-700 text-amber-400'
                  : 'bg-stone-950 border-stone-800 text-stone-500'
              }`}
              title="Toggle Live Camera Telemetry"
            >
              <Activity className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Stage Frame */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-inner group aspect-video sm:h-[480px] w-full flex items-center justify-center">
          
          {/* Normal Mode Stage Image */}
          {!isCompareMode ? (
            <div className="relative w-full h-full">
              <img
                src={currentStage.imageUrl}
                alt={currentStage.stageName}
                className="w-full h-full object-cover transition-all duration-700 brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40 pointer-events-none" />
            </div>
          ) : (
            /* Split Before/After Comparison Mode */
            <div className="relative w-full h-full overflow-hidden select-none">
              {/* After Finished Image (Background) */}
              <img
                src={finalStage.imageUrl}
                alt="Completed Cabin"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-emerald-500/50 text-emerald-400 text-xs font-mono font-bold">
                DAY {activeScenario.totalDays}: TURNKEY FINISH
              </div>

              {/* Before Day 1 Image (Clipped) */}
              <div
                style={{ width: `${compareSliderPos}%` }}
                className="absolute inset-0 h-full overflow-hidden border-r-2 border-amber-400 shadow-2xl z-10"
              >
                <img
                  src={firstStage.imageUrl}
                  alt="Day 1 Groundworks"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: containerRef.current?.clientWidth || '100%' }}
                />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-amber-500/50 text-amber-300 text-xs font-mono font-bold">
                  DAY 01: GROUNDWORKS
                </div>
              </div>

              {/* Drag Handle Bar */}
              <div
                style={{ left: `${compareSliderPos}%` }}
                className="absolute top-0 bottom-0 w-1 bg-amber-400 z-30 pointer-events-none transform -translate-x-1/2 flex items-center justify-center"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-2xl border-2 border-stone-950">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
              </div>

              {/* Interactive Range Input */}
              <input
                aria-label="Before and after comparison slider"
                type="range"
                min="0"
                max="100"
                value={compareSliderPos}
                onChange={(e) => setCompareSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
              />
            </div>
          )}

          {/* Video / Camera Telemetry HUD Overlay (Broadcast Style) */}
          {showTelemetry && !isCompareMode && (
            <>
              {/* Top Left: Live Camera View & Timecode */}
              <div className="absolute top-4 left-4 z-20 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-700 text-white font-mono text-[10px] uppercase font-bold tracking-widest">
                    TIMELAPSE CAM • 4K 60FPS
                  </span>
                </div>
                <div className="text-[11px] font-mono font-bold text-amber-400 bg-stone-950/80 px-2 py-0.5 rounded backdrop-blur-md inline-block border border-stone-800">
                  {currentStage.timecode}
                </div>
              </div>

              {/* Top Right: Camera Angle & Completion Ring */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <div className="px-3 py-1 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-700 text-stone-300 text-xs font-mono flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentStage.cameraView}</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-amber-500 text-stone-950 text-xs font-mono font-bold shadow-lg">
                  {currentStage.completionPct}% BUILT
                </div>
              </div>

              {/* Bottom Left: Stage Title & Crew Activity Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 sm:p-4 rounded-2xl bg-stone-950/85 backdrop-blur-md border border-stone-800 space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-bold text-[10px] font-mono uppercase">
                    {currentStage.durationLabel}
                  </span>
                  <span className="font-serif font-bold text-sm sm:text-base text-white">
                    {currentStage.stageName}
                  </span>
                </div>
                <p className="text-xs text-stone-300 line-clamp-2">
                  {currentStage.crewActivity}
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-3 text-[11px] font-mono text-stone-400">
                  <span className="text-amber-300 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {currentStage.deliverableSignedOff}
                  </span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Video Player Control Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-stone-900 border border-stone-800">
          
          {/* Play, Pause, Jump Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-3 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg'
                  : 'bg-stone-950 hover:bg-stone-800 text-amber-400 border border-amber-500/40'
              }`}
              title={isPlaying ? 'Pause Timelapse' : 'Play Timelapse'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-amber-400" />}
              <span className="text-xs">{isPlaying ? 'Pause' : 'Play Video'}</span>
            </button>

            <button
              onClick={handlePrevStage}
              className="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Previous Stage"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextStage}
              className="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Next Stage"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveStageIndex(0);
                setIsPlaying(true);
              }}
              className="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Restart from Day 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Stage Step Tabs / Scrubber Bar */}
          <div className="flex-1 w-full md:w-auto flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {activeScenario.stages.map((st, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleJumpToStage(idx)}
                  className={`flex-1 min-w-[75px] py-1.5 px-2 rounded-xl text-center transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-md'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 border-stone-800'
                  }`}
                >
                  <div className="text-[10px] font-mono leading-none font-bold uppercase">
                    {st.shortName}
                  </div>
                  <div className="text-[9px] opacity-80 mt-0.5">
                    {st.durationLabel}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Speed Controls (0.5x, 1x, 2x) */}
          <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800 shrink-0">
            <span className="text-[10px] text-stone-500 px-1 font-mono uppercase">Speed</span>
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  playbackSpeed === spd
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

        </div>

        {/* Detailed Stage Telemetry & Metric Factsheet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Card 1: Structural Quality Metric */}
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Structural Metric</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-xs text-stone-400">{currentStage.structuralMetric.label}:</span>
              <span className="font-mono text-sm font-bold text-amber-300">{currentStage.structuralMetric.value}</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-snug">
              Laser checked on-site against structural timber engineer calculations.
            </p>
          </div>

          {/* Card 2: Environmental & Airtightness Metric */}
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Eco & Energy Standard</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-xs text-stone-400">{currentStage.environmentalMetric.label}:</span>
              <span className="font-mono text-sm font-bold text-emerald-400">{currentStage.environmentalMetric.value}</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-snug">
              Zero synthetic toxic binders; 100% natural breathable thermal envelope.
            </p>
          </div>

          {/* Card 3: Model CTA Action */}
          <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Interested in this Build?
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Customize the <strong className="text-white">{activeScenario.modelName}</strong> in 3D.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onConfigureCabin(activeScenario.id === 'highland-horizon' ? 'highland-master-145' : 'aurora-panoramic-88')}
                className="flex-1 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-md"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Configure Model</span>
              </button>
              <button
                onClick={() => onBookConsultation(`Timelapse Inquiry for ${activeScenario.title}`)}
                className="px-3 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold cursor-pointer transition-colors"
              >
                Book Tour
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
