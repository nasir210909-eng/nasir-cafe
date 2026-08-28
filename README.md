# NASIR CAFÉ

A modern, responsive, front-end-only restaurant/café ordering website built with React, Vite and Tailwind CSS.

> **Front-end only.** There is no backend, database, authentication, payment gateway or real order processing. The cart, checkout and order confirmation are simulated entirely in the browser using React state and `localStorage`.

## Getting Started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
nasir-cafe/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/        # All UI sections & widgets
│   ├── context/           # CartContext (localStorage cart) & ToastContext
│   ├── config/
│   │   └── siteConfig.js  # Café name, contact info, hours, socials, images
│   ├── data/
│   │   └── menu.js        # All menu items & categories
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── orderUtils.js  # Order number generator, price formatting
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── package.json
```

## Where to change things

| What | File |
|---|---|
| Café name, logo text | `src/config/siteConfig.js` (`logoText`, `logoAccent`) |
| Phone, WhatsApp, email, address | `src/config/siteConfig.js` (`contact`) |
| Opening hours | `src/config/siteConfig.js` (`hours`) |
| Social media links | `src/config/siteConfig.js` (`social`) |
| Delivery fee / free delivery threshold | `src/config/siteConfig.js` (`deliveryFee`, `freeDeliveryThreshold`) |
| Currency | `src/config/siteConfig.js` (`currency`) |
| Hero background & about/offer images | `src/config/siteConfig.js` (`images`) |
| Google Maps embed | `src/config/siteConfig.js` (`mapEmbedUrl`) |
| Menu items, prices, images, categories | `src/data/menu.js` |

Every food image is loaded through `src/components/FoodImage.jsx`, which shows an on-brand
placeholder if a URL is ever broken or replaced with something invalid — so swapping images in
`menu.js` / `siteConfig.js` is always safe.

## How the front-end-only ordering system works

1. **Browsing** — `src/data/menu.js` is the single source of truth for every product. `Menu.jsx`
   filters it by category/search; `FeaturedMenu.jsx` shows items flagged `featured: true`.
2. **Cart** — `CartProvider` (`src/context/CartContext.jsx`) holds cart state in React and mirrors
   it to `localStorage` (via `useLocalStorage`), so the cart survives a page refresh. Each cart line
   has a unique key built from product id + chosen customizations + special instructions, so the
   same dish with different customizations lists as separate lines.
3. **Checkout** — `Checkout.jsx` collects name, mobile, address, optional email/notes, delivery vs
   pickup, and a payment method choice (Cash / Card — clearly a demo, no real payment fields).
4. **Placing an order** — on submit, `generateOrderNumber()` (`src/utils/orderUtils.js`) creates a
   random order number like `NC-2026-1048`, the cart is cleared, and `OrderConfirmation.jsx` shows a
   "Thank You" screen with the order summary. **Nothing is sent over the network.**

## What would need a backend later

This project is intentionally structured so a real backend can be dropped in without a rewrite:

```
Frontend (this project)
   ↓
Order Service   ← replace the simulated logic in Checkout.jsx's handleSubmit
   ↓
Future API      ← POST the order payload already being built in Checkout.jsx
   ↓
Database        ← persist orders, menu items, customers
```

Specifically, to go live you would eventually need to add:

- A **backend API** to receive and persist orders (replacing the local `generateOrderNumber()` call).
- A **database** for menu items, orders and customers (replacing `src/data/menu.js`).
- **Authentication** for customer accounts and order history.
- A **real payment gateway** (Stripe, PayTabs, etc.) — the current Card/Cash choice is UI only.
- An **admin panel** to manage menu items, prices and incoming orders.

None of the above is included in this version, per the project scope.

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- lucide-react icons
- `localStorage` for cart persistence — no server, no database
