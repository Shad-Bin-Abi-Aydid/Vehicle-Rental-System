# 🚗 Vehicle Rental Management System

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-v5-000000?style=for-the-badge&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Auth-FB015B?style=for-the-badge&logo=jsonwebtokens)

> A high-performance backend REST API for managing vehicle rental bookings — featuring smart availability automation, role-based access control, and PostgreSQL transaction safety.

**🌐 Live API:** [https://vehicle-rental-system-three-alpha.vercel.app](https://vehicle-rental-system-three-alpha.vercel.app)
[![Postman Docs](https://img.shields.io/badge/Postman-API_Docs-FF6C37?style=for-the-badge&logo=postman)](https://documenter.getpostman.com/view/51503501/2sBXqJLM9H)

> ⚠️ This is a backend-only project. There is no frontend — all interactions are via REST API using tools like Postman.

---

## ✨ Features

- 🔐 JWT Bearer token authentication
- 👥 Role-based access control — `admin` and `customer` roles
- 🚘 Vehicle management with automatic availability updates
- 📅 Booking system with PostgreSQL transactions for data integrity
- 🔒 Password hashing with bcryptjs
- 📦 Modular architecture — routes → controllers → services → database

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js v18+ | JavaScript runtime |
| Express.js v5 | REST API framework |
| TypeScript | Type safety across the codebase |
| PostgreSQL | Relational database |
| JSON Web Tokens | Stateless authentication |
| bcryptjs | Password hashing |
| Zod | Request validation |
| Vercel | API deployment |

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Register a new user |
| POST | `/api/auth/signin` | Public | Login and receive JWT token |

### Users
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users` | Admin | Get all users |
| GET | `/api/users/:id` | Admin | Get single user |
| PATCH | `/api/users/:id` | Admin | Update user |
| DELETE | `/api/users/:id` | Admin | Delete user |

### Vehicles
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/vehicles` | Public | Get all available vehicles |
| GET | `/api/vehicles/:id` | Public | Get single vehicle |
| POST | `/api/vehicles` | Admin | Add new vehicle |
| PATCH | `/api/vehicles/:id` | Admin | Update vehicle |
| DELETE | `/api/vehicles/:id` | Admin | Delete vehicle |

### Bookings
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/bookings` | Customer | Create a booking |
| GET | `/api/bookings` | Admin | Get all bookings |
| GET | `/api/bookings/my` | Customer | Get my bookings |
| PATCH | `/api/bookings/:id/return` | Admin | Mark vehicle as returned |

> 📖 Full interactive documentation with request bodies and example responses available on [Postman](https://documenter.getpostman.com/view/51503501/2sBXqJLM9H)

---

## 🔐 Authentication Flow

```
Register → Login → Receive JWT Token → Add to Authorization Header → Access Protected Routes
```

All protected routes require:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🏗️ Project Structure

```
src/
├── config/
│   ├── db.ts           # PostgreSQL connection pool
│   └── index.ts        # Environment config
├── middleware/
│   └── auth.ts         # JWT verification & role guard
├── modules/
│   ├── auth/           # Sign in / sign up logic
│   ├── users/          # User CRUD
│   ├── vehicles/       # Vehicle CRUD + availability
│   └── booking/        # Booking logic with transactions
├── types/
│   └── index.d.ts      # Custom TypeScript types
└── server.ts           # Entry point
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- PostgreSQL database

### 1. Clone the repository
```bash
git clone https://github.com/Shad-Bin-Abi-Aydid/Vehicle-Rental-System.git
cd Vehicle-Rental-System
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root:
```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_random_secret_key
PORT=5000
```

### 4. Run the development server
```bash
npm run dev
```

API runs at **http://localhost:5000**

---

## 👨‍💻 Author

**Shad Bin Abi Aydid**
- Portfolio: [shadaydid.com](https://shadaydid.com)
- GitHub: [@Shad-Bin-Abi-Aydid](https://github.com/Shad-Bin-Abi-Aydid)
- LinkedIn: [shad-aydid](https://www.linkedin.com/in/shad-aydid)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
