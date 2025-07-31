# Replit.md

## Overview

This is a Google Play Store app detail page clone built as a full-stack web application. The project demonstrates a pixel-perfect app store interface with detailed app listings, reviews, ratings, and developer information. It features a React frontend with TypeScript and shadcn/ui components, an Express.js backend with REST API endpoints, and uses in-memory storage for development. The application is designed as "Google Play Lite" where all external links point to the official Google Play Store while maintaining the authentic UI experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Google Play theme colors
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with structured endpoints
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot module replacement with Vite integration

### Key Components

#### Database Schema
The application uses four main tables:
- **apps**: Core app information (name, developer, ratings, screenshots, etc.)
- **reviews**: User reviews linked to apps
- **developerApps**: Apps grouped by developer
- **similarApps**: Related app recommendations

#### API Endpoints
- `GET /api/apps/:id` - Get app by ID
- `GET /api/apps/by-name/:name` - Get app by name
- `GET /api/apps` - Get all apps
- `GET /api/apps/:id/reviews` - Get app reviews

#### UI Components
Modular React components for different sections:
- AppInfo: Main app details and install button
- ScreenshotCarousel: Image gallery with smooth scrolling
- RatingsBreakdown: Visual rating distribution
- RecentReviews: User review cards
- DeveloperApps & SimilarApps: Related content sections

## Data Flow

1. **Initial Load**: App fetches data based on URL parameter (app name)
2. **API Requests**: TanStack Query manages caching and fetching
3. **Component Rendering**: Data flows down through component props
4. **User Interactions**: Navigation and UI state handled locally
5. **Storage Layer**: In-memory storage with sample data (development mode)

## External Dependencies

### Frontend Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Accessible UI component primitives
- **wouter**: Lightweight client-side routing
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library

### Backend Dependencies
- **express**: Web application framework
- **drizzle-orm**: Type-safe SQL ORM
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- **connect-pg-simple**: PostgreSQL session store

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite bundles React app to `dist/public`
2. **Backend Build**: esbuild compiles server code to `dist/index.js`
3. **Database Migration**: Drizzle handles schema migrations

### Environment Configuration
- **Development**: Uses Vite dev server with Express API proxy
- **Production**: Serves static files from Express with API routes
- **Database**: Configured via `DATABASE_URL` environment variable

### Render Anti-Spin Down Integration
- **Keep-Alive Service**: Automatically prevents Render free tier instances from spinning down
- **Health Monitoring**: Built-in `/api/health` endpoint for service monitoring
- **Production Only**: Service only activates in production environment
- **Auto-Detection**: Automatically detects Render URLs via environment variables
- **Smart Timing**: 10-minute ping intervals to stay within Render's 15-minute timeout

### Hosting Considerations
- **Static Assets**: Frontend builds to static files for CDN deployment
- **API Server**: Express server handles API requests and serves frontend
- **Database**: PostgreSQL compatible (supports Neon, traditional PostgreSQL)
- **Session Storage**: Uses PostgreSQL for session persistence
- **Render Optimization**: Built-in anti-spin down functionality for improved user experience

The application is designed for easy deployment to platforms like Replit, Vercel, Render, or traditional VPS hosting with minimal configuration changes.

## Recent Changes

### July 31, 2025 - Anti-Spin Down Integration
- **Added Keep-Alive Service**: Integrated comprehensive anti-spin down solution for Render deployment
- **Health Monitoring**: Added `/api/health` endpoint for service monitoring and keep-alive pings
- **Environment Detection**: Automatic URL detection from RENDER_EXTERNAL_URL, REPLIT_URL, or localhost
- **Production-Only Activation**: Service only runs in production to avoid unnecessary development pings
- **Configurable Settings**: Support for custom intervals, URLs, and enable/disable via environment variables
- **Graceful Shutdown**: Proper cleanup during server termination
- **Comprehensive Logging**: Detailed ping status and error logging
- **Documentation**: Added deployment guide and usage instructions