# 🛍️ HunarHub — Digital Marketplace for Local Micro-Entrepreneurs

HunarHub is a full-stack digital marketplace designed to empower local artisans, skilled workers, small business owners, and micro-entrepreneurs by connecting them with customers through a single online platform.

The platform allows entrepreneurs to showcase their products and services, manage orders, receive service requests, and grow their businesses digitally. Customers can discover local talent, purchase products, book services, make payments, and share reviews.

HunarHub aims to promote local businesses, support entrepreneurship, and create new economic opportunities through technology.

---

## 📌 Table of Contents

* [Project Overview]
* [Objectives]
* [Key Features]
* [User Roles]
* [Technology Stack]
* [Project Architecture]
* [Project Structure]
* [Prerequisites]
* [Installation and Setup]
* [Environment Variables]
* [Running the Application]
* [API Modules]
* [Security Features]
* [Troubleshooting]
* [Future Enhancements]
* [Contributing]
* [License]

---

## 🚀 Project Overview

Many local entrepreneurs and skilled workers struggle to reach customers because they lack an online presence, digital marketing resources, and access to organized e-commerce platforms.

HunarHub addresses this problem by providing a centralized digital marketplace where entrepreneurs can create profiles, showcase their skills, list products, offer services, and interact with customers.

Customers can discover local businesses, compare available offerings, purchase products, book services, and provide feedback.

### Problem Statement

Traditional local businesses often depend on word-of-mouth marketing and physical stores. This limits their customer reach and makes it difficult to compete in the digital economy.

### Proposed Solution

HunarHub provides an accessible online platform that connects local entrepreneurs with potential customers through digital storefronts, product listings, service bookings, online payments, and customer reviews.

### Vision

To empower local entrepreneurs by making digital commerce accessible, affordable, and convenient.

---

## 🎯 Objectives

* Provide local entrepreneurs with an online presence.
* Connect customers with trusted local businesses and skilled professionals.
* Enable product discovery, purchasing, and order management.
* Support service booking and request tracking.
* Facilitate secure online payment workflows.
* Improve customer engagement through reviews and notifications.
* Help entrepreneurs manage their businesses efficiently.
* Promote digital entrepreneurship and local economic development.

---

## ✨ Key Features

### 👤 Authentication and User Management

* User registration and login.
* JWT-based authentication.
* Secure password hashing.
* Role-based authorization.
* Protected routes and API endpoints.
* Access-token and refresh-token management.
* User profile management.

### 🛒 Product Marketplace

* Browse available products.
* Search and filter product listings.
* View product details, prices, and images.
* Manage product listings.
* Add products to the shopping cart.
* Place and manage orders.
* Track order status and purchase history.

### 🧑‍🔧 Service Marketplace

* Discover services offered by local professionals.
* View service descriptions, pricing, and availability.
* Submit service requests.
* Track service-request status.
* Accept or reject incoming requests as an entrepreneur.
* Manage scheduled services.
* Prevent conflicting bookings where supported.

### 🏪 Entrepreneur Dashboard

Entrepreneurs can use their dashboard to:

* Create and update business profiles.
* Showcase their skills and experience.
* Upload business and product images.
* Add, update, and remove products.
* Create and manage service listings.
* Manage incoming orders and service requests.
* Track order and request statuses.
* Monitor business activity and earnings where supported.

### 💳 Payment Integration

* Razorpay payment integration.
* Payment-order creation.
* Payment verification workflows.
* Support for testing payments with Razorpay test credentials.

**Important:** Configure Razorpay credentials and validate payment results on the backend before using payments in a production environment.

### ⭐ Reviews and Ratings

* Customers can submit feedback.
* Reviews help customers evaluate products and services.
* Entrepreneurs can use feedback to improve their offerings.

### 🔔 Notifications

* Notifications for relevant orders and service requests.
* Updates on request status.
* Notifications related to account verification and marketplace activities.

### 🛡️ Admin Dashboard

Administrative functionality includes supported features for:

* Managing users and entrepreneurs.
* Verifying entrepreneur accounts.
* Managing marketplace categories.
* Monitoring orders and service requests.
* Reviewing complaints.
* Accessing marketplace statistics and reports.

### 🖼️ Image Management

* Cloudinary integration for image uploads.
* Support for entrepreneur profiles and product or service images.
* Cloud-based image storage.

### 📱 Responsive User Interface

* Responsive layouts for desktop, tablet, and mobile.
* Modern interface built with React and Tailwind CSS.
* Reusable UI components.
* Interactive forms and navigation.
* Clear loading, error, and empty states where implemented.

