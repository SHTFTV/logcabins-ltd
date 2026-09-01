import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Phone, Mail, Star, ExternalLink, MapPin, ShieldCheck } from 'lucide-react';
import { BC_SERVICE_AREAS, SUPERIOR_LOG_RESTORATIONS } from '../data/bcPartner';

export function BCLocationPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const area = BC_SERVICE_AREAS.find((a) => a.slug === citySlug);
  const partner = SUPERIOR_LOG_RESTORATIONS;

  useEffect(() => {
    if (area) {
      document.title = `Log Home Restoration, ${area.name} BC | ${partner.name} — LogCabins.ltd`;
    }
  }, [area]);

  if (!area) {
    return <Navigate to="/bc-log-restoration" replace />;
  }

  // Short, plainly-worded Q&A pairs — written to be directly quotable by AI answer engines
  // and LLMs, and marked up below as FAQPage structured data.
  const faqs = [
    {
      q: `Does ${partner.shortName} serve ${area.name}, BC?`,
      a: `Yes. ${partner.shortName} is an Abbotsford-based, family-owned log home restoration company that services ${area.name} as part of its ${partner.serviceRegionLabel} coverage area.`,
    },
    {
      q: `How often does a log home in ${area.name} need re-staining?`,
      a: `As a general rule, log homes need refinishing every 3–5 years, though the exact interval depends on sun exposure, moisture, and the finish originally applied. A local assessment gives an accurate timeline for a specific ${area.name} property.`,
    },
    {
      q: `What log home services are available in ${area.name}?`,
      a: `${partner.shortName} offers ${partner.services.map((s) => s.name.toLowerCase()).join(', ')} for log homes in ${area.name} and the surrounding area.`,
    },
  ];

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen">
      <section className="border-b border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs text-stone-500 mb-4">
            <Link to="/" className="hover:text-amber-400">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/bc-log-restoration" className="hover:text-amber-400">BC, Canada</Link>
            <span className="mx-1.5">/</span>
            <span className="text-stone-300">{area.name}, BC</span>
          </nav>

          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            <MapPin className="w-3.5 h-3.5" /> {area.region}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-100">
            Log Home Restoration in {area.name}, BC
          </h1>
          <p className="mt-4 text-stone-400 max-w-2xl leading-relaxed">
            {area.blurb} LogCabins.ltd, a UK-based cabin and turnkey build company, points{' '}
            {area.name} visitors to{' '}
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              {partner.name}
            </a>
            , an {partner.city.split(',')[0]}-based, family-owned crew serving{' '}
            {partner.serviceRegionLabel} since {partner.since}.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={partner.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold px-5 py-3 text-sm transition-all"
            >
              <Phone className="w-4 h-4" /> Call {partner.phone}
            </a>
            <a
              href={partner.emailHref}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-700 hover:border-stone-500 text-stone-200 font-semibold px-5 py-3 text-sm transition-colors"
            >
              <Mail className="w-4 h-4" /> Email {partner.shortName}
            </a>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="px-4 py-10 border-b border-stone-800">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-extrabold text-stone-50">{partner.since}</div>
            <div className="text-[11px] uppercase tracking-wide text-stone-500 mt-1">Family Owned Since</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-stone-50">50+</div>
            <div className="text-[11px] uppercase tracking-wide text-stone-500 mt-1">Combined Years Experience</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-stone-50">2</div>
            <div className="text-[11px] uppercase tracking-wide text-stone-500 mt-1">Industry Associations</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-stone-50 flex items-center justify-center gap-1">
              {partner.googleRating}
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[11px] uppercase tracking-wide text-stone-500 mt-1">
              {partner.googleReviewCount} Google Reviews
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="px-4 pt-10">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2">
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
      </section>

      {/* Services */}
      <section className="px-4 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-stone-100 font-serif mb-2">
            Services in {area.name}
          </h2>
          <p className="text-sm text-stone-500 mb-6">{partner.tagline}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {partner.services.map((service) => (
              <div key={service.name} className="rounded-xl border border-stone-800 bg-stone-900 p-5">
                <h3 className="font-semibold text-stone-100">{service.name}</h3>
                <p className="mt-1.5 text-xs text-stone-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — plain Q&A pairs, also marked up as FAQPage structured data below */}
      <section className="px-4 pb-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-stone-100 font-serif mb-6">
            {area.name} Log Home Restoration — FAQ
          </h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-stone-800 bg-stone-900/70 p-5">
                <h3 className="text-sm font-semibold text-stone-100">{f.q}</h3>
                <p className="mt-1.5 text-xs text-stone-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews CTA */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto rounded-xl border border-stone-800 bg-stone-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-stone-50">{partner.googleRating}</span>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-stone-500">({partner.googleReviewCount} Google reviews)</span>
            </div>
            <p className="text-sm text-stone-400 mt-1">
              Rated by real customers of {partner.shortName} across British Columbia.
            </p>
          </div>
          <a
            href={partner.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 hover:bg-white text-stone-900 font-semibold px-4 py-2.5 text-sm transition-colors shrink-0"
          >
            Read Google Reviews <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Other areas */}
      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-400 mb-4">
            Also serving
          </h2>
          <div className="flex flex-wrap gap-2">
            {BC_SERVICE_AREAS.filter((a) => a.slug !== area.slug).map((a) => (
              <Link
                key={a.slug}
                to={`/bc-log-restoration/${a.slug}`}
                className="text-xs rounded-full border border-stone-800 px-3 py-1.5 text-stone-400 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
              >
                {a.name}, BC
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        // JSON-LD for the local service being featured on this page (breadcrumb + local
        // business + FAQ), aimed at both classic search and AI answer engines.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://logcabins.ltd/' },
                  { '@type': 'ListItem', position: 2, name: 'BC, Canada', item: 'https://logcabins.ltd/bc-log-restoration' },
                  { '@type': 'ListItem', position: 3, name: `${area.name}, BC`, item: `https://logcabins.ltd/bc-log-restoration/${area.slug}` },
                ],
              },
              {
                '@type': 'LocalBusiness',
                name: partner.name,
                telephone: partner.phone,
                email: partner.email,
                url: partner.website,
                areaServed: `${area.name}, BC`,
                foundingDate: String(partner.since),
                address: { '@type': 'PostalAddress', streetAddress: partner.address, addressLocality: 'Abbotsford', addressRegion: 'BC', addressCountry: 'CA' },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: partner.googleRating,
                  reviewCount: partner.googleReviewCount,
                },
              },
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          }),
        }}
      />
    </div>
  );
}
