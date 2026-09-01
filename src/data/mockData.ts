import { CabinModel, LandPlot, TurnkeyService } from '../types';

export const CABIN_MODELS: CabinModel[] = [
  {
    id: 'aspen-panorama-140',
    name: 'The Aspen Panorama',
    tagline: 'Architectural Glulam Luxury Lodge with Cathedral Glass Gables',
    category: 'luxury',
    price: 138500,
    areaSqM: 142,
    bedrooms: 3,
    bathrooms: 2,
    dimensions: '14.2m x 10.0m',
    wallThicknessMm: 200,
    timberType: 'Slow-Grown Nordic Glulam Pine',
    leadTimeWeeks: 10,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Our flagship architectural residence designed for dramatic panoramic views. Features a soaring 5.4m double-height vaulted great room, floor-to-ceiling triple glazed glass gables, integrated sauna suite, and sheltered exterior timber veranda.',
    features: [
      'Double-height cathedral vaulted ceiling',
      'Triple-glazed thermally broken Schuco aluminium glass facade',
      'Integral Scandinavian cedar sauna room',
      'Open-plan chef kitchen with stone island prep zone',
      'Engineered 200mm Glulam interlocking logs with zero thermal bridging',
      'Hidden MEP conduit channels pre-milled in timber core'
    ],
    energyRating: 'A+ (PassivHaus Compliant with Arctic Spec)',
    popular: true
  },
  {
    id: 'nordic-valhalla-95',
    name: 'Valhalla 3-Bed Retreat',
    tagline: 'Modern Scandinavian Masterpiece with Clean Horizontal Lines',
    category: 'residential',
    price: 89900,
    areaSqM: 96,
    bedrooms: 3,
    bathrooms: 1,
    dimensions: '11.8m x 8.2m',
    wallThicknessMm: 92,
    timberType: 'Kiln-Dried Scandinavian Spruce',
    leadTimeWeeks: 8,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designed specifically for contemporary family living or high-yield holiday retreats. Incorporates wide-format sliding corner doors that blur the boundary between indoor living and the natural wild surroundings.',
    features: [
      'Master bedroom with ensuite walk-in dressing room',
      'Spacious open-plan living and dining hub',
      'Dual-aspect timber wrap-around decking',
      'Low pitch zinc-style standing seam roof',
      'Compatible with off-grid hybrid power units'
    ],
    energyRating: 'A',
    popular: true
  },
  {
    id: 'highland-hideaway-60',
    name: 'Highland Hideaway 2-Bed',
    tagline: 'Cozy Forest Haven with Heavy Round-Log Character',
    category: 'residential',
    price: 64500,
    areaSqM: 62,
    bedrooms: 2,
    bathrooms: 1,
    dimensions: '8.5m x 7.4m',
    wallThicknessMm: 160,
    timberType: 'Chinked Siberian Larch Logs',
    leadTimeWeeks: 7,
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Authentic rustic timber craftsmanship built to withstand extreme upland weather. Outstanding thermal mass from heavy round logs coupled with Scandinavian wood-burning hearth.',
    features: [
      'Handcrafted interlocking saddle-notch corner joins',
      'Feature stone chimney breast & hearth allowance',
      'Deep cantilevered eaves protecting verandas from rainfall',
      'Mezzanine sleeping or reading loft'
    ],
    energyRating: 'B+'
  },
  {
    id: 'timber-studio-pod-28',
    name: 'TimberPod Garden Studio & Office',
    tagline: 'Planning-Exempt Turnkey Executive Workspace or Micro-Lodge',
    category: 'garden',
    price: 24950,
    areaSqM: 28,
    bedrooms: 1,
    bathrooms: 1,
    dimensions: '6.0m x 4.8m',
    wallThicknessMm: 70,
    timberType: 'Engineered Nordic ThermoWood Cladding',
    leadTimeWeeks: 4,
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The ultimate luxury garden studio or income-generating Airbnb micro-cabin. Fits within most residential Permitted Development rights (under 2.5m height to eaves) with zero planning delays.',
    features: [
      'Fast 3-day on-site erection by your assigned installer',
      'High acoustic acoustic soundproofing (Rw 48dB)',
      'Integrated hidden wiring for high-speed fiber & smart HVAC',
      'Minimal footprint ground-screw foundation system'
    ],
    energyRating: 'A',
    popular: true
  },
  {
    id: 'glacier-estate-220',
    name: 'Glacier Grand Estate Lodge',
    tagline: '5-Bedroom Multi-Tier Luxury Alpine Residence & Spa',
    category: 'luxury',
    price: 265000,
    areaSqM: 228,
    bedrooms: 5,
    bathrooms: 4,
    dimensions: '19.5m x 12.8m',
    wallThicknessMm: 240,
    timberType: 'Ultra-Heavy Square Glulam Larch',
    leadTimeWeeks: 14,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An uncompromising statement estate crafted for high-end luxury hospitality, boutique resorts, or multi-generational family compounds. Boasts two master wings, an indoor plunge pool/spa zone, and heated ski/equipment lockers.',
    features: [
      'Dedicated wellness wing with sauna, steam, and cold plunge',
      'Expansive heated timber terrace with sunken hot tub framing',
      'Dual stone double-sided fireplaces',
      'Commercial grade acoustic separation between bedroom wings',
      'Multi-zone smart geothermal heat pump readiness'
    ],
    energyRating: 'A++ (Zero-Carbon Ready)'
  },
  {
    id: 'nordic-cluster-resort-80',
    name: 'Fjord Holiday Lodge Unit',
    tagline: 'Commercial High-Yield Holiday Rental Pod (Pairable)',
    category: 'commercial',
    price: 74200,
    areaSqM: 78,
    bedrooms: 2,
    bathrooms: 2,
    dimensions: '10.5m x 7.5m',
    wallThicknessMm: 92,
    timberType: 'Treated Nordic Pine with UV Cedar Stain',
    leadTimeWeeks: 6,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Engineered specifically for park operators and landowners developing luxury holiday parks. High durability surfaces, fast turnover layouts, and optimized for 85%+ annual holiday occupancy.',
    features: [
      'Turnkey hard-wearing oak finishes designed for guest rentals',
      'Twin master suites with private terrace access',
      'Heavy duty anti-tamper smart lock and HVAC access',
      'Modular link option to connect multiple cabins via timber walkways'
    ],
    energyRating: 'A'
  }
];

