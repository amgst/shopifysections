import { VercelRequest, VercelResponse } from '@vercel/node';
import { seedDatabase } from '../server/seed';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      await seedDatabase();
      res.json({ message: 'Database seeded successfully' });
    } catch (error) {
      console.error('Seed error:', error);
      res.status(500).json({ error: 'Failed to seed database' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}