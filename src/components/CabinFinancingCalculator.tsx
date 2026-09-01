import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  PoundSterling, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  Hammer, 
  BadgePercent, 
  HelpCircle, 
  ArrowRight, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Hotel, 
  Home, 
  Trees, 
  Coins, 
  FileCheck2, 
  Clock, 
  Info,
  Copy,
  Check
} from 'lucide-react';
import { CABIN_MODELS } from '../data/mockData';

interface CabinFinancingCalculatorProps {
  onConfigureCabin: (cabinId: string) => void;
  onBookConsultation: (topic: string) => void;
}

type LoanType = 'turnkey_residential' | 'self_build_stage' | 'holiday_let' | 'garden_eco';
type RepaymentType = 'capital_and_interest' | 'interest_only';

interface LoanPreset {
  id: LoanType;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultCost: number;
  defaultDepositPct: number;
  defaultTermYears: number;
  defaultRate: number;
  defaultRepayment: RepaymentType;
  description: string;
}

const LOAN_PRESETS: LoanPreset[] = [
  {
    id: 'turnkey_residential',
    name: 'Turnkey Residential Mortgage',
    badge: 'Main Residence / Full Turnkey',
    icon: Home,
    defaultCost: 185000,
    defaultDepositPct: 20,
    defaultTermYears: 25,
    defaultRate: 4.65,
    defaultRepayment: 'capital_and_interest',
    description: 'Fixed or tracker residential mortgage for completed turnkey homes, built to UK Building Regulations standards. Ask your installer about structural warranty options.',
  },
  {
    id: 'self_build_stage',
    name: 'Self-Build Stage-Payment Loan',
    badge: 'Staged Drawdown / Flexible',
    icon: Hammer,
    defaultCost: 155000,
    defaultDepositPct: 25,
    defaultTermYears: 25,
    defaultRate: 5.45,
    defaultRepayment: 'capital_and_interest',
    description: 'Specialist self-build mortgage where funds are released in 4 scheduled tranches as construction milestones are verified.',
  },
  {
    id: 'holiday_let',
    name: 'Commercial Holiday Let Mortgage',
    badge: 'Tourism / High Yield',
    icon: Hotel,
    defaultCost: 140000,
    defaultDepositPct: 30,
    defaultTermYears: 20,
    defaultRate: 6.15,
    defaultRepayment: 'interest_only',
    description: 'Commercial mortgage assessed against projected Airbnb / holiday rental turnover rather than solely personal salary.',
  },
  {
    id: 'garden_eco',
    name: 'Garden Lodge & Studio Eco Finance',
    badge: 'Green Asset Loan / 5-10 Yrs',
    icon: Trees,
    defaultCost: 45000,
    defaultDepositPct: 15,
    defaultTermYears: 10,
    defaultRate: 6.9,
    defaultRepayment: 'capital_and_interest',
    description: 'Unsecured or asset-backed green loan for garden annexes, home offices, and permitted development glamping pods.',
  },
];

