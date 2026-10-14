import { useState } from "react";
import { NEIGHBOURHOODS, PROPERTY_TYPES } from "../data/properties";
import { apiEnabled, postSubmission } from "../api/client";

export default function SubmitProperty() {
  const [form, setForm] = useState({ title: "", purpose: "rent", propertyType: "apartment", neighbourhood: "Masaki", price: "", bedrooms: "", contact: "" });
  const [saved, setSaved] = useState([]);
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  function set(key, value) {
    setForm({ ...form, [key]: value });
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.price || !form.contact.trim()) {
      setStatus({ type: "error", text: "Please complete title, price and contact fields." });
      return;
    }
    if (!apiEnabled()) {
      // Local state only — no backend configured.
      setSaved([{ ...form, id: `local-${Date.now()}` }, ...saved]);
      setStatus({ type: "success", text: "Saved in this browser only (demo). Connect an API later to publish." });
      setForm({ title: "", purpose: "rent", propertyType: "apartment", neighbourhood: "Masaki", price: "", bedrooms: "", contact: "" });
      return;
    }
    setSending(true);
    try {
      await postSubmission({
        title: form.title.trim(),
        purpose: form.purpose,
        propertyType: form.propertyType,
        neighbourhood: form.neighbourhood,
        price: form.price,
        bedrooms: form.bedrooms,
        contact: form.contact.trim(),
      });
      setStatus({ type: "success", text: "Received — the agency will review it before publishing." });
      setForm({ title: "", purpose: "rent", propertyType: "apartment", neighbourhood: "Masaki", price: "", bedrooms: "", contact: "" });
    } catch {
      setStatus({ type: "error", text: "Could not send your listing. Please try again or contact the agency directly." });
    } finally {
      setSending(false);
    }
  }

  const input = "mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900";

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
      <h1 className="display-font text-3xl font-bold text-slate-900">List a Property</h1>
      <p className="mt-1 text-sm text-slate-600">Agent-facing demo form. Entries stay in local state — no backend, no login.</p>
      <form onSubmit={submit} className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
        <div>
          <label htmlFor="sp-title" className="text-sm font-medium text-slate-900">Property title</label>
          <input id="sp-title" name="title" value={form.title} onChange={(e) => set("title", e.target.value)} className={input} autoComplete="off" placeholder="Two-bedroom flat in Mikocheni…" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="sp-purpose" className="text-sm font-medium text-slate-900">Rent or sale</label>
            <select id="sp-purpose" name="purpose" value={form.purpose} onChange={(e) => set("purpose", e.target.value)} className={input}>
              <option value="rent">For rent</option>
              <option value="sale">For sale</option>
            </select>
          </div>
          <div>
            <label htmlFor="sp-type" className="text-sm font-medium text-slate-900">Type</label>
            <select id="sp-type" name="propertyType" value={form.propertyType} onChange={(e) => set("propertyType", e.target.value)} className={input}>
              {PROPERTY_TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
            </select>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="sp-area" className="text-sm font-medium text-slate-900">Neighbourhood</label>
            <select id="sp-area" name="neighbourhood" value={form.neighbourhood} onChange={(e) => set("neighbourhood", e.target.value)} className={input}>
              {NEIGHBOURHOODS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sp-price" className="text-sm font-medium text-slate-900">Price (TZS)</label>
            <input id="sp-price" name="price" type="number" min="0" inputMode="numeric" value={form.price} onChange={(e) => set("price", e.target.value)} className={input} autoComplete="off" placeholder="1,500,000…" />
          </div>
          <div>
            <label htmlFor="sp-beds" className="text-sm font-medium text-slate-900">Bedrooms</label>
            <input id="sp-beds" name="bedrooms" type="number" min="0" inputMode="numeric" value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} className={input} autoComplete="off" placeholder="2…" />
          </div>
        </div>
        <div>
          <label htmlFor="sp-contact" className="text-sm font-medium text-slate-900">Agent contact</label>
          <input id="sp-contact" name="contact" value={form.contact} onChange={(e) => set("contact", e.target.value)} className={input} autoComplete="tel" inputMode="tel" spellCheck={false} placeholder="+255 700 000 000…" />
        </div>
        <button type="submit" disabled={sending} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70">{sending ? "Sending…" : apiEnabled() ? "Submit for Review" : "Save Demo Listing"}</button>
        {status && <p role={status.type === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-xl px-3 py-2 text-sm ${status.type === "error" ? "bg-red-50 text-red-800" : "bg-slate-100 text-slate-800"}`}>{status.text}</p>}
      </form>

      {saved.length > 0 && (
        <section aria-label="Locally saved" className="mt-6">
          <h2 className="text-base font-bold text-slate-900">Saved in this session ({saved.length})</h2>
          <ul className="mt-2 space-y-2">
            {saved.map((s) => (
              <li key={s.id} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">{s.title}</span> — {s.neighbourhood}, {s.purpose}, TZS {Number(s.price).toLocaleString()}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
