import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "../api/lib/storage";
import { insertSectionSchema, insertInstallationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Section API routes
  
  // Get all sections with optional filtering
  app.get("/api/sections", async (req, res) => {
    try {
      const { category, search, price_filter, page = '1', limit = '20' } = req.query;
      
      // Parse pagination parameters
      const pageNum = parseInt(page as string) || 1;
      const limitNum = parseInt(limit as string) || 20;
      const offset = (pageNum - 1) * limitNum;
      
      // Parse price filter to price range
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
  });

  // Get section by ID
  app.get("/api/sections/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const section = await storage.getSectionById(id);
      
      if (!section) {
        return res.status(404).json({ error: 'Section not found' });
      }
      
      res.json(section);
    } catch (error) {
      console.error('Error fetching section:', error);
      res.status(500).json({ error: 'Failed to fetch section' });
    }
  });

  // Create new section (admin only)
  app.post("/api/sections", async (req, res) => {
    try {
      const validatedData = insertSectionSchema.parse(req.body);
      const section = await storage.createSection(validatedData);
      res.status(201).json(section);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid section data', details: error.errors });
      }
      console.error('Error creating section:', error);
      res.status(500).json({ error: 'Failed to create section' });
    }
  });

  // Install section to shop
  app.post("/api/sections/:id/install", async (req, res) => {
    try {
      const { id } = req.params;
      const { shopDomain } = req.body;
      
      if (!shopDomain) {
        return res.status(400).json({ error: 'Shop domain is required' });
      }
      
      // Check if section exists
      const section = await storage.getSectionById(id);
      if (!section) {
        return res.status(404).json({ error: 'Section not found' });
      }
      
      // Check if already installed
      const isInstalled = await storage.isInstalled(id, shopDomain);
      if (isInstalled) {
        return res.status(409).json({ error: 'Section already installed' });
      }
      
      // Create installation record
      const installationData = { sectionId: id, shopDomain };
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
  });

  // Get installations for a shop
  app.get("/api/installations", async (req, res) => {
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
  });

  // Check if section is installed
  app.get("/api/sections/:id/installed", async (req, res) => {
    try {
      const { id } = req.params;
      const { shopDomain } = req.query;
      
      if (!shopDomain || typeof shopDomain !== 'string') {
        return res.status(400).json({ error: 'Shop domain is required' });
      }
      
      const isInstalled = await storage.isInstalled(id, shopDomain);
      res.json({ installed: isInstalled });
    } catch (error) {
      console.error('Error checking installation status:', error);
      res.status(500).json({ error: 'Failed to check installation status' });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: 'ok', message: 'Section Factory API is running' });
  });

  const httpServer = createServer(app);
  return httpServer;
}
