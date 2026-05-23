# Gadget Server

Backend API for a modern e-commerce platform built with Node.js, Express.js, TypeScript, and MongoDB.

This project focuses on scalable backend architecture, authentication, product management, category management, image uploads, validation, and production-ready API structuring.

---

# Features

- User Authentication
- JWT Authorization
- Role-Based Authorization (Admin/User)
- Password Hashing with bcrypt
- Product Management
- Category Management
- Image Uploads
- Cloudinary Integration
- Request Validation with Joi
- Error Handling Middleware
- Environment-based Configuration
- TypeScript Support
- Modular Folder Structure
- RESTful API Design

---

# Tech Stack

| Technology | Purpose              |
| ---------- | -------------------- |
| Node.js    | Runtime              |
| Express.js | Backend Framework    |
| TypeScript | Type Safety          |
| MongoDB    | Database             |
| Mongoose   | ODM                  |
| JWT        | Authentication       |
| bcrypt     | Password Hashing     |
| Cloudinary | Image Hosting        |
| Multer     | File Upload Handling |
| Joi        | Validation           |

---

# Project Structure

```bash
src/
│
├── config/                # App & environment configuration
├── modules/
│   ├── auth/              # Authentication module
│   ├── product/           # Product module
│   └── category/          # Category module
│
├── shared/
│   ├── middlewares/       # Global middlewares
│   ├── utils/             # Helper utilities
│   └── types/             # Shared TypeScript types
│
└── server.ts              # Application entry point
```

---

# Architecture Pattern

This project follows a layered architecture pattern:

```bash
Route -> Controller -> Service -> Repository -> Database
```

### Responsibilities

| Layer        | Responsibility              |
| ------------ | --------------------------- |
| Routes       | Define API endpoints        |
| Controllers  | Handle request/response     |
| Services     | Business logic              |
| Repositories | Database operations         |
| Models       | Database schema definitions |

This structure improves:

- Scalability
- Maintainability
- Code reusability
- Separation of concerns

---

# Installation

Clone the repository:

```bash
git clone https://github.com/inuEnike/gadget_server.git
```

Move into the project directory:

```bash
cd gadget_server
```

Install dependencies:

```bash
bun install
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
PORT=
DB_URI=
NODE_ENV=
CLOUD_API_KEY=
CLOUD_API_SECRET=
CLOUD_NAME=
NODEMAILER_HOST=
NODEMAILER_PORT=
NODEMAILER_USER=
NODEMAILER_PASS=
```

---

# Running The Project

Development:

```bash
bun run dev
```

Production:

```bash
bun run build
bun start
```

---

# API Endpoints

# Authentication

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| POST   | `/auth/register` | Register user               |
| POST   | `/auth/verify`   | Verify authentication token |
| POST   | `/auth/login`    | Login user                  |
| GET    | `/auth/me`       | Get authenticated user      |
| POST   | `/auth/logout`   | Logout user                 |

---

# Products

| Method | Endpoint       | Access |
| ------ | -------------- | ------ |
| GET    | `/product`     | Public |
| GET    | `/product/:id` | Public |
| POST   | `/product`     | Admin  |
| PATCH  | `/product/:id` | Admin  |
| DELETE | `/product/:id` | Admin  |

---

# Categories

| Method | Endpoint        | Access |
| ------ | --------------- | ------ |
| GET    | `/category`     | Public |
| GET    | `/category/:id` | Public |
| POST   | `/category`     | Admin  |
| PATCH  | `/category/:id` | Admin  |
| DELETE | `/category/:id` | Admin  |

---

# Authentication & Authorization

This project uses JWT-based authentication.

Protected routes use:

- `authMiddleware`
- `adminMiddleware`

Example:

```ts
productRouter.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.array("ProductImages"),
  controller.create,
);
```

### Flow

1. User logs in
2. JWT token is generated
3. Client sends token in headers
4. Middleware verifies token
5. Admin middleware checks permissions

---

# File Uploads

Product image uploads are handled using:

- Multer
- Cloudinary

Example:

```ts
upload.array("ProductImages");
```

Images are uploaded to Cloudinary instead of local storage for better scalability and deployment compatibility.

---

# Validation

This project uses Joi for request validation.

Example:

```ts
const schema = Joi.object({
  ProductName: Joi.string().required(),
  ProductPrice: Joi.number().required(),
});
```

Validation is separated from controllers to maintain cleaner architecture.

---

# Error Handling

Centralized error handling middleware ensures consistent API responses.

Example response:

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

# Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `bun run dev`   | Start development server |
| `bun run build` | Build TypeScript         |
| `bun start`     | Start production server  |

---

# Future Improvements

- Pagination
- Email Verification
- OTP Authentication
- Order Management
- Payment Integration
- Rate Limiting
- API Documentation with Swagger
- Unit Testing
- Docker Support

---

# Production Notes

For production-ready backend systems:

- Never expose secrets
- Use HTTPS
- Validate all incoming data
- Sanitize uploads
- Use rate limiting
- Hash passwords properly
- Implement logging
- Use proper HTTP status codes

---

# Author

Built by Imperium

Portfolio: https://imperiumtech.netlify.app

GitHub: https://github.com/inuEnike
