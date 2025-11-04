# ACCESS DLSU Website - AI Coding Instructions

## Project Overview
This is the official website for ACCESS (Association of Computer Engineering Students) at De La Salle University, built with Next.js 15.5.4 and React 19. The project uses the new App Router architecture with TypeScript and TailwindCSS v4.

## Key Architecture Patterns

### App Router Structure
- Uses Next.js App Router with `src/app/` directory structure
- Single-page layout defined in `src/app/layout.tsx` with multiple Google Fonts (Poppins, Manrope)
- Main page is `src/app/page.tsx` - currently displays navigation with placeholder links

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

- Rationale: Consolidating these guidelines in `copilot-instructions.md` helps AI-assisted edits and contributors create consistent, accessible, and composable UI building blocks without guessing project conventions.

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
