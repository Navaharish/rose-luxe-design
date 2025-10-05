# Enormous - Natural Beauty & Skincare E-commerce Platform

## Migration Status (October 2025)

**Successfully migrated from Lovable to Replit full-stack environment!**

### Completed:
- ✅ Full-stack structure with Express.js server and Vite dev server
- ✅ PostgreSQL database via Neon with Drizzle ORM
- ✅ Shared schema between frontend and backend (`shared/schema.ts`)
- ✅ Complete API routes for all entities (products, cart, orders, reviews, wishlists, addresses)
- ✅ Storage interface with type-safe database operations
- ✅ TypeScript configuration with @shared alias support
- ✅ Database schema pushed to Neon Postgres
- ✅ Application running on port 5000

### Important Notes:
- **Authentication System**: The Supabase auth system has been removed. The `profiles` table now serves as the main user table. You'll need to implement your own authentication (consider using a Replit auth integration or similar).
- **Database Schema**: Adapted from Supabase to standalone Postgres. All foreign key relationships use `profiles.id` as the user reference instead of `auth.users`.
- **Frontend**: Current frontend still uses hardcoded data. You'll need to integrate the API endpoints using the `queryClient` from `src/lib/queryClient.ts`.

### Next Steps:
1. Implement authentication system (search for auth integrations)
2. Update frontend components to use API endpoints instead of hardcoded data
3. Add user session management
4. Configure payment processing (Razorpay or similar)

## Overview

Enormous is a full-stack e-commerce web application for natural cosmetics and skincare products. Built with React, TypeScript, Express.js, and PostgreSQL (via Drizzle ORM), it provides a modern shopping experience with features for browsing products, managing a shopping cart, processing orders, and administrative product management.

The application follows a monorepo structure with shared schemas between frontend and backend, using Vite for development and build tooling. It integrates shadcn/ui components for a polished, accessible user interface with a luxury beauty aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling:**
- React 18 with TypeScript for type safety
- Vite as build tool and development server
- React Router for client-side routing
- TanStack Query for server state management and data fetching

**UI Component System:**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Custom theme with rose-gold, lavender, and cream color palette
- Responsive design with mobile-first approach

**State Management:**
- React Query for server-side state caching and synchronization
- Local React state for UI interactions
- Custom hooks for reusable logic (mobile detection, toast notifications)

**Routing Structure:**
- `/` - Home page with featured products
- `/shop` - Product catalog with filtering
- `/product/:id` - Individual product details
- `/cart` - Shopping cart management
- `/checkout` - Order placement flow
- `/account` - User account management (orders, wishlist, addresses)
- `/admin` - Administrative dashboard
- `/about` - Company information
- `/contact` - Contact form

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routes
- Middleware for JSON parsing, CORS, and request logging
- Custom error handling middleware

**Database Layer:**
- PostgreSQL database via Neon serverless
- Drizzle ORM for type-safe database operations
- WebSocket support for serverless database connections
- Migration system via drizzle-kit

**API Design:**
- RESTful API endpoints under `/api` prefix
- CRUD operations for products, cart, orders, reviews, wishlists
- Request/response validation using Zod schemas
- Centralized storage interface for database operations

**Key API Endpoints:**
- `GET/POST /api/products` - Product management
- `GET/POST/PATCH/DELETE /api/cart` - Cart operations
- `GET/POST /api/orders` - Order processing
- `GET/POST/DELETE /api/reviews` - Product reviews
- `GET/POST/DELETE /api/wishlist` - Wishlist management
- `GET/PATCH /api/profile` - User profile management

### Database Schema

**Core Tables:**
- `profiles` - User account information
- `user_roles` - Role-based access control (admin/customer)
- `products` - Product catalog with detailed information
- `cart_items` - Shopping cart entries per user
- `orders` - Order records with payment status
- `order_items` - Line items for each order
- `reviews` - Product reviews and ratings
- `wishlists` - Saved products per user
- `addresses` - Shipping/billing addresses

**Data Relationships:**
- User profiles linked to cart items, orders, reviews, and wishlists
- Products referenced in cart items, order items, and reviews
- Orders contain multiple order items
- Cascade deletion for user-related data

**Schema Features:**
- UUID primary keys for all tables
- Timestamp tracking (created_at, updated_at)
- Enum types for roles and order status
- JSONB for flexible address storage
- Decimal precision for monetary values

### Authentication & Authorization

**Current Implementation:**
- User profile system with email-based identification
- Role-based access control via `user_roles` table
- Admin and customer role distinction
- Profile management endpoints

**Integration Ready:**
- Supabase client configured (@supabase/supabase-js)
- Can be extended with Supabase Auth for complete authentication flow

### Development Workflow

**Environment:**
- Vite dev server on port 8080
- Express API server on port 5000
- Hot module replacement for frontend
- Automatic server restart with tsx

**Code Quality:**
- ESLint with TypeScript rules
- Relaxed TypeScript strictness for rapid development
- React hooks and refresh plugins
- Path aliases for clean imports (@/ and @shared/)

**Build Process:**
- `npm run dev` - Starts Express server with Vite middleware
- `npm run build` - Production build
- `npm run db:push` - Push schema changes to database

## External Dependencies

### Core Infrastructure
- **Neon Database** - Serverless PostgreSQL hosting
- **Drizzle ORM** - Type-safe database toolkit and migration system

### Payment Processing
- **Razorpay** - Payment gateway integration (referenced in requirements, implementation pending)

### UI Framework
- **Radix UI** - Accessible component primitives (accordion, dialog, dropdown, etc.)
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Embla Carousel** - Carousel/slider functionality

### Data Management
- **TanStack Query** - Async state management
- **React Hook Form** - Form handling with validation
- **Zod** - Runtime type validation and schema definition

### Development Tools
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **PostCSS & Autoprefixer** - CSS processing

### Fonts & Assets
- **Google Fonts** - Playfair Display and Poppins font families
- **Lovable Tagger** - Development component identification (dev mode only)

### Notable Features
- Shared schema definitions between client and server using Drizzle-Zod
- Serverless-compatible database connection pooling
- Component-based architecture with shadcn/ui conventions
- SEO-optimized meta tags and Open Graph support