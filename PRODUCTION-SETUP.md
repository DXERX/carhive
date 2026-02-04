# Production Grade Setup Guide

## Quick Start - Production Ready Setup

### 1. Set Environment Variables

Create `.env.local`:
```bash
# Database
DATABASE_URL=postgresql://[user]:[password]@localhost:5432/carhive
POSTGRES_URL=postgresql://[user]:[password]@localhost:5432/carhive

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here

# Admin Emails (fallback)
ADMIN_EMAILS=admin@example.com,admin2@example.com

# Logging
LOG_TO_FILE=true
DEBUG=false

# Deployment
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. Run Migrations

```bash
# Install dependencies
pnpm install

# Run database migrations
npx drizzle-kit migrate

# Seed initial content
npx ts-node db/seed-content.ts
```

### 3. Build & Deploy

```bash
# Build
npm run build

# Test locally
npm run dev

# Deploy to Vercel (automatic from git)
git push origin main
```

## Vercel Deployment

### Environment Variables to Set in Vercel:
1. Go to Project Settings → Environment Variables
2. Add these variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | PostgreSQL connection string | From Supabase |
| `POSTGRES_URL` | PostgreSQL connection string | Same as DATABASE_URL |
| `POSTGRES_PRISMA_URL` | PostgreSQL connection string | Same as DATABASE_URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Your key | From Clerk dashboard |
| `CLERK_SECRET_KEY` | Your key | From Clerk dashboard |
| `ADMIN_EMAILS` | `admin@example.com` | Comma-separated |
| `LOG_TO_FILE` | `true` | Enable file logging |
| `NEXT_PUBLIC_APP_URL` | Your domain | https://your-domain.com |

### After Deployment
- Database will auto-migrate on first deployment
- Logs will be available in `/tmp/carhive-logs/` (Vercel filesystem is ephemeral)
- For persistent logs, consider integrating with third-party service

## Local Development

### Database Setup (Local Postgres)
```bash
# Start PostgreSQL (if using Docker)
docker run --name carhive-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=carhive \
  -p 5432:5432 \
  postgres:latest

# Or use Supabase local development
# https://supabase.com/docs/guides/local-development
```

### Seed Sample Data
```bash
# This creates demo content in the database
npx ts-node db/seed-content.ts
```

### View Logs
```bash
# Watch logs in real-time
tail -f /tmp/carhive-logs/app-$(date +%Y-%m-%d).log

# Or check all logs
ls -la /tmp/carhive-logs/
```

## Monitoring & Troubleshooting

### Check Database Connection
```bash
# Test Supabase connection
npx drizzle-kit push --verbose

# Verify tables exist
npx drizzle-kit introspect
```

### View Error Logs
```bash
# All errors from today
grep "ERROR" /tmp/carhive-logs/app-$(date +%Y-%m-%d).log

# Follow errors in real-time
tail -f /tmp/carhive-logs/app-*.log | grep ERROR
```

### Common Issues

#### "Database not available"
- Check DATABASE_URL is set
- Verify PostgreSQL is running
- Test connection: `psql $DATABASE_URL`

#### "Tables don't exist"
- Run migrations: `npx drizzle-kit migrate`
- Check schema: `npx drizzle-kit introspect`

#### "Logs not writing"
- Check `/tmp/carhive-logs/` exists: `mkdir -p /tmp/carhive-logs`
- Verify LOG_TO_FILE=true in .env
- Check file permissions: `chmod 755 /tmp/carhive-logs`

## Production Checklist

- [ ] Database connection verified
- [ ] Migrations run successfully
- [ ] Seed data loaded
- [ ] Admin users created
- [ ] Error boundaries tested
- [ ] Logs write to files
- [ ] All API endpoints return proper errors
- [ ] Cloudinary replaced with file uploads
- [ ] AVIS branding applied throughout
- [ ] Multi-language support working
- [ ] Mobile responsive tested
- [ ] Performance optimized (images lazy-loaded)
- [ ] Security headers configured
- [ ] Rate limiting enabled (for APIs)
- [ ] Backups scheduled

## File Structure for Production

```
carhive/
├── app/
│   ├── api/                    # API routes with error handling
│   ├── components/             # Components using database
│   ├── (app)/
│   │   ├── admin/              # Admin pages with error boundaries
│   │   └── ...
│   ├── error.tsx               # Global error boundary
│   └── layout.tsx
├── db/
│   ├── schema.ts               # Database tables
│   ├── seed-content.ts         # Seed script
│   └── queries/                # Repository layer
├── lib/
│   ├── logger.ts               # Centralized logging
│   ├── api-handler.ts          # API wrapper
│   ├── admin.ts                # Admin checks
│   └── ...
├── public/
│   ├── uploads/                # User uploads
│   └── assets/                 # Static assets
├── logs/                        # Log files (gitignored)
└── middleware.ts               # Auth middleware
```

## Monitoring Log Files

### Daily Logs Structure
```
/tmp/carhive-logs/
├── app-2024-01-15.log
├── app-2024-01-16.log
└── app-2024-01-17.log
```

### Log Entry Format
```
[2024-01-17T10:30:45.123Z] [ERROR] [features-component] Failed to load features
Error: Connection refused
Data: {"duration": 150, "attempt": 1}
```

### Useful Commands
```bash
# Count errors per day
wc -l /tmp/carhive-logs/app-*.log

# Find specific errors
grep "Failed to load" /tmp/carhive-logs/*.log

# Extract error patterns
grep "ERROR" /tmp/carhive-logs/*.log | cut -d']' -f4 | sort | uniq -c

# Monitor in real-time
tail -f /tmp/carhive-logs/app-*.log
```

---

For more details, see [PRODUCTION-GRADE-STATUS.md](PRODUCTION-GRADE-STATUS.md)
