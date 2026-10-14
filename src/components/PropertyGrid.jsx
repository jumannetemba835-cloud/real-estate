import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ items, onReset }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <p aria-hidden="true" className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </p>
        <h2 className="mt-3 text-balance text-lg font-semibold text-slate-900">No Demo Listings Match Those Filters</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">Try widening the budget or clearing a filter.</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Reset Filters
        </button>
      </div>
    );
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
