import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "../shared/schema.js";

// Use HTTP driver with connection caching for serverless
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

// Create Neon SQL client and Drizzle instance
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });