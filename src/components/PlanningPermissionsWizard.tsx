import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  Building2,
  Trees,
  Maximize2,
  Compass,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Award,
  Info,
  Calendar,
  Layers,
  Scale,
  Download,
  Share2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface WizardState {
  landType: 'garden_curtilage' | 'agricultural_woodland' | 'commercial_tourism' | 'brownfield_replacement';
  designation: 'unrestricted' | 'national_park_aonb' | 'conservation_area' | 'green_belt' | 'sssi_flood' | 'listed_curtilage';
  intendedUse: 'incidental_office_gym' | 'ancillary_annex_family' | 'primary_residence' | 'commercial_holiday_let' | 'agricultural_worker';
  dimensions: {
    heightCategory: 'under_2_5m' | 'dual_pitch_under_4m' | 'over_4m';
    boundaryDistance: 'under_2m' | 'over_2m';
    footprintSqM: number;
    gardenCoverageUnder50Pct: boolean;
    placedBehindFrontElevation: boolean;
  };
  isMobileCaravanCompliant: boolean; // Caravan Sites Act 1968 compliance capability
}

const INITIAL_WIZARD_STATE: WizardState = {
  landType: 'garden_curtilage',
  designation: 'unrestricted',
  intendedUse: 'incidental_office_gym',
  dimensions: {
    heightCategory: 'dual_pitch_under_4m',
    boundaryDistance: 'over_2m',
    footprintSqM: 35,
    gardenCoverageUnder50Pct: true,
    placedBehindFrontElevation: true,
  },
  isMobileCaravanCompliant: false,
};

interface PlanningPermissionsWizardProps {
  onBookConsultation: (topic: string) => void;
}

