import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import { DEFAULT_FILTERS } from "./utils/filters";
import PropertyDetails from "./pages/PropertyDetails";
import Contact from "./pages/Contact";
import SubmitProperty from "./pages/SubmitProperty";
import { getPropertyById } from "./data/properties";

function parseHash() {
  const hash = window.location.hash || "#/";
  const [pathPart, queryPart] = hash.replace(/^#/, "").split("?");
  const query = new URLSearchParams(queryPart || "");
  const segs = pathPart.split("/").filter(Boolean);
  if (segs[0] === "property" && segs[1]) return { page: "details", id: decodeURIComponent(segs[1]) };
  if (segs[0] === "listings") {
    return {
      page: "listings",
      query: {
        purpose: query.get("purpose") || undefined,
        neighbourhood: query.get("neighbourhood") || undefined,
        propertyType: query.get("propertyType") || undefined,
        budget: query.get("budget") || undefined,
      },
    };
  }
  if (segs[0] === "contact") return { page: "contact" };
  if (segs[0] === "list-property") return { page: "submit" };
  return { page: "home" };
}

export default function App() {
  const [route, setRoute] = useState(() => parseHash());
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });

  useEffect(() => {
    function onHash() {
      const r = parseHash();
      setRoute(r);
      if (r.page === "listings" && r.query) {
        setFilters((f) => ({
          ...f,
          purpose: r.query.purpose || f.purpose,
          neighbourhood: r.query.neighbourhood || f.neighbourhood,
          propertyType: r.query.propertyType || f.propertyType,
          budget: r.query.budget ?? f.budget,
        }));
      }
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", onHash);
    // Apply initial query if landing directly on listings URL
    onHash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function navigate() {
    setRoute(parseHash());
  }

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-sm">
        Skip to content
      </a>
      <Navbar route={route} navigate={navigate} />
      <main id="main" className="pb-4">
        {route.page === "home" && <Home filters={filters} setFilters={setFilters} />}
        {route.page === "listings" && <Listings filters={filters} setFilters={setFilters} />}
        {route.page === "details" && <PropertyDetails property={getPropertyById(route.id)} id={route.id} />}
        {route.page === "contact" && <Contact />}
        {route.page === "submit" && <SubmitProperty />}
      </main>
      <Footer />
    </div>
  );
}