---

## 👥 User Roles

### 1. Customer

Customers can:

* Register and log in.
* Browse products and services.
* Search for entrepreneurs.
* Add products to their cart.
* Place orders.
* Request services.
* Track order and service-request statuses.
* Submit reviews and complaints.
* View notifications and account details.

### 2. Entrepreneur

Entrepreneurs can:

* Register and create business profiles.
* Showcase products and services.
* Manage prices and product inventory.
* Upload images.
* Accept or reject service requests.
* Manage orders.
* Update request and order statuses.
* View relevant business information and notifications.

### 3. Administrator

Administrators can:

* Manage users.
* Review entrepreneur verification requests.
* Manage product and service categories.
* Monitor platform activities.
* Handle complaints and disputes.
* View marketplace analytics.

The availability of individual operations depends on the corresponding implementation and user permissions.

---

## 🧰 Technology Stack

### Frontend

* **React.js** — Component-based user interface.
* **JavaScript** — Application logic.
* **Vite** — Frontend development server and build tool.
* **Tailwind CSS** — Utility-first styling.
* **React Router** — Client-side routing.
* **Lucide React** — Icons.
* **Framer Motion** — Animations where used.

### Backend

* **Node.js** — JavaScript runtime.
* **Express.js** — REST API framework.
* **Mongoose** — MongoDB object modeling.
* **Zod** — Input validation.
* **JWT** — Authentication tokens.
* **bcryptjs** — Password hashing.

### Database

* **MongoDB** — Storage for users, products, services, orders, and related marketplace data.

### Third-Party Services

* **Cloudinary** — Image storage and management.
* **Razorpay** — Payment processing integration.

### Security and Middleware

* Helmet
* CORS
* Express Rate Limit
* Morgan
* HTTP-only cookies

---

## 🏗️ Project Architecture

HunarHub follows a frontend-backend architecture.

```text
                 ┌──────────────────────────┐
                 │        User Browser       │
                 └────────────┬─────────────┘
                              │
                              ▼
                 ┌──────────────────────────┐
                 │      React Frontend      │
                 │   React + Tailwind CSS   │
                 └────────────┬─────────────┘
                              │
                       REST API Requests
                              │
                              ▼
                 ┌──────────────────────────┐
                 │    Express.js Backend    │
                 │ Authentication & Routes  │
                 │ Controllers & Services   │
                 └────────────┬─────────────┘
                              │
                 ┌────────────┼─────────────┐
                 │            │             │
                 ▼            ▼             ▼
          ┌────────────┐ ┌────────────┐ ┌────────────┐
          │  MongoDB   │ │ Cloudinary │ │  Razorpay  │
          │  Database  │ │   Images   │ │  Payments  │
          └────────────┘ └────────────┘ └────────────┘
```

### Request Flow

1. A user interacts with the React frontend.
2. The frontend sends an HTTP request to the backend API.
3. Express middleware handles authentication, validation, and other request checks.
4. Controllers execute the relevant business logic.
5. Mongoose interacts with MongoDB when database operations are required.
6. External services handle supported image-upload or payment operations.
7. The backend returns an HTTP response to the frontend.
8. The frontend updates the interface based on the response.

---

## 📂 Project Structure

The project is organized into separate frontend and backend applications.

```text
hunarhub-integrated/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeds/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── PRD.md
├── REQUIREMENT-COMPLETION.md
├── FIXES-APPLIED.md
├── README.md
└── package.json
```

### Backend Directory

| Directory/File | Purpose                                                 |
| -------------- | ------------------------------------------------------- |
| `config/`      | Database and application configuration                  |
| `controllers/` | Request-handling logic                                  |
| `middleware/`  | Authentication, validation, uploads, and error handling |
| `models/`      | MongoDB schemas and models                              |
| `routes/`      | API route definitions                                   |
| `seeds/`       | Development data-seeding scripts                        |
| `services/`    | Business logic and external service integrations        |
| `utils/`       | Shared helper functions                                 |
| `validators/`  | Request validation schemas                              |
| `app.js`       | Express application configuration                       |
| `server.js`    | Backend server startup                                  |

---

## 📋 Prerequisites

Before installing HunarHub, ensure the following software and accounts are available.

| Requirement                    | Purpose                               |
| ------------------------------ | ------------------------------------- |
| Node.js 20 or later            | Runs frontend tooling and the backend |
| npm                            | Installs project dependencies         |
| MongoDB Atlas or local MongoDB | Database                              |
| Cloudinary account             | Image management                      |
| Razorpay account               | Payment integration                   |
| Git                            | Version control, optional             |

