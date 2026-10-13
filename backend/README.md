# HunarHub Backend

Production-oriented REST API foundation for **HunarHub – Digital Marketplace for Local Micro-Entrepreneurs**.

## Stack

- Node.js 20+
- Express 5
- MongoDB Atlas + Mongoose
- JWT access + refresh token authentication
- HTTP-only refresh cookie
- bcrypt password hashing
- Zod request validation
- Cloudinary image uploads
- Razorpay payment order + signature verification
- Helmet, CORS, rate limiting
- Role-based access control

## Folder structure

```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── seeds/
├── utils/
├── validators/
├── app.js
└── server.js
```

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and configure MongoDB Atlas plus JWT secrets.

```bash
npm run dev
```

API:

```text
http://localhost:5000
```

Health:

```text
GET /api/health
```

## Seed demo data

```bash
npm run seed
```

Demo accounts:

```text
Customer:
customer@hunarhub.local
Password123!

Entrepreneur:
entrepreneur@hunarhub.local
Password123!

Admin:
admin@hunarhub.local
Password123!
```

## API overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/me
```

### Entrepreneurs

```text
GET   /api/entrepreneurs
GET   /api/entrepreneurs/:id
POST  /api/entrepreneurs
PATCH /api/entrepreneurs/me
```

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
```

### Services

```text
GET    /api/services
GET    /api/services/:id
POST   /api/services
PATCH  /api/services/:id
DELETE /api/services/:id
```

### Orders + Razorpay

```text
POST /api/orders
POST /api/orders/verify-payment
GET  /api/orders/my
GET  /api/orders/:id
```

### Service requests

```text
POST  /api/service-requests
GET   /api/service-requests/my
GET   /api/service-requests/entrepreneur
PATCH /api/service-requests/:id/status
```

### Reviews

```text
GET  /api/reviews
POST /api/reviews
```

### Uploads

```text
POST /api/uploads/images
```

Use `multipart/form-data` with the `images` field.

### Admin

```text
GET   /api/admin/dashboard
PATCH /api/admin/entrepreneurs/:id/verify
PATCH /api/admin/orders/:id/status
```

## Authentication architecture

HunarHub uses **JWT only** for application authentication.

- Access token: short-lived JWT returned to the frontend.
- Refresh token: longer-lived JWT stored in an HTTP-only cookie.
- Refresh token hash is stored in MongoDB.
- Logout removes the server-side refresh token hash.
- RBAC roles: `customer`, `entrepreneur`, `admin`.

Do not combine this with Better Auth unless the authentication architecture is deliberately redesigned.

## Frontend integration

Set:

```text
CLIENT_URL=http://localhost:5173
```

Frontend requests should use:

```js
fetch("http://localhost:5000/api/...", {
  credentials: "include"
})
```

Send the access token as:

```text
Authorization: Bearer <accessToken>
```

## Important production work before deployment

- Use strong randomly generated JWT secrets.
- Configure HTTPS.
- Configure production CORS origins.
- Add email verification and password reset provider.
- Add request ownership checks for every future endpoint.
- Add pagination limits and query sanitization.
- Add Razorpay webhook handling for production payment reconciliation.
- Add audit logs for admin actions.
- Add automated tests.
- Configure Cloudinary/ImageKit credentials.
- Add monitoring and structured logging.
