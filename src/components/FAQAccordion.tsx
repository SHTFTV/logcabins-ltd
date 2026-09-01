import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  Compass, 
  Hammer, 
  ShieldCheck, 
  Sun, 
  Sparkles, 
  FileText, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'planning' | 'turnkey' | 'maintenance' | 'offgrid' | 'warranty';
  categoryLabel: string;
  question: string;
  answer: string;
  keyTakeaways?: string[];
}

const FAQS: FAQItem[] = [
  {
    id: 'planning-permission-needed',
    category: 'planning',
    categoryLabel: 'Land Planning & Permissions',
    question: 'Do I always need full planning permission to erect a log cabin in the UK?',
    answer: 'It depends on the parcel type, footprint size, and intended use. Under UK Permitted Development (PD) rights, single-storey garden studios (under 2.5m eaves height or 4m dual-pitch) for ancillary domestic use often require no full planning application. However, any standalone residential dwelling, holiday let, or cabin erected in National Parks, Areas of Outstanding Natural Beauty (AONB), or on agricultural land mandates Full Planning Permission or a Certificate of Lawful Development. We can connect you with qualified town planners to help with architectural drawings, ecological surveys, and local council submissions.',
    keyTakeaways: [
      'Ancillary garden studios under 30m² often fall under Permitted Development.',
      'Residential and commercial holiday lets always require council consent.',
      'Planning support can help improve your approval odds, but always confirm requirements with your Local Planning Authority.'
    ]
  },
  {
    id: 'planning-agricultural-land',
    category: 'planning',
    categoryLabel: 'Land Planning & Permissions',
    question: 'Can I purchase one of your land plots and build a cabin on it immediately?',
    answer: 'Each land parcel in our portfolio includes a planning feasibility profile for your own review. Plots listed as "Outline Planning Granted" or "Pre-App Approved" may be able to proceed straight to final building warrants, allowing groundworks to begin sooner -- always confirm current status with the Local Planning Authority. For rural meadow or woodland parcels, initial topographical and highway access audits are recommended before submitting bespoke Class Q or rural tourism applications tailored to the exact cabin footprint you choose.',
    keyTakeaways: [
      'Title deeds and a building feasibility summary are provided with land plot listings -- confirm details during your own legal due diligence.',
      'Pre-approved parcels may allow groundworks to begin sooner after purchase.',
      'Bundling land with a cabin can help streamline your planning consultation.'
    ]
  },
  {
    id: 'turnkey-timeline',
    category: 'turnkey',
    categoryLabel: 'Turnkey Construction',
    question: 'What is the end-to-end timeline from ordering to turnkey handover?',
    answer: 'A standard turnkey build typically takes 8 to 14 weeks from approved foundation engineering. Precision CNC timber milling takes approximately 3–4 weeks. Foundation installation (such as ground screws or insulated raft slabs) occurs concurrently on your site. Once timber arrives on flatbed transport, the erection team completes weather-tight timber assembly in 10 to 18 days, followed by 2–3 weeks of interior MEP (mechanical, electrical, plumbing), underfloor heating, and bespoke bathroom/kitchen fitouts.',
    keyTakeaways: [
      'Precision Glulam timber milling: 3–4 weeks.',
      'Foundations prepared concurrently with factory manufacturing.',
      'Weather-tight structural assembly in just 10–18 working days.'
    ]
  },
  {
    id: 'turnkey-difficult-access',
    category: 'turnkey',
    categoryLabel: 'Turnkey Construction',
    question: 'How do you handle remote, sloping, or difficult-to-access sites?',
    answer: 'We specialize in rugged and off-grid terrains across the Scottish Highlands, Wales, and rural England. We utilize low-impact ground screw foundation rigs that require zero concrete mixing on remote hillsides. For sites with narrow lanes or unpaved forest tracks, we deploy tracked all-terrain telehandlers or break down timber packs into specialized smaller transport shuttles. A free 3D topographical drone scan is performed prior to dispatch.',
    keyTakeaways: [
      'Zero-concrete ground screws anchor stably into slopes up to 35 degrees.',
      'Low-impact tracked carriers transport timber without damaging natural flora.',
      'Every site receives a preliminary access feasibility audit.'
    ]
  },
  {
    id: 'timber-maintenance-care',
    category: 'maintenance',
    categoryLabel: 'Cabin Maintenance & Timber Care',
    question: 'How often do timber log cabins need treatment and exterior maintenance?',
    answer: 'Our cabins are crafted from slow-grown Scandinavian Nordic Spruce and certified laminated Glulam, kiln-dried to a precise 12–14% moisture content to resist warping. In factory production, all logs receive anti-fungal and flame-retardant pressure dipping. Once erected, we apply a breathable microporous UV oil finish (such as Osmo or Remmers). We recommend applying a refresher topcoat every 4 to 6 years on sun-exposed elevations, and every 7 to 9 years on shaded elevations. No sanding back to bare wood is required.',
    keyTakeaways: [
      'Factory pressure-treated with anti-fungal and moisture inhibitors.',
      'Breathable microporous UV-resistant oil lasts 4 to 6+ years between refresher coats.',
      'No peeling, flaking, or laborious sanding required.'
    ]
  },
  {
    id: 'timber-settling-expansion',
    category: 'maintenance',
    categoryLabel: 'Cabin Maintenance & Timber Care',
    question: 'How do you accommodate natural timber expansion, contraction, and settling?',
    answer: 'Solid logs naturally settle slightly in their first 12 months as ambient humidity stabilizes. Engineered Glulam interlocking profiles are designed to significantly reduce shrinkage compared to green raw logs. Door and window apertures are typically installed using floating sub-frames and internal expansion jacks above structural posts, designed to minimize sticking or jamming during seasonal weather shifts.',
    keyTakeaways: [
      'Glulam lamination is designed to significantly reduce natural timber settling.',
      'Floating sub-frames help reduce window and door frame deformation.',
      'Threaded steel tension rods are designed to maintain a long-lasting airtight interlock.'
    ]
  },
  {
    id: 'offgrid-utilities',
    category: 'offgrid',
    categoryLabel: 'Off-Grid & Utilities',
    question: 'Can your cabins operate 100% off the grid with no mains electric or water?',
    answer: 'Yes, fully off-grid installations are achievable. We can help you plan integrated off-grid energy arrays featuring roof solar panels, lithium-iron-phosphate (LiFePO4) battery banks, and backup generators. For water, we coordinate borehole drilling with multi-stage UV filtration, alongside aerated bio-digester sewage treatment systems -- check compliance requirements with the Environment Agency for your specific site and system.',
    keyTakeaways: [
      'Hybrid solar + LiFePO4 battery power systems available.',
      'Check Environment Agency requirements for any septic or bio-digester system.',
      'Borehole drilling with UV and sediment filtration.'
    ]
  },
  {
    id: 'structural-warranty-finance',
    category: 'warranty',
    categoryLabel: 'Finance & Warranties',
    question: 'What structural warranties and finance options are provided?',
    answer: 'Warranty options vary by installer and manufacturer -- ask your installer about the structural and window warranty coverage available for your build. We can also connect you with UK specialist timber lenders and development finance brokers who may offer staged milestone drawdowns (e.g. 30% deposit, 40% delivery, 30% sign-off).',
    keyTakeaways: [
      'Ask your installer about available warranty options for structural timber and foundations.',
      'Milestone staged payment schedules can help protect your capital.',
      'Holiday let mortgage & commercial development financing support available through partner lenders.'
    ]
  }
];

