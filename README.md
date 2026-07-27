# 🛒 ShopSphere Backend

Backend API for ShopSphere, a full-stack e-commerce application built using Node.js, Express.js, and MongoDB.

This backend provides secure authentication, product management, cart management, wishlist, order processing, image uploads using Cloudinary, and payment integration.

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

![Express](https://img.shields.io/badge/Express-000000?logo=express)

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb)

![JWT](https://img.shields.io/badge/JWT-black)

![Cloudinary](https://img.shields.io/badge/Cloudinary-blue)

![License](https://img.shields.io/badge/license-MIT-green)

## Features

- User Authentication
- JWT Authorization
- Admin Dashboard APIs
- Product CRUD
- Category Filtering
- Search Products
- Pagination
- Sorting
- Cart Management
- Wishlist Management
- Order Management
- Cloudinary Image Upload
- Protected Routes
- Password Hashing using bcrypt
- RESTful API

## Tech Stack

Backend

- Node.js
- Express.js

Database

- MongoDB Atlas
- Mongoose

Authentication

- JWT
- bcryptjs

Cloud Storage

- Cloudinary
- Multer

Others

- dotenv
- cors
- nodemon

# backend/
```text
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── utils/
│
├── uploads/
│
├── server.js
│
└── package.json
```

## Installation

Clone the repository

```bash
git clone https://github.com/yourusername/shopsphere_backend.git
```

Move into project

```bash
cd shopsphere_backend
```

Install dependencies

```bash
npm install
```

Create a .env file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Run Server

```bash
npm run dev
```

## Authentication
```text
POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

PUT /api/auth/update
```
----------------------------

## Products
```text
GET /api/products

GET /api/products/:id

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id
```
----------------------------

## Cart
```text
GET /api/cart

POST /api/cart/add

PUT /api/cart/update

DELETE /api/cart/remove
```
----------------------------

## Wishlist
```text
GET /api/wishlist

POST /api/wishlist/add

DELETE /api/wishlist/remove
```
----------------------------

## Orders
```text
POST /api/orders

GET /api/orders

GET /api/orders/:id
```

# Authentication Flow

```text
User Login
      │
      ▼
Password Verification
      │
      ▼
JWT Token Generated
      │
      ▼
Token Stored on Client
      │
      ▼
Authorization Header
      │
      ▼
Protected Middleware
      │
      ▼
Requested API
```
## Models
```text
- User
- Product
- Cart
- Wishlist
- Order
```

## Security Features
```text 
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Admin Authorization
- Environment Variables
- Input Validation
```
## Frontend Repository

frontend :[Shopsphere_Frontend](https://github.com/HemanthGuttula-1/shopsphere_frontend)

## Seed Sample Products

To quickly populate the database with sample products, run the seed script.

### Step 1: Ensure MongoDB is Connected

Make sure your `.env` file contains a valid MongoDB connection string.

```env
MONGO_URI=your_mongodb_connection_string
```

### Step 2: Run the Seed Script

```bash
node seedProducts.js
```

or, if you have an npm script:

```bash
npm run seed
```

### What the Script Does

The `seedProducts.js` file will:

- Connect to the MongoDB database.
- Remove any existing products (if configured to do so).
- Insert a predefined list of sample products.
- Display a success message in the terminal.
- Close the database connection automatically.

### Expected Output

```bash
Connected to MongoDB
Existing products removed
Sample products inserted successfully
Database connection closed
```

### Notes

- Run the script only when you need to populate the database with sample data.
- If the script deletes existing products before inserting new ones, avoid running it on a production database.
- You can modify the sample product list in `seedProducts.js` to add or update products.