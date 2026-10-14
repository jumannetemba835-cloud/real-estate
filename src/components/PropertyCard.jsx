import { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faBed, faBath, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "../utils/format";

const imageFallback = (
  <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-slate-600">
    Image unavailable — contact agent for photos.
  </div>
);

function PropertyCard({ property }) {
  const [failed, setFailed] = useState(false);
  const img = property.images?.[0];
  return (
    <article className="cv-auto overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="relative aspect-[4/3] bg-slate-100">
        {!failed && img ? (
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          imageFallback
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-lg bg-slate-900/90 px-2.5 py-1 text-xs font-semibold text-white">
            {property.purpose === "rent" ? "For rent" : "For sale"}
          </span>
          <span className="rounded-lg bg-white/95 px-2.5 py-1 text-xs font-medium text-slate-700">Demo</span>
        </div>
      </div>
      <div className="min-w-0 p-4">
        <p className="tabular-price text-lg font-bold text-slate-900">{formatPrice(property)}</p>
        <h3 className="mt-1 line-clamp-2 min-w-0 break-words text-sm font-semibold text-slate-900">{property.title}</h3>
        <p className="mt-1 text-sm text-slate-600">
          <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" className="mr-1" />
          {property.location.neighbourhood}, {property.location.city}
        </p>
        <p className="mt-2 flex min-w-0 flex-wrap gap-3 text-sm text-slate-600">
          {property.bedrooms > 0 ? (
            <span><FontAwesomeIcon icon={faBed} aria-hidden="true" className="mr-1" />{property.bedrooms} bd</span>
          ) : null}
          <span><FontAwesomeIcon icon={faBath} aria-hidden="true" className="mr-1" />{property.bathrooms} ba</span>
          <span className="capitalize">{property.propertyType}</span>
        </p>
        <a
          href={`#/property/${property.id}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:underline"
        >
          View details <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default memo(PropertyCard);
