# Full-Commerce

Full-Commerce is a full-stack e-commerce application built with React, TypeScript, Express, and MongoDB. It provides a complete shopping flow, including user authentication, product browsing, cart management, checkout, and order history.

## Features

- User registration and login
- JWT-based authentication
- Protected customer routes
- Product listing
- Add, update, and remove cart items
- Clear the active cart
- Checkout and order creation
- View previous orders
- Responsive UI built with React and Material UI

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Material UI
- Axios
- React Context API

### Backend

- Node.js
- Express 5
- TypeScript
- MongoDB and Mongoose
- JWT authentication
- bcrypt password hashing
- CORS
- dotenv

## Project Structure

```text
Full-commerce/
├── Backend/
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Business and request logic
│   │   ├── middleware/   # Authentication middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API route definitions
│   │   └── index.ts      # Server entry point
│   ├── .env.example
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── Components/   # Reusable UI components
│   │   ├── Context/      # Authentication and cart providers
│   │   ├── Pages/        # Application pages
│   │   ├── constants/    # Shared constants
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx       # Routes and application layout
│   └── package.json
└── note.md               # Development notes
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB database (local or MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Ma7moud-Sa3d/Full-commerce.git
cd Full-commerce
```

### 2. Configure the backend

```bash
cd Backend
cp .env.example .env
```

Update `Backend/.env` with your configuration:

```dotenv
DB_URL= 
PORT= 
SECRET_KEY= 
```

Install dependencies and start the API:

```bash
npm install
npm run dev
```

The backend will be available at `http://localhost:3001`.

### 3. Start the frontend

Open another terminal:

```bash
cd Frontend
npm install
npm run dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173`.

## API Overview

The API uses JWT authentication for protected endpoints. Send the token with requests using this header:

```http
Authorization: Bearer <token>
```

### Users

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `POST` | `/user/register` | Register a new user | No |
| `POST` | `/user/login` | Log in and receive a token | No |
| `GET` | `/user/myOrder` | Retrieve the authenticated user's orders | Yes |

### Products

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `GET` | `/products` | Get all products | Yes |

### Cart

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `GET` | `/cart` | Get the active cart | Yes |
| `POST` | `/cart/item` | Add an item to the cart | Yes |
| `PATCH` | `/cart/item` | Update a cart item | Yes |
| `DELETE` | `/cart/item/:productId` | Remove a product from the cart | Yes |
| `DELETE` | `/cart/item` | Clear the cart | Yes |
| `POST` | `/cart/checkout` | Checkout and create an order | Yes |

## Frontend Routes

| Route | Access | Page |
|---|---|---|
| `/` | Public | Home and product listing |
| `/login` | Public | Login |
| `/register` | Public | Registration |
| `/cart` | Protected | Shopping cart |
| `/checkout` | Protected | Checkout |
| `/success-order` | Protected | Successful order confirmation |
| `/my-orders` | Protected | Order history |

## Available Scripts

### Backend

```bash
npm run dev          # Start the development server with automatic reload
npm run build        # Compile TypeScript
npm start            # Start the compiled server with nodemon
npm run create-admin # Run the admin creation script
```

### Frontend

```bash
npm run dev      # Start the Vite development server
npm run build    # Type-check and create a production build
npm run lint     # Run Oxlint
npm run preview  # Preview the production build locally
```

## Build for Production

### Backend

```bash
cd Backend
npm run build
npm start
```

### Frontend

```bash
cd Frontend
npm run build
npm run preview
```

The generated frontend files will be placed in `Frontend/dist`.

## Environment Variables

| Variable | Description |
|---|---|
| `DB_URL` | MongoDB connection string |
| `PORT` | Backend port configuration |
| `SECRET_KEY` | Secret used to sign and verify JWT tokens |

Keep `SECRET_KEY` private and never commit a real secret or database credential to source control.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature"
   ```

4. Push the branch and open a pull request.

## Author

Created and maintained by [Ma7moud-Sa3d](https://github.com/Ma7moud-Sa3d).
