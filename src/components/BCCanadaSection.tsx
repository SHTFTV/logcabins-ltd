import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { SUPERIOR_LOG_RESTORATIONS } from '../data/bcPartner';

interface BCCanadaSectionProps {
  onBookConsultation: (topic: string) => void;
}

export const BCCanadaSection: React.FC<BCCanadaSectionProps> = ({ onBookConsultation }) => {
  const partner = SUPERIOR_LOG_RESTORATIONS;

  return (
    <section id="bc-canada-service" className="py-16 sm:py-20 bg-stone-900/60 border-y border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            British Columbia, Canada
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-100 mt-4">
            Already Own a Log Home in BC?
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-3 leading-relaxed">
            LogCabins.ltd is a UK-based cabin sales and turnkey build service. For existing log
            home restoration, re-chinking, refinishing, and repair work in British Columbia, we
            point Canadian visitors to a local partner we know directly:
          </p>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-stone-950 overflow-hidden grid md:grid-cols-5">
          <div className="md:col-span-3 p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-100">{partner.name}</h3>
              <p className="text-sm text-stone-400 mt-1">{partner.tagline}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {partner.credentials.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-800/50 rounded-full px-2.5 py-1"
                >
                  <ShieldCheck className="w-3 h-3" />
                  {c}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {partner.services.map((service) => (
                <div key={service.name} className="rounded-lg border border-stone-800 bg-stone-900/70 p-4">
                  <h4 className="text-sm font-semibold text-stone-100">{service.name}</h4>
                  <p className="mt-1 text-xs text-stone-500 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onBookConsultation('BC, Canada Log Home Restoration Referral')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer"
              >
                Ask Us About BC Referrals
              </button>
              <Link
                to="/bc-log-restoration"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-stone-200 border border-stone-700 hover:border-stone-500 transition-colors"
              >
                Find Your BC City <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 bg-stone-900/70 border-t md:border-t-0 md:border-l border-stone-800 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-stone-50">{partner.googleRating}</span>
                <span className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(partner.googleRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-700 text-stone-700'
                      }
                    />
                  ))}
                </span>
                <span className="text-xs text-stone-500">({partner.googleReviewCount} Google reviews)</span>
              </div>

              <a
                href={partner.phoneHref}
                className="flex items-center gap-3 rounded-lg bg-amber-600 hover:bg-amber-500 transition-colors px-4 py-3"
              >
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span className="text-sm font-semibold text-white">{partner.phone}</span>
              </a>

              <div className="flex items-start gap-3 rounded-lg border border-stone-800 px-4 py-3">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span className="text-xs text-stone-300 leading-relaxed">
                  {partner.address}<br />{partner.city}
                </span>
              </div>

              <a
                href={partner.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-700 hover:border-stone-500 text-stone-200 text-xs font-semibold py-2.5 transition-colors"
              >
                Read Google Reviews <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-700 hover:border-stone-500 text-stone-200 text-xs font-semibold py-2.5 transition-colors"
              >
                Visit {partner.shortName} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-[11px] text-stone-600 leading-relaxed">
              Serving {partner.serviceRegionLabel}. Independent local business — not a LogCabins.ltd branch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
