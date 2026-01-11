# 🗺️ Deployment Architecture & Flow

This document explains the architecture and deployment flow for creating a new blog instance.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         YOUR NEW BLOG                            │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   GitHub     │      │    Vercel    │      │   Supabase   │
│  Repository  │─────▶│   Hosting    │─────▶│   Database   │
│              │      │              │      │              │
│ Source Code  │      │ Next.js App  │      │ PostgreSQL   │
│ Version Ctrl │      │ Auto Deploy  │      │ Auth & API   │
└──────────────┘      └──────────────┘      └──────────────┘
       │                     │                      │
       │                     │                      │
       ▼                     ▼                      ▼
   Git Push            Auto Build              Database
   Triggers            & Deploy                Queries
```

---

## 🔄 Deployment Flow

### Step 1: Source Code Setup
```
Current Blog (tracksatscale)
         │
         ├─ Copy files
         ├─ Exclude: node_modules, .next, .git, .env.local
         │
         ▼
New Blog Directory (my-new-blog)
         │
         ├─ Initialize Git
         ├─ Create .env.local
         │
         ▼
Ready for Development
```

### Step 2: Supabase Setup
```
Supabase Dashboard
         │
         ├─ Create New Project
         │  ├─ Choose Region
         │  ├─ Set Database Password
         │  └─ Wait for Provisioning
         │
         ├─ Run SQL Schema
         │  ├─ Open SQL Editor
         │  ├─ Paste supabase-schema.sql
         │  └─ Execute Query
         │
         ├─ Get API Credentials
         │  ├─ Project URL
         │  ├─ Anon Key
         │  └─ Service Role Key
         │
         ▼
Database Ready
```

### Step 3: Local Development
```
Local Machine
         │
         ├─ Create .env.local
         │  ├─ NEXT_PUBLIC_SUPABASE_URL
         │  ├─ NEXT_PUBLIC_SUPABASE_ANON_KEY
         │  └─ SUPABASE_SERVICE_ROLE_KEY
         │
         ├─ Install Dependencies
         │  └─ npm install
         │
         ├─ Run Dev Server
         │  └─ npm run dev
         │
         ├─ Create Admin User
         │  ├─ Sign up at /admin/login
         │  └─ Set role to 'admin' in Supabase
         │
         ▼
Local Testing Complete
```

### Step 4: GitHub Deployment
```
Local Repository
         │
         ├─ git init
         ├─ git add .
         ├─ git commit -m "Initial commit"
         │
         ├─ Create GitHub Repo
         │  └─ github.com/new
         │
         ├─ Add Remote
         │  └─ git remote add origin <url>
         │
         ├─ Push Code
         │  └─ git push -u origin main
         │
         ▼
Code on GitHub
```

### Step 5: Vercel Deployment
```
Vercel Dashboard
         │
         ├─ Import GitHub Repository
         │  └─ Select: my-new-blog
         │
         ├─ Configure Project
         │  ├─ Framework: Next.js
         │  └─ Root Directory: ./
         │
         ├─ Add Environment Variables
         │  ├─ NEXT_PUBLIC_SUPABASE_URL
         │  ├─ NEXT_PUBLIC_SUPABASE_ANON_KEY
         │  ├─ SUPABASE_SERVICE_ROLE_KEY
         │  └─ NEXT_PUBLIC_SITE_URL
         │
         ├─ Deploy
         │  ├─ Build Next.js App
         │  ├─ Run Tests
         │  └─ Deploy to CDN
         │
         ▼
Live on Vercel
```

### Step 6: Production Configuration
```
Supabase Dashboard
         │
         ├─ Authentication Settings
         │  ├─ Site URL: https://your-app.vercel.app
         │  └─ Redirect URLs:
         │     ├─ /admin
         │     ├─ /admin/login
         │     └─ /auth/callback
         │
         ▼
Production Ready
```

---

## 🔐 Environment Variables Flow

### Development (.env.local)
```
┌─────────────────────────────────────┐
│         .env.local (Local)          │
├─────────────────────────────────────┤
│ NEXT_PUBLIC_SUPABASE_URL            │
│ NEXT_PUBLIC_SUPABASE_ANON_KEY       │
│ SUPABASE_SERVICE_ROLE_KEY           │
│ NEXT_PUBLIC_SITE_URL                │
│   → http://localhost:3000           │
└─────────────────────────────────────┘
              │
              ▼
      Local Development
```

### Production (Vercel)
```
┌─────────────────────────────────────┐
│    Vercel Environment Variables     │
├─────────────────────────────────────┤
│ NEXT_PUBLIC_SUPABASE_URL            │
│ NEXT_PUBLIC_SUPABASE_ANON_KEY       │
│ SUPABASE_SERVICE_ROLE_KEY           │
│ NEXT_PUBLIC_SITE_URL                │
│   → https://your-app.vercel.app     │
└─────────────────────────────────────┘
              │
              ▼
      Production Build
