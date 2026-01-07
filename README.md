# SSR E-Commerce Product Management Dashboard

A **Server-Side Rendered (SSR) Admin Dashboard** built with **Next.js App Router**, designed for managing e-commerce products securely. The application supports admin-only authentication, protected routes, and full product management with a clean and scalable architecture.

---

## 🚀 Live Demo

👉 **Live URL:** https://ssr-e-commerce-product-management-d.vercel.app/

---

## 📽️ Demo Video

👉 **Demo Video Link:** https://drive.google.com/drive/folders/1PLCvUbD_5bOOnG-h21I865x5rqeayY-_?usp=sharing

---

## 🔐 Dummy Admin Credentials

Use the following credentials to access the dashboard:

```
Email: admin@example.com
Password: admin@strongpass
```

> ⚠️ These are **dummy credentials** created only for evaluation purposes.

---

## ✨ Features

* Server-Side Rendering using **Next.js App Router**
* Admin-only authentication (email & password)
* Protected routes using middleware
* Product management (Create / Read / Update / Delete)
* Multi-step product form with **Zod validation**
* Charts and analytics using **Chart.js**
* Image upload via **Cloudinary** (unsigned preset)
* User-specific data isolation (each admin sees only their own products)

---

## 🧑‍💻 Tech Stack

* **Next.js 14** (App Router, SSR)
* **React**
* **Prisma ORM**
* **PostgreSQL / MySQL** (via Prisma)
* **Tailwind CSS**
* **React Query**
* **Zod**
* **Chart.js**
* **Cloudinary**

---

## 📂 Project Structure (Simplified)

```
src/
 ├─ app/
 │   ├─ login/
 │   ├─ dashboard/
 │   ├─ products/
 │   └─ api/
 ├─ components/
 ├─ lib/
 └─ middleware.ts
prisma/
.env.example
```

---

## ⚙️ Setup Instructions (Local)

### 1️⃣ Clone the Repository

```bash
git clone <repo-url>
cd SSR-E-Commerce-Product-Management-Dashboard
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file using `.env.example`:

```bash
cp .env.example .env
```

Set required values such as:

* `DATABASE_URL`
* `JWT_SECRET`
* `CLOUDINARY_*`
* `ADMIN_*`

---

### 4️⃣ Run Database Migrations

```bash
npx prisma migrate dev
```

---

### 5️⃣ Seed Admin User

```bash
npm run db:seed
```

This creates a default admin user:

* Email: `admin@example.com`
* Password: `admin@strongpass`
* Name: `Admin User`

---

### 6️⃣ Start Development Server

```bash
npm run dev
```

Open: **[http://localhost:3000](http://localhost:3000)**

---

## 🔁 User Flow

1. **Landing Page (`/`)** – Introduction & Login access
2. **Login Page (`/login`)** – Admin authentication
3. **Dashboard (`/dashboard`)** – Protected SSR dashboard
4. **Products (`/products`)** – Product management (CRUD)

---

## 🔐 Authentication & Security

* No public signup (admin-only access)
* Session-based authentication using HTTP-only cookies
* Middleware-protected routes
* Each admin can access only their own data

---

## ☁️ Cloudinary Notes

* Create an **unsigned upload preset** in Cloudinary
* Image URLs can also be pasted manually if Cloudinary is not used

---

## 📊 Sales Trend & Product Description Notes

### 📊 Sales Trend (Demonstration Only)
The **Sales Trend** displayed in the dashboard is **not an accurate real-world sales metric**.  
It is calculated using a **sample formula purely for demonstration purposes** to showcase data aggregation, processing, and visualization capabilities.

This implementation is intended to indicate that **accurate sales trends can be calculated** when real business data such as order history, transactions, or time-based sales records are available.  
The current logic serves as an example to demonstrate how analytics can be extended in a production-ready system.

---

### 📝 Product Description (Stored for Future Use)
The **Product Description** field is currently **stored in the database but not displayed in the UI**.  
It is included to demonstrate system extensibility and future-ready data modeling.

This field can be used in future enhancements such as:
- Displaying detailed product information
- Implementing search and filtering
- Creating customer-facing product pages
- Improving SEO and content presentation

This approach shows that the application can be extended **without requiring schema or architectural changes**.

---

## 📌 Submission Checklist

* ✅ Public GitHub repository
* ✅ README with setup & credentials
* ✅ Live deployed link
* ✅ Demo video (3–5 minutes)

---

## 📜 License

This project is created for **educational and evaluation purposes** only.
