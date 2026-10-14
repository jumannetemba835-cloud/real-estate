import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import SearchFilters from "../components/SearchFilters";
import { applyFilters } from "../utils/filters";
import PropertyGrid from "../components/PropertyGrid";
import { properties, NEIGHBOURHOODS } from "../data/properties";
import { siteConfig } from "../data/site";

const HERO_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop";

export default function Home({ filters, setFilters }) {
  const featured = properties.slice(0, 3);
  const preview = applyFilters(properties, filters).slice(0, 3);

  function toListings(f) {
    const q = new URLSearchParams({
      purpose: f.purpose,
      neighbourhood: f.neighbourhood,
      propertyType: f.propertyType,
      budget: String(f.budget),
    }).toString();
    window.location.hash = `#/listings?${q}`;
  }

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-10 sm:px-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="inline-block rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">Dar es Salaam — Demo Website</p>
          <h1 className="display-font mt-3 max-w-xl text-balance text-4xl font-bold text-slate-900 sm:text-5xl">Find a Home in Dar es Salaam</h1>
          <p className="mt-3 max-w-md text-base text-slate-600">
            Rentals and homes for sale across the city — from Masaki to Kigamboni. Clear prices in TZS and direct agent contact.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="#/listings" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
              Browse listings <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" className="ml-1" />
            </a>
            <a href="#/contact" className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50">
              <FontAwesomeIcon icon={faPhone} aria-hidden="true" className="mr-2" />Contact an agent
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <img src={HERO_IMG} alt="Modern home exterior in Dar es Salaam — demo image" fetchPriority="high" decoding="async" width="1600" height="1200" className="aspect-[4/3] w-full rounded-2xl border border-slate-200 object-cover" />
          <p className="mt-2 text-xs text-slate-600">Demo photo (Unsplash) — to be replaced with agency photography. {siteConfig.area}.</p>
        </motion.div>
      </section>

      <section aria-label="Search" className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <SearchFilters filters={filters} onChange={setFilters} onSubmit={toListings} />
      </section>

      <section aria-labelledby="featured-h" className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 id="featured-h" className="display-font text-2xl font-bold text-slate-900">Featured Properties</h2>
            <p className="mt-1 text-sm text-slate-600">Small curated demo set — not live availability.</p>
          </div>
          <a href="#/listings" className="text-sm font-semibold text-slate-900 hover:underline">View all <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" /></a>
        </div>
        <div className="mt-4">
          <PropertyGrid items={preview.length ? preview : featured} onReset={() => setFilters({ purpose: "any", neighbourhood: "any", propertyType: "any", budget: "0" })} />
        </div>
      </section>

      <section aria-labelledby="areas-h" className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <h2 id="areas-h" className="display-font text-2xl font-bold text-slate-900">Explore Neighbourhoods</h2>
        <p className="mt-1 text-sm text-slate-600">Real area names. Listing counts reflect demo data only.</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {NEIGHBOURHOODS.map((n) => {
            const count = properties.filter((p) => p.location.neighbourhood === n).length;
            return (
              <li key={n}>
                <a href={`#/listings?neighbourhood=${encodeURIComponent(n)}&purpose=any&propertyType=any&budget=0`} className="block rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:bg-slate-50">
                  <span className="text-sm font-semibold text-slate-900"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" className="mr-1 text-slate-600" />{n}</span>
                  <span className="mt-1 block text-xs text-slate-600">{count === 0 ? "No demo listings yet" : `${count} demo listing${count > 1 ? "s" : ""}`}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="how-h" className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <div className="dark-panel rounded-2xl bg-slate-950 p-8 text-slate-200">
          <h2 id="how-h" className="display-font text-2xl font-bold text-white">How It Works</h2>
          <ol className="mt-4 grid gap-4 text-sm md:grid-cols-3">
            <li className="rounded-xl border border-white/10 p-4"><span className="font-bold text-white">1. Search.</span> Filter demo listings by rent/buy, area, type and budget.</li>
            <li className="rounded-xl border border-white/10 p-4"><span className="font-bold text-white">2. View.</span> Open a property for photos, facts and price in TZS.</li>
            <li className="rounded-xl border border-white/10 p-4"><span className="font-bold text-white">3. Contact.</span> Call or WhatsApp once the owner adds real numbers.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