export const SURROUNDING_LAND_PLOTS: LandPlot[] = [
  {
    id: 'plot-highland-loch-01',
    title: 'Loch Tay Highland Shoreline & Pine Ridge',
    location: 'Kenmore, Perthshire, Scottish Highlands',
    region: 'highlands',
    price: 185000,
    acreage: 4.8,
    terrain: 'Gentle elevated slope overlooking freshwater loch with ancient pine grove',
    accessRoad: 'Direct tarmac access with private 40m hardcore timber track',
    waterElectricStatus: 'Mains water at boundary; 3-phase electric nearby; off-grid solar approved',
    planningStatus: 'Full Planning (Residential)',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Rare opportunity to acquire 4.8 acres of private Scottish woodland leading right to shoreline water rights. Full residential planning permission secured for a bespoke timber lodge up to 250m² footprint.',
    coordinates: { lat: 56.582, lng: -4.015, x: 42, y: 22 },
    suitableCabinIds: ['aspen-panorama-140', 'glacier-estate-220', 'nordic-valhalla-95'],
    views: ['Panoramic Loch Views', 'Ben Lawers Mountain Range', 'Native Caledonian Forest'],
    featured: true
  },
  {
    id: 'plot-lakes-valley-02',
    title: 'Borrowdale Meadow & Forest Edge',
    location: 'Keswick, Lake District National Park, Cumbria',
    region: 'lakes',
    price: 240000,
    acreage: 3.2,
    terrain: 'Flat wildflower meadow bounded by traditional drystone wall and mature oak woodland',
    accessRoad: 'Adopted quiet lane with private gated field entrance',
    waterElectricStatus: 'Spring borehole tested clean; high-capacity hybrid solar layout mapped',
    planningStatus: 'Full Planning (Residential)',
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'In the heart of the Lake District UNESCO biosphere. Ideal for a luxury timber home blending seamlessly into the mountain landscape. Indicated low flood risk (confirm with your own survey) and well suited to screw-pile eco foundations.',
    coordinates: { lat: 54.551, lng: -3.148, x: 48, y: 38 },
    suitableCabinIds: ['aspen-panorama-140', 'highland-hideaway-60', 'nordic-valhalla-95'],
    views: ['Fells & Crags', 'Derwentwater Glimpse', 'Ancient Woodlands'],
    featured: true
  },
  {
    id: 'plot-snowdonia-ridge-03',
    title: 'Eryri Foothills & Mountain Stream Parcel',
    location: 'Betws-y-Coed, Snowdonia, North Wales',
    region: 'wales',
    price: 135000,
    acreage: 6.5,
    terrain: 'Tiered hillside with natural plateau building pad, bounding a year-round babbling stream',
    accessRoad: 'Compacted gravel track suitable for delivery trucks & mobile crane',
    waterElectricStatus: 'Natural fresh mountain stream (hydro potential) & borehole point surveyed',
    planningStatus: 'Tourism / Holiday Park',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Spectacular 6.5-acre property with permission for up to 3 holiday log cabin units or one expansive private retreat. High tourism rental demand with 40-minute drive to Mount Snowdon summits.',
    coordinates: { lat: 53.092, lng: -3.801, x: 38, y: 52 },
    suitableCabinIds: ['nordic-valhalla-95', 'nordic-cluster-resort-80', 'highland-hideaway-60'],
    views: ['Snowdonia Mountain Vistas', 'Valley Gorge', 'Private River Access']
  },
  {
    id: 'plot-cotswolds-woodland-04',
    title: 'Honeycombe Valley Forest Clearing',
    location: 'Chipping Campden, Cotswolds AONB',
    region: 'cotswolds',
    price: 295000,
    acreage: 2.1,
    terrain: 'Sheltered sun-drenched clearing in private mature beech and larch woodland',
    accessRoad: 'Private secure paved estate driveway with electric timber gates',
    waterElectricStatus: 'Full mains electricity, mains water, and gigabit fiber at site entrance',
    planningStatus: 'Full Planning (Residential)',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Ultra-prestigious Cotswolds setting. Perfect for an architectural Nordic Glulam residence combining rural seclusion with 90-minute commute proximity to London.',
    coordinates: { lat: 52.051, lng: -1.776, x: 55, y: 68 },
    suitableCabinIds: ['aspen-panorama-140', 'glacier-estate-220'],
    views: ['Rolling Cotswold Hills', 'Private Beech Woods', 'Sunset Valley']
  },
  {
    id: 'plot-yorkshire-dales-05',
    title: 'Wharfedale Moorland Vista Plot',
    location: 'Grassington, Yorkshire Dales',
    region: 'yorkshire',
    price: 110000,
    acreage: 1.8,
    terrain: 'Level limestone shelf with sweeping 360-degree moorland vistas',
    accessRoad: 'Council maintained country road with newly dropped kerb entrance',
    waterElectricStatus: 'Mains water adjacent; ready for ground-source geothermal loops',
    planningStatus: 'Outline Planning',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Clean, build-ready plot with outline consent for a sustainable 2-3 bed timber log home. Soil testing and drainage percolation completed with top rating.',
    coordinates: { lat: 54.072, lng: -2.001, x: 50, y: 46 },
    suitableCabinIds: ['nordic-valhalla-95', 'highland-hideaway-60', 'timber-studio-pod-28'],
    views: ['Yorkshire Moorlands', 'Limestone Pavements', 'Starlit Dark Sky Reserve']
  }
];

