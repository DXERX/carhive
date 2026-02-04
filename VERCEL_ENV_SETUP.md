# Vercel Environment Variables Setup Guide

## How to Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Navigate to [vercel.com](https://vercel.com)
2. Select your project **avis-flame**
3. Click **Settings** (top menu)

### Step 2: Add Environment Variables
1. Go to **Environment Variables** (left sidebar)
2. For each variable below, click **"Add New"** and copy-paste:

---

## Required Environment Variables

### Supabase Configuration
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xqocwpufedovemumoffw.supabase.co

Name: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
Value: sb_publishable_COoWrOvtiM9SXf4ku9Br7w_39GGtspD

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxb2N3cHVmZWRvdmVtdW1vZmZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3MDQ0MDAsImV4cCI6MjAyNDI4MDQwMH0.sb_publishable_COoWrOvtiM9SXf4ku9Br7w_39GGtspD
```

### Database Configuration (IMPORTANT - Missing!)
```
Name: DATABASE_URL
Value: postgres://postgres.xqocwpufedovemumoffw:V7YbSvYiALzWeZjL@aws-1-eu-west-1.pooler.supabase.com:6543/postgres

Name: POSTGRES_URL
Value: postgres://postgres.xqocwpufedovemumoffw:V7YbSvYiALzWeZjL@aws-1-eu-west-1.pooler.supabase.com:6543/postgres
```

### Clerk Authentication
```
Name: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
Value: pk_test_cHJvbXB0LW1vdGgtODguY2xlcmsuYWNjb3VudHMuZGV2JA

Name: CLERK_SECRET_KEY
Value: sk_test_6Te3yb9a4IEbmarm974cNmolaNO9nt51hyhqEkwqCf

Name: NEXT_PUBLIC_CLERK_SIGN_IN_URL
Value: /sign-in

Name: NEXT_PUBLIC_CLERK_SIGN_UP_URL
Value: /sign-up
```

### Cloudinary Configuration
```
Name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
Value: drjt9tb7x

Name: CLOUDINARY_API_KEY
Value: 351417476125178

Name: CLOUDINARY_API_SECRET
Value: Cy7ZnesCY-o3H7Cj3NB9cU-l5Fo

Name: CLOUDINARY_URL
Value: cloudinary://351417476125178:Cy7ZnesCY-o3H7Cj3NB9cU-l5Fo@drjt9tb7x
```

### Admin Configuration
```
Name: ADMIN_EMAILS
Value: hak4rgof120876@gmail.com

Name: NEXT_PUBLIC_ADMIN_EMAILS
Value: hak4rgof120876@gmail.com
```

---

## Step 3: Deploy
After adding all environment variables:

1. Go to **Deployments** (top menu)
2. Click the three dots **...** on the latest deployment
3. Select **Redeploy**
4. Wait for deployment to complete

---

## Verification
After deployment, check logs:
- Go to **Deployments** → Latest → **Functions** or **Logs**
- You should **NOT** see `"Database not available, using fallback cars data"`
- Instead, you should see successful database queries

---

## Notes
- ⚠️ Do NOT commit these secrets to git (they're already in `.gitignore`)
- 🔒 Keep `CLERK_SECRET_KEY` and `CLOUDINARY_API_SECRET` private
- ✅ `NEXT_PUBLIC_*` variables are public and safe to expose