```

---

## 🗄️ Database Schema Structure

```
Supabase Database
├─ auth.users (Built-in)
│  └─ User authentication data
│
├─ user_profiles
│  ├─ id (references auth.users)
│  ├─ full_name
│  ├─ avatar_url
│  └─ role (admin/editor)
│
├─ categories
│  ├─ id
│  ├─ name
│  ├─ slug
│  └─ description
│
└─ articles
   ├─ id
   ├─ title
   ├─ slug
   ├─ content
   ├─ excerpt
   ├─ status (draft/published)
   ├─ author_id (references auth.users)
   ├─ category_id (references categories)
   ├─ tags
   ├─ featured_image
   ├─ left_banner
   ├─ right_banner
   ├─ created_at
   ├─ updated_at
   └─ published_at
```

---

## 🔒 Security & Authentication Flow

```
User Access Flow
─────────────────

Public User                Admin User
     │                          │
     ├─ View Homepage           ├─ Login (/admin/login)
     ├─ Read Articles           │  └─ Supabase Auth
     └─ Browse Categories       │
                                ├─ Access Admin Panel
                                │  └─ Check user_profiles.role
                                │
                                ├─ Create Articles
                                ├─ Edit Articles
                                ├─ Delete Articles
                                └─ Manage Categories

Row Level Security (RLS)
────────────────────────

Articles Table:
├─ Public: Can view published articles
├─ Authenticated: Can view own articles
└─ Author: Can CRUD own articles

User Profiles Table:
├─ Public: Can view all profiles
└─ Owner: Can update own profile

Categories Table:
├─ Public: Can view all categories
└─ Admin: Can manage categories
```

---

## 🚀 Continuous Deployment Flow

```
Developer Workflow
──────────────────

Local Changes
     │
     ├─ Edit Code
     ├─ Test Locally (npm run dev)
     ├─ Commit Changes
     │
     ▼
Git Push to GitHub
     │
     ▼
Vercel Auto-Deploy
     │
     ├─ Detect Push
     ├─ Pull Latest Code
     ├─ Install Dependencies
     ├─ Build Next.js App
     ├─ Run Tests
     ├─ Deploy to Production
     │
     ▼
Live Site Updated
     │
     └─ Notification Sent
```

---

## 📊 Data Flow

```
User Request Flow
─────────────────

Browser Request
     │
     ▼
Vercel Edge Network (CDN)
     │
     ├─ Static Pages (Cached)
     │  └─ Return Immediately
     │
     ├─ Dynamic Pages
     │  │
     │  ▼
     │  Next.js Server
     │  │
     │  ├─ Server-Side Rendering
     │  ├─ API Routes
     │  │
     │  ▼
     │  Supabase API
     │  │
     │  ├─ Authentication
     │  ├─ Database Queries
     │  ├─ Row Level Security
     │  │
     │  ▼
     │  PostgreSQL Database
     │  │
     │  └─ Return Data
     │
     ▼
Response to Browser
```

---

## 🌐 Multi-Instance Architecture

```
You can create multiple blog instances:

┌─────────────────────────────────────────────────────────────┐
│                    Source Code (Template)                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ├─────────────┬─────────────┐
                              │             │             │
                              ▼             ▼             ▼
                         Blog #1        Blog #2        Blog #3
                              │             │             │
                    ┌─────────┴───┐  ┌─────┴─────┐  ┌───┴──────┐
                    │             │  │           │  │          │
                    ▼             ▼  ▼           ▼  ▼          ▼
              Supabase #1   Vercel #1  Supabase #2  Vercel #2  ...
              (Database)    (Hosting)   (Database)   (Hosting)

Each instance is completely independent:
✅ Separate database
✅ Separate hosting
✅ Separate domain
✅ Separate content
✅ Separate admin users
```

---

## 🎯 Key Integration Points

### 1. Supabase ↔ Next.js
```javascript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
```

### 2. Vercel ↔ GitHub
```
Automatic deployment on:
├─ Push to main branch
├─ Pull request creation
└─ Manual trigger
```

### 3. Authentication Flow
```
User → Supabase Auth → JWT Token → Next.js Middleware → Protected Routes
```

---

## 📝 Configuration Files

```
Project Root
├─ .env.local              # Environment variables (local)
├─ next.config.ts          # Next.js configuration
├─ supabase-schema.sql     # Database schema
├─ middleware.ts           # Route protection
└─ lib/
   ├─ supabase.ts          # Supabase client
   └─ auth.ts              # Auth helpers
```

---

## 🔄 Update & Maintenance Flow

```
Template Updates
     │
     ├─ Pull latest changes from original repo
     ├─ Review changes
     ├─ Test locally
     │
     ▼
Merge into your blog
     │
     ├─ Resolve conflicts
     ├─ Test thoroughly
     ├─ Commit changes
     │
     ▼
Push to GitHub
     │
     ▼
Auto-deploy to Vercel
```

---

## 🎉 Success Metrics

After successful deployment, you should have:

✅ **GitHub Repository**
   - Source code version controlled
   - Ready for collaboration

✅ **Supabase Database**
   - Tables created
   - RLS policies active
   - Admin user created

✅ **Vercel Deployment**
   - Live site accessible
   - Auto-deploy configured
   - Environment variables set

✅ **Working Blog**
   - Homepage loads
   - Admin panel accessible
   - Can create/publish articles
   - Articles display correctly

---

**This architecture allows you to:**
- 🚀 Deploy unlimited blog instances
- 🔄 Update all instances from template
- 🔒 Keep each instance isolated
- 📊 Scale independently
- 💰 Use free tiers for all services

---

**Last Updated**: January 2026
