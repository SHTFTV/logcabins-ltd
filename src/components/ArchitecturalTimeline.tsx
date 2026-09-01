import React, { useState } from 'react';
import { 
  Compass, 
  FileText, 
  Factory, 
  Hammer, 
  Zap, 
  Key, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  HardHat,
  MapPin,
  Check
} from 'lucide-react';

interface TimelinePhase {
  stage: number;
  id: string;
  title: string;
  phaseCode: string;
  tag: string;
  tagColor: string;
  durationStandard: string;
  durationExpedited: string;
  icon: any;
  leadRole: string;
  overview: string;
  keyActivities: string[];
  deliverables: string[];
  clientAction: string;
  milestoneSignoff: string;
  riskMitigation: string;
}

const TIMELINE_PHASES: TimelinePhase[] = [
  {
    stage: 1,
    id: 'survey-audit',
    title: 'Site Survey & Topographical Audit',
    phaseCode: 'PHASE 01',
    tag: 'Due Diligence',
    tagColor: 'bg-blue-950/80 text-blue-300 border-blue-800/60',
    durationStandard: 'Weeks 1 – 2',
    durationExpedited: 'Week 1',
    icon: Compass,
    leadRole: 'Senior Chartered Surveyor & Geotechnical Engineer',
    overview: 'Complete 3D drone laser scanning of site contours, soil core bearing tests, solar orientation analysis, and highway access appraisal for delivery logistics.',
    keyActivities: [
      '3D LiDAR terrain mapping and boundary verification against Land Registry',
      'Geotechnical soil load-bearing sampling for foundation engineering',
      'Solar path, prevailing wind exposure, and microclimate modeling',
      'Delivery route & heavy transport swept-path clearance check'
    ],
    deliverables: [
      'Comprehensive Site Feasibility Dossier',
      '3D CAD Digital Elevation Model (DEM)',
      'Foundation Structural Recommendation'
    ],
    clientAction: 'Provide site access permissions and initial design preferences.',
    milestoneSignoff: 'Feasibility Approval & Model Specification Locked',
    riskMitigation: 'Identifies underground bedrock or soft peat early, preventing unexpected foundation cost variations.'
  },
  {
    stage: 2,
    id: 'planning-design',
    title: 'Architectural CAD & Planning Consent',
    phaseCode: 'PHASE 02',
    tag: 'Statutory Approvals',
    tagColor: 'bg-purple-950/80 text-purple-300 border-purple-800/60',
    durationStandard: 'Weeks 3 – 6',
    durationExpedited: 'Weeks 2 – 3 (Pre-App)',
    icon: FileText,
    leadRole: 'Town Planning Specialist',
    overview: 'Production of detailed RIBA Stage 3 architectural drawings, arboricultural tree reports, ecological statements, and formal submission to the Local Planning Authority (LPA).',
    keyActivities: [
      'Bespoke architectural elevations, floor plans, and sectional drawings',
      'Production of hyper-realistic 3D CGI contextual site renders',
      'Ecological habitat assessment & biodiversity net gain calculation',
      'Formal LPA submission for Full Planning, PD Certificate, or Class Q'
    ],
    deliverables: [
      'Complete Architectural Drawing Set (1:50 & 1:100)',
      'Design & Access Statement + Environmental Pack',
      'Statutory Council Planning Decision Notice'
    ],
    clientAction: 'Sign off on exterior timber stains, window profiles, and internal layout.',
    milestoneSignoff: 'Planning Approval or Lawful Development Certificate Issued',
    riskMitigation: 'Pre-consultation with local council conservation officers can help improve planning approval outcomes.'
  },
  {
    stage: 3,
    id: 'factory-groundworks',
    title: 'Precision CNC Milling & Civil Groundworks',
    phaseCode: 'PHASE 03',
    tag: 'Concurrent Production',
    tagColor: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
    durationStandard: 'Weeks 7 – 10',
    durationExpedited: 'Weeks 4 – 6',
    icon: Factory,
    leadRole: 'Timber Engineer & Civil Groundworks Foreman',
    overview: 'Dual-track execution: precision 5-axis CNC timber milling at the manufacturing facility while the groundworks team installs low-impact eco ground screws or insulated raft slabs on site.',
    keyActivities: [
      'Kiln-dried (12-14% MC) Glulam timber precision milled to 0.5mm tolerances',
      'Anti-fungal & UV vacuum pressure treatment in factory chambers',
      'Eco ground screw installation with computerized torque load testing',
      'Subfloor perimeter drainage and utility sleeve ducting laid'
    ],
    deliverables: [
      'Factory Quality Assurance Certificate',
      'Foundation Structural Load-Test Warrant',
      'Dispatch Manifest & Logistics Tracking'
    ],
    clientAction: 'Milestone 2 stage payment released upon foundation completion.',
    milestoneSignoff: 'Foundation Certified & Timber Cargo Cleared for Transport',
    riskMitigation: 'Parallel factory milling and site prep slashes build timeline by 40% compared to traditional on-site construction.'
  },
  {
    stage: 4,
    id: 'structural-erection',
    title: 'Weather-Tight Structural Assembly',
    phaseCode: 'PHASE 04',
    tag: 'On-Site Erection',
    tagColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
    durationStandard: 'Weeks 11 – 12',
    durationExpedited: 'Weeks 7 – 8',
    icon: Hammer,
    leadRole: 'Timber Carpenter & Site Manager',
    overview: 'Flatbed transport arrives on site. The installation team erects interlocking walls, heavy Glulam roof purlins, vapor membranes, and triple glazing.',
    keyActivities: [
      'Interlocking log wall assembly with concealed threaded steel tension rods',
      'Heavy-duty glulam ridge beams and structural roof cassettes installed',
      'High-performance breathable roofing membrane and slate/metal tiles laid',
      'Triple-glazed argon-filled timber/aluminum clad windows and doors sealed'
    ],
    deliverables: [
      'Weather-Tight Structural Shell Certificate',
      'Airtightness Pre-Test Report',
      'Site Inspection Checklist'
    ],
    clientAction: 'Join us on-site for the traditional Nordic Roof-Wetting milestone celebration!',
    milestoneSignoff: 'Building Lockup & Weather-Tight Envelope Validated',
    riskMitigation: 'Rapid 10-day shell assembly protects raw timber from adverse weather and rainfall exposure.'
  },
  {
    stage: 5,
    id: 'mep-interiors',
    title: 'MEP, Off-Grid Systems & Luxury Fitout',
    phaseCode: 'PHASE 05',
    tag: 'Fitout & Utilities',
    tagColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60',
    durationStandard: 'Weeks 13 – 14',
    durationExpedited: 'Weeks 9 – 10',
    icon: Zap,
    leadRole: 'Lead M&E Engineer & Interior Master Craftsman',
    overview: '1st & 2nd fix electricals, underfloor heating, solar battery/generator microgrid integration, cedar sauna installation, and luxury kitchen/bathroom fitouts.',
    keyActivities: [
      'Underfloor heating manifold installation with smart wireless thermostats',
      'Victron Energy solar array, LiFePO4 battery banks, or grid connection',
      'Borehole water filtration & sewage bio-digester commissioning',
      'Nordic cedar sauna, stone bathroom tiling, and custom kitchen installation'
    ],
    deliverables: [
      'NICEIC Electrical Safety Certificate',
      'Gas / Heat Pump MCS Compliance Certificate',
      'Water Potability Lab Test Results'
    ],
    clientAction: 'Review lighting schemes and smart control app setup.',
    milestoneSignoff: 'Full MEP Commissioning & Systems Operational',
    riskMitigation: 'All utilities pre-tested under load for 48 hours continuously before final handover.'
  },
  {
    stage: 6,
    id: 'handover-warranty',
    title: 'Building Control Sign-Off & Golden Key Handover',
    phaseCode: 'PHASE 06',
    tag: 'Turnkey Handover',
    tagColor: 'bg-amber-500 text-stone-950 font-bold',
    durationStandard: 'Weeks 15 – 16',
    durationExpedited: 'Week 11',
    icon: Key,
    leadRole: 'Managing Director & Independent Building Inspector',
    overview: 'Final Building Control sign-off, pressure blower-door airtightness validation, deep interior detailing, and formal golden key handover with comprehensive digital manual.',
    keyActivities: [
      'Independent Building Control final inspection & Completion Certificate',
      'Blower-door airtightness test achieving Passivhaus-adjacent standard (<1.5 ACH)',
      'Professional deep clean, glass polish, and exterior timber oil inspection',
      'Client orientation walkthrough and digital smart-home system handover'
    ],
    deliverables: [
      'Local Authority Building Regulations Completion Certificate',
      'Warranty Options Information Pack',
      'Comprehensive Homeowner Operations & Maintenance Manual'
    ],
    clientAction: 'Complete final joint walkthrough, accept keys, and celebrate your new sanctuary.',
    milestoneSignoff: 'Final Handover Sign-Off',
    riskMitigation: 'Ask your installer about the warranty options available to protect your investment.'
  }
];

