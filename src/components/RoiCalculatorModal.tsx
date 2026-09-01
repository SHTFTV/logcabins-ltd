import React, { useState, useMemo } from 'react';
import { X, Calculator, TrendingUp, DollarSign, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

interface RoiCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoiCalculatorModal: React.FC<RoiCalculatorProps> = ({ isOpen, onClose }) => {
  const [cabinCost, setCabinCost] = useState<number>(140000);
  const [nightlyRate, setNightlyRate] = useState<number>(240);
  const [occupancyRate, setOccupancyRate] = useState<number>(75); // %
  const [managementFeePct, setManagementFeePct] = useState<number>(15); // %

  const stats = useMemo(() => {
    const bookedNights = Math.round(365 * (occupancyRate / 100));
    const grossAnnualRevenue = bookedNights * nightlyRate;
    const managementCost = Math.round(grossAnnualRevenue * (managementFeePct / 100));
    const cleaningAndUtilities = Math.round(bookedNights * 38); // approx cleaning/linens/heating per booked stay
    const insuranceAndMaintenance = 2800;

    const totalOperatingCost = managementCost + cleaningAndUtilities + insuranceAndMaintenance;
    const netAnnualProfit = grossAnnualRevenue - totalOperatingCost;
    const netRoiPct = ((netAnnualProfit / cabinCost) * 100).toFixed(1);
    const paybackYears = (cabinCost / netAnnualProfit).toFixed(1);

    return {
      bookedNights,
      grossAnnualRevenue,
      totalOperatingCost,
      netAnnualProfit,
      netRoiPct,
      paybackYears,
    };
  }, [cabinCost, nightlyRate, occupancyRate, managementFeePct]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-stone-700 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/30 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-100">
                Holiday Let & Airbnb Yield Calculator
              </h3>
              <p className="text-xs text-stone-400">
                Simulate gross turnover, operating margins & payback period
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

        {/* Sliders and Metrics */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            {/* Total Build Investment */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-300 mb-1">
                <span>Total Turnkey Investment:</span>
                <span className="font-mono text-amber-400 text-sm">£{cabinCost.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="40000"
                max="350000"
                step="5000"
                value={cabinCost}
                onChange={(e) => setCabinCost(Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Nightly rate */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-300 mb-1">
                <span>Average Nightly Rental Rate:</span>
                <span className="font-mono text-amber-400 text-sm">£{nightlyRate}/night</span>
              </div>
              <input
                type="range"
                min="90"
                max="550"
                step="10"
                value={nightlyRate}
                onChange={(e) => setNightlyRate(Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Occupancy % */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-300 mb-1">
                <span>Annual Occupancy Rate:</span>
                <span className="font-mono text-amber-400 text-sm">{occupancyRate}% ({stats.bookedNights} nights/yr)</span>
              </div>
              <input
                type="range"
                min="40"
                max="95"
                step="5"
                value={occupancyRate}
                onChange={(e) => setOccupancyRate(Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Management Fee */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-300 mb-1">
                <span>Management / Booking Commission:</span>
                <span className="font-mono text-stone-400">{managementFeePct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={managementFeePct}
                onChange={(e) => setManagementFeePct(Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-950 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Results Bento */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-800">
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="text-[10px] uppercase font-bold text-stone-500">Gross Annual Revenue</div>
              <div className="text-xl font-bold font-mono text-stone-100 mt-1">
                £{stats.grossAnnualRevenue.toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="text-[10px] uppercase font-bold text-stone-500">Net Annual Profit</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                £{stats.netAnnualProfit.toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-600/40 col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-bold text-amber-300">Net Yield (ROI)</div>
              <div className="text-2xl font-black font-mono text-amber-400 mt-0.5">
                {stats.netRoiPct}% <span className="text-xs font-sans text-stone-400 font-normal">/ yr</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/80 text-xs text-stone-400 flex items-center justify-between">
            <span>Estimated Capital Payback Period:</span>
            <span className="font-mono font-bold text-amber-400 text-sm">~{stats.paybackYears} Years</span>
          </div>
        </div>
      </div>
    </div>
  );
};
