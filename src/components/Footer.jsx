import { siteConfig, callLink, whatsappLink } from "../data/site";

export default function Footer() {
  const tel = callLink();
  const wa = whatsappLink();
  return (
    <footer className="mt-16 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{siteConfig.agencyName}</p>
          <p className="mt-2 text-sm text-slate-400">{siteConfig.tagline}. Demo website — listings and contacts are placeholders.</p>
          <p className="mt-3 text-sm text-slate-400">{siteConfig.area}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-white">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-white" href="#/">Home</a></li>
            <li><a className="hover:text-white" href="#/listings">Listings</a></li>
            <li><a className="hover:text-white" href="#/contact">Contact an agent</a></li>
            <li><a className="hover:text-white" href="#/list-property">List a property</a></li>
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold text-white">Contact (demo placeholders)</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{tel ? <a className="hover:text-white" href={tel}>{siteConfig.phone}</a> : <span className="text-slate-400">Phone: to be provided by owner</span>}</li>
            <li>{wa ? <a className="hover:text-white" href={wa} target="_blank" rel="noreferrer">WhatsApp us</a> : <span className="text-slate-400">WhatsApp: to be provided by owner</span>}</li>
            <li>{siteConfig.email ? <span>{siteConfig.email}</span> : <span className="text-slate-400">Email: to be provided by owner</span>}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 sm:px-6">Demo content — not real listings. No verified availability or prices.</p>
      </div>
    </footer>
  );
}
