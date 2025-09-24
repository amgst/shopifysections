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
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and, or } from "drizzle-orm";

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
        like(sections.name, searchPattern),
        like(sections.description, searchPattern)
      )
    );
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const [section] = await db
      .insert(sections)
      .values(insertSection)
      .returning();
    return section;
  }

  async updateSectionDownloads(id: string): Promise<void> {
    // Get current downloads count
    const [section] = await db.select().from(sections).where(eq(sections.id, id));
    const currentDownloads = section?.downloads || 0;
    
    // Increment downloads
    await db
      .update(sections)
      .set({ downloads: currentDownloads + 1 })
      .where(eq(sections.id, id));
  }

  // Installation methods
  async installSection(insertInstallation: InsertInstallation): Promise<Installation> {
    const [installation] = await db
      .insert(installations)
      .values(insertInstallation)
      .returning();
    
    // Update download count
    await this.updateSectionDownloads(insertInstallation.sectionId);
    
    return installation;
  }

  async getInstallationsByShop(shopDomain: string): Promise<Installation[]> {
    return await db.select().from(installations).where(eq(installations.shopDomain, shopDomain));
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

export const storage = new DatabaseStorage();
