// Central agency contact placeholders. Replace with verified details.
// No phone numbers are hard-coded elsewhere; import from here.

export const siteConfig = {
  agencyName: "Dar Estate",
  tagline: "Find a home in Dar es Salaam",
  phone: "", // e.g. "+255700000000"
  whatsapp: "", // e.g. "255700000000" (country code, no +)
  email: "",
  area: "Dar es Salaam, Tanzania",
};

export function callLink() {
  return siteConfig.phone ? `tel:${siteConfig.phone}` : null;
}

export function whatsappLink(message = "Hello, I am interested in a property.") {
  if (!siteConfig.whatsapp) return null;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
