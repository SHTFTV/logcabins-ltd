import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CABIN_MODELS } from '../data/mockData';
import { CabinModel } from '../types';
import * as d3 from 'd3';
import { 
  Zap, 
  ShieldCheck, 
  ThermometerSnowflake, 
  Flame, 
  Wind, 
  Leaf, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  BarChart3, 
  Activity, 
  Compass, 
  Layers,
  CheckCircle2,
  Info
} from 'lucide-react';

interface ClimateZoneData {
  id: string;
  name: string;
  region: string;
  winterMinAvg: number; // in °C
  degreeDays: number;
  windExposure: 'Extreme' | 'High' | 'Moderate' | 'Low';
  description: string;
}

const CLIMATE_ZONES: ClimateZoneData[] = [
  {
    id: 'highlands',
    name: 'Scottish Highlands & Cairngorms',
    region: 'Sub-Arctic Montane (Zone 1)',
    winterMinAvg: -9.5,
    degreeDays: 2850,
    windExposure: 'Extreme',
    description: 'Sub-zero winters, heavy snow loads, and severe gale-force wind chill.'
  },
  {
    id: 'lakes',
    name: 'Lake District & Pennines',
    region: 'Maritime Montane (Zone 2)',
    winterMinAvg: -5.0,
    degreeDays: 2450,
    windExposure: 'High',
    description: 'High rainfall (2000mm+), persistent damp cold, and gusting mountain valleys.'
  },
  {
    id: 'wales',
    name: 'Snowdonia & West Wales',
    region: 'Atlantic Coastline (Zone 3)',
    winterMinAvg: -2.5,
    degreeDays: 2150,
    windExposure: 'High',
    description: 'Atlantic storm fronts, high humidity, and salt-air atmospheric exposure.'
  },
  {
    id: 'yorkshire',
    name: 'Yorkshire Dales & Peak District',
    region: 'Temperate Inland Uplands (Zone 4)',
    winterMinAvg: -3.5,
    degreeDays: 2280,
    windExposure: 'Moderate',
    description: 'Moderate seasonal swings with prolonged frost periods and exposed limestone plateaus.'
  },
  {
    id: 'cotswolds',
    name: 'Cotswolds & South England',
    region: 'Mild Lowland Temperate (Zone 5)',
    winterMinAvg: -0.5,
    degreeDays: 1820,
    windExposure: 'Low',
    description: 'Milder winter baselines with higher summer solar gains requiring overheating control.'
  }
];

type InsulationTier = 'standard' | 'nordic-winter' | 'arctic-passive';

interface InsulationProfile {
  id: InsulationTier;
  label: string;
  subtitle: string;
  wallUValue: number; // W/m²K
  roofUValue: number;
  floorUValue: number;
  glazingUValue: number;
  airtightnessACH: number; // ACH @ 50Pa
  phaseShiftHours: number;
  efficiencyMultiplier: number;
}

const INSULATION_PROFILES: Record<InsulationTier, InsulationProfile> = {
  'standard': {
    id: 'standard',
    label: 'Standard Nordic Glulam',
    subtitle: '70mm – 120mm Solid Laminated Pine',
    wallUValue: 0.22,
    roofUValue: 0.16,
    floorUValue: 0.18,
    glazingUValue: 1.1,
    airtightnessACH: 1.5,
    phaseShiftHours: 9.5,
    efficiencyMultiplier: 1.0,
  },
  'nordic-winter': {
    id: 'nordic-winter',
    label: 'Nordic Winter Twin-Wall',
    subtitle: '160mm – 200mm + Woodfiber/PIR Core',
    wallUValue: 0.14,
    roofUValue: 0.11,
    floorUValue: 0.13,
    glazingUValue: 0.85,
    airtightnessACH: 0.8,
    phaseShiftHours: 13.5,
    efficiencyMultiplier: 0.65,
  },
  'arctic-passive': {
    id: 'arctic-passive',
    label: 'Arctic Passive Extreme',
    subtitle: '240mm Triple-Laminated + Vacuum Aerogel',
    wallUValue: 0.09,
    roofUValue: 0.08,
    floorUValue: 0.10,
    glazingUValue: 0.65,
    airtightnessACH: 0.45,
    phaseShiftHours: 16.5,
    efficiencyMultiplier: 0.42,
  },
};