interface FAQAccordionProps {
  onOpenAdvisor?: () => void;
  onOpenBooking?: (topic?: string) => void;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  onOpenAdvisor,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(['planning-permission-needed', 'turnkey-timeline']);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Topics', icon: HelpCircle },
    { id: 'planning', label: 'Land & Planning', icon: Compass },
    { id: 'turnkey', label: 'Turnkey Construction', icon: Hammer },
    { id: 'maintenance', label: 'Timber Care & Care', icon: ShieldCheck },
    { id: 'offgrid', label: 'Off-Grid & Utilities', icon: Sun },
    { id: 'warranty', label: 'Warranties & Finance', icon: FileText },
  ];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="faq-section" className="py-20 bg-stone-950 border-b border-stone-800 text-stone-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Expert Guidance & FAQ</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 tracking-tight">
            Planning, Turnkey Construction & Timber Care
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
            Everything you need to know about purchasing land plots, obtaining building permissions, our precision manufacturing process, and lifelong log maintenance.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search planning, foundations, off-grid, warranties..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-3">
              <p className="text-sm text-stone-400">No questions found matching "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs text-amber-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-stone-900/90 border-amber-500/40 shadow-lg'
                      : 'bg-stone-900/40 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-5 py-4.5 sm:px-6 sm:py-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-stone-950 border border-stone-800 text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                        {faq.categoryLabel}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-100 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border transition-transform duration-200 mt-1 ${
                        isOpen
                          ? 'bg-amber-500 text-stone-950 border-amber-400 rotate-180'
                          : 'bg-stone-950 text-stone-400 border-stone-800'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-stone-800/60 space-y-4">
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                        {faq.answer}
                      </p>

                      {faq.keyTakeaways && faq.keyTakeaways.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
                          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                            Key Highlights:
                          </div>
                          <ul className="space-y-1.5">
                            {faq.keyTakeaways.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Quick Help Prompt */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 via-stone-900 to-stone-950 border border-amber-700/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-base font-bold text-stone-100 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Have a specific site parcel or custom query?</span>
            </h4>
            <p className="text-xs text-stone-400">
              Consult our AI Planning Advisor for instant council feasibility or speak directly with our senior timber surveyor.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenAdvisor && (
              <button
                onClick={onOpenAdvisor}
                className="px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask AI Advisor</span>
              </button>
            )}
            {onOpenBooking && (
              <button
                onClick={() => onOpenBooking('Planning & Technical Site Assessment')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Book Survey</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
