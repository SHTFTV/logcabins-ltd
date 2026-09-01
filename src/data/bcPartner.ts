// Real BC/Canada service partner data for Superior Log Restorations (superiorlogrestorations.ca),
// Abbotsford, BC. LogCabins.ltd is a UK-market site; this partner covers log cabin and log home
// restoration/maintenance work for BC, Canada customers.
//
// Every fact here is either sourced directly from their public Google Business listing (name,
// phone, address, rating, review count) or confirmed directly by the site owner, who has a
// personal relationship with this business. Do not add stats, review counts, certifications,
// or claims beyond what's listed here without new confirmation.

export interface BCPartner {
  name: string;
  shortName: string;
  website: string;
  phone: string;
  phoneHref: string;
  address: string;
  city: string;
  googleRating: number;
  googleReviewCount: number;
  googleReviewsUrl: string;
  serviceRegionLabel: string;
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
  address: '33337 Westbury Ave',
  city: 'Abbotsford, BC V2S 1C4',
  googleRating: 4.8,
  googleReviewCount: 19,
  googleReviewsUrl: 'https://www.google.com/search?q=Superior+Log+Restorations+Abbotsford',
  serviceRegionLabel: 'British Columbia, Canada',
  credentials: ['Licensed Restoration Contractor', 'Locally Based in Abbotsford, BC'],
  tagline: 'Log home restoration, maintenance, and refinishing serving British Columbia.',
  services: [
    { name: 'Log Home Restoration', description: 'Full-scale restoration for existing log homes and cabins, including media blasting and re-coating.' },
    { name: 'Chinking & Caulking', description: 'Re-chinking and caulking to keep log walls sealed against BC’s wet coastal and interior climates.' },
    { name: 'Stain & Finish Maintenance', description: 'Re-staining and protective finish maintenance to guard against UV, moisture, and rot over time.' },
    { name: 'Log Repair', description: 'Repair of rot, insect damage, and structural log replacement where needed.' },
  ],
};
