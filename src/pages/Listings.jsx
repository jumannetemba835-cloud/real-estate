import { useEffect, useMemo, useState } from "react";
import SearchFilters from "../components/SearchFilters";
import { applyFilters, DEFAULT_FILTERS } from "../utils/filters";
import PropertyGrid from "../components/PropertyGrid";
import { properties } from "../data/properties";
import { apiEnabled, fetchProperties } from "../api/client";

export default function Listings({ filters, setFilters }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Live rows from the API when configured; otherwise local demo data.
  const [apiItems, setApiItems] = useState(null);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (!apiEnabled()) return;
    let cancelled = false;
    fetchProperties()
      .then((rows) => {
        if (!cancelled) setApiItems(rows);
      })
      .catch(() => {
        if (!cancelled) setApiError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const source = apiItems ?? properties;

  const results = useMemo(() => {
    const out = applyFilters(source, filters);
    if (filters.sort === "price-asc") return out.toSorted((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") return out.toSorted((a, b) => b.price - a.price);
    return out;
  }, [filters, source]);

  function reset() {
    setFilters({ ...DEFAULT_FILTERS });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <h1 className="display-font text-3xl font-bold text-slate-900">Property Listings</h1>
      <p role="status" aria-live="polite" className="mt-1 text-sm text-slate-600">
        {apiItems
          ? `Live from the API — ${results.length} result${results.length === 1 ? "" : "s"} (demo rows until verified).`
          : apiError
            ? "API unreachable — showing demo data."
            : `Demo data only — ${results.length} result${results.length === 1 ? "" : "s"}.`}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setMobileOpen((v) => !v)} aria-expanded={mobileOpen} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 lg:hidden">
          {mobileOpen ? "Hide filters" : "Show filters"}
        </button>
        <label className="ml-auto flex items-center gap-2 text-sm text-slate-600">
          Sort
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="new">Suggested</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Bedrooms
          <select
            value={filters.bedrooms}
            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>
        <button type="button" onClick={reset} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
          Reset filters
        </button>
      </div>

      <div className={`mt-4 ${mobileOpen ? "block" : "hidden"} lg:block`}>
        <SearchFilters filters={filters} onChange={setFilters} onSubmit={() => setMobileOpen(false)} />
      </div>

      <div className="mt-6">
        <PropertyGrid items={results} onReset={reset} />
      </div>
    </div>
  );
}
