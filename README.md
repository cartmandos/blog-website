# Terminal-Style Portfolio Website

A modern, interactive portfolio website built with Astro v5, featuring a terminal-like interface and IDE-inspired design. The site combines static site generation for optimal performance with interactive components for an engaging user experience.

## Features

- 🖥️ Terminal emulator with working commands and file system
- 💻 IDE-inspired UI with working sidebar, tabs, and themes
- 📝 Blog system with Markdown/MDX support
- 🎨 Light/Dark theme support
- ⚡ Optimal performance through static generation
- 🔍 Full content search capabilities
- 📱 Responsive design

## Tech Stack

- [Astro](https://astro.build/) v5 - Static Site Generator
- TypeScript - Type-safe development
- Content Collections - Content management
- Islands Architecture - Component hydration

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Terminal/  # Terminal-related components
│   ├── Page/      # Page view components
│   └── ui/        # Common UI elements
├── content/       # Content collections
├── layouts/       # Page layouts
├── pages/         # Route pages
├── styles/        # Global styles
├── utils/         # Shared utilities
└── types/         # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js >= 22.11.0
- pnpm (recommended) or npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/username/terminal-portfolio.git
cd terminal-portfolio
```

2. Install dependencies

```bash
pnpm install
```

3. Start development server

```bash
pnpm dev
```

The site will be available at `http://localhost:4321`

### Build

To build for production:

```bash
pnpm build
```

To preview the production build:

```bash
pnpm preview
```

## Terminal Commands

The terminal interface supports several Unix-like commands:

- `help` - Display available commands
- `ls` - List directory contents
- `cd` - Change directory
- `cat` - Display file contents
- `clear` - Clear terminal screen
- And more...

## Development

### Key Principles

- TypeScript-first development with strict type checking
- Component-based architecture using Astro components
- Static-first approach for optimal performance
- Clean, maintainable code with clear separation of concerns
- Islands architecture for selective hydration

### Adding New Terminal Commands

To add new commands, extend the `CommandSystem` class in `src/utils/filesystem/commands.ts`:

```typescript
export function executeCommand(cmd: string): string[] {
  const [command, ...args] = cmd.trim().split(/\s+/)

  switch (command) {
    case "your-command":
      return handleYourCommand(args)
    // ...
  }
}
```

### Content Management

Content is managed through Astro's Content Collections API. To add new content:

1. Create your content in `src/data/` using Markdown or MDX
2. Update the collection schema in `src/content.config.ts` if needed
3. Query content using the Content Collections API:

```typescript
import { getCollection } from "astro:content"
const posts = await getCollection("blog")
```
