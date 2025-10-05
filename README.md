# Enoormous Organic Products - E-commerce Platform

An elegant, production-ready e-commerce platform for cosmetic and home care products built with modern web technologies.

## 🌟 Features

### Core Functionality
- **Product Management**: Browse products with detailed descriptions, ingredients, and usage instructions
- **Shopping Cart**: Add/remove items, update quantities with real-time updates
- **Secure Checkout**: Complete checkout flow with address validation
- **Payment Integration**: Razorpay payment gateway for secure transactions (Card, UPI, Net Banking, Wallets)
- **Order Management**: View order history and track orders
- **Responsive Design**: Beautiful UI that works on all devices

### Technical Features
- **Full-Stack Architecture**: Express.js backend with React frontend
- **Type Safety**: TypeScript throughout the entire stack
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries
- **Real-time Updates**: Optimistic UI updates with error handling
- **Secure**: Environment-based secrets management, payment verification

## 🏗️ Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: Neon PostgreSQL, Drizzle ORM
- **Payment**: Razorpay
- **Validation**: Zod
- **State Management**: React Context API
- **Routing**: React Router v6

## 📁 Project Structure

```
/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── ui/                  # shadcn/ui components (buttons, cards, etc.)
│   │   ├── Navbar.tsx           # Main navigation component
│   │   ├── Footer.tsx           # Footer component
│   │   ├── ProductCard.tsx      # Product display card
│   │   └── Layout.tsx           # Main layout wrapper
│   ├── pages/                   # Route pages
│   │   ├── Home.tsx             # Landing page
│   │   ├── Shop.tsx             # Product listing with filters
│   │   ├── ProductDetail.tsx    # Individual product page with detailed info
│   │   ├── Cart.tsx             # Shopping cart page
│   │   ├── Checkout.tsx         # Checkout flow with Razorpay
│   │   ├── Account.tsx          # User dashboard
│   │   ├── Admin.tsx            # Admin panel
│   │   ├── About.tsx            # About page
│   │   └── Contact.tsx          # Contact page
│   ├── contexts/                # React contexts
│   │   └── CartContext.tsx      # Cart state management
│   ├── lib/                     # Utility functions
│   │   ├── api.ts              # API client functions
│   │   └── utils.ts            # Helper functions
│   └── assets/                  # Static assets (images, fonts)
├── server/                      # Backend Express server
│   ├── index.ts                # Server entry point
│   ├── routes.ts               # API route definitions
│   ├── storage.ts              # Database operations
│   ├── db.ts                   # Database connection
│   ├── vite.ts                 # Vite dev server integration
│   └── seed.ts                 # Database seeding script
├── shared/                      # Shared code between frontend and backend
│   └── schema.ts               # Drizzle database schema & types
├── public/                      # Public static files
└── package.json                # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd workspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The following environment variables need to be configured:
   - `DATABASE_URL` - PostgreSQL connection string (auto-configured in Replit)
   - `RAZORPAY_KEY_ID` - Your Razorpay publishable key
   - `RAZORPAY_KEY_SECRET` - Your Razorpay secret key (backend only)

4. **Push database schema**
   ```bash
   npm run db:push
   ```

5. **Seed the database** (adds 8 sample products)
   ```bash
   tsx server/seed.ts
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5000`

## 💳 Razorpay Payment Integration

### Where to Add Razorpay Keys

**RAZORPAY_KEY_ID** (Publishable Key):
- Used in frontend
- Safe to expose
- Format: `rzp_live_xxxxx` or `rzp_test_xxxxx`
- Add to Replit Secrets

**RAZORPAY_KEY_SECRET** (Secret Key):
- Used in backend ONLY
- NEVER expose to frontend
- Used for payment verification
- Add to Replit Secrets

### Setup Instructions

1. **Create Razorpay Account**
   - Sign up at [https://razorpay.com](https://razorpay.com)
   - Get API keys from Dashboard → Settings → API Keys
   - Use **Test Mode** keys for testing

2. **Add Keys to Replit Secrets**
   - Go to Tools → Secrets in Replit
   - Add `RAZORPAY_KEY_ID` = `rzp_live_ROz0SG1CcePViw`
   - Add `RAZORPAY_KEY_SECRET` = `h0a3so5srdtrODb3rU4BrFHq`

3. **Payment Flow**
   ```
   User Checkout Flow:
   1. User fills delivery address
   2. Click "Pay Now" → Backend creates Razorpay order
   3. Razorpay modal opens with payment options
   4. User completes payment (Card/UPI/Net Banking/Wallet)
   5. Backend verifies payment signature
   6. Order created in database, cart cleared
   7. Success page displayed
   ```

4. **Payment Methods Supported**
   - Credit/Debit Cards (Visa, Mastercard, Amex, etc.)
   - UPI (Google Pay, PhonePe, Paytm, etc.)
   - Net Banking
   - Wallets (Paytm, PhonePe, Mobikwik, etc.)

5. **Test Cards** (for Test Mode)
   ```
   Card Number: 4111 1111 1111 1111
   CVV: Any 3 digits
   Expiry: Any future date
   ```

## 📊 Database Schema

### Tables

- **profiles** - User profiles
  - id (UUID), email, fullName, phone
  - timestamps

- **products** - Product catalog
  - id (UUID), name, description, detailedDescription
  - price, category, imageUrl
  - stock, rating, ingredients, howToUse, isActive

- **cart_items** - Shopping cart
  - id, userId, productId, quantity

- **orders** - Customer orders
  - id, userId, totalAmount, status
  - paymentId, paymentStatus
  - shippingAddress (JSONB)

- **order_items** - Order line items
  - id, orderId, productId, quantity, price

- **reviews, wishlists, addresses** - Future features

## 🔌 API Documentation

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart/user/:userId` - Clear cart

