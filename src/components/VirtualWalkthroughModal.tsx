import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CabinModel } from '../types';
import {
  X,
  Play,
  Pause,
  RotateCw,
  Compass,
  Maximize2,
  Minimize2,
  Eye,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunset,
  Moon,
  Info,
  SlidersHorizontal,
  Phone,
  Volume2,
  VolumeX,
  MapPin,
  Flame,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';

interface VirtualWalkthroughModalProps {
  cabin: CabinModel;
  isOpen: boolean;
  onClose: () => void;
  onConfigure: (cabinId: string) => void;
  onBookSurvey: (cabinName: string) => void;
}

interface WalkthroughWaypoint {
  id: string;
  title: string;
  subtitle: string;
  type: 'exterior' | 'interior';
  imageUrl: string;
  cameraPitch: number;
  cameraYaw: number;
  cameraZoom: number;
  hotspots: {
    id: string;
    x: number; // percentage
    y: number; // percentage
    title: string;
    description: string;
    icon?: 'timber' | 'glass' | 'sauna' | 'heating' | 'eco';
  }[];
  roomMetrics: {
    area: string;
    ceilingHeight: string;
    lighting: string;
  };
}

export const VirtualWalkthroughModal: React.FC<VirtualWalkthroughModalProps> = ({
  cabin,
  isOpen,
  onClose,
  onConfigure,
  onBookSurvey,
}) => {
  // Lighting environment: 'golden' | 'day' | 'night'
  const [lightingMode, setLightingMode] = useState<'golden' | 'day' | 'night'>('golden');
  // Lens FOV mode: 'wide' (16mm) | 'standard' (24mm) | 'telephoto' (50mm)
  const [lensMode, setLensMode] = useState<'wide' | 'standard' | 'telephoto'>('standard');
  // Auto-pan / cinematic playback
  const [isAutoPanning, setIsAutoPanning] = useState<boolean>(true);
  const [activeWaypointIndex, setActiveWaypointIndex] = useState<number>(0);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [ambientSound, setAmbientSound] = useState<boolean>(false);
  
  // Interactive drag / pan state
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Define tailored scene waypoints based on cabin characteristics
  const waypoints: WalkthroughWaypoint[] = [
    {
      id: 'ext-approach',
      title: 'South Elevation & Cathedral Glass Gables',
      subtitle: 'Exterior Architectural Approach & Cantilevered Timber Decking',
      type: 'exterior',
      imageUrl: cabin.image || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
      cameraPitch: -2,
      cameraYaw: 15,
      cameraZoom: 1.05,
      hotspots: [
        {
          id: 'hs-timber',
          x: 28,
          y: 48,
          title: `${cabin.wallThicknessMm}mm Glulam Wall System`,
          description: `Zero-settlement engineered ${cabin.timberType} with triple-tongue precision milling and airtight EPDM gaskets.`,
          icon: 'timber',
        },
        {
          id: 'hs-glass',
          x: 65,
          y: 38,
          title: 'Schuco Architectural Triple Glazing',
          description: 'Acoustic laminated argon-filled triple glass units with 0.78 W/m²K thermal efficiency.',
          icon: 'glass',
        },
        {
          id: 'hs-roof',
          x: 50,
          y: 18,
          title: 'Zinc Standing-Seam Alpine Roof',
          description: '350mm structural wood-fibre insulation cassette rated for 2.4 kN/m² Arctic snow load.',
          icon: 'eco',
        },
      ],
      roomMetrics: {
        area: `${cabin.dimensions} Footprint`,
        ceilingHeight: '5.4m Ridge Peak',
        lighting: 'South-Facing Direct Solar Gain',
      },
    },
    {
      id: 'int-greatroom',
      title: 'Vaulted Great Room & Timber Hearth',
      subtitle: 'Double-Height Living Space with Open-Plan Alpine Lounge',
      type: 'interior',
      imageUrl: cabin.gallery && cabin.gallery[1] ? cabin.gallery[1] : 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=85',
      cameraPitch: 4,
      cameraYaw: -10,
      cameraZoom: 1.1,
      hotspots: [
        {
          id: 'hs-hearth',
          x: 32,
          y: 62,
          title: 'Nordpeis Soapstone Wood Burning Stove',
          description: '82% efficiency clean-burn secondary combustion with thermal heat-retaining soapstone core.',
          icon: 'heating',
        },
        {
          id: 'hs-vault',
          x: 52,
          y: 22,
          title: 'Exposed Structural Glulam Ridge Purlins',
          description: 'Heavy architectural timber tie-beams finished in breathable natural matte Osmo UV polyx-oil.',
          icon: 'timber',
        },
        {
          id: 'hs-floor',
          x: 68,
          y: 78,
          title: 'Wide-Plank Brushed Nordic Oak Flooring',
          description: 'Integrated hydronic underfloor heating powered by external air-source heat pump.',
          icon: 'heating',
        },
      ],
      roomMetrics: {
        area: `${Math.round(cabin.areaSqM * 0.45)} m² Great Hall`,
        ceilingHeight: '4.8m Cathedral Vault',
        lighting: 'Warm 2700K Recessed Timber Channel LEDs',
      },
    },
    {
      id: 'int-kitchen',
      title: 'Nordic Culinary Hub & Dining Viewpoint',
      subtitle: 'Handcrafted Birch Plywood & Honed Quartz Island',
      type: 'interior',
      imageUrl: cabin.gallery && cabin.gallery[2] ? cabin.gallery[2] : 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=85',
      cameraPitch: 0,
      cameraYaw: 20,
      cameraZoom: 1.08,
      hotspots: [
        {
          id: 'hs-island',
          x: 45,
          y: 55,
          title: 'Seamless Honed Quartz Prep Island',
          description: 'Bespoke custom millwork with integrated induction cooktop and downdraft extractor.',
          icon: 'eco',
        },
        {
          id: 'hs-conduit',
          x: 75,
          y: 42,
          title: 'Factory-Milled Concealed Conduit Channels',
          description: 'All wiring routed inside internal log cores for clean uninterrupted solid wood walls.',
          icon: 'eco',
        },
      ],
      roomMetrics: {
        area: `${Math.round(cabin.areaSqM * 0.28)} m² Kitchen / Diner`,
        ceilingHeight: '2.8m Acoustic Timber Ceiling',
        lighting: 'Dimmable Cove Accent Illumination',
      },
    },
    {
      id: 'int-sauna',
      title: 'Scandinavian Thermowood Sauna & Wellness',
      subtitle: 'Integrated Finnish Cedar Spa with Panoramic Forest Window',
      type: 'interior',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
      cameraPitch: 2,
      cameraYaw: -5,
      cameraZoom: 1.12,
      hotspots: [
        {
          id: 'hs-stove',
          x: 35,
          y: 58,
          title: 'Harvia Cilindro Electric Sauna Heater',
          description: '9.0 kW high-mass Finnish volcanic stone column for soft, deeply penetrating steam (löyly).',
          icon: 'sauna',
        },
        {
          id: 'hs-cedar',
          x: 70,
          y: 35,
          title: 'A-Grade Thermo-Aspen Paneling',
          description: 'Non-resinous knot-free thermal timber with natural aroma and antimicrobial longevity.',
          icon: 'sauna',
        },
      ],
      roomMetrics: {
        area: '8.5 m² Dedicated Spa Suite',
        ceilingHeight: '2.4m Insulated Thermal Box',
        lighting: 'Indirect Ambient Fiber-Optic Starlight',
      },
    },
    {
      id: 'int-master',
      title: 'Mezzanine Master Suite & Timber Balcony',
      subtitle: 'Elevated Sanctuary with Panoramic Gable Glazing',
      type: 'interior',
      imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
      cameraPitch: -4,
      cameraYaw: 8,
      cameraZoom: 1.05,
      hotspots: [
        {
          id: 'hs-balcony',
          x: 62,
          y: 40,
          title: 'Frameless Glass Balcony Edge',
          description: 'Overlooks double-height living room below and frames outdoor sunrise views.',
          icon: 'glass',
        },
        {
          id: 'hs-acoustic',
          x: 25,
          y: 30,
          title: 'Acoustic Wood Slat Wall Decoupling',
          description: 'Sound transmission class STC 54 for total peaceful privacy between rooms.',
          icon: 'timber',
        },
      ],
      roomMetrics: {
        area: `${Math.round(cabin.areaSqM * 0.32)} m² Master Bedroom`,
        ceilingHeight: '3.6m Sloped Eaves',
        lighting: 'Dusk/Dawn Circadian Smart Controls',
      },
    },
  ];

  const currentWaypoint = waypoints[activeWaypointIndex];

  // Auto-pan timer simulation
  useEffect(() => {
    if (!isAutoPanning || !isOpen) return;

    const interval = setInterval(() => {
      // Small continuous oscillating pan effect
      setPanOffset((prev) => {
        const time = Date.now() / 3000;
        return {
          x: Math.sin(time) * 24,
          y: Math.cos(time * 0.7) * 8,
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isAutoPanning, isOpen]);

  // Handle pointer drag for manual 3D orbit
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsAutoPanning(false);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPanRef.current = { ...panOffset };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    setPanOffset({
      x: Math.max(-120, Math.min(120, initialPanRef.current.x + deltaX * 0.6)),
      y: Math.max(-50, Math.min(50, initialPanRef.current.y + deltaY * 0.4)),
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNextWaypoint();
      if (e.key === 'ArrowLeft') handlePrevWaypoint();
      if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPanning((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeWaypointIndex]);

  const handleNextWaypoint = () => {
    setSelectedHotspotId(null);
    setPanOffset({ x: 0, y: 0 });
    setActiveWaypointIndex((prev) => (prev + 1) % waypoints.length);
  };

  const handlePrevWaypoint = () => {
    setSelectedHotspotId(null);
    setPanOffset({ x: 0, y: 0 });
    setActiveWaypointIndex((prev) => (prev - 1 + waypoints.length) % waypoints.length);
  };

  if (!isOpen) return null;

  // Zoom scale based on lens FOV
  const lensZoomMultiplier =
    lensMode === 'wide' ? 1.0 : lensMode === 'standard' ? 1.15 : 1.35;

  // Lighting overlay filters
  const lightingFilterClasses =
    lightingMode === 'golden'
      ? 'sepia-[0.18] brightness-[1.04] contrast-[1.06]'
      : lightingMode === 'night'
      ? 'brightness-[0.75] contrast-[1.2] saturate-[0.85] hue-rotate-[200deg]'
      : 'brightness-[1.0] contrast-[1.0]';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/95 backdrop-blur-md overflow-hidden select-none">
        
        {/* Main 3D Stage Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`relative w-full h-full sm:rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl overflow-hidden flex flex-col ${
            isFullscreen ? 'sm:rounded-none max-w-none max-h-none' : 'max-w-6xl max-h-[92vh]'
          }`}
        >

          {/* TOP HUD BAR */}
          <div className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-stone-950/85 backdrop-blur-md border-b border-stone-800/80">
            
            {/* Cabin & Scene Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-stone-950 font-bold shadow-md flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-stone-100">
                    {cabin.name}
                  </h3>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-950/80 border border-amber-600/40 text-amber-300">
                    3D Virtual Tour
                  </span>
                </div>
                <div className="text-[11px] text-stone-400 font-mono">
                  Waypoint {activeWaypointIndex + 1} of {waypoints.length} • {currentWaypoint.title}
                </div>
              </div>
            </div>

            {/* Quick Environment / Camera Controls */}
            <div className="flex items-center gap-2">
              
              {/* Lighting Mode Selector */}
              <div className="hidden md:flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
                {[
                  { id: 'golden', label: 'Golden Hour', icon: Sunset },
                  { id: 'day', label: 'Daylight', icon: Sun },
                  { id: 'night', label: 'Twilight', icon: Moon },
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isActive = lightingMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setLightingMode(mode.id as any)}
                      title={mode.label}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[11px]">{mode.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* FOV Lens Mode Selector */}
              <div className="hidden lg:flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
                {[
                  { id: 'wide', label: '16mm Wide' },
                  { id: 'standard', label: '24mm Lens' },
                  { id: 'telephoto', label: '50mm Focus' },
                ].map((lens) => (
                  <button
                    key={lens.id}
                    onClick={() => setLensMode(lens.id as any)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                      lensMode === lens.id
                        ? 'bg-stone-800 text-amber-300 font-bold border border-stone-700'
                        : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    {lens.label}
                  </button>
                ))}
              </div>

              {/* Sound Ambience Toggle */}
              <button
                onClick={() => setAmbientSound((prev) => !prev)}
                title={ambientSound ? 'Mute Alpine Breeze' : 'Enable Alpine Ambience Audio'}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  ambientSound
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {ambientSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* 3D CAMERA VIEWPORT STAGE */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative flex-1 bg-stone-950 overflow-hidden cursor-grab active:cursor-grabbing perspective-[1200px]"
          >
            
            {/* Animated 3D Camera Frustum Container */}
            <motion.div
              animate={{
                x: panOffset.x,
                y: panOffset.y,
                rotateY: (panOffset.x / 120) * 12 + currentWaypoint.cameraYaw * 0.4,
                rotateX: -(panOffset.y / 50) * 8 + currentWaypoint.cameraPitch * 0.4,
                scale: currentWaypoint.cameraZoom * lensZoomMultiplier,
              }}
              transition={{
                type: 'spring',
                damping: 24,
                stiffness: 120,
                mass: 0.8,
              }}
              className="absolute inset-0 w-full h-full transform-gpu origin-center will-change-transform"
            >
              {/* High-Resolution Scene Panoramic Texture */}
              <img
                src={currentWaypoint.imageUrl}
                alt={currentWaypoint.title}
                className={`w-full h-full object-cover transition-all duration-700 pointer-events-none ${lightingFilterClasses}`}
              />

              {/* Ambient Lighting Depth Gradient & Vignette */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                  lightingMode === 'golden'
                    ? 'bg-gradient-to-tr from-amber-950/40 via-transparent to-orange-500/10'
                    : lightingMode === 'night'
                    ? 'bg-gradient-to-b from-blue-950/60 via-stone-950/40 to-stone-950/90'
                    : 'bg-gradient-to-t from-stone-950/30 via-transparent to-stone-950/20'
                }`}
              />
              
              {/* Subtle Lens Glare Simulation in Golden Mode */}
              {lightingMode === 'golden' && (
                <div className="absolute top-10 right-20 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
              )}

              {/* 3D Interactive Hotspot Markers */}
              {currentWaypoint.hotspots.map((hs) => {
                const isSelected = selectedHotspotId === hs.id;
                return (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHotspotId(isSelected ? null : hs.id);
                      }}
                      className="relative group p-2 cursor-pointer outline-none"
                    >
                      {/* Pulse Ring */}
                      <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />
                      
                      {/* Central Glowing Pin */}
                      <span
                        className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all shadow-xl ${
                          isSelected
                            ? 'bg-amber-400 text-stone-950 border-white scale-125'
                            : 'bg-stone-950/90 border-amber-400 text-amber-300 hover:scale-115 hover:bg-amber-500 hover:text-stone-950'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </span>
                    </button>

                    {/* Hotspot Floating Tooltip Callout */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-11 left-1/2 -translate-x-1/2 w-64 sm:w-72 p-3.5 rounded-2xl bg-stone-950/95 border border-amber-500/60 shadow-2xl text-stone-100 backdrop-blur-xl z-30"
                        >
                          <div className="flex items-center justify-between border-b border-stone-800 pb-1.5 mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Architectural Detail</span>
                            </span>
                            <button
                              onClick={() => setSelectedHotspotId(null)}
                              className="text-stone-400 hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="font-serif font-bold text-xs text-stone-100 mb-1">
                            {hs.title}
                          </div>
                          <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                            {hs.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

            </motion.div>

            {/* LIVE TELEMETRY HUD OVERLAYS */}
            
            {/* Top-Left Room & Spec Metrics HUD */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col gap-2">
              <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800/80 backdrop-blur-md text-stone-200 max-w-xs shadow-lg">
                <div className="text-[10px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{currentWaypoint.type === 'exterior' ? 'Exterior Envelope' : 'Interior Room'}</span>
                </div>
                <div className="font-serif font-bold text-sm text-stone-100">
                  {currentWaypoint.title}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                  {currentWaypoint.subtitle}
                </div>
                
                {/* Room Specs Table */}
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-stone-800/80 text-[10px] font-mono">
                  <div>
                    <span className="text-stone-500 block">Dimensions:</span>
                    <span className="text-stone-200 font-semibold">{currentWaypoint.roomMetrics.area}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Height:</span>
                    <span className="text-stone-200 font-semibold">{currentWaypoint.roomMetrics.ceilingHeight}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-Left Compass / Orientation Radar Mini-Map */}
            <div className="absolute bottom-6 left-6 z-20 pointer-events-auto hidden sm:flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-stone-950/85 border border-stone-800/80 backdrop-blur-md flex items-center gap-3 shadow-xl">
                {/* Visual Compass Dial */}
                <div className="relative w-10 h-10 rounded-full border border-stone-700 bg-stone-900 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: panOffset.x * 0.8 + currentWaypoint.cameraYaw }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <div className="w-0.5 h-6 bg-gradient-to-t from-stone-600 via-amber-400 to-amber-500 rounded-full" />
                  </motion.div>
                  <span className="absolute top-0.5 text-[8px] font-mono font-bold text-amber-400">N</span>
                </div>
                
                <div className="text-[11px]">
                  <div className="font-mono font-bold text-stone-200 flex items-center gap-1.5">
                    <span>Camera Pan:</span>
                    <span className="text-amber-400 font-mono">
                      {Math.round(currentWaypoint.cameraYaw + (panOffset.x / 120) * 45)}°
                    </span>
                  </div>
                  <div className="text-stone-400 text-[10px]">
                    Drag stage to orbit 3D view
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Navigation Chevrons on Screen Sides */}
            <button
              onClick={handlePrevWaypoint}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-950/80 hover:bg-stone-900 border border-stone-700 text-stone-300 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-xl hover:scale-110"
              title="Previous Waypoint"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextWaypoint}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-950/80 hover:bg-stone-900 border border-stone-700 text-stone-300 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-xl hover:scale-110"
              title="Next Waypoint"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Hint Badge on Bottom-Center */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-950/80 border border-stone-800 text-[11px] text-stone-400 font-mono backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Click glowing pins for engineered timber specifications</span>
            </div>

          </div>

          {/* BOTTOM TIMELINE & WAYPOINT SCRUBBER */}
          <div className="relative z-30 p-4 sm:px-6 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Playback Controls & Waypoints Scrubber */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              
              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsAutoPanning((prev) => !prev)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                  isAutoPanning
                    ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800'
                }`}
                title={isAutoPanning ? 'Pause Cinematic Pan' : 'Resume Cinematic Pan'}
              >
                {isAutoPanning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Waypoint Thumbnail Tabs */}
              <div className="flex items-center gap-1.5">
                {waypoints.map((wp, idx) => {
                  const isActive = activeWaypointIndex === idx;
                  return (
                    <button
                      key={wp.id}
                      onClick={() => {
                        setActiveWaypointIndex(idx);
                        setSelectedHotspotId(null);
                        setPanOffset({ x: 0, y: 0 });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-amber-500/20 border border-amber-500 text-amber-300 shadow-md'
                          : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                      }`}
                    >
                      <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                      <span>{wp.title.split('&')[0].trim()}</span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Right Action CTAs */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={() => {
                  onClose();
                  onConfigure(cabin.id);
                }}
                className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Configure This Cabin</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onBookSurvey(`Virtual Tour Survey for ${cabin.name}`);
                }}
                className="py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Book Site Survey</span>
              </button>
            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