export const CabinFinancingCalculator: React.FC<CabinFinancingCalculatorProps> = ({
  onConfigureCabin,
  onBookConsultation,
}) => {
  // State
  const [activeLoanType, setActiveLoanType] = useState<LoanType>('turnkey_residential');
  const [projectCost, setProjectCost] = useState<number>(185000);
  const [depositPct, setDepositPct] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(4.65);
  const [repaymentType, setRepaymentType] = useState<RepaymentType>('capital_and_interest');
  const [showStageBreakdown, setShowStageBreakdown] = useState<boolean>(true);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [projectedNightlyRate, setProjectedNightlyRate] = useState<number>(220);

  // Apply preset
  const handleSelectPreset = (preset: LoanPreset) => {
    setActiveLoanType(preset.id);
    setProjectCost(preset.defaultCost);
    setDepositPct(preset.defaultDepositPct);
    setTermYears(preset.defaultTermYears);
    setInterestRate(preset.defaultRate);
    setRepaymentType(preset.defaultRepayment);
  };

  // Quick Cabin Model loader
  const handleLoadCabinModel = (cabinId: string) => {
    const found = CABIN_MODELS.find(c => c.id === cabinId);
    if (found) {
      // Estimated Turnkey Cost = Base Kit + £25k groundwork + £15k assembly/roofing
      const estimatedTurnkey = Math.round(found.price * 1.32);
      setProjectCost(estimatedTurnkey);
    }
  };

  // Calculations
  const calculations = useMemo(() => {
    const depositAmount = Math.round(projectCost * (depositPct / 100));
    const loanAmount = Math.max(0, projectCost - depositAmount);
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = termYears * 12;

    let monthlyPayment = 0;
    let totalRepayable = 0;
    let totalInterest = 0;

    if (loanAmount > 0) {
      if (repaymentType === 'interest_only') {
        monthlyPayment = loanAmount * monthlyRate;
        totalInterest = monthlyPayment * totalMonths;
        totalRepayable = loanAmount + totalInterest;
      } else {
        if (monthlyRate === 0) {
          monthlyPayment = loanAmount / totalMonths;
        } else {
          monthlyPayment =
            (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
        }
        totalRepayable = monthlyPayment * totalMonths;
        totalInterest = Math.max(0, totalRepayable - loanAmount);
      }
    }

    // Principal vs Interest ratio
    const principalPct = totalRepayable > 0 ? (loanAmount / totalRepayable) * 100 : 100;
    const interestPct = totalRepayable > 0 ? (totalInterest / totalRepayable) * 100 : 0;

    // Self-Build Stage releases
    const stages = [
      {
        stage: 'Stage 1',
        title: 'Site Prep & Foundations',
        description: 'Ground screws / insulated slab & service trenches',
        pct: 15,
        amount: Math.round(loanAmount * 0.15),
      },
      {
        stage: 'Stage 2',
        title: 'Glulam Timber Delivery & Crane Erection',
        description: 'Solid log wall structural shell assembly',
        pct: 35,
        amount: Math.round(loanAmount * 0.35),
      },
      {
        stage: 'Stage 3',
        title: 'Weather-Tight Enclosure',
        description: 'Roofing, triple-glazed aluminium joinery & membranes',
        pct: 25,
        amount: Math.round(loanAmount * 0.25),
      },
      {
        stage: 'Stage 4',
        title: 'First/Second Fix MEP & Turnkey Finish',
        description: 'Heat pump, electrics, cedar sauna & building control sign-off',
        pct: 25,
        amount: Math.round(loanAmount * 0.25),
      },
    ];

    // Estimated holiday let nights required to service monthly mortgage
    const netNightlyContribution = Math.round(projectedNightlyRate * 0.72); // after 28% cleaning/platform fees
    const nightsToCoverMortgage =
      netNightlyContribution > 0 ? (monthlyPayment / netNightlyContribution).toFixed(1) : '0';

    // Estimated Stamp Duty saving (Self-build vs Existing House):
    // Buying an existing £250k house = £0-£2.5k SDLT, but on land + self build, zero SDLT on the build cost!
    // Plus 20% HMRC DIY VAT Reclaim potential on self-build materials:
    const vatReclaimPotential = Math.round((projectCost * 0.45) * 0.2); // ~45% materials content

    return {
      depositAmount,
      loanAmount,
      monthlyPayment: Math.round(monthlyPayment),
      totalRepayable: Math.round(totalRepayable),
      totalInterest: Math.round(totalInterest),
      principalPct: Math.round(principalPct),
      interestPct: Math.round(interestPct),
      stages,
      nightsToCoverMortgage,
      vatReclaimPotential,
    };
  }, [projectCost, depositPct, termYears, interestRate, repaymentType, projectedNightlyRate]);

  const handleCopySummary = () => {
    const text = `LogCabins.ltd Financing Breakdown:
Project Cost: £${projectCost.toLocaleString()}
Deposit (${depositPct}%): £${calculations.depositAmount.toLocaleString()}
Loan Amount: £${calculations.loanAmount.toLocaleString()}
Term: ${termYears} Years @ ${interestRate}% APR (${repaymentType === 'capital_and_interest' ? 'Capital & Interest' : 'Interest-Only'})
Estimated Monthly Payment: £${calculations.monthlyPayment.toLocaleString()}/mo
Total Repayable: £${calculations.totalRepayable.toLocaleString()} (Total Interest: £${calculations.totalInterest.toLocaleString()})
Estimated Self-Build VAT Reclaim Potential (confirm eligibility with HMRC): ~£${calculations.vatReclaimPotential.toLocaleString()}`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <section id="financing-calculator" className="py-20 bg-stone-950 text-stone-100 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold mb-3">
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Self-Build & Turnkey Mortgage Estimator</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
              Cabin Financing & Mortgage Calculator
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Calculate accurate monthly repayments across self-build stage-release mortgages, turnkey residential loans, and holiday-let commercial investments.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              title="Copy financing estimate to clipboard"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              onClick={() => onBookConsultation('Mortgage & Self-Build Finance Consultation')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FileCheck2 className="w-4 h-4 text-stone-950" />
              <span>Speak to Timber Mortgage Broker</span>
            </button>
          </div>
        </div>

        {/* Loan Type Presets Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {LOAN_PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = activeLoanType === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-950/30 border-amber-500/80 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/40'
                    : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-stone-950 border border-stone-800 text-stone-400">
                      {preset.badge}
                    </span>
                  </div>
                  <div className="font-serif font-bold text-sm text-stone-100 mb-1">{preset.name}</div>
                  <p className="text-[11px] text-stone-400 leading-snug line-clamp-2">{preset.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Typical Rate:</span>
                  <span className="font-mono font-bold text-amber-400">{preset.defaultRate}% APR</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Two-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Inputs & Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-6">
              
              {/* Quick Cabin Model Reference Buttons */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-400 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Quick Fill From Popular Cabin Models:
                  </span>
                  <span className="text-[11px] text-stone-500 font-normal">(Includes est. groundworks + turnkey erection)</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {CABIN_MODELS.slice(0, 4).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleLoadCabinModel(c.id)}
                      className="px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-[11px] text-stone-300 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="font-medium text-stone-200">{c.name}</span>
                      <span className="font-mono text-amber-400">~£{Math.round(c.price * 1.32 / 1000)}k</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 1: Total Project Cost */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="input-project-cost" className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span>Total Project Budget (Turnkey / Self-Build)</span>
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-stone-400 text-sm font-serif">£</span>
                    <input
                      id="input-project-cost"
                      type="number"
                      min="20000"
                      max="600000"
                      step="5000"
                      value={projectCost}
                      onChange={(e) => setProjectCost(Math.max(10000, Number(e.target.value)))}
                      className="w-28 px-2 py-1 bg-stone-950 border border-stone-700 rounded-lg text-right font-mono font-bold text-amber-400 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
                <input
                  aria-label="Total Project Budget slider"
                  type="range"
                  min="30000"
                  max="450000"
                  step="5000"
                  value={projectCost}
                  onChange={(e) => setProjectCost(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-950 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>£30,000 (Garden Studio)</span>
                  <span>£180,000 (Turnkey 3-Bed)</span>
                  <span>£450,000+ (Alpine Estate)</span>
                </div>
              </div>

              {/* Slider 2: Down Payment / Deposit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="input-deposit-pct" className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <span>Deposit / Cash Equity ({depositPct}%)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-stone-400">
                      £{calculations.depositAmount.toLocaleString()}
                    </span>
                    <input
                      id="input-deposit-pct"
                      type="number"
                      min="10"
                      max="75"
                      step="5"
                      value={depositPct}
                      onChange={(e) => setDepositPct(Math.min(90, Math.max(5, Number(e.target.value))))}
                      className="w-16 px-2 py-1 bg-stone-950 border border-stone-700 rounded-lg text-right font-mono font-bold text-amber-400 text-sm focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-stone-400 text-xs">%</span>
                  </div>
                </div>
                <input
                  aria-label="Deposit percentage slider"
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={depositPct}
                  onChange={(e) => setDepositPct(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-950 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>10% (Minimum)</span>
                  <span>25% (Standard Self-Build)</span>
                  <span>50%+ (High Equity)</span>
                </div>
              </div>

              {/* Grid 2-Col for Loan Term & Interest Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Loan Term */}
                <div className="space-y-2 p-4 rounded-2xl bg-stone-950/70 border border-stone-800">
                  <div className="flex justify-between items-center">
                    <label htmlFor="input-loan-term" className="text-xs font-semibold text-stone-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Loan Term</span>
                    </label>
                    <div className="font-mono text-sm font-bold text-amber-400">{termYears} Years</div>
                  </div>
                  <input
                    aria-label="Loan term in years"
                    id="input-loan-term"
                    type="range"
                    min="5"
                    max="35"
                    step="1"
                    value={termYears}
                    onChange={(e) => setTermYears(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-stone-900 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>5 Yrs</span>
                    <span>20 Yrs</span>
                    <span>35 Yrs</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-2 p-4 rounded-2xl bg-stone-950/70 border border-stone-800">
                  <div className="flex justify-between items-center">
                    <label htmlFor="input-interest-rate" className="text-xs font-semibold text-stone-300 flex items-center gap-1">
                      <Percent className="w-3.5 h-3.5 text-amber-400" />
                      <span>Interest Rate (APR)</span>
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        id="input-interest-rate"
                        type="number"
                        min="2.0"
                        max="12.0"
                        step="0.05"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-16 px-1.5 py-0.5 bg-stone-900 border border-stone-700 rounded text-right font-mono font-bold text-amber-400 text-xs focus:outline-none focus:border-amber-500"
                      />
                      <span className="text-stone-400 text-xs">%</span>
                    </div>
                  </div>
                  <input
                    aria-label="Interest rate slider"
                    type="range"
                    min="3.0"
                    max="9.0"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-stone-900 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>3.0% (Prime)</span>
                    <span>5.5% (Self-Build)</span>
                    <span>9.0%</span>
                  </div>
                </div>

              </div>

              {/* Repayment Type Toggle */}
              <div className="pt-2 border-t border-stone-800/80">
                <div className="text-xs font-semibold text-stone-400 mb-2">Mortgage Repayment Structure:</div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setRepaymentType('capital_and_interest')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      repaymentType === 'capital_and_interest'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${repaymentType === 'capital_and_interest' ? 'text-white' : 'text-stone-500'}`} />
                    <span>Capital & Interest (Repayment)</span>
                  </button>

                  <button
                    onClick={() => setRepaymentType('interest_only')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      repaymentType === 'interest_only'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${repaymentType === 'interest_only' ? 'text-white' : 'text-stone-500'}`} />
                    <span>Interest-Only (Holiday Let / Investor)</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Self-Build Stage-Payment Drawdown Schedule */}
            <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <h3 className="font-serif text-base font-bold text-stone-100">
                    Self-Build Stage-Payment Drawdown Schedule
                  </h3>
                </div>
                <button
                  onClick={() => setShowStageBreakdown(!showStageBreakdown)}
                  className="text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  {showStageBreakdown ? 'Hide Stages' : 'View Stages'}
                </button>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed">
                UK self-build timber mortgages release capital in structured tranches upon milestone sign-offs by structural engineers and building control inspectors:
              </p>

              {showStageBreakdown && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {calculations.stages.map((st, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                          {st.stage} ({st.pct}%)
                        </span>
                        <span className="font-mono font-bold text-stone-100">£{st.amount.toLocaleString()}</span>
                      </div>
                      <div className="text-xs font-bold text-stone-200">{st.title}</div>
                      <div className="text-[11px] text-stone-400 leading-tight">{st.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Financial Results Summary Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Payment Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-amber-500/50 shadow-2xl space-y-6 relative overflow-hidden">
              
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Monthly Repayment Hero */}
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                  <PoundSterling className="w-3.5 h-3.5" />
                  <span>Estimated Monthly Payment</span>
                </div>
                <div className="font-serif text-4xl sm:text-5xl font-extrabold text-white">
                  £{calculations.monthlyPayment.toLocaleString()}
                  <span className="text-sm font-sans font-normal text-stone-400 ml-1">/ month</span>
                </div>
                <div className="text-xs text-stone-400">
                  Based on a <strong className="text-stone-200">£{calculations.loanAmount.toLocaleString()}</strong> loan over <strong className="text-stone-200">{termYears} years</strong> at <strong className="text-amber-400">{interestRate}% APR</strong>.
                </div>
              </div>

              {/* Financial Metrics Strip */}
              <div className="p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-stone-800/80">
                  <span className="text-stone-400">Total Project Cost</span>
                  <span className="font-mono font-bold text-stone-100">£{projectCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-800/80">
                  <span className="text-stone-400">Deposit Equity ({depositPct}%)</span>
                  <span className="font-mono font-bold text-emerald-400">£{calculations.depositAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-800/80">
                  <span className="text-stone-400">Total Borrowed Amount</span>
                  <span className="font-mono font-bold text-stone-100">£{calculations.loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-800/80">
                  <span className="text-stone-400">Total Interest Payable</span>
                  <span className="font-mono font-bold text-amber-400">£{calculations.totalInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Total Capital Repaid</span>
                  <span className="font-mono font-bold text-stone-200">£{calculations.totalRepayable.toLocaleString()}</span>
                </div>
              </div>

              {/* Principal vs Interest Amortization Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-stone-400">
                  <span>Loan Principal: <strong className="text-stone-200">{calculations.principalPct}%</strong></span>
                  <span>Total Interest: <strong className="text-amber-400">{calculations.interestPct}%</strong></span>
                </div>
                <div className="h-3 w-full rounded-full bg-stone-800 overflow-hidden flex">
                  <div 
                    style={{ width: `${calculations.principalPct}%` }} 
                    className="bg-amber-500 h-full transition-all duration-500" 
                    title={`Principal: ${calculations.principalPct}%`}
                  />
                  <div 
                    style={{ width: `${calculations.interestPct}%` }} 
                    className="bg-stone-600 h-full transition-all duration-500" 
                    title={`Interest: ${calculations.interestPct}%`}
                  />
                </div>
              </div>

              {/* Holiday Let Income Offset Box */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Hotel className="w-3.5 h-3.5" />
                    <span>Holiday Rental Offset</span>
                  </div>
                  <div className="text-[10px] font-mono text-stone-400">
                    @ £{projectedNightlyRate}/night
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-normal">
                  Renting this cabin for just <strong className="text-amber-300 font-mono text-sm">{calculations.nightsToCoverMortgage} nights/month</strong> completely covers your monthly mortgage payment.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-stone-400">Adjust Nightly Rate:</span>
                  <input
                    aria-label="Projected nightly rental rate"
                    type="range"
                    min="120"
                    max="450"
                    step="10"
                    value={projectedNightlyRate}
                    onChange={(e) => setProjectedNightlyRate(Number(e.target.value))}
                    className="flex-1 accent-amber-500 bg-stone-900 h-1.5 rounded cursor-pointer"
                  />
                  <span className="font-mono text-xs text-amber-400">£{projectedNightlyRate}</span>
                </div>
              </div>

              {/* UK Tax & HMRC Self-Build Considerations */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2.5 text-xs">
                <div className="font-semibold text-stone-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Potential UK Tax Considerations:</span>
                </div>
                <div className="space-y-1.5 text-stone-400 text-[11px] leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Stamp Duty (SDLT):</strong> Self-build projects may only attract SDLT on the raw land parcel rather than the finished value -- consult a tax advisor or conveyancer to confirm your eligibility and potential saving.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>DIY Housebuilders VAT Refund Scheme:</strong> You may be able to reclaim up to an estimated ~£{calculations.vatReclaimPotential.toLocaleString()} (20% VAT) on qualifying construction materials -- consult a tax advisor or HMRC guidance to confirm eligibility before relying on this figure.</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onBookConsultation(`Financing Consultation for £${projectCost.toLocaleString()} ${activeLoanType.replace(/_/g, ' ')} project`)}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-amber-950/40"
                >
                  <span>Apply for Mortgage Pre-Qualification</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onConfigureCabin('aspen-panorama-140')}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Customise Cabin to Match Your Budget</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
