import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  const { type, contact, details } = req.body || {};
  console.log(`[LogCabins.ltd Lead] Type: ${type}`, { contact, details, date: new Date().toISOString() });
  res.status(200).json({
    success: true,
    message: 'Thank you! Your inquiry has been registered and a cabin and land specialist will be in touch.',
    referenceId: 'LC-' + Math.floor(100000 + Math.random() * 900000)
  });
}
