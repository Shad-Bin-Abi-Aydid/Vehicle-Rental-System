# 🚗 Vehicle Rental Management System

A RESTful backend API for managing vehicle rentals — built with **Node.js**, **TypeScript**, **Express**, and **PostgreSQL**.

[![Live API](https://img.shields.io/badge/Live%20API-Vercel-black?style=flat-square&logo=vercel)](https://vehicle-rental-system-three-alpha.vercel.app/)
[![API Docs](https://img.shields.io/badge/API%20Docs-Postman-orange?style=flat-square&logo=postman)](https://documenter.getpostman.com/view/51503501/2sBXqJLM9H)

---

## 🌐 Links

| Resource | URL |
|---|---|
| Live API | https://vehicle-rental-system-three-alpha.vercel.app/ |
| API Documentation | https://documenter.getpostman.com/view/51503501/2sBXqJLM9H |

---

## ✨ Features

- **JWT Authentication** — Secure Bearer token login system
- **Role-Based Access Control** — Separate permissions for `admin` and `customer`
- **Vehicle Management** — Full CRUD for vehicle listings
- **Booking System** — Create, view, and update bookings with automatic availability tracking
- **Atomic Transactions** — PostgreSQL transactions keep bookings and vehicle state consistent
- **Password Security** — Hashed passwords with `bcryptjs`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js v5 |
| Database | PostgreSQL (`pg`) |
| Authentication | JSON Web Token (JWT) |
| Password Hashing | bcryptjs |
| Deployment | Vercel |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/signin` | Public | Login and receive JWT token |
| `POST` | `/api/v1/auth/signup` | Public | Register a new user |

### Users
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/users` | Admin | Get all users |
| `PUT` | `/api/v1/users/:id` | Admin, Customer | Update a user |
| `DELETE` | `/api/v1/users/:id` | Admin | Delete a user |

### Vehicles
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/vehicles` | Admin | Add a new vehicle |
| `GET` | `/api/v1/vehicles` | Public | Get all vehicles |
| `GET` | `/api/v1/vehicles/:id` | Public | Get a single vehicle |
| `PUT` | `/api/v1/vehicles/:id` | Admin | Update a vehicle |
| `DELETE` | `/api/v1/vehicles/:id` | Admin | Delete a vehicle |

### Bookings
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/bookings` | Admin, Customer | Create a booking |
| `GET` | `/api/v1/bookings` | Admin, Customer | Get bookings |
| `PUT` | `/api/v1/bookings/:id` | Admin, Customer | Update a booking |

> Protected routes require `Authorization: Bearer <token>` in the request header.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL

### Installation

```bash
git clone https://github.com/Shad-Bin-Abi-Aydid/Vehicle-Rental-System.git
cd Vehicle-Rental-System
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
DB_HOST=your_db_host
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 📂 Project Structure

```
src/
├── config/
│   ├── db.ts           # PostgreSQL connection pool
│   └── index.ts        # Environment config
├── middleware/
│   └── auth.ts         # JWT verification & role guard
├── modules/
│   ├── auth/           # Sign in logic
│   ├── users/          # User CRUD
│   ├── vehicles/       # Vehicle CRUD
│   └── booking/        # Booking logic
├── types/
│   └── index.d.ts      # Custom TypeScript types
└── server.ts           # Entry point
```
