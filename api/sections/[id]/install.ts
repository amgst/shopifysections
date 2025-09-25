import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../../server/storage';
import { insertInstallationSchema } from '../../../shared/schema';
import { z } from 'zod';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { id } = req.query;
      const { shopDomain } = req.body;
      
      if (!shopDomain) {
        return res.status(400).json({ error: 'Shop domain is required' });
      }
      
      // Check if section exists
      const section = await storage.getSectionById(id as string);
      if (!section) {
        return res.status(404).json({ error: 'Section not found' });
      }
      
      // Check if already installed
      const isInstalled = await storage.isInstalled(id as string, shopDomain);
      if (isInstalled) {
        return res.status(409).json({ error: 'Section already installed' });
      }
      
      // Create installation record
      const installationData = { sectionId: id as string, shopDomain };
      const validatedData = insertInstallationSchema.parse(installationData);
      const installation = await storage.installSection(validatedData);
      
      res.status(201).json({
        message: 'Section installed successfully',
        installation,
        section
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid installation data', details: error.errors });
      }
      console.error('Error installing section:', error);
      res.status(500).json({ error: 'Failed to install section' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}