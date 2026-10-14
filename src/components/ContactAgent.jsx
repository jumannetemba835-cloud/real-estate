import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { siteConfig, callLink, whatsappLink } from "../data/site";
import { apiEnabled, postEnquiry } from "../api/client";

export default function ContactAgent({ propertyTitle, propertyId }) {
  const [form, setForm] = useState({ name: "", contact: "", message: propertyTitle ? `Hello, I am interested in: ${propertyTitle} (demo enquiry).` : "", consent: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const nameRef = useRef(null);

  const tel = callLink();
  const wa = whatsappLink(propertyTitle ? `Hello, I am interested in: ${propertyTitle}` : undefined);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.contact.trim()) e.contact = "Please enter a phone number or email.";
    if (!form.message.trim()) e.message = "Please write a short message.";
    if (!form.consent) e.consent = "Please confirm you are happy to be contacted.";
    return e;
  }

  async function submit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      setStatus({ type: "error", text: "Please fix the highlighted fields." });
      if (nameRef.current) nameRef.current.focus();
      return;
    }
    if (!apiEnabled()) {
      // No backend configured: front-end demo only.
      setStatus({ type: "success", text: "Demo form saved in your browser only — no message was sent. The agency will connect a real backend later." });
      return;
    }
    setSending(true);
    try {
      await postEnquiry({
        name: form.name.trim(),
        contact: form.contact.trim(),
        message: form.message.trim(),
        consent: true,
        propertyId,
      });
      setStatus({ type: "success", text: "Enquiry sent to the agency. They will contact you using the details you provided." });
    } catch {
      setStatus({ type: "error", text: "Could not send your enquiry. Please call or WhatsApp the agency instead." });
    } finally {
      setSending(false);
    }
  }

  const inputClass = "mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900";

  return (
    <section aria-labelledby="contact-agent-h" className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 id="contact-agent-h" className="text-base font-bold text-slate-900">Contact an Agent</h2>
      <p className="mt-1 text-sm text-slate-600">Demo contact panel. Replace numbers in <code>src/data/site.js</code>.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tel ? (
          <a href={tel} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            <FontAwesomeIcon icon={faPhone} aria-hidden="true" className="mr-2" />Call {siteConfig.phone}
          </a>
        ) : (
          <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600">Phone: to be provided by owner</span>
        )}
        {wa ? (
          <a href={wa} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
            <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" className="mr-2" />WhatsApp
          </a>
        ) : (
          <span className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600">WhatsApp: to be provided by owner</span>
        )}
      </div>

      <form onSubmit={submit} noValidate className="mt-4 space-y-3">
        <div>
          <label htmlFor="ca-name" className="text-sm font-medium text-slate-900">Name</label>
          <input ref={nameRef} id="ca-name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} autoComplete="name" aria-invalid={errors.name ? "true" : undefined} aria-describedby={errors.name ? "ca-name-error" : undefined} placeholder="Amina Juma…" />
          {errors.name && <p id="ca-name-error" role="alert" className="mt-1 text-sm text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ca-contact" className="text-sm font-medium text-slate-900">Phone or email</label>
          <input id="ca-contact" name="contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className={inputClass} autoComplete="tel" inputMode="tel" spellCheck={false} aria-invalid={errors.contact ? "true" : undefined} aria-describedby={errors.contact ? "ca-contact-error" : undefined} placeholder="+255 700 000 000…" />
          {errors.contact && <p id="ca-contact-error" role="alert" className="mt-1 text-sm text-red-700">{errors.contact}</p>}
        </div>
        <div>
          <label htmlFor="ca-msg" className="text-sm font-medium text-slate-900">Enquiry</label>
          <textarea id="ca-msg" name="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} autoComplete="off" aria-invalid={errors.message ? "true" : undefined} aria-describedby={errors.message ? "ca-msg-error" : undefined} placeholder="Viewing time, budget, move-in date…" />
          {errors.message && <p id="ca-msg-error" role="alert" className="mt-1 text-sm text-red-700">{errors.message}</p>}
        </div>
        <div className="flex items-start gap-2">
          <input id="ca-consent" type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 min-h-6 min-w-6" aria-invalid={errors.consent ? "true" : undefined} aria-describedby={errors.consent ? "ca-consent-error" : undefined} />
          <label htmlFor="ca-consent" className="text-sm text-slate-600">I am happy for the agency to contact me about this enquiry (demo).</label>
        </div>
        {errors.consent && <p id="ca-consent-error" role="alert" className="text-sm text-red-700">{errors.consent}</p>}
        <button type="submit" disabled={sending} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70">{sending ? "Sending…" : apiEnabled() ? "Send Enquiry" : "Send Enquiry (Demo)"}</button>
        {status && (
          <p role={status.type === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-xl px-3 py-2 text-sm ${status.type === "error" ? "bg-red-50 text-red-800" : "bg-slate-100 text-slate-800"}`}>
            {status.text}
          </p>
        )}
      </form>
    </section>
  );
}