Check your installed versions:

```bash
node --version
npm --version
git --version
```

---

## ⚙️ Installation and Setup

### Step 1: Download the Project

Extract the project ZIP file.

Open a terminal and navigate to the extracted project directory:

```bash
cd hunarhub-integrated
```

### Step 2: Install Backend Dependencies

Navigate to the backend directory:

```bash
cd backend
npm install
```

### Step 3: Configure Backend Environment Variables

Create a `.env` file using the provided example.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**

```bash
cp .env.example .env
```

Open `backend/.env` and configure the required values.

Example:

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_strong_access_secret
JWT_REFRESH_SECRET=your_strong_refresh_secret

ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Use the actual variable names from `backend/.env.example` if they differ from this example.

### Step 4: Start the Backend

From the `backend` directory, run:

```bash
npm run dev
```

The backend should start on the configured port, typically:

```text
http://localhost:5000
```

Keep this terminal running.

### Step 5: Install Frontend Dependencies

Open a new terminal and navigate to the frontend directory:

```bash
cd hunarhub-integrated/frontend
npm install
```

### Step 6: Configure the Frontend

Create a frontend `.env` file.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**

```bash
cp .env.example .env
```

Configure the backend API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

Use the variable name expected by the frontend source code if it differs.

### Step 7: Start the Frontend

Run:

```bash
npm run dev
```

Vite will display the local development URL. The default is typically:

```text
http://localhost:5173
```

Open that address in your browser.

---

## 🔐 Environment Variables

### Backend Variables

| Variable                   | Description                  |
| -------------------------- | ---------------------------- |
| `NODE_ENV`                 | Application environment      |
| `PORT`                     | Backend server port          |
| `CLIENT_URL`               | Allowed frontend origin      |
| `MONGODB_URI`              | MongoDB connection string    |
| `JWT_ACCESS_SECRET`        | Access-token signing secret  |
| `JWT_REFRESH_SECRET`       | Refresh-token signing secret |
| `ACCESS_TOKEN_EXPIRES_IN`  | Access-token expiration      |
| `REFRESH_TOKEN_EXPIRES_IN` | Refresh-token expiration     |
| `RAZORPAY_KEY_ID`          | Razorpay key ID              |
| `RAZORPAY_KEY_SECRET`      | Razorpay secret key          |
| `CLOUDINARY_CLOUD_NAME`    | Cloudinary cloud name        |
| `CLOUDINARY_API_KEY`       | Cloudinary API key           |
| `CLOUDINARY_API_SECRET`    | Cloudinary API secret        |

### Frontend Variables

| Variable       | Description                 |
| -------------- | --------------------------- |
| `VITE_API_URL` | Base URL of the backend API |

**Security warning:** Never commit `.env` files or expose private API credentials in frontend code. Keep secrets on the backend and use separate development and production credentials.

---

## ▶️ Running the Application

The project has separate frontend and backend development servers.

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

### Common Commands

| Location | Command            | Purpose                                           |
| -------- | ------------------ | ------------------------------------------------- |
| Root     | `npm run frontend` | Start frontend, if configured in the root scripts |
| Root     | `npm run backend`  | Start backend, if configured in the root scripts  |
| Root     | `npm run build`    | Build frontend, if configured in the root scripts |
| Backend  | `npm run dev`      | Start backend in development mode                 |
| Backend  | `npm start`        | Start backend normally                            |
| Backend  | `npm run seed`     | Run the configured seed script                    |
| Frontend | `npm run dev`      | Start Vite                                        |
| Frontend | `npm run build`    | Create a production build                         |
| Frontend | `npm run preview`  | Preview the production build                      |

Run commands from the appropriate directory. Available scripts are defined in each directory's `package.json`.

---

## 🔌 API Modules

The backend organizes API functionality into modules.

| Module           | Responsibility                                    |
| ---------------- | ------------------------------------------------- |
| Authentication   | Registration, login, logout, and token management |
| Entrepreneurs    | Business profiles and entrepreneur management     |
| Products         | Product listings and product management           |
| Services         | Service listings and availability                 |
| Service Requests | Service bookings and request-status management    |
| Orders           | Product orders and order tracking                 |
| Reviews          | Customer feedback                                 |
| Complaints       | Complaint submission and administration           |
| Notifications    | User notifications                                |
| Administration   | Administrative management and reporting           |
| Uploads          | Image-upload operations                           |

The actual API endpoints, HTTP methods, request payloads, and response structures are defined in the backend route files.

Refer to `backend/src/app.js` and the relevant files in `backend/src/routes/` for the exact API paths.

