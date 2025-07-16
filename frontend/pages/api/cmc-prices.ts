import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbols } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_CMC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'CoinMarketCap API key not set' });
  }
  if (!symbols || typeof symbols !== 'string') {
    return res.status(400).json({ error: 'Missing symbols parameter' });
  }
  try {
    const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${encodeURIComponent(symbols)}&convert=USD`;
    const cmcRes = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
      },
    });
    if (!cmcRes.ok) {
      const text = await cmcRes.text();
      return res.status(cmcRes.status).json({ error: text });
    }
    const data = await cmcRes.json();
    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
} 