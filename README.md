# 🏆 Shrub Frontend

A modern Vue 3 leaderboard application for tracking "shrubbing" - the art of creative word mangling and pronunciation mistakes. Built with Vue 3, TypeScript, Tailwind CSS, and shadcn-vue components.

## ✨ Features

- **Real-time Leaderboard**: Track player rankings and points
- **Player Profiles**: Avatar generation, trend indicators, latest shrubs
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript integration
- **Modern UI**: shadcn-vue components with consistent design system
- **Mock Data**: Development-ready with sample players and shrubs

## 🛠️ Tech Stack

- **Framework**: Vue 3 with Composition API + `<script setup>`
- **Build Tool**: Vite for lightning-fast development
- **Styling**: Tailwind CSS v3 + shadcn-vue components
- **State Management**: Pinia stores with TypeScript
- **Routing**: Vue Router 4
- **Testing**: Vitest + Vue Test Utils
- **Linting**: ESLint + Prettier
- **Icons**: Lucide Vue Next

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn-vue base components
│   │   ├── Card.vue        # Container component
│   │   └── Badge.vue       # Label/tag component
│   ├── LeaderboardCard.vue # Player ranking card
│   ├── PlayerAvatar.vue    # Auto-generated user avatars
│   └── StatusIndicator.vue # Status dots with text
├── views/
│   └── LeaderboardView.vue # Main leaderboard page
├── stores/
│   └── leaderboard.ts      # Player data & actions (Pinia)
├── types/
│   └── index.ts           # TypeScript interfaces
├── lib/
│   └── utils.ts           # Utility functions (cn class merger)
└── router/
    └── index.ts           # Route configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js ^20.19.0 || >=22.12.0
- npm or yarn

### Installation

```bash
# Clone and install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the leaderboard.

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # ESLint with auto-fix
npm run format       # Prettier formatting
npm run type-check   # TypeScript compilation check

# Testing
npm run test:unit    # Run Vitest unit tests
```

## 🏗️ Key Components

### **LeaderboardCard.vue**
- Displays player ranking with avatar, points, and trends
- Dynamic rank badges (Crown, Trophy, Medal)
- Highlight current user with special styling

### **PlayerAvatar.vue**
- Generates colorful avatars from user names
- Deterministic colors based on name hash
- Multiple size variants (sm, md, lg)

### **StatusIndicator.vue**
- Shows connection status with colored dots
- Supports online, offline, and active states

### **Pinia Store (stores/leaderboard.ts)**
- Manages player data and leaderboard state
- Provides actions for adding players and recording shrubs
- Computed properties for sorted rankings

## 🎨 Styling System

### **Tailwind CSS**
- Utility-first CSS framework
- Custom color palette defined in `tailwind.config.js`
- Responsive design with mobile-first approach

### **shadcn-vue Components**
- Copy-paste component library
- Built with accessibility in mind
- Customizable via CSS custom properties in `style.css`

### **Theme System**
- CSS custom properties for colors (--primary, --secondary, etc.)
- Dark mode ready (extend CSS variables)
- Consistent spacing and typography scales

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration and content paths
- `postcss.config.js` - PostCSS plugins (Tailwind + Autoprefixer)
- `vite.config.ts` - Vite build configuration and aliases
- `eslint.config.ts` - ESLint rules and Vue-specific linting
- `vitest.config.ts` - Test configuration and setup

## 🚀 Development Workflow

1. **Start Development**: `npm run dev`
2. **Make Changes**: Edit components with instant HMR
3. **Type Check**: `npm run type-check` for TypeScript validation
4. **Lint & Format**: `npm run lint && npm run format`
5. **Test**: `npm run test:unit` for component testing
6. **Build**: `npm run build` for production

## 📱 Responsive Breakpoints

- **Mobile**: Default (< 640px)
- **Tablet**: `md:` (>= 768px)
- **Desktop**: `lg:` (>= 1024px)
- **Large**: `xl:` (>= 1280px)
