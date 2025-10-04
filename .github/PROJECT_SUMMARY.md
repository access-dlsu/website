# ACCESS DLSU Website - Project Summary

## 📋 Project Overview

Official website for **ACCESS (Association of Computer Engineering Students)** at De La Salle University, built with modern web technologies and featuring a sophisticated glass morphism UI design.

### Technology Stack
- **Framework**: Next.js 15.5.4 (App Router)
- **React**: Version 19
- **TypeScript**: Strict mode enabled
- **Styling**: TailwindCSS v4 + Custom CSS
- **Build Tool**: Turbopack (faster builds)
- **Icons**: Lucide React (v0.544.0)
- **UI Library**: liquid-glass-react (v1.1.1)

## 🎨 Design System

### Color Palette
- **Primary Brand Color**: `#4e8d1f` (Green)
- **Primary Hover**: `#3d7018` (Darker green)
- **Light Accent**: `#5fa526` (Light green)
- **Background**: `#0a0a0a` (Dark)
- **Surface**: `#18181b` (Dark gray)
- **Text Primary**: `#f1f5f9` (Light)
- **Text Secondary**: `#a1a1aa` (Gray)

### Typography
The project uses a multi-font system via Google Fonts:

1. **Poppins** (Weight: 700)
   - Used for: Brand text (ACCESS logo)
   - Variable: `--font-poppins`

2. **Manrope** (Weights: 400, 500, 600, 700)
   - Used for: UI elements, navigation, buttons
   - Variable: `--font-manrope`

### Visual Effects

#### Glass Morphism
All major UI components use glass morphism effects:
```css
background: linear-gradient(to bottom, rgba(32, 32, 32, 0.65), rgba(32, 32, 32, 0.45))
-webkit-backdrop-filter: blur(15.75px)
backdrop-filter: blur(15.75px)
border: 1px solid rgba(0, 0, 0, 0.1)
```

#### Shadows & Depth
- Text shadows for better readability: `0 1px 2px rgba(0, 0, 0, 0.6)`
- Box shadows for depth: `0 4px 12px rgba(0, 0, 0, 0.3)`
- Drop shadows on images and logos

## 🏗️ Architecture

### File Structure
```
website/
├── .github/
│   ├── copilot-instructions.md
│   └── PROJECT_SUMMARY.md (this file)
├── public/
│   ├── dlsu.png (background image)
│   └── logo/
│       └── access.svg (organization logo)
├── src/
│   ├── app/
│   │   ├── layout.tsx (root layout with fonts)
│   │   ├── page.tsx (homepage)
│   │   ├── globals.css (760 lines of custom CSS)
│   │   ├── about/
│   │   ├── events/
│   │   │   ├── upcoming/
│   │   │   ├── past/
│   │   │   ├── workshops/
│   │   │   └── competitions/
│   │   ├── academics/
│   │   │   ├── resources/
│   │   │   ├── tutorials/
│   │   │   ├── projects/
│   │   │   └── mentorship/
│   │   └── members/
│   │       ├── directory/
│   │       ├── officers/
│   │       ├── alumni/
│   │       └── benefits/
│   └── components/
│       └── Header.tsx (navigation component)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

### Component Architecture

#### Header Component (`src/components/Header.tsx`)
**Features:**
- Fixed positioning with scroll-based visibility
- Compressed/expanded states based on scroll position
- Dropdown navigation with focus mode
- Glass morphism styling
- Responsive animations

**States:**
- `isVisible`: Controls header visibility (boolean)
- `isCompressed`: Navbar compression on scroll (boolean)
- `isExpanded`: Manual expansion of compressed navbar (boolean)
- `lastScrollY`: Tracks scroll position (number)
- `activeDropdown`: Currently open dropdown (string | null)
- `isFocusMode`: Focus mode when dropdown active (boolean)

**Navigation Structure:**
- Home (link)
- About (link)
- **Events** (dropdown)
  - Upcoming Events
  - Past Events
  - Workshops
  - Competitions
- **Academics** (dropdown)
  - Resources
  - Tutorials
  - Projects
  - Mentorship
- **Members Hub** (dropdown)
  - Directory
  - Officers
  - Alumni
  - Benefits

**Animations:**
- Focus Mode: Hides other nav items when dropdown opens (0.15s fade)
- Dropdown Fade: Smooth appearance with translateY animation (0.2s)
- Scroll Hide: Header slides up when scrolling down
- Compressed/Expanded: Width/padding transitions (0.3-0.4s)

#### Login Component (Integrated in Header)
**Features:**
- Morphing pill button that expands on hover
- Transforms from 98px × 52px pill to 360px × 380px card
- Google Sign-in integration ready
- Lists member perks/benefits
- Smooth multi-stage animation system

**Animation Stages:**
1. Expansion: Width/height morph (0.5s cubic-bezier)
2. Trigger fade: Login text fades out (0.2s)
3. Content fade: Expanded content fades in (0.25s delay)
4. Content scale: Scale from 0.95 to 1 (0.25s)

#### Footer Component (Integrated in Header)
**Features:**
- Fixed bottom positioning
- Organization info with logo
- Social media links (Facebook, Instagram, LinkedIn, Email)
- Visibility tied to header scroll state
- Responsive layout for mobile/tablet

### Page Structure

All pages follow a consistent template:
- Full-screen height container
- Glass card content area
- Brand color accents
- Responsive padding and spacing
- Smooth transitions

## 🎯 Key Features

### 1. Scroll-Based Header Behavior
- Header hides when scrolling down, shows when scrolling up
- 50px scroll threshold for debouncing
- Compressed navbar with "Menu" trigger when scrolled
- Click trigger to expand navbar back to full view

### 2. Dropdown Navigation System
- Three dropdown menus: Events, Academics, Members Hub
- Fixed positioning for consistent placement across scroll states
- Focus mode: Other nav items fade out when dropdown opens
- Auto-close on scroll or click outside
- Active dropdown highlighted with brand green color
- 12px spacing gap from navbar

### 3. Glass Morphism UI
- Consistent blur effects across all glass elements
- Semi-transparent backgrounds with gradients
- Subtle borders and shadows for depth
- Hover states with enhanced effects

### 4. Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Footer adapts layout for different screen sizes
- Touch-friendly interactive elements

### 5. Performance Optimizations
- Next.js Image component for optimized images
- Priority loading for above-the-fold images
- Turbopack for faster builds
- CSS custom properties for theming
- Passive scroll listeners

## 🎨 CSS Architecture

### Custom Classes

#### Navigation Classes
- `.navbar` - Main navigation container with glass effect
- `.navbar-compressed` - Compressed state (scrolled)
- `.navbar-expanded` - Expanded state (clicked trigger)
- `.navbar-focus-mode` - Width adjustment during dropdown
- `.navbar-dropdown-active` - Green highlight for active dropdown
- `.navbar-item-hidden` - Hidden state for focus mode
- `.navbar-links` - Link container
- `.navbar-dropdown-menu` - Dropdown container with fixed positioning
- `.navbar-dropdown-item` - Individual dropdown links

#### Header Classes
- `.header-visible` / `.header-hidden` - Visibility states
- `.logo-offset` - Logo positioning
- `.login-pill` - Morphing login button
- `.login-trigger` - Initial button state
- `.login-expanded` - Expanded card content

#### Utility Classes
- `.glass-card` - Reusable glass morphism card
- `.brand-text` - ACCESS brand text styling
- `.footer` - Footer container
- `.perk-item` - Login perks list items

### Animation Timings
- **Fast**: 0.15s (opacity fades)
- **Standard**: 0.2-0.25s (most transitions)
- **Smooth**: 0.3s (scroll-based animations)
- **Slow**: 0.4-0.5s (morphing animations)

### Easing Functions
- `ease-in-out` - Standard transitions
- `cubic-bezier(0.4, 0, 0.2, 1)` - Material Design easing

## 🚀 Development

### Commands
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Development Server
- Runs on `http://localhost:3000`
- Hot module replacement enabled
- Fast refresh for React components

