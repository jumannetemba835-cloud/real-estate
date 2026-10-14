import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NEIGHBOURHOODS, PROPERTY_TYPES } from "../data/properties";
import { BUDGETS } from "../utils/filters";

export default function SearchFilters({ filters, onChange, onSubmit, compact = false }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <form
      aria-label="Property search filters"
      className={`grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 ${compact ? "" : "shadow-sm"} sm:grid-cols-2 lg:grid-cols-5`}
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(filters);
      }}
    >
      <div>
        <label htmlFor="f-purpose" className="text-xs font-semibold text-slate-600">Intent</label>
        <select id="f-purpose" value={filters.purpose} onChange={(e) => set("purpose", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900">
          <option value="any">Rent or buy</option>
          <option value="rent">Rent</option>
          <option value="sale">Buy</option>
        </select>
      </div>
      <div>
        <label htmlFor="f-area" className="text-xs font-semibold text-slate-600">Neighbourhood</label>
        <select id="f-area" value={filters.neighbourhood} onChange={(e) => set("neighbourhood", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900">
          <option value="any">All areas</option>
          {NEIGHBOURHOODS.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-type" className="text-xs font-semibold text-slate-600">Property type</label>
        <select id="f-type" value={filters.propertyType} onChange={(e) => set("propertyType", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900">
          <option value="any">All types</option>
          {PROPERTY_TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="f-budget" className="text-xs font-semibold text-slate-600">Budget</label>
        <select id="f-budget" value={filters.budget} onChange={(e) => set("budget", e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900">
          {BUDGETS.map((b, i) => <option key={b.label} value={String(i)}>{b.label}</option>)}
        </select>
      </div>
      <div className="flex items-end">
        <button type="submit" className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" className="mr-2" />
          Search
        </button>
      </div>
    </form>
  );
}
