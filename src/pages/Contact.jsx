import ContactAgent from "../components/ContactAgent";

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
      <h1 className="display-font text-3xl font-bold text-slate-900">Contact an Agent</h1>
      <p className="mt-1 text-sm text-slate-600">Demo enquiry form — no message is sent until a backend is connected.</p>
      <div className="mt-5">
        <ContactAgent />
      </div>
    </div>
  );
}