export const PlanningPermissionsWizard: React.FC<PlanningPermissionsWizardProps> = ({
  onBookConsultation,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<WizardState>(INITIAL_WIZARD_STATE);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Total steps in the assessment
  const TOTAL_STEPS = 4;

  // Evaluation Logic
  const planningAssessment = useMemo(() => {
    const { landType, designation, intendedUse, dimensions, isMobileCaravanCompliant } = formData;

    let routeType: 'permitted_development' | 'caravan_act_exemption' | 'householder_planning' | 'full_planning' | 'prior_approval_class_q' | 'rural_exception';
    let probability: 'Very High (95%+)' | 'High (85–90%)' | 'Moderate (70–80%)' | 'Specialist Consultation Required';
    let probabilityColor: string = 'text-emerald-400';
    let routeTitle: string = '';
    let statutoryTimescale: string = '';
    let keyStatute: string = '';
    let explanation: string = '';
    let requiredReports: string[] = [];
    let buildingRegsRequirement: string = '';
    let topTips: string[] = [];

    // 1. Check Permitted Development Class E (Garden Outbuildings)
    const isDomesticGarden = landType === 'garden_curtilage';
    const isIncidentalUse = intendedUse === 'incidental_office_gym';
    const meetsPDHeights =
      (dimensions.boundaryDistance === 'under_2m' && dimensions.heightCategory === 'under_2_5m') ||
      (dimensions.boundaryDistance === 'over_2m' && dimensions.heightCategory !== 'over_4m');
    const meetsPDSiting = dimensions.gardenCoverageUnder50Pct && dimensions.placedBehindFrontElevation;
    const isUnrestrictedOrModerate = designation === 'unrestricted' || designation === 'green_belt';

    if (
      isDomesticGarden &&
      isIncidentalUse &&
      meetsPDHeights &&
      meetsPDSiting &&
      isUnrestrictedOrModerate
    ) {
      routeType = 'permitted_development';
      probability = 'Very High (95%+)';
      probabilityColor = 'text-emerald-400';
      routeTitle = 'Permitted Development (Class E Outbuilding)';
      statutoryTimescale = '0 Weeks (Immediate Build) / 4–6 Weeks for LDC';
      keyStatute = 'Town and Country Planning (General Permitted Development) Order 2015, Schedule 2, Part 1, Class E';
      explanation =
        'Your proposal qualifies under UK Permitted Development rights as an incidental garden building (office, studio, gym, hobby room). No formal full planning application is required. We strongly recommend obtaining a Lawful Development Certificate (LDC) to legally certify compliance with future conveyancers.';
      requiredReports = [
        'Lawful Development Certificate (LDC) Application',
        '1:500 Site Location & 1:200 Block Plan',
        'Existing & Proposed Floorplans & Elevations (1:50)',
      ];
      buildingRegsRequirement =
        dimensions.footprintSqM <= 15
          ? 'Fully Exempt from Building Regulations (single storey, no sleeping accommodation).'
          : dimensions.footprintSqM <= 30
          ? 'Exempt from Building Regulations provided constructed with non-combustible materials or placed >1m from boundary.'
          : 'Standard Building Regulations required (Parts A, P, L, B) if over 30m² footprint.';
      topTips = [
        'Ensure the building remains incidental to the enjoyment of the dwellinghouse (no primary self-contained sleeping).',
        'Maintain the eaves below 2.5m if positioned within 2m of any garden boundary.',
        'Order our LDC drawing pack to secure formal Local Authority certification before commencing works.',
      ];
    } else if (
      isDomesticGarden &&
      intendedUse === 'ancillary_annex_family' &&
      isMobileCaravanCompliant
    ) {
      // 2. Caravan Sites Act 1968 Mobile Lodge Exemption
      routeType = 'caravan_act_exemption';
      probability = 'High (85–90%)';
      probabilityColor = 'text-emerald-400';
      routeTitle = 'Ancillary Family Annex (Potential Exemption Route)';
      statutoryTimescale = '6–8 Weeks for Lawful Development Certificate (LDC), where applicable';
      keyStatute = 'Always confirm exemption routes with your Local Planning Authority before building';
      explanation =
        'Permitted development rights and mobile-home style exemptions may apply depending on your cabin\'s construction, transportability, and how it is used within your residential curtilage -- but the rules here are highly fact-specific. Always confirm your exact position with your Local Planning Authority before building.';
      requiredReports = [
        'Certificate of Lawfulness of Proposed Use or Development (CLOPUD)',
        'Twin-Unit Transportability & Structural Demountability Engineer Report',
        'Proof of Ancillary Residential Family Connection Statement',
      ];
      buildingRegsRequirement =
        'Exempt from standard Building Regulations under Mobile Homes statutory framework; we nonetheless engineer all units to full BS 3632 residential park home standards.';
      topTips = [
        'The annex must maintain a functional domestic link with the main house (e.g. shared utility bills, garden access, family care).',
        'Cannot be let out as a separate independent commercial tenancy without full change of use consent.',
      ];
    } else if (
      isDomesticGarden &&
      (intendedUse === 'ancillary_annex_family' || !meetsPDHeights || !meetsPDSiting || designation === 'conservation_area' || designation === 'listed_curtilage')
    ) {
      // 3. Householder Planning Permission
      routeType = 'householder_planning';
      probability = designation === 'listed_curtilage' ? 'Moderate (70–80%)' : 'High (85–90%)';
      probabilityColor = designation === 'listed_curtilage' ? 'text-amber-400' : 'text-emerald-400';
      routeTitle = 'Householder Planning Application';
      statutoryTimescale = '8 Weeks Statutory LPA Determination';
      keyStatute = 'Section 57 Town & Country Planning Act 1990 (Householder Development)';
      explanation =
        'Because your proposal includes residential annex living, exceeds strict Class E height/boundary dimensions, or sits within a sensitive conservation/listed setting, a standard Householder Planning Application is required. Planning support can help improve your approval odds.';
      requiredReports = [
        'Design & Access Statement (DAS)',
        'RIBA Stage 3 BIM Architectural Drawings & Photorealistic 3D Renders',
        'Biodiversity Net Gain (BNG) 10% Landscape Mitigation Plan',
        designation === 'listed_curtilage' ? 'Heritage Impact Assessment (HIA)' : 'Arboricultural Tree Survey (BS 5837)',
      ];
      buildingRegsRequirement =
        'Mandatory Full Building Regulations Approval (Part L Energy Conservation, Part B Fire Safety, Part P Electrics, Part M Access).';
      topTips = [
        'Position the cabin with sympathetic natural timber finishes (Nordic Larch/Charcoal) to complement neighboring properties.',
        'Include low-impact screw pile foundation engineering to demonstrate zero root compaction around mature garden trees.',
      ];
    } else if (
      landType === 'commercial_tourism' ||
      intendedUse === 'commercial_holiday_let'
    ) {
      // 4. Full Commercial Planning Permission
      routeType = 'full_planning';
      probability = 'Moderate (70–80%)';
      probabilityColor = 'text-amber-400';
      routeTitle = 'Full Planning Permission (Commercial Tourism / Change of Use)';
      statutoryTimescale = '8–12 Weeks Statutory LPA Committee Determination';
      keyStatute = 'Full Planning Permission & Change of Use (Class C1 / C3 Holiday Let)';
      explanation =
        'Creating income-generating commercial holiday lodges or glamping developments requires Full Planning Permission with comprehensive planning justification, traffic impact reviews, and ecology surveys. Local authorities strongly favor high-sustainability timber eco-lodges with off-grid microgrids.';
      requiredReports = [
        'Tourism Economic Viability & Business Case Statement',
        'Ecological Preliminary Appraisal (PEA) & 10% Biodiversity Metric',
        'Transport Access, Highway Passing Places & Swept-Path Analysis',
        'Private Water Foul Drainage & Off-Grid Solar Strategy',
      ];
      buildingRegsRequirement =
        'Mandatory Commercial Building Regulations & Commercial Fire Risk Assessment (BS 9999 / Part B).';
      topTips = [
        'Emphasize zero-carbon construction, local economic spend in the rural economy, and eco-sensitive ground screw foundations.',
        'Pre-application advice (Pre-App) with local officers can help de-risk planning before formal submission.',
      ];
    } else if (
      landType === 'agricultural_woodland' &&
      intendedUse === 'agricultural_worker'
    ) {
      // 5. Rural Exception / Agricultural Worker
      routeType = 'rural_exception';
      probability = 'Moderate (70–80%)';
      probabilityColor = 'text-amber-400';
      routeTitle = 'Agricultural / Forestry Essential Worker Dwelling (NPPF Para 84)';
      statutoryTimescale = '8–12 Weeks LPA Determination';
      keyStatute = 'National Planning Policy Framework (NPPF) Paragraph 84(a) Essential Rural Need';
      explanation =
        'Constructing a permanent or temporary residential log home in open countryside or agricultural land requires demonstrating an essential functional need for a worker to reside full-time on site (e.g. livestock husbandry, timber forestry, aquaculture).';
      requiredReports = [
        'Independent Agricultural/Forestry Functional & Financial Need Appraisal',
        'Comprehensive Farm/Estate Management Plan',
        'Temporary 3-Year Renewable Cabin Siting Strategy',
      ];
      buildingRegsRequirement = 'Full Building Regulations Compliance (Part L / SAP Calculations).';
      topTips = [
        'Opt for a modular relocatable log cabin structure to secure a 3-year temporary consent first before establishing permanent status.',
      ];
    } else {
      // 6. Full Major Planning Permission (Greenfield, Replacement, SSSI)
      routeType = 'full_planning';
      probability = designation === 'sssi_flood' ? 'Specialist Consultation Required' : 'Moderate (70–80%)';
      probabilityColor = designation === 'sssi_flood' ? 'text-rose-400' : 'text-amber-400';
      routeTitle = 'Full Planning Permission & Environmental Appraisal';
      statutoryTimescale = '8–13 Weeks Determination';
      keyStatute = 'Section 57 Town and Country Planning Act 1990 (Major / Sensitive Siting)';
      explanation =
        'Your project involves sensitive land designations, primary residential new-builds in open countryside, or complex statutory constraints. A tailored planning strategy from a qualified town planner can help navigate local policies, committee meetings, and environmental consultees.';
      requiredReports = [
        'Full Planning Architectural Submission Pack (RIBA Stage 3)',
        'Flood Risk Assessment (FRA Zone 2/3) & Surface Water SuDS Drainage Strategy',
        'Habitats Regulations Assessment (HRA) & Nutrient Neutrality Calculations',
        'Landscape and Visual Impact Assessment (LVIA)',
      ];
      buildingRegsRequirement =
        'Full Statutory Building Control Approval with Passivhaus / EPC A+ Standard Verification.';
      topTips = [
        'A formal Planning Appraisal and LPA Pre-Application meeting before finalizing land purchase is strongly recommended.',
      ];
    }

    return {
      routeType,
      routeTitle,
      probability,
      probabilityColor,
      statutoryTimescale,
      keyStatute,
      explanation,
      requiredReports,
      buildingRegsRequirement,
      topTips,
    };
  }, [formData]);

  const handleCopySummary = () => {
    const text = `UK PLANNING PERMISSION ASSESSMENT SUMMARY
Project: ${formData.intendedUse.replace(/_/g, ' ').toUpperCase()} (${formData.dimensions.footprintSqM}m²)
Land Category: ${formData.landType.replace(/_/g, ' ').toUpperCase()}
Designation: ${formData.designation.replace(/_/g, ' ').toUpperCase()}

LIKELY PLANNING ROUTE: ${planningAssessment.routeTitle}
Statutory Timescale: ${planningAssessment.statutoryTimescale}
Approval Probability: ${planningAssessment.probability}
Key Statute: ${planningAssessment.keyStatute}

Explanation:
${planningAssessment.explanation}

Required Reports:
${planningAssessment.requiredReports.map((r) => `- ${r}`).join('\n')}

Building Regulations:
${planningAssessment.buildingRegsRequirement}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  return (
    <div id="planning-permissions-wizard" className="mt-16 pt-12 border-t border-stone-800 text-stone-100">
      
      {/* Wizard Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-3">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive UK Planning & Permitted Development Wizard</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-100">
            Check Your Cabin's Planning Permission Route
          </h3>
          <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Answer 4 quick questions about your land, location constraints, and intended cabin use to receive an instant statutory appraisal based on current UK Town & Country Planning legislation.
          </p>
        </div>

        {/* Step Indicator Pill */}
        <div className="flex items-center gap-2 bg-stone-950 px-4 py-2 rounded-2xl border border-stone-800 self-start lg:self-auto">
          <span className="text-xs text-stone-400 font-mono">
            Step <strong className="text-amber-400 font-bold">{currentStep}</strong> of {TOTAL_STEPS}
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all ${
                  currentStep === step
                    ? 'w-6 bg-amber-500'
                    : currentStep > step
                    ? 'w-2 bg-amber-600'
                    : 'w-2 bg-stone-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Wizard Shell Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Questions Card (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-stone-950 border border-stone-800 shadow-2xl space-y-6">
          
          {/* STEP 1: Land Category */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Question 1 / 4 • Land Classification
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                  Where will the log cabin be sited?
                </h4>
                <p className="text-xs text-stone-400">
                  Planning legislation in the UK distinguishes strictly between domestic residential curtilage and agricultural/commercial land.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    id: 'garden_curtilage',
                    title: 'Domestic Garden / Residential Curtilage',
                    desc: 'Private garden grounds attached to an existing dwellinghouse.',
                    icon: Building2,
                    badge: 'Permitted Dev Eligible',
                  },
                  {
                    id: 'agricultural_woodland',
                    title: 'Agricultural Land / Woodland / Smallholding',
                    desc: 'Acreage outside of a residential domestic garden boundary.',
                    icon: Trees,
                    badge: 'Rural Policy Applies',
                  },
                  {
                    id: 'commercial_tourism',
                    title: 'Commercial Tourism / Glamping Site',
                    desc: 'Holiday let park, leisure venue, or hospitality business.',
                    icon: Sparkles,
                    badge: 'Commercial Route',
                  },
                  {
                    id: 'brownfield_replacement',
                    title: 'Brownfield / Replacement Dwelling Plot',
                    desc: 'Replacing an existing dilapidated barn or certified structure.',
                    icon: Layers,
                    badge: 'Replacement Policy',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.landType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setFormData({ ...formData, landType: item.id as any })}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-amber-950/60 border-amber-500 shadow-lg ring-1 ring-amber-500'
                          : 'bg-stone-900/60 border-stone-800 hover:bg-stone-900 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-400">
                          {item.badge}
                        </span>
                      </div>
                      <div>
                        <div className={`font-serif font-bold text-sm ${isSelected ? 'text-amber-300' : 'text-stone-100'}`}>
                          {item.title}
                        </div>
                        <div className="text-[11px] text-stone-400 mt-1 leading-snug">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Statutory Designations */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Question 2 / 4 • Environmental & Statutory Constraints
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                  Does your land have any special designations?
                </h4>
                <p className="text-xs text-stone-400">
                  Protected landscapes and conservation zones have modified permitted development thresholds and local design requirements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    id: 'unrestricted',
                    title: 'Standard Unrestricted Land',
                    desc: 'No Article 4 Directions, SSSIs, or special designated landscape orders.',
                    icon: CheckCircle2,
                  },
                  {
                    id: 'national_park_aonb',
                    title: 'National Park / National Landscape (AONB)',
                    desc: 'Cairngorms, Lake District, Cotswolds, Snowdonia, New Forest, etc.',
                    icon: Trees,
                  },
                  {
                    id: 'conservation_area',
                    title: 'Conservation Area / World Heritage',
                    desc: 'Local authority conservation status with strict aesthetic controls.',
                    icon: Building2,
                  },
                  {
                    id: 'green_belt',
                    title: 'Metropolitan / Country Green Belt',
                    desc: 'Strict presumption against inappropriate open countryside development.',
                    icon: ShieldCheck,
                  },
                  {
                    id: 'sssi_flood',
                    title: 'SSSI / High Flood Zone (Zone 2/3)',
                    desc: 'Site of Special Scientific Interest or designated EA flood plain.',
                    icon: AlertTriangle,
                  },
                  {
                    id: 'listed_curtilage',
                    title: 'Listed Building Curtilage / Article 4',
                    desc: 'Grounds of a Grade I, II* or II listed historic building.',
                    icon: Award,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.designation === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setFormData({ ...formData, designation: item.id as any })}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-amber-950/60 border-amber-500 shadow-lg ring-1 ring-amber-500'
                          : 'bg-stone-900/60 border-stone-800 hover:bg-stone-900 hover:border-stone-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-serif font-bold text-xs sm:text-sm ${isSelected ? 'text-amber-300' : 'text-stone-100'}`}>
                          {item.title}
                        </div>
                        <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Intended Cabin Use */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Question 3 / 4 • Intended Occupancy & Function
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                  How will the log cabin be used?
                </h4>
                <p className="text-xs text-stone-400">
                  The intended use dictates whether the building is classified as "Incidental" (Class E), "Ancillary Living" (Annex), or "Primary Residential" (C3).
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {[
                  {
                    id: 'incidental_office_gym',
                    title: 'Incidental Domestic Use (Home Office, Gym, Studio, Garden Room)',
                    desc: 'Non-habitable daytime use supporting family lifestyle with no permanent sleeping accommodation.',
                    badge: 'PD Class E Prime Candidate',
                  },
                  {
                    id: 'ancillary_annex_family',
                    title: 'Ancillary Granny / Family Annex (Bedrooms, Bathrooms, Kitchenette)',
                    desc: 'Used as an overflow sleeping annex for family members or dependent relatives sharing the main house.',
                    badge: 'Caravan Act / Householder',
                  },
                  {
                    id: 'primary_residence',
                    title: 'Primary Full-Time Residence (Self-Build Family Home)',
                    desc: 'A standalone, fully independent dwellinghouse with separate address and council tax rating.',
                    badge: 'Full Planning Required',
                  },
                  {
                    id: 'commercial_holiday_let',
                    title: 'Commercial Holiday Let / Airbnb / Eco-Tourism Lodge',
                    desc: 'Rented out to paying short-stay guests or retreat attendees as a commercial enterprise.',
                    badge: 'Commercial Change of Use',
                  },
                  {
                    id: 'agricultural_worker',
                    title: 'Agricultural or Forestry Worker Essential Dwelling',
                    desc: 'Occupied by a full-time rural worker managing on-site livestock, farm, or woodland estate.',
                    badge: 'NPPF Para 84 Route',
                  },
                ].map((item) => {
                  const isSelected = formData.intendedUse === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setFormData({ ...formData, intendedUse: item.id as any })}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'bg-amber-950/60 border-amber-500 shadow-lg ring-1 ring-amber-500'
                          : 'bg-stone-900/60 border-stone-800 hover:bg-stone-900 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <div className={`font-serif font-bold text-sm ${isSelected ? 'text-amber-300' : 'text-stone-100'}`}>
                          {item.title}
                        </div>
                        <div className="text-xs text-stone-400 mt-1 leading-snug">
                          {item.desc}
                        </div>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-700 text-amber-300">
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Transportable Mobile Lodge Checkbox for Annexes */}
              {formData.intendedUse === 'ancillary_annex_family' && (
                <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-600/40 space-y-2 mt-4">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.isMobileCaravanCompliant}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isMobileCaravanCompliant: e.target.checked,
                        })
                      }
                      className="mt-1 w-4 h-4 rounded text-amber-500 accent-amber-500 cursor-pointer"
                    />
                    <div>
                      <div className="font-serif font-bold text-xs sm:text-sm text-stone-200">
                        Engineer as a Transportable Dual-Chassis Mobile Timber Lodge?
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                        A dual-chassis modular interlocking log construction may qualify for a different exemption route for residential annexes -- but this depends on your exact circumstances, so always confirm with your Local Planning Authority before relying on it.
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Dimensions & Placement */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Question 4 / 4 • Dimensions, Heights & Siting
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                  What are the proposed dimensions and site placement?
                </h4>
                <p className="text-xs text-stone-400">
                  Permitted development Class E restricts eaves height to 2.5m near boundaries and maximum 4.0m dual-pitch ridge height.
                </p>
              </div>

              {/* Footprint Area Slider */}
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-300 font-semibold">Total Internal Footprint:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {formData.dimensions.footprintSqM} m² ({Math.round(formData.dimensions.footprintSqM * 10.764)} sq ft)
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="160"
                  step="5"
                  value={formData.dimensions.footprintSqM}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dimensions: {
                        ...formData.dimensions,
                        footprintSqM: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full accent-amber-500 bg-stone-950 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>15 m² (Studio)</span>
                  <span>45 m² (Garden Lodge)</span>
                  <span>90 m² (Twin-Bed)</span>
                  <span>160 m² (Full Residence)</span>
                </div>
              </div>

              {/* Height & Boundary Radio Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Height Category */}
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <div className="text-xs font-semibold text-stone-200">Proposed Ridge / Eaves Height:</div>
                  <div className="space-y-1.5">
                    {[
                      { id: 'under_2_5m', label: 'Flat Roof ≤ 2.5m Total Height' },
                      { id: 'dual_pitch_under_4m', label: 'Dual-Pitched Roof ≤ 4.0m (2.5m Eaves)' },
                      { id: 'over_4m', label: 'Over 4.0m Ridge Height (Two-Storey)' },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                          formData.dimensions.heightCategory === opt.id
                            ? 'bg-amber-950/80 text-amber-300 font-semibold'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="heightCategory"
                          checked={formData.dimensions.heightCategory === opt.id}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              dimensions: {
                                ...formData.dimensions,
                                heightCategory: opt.id as any,
                              },
                            })
                          }
                          className="accent-amber-500"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Boundary Distance */}
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <div className="text-xs font-semibold text-stone-200">Distance to Property Boundary:</div>
                  <div className="space-y-1.5">
                    {[
                      { id: 'over_2m', label: 'More than 2.0m from all boundaries' },
                      { id: 'under_2m', label: 'Within 2.0m of a garden boundary' },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                          formData.dimensions.boundaryDistance === opt.id
                            ? 'bg-amber-950/80 text-amber-300 font-semibold'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="boundaryDistance"
                          checked={formData.dimensions.boundaryDistance === opt.id}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              dimensions: {
                                ...formData.dimensions,
                                boundaryDistance: opt.id as any,
                              },
                            })
                          }
                          className="accent-amber-500"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Siting Toggles */}
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs cursor-pointer select-none">
                  <span className="text-stone-300">Covers less than 50% of the total garden curtilage area?</span>
                  <input
                    type="checkbox"
                    checked={formData.dimensions.gardenCoverageUnder50Pct}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: {
                          ...formData.dimensions,
                          gardenCoverageUnder50Pct: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs cursor-pointer select-none">
                  <span className="text-stone-300">Located behind or to the side of the principal (front) elevation?</span>
                  <input
                    type="checkbox"
                    checked={formData.dimensions.placedBehindFrontElevation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: {
                          ...formData.dimensions,
                          placedBehindFrontElevation: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={() => setFormData(INITIAL_WIZARD_STATE)}
                className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            )}

            {currentStep < TOTAL_STEPS ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  const elem = document.getElementById('planning-assessment-result');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Review Full Assessment</span>
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Live Dynamic Statutory Assessment Card (5 cols) */}
        <div id="planning-assessment-result" className="lg:col-span-5 space-y-4">
          <div className="p-6 sm:p-7 rounded-3xl bg-stone-950 border-2 border-amber-500/50 shadow-2xl space-y-5 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Assessment Header */}
            <div className="space-y-1.5 border-b border-stone-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Statutory Evaluation
                </span>
                <span className={`text-xs font-mono font-bold ${planningAssessment.probabilityColor}`}>
                  {planningAssessment.probability} Approval
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 leading-snug">
                {planningAssessment.routeTitle}
              </h4>
              <div className="text-xs font-mono text-stone-400 flex items-center gap-1.5 pt-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Timescale: <strong>{planningAssessment.statutoryTimescale}</strong></span>
              </div>
            </div>

            {/* Legal Statute Citation */}
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-300 font-mono leading-relaxed">
              <span className="text-amber-400 font-semibold block mb-0.5">Statutory Basis:</span>
              {planningAssessment.keyStatute}
            </div>

            {/* Legal Explanation */}
            <div className="text-xs text-stone-300 leading-relaxed">
              {planningAssessment.explanation}
            </div>

            {/* Required Documentation Pack */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Statutory Submission Pack</span>
              </div>
              <ul className="space-y-1.5">
                {planningAssessment.requiredReports.map((rep, idx) => (
                  <li key={idx} className="text-xs text-stone-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rep}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Building Regulations Summary */}
            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1">
              <div className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Building Control (Building Regs)</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                {planningAssessment.buildingRegsRequirement}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() =>
                  onBookConsultation(
                    `Planning Route Consultation: ${planningAssessment.routeTitle} (${formData.intendedUse}, ${formData.dimensions.footprintSqM}m²)`
                  )
                }
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg"
              >
                <span>Instruct Chartered Planner (MRTPI)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopySummary}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedSummary ? 'Copied Summary to Clipboard!' : 'Copy Assessment Summary'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
