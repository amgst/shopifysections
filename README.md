# Shopify Sections Marketplace

A marketplace for Shopify theme sections built with React, Express.js, and deployed on Vercel.

## Deployment on Vercel

### Prerequisites
- Vercel account
- Neon database (or any PostgreSQL database)

### Steps

1. **Connect your repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   Add the following environment variables in Vercel:
   ```
   DATABASE_URL=your_neon_database_connection_string
   NODE_ENV=production
   ```

3. **Deploy**
   - Vercel will automatically detect the configuration from `vercel.json`
   - The build process will run `npm run vercel-build`
   - API routes will be deployed as serverless functions

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

3. Push database schema:
   ```bash
   npm run db:push
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/client` - React frontend
- `/server` - Express.js backend
- `/api` - Vercel serverless functions
- `/shared` - Shared types and schemas
- `vercel.json` - Vercel deployment configuration