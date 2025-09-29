import { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from './db.js'
import { sql } from 'drizzle-orm'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Basic health
  const status = { status: 'ok', message: 'Section Factory API is running' }

  // Optional DB connectivity check: /api/health?db=1
  const dbCheckFlag = req.query?.db
  const dbCheck = Array.isArray(dbCheckFlag) ? dbCheckFlag[0] : dbCheckFlag

  if (dbCheck === '1') {
    try {
      // Lightweight connectivity test
      await db.execute(sql`select 1`)
      return res.json({ ...status, database: 'connected' })
    } catch (err) {
      console.error('DB health check failed:', err)
      return res.status(500).json({ ...status, database: 'error', error: 'Database connection failed' })
    }
  }

  return res.json(status)
}