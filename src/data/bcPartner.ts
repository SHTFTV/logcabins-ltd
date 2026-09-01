// Real BC/Canada service partner data for Superior Log Restorations (superiorlogrestorations.ca),
// Abbotsford, BC. LogCabins.ltd is a UK-market site; this partner covers log cabin and log home
// restoration/maintenance work for BC, Canada customers.
//
// Facts are sourced from their public Google Business listing (name, phone, address, rating,
// review count), their own live site's About/Contact pages (founders, founding year, association
// memberships, service areas), or confirmed directly by the site owner, who has a personal
// relationship with this business. Do not add stats, review counts, certifications, or claims
// beyond what's listed here without new confirmation.

export interface BCPartner {
  name: string;
  shortName: string;
  website: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  address: string;
  city: string;
  googleRating: number;
  googleReviewCount: number;
  googleReviewsUrl: string;
  serviceRegionLabel: string;
  since: number;
  experienceLabel: string;
  credentials: string[];
  tagline: string;
  services: { name: string; description: string }[];
}

export const SUPERIOR_LOG_RESTORATIONS: BCPartner = {
  name: 'Superior Log Restorations',
  shortName: 'Superior Log Restorations',
  website: 'https://www.superiorlogrestorations.ca',
  phone: '(604) 866-1460',
  phoneHref: 'tel:+16048661460',
  email: 'info@superiorlogrestorations.ca',
  emailHref: 'mailto:info@superiorlogrestorations.ca',
  address: '33337 Westbury Ave',
  city: 'Abbotsford, BC V2S 1C4',
  googleRating: 4.8,
  googleReviewCount: 19,
  googleReviewsUrl: 'https://www.google.com/search?q=Superior+Log+Restorations+Abbotsford',
  serviceRegionLabel: 'British Columbia, Canada',
  since: 2008,
  experienceLabel: 'Founders Eric & Bill Ristau bring a combined 50+ years in the log home industry',
  credentials: [
    'Licensed Restoration Contractor',
    'Family Owned Since 2008',
    'Member, International Log Builders Association',
    'Member, BC Log & Timber Builders Association',
  ],
  tagline: 'Log home restoration, maintenance, and refinishing serving British Columbia.',
  services: [
    { name: 'Log Home Restoration', description: 'Full-scale restoration for existing log homes and cabins, including media blasting and re-coating.' },
    { name: 'Chinking & Caulking', description: 'Re-chinking and caulking to keep log walls sealed against BC’s wet coastal and interior climates.' },
    { name: 'Stain & Finish Maintenance', description: 'Re-staining and protective finish maintenance to guard against UV, moisture, and rot over time.' },
    { name: 'Log Repair', description: 'Repair of rot, insect damage, and structural log replacement where needed.' },
  ],
};

export type BCRegion =
  | 'Lower Mainland & Fraser Valley'
  | 'Sea-to-Sky'
  | 'Thompson-Okanagan'
  | 'Cariboo'
  | 'Kootenays'
  | 'Vancouver Island & Gulf Islands';

export interface BCServiceArea {
  slug: string;
  name: string;
  region: BCRegion;
  /** Marks the handful of areas Superior Log Restorations publishes as dedicated pages on their own site. */
  isPublishedArea?: boolean;
  blurb: string;
}

// Superior Log Restorations is Abbotsford-based (Fraser Valley / Lower Mainland) and publishes
// dedicated service pages for Whistler, Kamloops, 100 Mile House, and the Southern/Northern Gulf
// Islands (see superiorlogrestorations.ca/about/, marked isPublishedArea below). The remaining
// towns are real BC communities within those same stated regions — grouped the way LogCabins.ltd
// groups L.S Fencing & Metal Work's Fraser Valley / Lower Mainland cities on SteelFencing.ca.
// Blurbs are written for LogCabins.ltd, not copied from Superior's site.
export const BC_SERVICE_AREAS: BCServiceArea[] = [
  // Lower Mainland & Fraser Valley — home turf, HQ in Abbotsford
  { slug: 'abbotsford-bc', name: 'Abbotsford', region: 'Lower Mainland & Fraser Valley', isPublishedArea: true, blurb: "Superior Log Restorations' home base — log home restoration, chinking, and refinishing for Abbotsford-area properties." },
  { slug: 'chilliwack-bc', name: 'Chilliwack', region: 'Lower Mainland & Fraser Valley', blurb: 'Log home restoration and re-chinking for Chilliwack and the eastern Fraser Valley.' },
  { slug: 'langley-bc', name: 'Langley', region: 'Lower Mainland & Fraser Valley', blurb: 'Log home maintenance, staining, and repair for Langley properties.' },
  { slug: 'mission-bc', name: 'Mission', region: 'Lower Mainland & Fraser Valley', blurb: 'Restoration and finish maintenance for log homes in and around Mission.' },
  { slug: 'surrey-bc', name: 'Surrey', region: 'Lower Mainland & Fraser Valley', blurb: 'Log home repair and refinishing for Surrey and the surrounding Lower Mainland.' },
  { slug: 'maple-ridge-bc', name: 'Maple Ridge', region: 'Lower Mainland & Fraser Valley', blurb: 'Chinking, staining, and structural log repair for Maple Ridge log homes.' },

  // Sea-to-Sky corridor
  { slug: 'whistler-bc', name: 'Whistler', region: 'Sea-to-Sky', isPublishedArea: true, blurb: 'Restoration, re-chinking, and refinishing for log homes and chalets in the Whistler resort region.' },
  { slug: 'squamish-bc', name: 'Squamish', region: 'Sea-to-Sky', blurb: 'Log home restoration and weatherproofing for Squamish and the Sea-to-Sky corridor.' },
  { slug: 'pemberton-bc', name: 'Pemberton', region: 'Sea-to-Sky', blurb: 'Log home maintenance and repair for Pemberton Valley properties.' },

  // Thompson-Okanagan / BC Interior
  { slug: 'kamloops-bc', name: 'Kamloops', region: 'Thompson-Okanagan', isPublishedArea: true, blurb: 'Log home restoration and maintenance built for the Kamloops interior climate — dry summers, hard freezes.' },
  { slug: 'merritt-bc', name: 'Merritt', region: 'Thompson-Okanagan', blurb: 'Log home repair and re-staining for Merritt and the Nicola Valley.' },
  { slug: 'salmon-arm-bc', name: 'Salmon Arm', region: 'Thompson-Okanagan', blurb: 'Log home restoration and chinking for Salmon Arm and the Shuswap region.' },
  { slug: 'vernon-bc', name: 'Vernon', region: 'Thompson-Okanagan', blurb: 'Log home refinishing and maintenance for Vernon and the North Okanagan.' },
  { slug: 'kelowna-bc', name: 'Kelowna', region: 'Thompson-Okanagan', blurb: 'Log home restoration, staining, and repair for Kelowna and the Central Okanagan.' },

  // Cariboo
  { slug: '100-mile-house-bc', name: '100 Mile House', region: 'Cariboo', isPublishedArea: true, blurb: 'Log home repair, chinking, and finish maintenance for the Cariboo region around 100 Mile House.' },
  { slug: 'williams-lake-bc', name: 'Williams Lake', region: 'Cariboo', blurb: 'Log home restoration and maintenance for Williams Lake and the surrounding Cariboo.' },
  { slug: 'quesnel-bc', name: 'Quesnel', region: 'Cariboo', blurb: 'Log home repair and re-staining for Quesnel-area properties.' },

  // Kootenays
  { slug: 'nelson-bc', name: 'Nelson', region: 'Kootenays', blurb: 'Log home restoration and re-chinking for Nelson and the West Kootenays.' },
  { slug: 'cranbrook-bc', name: 'Cranbrook', region: 'Kootenays', blurb: 'Log home maintenance and repair for Cranbrook and the East Kootenays.' },
  { slug: 'castlegar-bc', name: 'Castlegar', region: 'Kootenays', blurb: 'Log home restoration and finish maintenance for Castlegar-area properties.' },
  { slug: 'trail-bc', name: 'Trail', region: 'Kootenays', blurb: 'Log home repair and refinishing for Trail and the surrounding Kootenays.' },

  // Vancouver Island & Gulf Islands
  { slug: 'victoria-bc', name: 'Victoria', region: 'Vancouver Island & Gulf Islands', blurb: 'Log home restoration and maintenance for Victoria and the Greater Victoria area.' },
  { slug: 'nanaimo-bc', name: 'Nanaimo', region: 'Vancouver Island & Gulf Islands', blurb: 'Log home repair, chinking, and refinishing for Nanaimo and central Vancouver Island.' },
  { slug: 'duncan-bc', name: 'Duncan', region: 'Vancouver Island & Gulf Islands', blurb: 'Log home restoration and finish maintenance for the Cowichan Valley around Duncan.' },
  { slug: 'courtenay-comox-bc', name: 'Courtenay & Comox', region: 'Vancouver Island & Gulf Islands', blurb: 'Log home restoration and repair for the Comox Valley.' },
  { slug: 'southern-gulf-islands-bc', name: 'Southern Gulf Islands', region: 'Vancouver Island & Gulf Islands', isPublishedArea: true, blurb: 'Serving Vancouver Island and the Southern Gulf Islands, including Salt Spring, Gabriola, Pender, Mayne, Galiano, and Sidney Island.' },
  { slug: 'northern-gulf-islands-bc', name: 'Northern Gulf Islands', region: 'Vancouver Island & Gulf Islands', isPublishedArea: true, blurb: 'Serving the Northern Gulf Islands, including Denman, Hornby, Texada, Quadra, and Cortes Island.' },
];
