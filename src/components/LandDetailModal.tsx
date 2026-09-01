import React, { useState } from 'react';
import { LandPlot } from '../types';
import { X, MapPin, Trees, Compass, Check, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface LandDetailModalProps {
  plot: LandPlot | null;
  onClose: () => void;
  onPairCabin: (plot: LandPlot) => void;
  onBookViewing: (plotTitle: string) => void;
}

export const LandDetailModal: React.FC<LandDetailModalProps> = ({
  plot,
  onClose,
  onPairCabin,
  onBookViewing,
}) => {
  if (!plot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-stone-900 border border-stone-700 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-950/80 border border-stone-700 text-stone-300 hover:text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-72 sm:h-80 bg-stone-950">
          <img src={plot.image} alt={plot.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />

          <div className="absolute top-4 left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-amber-500 text-stone-950 text-xs font-bold shadow-md">
              {plot.acreage} ACRES
            </span>
            <span className="px-3 py-1 rounded-md bg-emerald-950/90 text-emerald-300 text-xs border border-emerald-700 backdrop-blur-sm">
              {plot.planningStatus}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 flex items-center gap-1.5 text-xs text-amber-400 font-medium">
            <MapPin className="w-4 h-4" />
            <span>{plot.location}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-100">{plot.title}</h3>
              <p className="text-stone-400 text-xs mt-1">Scenic Parcel -- confirm legal title and building feasibility during your own due diligence</p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-[10px] uppercase text-stone-400 font-medium">Asking Price</div>
              <div className="text-2xl font-serif font-bold text-amber-400 font-mono">
                £{plot.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-serif text-base font-bold text-stone-200">Plot Overview & Terrain</h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">{plot.description}</p>
          </div>

          {/* Technical Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="text-[11px] text-stone-400 font-medium">Terrain & Soil Profile</div>
              <div className="text-xs text-stone-200">{plot.terrain}</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="text-[11px] text-stone-400 font-medium">Access & Roadways</div>
              <div className="text-xs text-stone-200">{plot.accessRoad}</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="text-[11px] text-stone-400 font-medium">Utilities & Water</div>
              <div className="text-xs text-stone-200">{plot.waterElectricStatus}</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="text-[11px] text-stone-400 font-medium">Planning Designation</div>
              <div className="text-xs text-emerald-300 font-medium">{plot.planningStatus}</div>
            </div>
          </div>

          {/* Views */}
          <div className="space-y-2">
            <h4 className="font-serif text-sm font-bold text-stone-200">Surrounding Landscape & Vistas</h4>
            <div className="flex flex-wrap gap-2">
              {plot.views.map((v, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onPairCabin(plot);
              }}
              className="flex-1 py-3.5 px-5 rounded-xl font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Trees className="w-4 h-4" />
              <span>Pair With Log Cabin (7% Bundle Rebate)</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBookViewing(`Physical Land Viewing for ${plot.title}`);
              }}
              className="py-3.5 px-6 rounded-xl font-medium text-stone-200 bg-stone-950 hover:bg-stone-800 border border-stone-700 transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Book Plot Viewing</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