### Path Aliases
```typescript
"@/*": "./src/*"
```

## 📝 Coding Conventions

### TypeScript
- Strict mode enabled
- Explicit types for props and state
- Interface definitions for complex objects

### React Patterns
- Client components: `"use client"` directive
- Custom hooks: `useState`, `useEffect`, `useMemo`
- Event handlers: Proper cleanup in useEffect
- Dependency arrays: Use useMemo for stable references

### CSS Conventions
- BEM-inspired naming: `.component-element-modifier`
- Mobile-first media queries
- Vendor prefixes before standard properties
- Comments for complex sections

### Component Organization
1. Imports
2. Type definitions
3. Component function
4. State declarations
5. Effects and handlers
6. Memoized values
7. JSX return
8. Exports

## 🔧 Configuration Files

### `next.config.ts`
- Image optimization settings
- Path configuration
- Build settings

### `tsconfig.json`
- Path aliases
- Strict mode
- Module resolution

### `tailwind.config.ts`
- Custom theme extensions
- Font family definitions
- Color palette
- Spacing system

### `postcss.config.mjs`
- TailwindCSS plugin
- Autoprefixer (if needed)

## 🎯 Future Enhancements

### Planned Features
- [ ] User authentication system
- [ ] Google OAuth integration
- [ ] Member dashboard
- [ ] Event registration system
- [ ] Resource library
- [ ] Project showcase
- [ ] Officer management portal
- [ ] Alumni network
- [ ] Newsletter subscription

### Technical Improvements
- [ ] Add loading states
- [ ] Implement error boundaries
- [ ] Add page transitions
- [ ] Optimize images further
- [ ] Add PWA support
- [ ] Implement dark/light theme toggle
- [ ] Add accessibility improvements (ARIA labels)
- [ ] Add analytics integration

## 📱 Browser Support

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

## 🤝 Contributing

### Before Contributing
1. Review `copilot-instructions.md` for coding guidelines
2. Ensure all dependencies are installed
3. Test changes across different browsers
4. Follow the established code style
5. Update documentation as needed

### Key Areas
- **Component Development**: Follow glass morphism design patterns
- **Styling**: Use TailwindCSS utilities + custom CSS for effects
- **TypeScript**: Maintain strict typing
- **Performance**: Keep bundle size in mind

## 📄 License

See `LICENSE` file for details.

## 🔗 Assets

### Images
- `public/dlsu.png` - Campus background image
- `public/logo/access.svg` - Organization logo (SVG)

### Icons
- Lucide React icons used throughout
- Custom icon sizing and coloring

---

**Last Updated**: October 4, 2025  
**Version**: 1.0.0  
**Maintainer**: ACCESS DLSU Web Team
