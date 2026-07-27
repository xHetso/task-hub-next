# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Development Commands

- `bun run dev` - Start development server with Turbopack on all interfaces
- `bun run build` - Build the production application
- `bun run start` - Start production server
- `bun run lint` - Run Next.js linting

## Architecture Overview

This is a Next.js 15 task management application using the App Router with
TypeScript and Tailwind CSS.

### Key Architecture Patterns

- **App Router Structure**: Uses Next.js 15 App Router with parallel routes for
  modals (`@modals` slot)
- **Layout Composition**: Dashboard layout uses a sidebar + main content grid
  layout with modal support
- **Component Organization**: UI components are organized by feature (task,
  layout, ui primitives)
- **Type Safety**: Strong TypeScript usage with dedicated type files for domains
  (profile, project, task)
- **Styling**: Tailwind CSS with custom design system using Radix UI primitives

### Project Structure

- `src/app/` - App Router pages and layouts
  - `@modals/` - Parallel route for modal dialogs
  - `dashboard/` - Main dashboard with feature modules (project-stats,
    last-tasks, project-chart)
- `src/components/` - Reusable components
  - `layout/sidebar/` - Sidebar navigation with menu and profile
  - `ui/` - UI primitives and task components
- `src/config/` - Configuration including route definitions via `Pages` class
- `src/types/` - TypeScript type definitions organized by domain
- `src/utils/` - Utility functions

### Key Dependencies

- **UI Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: Radix UI primitives (dropdown-menu, select, slot)
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Theming**: next-themes for dark/light mode
- **Utilities**: clsx, tailwind-merge, class-variance-authority

### Development Notes

- Uses Turbopack for fast development builds
- Configured for network access (`-H 0.0.0.0`) for all bun scripts
- Font: Poppins via next/font with multiple weights
- Uses intercepted routes for modal dialogs (task editing)
- Centralizes route management through `Pages` class in config
