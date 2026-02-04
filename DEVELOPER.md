# AVIS Luxury Rentals - Production Grade Application

**Status**: 🟢 Production Ready (Core Features)

A Next.js 14 luxury car rental application with:
- ✅ Custom file uploads (replaced Cloudinary)
- ✅ AVIS branding throughout
- ✅ Centralized error handling & logging
- ✅ Multi-language support (EN, TR, AR)
- ✅ Database-backed content management
- ✅ Admin dashboard with authentication
- ✅ Responsive design with Tailwind CSS

## Quick Links
- [Production Setup Guide](PRODUCTION-SETUP.md)
- [Production Status](PRODUCTION-GRADE-STATUS.md)
- [Architecture Overview](#architecture)

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Supabase) + Drizzle ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **Logging**: Custom centralized logger
- **File Storage**: Local filesystem (`/public/uploads`)
- **Deployment**: Vercel

## Project Structure

```
carhive/
├── app/
│   ├── api/                 # API routes with error handling
│   │   ├── health/         # System health check
│   │   ├── uploads/        # File upload handler
│   │   └── locations/      # Location queries
│   ├── components/          # Home page components (database-backed)
│   │   ├── features.tsx    # Fetches from DB
│   │   ├── testimonials.tsx # Fetches from DB
│   │   ├── call-to-action.tsx # Fetches from DB
│   │   └── ...
│   ├── (app)/              # Authenticated routes
│   │   ├── admin/          # Admin dashboard
│   │   ├── bookings/       # Booking management
│   │   ├── profile/        # User profile
│   │   ├── cars/           # Car browsing
│   │   ├── dashboard/      # User dashboard
│   │   └── reservation/    # Reservation flow
│   ├── error.tsx           # Global error boundary
│   └── layout.tsx
├── db/
│   ├── schema.ts           # Database schema (9 tables)
│   ├── seed-content.ts     # Initial data seeding
│   ├── index.ts            # DB connection
│   └── queries/
│       ├── admin-repository.ts
│       ├── booking-repository.ts
│       ├── car-repository.ts
│       └── content-repository.ts # Features, testimonials, etc
├── lib/
│   ├── logger.ts           # Centralized logging (error/warn/info/debug)
│   ├── api-handler.ts      # API wrapper with error handling
│   ├── admin.ts            # Admin authentication checks
│   ├── health-check.ts     # Database health monitoring
│   ├── i18n.ts             # Translations (EN, TR, AR)
│   └── ...
├── public/
│   ├── uploads/cars/       # User uploaded car images
│   ├── assets/images/      # Static images
│   └── ...
├── components/             # Shared UI components
└── config/                 # App configuration

```

## Database Schema

**9 Tables**:
- `cars`: Vehicle catalog
- `bookings`: Reservation data
- `locations`: Pickup/dropoff locations
- `admin_roles`: User permissions
- `hero_sections`: Homepage hero content
- `features`: Feature list content
- `testimonials`: Customer reviews
- `cta_sections`: Call-to-action sections
- `settings`: Key-value configuration

## Environment Variables

```bash
# Required
DATABASE_URL=postgresql://user:password@host/dbname
POSTGRES_URL=postgresql://user:password@host/dbname
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Optional but recommended
ADMIN_EMAILS=admin@example.com,admin2@example.com
LOG_TO_FILE=true
DEBUG=false
NEXT_PUBLIC_APP_URL=https://example.com
```

## Development

### Setup
```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Run migrations
npx drizzle-kit migrate

# Seed sample data
npx ts-node db/seed-content.ts

# Start dev server
pnpm dev
```

### Database Commands
```bash
# Generate migrations
npx drizzle-kit generate

# Run migrations
npx drizzle-kit migrate

# Push schema (Supabase)
npx drizzle-kit push

# Seed data
npx ts-node db/seed-content.ts

# Introspect database
npx drizzle-kit introspect
```

### Monitoring Logs
```bash
# Watch logs in real-time
tail -f /tmp/carhive-logs/app-$(date +%Y-%m-%d).log

# Count errors by type
grep "ERROR" /tmp/carhive-logs/*.log | cut -d']' -f3 | sort | uniq -c

# Find specific errors
grep "Failed to load" /tmp/carhive-logs/*.log
```

