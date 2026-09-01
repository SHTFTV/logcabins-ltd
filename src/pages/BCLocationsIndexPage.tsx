import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { BC_SERVICE_AREAS, BCRegion, SUPERIOR_LOG_RESTORATIONS } from '../data/bcPartner';

const REGION_ORDER: BCRegion[] = [
  'Lower Mainland & Fraser Valley',
  'Sea-to-Sky',
  'Thompson-Okanagan',
  'Cariboo',
  'Kootenays',
  'Vancouver Island & Gulf Islands',
];

export function BCLocationsIndexPage() {
  const partner = SUPERIOR_LOG_RESTORATIONS;
  const regions = REGION_ORDER.map((region) => ({
    region,
    areas: BC_SERVICE_AREAS.filter((a) => a.region === region),
  })).filter((g) => g.areas.length > 0);

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen">
      <section className="border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <nav className="text-xs text-stone-500 mb-4">
            <Link to="/" className="hover:text-amber-400">Home</Link>
            <span className="mx-1.5">/</span>
            <span className="text-stone-300">BC, Canada Log Restoration Areas</span>
          </nav>

          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            <MapPin className="w-3.5 h-3.5" /> Service Area
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-100">
            Log Home Restoration, British Columbia
          </h1>
          <p className="mt-4 text-stone-400 max-w-2xl leading-relaxed">
            For log home restoration, re-chinking, refinishing, and repair work in British
            Columbia, LogCabins.ltd points Canadian visitors to{' '}
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              {partner.name}
            </a>
            , an {partner.city.split(',')[0]}-based, family-owned crew serving BC since{' '}
            {partner.since}. Pick your area below for local contact details.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
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
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="max-w-5xl mx-auto space-y-12">
          {regions.map(({ region, areas }) => (
            <div key={region}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">
                {region}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {areas.map((area) => (
                  <Link
                    key={area.slug}
                    to={`/bc-log-restoration/${area.slug}`}
                    className="group rounded-xl border border-stone-800 bg-stone-900 p-5 hover:border-amber-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-stone-200 font-semibold">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      {area.name}, BC
                    </div>
                    <p className="mt-2 text-xs text-stone-500 leading-relaxed">{area.blurb}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:gap-1.5 transition-all">
                      View {area.name} page <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
            Serving {partner.serviceRegionLabel}. {partner.name} is an independent local
            business — not a LogCabins.ltd branch.
          </p>
        </div>
      </section>
    </div>
  );
}
