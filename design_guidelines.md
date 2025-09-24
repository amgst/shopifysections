# Design Guidelines for Shopify Section Factory App

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Shopify's admin interface and modern SaaS platforms like Notion and Linear for the dashboard experience, combined with marketplace aesthetics from Shopify App Store and Figma Community for section browsing.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light Mode: 220 15% 20% (Deep blue-gray for headers and primary actions)
- Dark Mode: 220 15% 85% (Light blue-gray for text and borders)

**Brand Accent:**
- 142 76% 36% (Shopify green for success states and CTAs)

**Background Colors:**
- Light Mode: 0 0% 98% (Warm white)
- Dark Mode: 220 15% 8% (Deep blue-black)

**Surface Colors:**
- Light Mode: 0 0% 100% (Pure white cards)
- Dark Mode: 220 15% 12% (Elevated dark surfaces)

### B. Typography
**Primary Font:** Inter (Google Fonts)
- Headers: 600-700 weight
- Body: 400-500 weight
- UI Elements: 500 weight

**Secondary Font:** JetBrains Mono (for code snippets)

### C. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing: p-2, m-2 (8px)
- Component spacing: p-4, gap-4 (16px)
- Section spacing: p-8, mb-12 (32px, 48px)
- Page spacing: p-16 (64px)

### D. Component Library

**Navigation:**
- Top navigation bar with Shopify app styling
- Sidebar navigation for main sections (Browse, My Sections, Analytics)
- Breadcrumb navigation for deep browsing

**Section Cards:**
- Clean card design with preview thumbnail
- Overlay information on hover
- Price badge in corner
- Category tags at bottom

**Forms & Inputs:**
- Consistent form styling matching Shopify admin
- Search bars with filter dropdowns
- Toggle switches for section settings

**Data Displays:**
- Grid layout for section browsing (2-4 columns responsive)
- List view option for detailed information
- Preview modal with live section demonstration

**Overlays:**
- Section preview modal (large, centered)
- Installation confirmation dialogs
- Settings panels (slide-out from right)

### E. Key Interface Areas

**Section Browser:**
- Hero search bar with category filters
- Grid/list toggle in top-right
- Sidebar filters (price, category, compatibility)
- Infinite scroll or pagination

**Section Preview:**
- Large modal with live preview iframe
- Section details sidebar
- Installation and customization options
- Related sections carousel at bottom

**My Sections Dashboard:**
- Installed sections with status indicators
- Quick access to customization panels
- Usage analytics for each section

## Images
**Preview Thumbnails:** Each section requires a high-quality screenshot (400x300px) showing the section in use
**Category Icons:** Simple line icons for each section category
**No Large Hero Image:** The interface focuses on section previews rather than marketing imagery

## Visual Hierarchy
- Primary focus on section previews and thumbnails
- Secondary focus on navigation and filtering
- Tertiary focus on metadata and pricing information
- Clean, spacious layout with generous whitespace between section cards