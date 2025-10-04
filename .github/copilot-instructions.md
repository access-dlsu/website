# ACCESS DLSU Website - AI Coding Instructions

## Project Overview
This is the official website for ACCESS (Association of Computer Engineering Students) at De La Salle University, built with Next.js 15.5.4 and React 19. The project uses the new App Router architecture with TypeScript and TailwindCSS v4.

## Key Architecture Patterns

### App Router Structure
- Uses Next.js App Router with `src/app/` directory structure
- Single-page layout defined in `src/app/layout.tsx` with multiple Google Fonts (Geist, Poppins, Manrope)
- Main page is `src/app/page.tsx` - currently displays navigation with placeholder links

### Font System
The project uses a sophisticated multi-font setup:
```tsx
// Font variables are exposed via CSS custom properties
--font-geist-sans, --font-geist-mono, --font-poppins, --font-manrope
```
- **Poppins**: Used for brand text (ACCESS logo) - weight 700
- **Manrope**: Used for UI elements like login pill - weights 400,500,600,700
- **Geist**: Primary body fonts (sans/mono variants)

### Custom CSS Architecture
`globals.css` contains extensive custom styling that overrides TailwindCSS:
- **Glass morphism UI**: Navigation bar uses backdrop-filter blur effects with complex gradients
- **Fixed positioning**: Logo (top-left), navbar (center), login pill (top-right)
- **Brand-specific styling**: `.brand-text`, `.navbar`, `.login-pill` classes with detailed visual effects

## Development Workflow

### Build & Dev Commands
```bash
# Development with Turbopack (faster builds)
npm run dev
# Production build with Turbopack
npm run build  
# Linting
npm run lint
```

### Key Dependencies
- **liquid-glass-react**: Custom UI library (v1.1.1)
- **lucide-react**: Icon system (v0.544.0) - used extensively in navigation
- **TailwindCSS v4**: With `@tailwindcss/postcss` plugin setup

## Project-Specific Conventions

### Styling Approach
- **Hybrid CSS**: Combines TailwindCSS utilities with extensive custom CSS
- **Glass morphism**: Heavy use of backdrop-filter, gradients, and transparency
- **CSS Custom Properties**: Extensive use of CSS variables for theming
- **Fixed Layout**: Header elements use fixed positioning with specific offsets

### Component Patterns
- **Icon + Text Links**: Navigation uses `lucide-react` icons with text labels
- **Accessibility**: Proper ARIA labels (`aria-label`, `aria-hidden`) on interactive elements
- **Image Optimization**: Uses Next.js `Image` component with priority loading for logo

### Brand Identity
- **Organization**: ACCESS DLSU (Computer Engineering student organization)
- **Logo**: Located at `/logo/access.svg`
- **Background**: DLSU campus image (`/dlsu.png`) as full-page background
- **Color Scheme**: Dark theme with green accents (`--primary-color: #5e9432`)

## Critical File Locations
- **Main styling**: `src/app/globals.css` (272 lines of custom CSS)
- **Layout fonts**: `src/app/layout.tsx` (font loading and metadata)
- **Navigation**: `src/app/page.tsx` (main UI with placeholder routes)
- **Assets**: `public/logo/access.svg`, `public/dlsu.png`

## Development Notes
- Uses TypeScript strict mode with path aliases (`@/*` → `./src/*`)
- ESLint configured with Next.js and TypeScript presets
- Currently a single-page application with navigation placeholders for future routes
- Ready for expansion with additional pages/components in the App Router structure

## Don't Dos
- Generate .md Files if not instructed