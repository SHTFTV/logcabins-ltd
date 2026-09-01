import React, { useState } from 'react';
import { CabinModel } from '../types';
import { X, Bed, Bath, Maximize2, Shield, SlidersHorizontal, Check, Phone, ArrowRight, Scale, Compass, Eye, Sparkles } from 'lucide-react';
import { VirtualWalkthroughModal } from './VirtualWalkthroughModal';

interface CabinDetailModalProps {
  cabin: CabinModel | null;
  onClose: () => void;
  onConfigure: (cabinId: string) => void;
  onBookSurvey: (cabinName: string) => void;
  onCompareCabin?: (cabinId: string) => void;
}

export const CabinDetailModal: React.FC<CabinDetailModalProps> = ({
  cabin,
  onClose,
  onConfigure,
  onBookSurvey,
  onCompareCabin,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState<boolean>(false);

  if (!cabin) return null;

  const images = cabin.gallery && cabin.gallery.length > 0 ? cabin.gallery : [cabin.image];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
        <div className="relative w-full max-w-4xl rounded-3xl bg-stone-900 border border-stone-700 shadow-2xl overflow-hidden my-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-950/80 border border-stone-700 text-stone-300 hover:text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Gallery Hero */}
          <div className="relative h-80 sm:h-96 bg-stone-950 group">
            <img
              src={images[activeImageIndex] || cabin.image}
              alt={cabin.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />

            {/* Virtual Walkthrough Floating Hero CTA Button */}
            <div className="absolute top-4 right-16 z-20">
              <button
                onClick={() => setIsWalkthroughOpen(true)}
                className="px-3.5 py-2 rounded-2xl bg-stone-950/85 hover:bg-stone-900 border border-amber-500/60 text-amber-300 hover:text-amber-200 text-xs font-bold shadow-xl backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <Compass className="w-4 h-4 text-amber-400" />
                <span>3D Virtual Walkthrough</span>
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-6 flex gap-2 z-10">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-amber-400 scale-105 shadow-lg' : 'border-stone-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Top badges */}
            <div className="absolute top-4 left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-amber-500 text-stone-950 text-xs font-bold shadow-md">
                {cabin.category.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-md bg-stone-950/90 text-stone-200 text-xs border border-stone-700 backdrop-blur-sm">
                {cabin.energyRating}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                  {cabin.name}
                </h3>
                <p className="text-stone-400 text-sm mt-1">{cabin.tagline}</p>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs uppercase text-stone-400 font-medium">Turnkey Kit From</div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 font-mono">
                  £{cabin.price.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-[11px] text-stone-400">Total Area</div>
                <div className="text-base font-bold text-stone-100 mt-0.5">{cabin.areaSqM} m²</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-[11px] text-stone-400">Bedrooms / Baths</div>
                <div className="text-base font-bold text-stone-100 mt-0.5">{cabin.bedrooms} Bed / {cabin.bathrooms} Bath</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-[11px] text-stone-400">Log Thickness</div>
                <div className="text-base font-bold text-amber-400 mt-0.5">{cabin.wallThicknessMm}mm Glulam</div>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <div className="text-[11px] text-stone-400">Lead Time</div>
                <div className="text-base font-bold text-stone-100 mt-0.5">~{cabin.leadTimeWeeks} Weeks</div>
              </div>
            </div>

            {/* Virtual Walkthrough Interactive Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-950 to-stone-900 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm text-stone-100 flex items-center gap-2">
                    <span>Interactive 3D Virtual Walkthrough</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      360° Pan & Orbit
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Experience simulated 3D camera pan over cathedral great rooms, Finnish saunas, mezzanine suites, and exterior decks.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsWalkthroughOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shrink-0"
              >
                <Eye className="w-4 h-4" />
                <span>Launch Walkthrough</span>
              </button>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-stone-200">Architectural Concept & Construction</h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                {cabin.description}
              </p>
            </div>

            {/* Detailed Features */}
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-stone-200">Engineered Specifications & Inclusions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cabin.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-950 border border-stone-800/80 text-xs text-stone-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onConfigure(cabin.id);
                }}
                className="flex-1 py-3.5 px-5 rounded-xl font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Customize & Price In Configurator</span>
              </button>

              <button
                onClick={() => setIsWalkthroughOpen(true)}
                className="py-3.5 px-4 rounded-xl font-medium text-amber-300 hover:text-amber-200 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-600/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>3D Tour</span>
              </button>

              {onCompareCabin && (
                <button
                  onClick={() => {
                    onClose();
                    onCompareCabin(cabin.id);
                  }}
                  className="py-3.5 px-4 rounded-xl font-medium text-stone-300 hover:text-white bg-stone-950 hover:bg-stone-800 border border-stone-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Compare</span>
                </button>
              )}

              <button
                onClick={() => {
                  onClose();
                  onBookSurvey(`Site Survey for ${cabin.name}`);
                }}
                className="py-3.5 px-5 rounded-xl font-medium text-stone-200 bg-stone-950 hover:bg-stone-800 border border-stone-700 transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Book Survey</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Virtual Walkthrough Modal Experience */}
      {isWalkthroughOpen && (
        <VirtualWalkthroughModal
          cabin={cabin}
          isOpen={isWalkthroughOpen}
          onClose={() => setIsWalkthroughOpen(false)}
          onConfigure={onConfigure}
          onBookSurvey={onBookSurvey}
        />
      )}
    </>
  );
};
