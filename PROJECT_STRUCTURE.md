# Avis Car Rental Platform - Project Structure

## 📂 Root Files
- `package.json` - Project dependencies & scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `prettier.config.js` - Code formatting rules
- `middleware.ts` - Clerk auth middleware
- `.env` - Environment variables

## 📁 Key Directories

### `/app` - Next.js App Router
- `(auth)/` - Sign-in/Sign-up pages
- `(app)/` - Protected routes
  - `admin/` - Admin dashboard (bookings, cars, users, settings, content)
  - `dashboard/` - User dashboard
  - `bookings/` - User bookings management
  - `profile/` - User profile settings
- `api/` - API routes
- `cars/` - Car listing & details pages
- `reservation/` - Booking/reservation flow
- `components/` - Homepage components

### `/components` - Reusable UI Components
- `site-header.tsx` - Header navigation
- `site-footer.tsx` - Footer with AVIS links
- `search-panel.tsx` - Car search interface
- `cld-image.tsx` - Image wrapper
- `admin-sidebar.tsx` - Admin navigation
- `user-menu-button.tsx` - User profile menu
- `/ui` - Shadcn UI components
- `/icons` - Icon components
- `/skeletons` - Loading skeletons

### `/lib` - Utilities & Helpers
- `admin.ts` - Admin authentication
- `i18n.ts` - Internationalization (EN, TR, AR)
- `cloudinary.ts` - Image handling
- `supabase/` - Supabase client
- `stripe/` - Stripe integration
- `types.ts` - TypeScript types
- `utils.ts` - Helper functions
- `dates.ts` - Date utilities

### `/db` - Database
- `schema.ts` - Database schema (Drizzle ORM)
- `index.ts` - Database initialization
- `seed.ts` - Database seeding
- `schema-settings.ts` - Settings table
- `/queries` - Database queries
  - `booking-repository.ts` - Booking queries
  - `admin-repository.ts` - Admin queries
- `/migrations` - Database migrations

### `/hooks` - React Hooks
- `use-locale.ts` - Get current locale
- `use-toast.ts` - Toast notifications
- `use-debounce.ts` - Debounce hook
- `use-media-query.ts` - Responsive queries

### `/config` - Configuration
- `site.ts` - Site config (name, URLs, branding)

### `/public` - Static Assets
- `/uploads/cars` - User-uploaded car images
- `/assets/images/cars/catalog` - Static fallback images

### `/scripts` - Utility Scripts
- `download-car-images.mjs` - Populate car images

### `/styles` - Global Styles
- `globals.css` - Tailwind & custom styles

### `/actions` - Server Actions
- `stripe.ts` - Stripe server actions

## 🔑 Key Features
- ✅ Multi-language support (English, Turkish, Arabic)
- ✅ Admin dashboard for cars, bookings, users, settings
- ✅ Custom file uploads for car images
- ✅ Slug-based image fallbacks
- ✅ User authentication with Clerk
- ✅ Database with Supabase (PostgreSQL)
- ✅ Responsive design with Tailwind CSS
- ✅ SEO optimized

## 📝 Documentation
- `README.md` - Project overview
- `LICENSE.md` - MIT License
