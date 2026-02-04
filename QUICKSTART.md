# 🚀 Quick Start - Production Grade App

## Deploy in 5 Minutes

### Step 1: Setup Database
```bash
npx drizzle-kit migrate
npx ts-node db/seed-content.ts
```

### Step 2: Test Locally
```bash
pnpm dev
# Visit http://localhost:3000
```

### Step 3: Deploy to Vercel
```bash
git push origin main
# Set 6 env vars in Vercel → Deploy automatically starts
```

### Step 4: Verify Production
```bash
curl https://your-domain.com/api/health
# Should return: { "status": "healthy", "database": { "connected": true } }
```

---

## Environment Variables Required

```
DATABASE_URL=postgresql://user:pass@host/db
POSTGRES_URL=postgresql://user:pass@host/db
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_xxx
CLERK_SECRET_KEY=sk_xxx
ADMIN_EMAILS=admin@example.com
LOG_TO_FILE=true
```

---

## What You Get

| Feature | Status | Location |
|---------|--------|----------|
| Error Handling | ✅ | `lib/logger.ts` + Error Boundaries |
| Logging System | ✅ | `/tmp/carhive-logs/app-*.log` |
| Database Content | ✅ | `db/schema.ts` (9 tables) |
| Health Monitoring | ✅ | `GET /api/health` |
| Admin Dashboard | ✅ | `/admin/*` (Protected routes) |
| File Uploads | ✅ | `/api/uploads` |
| Multi-Language | ✅ | EN, TR, AR |

---

## Common Tasks

### Check System Status
```bash
curl https://your-domain.com/api/health
```

### View Error Logs
```bash
tail -f /tmp/carhive-logs/app-$(date +%Y-%m-%d).log
```

### Update Homepage Content
```sql
-- Update features
UPDATE features SET title = 'New Title' WHERE id = 1;

-- Update testimonials
UPDATE testimonials SET content = 'New review' WHERE id = 1;
```

### Add Admin User
```bash
# Set ADMIN_EMAILS in .env to user's email
# They automatically gain admin access via Clerk
```

---

## Troubleshooting

### Database Connection Failed
```bash
# Test connection
psql $DATABASE_URL

# Verify migration
npx drizzle-kit introspect
```

### Admin Not Showing
```bash
# Check email matches exactly (case-sensitive)
echo $ADMIN_EMAILS
```

### Logs Not Writing
```bash
# Create log directory
mkdir -p /tmp/carhive-logs
chmod 755 /tmp/carhive-logs

# Verify in .env
LOG_TO_FILE=true
```

---

## Key Files

- **Setup**: [PRODUCTION-SETUP.md](PRODUCTION-SETUP.md)
- **Features**: [PRODUCTION-GRADE-STATUS.md](PRODUCTION-GRADE-STATUS.md)  
- **Docs**: [DEVELOPER.md](DEVELOPER.md)
- **Details**: [PRODUCTION-COMPLETE.md](PRODUCTION-COMPLETE.md)

---

**Ready to deploy?** Follow the 5 steps above! 🎉
