import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faBed, faBath, faArrowLeft, faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import ContactAgent from "../components/ContactAgent";
import { formatPrice } from "../utils/format";
import { callLink, whatsappLink } from "../data/site";
import { apiEnabled, fetchProperty } from "../api/client";

export default function PropertyDetails({ property: initialProperty, id }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState({});
  // API fallback when the id is not in the local demo set.
  const needsFetch = !initialProperty && !!id && apiEnabled();
  const [remote, setRemote] = useState(null);
  const [loading, setLoading] = useState(needsFetch);

  useEffect(() => {
    if (!needsFetch) return;
    let cancelled = false;
    fetchProperty(id)
      .then((row) => {
        if (!cancelled) setRemote(row);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [needsFetch, id]);

  const property = initialProperty || remote;
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <p role="status" aria-live="polite" className="text-sm text-slate-600">Loading listing…</p>
      </div>
    );
  }
  if (!property) {
    return (
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Listing not found</h1>
        <p className="mt-2 text-sm text-slate-600">This demo listing does not exist.</p>
        <a href="#/listings" className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Back to listings</a>
      </div>
    );
  }
  const images = property.images || [];
  const current = images[index];
  const tel = callLink();
  const wa = whatsappLink(`Hello, I am interested in: ${property.title} (${property.id})`);

  function prev() { setIndex((i) => (i - 1 + images.length) % images.length); }
  function next() { setIndex((i) => (i + 1) % images.length); }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <a href="#/listings" className="text-sm font-semibold text-slate-900 hover:underline">
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" className="mr-1" />Back to listings
      </a>
      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
            role="region"
            aria-roledescription="carousel"
            aria-label={`Property images: ${index + 1} of ${images.length}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") prev();
              if (e.key === "ArrowRight") next();
            }}
          >
            {current && !failed[index] ? (
              <img key={current.src} src={current.src} alt={current.alt} decoding="async" onError={() => setFailed({ ...failed, [index]: true })} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-600">Image unavailable — contact agent for photos.</div>
            )}
            {images.length > 1 ? (
              <>
                <button type="button" onClick={prev} aria-label="Previous image" className="absolute left-3 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/95 px-3 py-2 text-slate-900 hover:bg-white">
                  <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
                </button>
                <button type="button" onClick={next} aria-label="Next image" className="absolute right-3 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/95 px-3 py-2 text-slate-900 hover:bg-white">
                  <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
                </button>
              </>
            ) : null}
          </div>
          {images.length > 1 ? (
            <div className="mt-3 flex gap-2" role="group" aria-label="Choose image">
              {images.map((im, i) => (
                <button key={im.src} type="button" onClick={() => setIndex(i)} aria-label={`View image ${i + 1} of ${images.length}`} aria-pressed={i === index} className={`h-16 min-h-11 w-24 min-w-11 overflow-hidden rounded-lg border ${i === index ? "border-slate-900" : "border-slate-200"}`}>
                  <img src={im.src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-full w-full object-cover" onError={() => setFailed({ ...failed, [i]: true })} />
                </button>
              ))}
            </div>
          ) : null}

          <p className="mt-4 inline-flex gap-2">
            <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">{property.purpose === "rent" ? "For rent" : "For sale"}</span>
            <span className="rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-slate-700">Demo listing — not confirmed</span>
          </p>
          <h1 className="display-font mt-2 text-3xl font-bold text-slate-900">{property.title}</h1>
          <p className="mt-1 text-sm text-slate-600"><FontAwesomeIcon icon={faLocationDot} aria-hidden="true" className="mr-1" />{property.location.neighbourhood}, {property.location.city}</p>
          <p className="tabular-price mt-2 text-2xl font-bold text-slate-900">{formatPrice(property)}</p>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-3"><dt className="text-xs text-slate-600">Bedrooms</dt><dd className="font-semibold text-slate-900"><FontAwesomeIcon icon={faBed} aria-hidden="true" className="mr-1" />{property.bedrooms}</dd></div>
            <div className="rounded-xl border border-slate-200 bg-white p-3"><dt className="text-xs text-slate-600">Bathrooms</dt><dd className="font-semibold text-slate-900"><FontAwesomeIcon icon={faBath} aria-hidden="true" className="mr-1" />{property.bathrooms}</dd></div>
            <div className="rounded-xl border border-slate-200 bg-white p-3"><dt className="text-xs text-slate-600">Type</dt><dd className="font-semibold capitalize text-slate-900">{property.propertyType}</dd></div>
            <div className="rounded-xl border border-slate-200 bg-white p-3"><dt className="text-xs text-slate-600">Size</dt><dd className="font-semibold text-slate-900">{property.areaSqm ? `${property.areaSqm} m²` : "On request"}</dd></div>
          </dl>

          <h2 className="mt-6 text-lg font-bold text-slate-900">About this property</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{property.description}</p>

          {property.amenities?.length > 0 && (
            <>
              <h2 className="mt-6 text-lg font-bold text-slate-900">Amenities</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {property.amenities.map((a) => <li key={a} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700">{a}</li>)}
              </ul>
            </>
          )}
          <p className="mt-6 rounded-xl bg-slate-100 p-3 text-xs text-slate-600">Map location only shown when verified. Demo listing — ask the agent for the exact location.</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">Interested?</p>
            <div className="mt-2 flex flex-col gap-2">
              {tel ? <a href={tel} className="rounded-xl bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800"><FontAwesomeIcon icon={faPhone} aria-hidden="true" className="mr-2" />Call agent</a>
                : <span className="rounded-xl bg-slate-100 px-4 py-2 text-center text-sm text-slate-600">Phone: to be provided</span>}
              {wa ? <a href={wa} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50"><FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" className="mr-2" />WhatsApp agent</a>
                : <span className="rounded-xl border border-slate-200 px-4 py-2 text-center text-sm text-slate-600">WhatsApp: to be provided</span>}
            </div>
          </div>
          <ContactAgent propertyTitle={property.title} propertyId={property.id} />
        </div>
      </div>
    </div>
  );
}