## Building & Deployment

### Local Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
# Set environment variables in Vercel Project Settings
# Then push to main branch
git push origin main

# Vercel automatically builds and deploys
```

## API Endpoints

All endpoints use consistent error handling pattern:

```typescript
{
  success: true,
  data: { /* response data */ }
}
// or
{
  success: false,
  error: "Error message",
  message: "User-friendly message"
}
```

### Available Endpoints
- `GET /api/health` - System health check
- `POST /api/uploads` - Upload car images
- `GET /api/locations` - Get all locations
- More documented in code

## Error Handling

### Three-Layer Approach

1. **Function Level**: Try-catch with logger
```typescript
try {
  const data = await fetchData()
  return data
} catch (error) {
  logger.error("Failed to fetch", "component", error)
  return fallbackData
}
```

2. **Route Level**: Error boundaries
```typescript
// app/admin/error.tsx catches all admin route errors
// app/error.tsx catches global errors
```

3. **API Level**: handleApiRequest wrapper
```typescript
export async function POST(req) {
  return handleApiRequest(req, async (req) => {
    // Your logic
  }, { endpoint: "/api/route" })
}
```

## Logging System

### Log Levels
- `ERROR`: Critical failures requiring attention
- `WARN`: Issues that don't stop execution
- `INFO`: Important events (useful for monitoring)
- `DEBUG`: Detailed info (dev only, set DEBUG=true)

### Usage
```typescript
import { logger } from '@/lib/logger'

logger.error("Failed to load users", "admin-page", error, { userId: "123" })
logger.warn("Database slow", "query-handler", { duration: 5000 })
logger.info("User logged in", "auth", { email: "user@example.com" })
logger.debug("Starting process", "debug-context")
```

### Log Location
- **Development**: Console output only
- **Production**: `/tmp/carhive-logs/app-YYYY-MM-DD.log` (daily rotation)

## Performance Considerations

✅ **Optimizations**:
- Next.js static generation where possible
- Image lazy loading
- Database query optimization
- API caching headers
- Compression enabled

⚠️ **Known Limitations**:
- Vercel ephemeral filesystem (logs not persistent on Vercel)
- Database connection pooling limits
- Static builds have 45s timeout

## Security

- Clerk authentication for protected routes
- Environment variables for secrets
- Admin role-based access control
- Input validation in API routes
- CORS headers configured
- No sensitive data in logs

## Troubleshooting

### "Database not available"
```bash
# Check connection
psql $DATABASE_URL

# Verify migrations
npx drizzle-kit introspect

# Check environment
echo $DATABASE_URL
```

### "Tables don't exist"
```bash
# Run migrations
npx drizzle-kit migrate

# Seed data
npx ts-node db/seed-content.ts
```

### "Admin dashboard not showing"
- Check `ADMIN_EMAILS` in .env
- Verify Clerk user email matches
- Check logs: `grep "Admin Check" /tmp/carhive-logs/*.log`

### "Images not uploading"
```bash
# Check permissions
mkdir -p public/uploads/cars
chmod 755 public/uploads/cars

# Check logs
grep "Upload" /tmp/carhive-logs/*.log
```

## Testing

```bash
# Build test
npm run build

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Test locally: `npm run build && npm run dev`
4. Commit: `git commit -am "Description"`
5. Push: `git push origin feature/name`
6. Create pull request

## Monitoring Checklist

- [ ] Error logs monitoring
- [ ] Database connection health
- [ ] API response times
- [ ] User authentication failures
- [ ] Failed uploads
- [ ] Missing content/404s

## Future Enhancements

- [ ] Third-party log aggregation (LogRocket, Datadog)
- [ ] Real-time error alerts
- [ ] Admin log viewer dashboard
- [ ] A/B testing framework
- [ ] CDN for images
- [ ] Advanced caching strategies

---

**Support**: For issues or questions, check the logs first:
```bash
tail -f /tmp/carhive-logs/app-*.log
```

**Documentation**: See [PRODUCTION-SETUP.md](PRODUCTION-SETUP.md) for deployment guide.

**Last Updated**: 2024
**Version**: 1.0.0-beta
