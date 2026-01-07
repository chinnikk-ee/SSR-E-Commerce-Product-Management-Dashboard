# SSR E-commerce Admin Dashboard (Next.js + Prisma + React Query)

## Features
- SSR pages (App Router)
- Admin-only authentication (email/password)
- Protected routes with middleware
- Product CRUD (API routes + UI)
- Multi-step Create/Edit form (Zod validation)
- Charts (Chart.js)
- Cloudinary image upload (unsigned preset)
- User-specific data isolation (each admin sees only their own products)

## Setup
1) Install deps:
```bash
npm install
```

2) Create `.env` from `.env.example` and set values (including `DATABASE_URL`).

3) Create DB + run migration:
```bash
npx prisma migrate dev
```

4) Seed the database with an admin user:
```bash
npm run db:seed
```

This creates a default admin user:
- Email: `admin@example.com` (or set `ADMIN_EMAIL` in `.env`)
- Password: `admin123` (or set `ADMIN_PASSWORD` in `.env`)
- Name: `Admin User` (or set `ADMIN_NAME` in `.env`)

**⚠️ IMPORTANT: Change the default password after first login!**

5) Run:
```bash
npm run dev
```

Open: http://localhost:3000

## User Flow
1. **Landing Page** (`/`) - Introduces the app and provides a Login button
2. **Login Page** (`/login`) - Authenticate with email and password
3. **Dashboard** (`/dashboard`) - Protected route, shows user-specific product statistics
4. **Products** (`/products`) - Manage products (only your own products are visible)

## Authentication
- No public signup - all admin accounts must be created via seed scripts or database
- Session-based authentication using HTTP-only cookies
- Protected routes automatically redirect to login if not authenticated
- Each user can only access their own products and data

## Notes
- Create an **unsigned upload preset** in Cloudinary.
- If you don't want Cloudinary, you can paste an image URL directly in the form.
- To create additional admin users, use the seed script or create them directly in the database with hashed passwords.
