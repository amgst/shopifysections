import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { category, search, price_filter, page = '1', limit = '20' } = req.query;
      
      const pageNum = parseInt(page as string) || 1;
      const limitNum = parseInt(limit as string) || 20;
      const offset = (pageNum - 1) * limitNum;
      
      let priceMin: number | undefined;
      let priceMax: number | undefined;
      let isFree: boolean | undefined;
      
      if (price_filter && typeof price_filter === 'string') {
        switch (price_filter) {
          case 'Free Only':
            isFree = true;
            break;
          case 'Under $5':
            isFree = false;
            priceMax = 4.99;
            break;
          case '$5 - $15':
            isFree = false;
            priceMin = 5;
            priceMax = 15;
            break;
          case '$15 - $25':
            isFree = false;
            priceMin = 15.01;
            priceMax = 25;
            break;
          case 'Over $25':
            isFree = false;
            priceMin = 25.01;
            break;
        }
      }
      
      const sections = await storage.filterSections({
        search: search as string,
        category: category as string,
        priceMin,
        priceMax,
        isFree,
        limit: limitNum,
        offset
      });
      
      res.json(sections);
    } catch (error) {
      console.error('Error fetching sections:', error);
      res.status(500).json({ error: 'Failed to fetch sections' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}