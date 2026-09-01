import React, { useState } from 'react';
import { X, Sparkles, Send, Trees, Compass, ShieldAlert, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface AiAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCabinRecommendation?: (cabinId: string) => void;
}

export const AiLandAdvisorModal: React.FC<AiAdvisorProps> = ({
  isOpen,
  onClose,
  onSelectCabinRecommendation,
}) => {
  const [intendedUse, setIntendedUse] = useState<string>('Holiday Rental & Personal Retreat');
  const [location, setLocation] = useState<string>('Scottish Highlands or Lake District');
  const [budget, setBudget] = useState<string>('£120,000 - £200,000');
  const [terrain, setTerrain] = useState<string>('Sloping woodland with water spring nearby');
  const [access, setAccess] = useState<string>('Track access existing, no mains sewage or electric');

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setIsFallback(false);

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intendedUse,
          location,
          budget,
          plotDetails: { terrain, access },
          cabinPreferences: { style: 'Glulam Timber Panoramic' },
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setResult(data.analysis);
        setIsFallback(Boolean(data.isFallback));
      } else {
        throw new Error(data.error || 'Failed to analyze land requirements');
      }
    } catch (err: any) {
      console.error(err);
      // Fallback: shown only if the live AI service is unreachable
      setIsFallback(true);
      setResult({
        suitabilityScore: 94,
        recommendation: `Your vision for a ${intendedUse} in ${location} with off-grid conditions is well-suited for our Nordic Glulam Timber Series (such as The Aspen Panorama or Valhalla 3-Bed). Because there is no mains electricity or sewage, a dedicated 10kW hybrid solar array with lithium storage coupled with a bio-digestive septic tank will provide a high degree of self-sufficiency.`,
        planningInsights: [
          'Full residential planning is feasible if integrated with eco-friendly timber foundations (ground screws).',
          'Permitted development may apply for secondary auxiliary lodge structures under 50% curtilage.',
          'Natural water spring can potentially be tapped with a UV borehole filtration system.'
        ],
        recommendedServices: [
          'Ground-Screw Precision Foundation (reduces root disturbance)',
          'Off-Grid Hybrid Solar (10kW) + Borehole UV Water Purification',
          'Airtight Arctic Timber Insulation Package (U-value < 0.14 W/m²K)'
        ],
        estimatedTimelineMonths: '4 to 6 months from topographical survey to key handover',
        estimatedTotalRange: '£135,000 - £185,000 all-inclusive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-stone-900 border border-stone-700 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/30 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-100">
                AI Land Suitability & Architectural Advisor
              </h3>
              <p className="text-xs text-stone-400">
                Instant feasibility review, planning insights & timber cabin recommendations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Intended Use
                </label>
                <select
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option>Primary Residential Home</option>
                  <option>Holiday Rental & Personal Retreat (Airbnb/VRBO)</option>
                  <option>Garden Executive Office / Wellness Pod</option>
                  <option>Commercial Multi-Cabin Holiday Park</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Location / Target Region
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                  placeholder="e.g. Scottish Highlands, Lake District, Cotswolds"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Estimated Total Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                >
                  <option>Under £80,000</option>
                  <option>£80,000 - £150,000</option>
                  <option>£150,000 - £250,000</option>
                  <option>£250,000 - £500,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Terrain & Ground Condition
                </label>
                <input
                  type="text"
                  value={terrain}
                  onChange={(e) => setTerrain(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                  placeholder="e.g. Sloping woodland, flat meadow, rock shelf"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Access & Current Utilities Status
              </label>
              <input
                type="text"
                value={access}
                onChange={(e) => setAccess(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                placeholder="e.g. Gated track, off-grid water needed, mains electric 100m away"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Consulting Architectural Models & Planning Regulations...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Expert Feasibility Analysis</span>
                </>
              )}
            </button>
          </form>

          {/* Results Output */}
          {result && (
            <div className="p-6 rounded-2xl bg-stone-950 border border-amber-500/40 space-y-5 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Architectural & Planning Report
                </span>
                <div className="flex items-center gap-2 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-600/40">
                  <span className="text-[11px] text-stone-300 font-medium">Suitability Index:</span>
                  <span className="text-xs font-mono font-bold text-amber-400">{result.suitabilityScore}/100</span>
                </div>
              </div>

              {isFallback && (
                <div className="flex items-start gap-2 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-[11px] text-stone-400">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Showing a general estimate — live AI analysis is temporarily unavailable, so this is not a personalized assessment of your details.</span>
                </div>
              )}

              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                {result.recommendation}
              </p>

              {/* Planning insights */}
              {result.planningInsights && result.planningInsights.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span>Planning & Regulatory Insights</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 pl-2">
                    {result.planningInsights.map((insight: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended services */}
              {result.recommendedServices && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                    <Trees className="w-4 h-4 text-amber-400" />
                    <span>Engineered Services Required</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.recommendedServices.map((srv: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-[11px] text-stone-300">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline & Price estimates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-800 text-xs">
                <div>
                  <span className="text-stone-500">Project Delivery Timeline:</span>
                  <div className="font-semibold text-stone-200">{result.estimatedTimelineMonths}</div>
                </div>
                <div>
                  <span className="text-stone-500">Estimated Turnkey Budget:</span>
                  <div className="font-semibold text-amber-400 font-mono">{result.estimatedTotalRange}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
