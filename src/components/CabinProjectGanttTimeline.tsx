import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Layers,
  Hammer,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Filter,
  Check,
  Building2,
  Factory,
  Trees,
  Zap,
  Key,
  FileText,
  Compass,
  Info,
  SlidersHorizontal,
  ChevronDown,
  HardHat,
  Play,
  RotateCcw,
  Sun,
  Flame,
  Award
} from 'lucide-react';

interface GanttTask {
  id: string;
  phaseId: string;
  phaseName: string;
  phaseColor: string;
  name: string;
  startMonth: number; // 1 to 12 (fractional supported, e.g. 1.5)
  durationMonths: number;
  progressPct: number;
  leadRole: string;
  category: 'legal_planning' | 'offsite_mfg' | 'groundworks' | 'structural' | 'mep_energy' | 'certification';
  isMilestone?: boolean;
  milestoneTitle?: string;
  criticalPath: boolean;
  weatherRisk: 'Low' | 'Moderate' | 'High';
  clientActionRequired: string;
  deliverable: string;
  description: string;
}

interface GanttPhase {
  id: string;
  name: string;
  shortName: string;
  monthRange: string;
  color: string;
  badgeColor: string;
  barColor: string;
  icon: React.ComponentType<{ className?: string }>;
  leadRole: string;
  summary: string;
}

const GANTT_PHASES: GanttPhase[] = [
  {
    id: 'phase_1',
    name: '1. Land Feasibility & Architectural Concept',
    shortName: 'Feasibility & Design',
    monthRange: 'Months 1 – 2',
    color: 'from-blue-600 to-cyan-600',
    badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
    barColor: 'bg-blue-500',
    icon: Compass,
    leadRole: 'Lead Architect & Geotechnical Surveyor',
    summary: 'LiDAR topographical scans, soil bearing tests, solar exposure modeling, and custom 3D timber CAD blueprints.',
  },
  {
    id: 'phase_2',
    name: '2. Statutory Planning & Ecology Approvals',
    shortName: 'Planning & Legal',
    monthRange: 'Months 3 – 5',
    color: 'from-purple-600 to-indigo-600',
    badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
    barColor: 'bg-purple-500',
    icon: FileText,
    leadRole: 'Chartered Town Planner (MRTPI)',
    summary: 'RIBA Stage 3 drawings, ecology biodiversity assessments, LPA committee submission, and formal determination notice.',
  },
  {
    id: 'phase_3',
    name: '3. Dual-Track Factory Milling & Groundworks',
    shortName: 'Factory & Civil Works',
    monthRange: 'Months 5 – 7',
    color: 'from-amber-600 to-orange-600',
    badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
    barColor: 'bg-amber-500',
    icon: Factory,
    leadRole: 'Nordic Timber Engineer & Civil Foreman',
    summary: 'Concurrent execution: 5-axis CNC glulam timber prefabrication in factory while installing low-impact eco ground screws on site.',
  },
  {
    id: 'phase_4',
    name: '4. Weather-Tight Structural Shell Assembly',
    shortName: 'Timber Erection',
    monthRange: 'Months 8 – 9',
    color: 'from-emerald-600 to-teal-600',
    badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
    barColor: 'bg-emerald-500',
    icon: Hammer,
    leadRole: 'Master Timber Carpenter & Crane Master',
    summary: 'Flatbed delivery, solid log interlocking wall assembly, heavy glulam roof purlins, vapor barriers, and triple glazing.',
  },
  {
    id: 'phase_5',
    name: '5. Mechanical, Electrical & Luxury Fitout',
    shortName: 'MEP & Interiors',
    monthRange: 'Months 9 – 11',
    color: 'from-amber-500 to-yellow-500',
    badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
    barColor: 'bg-amber-400',
    icon: Zap,
    leadRole: 'Lead M&E Engineer & Master Joiner',
    summary: '1st & 2nd fix electrics, heat pump & solar microgrid integration, cedar sauna build, and custom artisan kitchen installation.',
  },
  {
    id: 'phase_6',
    name: '6. Testing, Building Control & Golden Key Handover',
    shortName: 'Sign-Off & Handover',
    monthRange: 'Months 11 – 12',
    color: 'from-emerald-500 to-amber-500',
    badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
    barColor: 'bg-emerald-400',
    icon: Key,
    leadRole: 'Building Inspector & Quality Director',
    summary: 'Blower-door airtightness testing (<1.0 ACH), Local Authority completion certificate, and final deep polish handover.',
  },
];

