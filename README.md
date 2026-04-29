# 🚗 Vehicle Rental Management System

> **Live API:** [https://vehicle-rental-system-three-alpha.vercel.app/](https://vehicle-rental-system-three-alpha.vercel.app/)

> **API Documentation:** [https://documenter.getpostman.com/view/51503501/2sBXqJLM9H](https://documenter.getpostman.com/view/51503501/2sBXqJLM9H)

A high-performance Backend API built with **Node.js**, **TypeScript**, and **PostgreSQL**...

## 🌟 Key Features

### 🔐 Advanced Security & Auth
- **JWT Bearer Authentication:** Secure API access using `Authorization: Bearer <token>` standard.
- **Role-Based Access Control (RBAC):** Middleware-level protection for `Admin` and `Customer` roles.
- **Password Hashing:** Industry-standard encryption using `bcryptjs`.

### 🚙 Vehicle & Booking Management
- **Smart Availability:** Vehicles are automatically marked as unavailable upon booking and restored upon return.
- **Atomic Transactions:** Uses PostgreSQL transactions to ensure data consistency when updating multiple tables (Bookings & Vehicles) simultaneously.
- **Enriched Data:** Optimized SQL Joins provide detailed booking responses including vehicle specifications and customer details in a single query.

### 🛠 Technical Excellence
- **TypeScript:** Strict typing for better maintainability and error catching.
- **Modular Architecture:** Clean separation of concerns (Routes -> Controllers -> Services -> Database).
- **Environment Safety:** Configuration management for sensitive credentials.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (using `pg` pool)
- **Auth:** JSON Web Token (JWT)
- **Validation:** Zod / Custom Middleware

---

## 📂 Project Structure

```text
src/
├── config/         # Database and Environment configurations
├── controllers/    # Request handling logic
├── interfaces/     # TypeScript definitions
├── middlewares/    # Auth (JWT) and Role guards
├── routes/         # API endpoint definitions
├── services/       # Business logic & SQL Queries
└── app.ts          # Express application setup
```