interface ArchitecturalTimelineProps {
  onBookConsultation: (serviceTitle?: string) => void;
}

export const ArchitecturalTimeline: React.FC<ArchitecturalTimelineProps> = ({
  onBookConsultation,
}) => {
  const [activeStageId, setActiveStageId] = useState<string>('survey-audit');
  const [trackMode, setTrackMode] = useState<'standard' | 'expedited'>('standard');

  const currentPhase = TIMELINE_PHASES.find((p) => p.id === activeStageId) || TIMELINE_PHASES[0];

  return (
    <div className="mt-20 pt-16 border-t border-stone-800">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Client Transparency Blueprint</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-100 tracking-tight">
            The Architectural & Construction Timeline
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Every step from initial topographical laser scan to formal Building Control sign-off is scheduled with strict milestone gates and transparent client approvals.
          </p>
        </div>

        {/* Track Mode Toggle */}
        <div className="bg-stone-950 p-1.5 rounded-2xl border border-stone-800 flex items-center gap-1 shrink-0 self-start lg:self-auto">
          <button
            onClick={() => setTrackMode('standard')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              trackMode === 'standard'
                ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Standard Track (14–16 Wks)
          </button>
          <button
            onClick={() => setTrackMode('expedited')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              trackMode === 'expedited'
                ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Fast-Track / PD (8–10 Wks)</span>
          </button>
        </div>
      </div>

      {/* Interactive Horizontal Progress Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {TIMELINE_PHASES.map((phase, idx) => {
          const isActive = phase.id === activeStageId;
          const Icon = phase.icon;
          const duration = trackMode === 'standard' ? phase.durationStandard : phase.durationExpedited;

          return (
            <button
              key={phase.id}
              onClick={() => setActiveStageId(phase.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                isActive
                  ? 'bg-stone-950 border-amber-500 ring-2 ring-amber-500/20 shadow-xl'
                  : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 hover:bg-stone-950'
              }`}
            >
              {/* Active top line accent */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-300" />
              )}

              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-bold text-amber-400">
                  0{idx + 1}
                </span>
                <span className="text-[10px] font-medium text-stone-400">
                  {duration}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isActive 
                    ? 'bg-amber-500 text-stone-950' 
                    : 'bg-stone-900 border border-stone-800 text-stone-300 group-hover:text-amber-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-serif text-xs font-bold text-stone-100 line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {phase.title.split('&')[0]}
                </div>
                <div className="text-[10px] text-stone-400 font-sans line-clamp-1">
                  {phase.tag}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Phase Deep Dive Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl relative overflow-hidden">
        {/* Background Subtle Accent */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

        {/* Phase Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border ${currentPhase.tagColor}`}>
                {currentPhase.phaseCode}
              </span>
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {trackMode === 'standard' ? currentPhase.durationStandard : currentPhase.durationExpedited}
                </span>
              </span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
              {currentPhase.title}
            </h4>
            <p className="text-xs text-stone-400 flex items-center gap-1.5 pt-0.5">
              <HardHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Lead Responsibility: </span>
              <strong className="text-stone-200 font-medium">{currentPhase.leadRole}</strong>
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onBookConsultation(`Inquiry for ${currentPhase.title}`)}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Consult on Stage {currentPhase.stage}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Phase Body Overview */}
        <div className="py-6 border-b border-stone-800">
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-4xl font-sans">
            {currentPhase.overview}
          </p>
        </div>

        {/* 3 Column Detailed Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Column 1: Key Activities */}
          <div className="space-y-3 p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Key Engineering Tasks</span>
            </div>
            <ul className="space-y-2">
              {currentPhase.keyActivities.map((act, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-stone-300 leading-normal">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Tangible Deliverables */}
          <div className="space-y-3 p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Deliverables</span>
            </div>
            <ul className="space-y-2">
              {currentPhase.deliverables.map((deliv, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-stone-300 leading-normal">
                  <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-stone-800 mt-4 space-y-1">
              <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                Formal Milestone Gate:
              </div>
              <div className="text-xs font-medium text-emerald-300">
                {currentPhase.milestoneSignoff}
              </div>
            </div>
          </div>

          {/* Column 3: Client Action & Risk Safeguard */}
          <div className="space-y-4 p-4 rounded-2xl bg-stone-900/60 border border-stone-800/80 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Client Touchpoint</span>
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-medium bg-stone-950 p-3 rounded-xl border border-stone-800">
                {currentPhase.clientAction}
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-stone-800">
              <div className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Quality & Cost Safeguard:</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                {currentPhase.riskMitigation}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation between phases */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              const currentIdx = TIMELINE_PHASES.findIndex((p) => p.id === activeStageId);
              if (currentIdx > 0) {
                setActiveStageId(TIMELINE_PHASES[currentIdx - 1].id);
              }
            }}
            disabled={activeStageId === TIMELINE_PHASES[0].id}
            className="px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            ← Previous Stage
          </button>

          <div className="text-stone-400 text-xs hidden sm:block">
            Stage <span className="text-amber-400 font-bold">{currentPhase.stage}</span> of {TIMELINE_PHASES.length}
          </div>

          <button
            onClick={() => {
              const currentIdx = TIMELINE_PHASES.findIndex((p) => p.id === activeStageId);
              if (currentIdx < TIMELINE_PHASES.length - 1) {
                setActiveStageId(TIMELINE_PHASES[currentIdx + 1].id);
              }
            }}
            disabled={activeStageId === TIMELINE_PHASES[TIMELINE_PHASES.length - 1].id}
            className="px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Next Stage</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
