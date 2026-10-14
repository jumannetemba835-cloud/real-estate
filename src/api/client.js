// Isolated backend access. The rest of the app never calls fetch directly,
// so swapping or extending the API only touches this file.
// When VITE_API_URL is unset, every caller falls back to local demo data.

const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export const apiEnabled = () => Boolean(BASE);

async function request(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      detail = body?.detail || JSON.stringify(body);
    } catch {
      // Keep the generic message when the body is not JSON.
    }
    throw new Error(detail);
  }
  if (response.status === 204) return null;
  return response.json();
}

// DRF uses {slug, property_type, price_period, area_sqm, ...}; the UI uses
// {id, propertyType, pricePeriod, areaSqm, location: {...}, agent: {...}}.
export function toFrontend(p) {
  return {
    id: p.id ?? p.slug,
    title: p.title,
    purpose: p.purpose,
    propertyType: p.property_type,
    price: p.price,
    currency: p.currency || "TZS",
    pricePeriod: p.price_period || null,
    location: { neighbourhood: p.neighbourhood, city: p.city || "Dar es Salaam" },
    bedrooms: p.bedrooms ?? 0,
    bathrooms: p.bathrooms ?? 0,
    areaSqm: p.area_sqm ?? null,
    images: p.images || [],
    amenities: p.amenities || [],
    description: p.description || "",
    availability: p.availability || "demo",
    agent: { name: p.agent_name || "Agency contact", phone: p.agent_phone || "", whatsapp: p.agent_whatsapp || "" },
  };
}

function unwrapList(payload) {
  const rows = Array.isArray(payload) ? payload : payload?.results || [];
  return rows.map(toFrontend);
}

export async function fetchProperties(params = {}) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") query.set(key, value);
  }
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return unwrapList(await request(`/api/properties/${suffix}`));
}

export async function fetchProperty(id) {
  return toFrontend(await request(`/api/properties/${encodeURIComponent(id)}/`));
}

export async function postEnquiry({ name, contact, message, consent, propertyId }) {
  const payload = { name, contact, message, consent };
  if (propertyId && !String(propertyId).startsWith("demo-")) {
    // Only backend-owned ids are sent; demo slugs stay local-only.
    payload.property = propertyId;
  }
  return request("/api/enquiries/", { method: "POST", body: JSON.stringify(payload) });
}

export async function postSubmission({ title, purpose, propertyType, neighbourhood, price, bedrooms, contact }) {
  return request("/api/submissions/", {
    method: "POST",
    body: JSON.stringify({
      title,
      purpose,
      property_type: propertyType,
      neighbourhood,
      price: Number(price),
      bedrooms: bedrooms === "" || bedrooms == null ? null : Number(bedrooms),
      contact,
    }),
  });
}
