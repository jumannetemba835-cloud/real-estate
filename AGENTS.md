# AGENTS.md --- Tanzania Real Estate Website

## Project mission

Build a polished, responsive website for a real-estate agency operating
in Dar es Salaam, Tanzania. The site should help people discover
properties for rent or sale and contact an agent easily. Treat this file
as the working brief for any coding agent contributing to the project.

**Stack:** React + JavaScript (not TypeScript) + Vite + Tailwind CSS +
npm. Use Font Awesome for icons. Use Motion for React for restrained,
purposeful animations.

## Product principles

-   Design for real users in Tanzania: support TZS prices, familiar Dar
    es Salaam neighbourhoods, and WhatsApp/phone contact patterns.
-   Keep the interface minimal, confident, editorial, and
    image-led---not a generic AI-generated property template.
-   Prioritise trust, readable property information, clear navigation,
    and fast contact with an agent.
-   Do not invent agency credentials, reviews, property availability,
    prices, addresses, or statistics. Use clearly labelled demo content
    until the owner supplies verified data.
-   Do not use fake logos, fake awards, fake testimonials, or misleading
    "verified" badges.
-   Use real, relevant property photography. Prefer properly licensed
    assets from Unsplash/Pexels or owner-supplied images. Keep image
    URLs and attribution/source notes easy to replace. Never use
    unrelated photos as property imagery.

## Visual direction

### Brand feel

Modern coastal-city real estate: calm, premium, grounded, and welcoming.
Use generous whitespace, a strong typographic hierarchy, crisp
alignment, large property photography, and restrained details.

### Tailwind colour direction

Use Tailwind Slate as the foundation, with one warm accent and one
restrained green accent.

-   Main text: `slate-900`
-   Secondary text: `slate-600`
-   Muted surfaces: `slate-50` and `slate-100`
-   Borders: `slate-200`
-   Dark footer / contrast sections: `slate-950`
-   Primary actions: deep blue/slate (`slate-900` or `slate-800`)
-   Optional accent: muted amber (`amber-500`) for small highlights only
-   Optional status accent: emerald (`emerald-700`) only when the status
    is factual

Do not scatter many accent colours across the UI. Check text contrast
and visible keyboard focus states.

### Typography

Use a clean sans-serif for body text and a distinctive, readable display
face for large headings if it improves the design. Font Awesome is for
icons; do not use icon fonts as a replacement for normal text. Keep
headings concise and body copy readable on small screens.

### Shape, spacing, and imagery

-   Use consistent spacing and a clear max-width container.
-   Use modest corner radii (for example `rounded-xl` or `rounded-2xl`),
    not pills on every element.
-   Avoid excessive glassmorphism, gradients, glowing effects, floating
    blobs, and decorative animation.
-   Property cards should be image-forward with a clear price, title,
    location, key facts, and a useful action.
-   Use intentional image crops with `object-cover`, stable aspect
    ratios, and meaningful `alt` text.
-   Add image loading states and a sensible fallback when an image
    fails.

## Required pages and interactions

### 1. Home page

-   Responsive navigation with agency wordmark placeholder, links, and a
    prominent "List a property" or "Contact an agent" action.
-   Hero section with a concise headline about finding a home in Dar es
    Salaam, supporting text, and a real property/location image.
-   Search panel with property intent (rent/buy), neighbourhood,
    property type, and budget filters. Filters must actually update the
    visible results or route to the listings page with query parameters.
-   Featured properties section with a small, curated set of cards.
-   A neighbourhood discovery section using real neighbourhood names
    such as Masaki, Oyster Bay, Mikocheni, Upanga, Sinza, Mbezi Beach,
    and Kigamboni. Do not imply every neighbourhood has available
    listings unless demo data says so.
-   A clear "How it works" or agent-contact section.
-   Compact footer with contact placeholders, navigation, and social
    links only when real URLs are provided.

### 2. Property listings page

-   Responsive property grid.
-   Working filters for rent/buy, neighbourhood, property type,
    bedrooms, and budget where supported by the data.
-   Sorting options only when they work.
-   Empty state when filters return no results.
-   Clear reset-filters control.
-   On mobile, filters should be easy to open and close without blocking
    the whole experience.

### 3. Property details page or modal

-   Large image gallery with accessible previous/next controls if a
    gallery exists.
-   Price, location, rent/sale status, bedrooms, bathrooms, property
    type, and description.
-   Amenities and map location only when the data is known.
-   Strong call, WhatsApp, or enquiry actions. Use configurable phone
    numbers; do not hard-code an invented number.
-   If contact forms are included, validate fields and show a real
    success/error state. If there is no backend, explain that the form
    is a front-end demo and do not pretend a message was sent.

### 4. Contact / agent enquiry

-   Simple form with name, contact method, enquiry, and consent where
    appropriate.
-   Accessible labels, inline validation, and clear feedback.
-   Phone/WhatsApp links must use configurable agency contact details.

### 5. Agent-facing content

-   Include a clear route or section explaining how an agent can submit
    a property.
-   For the initial front-end, use a form and local state if there is no
    backend. Keep data access isolated so an API can be connected later.
-   Do not build authentication or a fake admin dashboard unless
    specifically requested.

## Property data model

Keep sample listings in a separate file such as
`src/data/properties.js`. Use a consistent shape similar to:

``` js
{
  id: "demo-masaki-01",
  title: "Contemporary apartment near the coast",
  purpose: "rent", // "rent" | "sale"
  propertyType: "apartment",
  price: 1800000,
  currency: "TZS",
  pricePeriod: "month", // use for rent; omit or use null for sale
  location: {
    neighbourhood: "Masaki",
    city: "Dar es Salaam"
  },
  bedrooms: 2,
  bathrooms: 2,
  areaSqm: null,
  images: [
    {
      src: "REPLACE_WITH_APPROVED_IMAGE_URL",
      alt: "Living room in a contemporary apartment"
    }
  ],
  amenities: [],
  description: "Demo description—replace with verified property details.",
  availability: "demo", // do not label as available until verified
  agent: {
    name: "Agency contact",
    phone: "",
    whatsapp: ""
  }
}
```

Any sample prices or listings must be clearly marked as demo data in the
project and must not be presented as confirmed real-world listings.
Format currency consistently, for example with
`Intl.NumberFormat("en-TZ", { style: "currency", currency: "TZS", maximumFractionDigits: 0 })`,
after checking the display is appropriate for the chosen content.

## Recommended implementation

### Create the project

``` bash
npm create vite@latest dar-estate -- --template react
cd dar-estate
npm install
npm install tailwindcss @tailwindcss/vite
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome
npm install motion
npm run dev
```

Use the current official Vite/Tailwind integration for the installed
Tailwind version. For Tailwind CSS v4 with Vite, configure
`@tailwindcss/vite` in `vite.config.js` and add `@import "tailwindcss";`
to the main CSS file. Do not mix v3 setup instructions with v4 packages.

### Suggested file structure

``` text
dar-estate/
├── AGENTS.md
├── README.md
├── package.json
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── properties.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── SearchFilters.jsx
    │   ├── PropertyCard.jsx
    │   ├── PropertyGrid.jsx
    │   └── ContactAgent.jsx
    └── pages/
        ├── Home.jsx
        ├── Listings.jsx
        └── PropertyDetails.jsx
```

Keep components focused and reusable. Do not put the entire site into
one giant component. Use React state for filters and interactions. Use
React Router only if multiple real routes are implemented; otherwise
keep routing simple and consistent.

## Font Awesome rules

Use the official React component and import specific free icons from the
appropriate packages. Examples include location pin, bed, bath, heart,
magnifying glass, phone, WhatsApp, arrow-right, and bars/close for
mobile navigation.

``` jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faBed, faBath } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
```

Do not use emoji as a replacement for interface icons. Add accessible
names to icon-only buttons with `aria-label`; decorative icons should
use `aria-hidden="true"`.

## Motion and UI libraries

-   Use `motion` from `motion/react` for subtle entrance transitions,
    small card interactions, and menu transitions only when they add
    clarity.
-   Respect `prefers-reduced-motion`. Keep motion quick and avoid
    animating every element on scroll.
-   You may borrow interaction ideas from Aceternity UI or similar
    libraries, but implement only the pieces that fit this product and
    are compatible with React + Tailwind. Do not add a large component
    library just for decoration.
-   Do not add DaisyUI or another design system automatically; use it
    only if there is a concrete need and the visual system remains
    coherent.

## Responsive and accessibility requirements

-   Test at approximately 360px, 390px, 768px, 1024px, and 1440px
    widths.
-   No horizontal page overflow.
-   Mobile navigation must open/close and be keyboard accessible.
-   All form controls need visible labels, useful validation, and focus
    states.
-   Use semantic landmarks and heading order.
-   Ensure keyboard operation for menus, filters, galleries, and modals.
-   Use buttons for actions and links for navigation.
-   Do not communicate status using colour alone.
-   Use `loading="lazy"` for below-the-fold images; prioritise the hero
    image where appropriate.
-   Respect reduced-motion preferences.

## Performance and code quality

-   Use npm as the only package manager. Commit `package-lock.json`; do
    not create a Yarn or pnpm lockfile.
-   Keep dependencies lean and avoid unnecessary UI libraries.
-   Use reusable components and centralised sample data.
-   Avoid duplicated listing data, giant components, and hard-coded
    contact details.
-   Use stable keys when rendering lists.
-   Handle broken images and empty search results.
-   Keep browser console free of React warnings and runtime errors.
-   Ensure `npm run build` completes successfully.

## Definition of done

-   [ ] Website runs locally with `npm run dev`.
-   [ ] Production build succeeds with `npm run build`.
-   [ ] Home, listings, property details, and contact/agent enquiry
    flows are usable.
-   [ ] Search and filters change results correctly.
-   [ ] Navigation and controls work on mobile and desktop.
-   [ ] Font Awesome icons render correctly.
-   [ ] Images are relevant, have alt text, and handle failures.
-   [ ] Demo listings and contact details are clearly identified as
    placeholders.
-   [ ] No fake claims, testimonials, metrics, or unverified
    availability.
-   [ ] README explains setup, available scripts, where to edit property
    data, and how to replace demo contact details.

## Agent workflow

1.  Inspect the existing repository before changing files.
2.  Preserve working code and conventions where possible.
3.  If this is a new project, scaffold the smallest working version
    first.
4.  Implement one page/feature at a time and verify it before
    proceeding.
5.  Run `npm run build` and fix errors before reporting completion.
6.  Report what changed, which commands were run, any known limitations,
    and what real agency information is still required.
7.  Do not claim to have tested or verified anything that was not
    actually run.