### Orders
- `GET /api/orders/:userId` - Get user's orders
- `GET /api/order/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status

### Payment (Razorpay)
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment signature

## 🎨 Key Components

### CartContext
**Location**: `src/contexts/CartContext.tsx`

Manages global cart state.

**Methods**:
- `addToCart(productId, quantity)` - Add product to cart
- `updateQuantity(itemId, quantity)` - Update item quantity
- `removeFromCart(itemId)` - Remove item from cart
- `clearCart()` - Clear entire cart
- `getCartTotal()` - Calculate total amount
- `getCartCount()` - Get total item count

**Usage**:
```tsx
import { useCart } from '@/contexts/CartContext';

function Component() {
  const { addToCart, cartItems } = useCart();
  
  return (
    <button onClick={() => addToCart(productId)}>
      Add to Cart
    </button>
  );
}
```

### API Client
**Location**: `src/lib/api.ts`

Centralized API client.

**Usage**:
```tsx
import { api } from '@/lib/api';

const products = await api.products.getAll();
await api.cart.add(userId, productId, quantity);
```

## 🔧 Available Scripts

- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm run db:push` - Push database schema
- `tsx server/seed.ts` - Seed database

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
- `DATABASE_URL`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

## 🐛 Troubleshooting

**Cart not loading**
- Check DATABASE_URL environment variable
- Run database seed script

**Payment not working**
- Verify Razorpay keys are correct
- Check browser console for errors
- Ensure Razorpay script loads

**Database connection issues**
- Confirm DATABASE_URL is set
- Run `npm run db:push` to sync schema

**Images not displaying**
- Product images use `/assets/` path
- Check imageUrl in database

## 🔐 Security Features

- **Environment Variables**: Secrets in Replit Secrets
- **Payment Verification**: Server-side signature verification
- **Input Validation**: Zod schemas validate all inputs
- **SQL Injection Prevention**: Drizzle ORM parameterized queries
- **Type Safety**: TypeScript prevents runtime errors

## 📝 Future Enhancements

- [ ] User authentication (sign up/login)
- [ ] Admin dashboard with analytics
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Advanced search and filters
- [ ] Product recommendations
- [ ] Multi-language support

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using modern web technologies**
