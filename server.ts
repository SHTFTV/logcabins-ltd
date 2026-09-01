import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini instance
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'LogCabins.ltd API', timestamp: new Date().toISOString() });
});

// AI Land & Cabin Match Advisory
app.post('/api/ai/advisor', async (req, res) => {
  try {
    const { plotDetails, cabinPreferences, budget, intendedUse, location } = req.body;
    const ai = getAI();

    if (!ai) {
      // Return smart structured fallback if no key is configured
      return res.json({
        success: true,
        isFallback: true,
        analysis: {
          suitabilityScore: 92,
          recommendation: `Based on your goal for ${intendedUse || 'a residential wilderness retreat'} with a budget of ${budget || 'mid-to-high range'}, our Nordic Glulam Timber Series (e.g., The Valhalla 3-Bed or Aspen Panorama) is optimal.`,
          planningInsights: [
            'Permitted Development rights may apply if under 50% of surrounding land curtilage, subject to height limits (max 4m ridge).',
            'Full residential planning is recommended for permanent dwellings with connection to off-grid solar and micro-treatment septic tanks.',
            'Timber engineered foundations (screw piles or insulated slab) reduce ground disturbance on uneven terrain.'
          ],
          recommendedServices: [
            'Full Turnkey Groundworks & Foundation Engineering',
            'Off-Grid Hybrid Solar (10kW) + Borehole Water Filtration',
            'Bespoke Nordic Spruce/Larch Thermal Insulation Package (U-value < 0.14)'
          ],
          estimatedTimelineMonths: '4 to 6 months from plot survey to turnkey handover',
          estimatedTotalRange: '£95,000 - £260,000 including groundwork, log erection, and off-grid utilities'
        }
      });
    }

    const prompt = `
You are the Chief Architectural & Real Estate Consultant for "LogCabins.ltd", a premier supplier and builder of luxury timber log cabins, turnkey construction services, and surrounding real estate plots across the UK and scenic regions.

Provide an expert, professional analysis and recommendations report for the client's project based on these details:
- Intended Use: ${intendedUse || 'Residential/Holiday Rental'}
- Preferred Location/Region: ${location || 'Rural / Forest / Lakeside'}
- Plot Details (Terrain/Access/Status): ${JSON.stringify(plotDetails || {})}
- Cabin Preferences: ${JSON.stringify(cabinPreferences || {})}
- Approximate Budget: ${budget || 'Flexible'}

Respond with JSON adhering to this structure:
{
  "suitabilityScore": <number 1-100>,
  "recommendation": "<detailed high-level architectural and land recommendation paragraph>",
  "planningInsights": ["<bullet 1>", "<bullet 2>", "<bullet 3>"],
  "recommendedServices": ["<service 1>", "<service 2>", "<service 3>"],
  "estimatedTimelineMonths": "<e.g., 3-5 months>",
  "estimatedTotalRange": "<estimated cost breakdown or range in GBP>"
}
Return only valid JSON.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, analysis: parsed });
  } catch (error: any) {
    console.error('Error in AI Advisor:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate advisory response'
    });
  }
});

// Lead / Booking submission
app.post('/api/leads/submit', (req, res) => {
  const { type, contact, details } = req.body;
  console.log(`[LogCabins.ltd Lead] Type: ${type}`, { contact, details, date: new Date().toISOString() });
  res.json({
    success: true,
    message: 'Thank you! Your inquiry has been registered and a cabin and land specialist will be in touch.',
    referenceId: 'LC-' + Math.floor(100000 + Math.random() * 900000)
  });
});

// Setup Vite middleware in dev or static files in prod
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LogCabins.ltd server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
