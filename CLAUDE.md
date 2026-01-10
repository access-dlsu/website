# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ACCESS DLSU Website** - The official website for ACCESS (Association of Computer Engineering Students) at De La Salle University.

**Purpose**: Serve as the central hub for ACCESS members, providing information about events, academic resources, officer directories, and member-exclusive benefits.

**Primary Users**:
- ACCESS members (DLSU Computer Engineering students)
- ACCESS officers (content management and analytics)
- General public (event information, about page)

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

## Design System

### Color Palette
- **Primary Brand Color**: `#4e8d1f` (Green)
- **Primary Hover**: `#3d7018` (Darker green)
- **Light Accent**: `#5fa526` (Light green)
- **Background**: `#0a0a0a` (Dark)
- **Surface**: `#18181b` (Dark gray)
- **Text Primary**: `#f1f5f9` (Light)
- **Text Secondary**: `#a1a1aa` (Gray)

### Glass Morphism Effect
All major UI components use glass morphism effects:
```css
background: linear-gradient(to bottom, rgba(32, 32, 32, 0.65), rgba(32, 32, 32, 0.45))
-webkit-backdrop-filter: blur(15.75px)
backdrop-filter: blur(15.75px)
border: 1px solid rgba(0, 0, 0, 0.1)
```

### CSS Classes (globals.css)
- `.navbar` / `.navbar-compressed` / `.navbar-expanded` - Navigation states
- `.navbar-focus-mode` - Width adjustment during dropdown
- `.navbar-dropdown-active` - Green highlight for active dropdown
- `.glass-card` - Reusable glass morphism card
- `.brand-text` - ACCESS brand text styling
- `.login-pill` / `.login-expanded` - Login button states

### Animation Timings
- **Fast**: 0.15s (opacity fades)
- **Standard**: 0.2-0.25s (most transitions)
- **Smooth**: 0.3s (scroll-based animations)
- **Slow**: 0.4-0.5s (morphing animations)

## Database Schema (Cloudflare D1)

The project uses Cloudflare D1 (SQLite) with migration files in `database/`:

**Tables**:
- `officers` - Officer credentials and positions (id, email, name, position, timestamps)
- `links` - Shortened links with analytics (id, short_code, original_url, created_by, clicks, expires_at, icon, is_archived)

**Local Development**: Database is managed via Cloudflare Wrangler. See `database/init_db.sql` for schema and seed data.

## High-Level Architecture

### Directory Structure

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

### Key Architecture Patterns

#### App Router Structure
- Next.js App Router with `src/app/` directory
- Root layout in [src/app/layout.tsx](src/app/layout.tsx) with Google Fonts (Poppins, Manrope)
- Protected routes use NextAuth middleware callbacks

#### Authentication
- **Provider**: Google OAuth via next-auth v5
- **Restriction**: Only `@dlsu.edu.ph` emails allowed
- **Protected Routes**: `/members/*` and `/officers/*` require authentication
- **Middleware**: [src/middleware.ts](src/middleware.ts) exports `auth` as middleware

#### UI System
- **Glass-morphism**: Heavy use of `backdrop-filter`, gradients, transparency
- **Component Primitives** (`src/components/ui/`):
  - **Layout**: Hero, PageHeader, SectionHeader, SectionContainer
  - **Cards**: Card, FeatureCard, StatCard
  - **Forms**: SearchInput, FilterButton, FilterGroup
  - **Feedback**: Notification (with `useNotification` hook), LoadingProgress, LoadingOverlay, EmptyState
  - **Utility**: Button, AuthWarning, Placeholder

#### Font System
- **Poppins**: Brand text (ACCESS logo) - weight 700
- **Manrope**: UI elements - weights 400, 500, 600, 700
- Exposed via CSS custom properties: `--font-poppins`, `--font-manrope`

#### API Routes
- `/api/auth/[...nextauth]` - NextAuth handlers
- `/api/link-shortener/*` - Link shortening service
- `/api/officers/check` - Officer verification
- `/api/resources/*` - Resource download endpoints
- `/api/set-user-info` - User info management

#### Cloudflare Integration
- **Database**: Cloudflare D1 (serverless SQL)
- **Storage**: Cloudflare R2 (S3-compatible)
- **Deployment**: `opennextjs-cloudflare` package
- **Types**: Generated via `wrangler types`

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

## Code Style & Conventions

### File Naming
- React components: `PascalCase.tsx`
- Other files: `camelCase.ts`/`.tsx`
- Routes: `kebab-case` (URL paths)

### TypeScript
- Strict mode enabled
- Path aliases: `@/` → `./src/`
- Component props use explicit interfaces

### ESLint Rules (Custom)
- `@typescript-eslint/no-explicit-any`: off
- `no-console`: warn (except warn/error/info)
- `react/no-unescaped-entities`: off

### Styling Conventions
- Hybrid approach: TailwindCSS utilities + custom CSS
- Glass-morphism: `backdrop-filter: blur()` + transparency
- CSS custom properties for theming
- Fixed positioning for header elements

### Component Guidelines
All components in `src/components/ui/` follow:
- Client components (`"use client"`) when interactive
- Strict TypeScript typing
- Glass-morphism visual system
- Accessibility (ARIA labels, keyboard focus, semantic HTML)

**Important**: Do not modify `src/components/ui/` primitives without understanding the glass-morphism system.

## Deployment

### Branching Strategy
- Push to `dev` branch for contributions (see [CONTRIBUTING.md](CONTRIBUTING.md))
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
5. **Glass-morphism overrides**: Custom CSS in [globals.css](src/app/globals.css) can override Tailwind utilities
6. **Database changes**: Require manual D1 migrations via Wrangler CLI

## Critical Files

- **Main styling**: [src/app/globals.css](src/app/globals.css) - Glass-morphism styles
- **Layout fonts**: [src/app/layout.tsx](src/app/layout.tsx) - Font loading and metadata
- **Auth config**: [src/lib/auth.ts](src/lib/auth.ts) and [src/lib/auth.config.ts](src/lib/auth.config.ts)
- **Middleware**: [src/middleware.ts](src/middleware.ts) - Auth middleware
- **Main page**: [src/app/page.tsx](src/app/page.tsx) - Navigation with routes
- **Database init**: [database/init_db.sql](database/init_db.sql) - Schema and seed data

## Testing

No test framework is currently configured. If adding tests:
- Choose between Vitest (fast, Vite-native) or Jest (Next.js default)
- Add Playwright for E2E testing
- Update this section with test commands

## Key Dependencies
- **liquid-glass-react**: Custom UI library (v1.1.1)
- **lucide-react**: Icon system (v0.544.0) - used extensively in navigation
- **TailwindCSS v4**: With `@tailwindcss/postcss` plugin setup
- **opennextjs-cloudflare**: Cloudflare deployment package
- **next-auth**: v5 beta - Google OAuth authentication

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Branching guidelines (push to `dev`)
- Pull request process
- Code style and commit conventions
- Issue reporting

## Browser Support

### Supported Browsers
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Required Features
- CSS backdrop-filter support
- CSS Grid and Flexbox
- ES6+ JavaScript features
- CSS custom properties
- CSS transforms and transitions