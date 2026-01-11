# 🚀 Quick Deployment Checklist

Use this as a quick reference when deploying a new blog instance.

---

## ⚡ Quick Start (30 Minutes)

### 1️⃣ Copy Source Code (2 min)
```bash
# Create new directory
mkdir my-new-blog
cd my-new-blog

# Copy files (exclude node_modules, .next, .env.local, .git)
xcopy /E /I /H "path\to\tracksatscale\*" .
```

### 2️⃣ Create Supabase Project (5 min)
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Create new project
- [ ] Save database password
- [ ] Wait for project to be ready

### 3️⃣ Set Up Database (2 min)
- [ ] Open SQL Editor
- [ ] Copy & paste `supabase-schema.sql`
- [ ] Run the query
- [ ] Verify success

### 4️⃣ Get API Credentials (1 min)
- [ ] Settings → API
- [ ] Copy Project URL
- [ ] Copy anon key
- [ ] Copy service_role key

### 5️⃣ Configure Locally (3 min)
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 6️⃣ Test Locally (5 min)
```bash
npm install
npm run dev
```
- [ ] Visit http://localhost:3000
- [ ] Site loads correctly

### 7️⃣ Create Admin User (3 min)
- [ ] Go to /admin/login
- [ ] Sign up with email/password
- [ ] Go to Supabase → Table Editor → user_profiles
- [ ] Change role to 'admin'
- [ ] Login to /admin

### 8️⃣ Push to GitHub (3 min)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### 9️⃣ Deploy to Vercel (5 min)
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Import GitHub repository
- [ ] Add environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SITE_URL` (use Vercel URL)
- [ ] Deploy

### 🔟 Configure Production (3 min)
- [ ] Copy Vercel URL
- [ ] Update `NEXT_PUBLIC_SITE_URL` in Vercel
- [ ] Supabase → Authentication → URL Configuration
- [ ] Set Site URL to Vercel URL
- [ ] Add Redirect URLs:
  - `https://your-app.vercel.app/admin`
  - `https://your-app.vercel.app/admin/login`
  - `https://your-app.vercel.app/auth/callback`
- [ ] Redeploy on Vercel

---

## ✅ Final Verification

- [ ] Live site loads: `https://your-app.vercel.app`
- [ ] Can login to admin: `https://your-app.vercel.app/admin/login`
- [ ] Can create article
- [ ] Can publish article
- [ ] Article appears on homepage
- [ ] Article page loads correctly

---

## 🎯 Environment Variables Reference

### Local (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production (Vercel)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
```

---

## 🔗 Quick Links

| Service | URL | Purpose |
|---------|-----|---------|
| Supabase Dashboard | https://supabase.com/dashboard | Manage database |
| Vercel Dashboard | https://vercel.com/dashboard | Manage deployments |
| GitHub | https://github.com | Code repository |
| Local Dev | http://localhost:3000 | Test locally |
| Admin Panel | /admin | Manage content |

---

## 🚨 Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Build fails | Check environment variables in Vercel |
| Can't login | Verify Supabase Site URL and Redirect URLs |
| No articles showing | Check article status is 'published' |
| Database error | Verify SQL schema was run successfully |
| 404 on admin | Clear browser cache, check deployment logs |

---

## 📝 Post-Deployment Tasks

- [ ] Customize site branding (logo, colors, name)
- [ ] Update metadata in `app/layout.tsx`
- [ ] Create initial categories
- [ ] Write first article
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)
- [ ] Set up email templates in Supabase
- [ ] Enable email confirmations (optional)

---

## 🎨 Customization Checklist

- [ ] `app/layout.tsx` - Site metadata
- [ ] `components/BlogHeader.tsx` - Logo and navigation
- [ ] `components/BlogFooter.tsx` - Footer content
- [ ] `app/globals.css` - Colors and styling
- [ ] `public/` - Favicon and images

---

## 🔐 Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Never commit API keys to Git
- [ ] Use strong admin password
- [ ] Enable email confirmation (production)
- [ ] Set up Row Level Security (already done in schema)
- [ ] Regularly update dependencies

---

## 📊 Monitoring

After deployment, monitor:
- [ ] Vercel deployment logs
- [ ] Supabase database usage
- [ ] Site performance (Vercel Analytics)
- [ ] Error logs in Vercel
- [ ] Database queries in Supabase

---

**Total Time**: ~30 minutes
**Difficulty**: Beginner-friendly
**Cost**: Free (using free tiers)

---

**Pro Tip**: Bookmark this checklist for future deployments! 🔖