const GANTT_TASKS_12_MONTH: GanttTask[] = [
  {
    id: 't1',
    phaseId: 'phase_1',
    phaseName: 'Feasibility & Design',
    phaseColor: 'bg-blue-500',
    name: 'Topographical 3D LiDAR Scan & Soil Borehole Sampling',
    startMonth: 1.0,
    durationMonths: 1.2,
    progressPct: 100,
    leadRole: 'Geotechnical Surveyor',
    category: 'groundworks',
    criticalPath: true,
    weatherRisk: 'Low',
    clientActionRequired: 'Provide boundary gate access & legal plot boundaries',
    deliverable: 'Geotechnical Bearing Report & 3D Contour CAD Pack',
    description: 'Laser drone scan of terrain slope, bedrock depth evaluation, and soil bearing capacity to determine screw pile lengths.'
  },
  {
    id: 't2',
    phaseId: 'phase_1',
    phaseName: 'Feasibility & Design',
    phaseColor: 'bg-blue-500',
    name: 'Utility Feasibility (Grid Connection vs. Off-Grid Solar & Borehole)',
    startMonth: 1.3,
    durationMonths: 0.9,
    progressPct: 100,
    leadRole: 'M&E Infrastructure Specialist',
    category: 'mep_energy',
    criticalPath: false,
    weatherRisk: 'Low',
    clientActionRequired: 'Confirm preference for grid-tie vs 100% off-grid Victron solar microgrid',
    deliverable: 'Infrastructure & Off-Grid Feasibility Matrix',
    description: 'Detailed analysis of DNO power grid connection costs vs. hybrid solar PV with LiFePO4 battery storage and water borehole.'
  },
  {
    id: 't3',
    phaseId: 'phase_1',
    phaseName: 'Feasibility & Design',
    phaseColor: 'bg-blue-500',
    name: 'Bespoke Architectural 3D CAD Blueprint & Floorplan Customisation',
    startMonth: 1.6,
    durationMonths: 1.4,
    progressPct: 100,
    leadRole: 'Lead Timber Architect',
    category: 'legal_planning',
    criticalPath: true,
    isMilestone: true,
    milestoneTitle: 'M1: Architectural Lock & Feasibility Sign-Off',
    weatherRisk: 'Low',
    clientActionRequired: 'Sign off on custom floorplan partitions, sauna dimensions, and window placement',
    deliverable: 'RIBA Stage 2/3 BIM Architectural Dossier (1:50 Elevations)',
    description: 'Iterative 3D model refinement with photorealistic contextual renders and structural timber engineering calculations.'
  },
  {
    id: 't4',
    phaseId: 'phase_2',
    phaseName: 'Planning & Approvals',
    phaseColor: 'bg-purple-500',
    name: 'Ecological Habitat Audit & Biodiversity Net Gain (BNG) Calculations',
    startMonth: 3.0,
    durationMonths: 0.8,
    progressPct: 100,
    leadRole: 'Chartered Ecologist',
    category: 'legal_planning',
    criticalPath: false,
    weatherRisk: 'Moderate',
    clientActionRequired: 'None (survey conducted on site)',
    deliverable: 'Statutory Preliminary Ecological Appraisal (PEA)',
    description: 'Protected species bat/newt surveys and mandatory UK Biodiversity Net Gain (+10%) landscaping enhancement schedule.'
  },
  {
    id: 't5',
    phaseId: 'phase_2',
    phaseName: 'Planning & Approvals',
    phaseColor: 'bg-purple-500',
    name: 'Formal Planning Application Submission & LPA Committee Review',
    startMonth: 3.2,
    durationMonths: 2.1,
    progressPct: 100,
    leadRole: 'Chartered Town Planner (MRTPI)',
    category: 'legal_planning',
    criticalPath: true,
    isMilestone: true,
    milestoneTitle: 'M2: Formal Statutory Planning Approval Issued',
    weatherRisk: 'Low',
    clientActionRequired: 'Review Design & Access Statement before final portal submission',
    deliverable: 'Local Planning Authority Full Planning Decision Notice',
    description: 'Managing the 8-week statutory LPA consultation, highway authority inquiries, and conservation officer queries.'
  },
  {
    id: 't6',
    phaseId: 'phase_3',
    phaseName: 'Offsite & Groundworks',
    phaseColor: 'bg-amber-500',
    name: 'Nordic 5-Axis CNC Precision Timber Milling & Vacuum Treatment',
    startMonth: 5.3,
    durationMonths: 2.2,
    progressPct: 85,
    leadRole: 'Nordic Factory Production Director',
    category: 'offsite_mfg',
    criticalPath: true,
    weatherRisk: 'Low',
    clientActionRequired: 'Confirm exterior wood stain color palette (Natural Larch, Charcoal, Forest Pine)',
    deliverable: 'Factory QA Timber Certification & Batch Load Manifest',
    description: 'Kiln-dried Nordic spruce & larch milled to 0.5mm tolerance with concealed internal electrical conduits and tension rod channels.'
  },
  {
    id: 't7',
    phaseId: 'phase_3',
    phaseName: 'Offsite & Groundworks',
    phaseColor: 'bg-amber-500',
    name: 'Access Road Grading & Heavy Crane Hardstanding Setup',
    startMonth: 5.8,
    durationMonths: 0.8,
    progressPct: 80,
    leadRole: 'Civil Groundworks Foreman',
    category: 'groundworks',
    criticalPath: false,
    weatherRisk: 'Moderate',
    clientActionRequired: 'Confirm heavy vehicle passing places with adjacent landowners if required',
    deliverable: 'Site Access & Heavy Crane Load-Pad Warrant',
    description: 'Temporary trackway laying and reinforced hardcore pad preparation for articulated timber delivery lorries and 40-tonne crane.'
  },
  {
    id: 't8',
    phaseId: 'phase_3',
    phaseName: 'Offsite & Groundworks',
    phaseColor: 'bg-amber-500',
    name: 'Eco Ground Screws Installation & Subfloor Drainage Trenches',
    startMonth: 6.2,
    durationMonths: 1.2,
    progressPct: 70,
    leadRole: 'Foundation Structural Engineer',
    category: 'groundworks',
    criticalPath: true,
    isMilestone: true,
    milestoneTitle: 'M3: Foundation Load-Test Certified (Tranche 2 Released)',
    weatherRisk: 'Moderate',
    clientActionRequired: 'Stage payment release following independent foundation certificate sign-off',
    deliverable: 'Foundation Torque Load-Bearing Certificate',
    description: 'Zero-concrete ground screw installation with computerized digital torque validation and insulated timber subframe base.'
  },
  {
    id: 't9',
    phaseId: 'phase_4',
    phaseName: 'Timber Erection',
    phaseColor: 'bg-emerald-500',
    name: 'Flatbed Logistics Delivery & Articulated Crane Offloading',
    startMonth: 7.7,
    durationMonths: 0.5,
    progressPct: 50,
    leadRole: 'Logistics Transport Manager',
    category: 'structural',
    criticalPath: true,
    weatherRisk: 'Moderate',
    clientActionRequired: 'Optional site visit to witness the timber fleet arrival',
    deliverable: 'Shipping Bill of Lading & Offload Cargo Inspection Sheet',
    description: 'Careful sequencing and weather-sealed staging of numbered timber log packs directly around the foundation perimeter.'
  },
  {
    id: 't10',
    phaseId: 'phase_4',
    phaseName: 'Timber Erection',
    phaseColor: 'bg-emerald-500',
    name: 'Solid Glulam Interlocking Wall Assembly & Steel Tension Rod Rigging',
    startMonth: 8.0,
    durationMonths: 0.9,
    progressPct: 30,
    leadRole: 'Master Timber Carpenter',
    category: 'structural',
    criticalPath: true,
    weatherRisk: 'Moderate',
    clientActionRequired: 'None',
    deliverable: 'Wall Plumb & Compression Joint Integrity Sign-Off',
    description: 'Interlocking tongue-and-groove log assembly using concealed internal threaded tension rods to eliminate settling tolerances.'
  },
  {
    id: 't11',
    phaseId: 'phase_4',
    phaseName: 'Timber Erection',
    phaseColor: 'bg-emerald-500',
    name: 'Heavy Roof Purlins, Breathable Membranes & Slate/Metal Tile Cladding',
    startMonth: 8.4,
    durationMonths: 1.0,
    progressPct: 20,
    leadRole: 'Structural Roofing Craftsman',
    category: 'structural',
    criticalPath: true,
    weatherRisk: 'High',
    clientActionRequired: 'Traditional Nordic "Roof-Wetting" celebration with the installation team!',
    deliverable: 'Weather-Tight Shell Certificate',
    description: 'Structural insulated roof cassette system with high-permeability waterproof membrane and premium standing seam metal or slate.'
  },
  {
    id: 't12',
    phaseId: 'phase_4',
    phaseName: 'Timber Erection',
    phaseColor: 'bg-emerald-500',
    name: 'German Triple-Glazed Argon Joinery & Perimeter Acoustic Seals',
    startMonth: 8.9,
    durationMonths: 0.7,
    progressPct: 10,
    leadRole: 'Architectural Glazing Specialist',
    category: 'structural',
    criticalPath: true,
    isMilestone: true,
    milestoneTitle: 'M4: Weather-Tight Lockup Envelope Validated',
    weatherRisk: 'Low',
    clientActionRequired: 'Key code and secure lockup confirmation',
    deliverable: 'Building Envelope Lockup Certificate (Tranche 3 Released)',
    description: 'Precision alignment of ultra-low U-value (<0.8 W/m²K) triple-glazed aluminium-clad timber doors and floor-to-ceiling glass gables.'
  },
  {
    id: 't13',
    phaseId: 'phase_5',
    phaseName: 'MEP & Fitout',
    phaseColor: 'bg-amber-400',
    name: '1st Fix Electrical Wiring, Plumbing Ducts & Underfloor Heating Manifolds',
    startMonth: 9.3,
    durationMonths: 1.1,
    progressPct: 0,
    leadRole: 'Head MEP Engineer',
    category: 'mep_energy',
    criticalPath: true,
    weatherRisk: 'Low',
    clientActionRequired: 'Sign off electrical outlet positions and smart mood lighting schemes',
    deliverable: '1st Fix MEP Pressure & Continuity Test Log',
    description: 'Running fire-rated cabling through concealed pre-milled wall channels and installing multi-zone water underfloor heating pipework.'
  },
  {
    id: 't14',
    phaseId: 'phase_5',
    phaseName: 'MEP & Fitout',
    phaseColor: 'bg-amber-400',
    name: 'Renewables Setup: Air-Source Heat Pump, Solar PV & Victron LiFePO4 Microgrid',
    startMonth: 9.8,
    durationMonths: 1.2,
    progressPct: 0,
    leadRole: 'Renewables & Microgrid Engineer',
    category: 'mep_energy',
    criticalPath: false,
    weatherRisk: 'Low',
    clientActionRequired: 'Approve solar inverter app monitoring credentials',
    deliverable: 'MCS Microgeneration Certification & Solar Commissioning Pack',
    description: 'Commissioning ultra-quiet Daikin heat pump, rooftop all-black solar panels, and smart inverter storage with auto-generator backup.'
  },
  {
    id: 't15',
    phaseId: 'phase_5',
    phaseName: 'MEP & Fitout',
    phaseColor: 'bg-amber-400',
    name: 'Artisan Fitout: Red Cedar Sauna, Stone Tiling & Luxury Kitchen Joinery',
    startMonth: 10.3,
    durationMonths: 1.2,
    progressPct: 0,
    leadRole: 'Master Interior Artisan',
    category: 'mep_energy',
    criticalPath: false,
    weatherRisk: 'Low',
    clientActionRequired: 'Final approval of stone countertop quartz finishes and sanitaryware selections',
    deliverable: 'Sauna Safety Certificate & Kitchen Appliance Warranties',
    description: 'Handcrafted thermo-aspen sauna benches with Harvia heater, Italian porcelain wet-room tiling, and bespoke solid oak kitchen.'
  },
  {
    id: 't16',
    phaseId: 'phase_6',
    phaseName: 'Sign-Off & Handover',
    phaseColor: 'bg-emerald-400',
    name: 'Blower-Door Airtightness Testing & Thermal Drone Envelope Validation',
    startMonth: 11.2,
    durationMonths: 0.6,
    progressPct: 0,
    leadRole: 'Airtightness & Passivhaus Specialist',
    category: 'certification',
    criticalPath: true,
    weatherRisk: 'Low',
    clientActionRequired: 'None',
    deliverable: 'Certified Air Permeability Test Certificate (<1.0 ACH@50Pa)',
    description: 'Pressure differential blower door test verifying superior air retention and zero parasitic drafts before final sign-off.'
  },
  {
    id: 't17',
    phaseId: 'phase_6',
    phaseName: 'Sign-Off & Handover',
    phaseColor: 'bg-emerald-400',
    name: 'Independent Building Control Final Inspection & Statutory Completion Certificate',
    startMonth: 11.5,
    durationMonths: 0.5,
    progressPct: 0,
    leadRole: 'Independent Building Inspector',
    category: 'certification',
    criticalPath: true,
    isMilestone: true,
    milestoneTitle: 'M5: Local Authority Building Control Sign-Off',
    weatherRisk: 'Low',
    clientActionRequired: 'Review statutory completion pack with your conveyancer / lender',
    deliverable: 'Statutory Building Regulations Final Completion Certificate',
    description: 'Formal sign-off of Part L (energy conservation), Part P (electrical), Part B (fire safety), and structural integrity.'
  },
  {
    id: 't18',
    phaseId: 'phase_6',
    phaseName: 'Sign-Off & Handover',
    phaseColor: 'bg-emerald-400',
    name: 'Final Deep Clean, Exterior Timber UV Oiling & Golden Key Handover',
    startMonth: 11.8,
    durationMonths: 0.4,
    progressPct: 0,
    leadRole: 'Project Director & Client Care Lead',
    category: 'certification',
    criticalPath: true,
    isMilestone: true,
    milestoneTitle: 'M6: Golden Key Handover',
    weatherRisk: 'Low',
    clientActionRequired: 'Complete joint final walkthrough inspection, collect keys & digital iPad manual',
    deliverable: 'Warranty Options Information Pack & Handover Box',
    description: 'White-glove deep clean, Osmo UV protective timber finish application, and guided walkthrough of smart home systems.'
  }
];

