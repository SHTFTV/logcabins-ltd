export interface CabinModel {
  id: string;
  name: string;
  tagline: string;
  category: 'garden' | 'residential' | 'luxury' | 'commercial';
  price: number;
  areaSqM: number;
  bedrooms: number;
  bathrooms: number;
  dimensions: string;
  wallThicknessMm: number;
  timberType: string;
  leadTimeWeeks: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  floorPlanUrl?: string;
  energyRating: string;
  popular?: boolean;
}

export interface LandPlot {
  id: string;
  title: string;
  location: string;
  region: 'highlands' | 'lakes' | 'wales' | 'cotswolds' | 'yorkshire' | 'scandinavia';
  price: number;
  acreage: number;
  terrain: string;
  accessRoad: string;
  waterElectricStatus: string;
  planningStatus: 'Full Planning (Residential)' | 'Outline Planning' | 'Permitted Development' | 'Tourism / Holiday Park';
  image: string;
  gallery: string[];
  description: string;
  coordinates: { lat: number; lng: number; x: number; y: number };
  suitableCabinIds: string[];
  views: string[];
  featured?: boolean;
}

export interface TurnkeyService {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  deliverables: string[];
  estimatedCostRange: string;
  timeline: string;
}

export interface ConfiguratorSelection {
  cabinId: string;
  plotId: string | null;
  timberFinish: string;
  insulationTier: 'standard' | 'nordic-winter' | 'arctic-passive';
  foundationType: 'ground-screws' | 'insulated-concrete-slab' | 'raised-timber-stilts';
  roofingType: 'standing-seam-metal' | 'natural-slate' | 'green-living-sedum';
  heatingSystem: 'wood-stove' | 'air-source-heat-pump' | 'infrared-underfloor' | 'combo';
  offGridPackage: boolean;
  saunaModule: boolean;
  wrapAroundDeck: boolean;
  interiorTurnkeyFitout: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  cabinModel: string;
  rating: number;
  text: string;
  date: string;
}

export interface CompletedProject {
  id: string;
  title: string;
  location: string;
  region: 'highlands' | 'lakes' | 'wales' | 'cotswolds' | 'yorkshire' | 'southeast' | 'scandinavia';
  category: 'residential' | 'luxury' | 'garden' | 'commercial' | 'offgrid';
  modelId: string;
  modelName: string;
  completionYear: number;
  buildDurationDays: number;
  areaSqM: number;
  bedrooms: number;
  bathrooms: number;
  wallThicknessMm: number;
  timberFinish: string;
  foundationType: string;
  heatingType: string;
  mainImage: string;
  aspectRatio: 'aspect-[4/5]' | 'aspect-[16/10]' | 'aspect-square' | 'aspect-[4/3]' | 'aspect-[3/4]';
  gallery: {
    url: string;
    caption: string;
    type: 'exterior' | 'interior' | 'construction' | 'sauna' | 'detail';
  }[];
  keyHighlights: string[];
  coordinates?: { lat: number; lng: number };
}

