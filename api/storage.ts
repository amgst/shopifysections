import { 
  users, 
  sections, 
  installations,
  type User, 
  type InsertUser,
  type Section,
  type InsertSection,
  type Installation,
  type InsertInstallation
} from "../shared/schema";
import { db } from "./db";
import { eq, like, and, or, ilike, gte, lte, sql } from "drizzle-orm";

// Storage interface with section management capabilities
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Section methods
  getAllSections(): Promise<Section[]>;
  getSectionById(id: string): Promise<Section | undefined>;
  getSectionsByCategory(category: string): Promise<Section[]>;
  searchSections(query: string): Promise<Section[]>;
  filterSections(filters: {
    search?: string;
    category?: string;
    priceMin?: number;
    priceMax?: number;
    isFree?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Section[]>;
  createSection(section: InsertSection): Promise<Section>;
  updateSectionDownloads(id: string): Promise<void>;
  
  // Installation methods
  installSection(installation: InsertInstallation): Promise<Installation>;
  getInstallationsByShop(shopDomain: string): Promise<Installation[]>;
  isInstalled(sectionId: string, shopDomain: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Section methods
  async getAllSections(): Promise<Section[]> {
    return await db.select().from(sections);
  }

  async getSectionById(id: string): Promise<Section | undefined> {
    const [section] = await db.select().from(sections).where(eq(sections.id, id));
    return section || undefined;
  }

  async getSectionsByCategory(category: string): Promise<Section[]> {
    if (category === 'All Categories') {
      return this.getAllSections();
    }
    return await db.select().from(sections).where(eq(sections.category, category));
  }

  async searchSections(query: string): Promise<Section[]> {
    if (!query.trim()) {
      return this.getAllSections();
    }
    
    const searchPattern = `%${query.toLowerCase()}%`;
    return await db.select().from(sections).where(
      or(
        ilike(sections.name, searchPattern),
        ilike(sections.description, searchPattern)
      )
    );
  }

  async filterSections(filters: {
    search?: string;
    category?: string;
    priceMin?: number;
    priceMax?: number;
    isFree?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Section[]> {
    let query = db.select().from(sections);
    
    // Apply search filter
    if (filters.search) {
      const searchPattern = `%${filters.search.toLowerCase()}%`;
      query = query.where(
        or(
          ilike(sections.name, searchPattern),
          ilike(sections.description, searchPattern)
        )
      );
    }
    
    // Apply category filter
    if (filters.category && filters.category !== 'All Categories') {
      query = query.where(eq(sections.category, filters.category));
    }
    
    // Apply price filters
    if (filters.isFree) {
      query = query.where(eq(sections.price, 0));
    } else {
      if (filters.priceMin !== undefined) {
        query = query.where(gte(sections.price, filters.priceMin));
      }
      if (filters.priceMax !== undefined) {
        query = query.where(lte(sections.price, filters.priceMax));
      }
    }
    
    // Apply pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
      if (filters.offset) {
        query = query.offset(filters.offset);
      }
    }
    
    return await query;
  }

  async createSection(section: InsertSection): Promise<Section> {
    const [newSection] = await db
      .insert(sections)
      .values(section)
      .returning();
    return newSection;
  }

  async updateSectionDownloads(id: string): Promise<void> {
    await db
      .update(sections)
      .set({
        downloads: sql`${sections.downloads} + 1`,
      })
      .where(eq(sections.id, id));
  }

  // Installation methods
  async installSection(installation: InsertInstallation): Promise<Installation> {
    const [newInstallation] = await db
      .insert(installations)
      .values(installation)
      .returning();
    return newInstallation;
  }

  async getInstallationsByShop(shopDomain: string): Promise<Installation[]> {
    return await db
      .select()
      .from(installations)
      .where(eq(installations.shopDomain, shopDomain));
  }

  async isInstalled(sectionId: string, shopDomain: string): Promise<boolean> {
    const [installation] = await db
      .select()
      .from(installations)
      .where(
        and(
          eq(installations.sectionId, sectionId),
          eq(installations.shopDomain, shopDomain)
        )
      );
    return !!installation;
  }
}

// Create and export a singleton instance
export const storage = new DatabaseStorage();