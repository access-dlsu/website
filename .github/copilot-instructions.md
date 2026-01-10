# ACCESS DLSU Website - AI Coding Instructions

## Project Overview
This is the official website for ACCESS (Association of Computer Engineering Students) at De La Salle University, built with Next.js 15.5.4 and React 19. The project uses the new App Router architecture with TypeScript and TailwindCSS v4.

**Tech Stack**: Next.js 15 + React 19, TypeScript, TailwindCSS v4, Cloudflare Workers (D1 + R2), NextAuth v5

## Quick Start

```bash
# Install dependencies (npm is used - see package-lock.json in .gitignore)
npm install

# Set up environment variables (see "Environment Variables" section below)
cp .env.example .env  # if available, otherwise create manually

# Run development server (with Turbopack)
npm run dev

# Open http://localhost:3000
```

**Requirements**:
- Node.js 20+ (matches @types/node version)
- npm (project uses npm, not pnpm/yarn)

## Common Commands

```bash
npm run dev          # Development with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run preview      # Preview Cloudflare deployment locally
npm run deploy       # Deploy to Cloudflare Workers
npm run cf-typegen   # Generate Cloudflare types (wrangler types)
```

## Database Schema (Cloudflare D1)

The project uses Cloudflare D1 (SQLite) with migration files in `database/`:

**Tables**:
- `officers` - Officer credentials and positions (id, email, name, position, timestamps)
- `links` - Shortened links with analytics (id, short_code, original_url, created_by, clicks, expires_at, icon, is_archived)

**Local Development**: Database is managed via Cloudflare Wrangler. See `database/init_db.sql` for schema and seed data.

## Key Architecture Patterns

### App Router Structure
- Uses Next.js App Router with `src/app/` directory structure
- Root layout in `src/app/layout.tsx` with Google Fonts (Poppins, Manrope)
- Protected routes use NextAuth middleware callbacks

### Authentication
- **Provider**: Google OAuth via next-auth v5
- **Restriction**: Only `@dlsu.edu.ph` emails allowed
- **Protected Routes**: `/members/*` and `/officers/*` require authentication
- **Middleware**: `src/middleware.ts` exports `auth` as middleware

### Font System
The project uses a sophisticated multi-font setup:
```tsx
// Font variables are exposed via CSS custom properties
--font-poppins, --font-manrope
```
- **Poppins**: Used for brand text (ACCESS logo) - weight 700
- **Manrope**: Used for UI elements like login pill - weights 400,500,600,700

### Custom CSS Architecture
`globals.css` contains extensive custom styling that overrides TailwindCSS:
- **Glass morphism UI**: Navigation bar uses backdrop-filter blur effects with complex gradients
- **Fixed positioning**: Logo (top-left), navbar (center), login pill (top-right)
- **Brand-specific styling**: `.brand-text`, `.navbar`, `.login-pill` classes with detailed visual effects

### Design System

#### Color Palette
- **Primary Brand Color**: `#4e8d1f` (Green)
- **Primary Hover**: `#3d7018` (Darker green)
- **Light Accent**: `#5fa526` (Light green)
- **Background**: `#0a0a0a` (Dark)
- **Surface**: `#18181b` (Dark gray)
- **Text Primary**: `#f1f5f9` (Light)
- **Text Secondary**: `#a1a1aa` (Gray)

#### Glass Morphism Effect
All major UI components use glass morphism effects:
```css
background: linear-gradient(to bottom, rgba(32, 32, 32, 0.65), rgba(32, 32, 32, 0.45))
-webkit-backdrop-filter: blur(15.75px)
backdrop-filter: blur(15.75px)
border: 1px solid rgba(0, 0, 0, 0.1)
```

#### CSS Classes
- `.navbar` / `.navbar-compressed` / `.navbar-expanded` - Navigation states
- `.navbar-focus-mode` - Width adjustment during dropdown
- `.navbar-dropdown-active` - Green highlight for active dropdown
- `.glass-card` - Reusable glass morphism card
- `.brand-text` - ACCESS brand text styling
- `.login-pill` / `.login-expanded` - Login button states

#### Animation Timings
- **Fast**: 0.15s (opacity fades)
- **Standard**: 0.2-0.25s (most transitions)
- **Smooth**: 0.3s (scroll-based animations)
- **Slow**: 0.4-0.5s (morphing animations)

### Component Patterns
- **Icon + Text Links**: Navigation uses `lucide-react` icons with text labels
- **Accessibility**: Proper ARIA labels (`aria-label`, `aria-hidden`) on interactive elements
- **Image Optimization**: Uses Next.js `Image` component with priority loading for logo

### UI Primitives (`src/components/ui`)
- Purpose: Small, reusable primitives and layout helpers (cards, page headers, placeholders) that implement the project's glass-morphism visual system.
- Conventions:
  - Keep components minimal and composable — prefer composition over large prop surfaces.
  - Use Tailwind utility classes where practical and CSS custom properties (fonts, colors) for consistent theming.
  - Follow the project's visual tokens (backdrop-filter, gradients, shadows) for any glass-style primitive.
- TypeScript & React:
  - Components should be client components (`"use client"`) when they contain interactivity.
  - Use strict typing for props and prefer small, explicit interfaces. Export prop interfaces where reused.
  - Favor stable refs and memoization for performance-sensitive UI primitives.
- Accessibility:
  - Ensure keyboard focusability and visible focus styles for interactive primitives.
  - Use semantic HTML for structure (e.g., `header`, `main`, `button`, `nav`) and ARIA roles when necessary.
  - Provide slots for labels, descriptions, and optional actions to avoid hardcoding text.

#### Available UI Components

