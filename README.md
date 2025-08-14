# Next Arcade

A collection of small classic games built with [Next.js](https://nextjs.org), featuring Hangman, Snake, and Matching Pairs with immersive sound effects and responsive design.

## Games

- **Hangman** – Guess the word before you run out of attempts
- **Snake** – Classic snake game with keyboard and touch controls
- **Matching Pairs** – Memory card game with pixel art icons and timer

## Features

- **Immersive Audio** – sound effects across interactions, plus a global **mute** toggle
- **Mobile Responsive** – touch-friendly controls and layouts optimized for small screens
- **Retro Design** – pixel-inspired arcade aesthetic
- **Fast Performance** – built on **Next.js 15** and **React 19** using the App Router
- **Three Difficulty Levels** – Easy, Medium, and Hard for each game
- **TypeScript** – fully typed for better development experience
- **Tested** – Unit (Vitest) and E2E (Cypress) tests cover core flows

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/next-arcade.git
   cd next-arcade
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm run test         # Run unit tests with Vitest
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report
npm run test:watch   # Run tests in watch mode

# E2E Testing
npm run cypress:open # Open Cypress UI
npm run cypress:run  # Run Cypress tests headlessly
npm run e2e          # Run E2E tests against production build
npm run e2e:dev      # Run E2E tests against dev server
```

## Game Controls

### Hangman

- **Desktop**: Click letters or use physical keyboard
- **Mobile**: Touch virtual keyboard

### Snake

- **Desktop**: Arrow keys or WASD
- **Mobile**: Touch D-pad controls

### Matching Pairs

- **Desktop**: Click cards or use Tab + Enter/Space
- **Mobile**: Touch cards

## Technical Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: CSS Modules with CSS Variables
- **State Management**: Zustand
- **Audio**: use-sound library
- **Testing**: Vitest + Cypress
- **Build Tool**: Turbopack (dev) / Webpack (prod)

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── arcade/[game]/     # Dynamic game routes
│   ├── about/             # About page
│   └── layout.tsx         # Root layout
├── components/            # Shared components
│   ├── ui/               # UI primitives (MagicButton)
│   ├── GameSelector/     # Game selection interface
│   ├── GameOver/         # Game over screen
│   └── ...
├── features/             # Game-specific code
│   ├── hangman/         # Hangman game logic
│   ├── snake/           # Snake game logic
│   └── matchingPairs/   # Memory game logic
├── hooks/               # Custom React hooks
├── stores/              # Zustand stores
├── styles/              # Global styles
├── utils/               # Utility functions
└── types.ts             # Global TypeScript types
```

### Key Features Implementation

#### Audio System

- Global mute/unmute functionality via Zustand store
- Context-aware sound effects (hover, click, win, lose, etc.)
- Lazy-loaded audio files for performance

#### Mobile Support

- Responsive design with CSS media queries
- Touch-optimized controls for Snake game
- Mobile detection hook for conditional UI

#### Game State Management

- Custom hooks for each game's logic
- Consistent game status types (`idle`, `running`, `won`, `lost`)
- URL-based difficulty selection with fallbacks

## Testing

### Unit Tests (Vitest)

```bash
npm run test              # Run all tests
npm run test:coverage     # Generate coverage report
npm run test:ui          # Interactive test UI
```

### E2E Tests (Cypress)

```bash
npm run e2e:dev          # Test against dev server
npm run e2e              # Test against production build
```

### Test Coverage

- Game logic and state management
- Component rendering and interactions
- User workflows and edge cases
- Mobile and desktop experiences

## Configuration

### Custom Fonts

The project uses Google Fonts loaded via Next.js:

- **Monoton**: Logo and headers
- **Press Start 2P**: Game titles
- **VT323**: Body text (retro monospace)

### Asset Optimization

- SVG icons processed with SVGR
- Images optimized with Next.js Image component

## Customization

### Styling

- CSS Variables defined in `src/styles/globals.css`
- Component-scoped styles using CSS Modules
- Responsive breakpoints: 525px, 768px, 1900px, 2560px

## Browser Support

- **Modern browsers** (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+)
- **Mobile browsers** (iOS Safari 14+, Chrome Mobile 90+)
- **Features used**: CSS Grid, Flexbox, CSS Variables, ES2017+

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

### Graphics

- Pixel icons by [Admurin](https://admurin.itch.io/)
- 3D "Magic Button" design by [Josh W. Comeau](https://www.joshwcomeau.com/animation/3d-button/)

### Code Inspiration

- Snake game implementation inspired by [Menard Maranan's tutorial](https://dev.to/menard_codes/i-built-a-snake-game-in-react-48b6)

### Audio

- Sound effects from [Freesound.org](https://freesound.org) (Creative Commons)
- Audio playback powered by [use-sound](https://www.npmjs.com/package/use-sound)

See more detailed acknowledgments on the **About** page.

## Links

- **Repository**: [GitHub Repository](https://github.com/totokartonio/next-arcade)

---

## Dev Notes

This project was a small playground to experiment with different ideas — primarily **Next.js** and **SSR**. I also wanted to practice **Zustand**, so the global **mute** is powered by it (arguably overkill for a single toggle, but that was the point of the exercise). In general, I consider sound an essential part of arcade games, so adding SFX felt important.

Things I’d still like to add:

- Theme switching (light/dark)
- Scorekeeping in each game
- Local leaderboards

Maybe I’ll circle back and ship these later. I really enjoyed creating this project and hope at least someone on the web has fun messing with it 😅
