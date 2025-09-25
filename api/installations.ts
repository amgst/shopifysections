import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { shopDomain } = req.query;
      
      if (!shopDomain || typeof shopDomain !== 'string') {
        return res.status(400).json({ error: 'Shop domain is required' });
      }
      
      const installations = await storage.getInstallationsByShop(shopDomain);
      res.json(installations);
    } catch (error) {
      console.error('Error fetching installations:', error);
      res.status(500).json({ error: 'Failed to fetch installations' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}