**Layout Components:**
- `Hero` - Full-screen hero section with title, subtitle, description, and action buttons
- `PageHeader` - Standardized page header with title and optional description
- `SectionHeader` - Section title component with consistent styling
- `SectionContainer` - Container wrapper with consistent padding and max-width

**Card Components:**
- `Card` - Glass morphism card with optional href link support
- `FeatureCard` - Feature card with icon, title, description, and link
- `StatCard` - Statistics card with icon, value, title, and description

**Form & Input Components:**
- `SearchInput` - Search input field with icon and glass morphism styling
- `FilterButton` - Filter button with active state styling
- `FilterGroup` - Group of filter buttons with selection management

**Feedback Components:**
- `Notification` - Toast notification with types (info, success, error)
- `useNotification` - Hook for managing notification state with auto-hide
- `LoadingProgress` - Inline loading indicator with progress bar
- `LoadingOverlay` - Full-screen loading overlay with animated progress
- `EmptyState` - Empty state message component

**Utility Components:**
- `Button` - Button component with primary/secondary variants
- `AuthWarning` - Authentication warning card with fade-out animation
- `Placeholder` - Placeholder component for "coming soon" content

### Brand Identity
- **Organization**: ACCESS DLSU (Computer Engineering student organization)
- **Logo**: Located at `/logo/access.svg`
- **Background**: DLSU campus image (`/dlsu.png`) as full-page background
- **Color Scheme**: Dark theme with green accents (`--primary-color: #5e9432`)

## Environment Variables

Required for local development (create `.env.local`):

```bash
# NextAuth (required for authentication)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AUTH_SECRET=your-auth-secret  # Generate: openssl rand -base64 32

# Cloudflare (for deployment)
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
```

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [slug]/            # Dynamic routes
│   ├── api/               # API endpoints (auth, link-shortener, resources, etc.)
│   ├── about-us/          # About page
│   ├── academics/         # Academic resources pages
│   ├── events/            # Events pages (competitions, workshops, past, upcoming)
│   ├── members/           # Member-only pages (alumni, benefits, directory, officers)
│   ├── officers/          # Officer-only pages (analytics, database, events, link-shortener, members, resources)
│   ├── page.tsx           # Main landing page
│   ├── layout.tsx         # Root layout with fonts
│   └── globals.css        # Custom CSS (glass-morphism styles)
├── components/
│   ├── ui/                # Reusable primitives (Card, Button, Hero, Notification, etc.)
│   ├── auth-provider.tsx  # Auth provider wrapper
│   ├── footer.tsx
│   ├── page-layout.tsx
│   ├── page-transition.tsx
│   └── scroll-to-top-button.tsx
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── auth.config.ts     # Auth config
│   └── link-shortener.ts  # Link shortener utilities
├── middleware.ts          # Auth middleware (uses next-auth)
└── worker-scheduled.ts    # Cloudflare scheduled worker

database/                   # D1 database migrations and seeds
├── init_db.sql            # Initial schema and officer data
├── 001_create_officers_table.sql
├── 002_insert_officers.sql
├── 003_create_links_table.sql
└── 004_add_expires_archived_to_links.sql
```

## Critical File Locations
- **Main styling**: `src/app/globals.css` - Glass-morphism styles
- **Layout fonts**: `src/app/layout.tsx` - Font loading and metadata
- **Auth config**: `src/lib/auth.ts` and `src/lib/auth.config.ts`
- **Middleware**: `src/middleware.ts` - Auth middleware
- **Main page**: `src/app/page.tsx` - Navigation with routes
- **Database init**: `database/init_db.sql` - Schema and seed data
- **Assets**: `public/logo/access.svg`, `public/dlsu.png`

## Development Notes
- Uses TypeScript strict mode with path aliases (`@/*` → `./src/*`)
- ESLint configured with Next.js and TypeScript presets
- Custom ESLint rules: `@typescript-eslint/no-explicit-any`: off, `no-console`: warn (except warn/error/info)
- Ready for expansion with additional pages/components in the App Router structure

## Deployment

### Branching Strategy
- Push to `dev` branch for contributions
- `test` branch for staging/preview
- `main` branch for production

### Deployment Commands
```bash
npm run preview    # Preview build on Cloudflare
npm run deploy     # Deploy to Cloudflare Workers
```

## Common Gotchas
1. **Officer directory typo**: The route is `/officers/` (not `/offcers/`)
2. **TailwindCSS v4**: Uses new `@tailwindcss/postcss` plugin - different from v3
3. **React 19**: Uses new features - ensure compatibility when adding packages
4. **NextAuth v5 beta**: API may change - check version compatibility
5. **Glass-morphism overrides**: Custom CSS in `globals.css` can override Tailwind utilities
6. **Database changes**: Require manual D1 migrations via Wrangler CLI

## Code Style & Conventions

### File Naming
- React components: `PascalCase.tsx`
- Other files: `camelCase.ts`/`.tsx`
- Routes: `kebab-case` (URL paths)

### Styling Approach
- **Hybrid CSS**: Combines TailwindCSS utilities with extensive custom CSS
- **Glass morphism**: Heavy use of backdrop-filter, gradients, and transparency
- **CSS Custom Properties**: Extensive use of CSS variables for theming
- **Fixed Layout**: Header elements use fixed positioning with specific offsets

## Key Dependencies
- **liquid-glass-react**: Custom UI library (v1.1.1)
- **lucide-react**: Icon system (v0.544.0) - used extensively in navigation
- **TailwindCSS v4**: With `@tailwindcss/postcss` plugin setup
- **opennextjs-cloudflare**: Cloudflare deployment package

## Don't Dos
- Generate .md Files if not instructed