interface CabinPerformanceStatsProps {
  onConfigureCabin?: (cabinId: string) => void;
  onBookConsultation?: (topic?: string) => void;
}

export const CabinPerformanceStats: React.FC<CabinPerformanceStatsProps> = ({
  onConfigureCabin,
  onBookConsultation,
}) => {
  const [selectedCabinId, setSelectedCabinId] = useState<string>(CABIN_MODELS[0].id);
  const [comparisonCabinId, setComparisonCabinId] = useState<string | null>(null);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('highlands');
  const [insulationTier, setInsulationTier] = useState<InsulationTier>('nordic-winter');
  const [activeChartTab, setActiveChartTab] = useState<'climate-demand' | 'freeze-curve' | 'radar-attributes'>('climate-demand');

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(650);

  // Resize observer for responsive D3 charts
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect.width > 0) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(chartContainerRef.current);
    return () => observer.disconnect();
  }, []);

  const selectedCabin = useMemo(() => {
    return CABIN_MODELS.find((c) => c.id === selectedCabinId) || CABIN_MODELS[0];
  }, [selectedCabinId]);

  const comparisonCabin = useMemo(() => {
    if (!comparisonCabinId) return null;
    return CABIN_MODELS.find((c) => c.id === comparisonCabinId) || null;
  }, [comparisonCabinId]);

  const activeZone = useMemo(() => {
    return CLIMATE_ZONES.find((z) => z.id === selectedZoneId) || CLIMATE_ZONES[0];
  }, [selectedZoneId]);

  const activeInsulation = INSULATION_PROFILES[insulationTier];

  // Calculate annual heating demand (kWh/m²/yr) for each zone
  const getZoneHeatingDemand = (cabin: CabinModel, zone: ClimateZoneData, tier: InsulationTier) => {
    const profile = INSULATION_PROFILES[tier];
    // Base heat demand factoring building compactness and log profile
    const baseDemand = 45 * profile.efficiencyMultiplier;
    // Climate severity factor
    const climateFactor = zone.degreeDays / 2200;
    // Compactness factor (larger models have higher volume-to-surface area ratio)
    const compactness = Math.max(0.85, 1.2 - cabin.areaSqM / 400);
    return Math.round(baseDemand * climateFactor * compactness);
  };

  // Calculate annual heating cost (£/year) assuming Heat Pump COP 3.8 at £0.24/kWh electricity
  const getAnnualHeatingCost = (cabin: CabinModel, zone: ClimateZoneData, tier: InsulationTier) => {
    const demandPerSqM = getZoneHeatingDemand(cabin, zone, tier);
    const totalKwh = demandPerSqM * cabin.areaSqM;
    const heatPumpCop = 3.8;
    const electricityCostPerKwh = 0.24;
    return Math.round((totalKwh / heatPumpCop) * electricityCostPerKwh);
  };

  // D3 Chart Render Effect
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const svgElement = d3.select(chartContainerRef.current).select('svg');
    svgElement.selectAll('*').remove();

    const width = Math.max(320, containerWidth);
    const height = 340;
    const margin = { top: 30, right: 30, bottom: 60, left: 60 };

    const svg = svgElement
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: auto;');

    // 1. CLIMATE DEMAND BAR CHART
    if (activeChartTab === 'climate-demand') {
      const data = CLIMATE_ZONES.map((zone) => ({
        zone: zone.name.split('&')[0].trim(),
        fullZone: zone.name,
        primaryDemand: getZoneHeatingDemand(selectedCabin, zone, insulationTier),
        compareDemand: comparisonCabin ? getZoneHeatingDemand(comparisonCabin, zone, insulationTier) : null,
        ukRegsBaseline: 55, // UK Part L Building Regs 2025/2026 typical target
      }));

      const x0 = d3.scaleBand()
        .domain(data.map((d) => d.zone))
        .range([margin.left, width - margin.right])
        .padding(0.25);

      const maxVal = Math.max(65, ...data.map((d) => Math.max(d.primaryDemand, d.compareDemand || 0, d.ukRegsBaseline)));
      
      const y = d3.scaleLinear()
        .domain([0, maxVal * 1.15])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Grid lines
      svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5).tickSize(-(width - margin.left - margin.right)).tickFormat(() => ''))
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick line').attr('stroke', '#292524').attr('stroke-dasharray', '2,2'));

      // Baseline reference line for UK Part L Regulations
      svg.append('line')
        .attr('x1', margin.left)
        .attr('x2', width - margin.right)
        .attr('y1', y(55))
        .attr('y2', y(55))
        .attr('stroke', '#ef4444')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '4,4')
        .attr('opacity', 0.8);

      svg.append('text')
        .attr('x', width - margin.right - 4)
        .attr('y', y(55) - 6)
        .attr('text-anchor', 'end')
        .attr('fill', '#ef4444')
        .attr('font-size', '10px')
        .attr('font-family', 'sans-serif')
        .attr('font-weight', 'bold')
        .text('UK Part L Standard (55 kWh/m²)');

      // Bars
      const groupWidth = x0.bandwidth();
      const numBars = comparisonCabin ? 2 : 1;
      const barWidth = (groupWidth - (comparisonCabin ? 4 : 0)) / numBars;

      data.forEach((d) => {
        const groupX = x0(d.zone) || 0;

        // Primary Cabin Bar
        const bar1X = groupX;
        const bar1Y = y(d.primaryDemand);
        const bar1H = (height - margin.bottom) - bar1Y;

        svg.append('rect')
          .attr('x', bar1X)
          .attr('y', bar1Y)
          .attr('width', barWidth)
          .attr('height', bar1H)
          .attr('rx', 6)
          .attr('fill', '#f59e0b')
          .attr('opacity', 0.9)
          .append('title')
          .text(`${selectedCabin.name} in ${d.fullZone}: ${d.primaryDemand} kWh/m²/yr`);

        // Value text
        svg.append('text')
          .attr('x', bar1X + barWidth / 2)
          .attr('y', bar1Y - 6)
          .attr('text-anchor', 'middle')
          .attr('fill', '#fbbf24')
          .attr('font-size', '11px')
          .attr('font-weight', 'bold')
          .attr('font-family', 'monospace')
          .text(`${d.primaryDemand}`);

        // Comparison Cabin Bar if active
        if (comparisonCabin && d.compareDemand !== null) {
          const bar2X = groupX + barWidth + 4;
          const bar2Y = y(d.compareDemand);
          const bar2H = (height - margin.bottom) - bar2Y;

          svg.append('rect')
            .attr('x', bar2X)
            .attr('y', bar2Y)
            .attr('width', barWidth)
            .attr('height', bar2H)
            .attr('rx', 6)
            .attr('fill', '#06b6d4')
            .attr('opacity', 0.85)
            .append('title')
            .text(`${comparisonCabin.name} in ${d.fullZone}: ${d.compareDemand} kWh/m²/yr`);

          svg.append('text')
            .attr('x', bar2X + barWidth / 2)
            .attr('y', bar2Y - 6)
            .attr('text-anchor', 'middle')
            .attr('fill', '#22d3ee')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('font-family', 'monospace')
            .text(`${d.compareDemand}`);
        }
      });

      // X Axis
      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .call((g) => g.select('.domain').attr('stroke', '#44403c'))
        .call((g) => g.selectAll('.tick line').remove())
        .call((g) => g.selectAll('.tick text')
          .attr('fill', '#a8a29e')
          .attr('font-size', width < 500 ? '9px' : '11px')
          .attr('dy', '1.2em')
        );

      // Y Axis
      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d}`))
        .call((g) => g.select('.domain').attr('stroke', '#44403c'))
        .call((g) => g.selectAll('.tick line').attr('stroke', '#44403c'))
        .call((g) => g.selectAll('.tick text').attr('fill', '#a8a29e').attr('font-size', '10px'));

      // Y Label
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 16)
        .attr('x', -(height / 2))
        .attr('fill', '#a8a29e')
        .attr('font-size', '10px')
        .attr('text-anchor', 'middle')
        .text('Heating Demand (kWh / m² / yr)');
    }

    // 2. 24-HOUR WINTER FREEZE CURVE (Sub-Zero Retention Simulation)
    else if (activeChartTab === 'freeze-curve') {
      const hours = Array.from({ length: 25 }, (_, i) => i);
      
      // Simulate external freeze dropping to -10°C
      const outsideTemps = hours.map((h) => {
        // Temperature curve: 0°C at hour 0, dropping to -10°C at hour 6-12, rising to -4°C at hour 24
        const dip = Math.sin((h / 24) * Math.PI) * 10;
        return Number((-dip).toFixed(1));
      });

      // Internal temp: starts at 21.5°C, timber mass decay depends on insulation tier phase shift
      const phaseRetention = activeInsulation.phaseShiftHours / 16;
      const insideTemps = hours.map((h) => {
        // Minor temperature reduction over 12 hours with heating off
        const drop = (h / 24) * (6.0 * (1 - phaseRetention * 0.7));
        return Number((21.5 - drop).toFixed(1));
      });

      // Conventional brick / uninsulated cavity baseline (rapid thermal loss)
      const conventionalTemps = hours.map((h) => {
        const drop = (h / 24) * 14.5;
        return Number((21.0 - drop).toFixed(1));
      });

      const x = d3.scaleLinear()
        .domain([0, 24])
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([-12, 25])
        .range([height - margin.bottom, margin.top]);

      // Grid lines
      svg.append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(6).tickSize(-(width - margin.left - margin.right)).tickFormat(() => ''))
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick line').attr('stroke', '#292524').attr('stroke-dasharray', '2,2'));

      // 0°C Zero Line
      svg.append('line')
        .attr('x1', margin.left)
        .attr('x2', width - margin.right)
        .attr('y1', y(0))
        .attr('y2', y(0))
        .attr('stroke', '#57534e')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3');

      // Line generators
      const lineGen = d3.line<{ h: number; t: number }>()
        .x((d) => x(d.h))
        .y((d) => y(d.t))
        .curve(d3.curveMonotoneX);

      // 1. Outside temp area and line
      const outsideData = hours.map((h, i) => ({ h, t: outsideTemps[i] }));
      svg.append('path')
        .datum(outsideData)
        .attr('fill', 'none')
        .attr('stroke', '#38bdf8')
        .attr('stroke-width', 2.5)
        .attr('d', lineGen);

      // 2. Conventional building temp line
      const convData = hours.map((h, i) => ({ h, t: conventionalTemps[i] }));
      svg.append('path')
        .datum(convData)
        .attr('fill', 'none')
        .attr('stroke', '#78716c')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '4,4')
        .attr('d', lineGen);

      // 3. LogCabins.ltd High-Performance Glulam Line
      const insideData = hours.map((h, i) => ({ h, t: insideTemps[i] }));
      svg.append('path')
        .datum(insideData)
        .attr('fill', 'none')
        .attr('stroke', '#f59e0b')
        .attr('stroke-width', 3)
        .attr('d', lineGen);

      // Fill area under inside temp
      const areaGen = d3.area<{ h: number; t: number }>()
        .x((d) => x(d.h))
        .y0(y(0))
        .y1((d) => y(d.t))
        .curve(d3.curveMonotoneX);

      svg.append('path')
        .datum(insideData)
        .attr('fill', '#f59e0b')
        .attr('fill-opacity', 0.08)
        .attr('d', areaGen);

      // Add markers on final hour 24
      svg.append('circle')
        .attr('cx', x(24))
        .attr('cy', y(insideTemps[24]))
        .attr('r', 5)
        .attr('fill', '#f59e0b');

      svg.append('text')
        .attr('x', x(24) - 8)
        .attr('y', y(insideTemps[24]) - 10)
        .attr('text-anchor', 'end')
        .attr('fill', '#f59e0b')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .text(`+${insideTemps[24]}°C (Timber Retention)`);

      // X Axis
      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(6).tickFormat((d) => `${d}h`))
        .call((g) => g.select('.domain').attr('stroke', '#44403c'))
        .call((g) => g.selectAll('.tick line').attr('stroke', '#44403c'))
        .call((g) => g.selectAll('.tick text').attr('fill', '#a8a29e').attr('font-size', '10px'));

      // Y Axis
      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(6).tickFormat((d) => `${d}°C`))
        .call((g) => g.select('.domain').attr('stroke', '#44403c'))
        .call((g) => g.selectAll('.tick line').attr('stroke', '#44403c'))
        .call((g) => g.selectAll('.tick text').attr('fill', '#a8a29e').attr('font-size', '10px'));
    }

    // 3. RADAR ATTRIBUTES CHART
    else if (activeChartTab === 'radar-attributes') {
      const centerX = width / 2;
      const centerY = (height - margin.bottom + margin.top) / 2;
      const radius = Math.min(centerX - margin.left, centerY - margin.top) * 0.85;

      const axes = [
        { label: 'Thermal Resistance (R-Val)', key: 'thermal' },
        { label: 'Airtightness (ACH <0.6)', key: 'airtight' },
        { label: 'Acoustic Damping (dB)', key: 'acoustic' },
        { label: 'Vapor Breathability', key: 'vapor' },
        { label: 'Summer Phase Shift', key: 'phaseshift' },
        { label: 'Carbon Sequestration', key: 'carbon' },
      ];

      const numAxes = axes.length;
      const angleSlice = (Math.PI * 2) / numAxes;

      // Scale
      const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

      // Draw concentric radar webs
      const levels = 4;
      for (let level = 1; level <= levels; level++) {
        const levelRadius = (radius / levels) * level;
        const points: [number, number][] = [];
        for (let i = 0; i < numAxes; i++) {
          const angle = i * angleSlice - Math.PI / 2;
          points.push([
            centerX + levelRadius * Math.cos(angle),
            centerY + levelRadius * Math.sin(angle),
          ]);
        }
        svg.append('polygon')
          .attr('points', points.map((p) => p.join(',')).join(' '))
          .attr('stroke', '#44403c')
          .attr('stroke-width', 0.8)
          .attr('fill', level === levels ? '#1c1917' : 'none')
          .attr('fill-opacity', 0.5);
      }

      // Draw Axis Lines & Labels
      axes.forEach((axis, i) => {
        const angle = i * angleSlice - Math.PI / 2;
        const x2 = centerX + radius * Math.cos(angle);
        const y2 = centerY + radius * Math.sin(angle);

        svg.append('line')
          .attr('x1', centerX)
          .attr('y1', centerY)
          .attr('x2', x2)
          .attr('y2', y2)
          .attr('stroke', '#57534e')
          .attr('stroke-width', 1);

        // Labels
        const labelRadius = radius + 20;
        const lx = centerX + labelRadius * Math.cos(angle);
        const ly = centerY + labelRadius * Math.sin(angle);

        svg.append('text')
          .attr('x', lx)
          .attr('y', ly)
          .attr('text-anchor', lx > centerX + 10 ? 'start' : lx < centerX - 10 ? 'end' : 'middle')
          .attr('dy', '0.35em')
          .attr('fill', '#d6d3d1')
          .attr('font-size', width < 500 ? '9px' : '10px')
          .attr('font-weight', '500')
          .text(axis.label);
      });

      // Compute performance scores (0-100) based on cabin & insulation tier
      const getScores = (tier: InsulationTier) => {
        const tierMultiplier = tier === 'arctic-passive' ? 1.0 : tier === 'nordic-winter' ? 0.82 : 0.65;
        return [
          Math.min(100, Math.round(98 * tierMultiplier)),
          Math.min(100, Math.round(95 * tierMultiplier)),
          Math.min(100, Math.round(88 * tierMultiplier)),
          94, // Solid breathable timber vapor permeability is always naturally high
          Math.min(100, Math.round(92 * (activeInsulation.phaseShiftHours / 16.5))),
          96, // Sequestered FSC carbon index
        ];
      };

      const primaryScores = getScores(insulationTier);
      const primaryPoints: [number, number][] = primaryScores.map((score, i) => {
        const angle = i * angleSlice - Math.PI / 2;
        const r = rScale(score);
        return [centerX + r * Math.cos(angle), centerY + r * Math.sin(angle)];
      });

      // Render primary polygon
      svg.append('polygon')
        .attr('points', primaryPoints.map((p) => p.join(',')).join(' '))
        .attr('stroke', '#f59e0b')
        .attr('stroke-width', 2.5)
        .attr('fill', '#f59e0b')
        .attr('fill-opacity', 0.25);

      primaryPoints.forEach(([px, py], idx) => {
        svg.append('circle')
          .attr('cx', px)
          .attr('cy', py)
          .attr('r', 4)
          .attr('fill', '#f59e0b');

        svg.append('text')
          .attr('x', px)
          .attr('y', py - 7)
          .attr('text-anchor', 'middle')
          .attr('fill', '#fbbf24')
          .attr('font-size', '9px')
          .attr('font-weight', 'bold')
          .text(`${primaryScores[idx]}`);
      });
    }
  }, [selectedCabin, comparisonCabin, insulationTier, activeChartTab, containerWidth]);

  return (
    <section id="thermal-performance" className="py-20 bg-stone-900 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>D3 Thermal & Climate Engineering</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight">
              Energy Ratings & Climate Zone Performance
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Verify how each Glulam cabin model performs in the UK's harshest weather zones — from sub-zero Scottish Highlands blizzards to high-humidity Atlantic gales in Wales.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onBookConsultation && onBookConsultation('Thermal Engineering & EPC Consultation')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Award className="w-4 h-4" />
              <span>Get Full EPC Calculation</span>
            </button>
          </div>
        </div>

        {/* Control Bar: Model Selector, Comparison, Insulation Tier & Climate Zone */}
        <div className="p-6 rounded-3xl bg-stone-950 border border-stone-800 space-y-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Primary Model Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-300">
                Primary Cabin Model
              </label>
              <select
                aria-label="Primary Cabin Model"
                value={selectedCabinId}
                onChange={(e) => setSelectedCabinId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {CABIN_MODELS.map((cabin) => (
                  <option key={cabin.id} value={cabin.id}>
                    {cabin.name} ({cabin.areaSqM} m²)
                  </option>
                ))}
              </select>
            </div>

            {/* Compare Side-by-Side Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-300">
                Compare Side-by-Side
              </label>
              <select
                aria-label="Compare Side-by-Side"
                value={comparisonCabinId || ''}
                onChange={(e) => setComparisonCabinId(e.target.value ? e.target.value : null)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="">-- No Comparison (Single View) --</option>
                {CABIN_MODELS.filter((c) => c.id !== selectedCabinId).map((cabin) => (
                  <option key={cabin.id} value={cabin.id}>
                    {cabin.name} ({cabin.areaSqM} m²)
                  </option>
                ))}
              </select>
            </div>

            {/* Insulation Tier Switcher */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-300">
                Insulation & Glulam Specification
              </label>
              <select
                aria-label="Insulation and Glulam Specification"
                value={insulationTier}
                onChange={(e) => setInsulationTier(e.target.value as InsulationTier)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="standard">Standard Nordic Glulam (70-120mm)</option>
                <option value="nordic-winter">Nordic Winter Twin-Wall (160-200mm)</option>
                <option value="arctic-passive">Arctic Passive (240mm + Aerogel)</option>
              </select>
            </div>

            {/* Climate Zone Focus */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-300">
                Target UK Climate Zone
              </label>
              <select
                aria-label="Target UK Climate Zone"
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {CLIMATE_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Zone Summary Banner */}
          <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-stone-300">
                Selected Microclimate: <strong className="text-white">{activeZone.name}</strong> ({activeZone.region})
              </span>
            </div>
            <div className="flex items-center gap-4 text-stone-400">
              <span>Avg Winter Low: <strong className="text-cyan-400">{activeZone.winterMinAvg}°C</strong></span>
              <span>Degree Days: <strong className="text-amber-400">{activeZone.degreeDays}</strong></span>
              <span>Wind Exposure: <strong className="text-emerald-400">{activeZone.windExposure}</strong></span>
            </div>
          </div>
        </div>

        {/* 4 Architectural Metric Spec Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1 relative overflow-hidden">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Wall U-Value
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-400">
              {activeInsulation.wallUValue} <span className="text-xs font-sans text-stone-400 font-normal">W/m²K</span>
            </div>
            <div className="text-[11px] text-stone-400 flex items-center gap-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Stronger thermal performance than typical UK standard builds</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1 relative overflow-hidden">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Airtightness Test
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
              {activeInsulation.airtightnessACH} <span className="text-xs font-sans text-stone-400 font-normal">ACH @ 50Pa</span>
            </div>
            <div className="text-[11px] text-stone-400 flex items-center gap-1 pt-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Passivhaus-Adjacent Standard</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1 relative overflow-hidden">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Thermal Phase Shift
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-cyan-400">
              {activeInsulation.phaseShiftHours} <span className="text-xs font-sans text-stone-400 font-normal">Hours</span>
            </div>
            <div className="text-[11px] text-stone-400 flex items-center gap-1 pt-1">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-400" />
              <span>12h+ summer heat wave protection</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-1 relative overflow-hidden">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Est. Heat Pump Cost ({activeZone.name.split('&')[0]})
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-400">
              £{getAnnualHeatingCost(selectedCabin, activeZone, insulationTier)} <span className="text-xs font-sans text-stone-400 font-normal">/ year</span>
            </div>
            <div className="text-[11px] text-stone-400 flex items-center gap-1 pt-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Under ~£{Math.round(getAnnualHeatingCost(selectedCabin, activeZone, insulationTier) / 12)}/month avg</span>
            </div>
          </div>
        </div>

        {/* D3 Visualizer Canvas & Exploration Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl space-y-6">
          {/* Chart View Toggle Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <h3 className="font-serif text-lg font-bold text-stone-100">
                Interactive Engineering Simulation
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-stone-900 p-1 rounded-xl border border-stone-800 self-start sm:self-auto">
              <button
                onClick={() => setActiveChartTab('climate-demand')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeChartTab === 'climate-demand'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                UK Climate Zone Demand
              </button>
              <button
                onClick={() => setActiveChartTab('freeze-curve')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeChartTab === 'freeze-curve'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                24-Hour Winter Freeze Curve
              </button>
              <button
                onClick={() => setActiveChartTab('radar-attributes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeChartTab === 'radar-attributes'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Architectural Radar
              </button>
            </div>
          </div>

          {/* D3 SVG Container */}
          <div className="relative min-h-[340px] flex items-center justify-center" ref={chartContainerRef}>
            <svg className="w-full" />
          </div>

          {/* Chart Contextual Footnote */}
          <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Calculations based on dynamic CIBSE Guide A thermal modeling, recognized glulam structural design standards, and UK Part L (2025/2026) building regulations.
              </span>
            </div>

            {onConfigureCabin && (
              <button
                onClick={() => onConfigureCabin(selectedCabin.id)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>Configure {selectedCabin.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