---

## 🛡️ Security Features

HunarHub incorporates several security mechanisms.

### Authentication

JWT-based authentication helps identify authenticated users and control access to protected resources.

### Password Security

Passwords are hashed using bcryptjs rather than being stored as plain text.

### Authorization

Role-based access controls restrict protected operations to authorized users.

### Request Validation

Zod schemas can validate incoming data before it reaches business logic.

### Security Middleware

Helmet, CORS configuration, and rate limiting help improve API security.

### HTTP-Only Cookies

HTTP-only cookies can be used for refresh-token management to reduce direct JavaScript access to those cookies.

### Production Recommendations

* Use HTTPS in production.
* Generate strong, unique authentication secrets.
* Configure CORS for trusted frontend origins only.
* Validate payment results on the server.
* Apply authorization checks to sensitive database operations.
* Protect uploaded files and enforce file-type and size limits.
* Keep dependencies updated.
* Avoid exposing internal stack traces to users.
* Back up production database data regularly.

---

## 🐛 Troubleshooting

### 1. MongoDB Connection Error

**Possible causes:**

* Invalid MongoDB connection string.
* Incorrect database credentials.
* IP address not allowed in MongoDB Atlas.
* Database server unavailable.

**Solutions:**

* Verify `MONGODB_URI`.
* Confirm that the database user has appropriate permissions.
* Add your development IP address to MongoDB Atlas Network Access.
* Ensure special characters in passwords are URL-encoded.

### 2. CORS Error

**Possible causes:**

* Incorrect frontend origin.
* Backend CORS configuration does not match the frontend URL.
* Frontend is calling the wrong API address.

**Solutions:**

* Configure `CLIENT_URL` with the exact frontend origin.
* Check `VITE_API_URL`.
* Restart the backend after modifying environment variables.

Example:

```env
CLIENT_URL=http://localhost:5173
```

### 3. 401 Unauthorized

**Possible causes:**

* Missing or expired authentication token.
* Invalid login session.
* Refresh-cookie or authentication configuration mismatch.

**Solutions:**

* Log in again.
* Check browser cookies and the Network panel.
* Verify frontend and backend API configuration.
* Inspect backend logs for authentication errors.

### 4. 429 Too Many Requests

This response indicates that a rate limit has been reached.

**Solutions:**

* Wait for the rate-limit window to reset.
* Avoid sending repeated requests unnecessarily.
* Check whether the frontend is triggering requests repeatedly.
* Review the backend rate-limit configuration.

Do not disable rate limiting entirely in production simply to remove this error.

### 5. Image Upload Failure

**Possible causes:**

* Incorrect Cloudinary credentials.
* Missing multipart form data.
* Invalid file type or file size.
* Upload configuration mismatch.

**Solutions:**

* Verify Cloudinary environment variables.
* Inspect the upload request in the browser Network panel.
* Check the backend logs.
* Confirm that the selected file meets upload restrictions.

### 6. Payment Failure

**Possible causes:**

* Invalid Razorpay credentials.
* Incorrect payment-order configuration.
* Failed payment verification.
* Invalid request payload.

**Solutions:**

* Use Razorpay test credentials during development.
* Review the backend payment integration.
* Check payment responses and server logs.
* Verify payments on the backend rather than trusting frontend success messages.

### 7. Frontend Build Errors

**Solutions:**

```bash
cd frontend
npm install
npm run build
```

If the build fails, review the first reported error and resolve it before addressing subsequent errors.

---

## 🚀 Future Enhancements

Potential improvements for future versions include:

* Advanced search and recommendation systems.
* Location-based entrepreneur discovery.
* Multilingual user interfaces.
* In-app chat between customers and entrepreneurs.
* Improved entrepreneur verification workflows.
* Advanced sales and earnings analytics.
* Email and SMS notifications.
* Discount codes and promotional campaigns.
* Wishlist functionality.
* Invoice generation and downloadable receipts.
* Progressive Web App support.
* Automated testing and continuous integration.
* Enhanced accessibility and performance optimization.

These are potential future improvements and should not be interpreted as features that are already implemented.

---


## 👨‍💻 Project Summary

**HunarHub — Digital Marketplace for Local Micro-Entrepreneurs**

HunarHub uses modern web technologies to connect local entrepreneurs with customers through a digital marketplace for products and services. By supporting business profiles, service requests, product orders, reviews, and payment integration, the platform aims to make local commerce more accessible and efficient.

**Built with:** React, Tailwind CSS, Node.js, Express.js, MongoDB, JWT, Cloudinary, and Razorpay.
