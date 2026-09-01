import { CompletedProject } from '../types';

export const COMPLETED_PROJECTS: CompletedProject[] = [
  {
    id: 'proj-glenfinnan-aspen',
    title: 'The Glenfinnan Highland Retreat',
    location: 'Loch Shiel, Fort William, Scottish Highlands',
    region: 'highlands',
    category: 'luxury',
    modelId: 'aspen-panorama-140',
    modelName: 'The Aspen Panorama (Customized)',
    completionYear: 2026,
    buildDurationDays: 14,
    areaSqM: 154,
    bedrooms: 3,
    bathrooms: 2,
    wallThicknessMm: 200,
    timberFinish: 'Natural Nordic Larch with Clear UV-Shield Organic Oil',
    foundationType: 'High-torque screw-pile foundation over granite sub-base',
    heatingType: 'Vaillant Air-Source Heat Pump + Scan 85 Wood Stove',
    mainImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'aspect-[4/5]',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Panoramic 5.4m double-height glass gable facing Loch Shiel at dusk',
        type: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cathedral vaulted great room with exposed 200mm Glulam interlocking ties',
        type: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
        caption: 'Precision mobile crane erecting interlocking gable logs on Day 4',
        type: 'construction'
      },
      {
        url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
        caption: 'Integrated Scandinavian cedar sauna suite overlooking pine trees',
        type: 'sauna'
      }
    ],
    keyHighlights: [
      'Custom triple-glazed curtain wall glazing',
      'Minimal ground disturbance foundation approach',
      'Fully autonomous hybrid solar + private loch borehole',
      'Weather-tight erection in around 14 days'
    ]
  },
  {
    id: 'proj-keswick-valhalla',
    title: 'Derwentwater Lakeside Valhalla Lodge',
    location: 'Borrowdale Valley, Keswick, Cumbria',
    region: 'lakes',
    category: 'residential',
    modelId: 'nordic-valhalla-95',
    modelName: 'Valhalla 3-Bed Retreat',
    completionYear: 2025,
    buildDurationDays: 9,
    areaSqM: 98,
    bedrooms: 3,
    bathrooms: 2,
    wallThicknessMm: 92,
    timberFinish: 'Dark Nordic Pine with Matte Anthracite Windows',
    foundationType: 'Eco Insulated Raft Slab with Integrated Hydronic Heating',
    heatingType: 'Mitsubishi Ecodan Air Source Heat Pump',
    mainImage: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'aspect-[16/10]',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
        caption: 'Low-profile Scandinavian horizontal silhouette tucked against fellside',
        type: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
        caption: 'Open-concept kitchen and dining with Scandinavian minimalist light oak',
        type: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lake District National Park approved slate roof and drystone wall base',
        type: 'detail'
      }
    ],
    keyHighlights: [
      'Designed with National Park planning considerations in mind',
      'Dual-aspect wrap-around Larch decking with mountain views',
      'Low-running-cost heat pump heating system'
    ]
  },
  {
    id: 'proj-cotswolds-timberpod',
    title: 'Honeycombe Studio & Executive Micro-Lodge',
    location: 'Chipping Campden, Cotswolds AONB',
    region: 'cotswolds',
    category: 'garden',
    modelId: 'timber-studio-pod-28',
    modelName: 'TimberPod Garden Studio & Office',
    completionYear: 2026,
    buildDurationDays: 3,
    areaSqM: 28,
    bedrooms: 1,
    bathrooms: 1,
    wallThicknessMm: 70,
    timberFinish: 'Warm Honey ThermoWood Cladding with Brushed Brass Trims',
    foundationType: 'Ground Screws (Zero Lawn Disturbance)',
    heatingType: 'Far-Infrared Ceiling Glass Panels + Smart Thermostat',
    mainImage: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'aspect-square',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80',
        caption: 'Finished studio nestled under mature beech trees in private garden',
        type: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Quiet workspace with acoustic soundproofing (48 dB) and garden views',
        type: 'interior'
      }
    ],
    keyHighlights: [
      'Style designed to fit within typical Permitted Development limits',
      'Assembled on-site in around 72 hours from truck arrival',
      'Integrated hidden CAT7 gigabit fiber and USB-C conduits'
    ]
  },
  {
    id: 'proj-snowdonia-cluster',
    title: 'Eryri Foothills Commercial Eco-Cabins',
    location: 'Betws-y-Coed, Snowdonia, North Wales',
    region: 'wales',
    category: 'commercial',
    modelId: 'nordic-cluster-resort-80',
    modelName: 'Fjord Holiday Lodge Unit (x3 Cluster)',
    completionYear: 2025,
    buildDurationDays: 21,
    areaSqM: 234,
    bedrooms: 6,
    bathrooms: 6,
    wallThicknessMm: 92,
    timberFinish: 'UV-Treated Scandinavian Spruce with Charcoal Standing Seam',
    foundationType: 'Raised Timber Stilts over Mountain Stream Bank',
    heatingType: 'Central Micro-District Heat Pump with Smart Guest Locks',
    mainImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'aspect-[4/3]',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Trio of luxury rental lodges connected by raised timber boardwalks',
        type: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
        caption: 'Commercial-grade oak finishes and ensuite master bedrooms',
        type: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
        caption: 'Rapid concurrent erection with dual mobile timber cranes',
        type: 'construction'
      }
    ],
    keyHighlights: [
      'Designed for high-turnover holiday-let operations',
      'Raised timber boardwalk connections between units',
      'Commercial sound insulation between guest sleeping quarters'
    ]
  },
  {
    id: 'proj-cairngorms-glacier',
    title: 'Cairngorms Alpine Multi-Tier Estate',
    location: 'Aviemore, Cairngorms National Park, Scotland',
    region: 'highlands',
    category: 'luxury',
    modelId: 'glacier-estate-220',
    modelName: 'Glacier Grand Estate Lodge',
    completionYear: 2026,
    buildDurationDays: 18,
    areaSqM: 240,
    bedrooms: 5,
    bathrooms: 4,
    wallThicknessMm: 240,
    timberFinish: 'Heavy Square 240mm Glulam Larch with Weathered Zinc Roof',
    foundationType: 'Insulated Reinforced Frost-Heave Concrete Slab',
    heatingType: 'NIBE Ground-Source Geothermal Loops + Twin Hearth Wood Burners',
    mainImage: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'aspect-[3/4]',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
        caption: '5-Bedroom grand residence sitting proudly against snow-capped peaks',
        type: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Vaulted great room with double-sided stone hearth and chandelier',
        type: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
        caption: 'Full wellness wing featuring 8-person custom cedar sauna and cold plunge',
        type: 'sauna'
      }
    ],
    keyHighlights: [
      '240mm Glulam solid log profile with zero external synthetic cladding',
      'Dual stone double-sided fireplaces designed for alpine conditions',
      'Designed to withstand high wind loads and heavy snow loads'
    ]
  },
  {
    id: 'proj-yorkshire-highland',
    title: 'Wharfedale Off-Grid Chinked Cabin',
    location: 'Grassington, Yorkshire Dales National Park',
    region: 'yorkshire',
    category: 'offgrid',
    modelId: 'highland-hideaway-60',
    modelName: 'Highland Hideaway 2-Bed',
    completionYear: 2025,
    buildDurationDays: 8,
    areaSqM: 64,
    bedrooms: 2,
    bathrooms: 1,
    wallThicknessMm: 160,
    timberFinish: 'Chinked Round Larch Logs with Natural Linseed Stain',
    foundationType: 'Ground Screws with Limestone Gravel Plinth',
    heatingType: 'Charnwood Island II Wood Stove with Water Jacket + Solar PV',
    mainImage: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'aspect-[4/5]',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80',
        caption: 'Chinked round log cabin blending seamlessly into the moorland skyline',
        type: 'exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
        caption: 'Warm amber pine interior with handcrafted saddle-notch corners',
        type: 'interior'
      },
      {
        url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
        caption: 'Victron 10kW hybrid solar storage installation powering off-grid lodge',
        type: 'detail'
      }
    ],
    keyHighlights: [
      'Designed for full off-grid self-sufficiency',
      'Authentic hand-notched character timber with modern airtight gaskets',
      'Rapid on-site erection on a remote moorland parcel'
    ]
  }
];
