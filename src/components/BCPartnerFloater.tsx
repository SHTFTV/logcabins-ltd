import { useState } from 'react';
import { Phone, MapPin, Star, ExternalLink, X } from 'lucide-react';
import { BCPartner } from '../data/bcPartner';

// Sticky call/reviews contact card for our real British Columbia service partner.
// Mirrors the pattern used on SteelFencing.ca's location pages.
export function BCPartnerFloater({ partner }: { partner: BCPartner }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const fullStars = Math.floor(partner.googleRating);
  const hasHalfStar = partner.googleRating - fullStars >= 0.5;

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[280px] rounded-xl border border-stone-800 bg-stone-900 shadow-2xl shadow-black/50">
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-3 top-3 text-stone-500 hover:text-stone-200 transition-colors"
      >
        <X size={16} />
      </button>

      <div className="p-4 pb-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
          Serving BC, Canada
        </p>
        <p className="text-sm font-semibold text-stone-50 mt-0.5">{partner.shortName}</p>
      </div>

      <div className="px-4 pb-4 space-y-2">
        <a
          href={partner.phoneHref}
          className="flex items-center gap-3 rounded-lg bg-amber-600 hover:bg-amber-500 transition-colors px-3 py-2"
        >
          <Phone size={16} className="text-white shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-wide text-amber-100">Call</span>
            <span className="text-sm font-semibold text-white">{partner.phone}</span>
          </span>
        </a>

        <div className="flex items-center gap-3 rounded-lg border border-stone-700 px-3 py-2">
          <MapPin size={16} className="text-stone-300 shrink-0" />
          <span className="flex flex-col leading-tight min-w-0">
            <span className="text-[10px] uppercase tracking-wide text-stone-500">Address</span>
            <span className="text-xs font-semibold text-stone-100">{partner.address}, {partner.city}</span>
          </span>
        </div>

        <div className="rounded-lg border border-stone-800 px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-wide text-stone-500 mb-1">Google Reviews</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-stone-50">{partner.googleRating}</span>
            <span className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < fullStars || (i === fullStars && hasHalfStar)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-stone-700 text-stone-700'
                  }
                />
              ))}
            </span>
            <span className="ml-auto text-xs rounded-full bg-stone-800 px-2 py-0.5 text-stone-300">
              {partner.googleReviewCount}
            </span>
          </div>
          <a
            href={partner.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 rounded-md bg-stone-100 hover:bg-white transition-colors text-stone-900 text-xs font-semibold py-1.5"
          >
            Read Google Reviews
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