const MONTH_NAMES = [
  'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6',
  'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'
];

interface CabinProjectGanttTimelineProps {
  onBookConsultation: (topic: string) => void;
}

export const CabinProjectGanttTimeline: React.FC<CabinProjectGanttTimelineProps> = ({
  onBookConsultation,
}) => {
  // State
  const [scheduleType, setScheduleType] = useState<'12_month_turnkey' | '7_month_fasttrack'>('12_month_turnkey');
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(GANTT_TASKS_12_MONTH[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [highlightCriticalPath, setHighlightCriticalPath] = useState<boolean>(false);
  const [scrubMonth, setScrubMonth] = useState<number>(6); // Default viewing midpoint Month 6
  const [startCalendarMonth, setStartCalendarMonth] = useState<number>(2); // March by default (index 2 = March)

  const CALENDAR_MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Dynamic Calendar Month Labels
  const dynamicMonthLabels = useMemo(() => {
    const totalCols = scheduleType === '12_month_turnkey' ? 12 : 7;
    return Array.from({ length: totalCols }, (_, idx) => {
      const monthIdx = (startCalendarMonth + idx) % 12;
      const yearOffset = Math.floor((startCalendarMonth + idx) / 12);
      const yearStr = yearOffset > 0 ? ` '${(26 + yearOffset).toString()}` : " '26";
      return {
        stepNum: idx + 1,
        name: `M${idx + 1}`,
        calendarName: CALENDAR_MONTH_NAMES[monthIdx],
        yearTag: yearStr,
        fullLabel: `${CALENDAR_MONTH_NAMES[monthIdx].substring(0, 3)}${yearStr}`
      };
    });
  }, [startCalendarMonth, scheduleType]);

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return GANTT_TASKS_12_MONTH.filter((task) => {
      if (scheduleType === '7_month_fasttrack') {
        // Fast-track scales durations for permitted development (no 8-week planning delay)
        if (task.id === 't4' || task.id === 't5') return false; // Skip formal full planning
      }
      if (categoryFilter === 'all') return true;
      return task.category === categoryFilter;
    });
  }, [scheduleType, categoryFilter]);

  // Tasks active at current scrub month
  const activeTasksAtScrub = useMemo(() => {
    return GANTT_TASKS_12_MONTH.filter((task) => {
      const endMonth = task.startMonth + task.durationMonths;
      return scrubMonth >= task.startMonth && scrubMonth <= endMonth;
    });
  }, [scrubMonth]);

  const maxMonths = scheduleType === '12_month_turnkey' ? 12 : 7;

  return (
    <div id="gantt-development-cycle" className="mt-16 pt-12 border-t border-stone-800 text-stone-100">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive 12-Month Master Schedule</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-100">
            End-to-End Log Cabin Development Timeline
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Gain complete visibility into the architectural, statutory planning, factory prefabrication, and on-site assembly phases of your custom timber home.
          </p>
        </div>

        {/* Schedule Type Toggle & Calendar Start Selector */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Start Month Picker */}
          <div className="flex items-center gap-2 bg-stone-950 px-3 py-2 rounded-xl border border-stone-800 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-stone-400">Target Start:</span>
            <select
              aria-label="Target project start month"
              value={startCalendarMonth}
              onChange={(e) => setStartCalendarMonth(Number(e.target.value))}
              className="bg-stone-900 border border-stone-700 text-amber-300 text-xs font-semibold rounded-lg px-2 py-1 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {CALENDAR_MONTH_NAMES.map((name, i) => (
                <option key={name} value={i}>
                  {name} 2026
                </option>
              ))}
            </select>
          </div>

          {/* Schedule Mode Selector */}
          <div className="bg-stone-950 p-1 rounded-xl border border-stone-800 flex items-center gap-1">
            <button
              onClick={() => setScheduleType('12_month_turnkey')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                scheduleType === '12_month_turnkey'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              12-Month Custom Turnkey
            </button>
            <button
              onClick={() => setScheduleType('7_month_fasttrack')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                scheduleType === '7_month_fasttrack'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>7-Month Fast-Track (PD)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Month Scrubber Banner */}
      <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Interactive Month-by-Month Explorer</span>
          </div>
          <div className="text-sm font-medium text-stone-200">
            Currently inspecting: <span className="text-amber-300 font-bold font-mono">Month {scrubMonth}</span> ({dynamicMonthLabels[Math.min(scrubMonth - 1, dynamicMonthLabels.length - 1)]?.calendarName} {dynamicMonthLabels[Math.min(scrubMonth - 1, dynamicMonthLabels.length - 1)]?.yearTag})
          </div>
          <div className="text-xs text-stone-400">
            {activeTasksAtScrub.length} active engineering & construction streams running in parallel this month.
          </div>
        </div>

        {/* Scrubber Range Slider */}
        <div className="w-full md:w-80 space-y-2">
          <div className="flex justify-between text-[11px] font-mono text-stone-400">
            <span>M1 (Site Survey)</span>
            <span className="text-amber-400 font-bold">Month {scrubMonth}</span>
            <span>M{maxMonths} (Handover)</span>
          </div>
          <input
            aria-label="Interactive timeline month scrubber"
            type="range"
            min="1"
            max={maxMonths}
            step="1"
            value={scrubMonth}
            onChange={(e) => setScrubMonth(Number(e.target.value))}
            className="w-full accent-amber-500 bg-stone-900 h-2 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Filter Tabs & Critical Path Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        {/* Stream filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Filter Stream:</span>
          </span>
          {[
            { id: 'all', label: 'All Streams' },
            { id: 'legal_planning', label: 'Planning & Legal' },
            { id: 'offsite_mfg', label: 'Factory Milling' },
            { id: 'groundworks', label: 'Groundworks' },
            { id: 'structural', label: 'Timber Erection' },
            { id: 'mep_energy', label: 'MEP & Off-Grid' },
            { id: 'certification', label: 'Sign-Off & Handover' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                categoryFilter === tab.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Critical Path Toggle */}
        <button
          onClick={() => setHighlightCriticalPath(!highlightCriticalPath)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
            highlightCriticalPath
              ? 'bg-amber-950/80 border-amber-500 text-amber-300 ring-1 ring-amber-500'
              : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          <AlertTriangle className={`w-3.5 h-3.5 ${highlightCriticalPath ? 'text-amber-400' : 'text-stone-500'}`} />
          <span>{highlightCriticalPath ? 'Critical Path Highlighted' : 'Highlight Critical Path'}</span>
        </button>
      </div>

      {/* Main Gantt Grid Canvas */}
      <div className="p-6 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl overflow-x-auto">
        <div className="min-w-[850px] space-y-4">
          
          {/* Gantt Header Columns (Months) */}
          <div className="grid grid-cols-12 gap-1 pb-3 border-b border-stone-800 text-xs font-mono">
            <div className="col-span-4 text-stone-400 font-sans font-semibold text-xs uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Project Milestone / Task</span>
            </div>
            
            {/* Dynamic Month Header Columns */}
            <div className="col-span-8 grid grid-cols-12 gap-1 text-center">
              {dynamicMonthLabels.map((m, idx) => {
                const isCurrentScrub = scrubMonth === idx + 1;
                return (
                  <div
                    key={idx}
                    onClick={() => setScrubMonth(idx + 1)}
                    className={`py-1.5 px-0.5 rounded-lg cursor-pointer transition-colors ${
                      isCurrentScrub
                        ? 'bg-amber-500 text-stone-950 font-bold shadow'
                        : 'bg-stone-900/60 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <div className="text-[10px] font-bold leading-tight">{m.name}</div>
                    <div className="text-[9px] opacity-80 leading-none">{m.fullLabel}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase Groups & Task Rows */}
          <div className="space-y-6 pt-2">
            {GANTT_PHASES.map((phase) => {
              const phaseTasks = filteredTasks.filter((t) => t.phaseId === phase.id);
              if (phaseTasks.length === 0) return null;
              const PhaseIcon = phase.icon;

              return (
                <div key={phase.id} className="space-y-2">
                  {/* Phase Group Header Strip */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/90 border border-stone-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1 rounded-lg bg-amber-500 text-stone-950">
                        <PhaseIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-serif font-bold text-xs sm:text-sm text-stone-100">
                        {phase.name}
                      </span>
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${phase.badgeColor}`}>
                        {phase.monthRange}
                      </span>
                    </div>

                    <span className="text-[11px] text-stone-400 font-sans hidden sm:inline-block">
                      Lead: <strong className="text-stone-300 font-medium">{phase.leadRole}</strong>
                    </span>
                  </div>

                  {/* Task Bars List */}
                  <div className="space-y-1.5 pl-2">
                    {phaseTasks.map((task) => {
                      const isSelected = selectedTask?.id === task.id;
                      const isHighlighted = !highlightCriticalPath || task.criticalPath;
                      const taskEndMonth = task.startMonth + task.durationMonths;
                      const isActiveInScrub = scrubMonth >= task.startMonth && scrubMonth <= taskEndMonth;

                      // Calculate CSS grid column positioning
                      // Month 1 starts at 0%, Month 12 ends at 100%
                      const leftPercent = ((task.startMonth - 1) / maxMonths) * 100;
                      const widthPercent = Math.min(100 - leftPercent, (task.durationMonths / maxMonths) * 100);

                      return (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className={`grid grid-cols-12 gap-1 items-center p-2 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-stone-900 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                              : isActiveInScrub
                              ? 'bg-stone-900/40 border-stone-700/80 hover:bg-stone-900/80'
                              : 'bg-stone-950/60 border-stone-800/60 hover:bg-stone-900/50'
                          } ${!isHighlighted ? 'opacity-35' : 'opacity-100'}`}
                        >
                          {/* Task Label & Lead Info (4 Cols) */}
                          <div className="col-span-4 pr-3 flex items-center gap-2">
                            {task.isMilestone && (
                              <span className="shrink-0 w-2 h-2 rotate-45 bg-amber-400 shadow shadow-amber-400/50" title="Key Milestone Gate" />
                            )}
                            <div className="truncate">
                              <div className={`text-xs font-medium truncate ${isSelected ? 'text-amber-300 font-semibold' : 'text-stone-200'}`}>
                                {task.name}
                              </div>
                              <div className="text-[10px] text-stone-500 truncate font-mono">
                                {task.leadRole} • {task.durationMonths * 4} wks
                              </div>
                            </div>
                          </div>

                          {/* Gantt Bar Canvas (8 Cols) */}
                          <div className="col-span-8 relative h-7 bg-stone-900/40 rounded-lg overflow-hidden border border-stone-800/40 flex items-center">
                            
                            {/* Current Scrub Month Marker Guide Line */}
                            <div
                              style={{ left: `${((scrubMonth - 0.5) / maxMonths) * 100}%` }}
                              className="absolute top-0 bottom-0 w-0.5 bg-amber-400/40 z-10 pointer-events-none"
                            />

                            {/* Task Bar */}
                            <div
                              style={{
                                left: `${leftPercent}%`,
                                width: `${widthPercent}%`,
                              }}
                              className={`absolute h-5 rounded-md flex items-center px-2 text-[10px] font-bold text-stone-950 truncate transition-all duration-300 shadow ${
                                task.criticalPath
                                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-extrabold'
                                  : 'bg-gradient-to-r from-stone-600 to-stone-500 text-white'
                              }`}
                            >
                              <span className="truncate">{task.name}</span>
                            </div>

                            {/* Milestone Marker Flag */}
                            {task.isMilestone && (
                              <div
                                style={{
                                  left: `${Math.min(98, leftPercent + widthPercent)}%`,
                                }}
                                className="absolute -top-1 w-3 h-3 rotate-45 bg-amber-400 border border-stone-950 z-20 shadow-md transform -translate-x-1.5"
                                title={task.milestoneTitle}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Selected Task Deep-Dive Inspector Panel */}
      {selectedTask && (
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-stone-950 border-2 border-amber-500/60 shadow-2xl relative overflow-hidden">
          {/* Subtle background gradient glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500 text-stone-950">
                  {selectedTask.phaseName}
                </span>
                <span className="text-xs text-amber-400 font-mono font-bold">
                  Months {selectedTask.startMonth.toFixed(1)} – {(selectedTask.startMonth + selectedTask.durationMonths).toFixed(1)} ({Math.round(selectedTask.durationMonths * 4.3)} Weeks)
                </span>
                {selectedTask.criticalPath && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 border border-rose-800 text-rose-300">
                    Critical Path Element
                  </span>
                )}
                {selectedTask.isMilestone && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 border border-amber-600 text-amber-300">
                    Formal Milestone Sign-Off
                  </span>
                )}
              </div>

              <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                {selectedTask.name}
              </h4>
              <p className="text-xs text-stone-400">
                Lead Responsibility: <strong className="text-stone-200">{selectedTask.leadRole}</strong> • Weather Sensitivity: <strong className="text-amber-400">{selectedTask.weatherRisk}</strong>
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => onBookConsultation(`Inquiry for Schedule Task: ${selectedTask.name}`)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Consult on this Milestone</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description & Technical Summary */}
          <div className="py-5 border-b border-stone-800 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
            {selectedTask.description}
          </div>

          {/* 3 Detail Columns: Deliverable, Client Action, Milestone Gate */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
            {/* Column 1: Formal Deliverable */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Certified Deliverable</span>
              </div>
              <div className="text-xs font-medium text-stone-200 leading-snug">
                {selectedTask.deliverable}
              </div>
            </div>

            {/* Column 2: Client Action Required */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Client Action / Sign-Off</span>
              </div>
              <div className="text-xs font-medium text-stone-200 leading-snug">
                {selectedTask.clientActionRequired}
              </div>
            </div>

            {/* Column 3: Milestone Gate */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Milestone Gate Status</span>
              </div>
              <div className="text-xs font-medium text-amber-300 leading-snug">
                {selectedTask.milestoneTitle || 'Continuous Quality Assurance Gate'}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 4 Client Assurance Pillars */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Reduced Weather Delays',
            desc: 'Much of the timber milling and joinery prefabrication is completed off-site in temperature-controlled facilities before erection begins.',
            icon: Sun,
          },
          {
            title: 'Milestone-Based Contracts',
            desc: 'Installer contracts are typically structured around milestone-based timelines -- ask your installer about the specific contract terms for your build.',
            icon: ShieldCheck,
          },
          {
            title: 'Progress Updates',
            desc: 'Ask your installer about the progress photos and structural sign-off updates they provide during your build.',
            icon: Layers,
          },
          {
            title: 'Fast-Track Permitted Development',
            desc: 'Qualifying garden lodges and annexes can compress the 12-month schedule down to just 14–16 weeks.',
            icon: Sparkles,
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-950/80 border border-amber-700/60 text-amber-400 shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-serif font-bold text-xs text-stone-100">{item.title}</div>
                <p className="text-[11px] text-stone-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
