# Overview

The Section Factory is a marketplace application for Shopify theme sections, designed as a marketplace where users can browse, preview, and install premium theme sections for their Shopify stores. The application provides a comprehensive catalog of pre-built sections including hero banners, product features, testimonials, FAQ sections, and more, enabling store owners to enhance their websites without coding knowledge.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with **React 18** using **TypeScript** and **Vite** for development tooling. The application follows a component-based architecture with:

- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with custom design tokens for theming and responsive design
- **Form Handling**: React Hook Form with Zod for validation

The design system draws inspiration from Shopify's admin interface and modern SaaS platforms, implementing a comprehensive theming system with light/dark mode support and custom CSS variables for consistent styling across components.

## Backend Architecture
The server-side implements a **REST API** using **Express.js** with TypeScript. The architecture follows a layered approach:

- **Database Layer**: Drizzle ORM with PostgreSQL via Neon serverless database
- **Storage Layer**: Abstracted storage interface with database implementation for section and installation management  
- **Route Layer**: RESTful endpoints for sections, installations, and user management
- **Middleware**: Request logging, error handling, and JSON parsing

The API provides endpoints for section browsing with filtering/search capabilities, installation tracking, and user management.

## Data Architecture
The database schema includes three main entities:

- **Users**: Authentication and user management
- **Sections**: Marketplace items with metadata, pricing, Liquid code, and settings schema
- **Installations**: Tracking which sections are installed on specific Shopify stores

The schema supports complex filtering by category, price ranges, search queries, and popularity metrics with pagination for performance.

## Component Architecture
The UI is built with reusable components following atomic design principles:

- **Layout Components**: Header with theme toggle and navigation
- **Filter Components**: Advanced search and filtering system with mobile-responsive design
- **Content Components**: Section cards, preview modals, and grid layouts
- **Form Components**: Built on React Hook Form with Zod validation

All components support both light and dark themes with consistent hover states and accessibility features.

# External Dependencies

## Core Database
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Drizzle ORM**: Type-safe database operations with schema migrations

## UI and Styling
- **Radix UI**: Accessible component primitives for dialogs, dropdowns, and form controls
- **shadcn/ui**: Pre-built component library with Tailwind CSS integration
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography

## Development and Build Tools  
- **Vite**: Build tool and development server with hot module replacement
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript bundler for production builds

## State Management and Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation for forms and API data

## Shopify Integration
The application is designed to integrate with Shopify stores through:
- **Shopify App Architecture**: Ready for Shopify app store distribution
- **Liquid Template System**: Section code uses Shopify's Liquid templating language
- **Theme Integration**: Sections designed to work with existing Shopify themes