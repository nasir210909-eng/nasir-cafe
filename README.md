# NASIR CAFÉ

A modern, responsive restaurant/café ordering website: a React + Vite + Tailwind front end backed
by a small Express + PostgreSQL API that persists placed orders.

> **Scope.** Orders placed at checkout are saved for real in a database. There is still no
> authentication, no admin panel, and no real payment gateway (Cash/Card at checkout is a UI
> choice only — no payment is actually processed).

## Live deployment

- Website: https://web-production-fce07.up.railway.app
- API: https://api-production-edc8.up.railway.app
- Both run on Railway, in the same project, alongside a managed PostgreSQL service.
- Source: https://github.com/nasir210909-eng/nasir-cafe

Pushing new commits does **not** auto-redeploy yet (Railway's GitHub auto-deploy trigger isn't
wired up on this repo) — trigger a redeploy manually from the Railway dashboard, or ask for it to
be re-triggered.

## Getting Started (front end)

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`). By default it talks to an
API at `http://localhost:4000` (see `.env.example` — copy to `.env` and adjust `VITE_API_URL` to
point elsewhere, e.g. the live API above, if you don't want to run the backend locally).

### Build for production

```bash
npm run build
npm run preview
```

## Getting Started (backend)

```bash
cd server
npm install
cp .env.example .env   # then fill in DATABASE_URL for a real Postgres instance
npm start
```

The server creates its `orders` table automatically on startup if it doesn't exist yet — no
separate migration step.

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
│   │   └── orderUtils.js  # Local order-number fallback, price formatting
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/                # Express + PostgreSQL order API (separate deployable service)
│   ├── src/
│   │   ├── index.js       # App entry, CORS, health check
│   │   ├── db.js          # Postgres pool + schema creation
│   │   └── routes/orders.js
│   └── package.json
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
| Which API the front end calls | `VITE_API_URL` env var (build-time) |
| Allowed front-end origins (CORS) | `CORS_ORIGIN` env var on the `server` |

Every food image is loaded through `src/components/FoodImage.jsx`, which shows an on-brand
placeholder if a URL is ever broken or replaced with something invalid — so swapping images in
`menu.js` / `siteConfig.js` is always safe.

## How ordering works now

1. **Browsing** — `src/data/menu.js` is the single source of truth for every product. `Menu.jsx`
   filters it by category/search; `FeaturedMenu.jsx` shows items flagged `featured: true`.
2. **Cart** — `CartProvider` (`src/context/CartContext.jsx`) holds cart state in React and mirrors
   it to `localStorage`, so the cart survives a page refresh.
3. **Checkout** — `Checkout.jsx` collects name, mobile, address, optional email/notes, delivery vs
   pickup, and a payment method choice (Cash / Card — UI only, no real payment is processed).
4. **Placing an order** — on submit, the order is POSTed to `${VITE_API_URL}/api/orders`. The
   server validates it, inserts it into PostgreSQL, and assigns the canonical order number
   (`NC-<year>-<zero-padded id>`). If the API can't be reached, the front end falls back to a
   locally-generated order number (`generateOrderNumber()` in `src/utils/orderUtils.js`) so
   checkout never breaks for the customer — that order just isn't saved anywhere.
5. **Looking an order up** — `GET /api/orders/:orderNumber` returns a saved order (used internally
   for verification; there's no "track my order" screen in the UI yet).

## Admin dashboard

Visit `/admin` on the live site for a login-protected, read-only list of every order received.

- Backend: `POST /api/admin/login` checks the submitted username/password against the
  `ADMIN_USERNAME`/`ADMIN_PASSWORD` env vars and returns an HMAC-signed session token (12-hour
  expiry, signed with `ADMIN_TOKEN_SECRET`) — see `server/src/auth.js`. `GET /api/admin/orders` is
  the only route that requires it.
- Frontend: `AdminPage.jsx` shows `AdminLogin.jsx` or `AdminDashboard.jsx` depending on whether a
  token is in `localStorage`; the dashboard fetches orders with that token and logs out
  automatically if the API ever returns 401 (e.g. after the token expires).
- There's no signup flow and no way to change the password from the UI — rotate it by updating
  `ADMIN_PASSWORD` on the `api` service and redeploying.

## What's still missing for a full production system

- **Authentication** for customer accounts and order history.
- A **real payment gateway** (Stripe, PayTabs, etc.) — Cash/Card is still a UI-only choice.
- An **admin panel** to manage menu items, prices, and view/update incoming orders (right now the
  menu is still edited by hand in `src/data/menu.js`, and orders can only be inspected via the API
  or directly in the database).
- Auto-deploy on push (currently manual, see "Live deployment" above).

## Tech Stack

- Front end: React 18 + Vite + Tailwind CSS + lucide-react icons
- Backend: Node.js + Express 5 + PostgreSQL (`pg`)
- Hosting: Railway (web, api, and Postgres as separate services in one project)
