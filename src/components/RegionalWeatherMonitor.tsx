import React, { useState, useEffect, useMemo } from 'react';
import { 
  CloudSun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Thermometer, 
  Droplets, 
  Gauge, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  HardHat, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  Layers, 
  Sun, 
  CloudLightning, 
  Eye, 
  Calendar,
  Building2,
  TreePine,
  Activity,
  Sliders
} from 'lucide-react';

export interface UKRegionWeather {
  id: string;
  name: string;
  county: string;
  country: string;
  lat: number;
  lon: number;
  elevationM: number;
  terrainType: string;
  defaultTemp: number;
  defaultApparent: number;
  defaultWindMph: number;
  defaultGustsMph: number;
  defaultHumidity: number;
  defaultPrecipMm: number;
  defaultWeatherCode: number;
  recommendedLogThickness: string;
  recommendedInsulationTier: string;
  recommendedUValue: string;
  designSnowLoadKPa: string;
  windExposureCategory: 'Severe / Exposed Coastal' | 'High Montane' | 'Upland Moderate' | 'Sheltered Lowland';
  keyConsiderations: string[];
}

export const UK_BUILD_REGIONS: UKRegionWeather[] = [
  {
    id: 'highlands',
    name: 'Scottish Highlands & Cairngorms',
    county: 'Inverness-shire & Perthshire',
    country: 'Scotland',
    lat: 57.19,
    lon: -3.83,
    elevationM: 380,
    terrainType: 'Sub-Arctic Pine Uplands & Glens',
    defaultTemp: 4.2,
    defaultApparent: 0.8,
    defaultWindMph: 18.5,
    defaultGustsMph: 28.0,
    defaultHumidity: 84,
    defaultPrecipMm: 0.2,
    defaultWeatherCode: 3, // Overcast
    recommendedLogThickness: '200mm – 240mm Laminated Glulam',
    recommendedInsulationTier: 'Arctic Passive Extreme (PIR + Aerogel core)',
    recommendedUValue: '0.10 – 0.12 W/m²K',
    designSnowLoadKPa: '2.85 kN/m² (Severe)',
    windExposureCategory: 'High Montane',
    keyConsiderations: [
      'Engineered for deep drifting snow packs and sub-zero frost penetration.',
      'Triple-glazed low-E argon units with warm-edge spacers required.',
      'Groundworks recommend galvanized ground screw foundations to avoid rock blasting.'
    ]
  },
  {
    id: 'lakes',
    name: 'Lake District & Pennine Fells',
    county: 'Cumbria',
    country: 'England',
    lat: 54.60,
    lon: -3.13,
    elevationM: 260,
    terrainType: 'High-Rainfall Montane Valley',
    defaultTemp: 7.5,
    defaultApparent: 5.2,
    defaultWindMph: 14.0,
    defaultGustsMph: 22.5,
    defaultHumidity: 88,
    defaultPrecipMm: 1.1,
    defaultWeatherCode: 61, // Light Rain
    recommendedLogThickness: '160mm – 200mm Twin-Wall Glulam',
    recommendedInsulationTier: 'Nordic Winter Twin-Wall (Woodfibre Breathable)',
    recommendedUValue: '0.13 – 0.15 W/m²K',
    designSnowLoadKPa: '1.95 kN/m²',
    windExposureCategory: 'High Montane',
    keyConsiderations: [
      '2,000mm+ annual rainfall requires elevated treated timber stilts or dry-stone plinth.',
      'Hydrophobic vapor-permeable membranes protect joints during high-humidity cycles.',
      'Deep roof eaves (800mm+) to deflect persistent driving valley squalls.'
    ]
  },
  {
    id: 'snowdonia',
    name: 'Snowdonia & West Coast Wales',
    county: 'Gwynedd & Conwy',
    country: 'Wales',
    lat: 53.09,
    lon: -3.80,
    elevationM: 210,
    terrainType: 'Atlantic Coastal Edge & Mountain Slopes',
    defaultTemp: 8.8,
    defaultApparent: 6.9,
    defaultWindMph: 16.2,
    defaultGustsMph: 26.0,
    defaultHumidity: 82,
    defaultPrecipMm: 0.4,
    defaultWeatherCode: 2, // Partly Cloudy
    recommendedLogThickness: '160mm – 180mm Nordic Glulam',
    recommendedInsulationTier: 'Nordic Winter Twin-Wall (Marine-Grade Seal)',
    recommendedUValue: '0.14 – 0.16 W/m²K',
    designSnowLoadKPa: '1.60 kN/m²',
    windExposureCategory: 'Severe / Exposed Coastal',
    keyConsiderations: [
      'Corrosion-resistant 316 A4 stainless steel fixing anchors for saline air defense.',
      'Enhanced roof anchoring straps for Atlantic Category 9 gale resistance.',
      'Natural Siberian larch or thermo-pine exterior cladding for moss resistance.'
    ]
  },
  {
    id: 'yorkshire',
    name: 'Yorkshire Dales & Moors',
    county: 'North Yorkshire',
    country: 'England',
    lat: 54.30,
    lon: -2.20,
    elevationM: 310,
    terrainType: 'Exposed Limestone Plateaus & Valleys',
    defaultTemp: 6.8,
    defaultApparent: 4.1,
    defaultWindMph: 13.5,
    defaultGustsMph: 21.0,
    defaultHumidity: 80,
    defaultPrecipMm: 0.0,
    defaultWeatherCode: 1, // Mainly Clear
    recommendedLogThickness: '140mm – 180mm Glulam Pine',
    recommendedInsulationTier: 'Nordic Winter Specification',
    recommendedUValue: '0.15 – 0.17 W/m²K',
    designSnowLoadKPa: '1.75 kN/m²',
    windExposureCategory: 'Upland Moderate',
    keyConsiderations: [
      'High seasonal temperature variance benefits from dense Glulam thermal flywheel mass.',
      'Ground screw pile system ideal for karstic limestone soil profiles.',
      'Integrated solar PV roof pitch optimization (35° south-facing angle).'
    ]
  },
  {
    id: 'cotswolds',
    name: 'Cotswolds & Home Counties',
    county: 'Gloucestershire & Oxfordshire',
    country: 'England',
    lat: 51.72,
    lon: -1.97,
    elevationM: 140,
    terrainType: 'Gentle Rolling Hills & Parkland',
    defaultTemp: 11.2,
    defaultApparent: 10.5,
    defaultWindMph: 8.5,
    defaultGustsMph: 14.0,
    defaultHumidity: 74,
    defaultPrecipMm: 0.0,
    defaultWeatherCode: 0, // Clear Sky
    recommendedLogThickness: '90mm – 140mm Precision Milled Pine',
    recommendedInsulationTier: 'Standard Nordic Plus (High Solar Control Glazing)',
    recommendedUValue: '0.18 – 0.20 W/m²K',
    designSnowLoadKPa: '1.10 kN/m²',
    windExposureCategory: 'Sheltered Lowland',
    keyConsiderations: [
      'High summer solar gain requires low-G solar reflective glazing to prevent overheating.',
      'Permitted development compliance optimized for 4m ridge / 2.5m eaves limits.',
      'Rapid 3–5 day precision timber shell assembly feasible throughout most seasons.'
    ]
  },
  {
    id: 'cornwall',
    name: 'Cornish Coast & South West',
    county: 'Cornwall & Devon',
    country: 'England',
    lat: 50.21,
    lon: -5.48,
    elevationM: 75,
    terrainType: 'Maritime Coastal Cliff & Woodland Valleys',
    defaultTemp: 12.4,
    defaultApparent: 11.8,
    defaultWindMph: 17.0,
    defaultGustsMph: 27.5,
    defaultHumidity: 86,
    defaultPrecipMm: 0.6,
    defaultWeatherCode: 51, // Drizzle
    recommendedLogThickness: '140mm – 180mm Treated Maritime Glulam',
    recommendedInsulationTier: 'Nordic Moisture-Shield Specification',
    recommendedUValue: '0.16 – 0.18 W/m²K',
    designSnowLoadKPa: '0.90 kN/m²',
    windExposureCategory: 'Severe / Exposed Coastal',
    keyConsiderations: [
      'Specialized micro-porous breathable timber stain prevents salt-crust trapping.',
      'High-velocity wind load anchoring brackets on all structural purlins.',
      'Ideal for year-round high-yield holiday letting due to frost-free winters.'
    ]
  }
];