export const TURNKEY_SERVICES: TurnkeyService[] = [
  {
    id: 'planning-architectural',
    title: 'Architectural & Planning Permissions',
    subtitle: 'Planning Management & Building Warrant Support',
    iconName: 'Compass',
    description: 'We handle every stage of statutory approvals: full architectural 3D drawings, local council planning submissions, permitted development certificates, ecology surveys, and building control warrant sign-offs.',
    deliverables: [
      'Site layout & elevation CAD packs',
      'Structural timber engineering calculations',
      'Liaison with local authority planning officers',
      'Ecology, bat, and tree protection reports'
    ],
    estimatedCostRange: '£2,500 - £6,800 (Included free in Turnkey Bundles)',
    timeline: '4 - 8 weeks depending on local council'
  },
  {
    id: 'groundworks-foundations',
    title: 'Groundworks & Precision Foundations',
    subtitle: 'Eco Ground Screws, Insulated Rafts & Access Roads',
    iconName: 'Drill',
    description: 'Experienced civil engineering contractors prepare your land with minimal ecological disruption. From excavating access tracks and drainage attenuation to installing laser-leveled ground screws or insulated passive concrete slabs.',
    deliverables: [
      'Laser-level topographical 3D survey',
      'Screw-pile foundation system',
      'Sub-base drainage & stormwater soakaways',
      'Trenching for water, power, and sewage conduits'
    ],
    estimatedCostRange: '£6,000 - £18,500 based on terrain gradient',
    timeline: '1 - 2 weeks on-site'
  },
  {
    id: 'master-timber-erection',
    title: 'Master Craftsmen Timber Assembly',
    subtitle: 'Precision Log-by-Log Erection & Weather-tight Glazing',
    iconName: 'Hammer',
    description: 'Experienced Scandinavian and British timber masters assemble your cabin structure with millimeter precision. Interlocking glulam logs, roof trusses, breathable membrane, and acoustic triple-glazed windows.',
    deliverables: [
      'Mobile crane & scaffold management',
      'Interlocking heavy-log assembly with thermal expansion buffers',
      'High-performance roof insulation & standing-seam/slate roofing',
      'Airtightness taping and blower door pre-testing'
    ],
    estimatedCostRange: '£8,500 - £28,000 based on cabin scale',
    timeline: '1 - 3 weeks'
  },
  {
    id: 'offgrid-utilities',
    title: 'Off-Grid Power, Water & Bio-Septic',
    subtitle: 'Complete Self-Sufficiency in Remote Wilderness Locations',
    iconName: 'Zap',
    description: 'Unlock any piece of off-grid wilderness land. We install state-of-the-art hybrid Victron solar PV systems with lithium battery banks, private water borehole drilling with UV filtration, and eco micro-septic plants.',
    deliverables: [
      '8kW - 15kW Victron solar + 15kWh-30kWh lithium storage',
      'Backup ultra-quiet auto-start diesel/LPG generator',
      'Deep borehole drilling with filtration & pressure vessel',
      'Biological sewage treatment system'
    ],
    estimatedCostRange: '£14,000 - £36,000',
    timeline: '2 weeks concurrent'
  },
  {
    id: 'turnkey-interior-fitout',
    title: 'Turnkey Luxury Interiors & Saunas',
    subtitle: 'Chef Kitchens, Underfloor Heating & Handcrafted Woodwork',
    iconName: 'Sparkles',
    description: 'Step into a fully finished, ready-to-live home. Handcrafted solid oak and quartz kitchens, bespoke cedar saunas, luxury rain-shower bathrooms, and integrated dimmable Scandinavian lighting design.',
    deliverables: [
      'Complete first & second fix plumbing and electrical wiring',
      'Custom kitchen with integrated German appliances',
      'Heated towel rails, wet rooms, and free-standing stone baths',
      'Custom Finnish electric or wood-fired cedar sauna'
    ],
    estimatedCostRange: '£18,000 - £55,000',
    timeline: '3 - 4 weeks'
  },
  {
    id: 'weatherproofing-maintenance',
    title: 'Timber Weatherproofing & Maintenance',
    subtitle: 'Microporous UV Stains & Ongoing Care',
    iconName: 'ShieldCheck',
    description: 'We protect your investment against extreme rain, snow, and UV aging with 3-coat microporous organic oil stains. Ask your installer about warranty options available for your build.',
    deliverables: [
      'Full exterior 3-coat deep penetration treatment',
      'End-grain moisture sealers preventing moisture absorption',
      'Annual maintenance inspection service packages',
      'Ask your installer about available warranty options'
    ],
    estimatedCostRange: '£2,800 - £6,500',
    timeline: '4 days upon roof completion'
  }
];
