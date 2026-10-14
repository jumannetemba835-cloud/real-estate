# Dar Estate — Dar es Salaam (Demo)

Polished, responsive demo website for a real-estate agency in Dar es Salaam, Tanzania.
Built exactly from `AGENTS.md`. All listings, prices and contacts are **demo placeholders**.

## Stack

React + JavaScript + Vite + Tailwind CSS v4 + npm, Font Awesome React, Motion for React.

## Setup

```bash
cd dar-estate
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build (must pass before reporting done)
- `npm run preview` — preview the production build

## Where to edit

- Property demo data: `src/data/properties.js` — replace titles, prices, images, amenities. Keep `availability: "demo"` until verified.
- Agency contacts: `src/data/site.js` — set `phone` (e.g. `+255700000000`), `whatsapp` (e.g. `255700000000`), `email`. Nothing else hard-codes numbers.
- Currency: `src/utils/format.js` uses `Intl.NumberFormat("en-TZ", { style: "currency", currency: "TZS" })`.
- Images: Unsplash demo URLs with `alt` + credit comments. Replace `src` with owner-approved photos.

## Routes (hash-based, no router dependency)

- `#/` — Home (hero, working search → listings with query params, featured, neighbourhoods, how-it-works)
- `#/listings` — Grid, working rent/buy + area + type + bedrooms + budget filters, working sort, empty + reset states
- `#/property/:id` — Gallery with keyboard-accessible prev/next, facts, honest contact panel
- `#/contact` — Validated enquiry form (POSTs to the API when configured, else honest demo text)
- `#/list-property` — Agent submit form (POSTs for review when API configured, else local demo state)

## Backend (Django + DRF + Neon Postgres)

`backend/` holds a lean Django 6 + Django REST Framework API. Python lives
only there; the Vite frontend stays npm-only.

```bash
cd dar-estate/backend
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env   # then fill in DATABASE_URL + DJANGO_SECRET_KEY
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py seed_demo   # 8 demo rows, all availability=demo
.\.venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

- Endpoints: `GET /api/properties/` (filters: `purpose`, `property_type`,
  `neighbourhood`, `availability`, `bedrooms_min`, `price_min`, `price_max`;
  `ordering=price|-price|created_at`; `search=`), `GET /api/properties/:slug/`,
  `POST /api/enquiries/`, `POST /api/submissions/` (always `pending`).
- Tests hit Neon directly (the pooler breaks test-DB create/drop, so settings
  bypass `-pooler` for tests): `manage.py test properties enquiries --keepdb --noinput`
- Secrets live only in `backend/.env` (gitignored). Rotate the Neon password
  now that a connection string was shared in chat, then update `.env`.
- Time zone is `Africa/Dar_es_Salaam`. No auth, no admin dashboard — Django
  admin exists only for the owner at `/admin/` (create a superuser with
  `manage.py createsuperuser`).

## Frontend ↔ backend wiring

- Copy `.env.example` to `.env` and set `VITE_API_URL=http://127.0.0.1:8000`
  (leave empty for local demo data only).
- All backend access is isolated in `src/api/client.js`. Listings load live
  rows with demo fallback; details fetch by id when missing locally; enquiry
  and submit forms POST with real success/error states, else honest demo text.

## Still required from owner

Real agency name/logo, verified listings with photos/prices/areas, phone/WhatsApp/email, social URLs. Do not publish as-is with demo data presented as real.