interface LiveRegionData {
  temp: number;
  apparentTemp: number;
  windSpeedMph: number;
  windGustsMph: number;
  humidity: number;
  precipMm: number;
  weatherCode: number;
  isLive: boolean;
  lastUpdated: string;
}

interface RegionalWeatherMonitorProps {
  onBookSiteSurvey?: (regionName?: string) => void;
  onExploreLandInRegion?: (regionId: string) => void;
}

export const RegionalWeatherMonitor: React.FC<RegionalWeatherMonitorProps> = ({
  onBookSiteSurvey,
  onExploreLandInRegion,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('highlands');
  const [weatherMap, setWeatherMap] = useState<Record<string, LiveRegionData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [activePhaseFilter, setActivePhaseFilter] = useState<'all' | 'groundworks' | 'crane' | 'timber-shell' | 'glazing'>('all');

  const selectedRegion = useMemo(() => {
    return UK_BUILD_REGIONS.find((r) => r.id === selectedRegionId) || UK_BUILD_REGIONS[0];
  }, [selectedRegionId]);

  // Fetch real-time weather from Open-Meteo for all UK regions
  const fetchLiveWeatherData = async () => {
    setIsLoading(true);
    const newMap: Record<string, LiveRegionData> = {};

    try {
      // Parallel fetch for all regions
      await Promise.all(
        UK_BUILD_REGIONS.map(async (region) => {
          try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_gusts_10m&wind_speed_unit=mph&precipitation_unit=mm`;
            const res = await fetch(url);
            if (res.ok) {
              const data = await res.json();
              const current = data.current;
              newMap[region.id] = {
                temp: Number(current.temperature_2m.toFixed(1)),
                apparentTemp: Number(current.apparent_temperature.toFixed(1)),
                windSpeedMph: Number(current.wind_speed_10m.toFixed(1)),
                windGustsMph: Number(current.wind_gusts_10m.toFixed(1)),
                humidity: Math.round(current.relative_humidity_2m),
                precipMm: Number(current.precipitation.toFixed(1)),
                weatherCode: current.weather_code,
                isLive: true,
                lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
            } else {
              throw new Error('API response not ok');
            }
          } catch (e) {
            // Fallback to calibrated region defaults
            newMap[region.id] = {
              temp: region.defaultTemp,
              apparentTemp: region.defaultApparent,
              windSpeedMph: region.defaultWindMph,
              windGustsMph: region.defaultGustsMph,
              humidity: region.defaultHumidity,
              precipMm: region.defaultPrecipMm,
              weatherCode: region.defaultWeatherCode,
              isLive: false,
              lastUpdated: 'Live estimate'
            };
          }
        })
      );
      setWeatherMap(newMap);
      setLastRefreshed(new Date());
    } catch (err) {
      console.warn('Could not fetch real-time weather, using calibrated defaults', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveWeatherData();
  }, []);

  const activeWeather: LiveRegionData = weatherMap[selectedRegionId] || {
    temp: selectedRegion.defaultTemp,
    apparentTemp: selectedRegion.defaultApparent,
    windSpeedMph: selectedRegion.defaultWindMph,
    windGustsMph: selectedRegion.defaultGustsMph,
    humidity: selectedRegion.defaultHumidity,
    precipMm: selectedRegion.defaultPrecipMm,
    weatherCode: selectedRegion.defaultWeatherCode,
    isLive: false,
    lastUpdated: 'Live estimate'
  };

  // Interpret WMO weather codes
  const getWeatherDetails = (code: number) => {
    if (code === 0) return { label: 'Clear Sky', icon: Sun, color: 'text-amber-400' };
    if (code === 1 || code === 2) return { label: 'Partly Cloudy', icon: CloudSun, color: 'text-stone-300' };
    if (code === 3) return { label: 'Overcast & Dense Cloud', icon: CloudSun, color: 'text-stone-400' };
    if (code >= 45 && code <= 48) return { label: 'Valley Fog & Mist', icon: Droplets, color: 'text-cyan-300' };
    if (code >= 51 && code <= 55) return { label: 'Light Drizzle', icon: CloudRain, color: 'text-sky-400' };
    if (code >= 61 && code <= 65) return { label: 'Steady Rain', icon: CloudRain, color: 'text-blue-400' };
    if (code >= 71 && code <= 77) return { label: 'Snow / Sleet Flurries', icon: CloudSnow, color: 'text-cyan-200' };
    if (code >= 80 && code <= 82) return { label: 'Heavy Showers', icon: CloudRain, color: 'text-blue-500' };
    if (code >= 95) return { label: 'Gale / Thunder Squall', icon: CloudLightning, color: 'text-amber-500' };
    return { label: 'Cloudy / Breezy', icon: CloudSun, color: 'text-stone-300' };
  };

  const weatherInfo = getWeatherDetails(activeWeather.weatherCode);
  const WeatherIcon = weatherInfo.icon;

  // Build Feasibility Calculations
  const calculateFeasibility = () => {
    const wind = activeWeather.windSpeedMph;
    const precip = activeWeather.precipMm;
    const temp = activeWeather.temp;

    // Groundworks (Screw-piles & excavation)
    let groundworksScore = 95;
    let groundworksNote = 'Optimal soil conditions for rapid screw-pile installation.';
    let groundworksStatus: 'Optimal' | 'Caution' | 'Delayed' = 'Optimal';

    if (temp < -2) {
      groundworksScore -= 40;
      groundworksStatus = 'Caution';
      groundworksNote = 'Ground frost detected; pre-drilling pilot holes advised for steel piles.';
    }
    if (precip > 2.0) {
      groundworksScore -= 30;
      groundworksStatus = 'Caution';
      groundworksNote = 'High surface water runoff; track mats required for machinery access.';
    }

    // Crane & Heavy Log Kit Lift
    let craneScore = 98;
    let craneStatus: 'Optimal' | 'Caution' | 'Delayed' = 'Optimal';
    let craneNote = 'Wind speeds well within safe BS 7121 mobile crane lifting thresholds (<24 mph).';

    if (wind > 24 || activeWeather.windGustsMph > 32) {
      craneScore = 20;
      craneStatus = 'Delayed';
      craneNote = 'Gale gusts exceed crane safety cutoffs (30 mph+); hiab lifting paused.';
    } else if (wind > 16) {
      craneScore = 65;
      craneStatus = 'Caution';
      craneNote = 'Breezy conditions; taglines mandatory for large roof purlin placement.';
    }

    // Timber Shell Assembly & Tongue-and-Groove Interlock
    let shellScore = 95;
    let shellStatus: 'Optimal' | 'Caution' | 'Delayed' = 'Optimal';
    let shellNote = 'Dry humidity window; ideal for rapid interlocking log erection.';

    if (precip > 1.5) {
      shellScore = 45;
      shellStatus = 'Caution';
      shellNote = 'Moisture protection tarpaulins required during open wall staging.';
    } else if (precip > 0.1) {
      shellScore = 75;
      shellStatus = 'Caution';
      shellNote = 'Light damp; immediate roof membrane roll-out recommended after stacking.';
    }

    // Glazing & Weather-Tight Seal
    let glazingScore = 92;
    let glazingStatus: 'Optimal' | 'Caution' | 'Delayed' = 'Optimal';
    let glazingNote = 'Standard temperature window for expanding airtight sealing tapes.';

    if (temp < 3) {
      glazingScore = 65;
      glazingStatus = 'Caution';
      glazingNote = 'Cold temperatures slow curing of structural polymer sealants; heat guns used.';
    }

    // Overall index
    const overallScore = Math.round((groundworksScore + craneScore + shellScore + glazingScore) / 4);

    return {
      overallScore,
      groundworks: { score: groundworksScore, status: groundworksStatus, note: groundworksNote },
      crane: { score: craneScore, status: craneStatus, note: craneNote },
      shell: { score: shellScore, status: shellStatus, note: shellNote },
      glazing: { score: glazingScore, status: glazingStatus, note: glazingNote }
    };
  };

  const feasibility = calculateFeasibility();

  return (
    <section id="regional-weather" className="py-20 bg-stone-950 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>Real-Time UK Meteorological Feasibility</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight">
              Live Regional Weather & Build Readiness Monitor
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Monitor real-time atmospheric conditions, wind-load ratings, and seasonal microclimates across our active build regions to plan foundation engineering, timber delivery schedules, and thermal specifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLiveWeatherData}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              title="Refresh live meteorological telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Updating Telemetry...' : 'Refresh Live Telemetry'}</span>
            </button>

            <button
              onClick={() => onBookSiteSurvey && onBookSiteSurvey(selectedRegion.name)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-950/50"
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>Book Regional Site Survey</span>
            </button>
          </div>
        </div>

        {/* Region Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {UK_BUILD_REGIONS.map((region) => {
            const data = weatherMap[region.id];
            const isSelected = selectedRegionId === region.id;
            const tempDisplay = data ? `${data.temp}°C` : `${region.defaultTemp}°C`;

            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegionId(region.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-950/40'
                    : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 truncate">
                      {region.country}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    )}
                  </div>
                  <h4 className="font-semibold text-xs text-stone-100 line-clamp-1">
                    {region.name.split('&')[0]}
                  </h4>
                </div>

                <div className="mt-3 flex items-baseline justify-between pt-2 border-t border-stone-800/80">
                  <span className="font-mono text-base font-bold text-stone-200">
                    {tempDisplay}
                  </span>
                  <span className="text-[10px] text-stone-400 truncate max-w-[80px]">
                    {region.county.split('&')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Weather & Feasibility Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Live Meteorological Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Region Banner Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{selectedRegion.county} • {selectedRegion.country}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {selectedRegion.name}
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Elevation: {selectedRegion.elevationM}m AMSL • {selectedRegion.terrainType}
                </p>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-stone-800/80 border border-stone-700 text-[10px] font-medium text-emerald-400 flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{activeWeather.isLive ? 'Live Sensor Feed' : 'Calibrated Feed'}</span>
              </div>
            </div>

            {/* Main Temperature & Visualizer */}
            <div className="p-6 rounded-2xl bg-stone-950/80 border border-stone-800/90 flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 shadow-inner">
                  <WeatherIcon className={`w-10 h-10 ${weatherInfo.color}`} />
                </div>
                <div>
                  <div className="font-mono text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    {activeWeather.temp}°<span className="text-2xl font-sans text-stone-400">C</span>
                  </div>
                  <div className="text-xs text-stone-400 mt-1">
                    Feels like <strong className="text-stone-200">{activeWeather.apparentTemp}°C</strong>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs font-semibold text-stone-200">
                  {weatherInfo.label}
                </span>
                <div className="text-[10px] text-stone-400 mt-1.5">
                  Updated: {activeWeather.lastUpdated}
                </div>
              </div>
            </div>

            {/* 4 Meteorological Sensor Gauges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sustained Wind</span>
                </div>
                <div className="font-mono text-lg font-bold text-stone-100">
                  {activeWeather.windSpeedMph} <span className="text-xs font-normal text-stone-400">mph</span>
                </div>
                <div className="text-[10px] text-stone-400">
                  Gusts to <strong className="text-amber-400">{activeWeather.windGustsMph} mph</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
                  <Droplets className="w-3.5 h-3.5 text-sky-400" />
                  <span>Relative Humidity</span>
                </div>
                <div className="font-mono text-lg font-bold text-stone-100">
                  {activeWeather.humidity}%
                </div>
                <div className="text-[10px] text-stone-400">
                  Precip: <strong className="text-stone-200">{activeWeather.precipMm} mm/h</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
                  <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Design Snow Load</span>
                </div>
                <div className="font-mono text-sm font-bold text-stone-100">
                  {selectedRegion.designSnowLoadKPa}
                </div>
                <div className="text-[10px] text-stone-400 truncate">
                  BS EN 1991-1-3 Standard
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Wind Exposure</span>
                </div>
                <div className="font-mono text-xs font-bold text-amber-300 truncate">
                  {selectedRegion.windExposureCategory}
                </div>
                <div className="text-[10px] text-stone-400">
                  A4 Marine fixings
                </div>
              </div>
            </div>

            {/* Regional Structural Engineering Prescription */}
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <TreePine className="w-4 h-4 text-amber-400" />
                <span>Regional Log Cabin Prescription</span>
              </div>
              <div className="space-y-1 text-xs text-stone-300">
                <div className="flex items-baseline justify-between border-b border-amber-900/30 pb-1">
                  <span className="text-stone-400">Recommended Log Profile:</span>
                  <span className="font-semibold text-white">{selectedRegion.recommendedLogThickness}</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-amber-900/30 pb-1">
                  <span className="text-stone-400">Target Envelope U-Value:</span>
                  <span className="font-mono font-bold text-amber-300">{selectedRegion.recommendedUValue}</span>
                </div>
                <div className="flex items-baseline justify-between pt-0.5">
                  <span className="text-stone-400">Insulation System:</span>
                  <span className="text-stone-200 text-right truncate max-w-[200px]">{selectedRegion.recommendedInsulationTier}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Build Feasibility Index & Task Breakdown (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Feasibility Header & Score */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Real-Time Construction Feasibility</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-stone-100">
                    Live Build Readiness Index
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Automated safety gate algorithm evaluating crane safety, ground saturation, and timber staging.
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-stone-950 p-3 rounded-2xl border border-stone-800 shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-stone-400">Readiness Score</div>
                    <div className="text-xs font-bold text-emerald-400">
                      {feasibility.overallScore >= 85 ? 'Optimal Window' : feasibility.overallScore >= 60 ? 'Moderate Caution' : 'Adverse Hold'}
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center font-mono text-2xl font-bold text-emerald-400 shadow-lg shadow-emerald-950/50">
                    {feasibility.overallScore}%
                  </div>
                </div>
              </div>

              {/* 4 Build Stages Feasibility Breakdown */}
              <div className="mt-6 space-y-3.5">
                {/* 1. Groundworks & Foundation Piling */}
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-stone-700 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-200">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>1. Groundworks & Screw-Pile Rig Access</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      feasibility.groundworks.status === 'Optimal'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : 'bg-amber-950 text-amber-400 border border-amber-800/60'
                    }`}>
                      {feasibility.groundworks.status} ({feasibility.groundworks.score}%)
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 pl-4">
                    {feasibility.groundworks.note}
                  </p>
                </div>

                {/* 2. Crane Lift & Purlin Placement */}
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-stone-700 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-200">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>2. Heavy Glulam Crane & Hiab Hoisting</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      feasibility.crane.status === 'Optimal'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : feasibility.crane.status === 'Caution'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                        : 'bg-rose-950 text-rose-400 border border-rose-800/60'
                    }`}>
                      {feasibility.crane.status} ({feasibility.crane.score}%)
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 pl-4">
                    {feasibility.crane.note}
                  </p>
                </div>

                {/* 3. Timber Shell Erection */}
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-stone-700 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-200">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>3. Precision Tongue & Groove Stacking</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      feasibility.shell.status === 'Optimal'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : 'bg-amber-950 text-amber-400 border border-amber-800/60'
                    }`}>
                      {feasibility.shell.status} ({feasibility.shell.score}%)
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 pl-4">
                    {feasibility.shell.note}
                  </p>
                </div>

                {/* 4. Airtight Glazing & Membrane Seal */}
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-stone-700 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-stone-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>4. Triple Glazing & Passivhaus Membrane Seal</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      feasibility.glazing.status === 'Optimal'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                        : 'bg-amber-950 text-amber-400 border border-amber-800/60'
                    }`}>
                      {feasibility.glazing.status} ({feasibility.glazing.score}%)
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 pl-4">
                    {feasibility.glazing.note}
                  </p>
                </div>
              </div>

              {/* Regional Engineering Safeguards */}
              <div className="mt-6 p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-2">
                <div className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Site Specific Microclimate Safeguards:</span>
                </div>
                <ul className="space-y-1 text-xs text-stone-400 list-disc list-inside">
                  {selectedRegion.keyConsiderations.map((note, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-400">
                Planning a project in <strong className="text-white">{selectedRegion.name}</strong>?
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {onExploreLandInRegion && (
                  <button
                    onClick={() => onExploreLandInRegion(selectedRegion.id)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>View Plots In Region</span>
                  </button>
                )}

                <button
                  onClick={() => onBookSiteSurvey && onBookSiteSurvey(selectedRegion.name)}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 cursor-pointer"
                >
                  <span>Request Regional Engineering Pack</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
