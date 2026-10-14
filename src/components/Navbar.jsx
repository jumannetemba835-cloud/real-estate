import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faPhone } from "@fortawesome/free-solid-svg-icons";
import { siteConfig, callLink } from "../data/site";

export default function Navbar({ route, navigate }) {
  const [open, setOpen] = useState(false);
  const tel = callLink();

  const links = [
    { label: "Home", href: "#/", active: route.page === "home" },
    { label: "Listings", href: "#/listings", active: route.page === "listings" },
    { label: "Contact", href: "#/contact", active: route.page === "contact" },
    { label: "List a property", href: "#/list-property", active: route.page === "submit" },
  ];

  function go(href) {
    setOpen(false);
    window.location.hash = href;
    if (navigate) navigate(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#/"
          onClick={(e) => { e.preventDefault(); go("#/"); }}
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          {siteConfig.agencyName}
          <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 align-middle text-[11px] font-medium text-slate-600">
            Demo
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.slice(0, 3).map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => { e.preventDefault(); go(l.href); }}
              aria-current={l.active ? "page" : undefined}
              className={`text-sm font-medium ${l.active ? "text-slate-900 underline underline-offset-4" : "text-slate-600 hover:text-slate-900"}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#/list-property"
            onClick={(e) => { e.preventDefault(); go("#/list-property"); }}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            List a property
          </a>
          {tel ? (
            <a href={tel} className="text-sm font-medium text-slate-600 hover:text-slate-900">
              <FontAwesomeIcon icon={faPhone} aria-hidden="true" className="mr-1" />
              Call
            </a>
          ) : null}
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-900 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} aria-hidden="true" />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); go(l.href); }}
                  aria-current={l.active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium ${l.active ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
