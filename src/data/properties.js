// Demo listing data only. Replace with verified agency listings.
// Image sources: Unsplash (licensed for free use). Replace src + credit as needed.
// See README for how to edit.

export const NEIGHBOURHOODS = [
  "Masaki",
  "Oyster Bay",
  "Mikocheni",
  "Upanga",
  "Sinza",
  "Mbezi Beach",
  "Kigamboni",
];

export const PROPERTY_TYPES = ["apartment", "house", "villa", "studio", "office"];

export const properties = [
  {
    id: "demo-masaki-01",
    title: "Contemporary apartment near the coast",
    purpose: "rent",
    propertyType: "apartment",
    price: 1800000,
    currency: "TZS",
    pricePeriod: "month",
    location: { neighbourhood: "Masaki", city: "Dar es Salaam" },
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 110,
    images: [
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
        alt: "Bright living room in a contemporary apartment",
        credit: "Unsplash demo image — replace with verified photo",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop",
        alt: "Modern apartment bedroom with neutral decor",
        credit: "Unsplash demo image — replace with verified photo",
      },
    ],
    amenities: ["Parking", "Balcony", "Backup generator", "Security"],
    description:
      "Demo description — replace with verified property details. Bright two-bedroom apartment a short walk from Masaki eateries and the peninsula road.",
    availability: "demo",
    agent: { name: "Agency contact", phone: "", whatsapp: "" },
  },
  {
    id: "demo-oyster-02",
    title: "Family house with garden in Oyster Bay",
    purpose: "sale",
    propertyType: "house",
    price: 850000000,
    currency: "TZS",
    pricePeriod: null,
    location: { neighbourhood: "Oyster Bay", city: "Dar es Salaam" },
    bedrooms: 4,
    bathrooms: 3,
    areaSqm: 320,
    images: [
      {
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        alt: "Detached family house exterior with lawn",
        credit: "Unsplash demo image — replace with verified photo",
      },
    ],
    amenities: ["Garden", "Parking", "Water tank", "Security"],
    description:
      "Demo description — replace with verified property details. Four-bedroom family house on a quiet Oyster Bay street.",
    availability: "demo",
    agent: { name: "Agency contact", phone: "", whatsapp: "" },
  },
  {
    id: "demo-mikocheni-03",
    title: "Two-bedroom flat in Mikocheni",
    purpose: "rent",
    propertyType: "apartment",
    price: 950000,
    currency: "TZS",
    pricePeriod: "month",
    location: { neighbourhood: "Mikocheni", city: "Dar es Salaam" },
    bedrooms: 2,
    bathrooms: 1,
    areaSqm: 85,
    images: [
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        alt: "Modern residential building exterior",
        credit: "Unsplash demo image — replace with verified photo",
      },
    ],
    amenities: ["Parking", "Balcony"],
    description:
      "Demo description — replace with verified property details. Practical two-bedroom flat close to shops and schools in Mikocheni.",
    availability: "demo",
    agent: { name: "Agency contact", phone: "", whatsapp: "" },
  },
  {
    id: "demo-upanga-04",
    title: "City studio in Upanga",
    purpose: "rent",
    propertyType: "studio",
    price: 600000,
    currency: "TZS",
    pricePeriod: "month",
    location: { neighbourhood: "Upanga", city: "Dar es Salaam" },
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 45,
    images: [
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
        alt: "Compact studio living space with kitchen",
        credit: "Unsplash demo image — replace with verified photo",
      },
    ],
    amenities: ["Furnished option", "Security", "Water tank"],
    description:
      "Demo description — replace with verified property details. Compact studio suited to city workers in Upanga.",
    availability: "demo",
    agent: { name: "Agency contact", phone: "", whatsapp: "" },
  },
  {
    id: "demo-mbezi-05",
    title: "Beach-area villa near Mbezi Beach",
    purpose: "sale",
    propertyType: "villa",
    price: 1200000000,
    currency: "TZS",
    pricePeriod: null,
    location: { neighbourhood: "Mbezi Beach", city: "Dar es Salaam" },
    bedrooms: 5,
    bathrooms: 4,
    areaSqm: 450,
    images: [
      {
        src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop",
        alt: "Villa exterior with driveway",
        credit: "Unsplash demo image — replace with verified photo",
      },
    ],
    amenities: ["Garden", "Parking", "Backup generator", "Water tank"],
    description:
      "Demo description — replace with verified property details. Spacious villa within reach of Mbezi Beach.",
    availability: "demo",
    agent: { name: "Agency contact", phone: "", whatsapp: "" },
  },
  {
    id: "demo-sinza-06",
    title: "Three-bedroom home in Sinza",
    purpose: "rent",
    propertyType: "house",
    price: 1200000,
    currency: "TZS",
    pricePeriod: "month",
    location: { neighbourhood: "Sinza", city: "Dar es Salaam" },
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 140,
    images: [
      {
        src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
        alt: "House exterior in daylight",
        credit: "Unsplash demo image — replace with verified photo",
      },
    ],
    amenities: ["Parking", "Water tank", "Security"],
    description:
      "Demo description — replace with verified property details. Three-bedroom home on a settled Sinza street.",
    availability: "demo",
    agent: { name: "Agency contact", phone: "", whatsapp: "" },
  },
  {
    id: "demo-kigamboni-07",
    title: "Seaside plot-side house in Kigamboni",
    purpose: "sale",
    propertyType: "house",
    price: 420000000,
    currency: "TZS",
    pricePeriod: null,
    location: { neighbourhood: "Kigamboni", city: "Dar es Salaam" },
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 220,
    images: [
      {
        src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1200&auto=format&fit=crop",
        alt: "Residential house with tiled roof",
        credit: "Unsplash demo image — replace with verified photo",
      },
    ],
    amenities: ["Parking", "Garden", "Water tank"],
    description:
      "Demo description — replace with verified property details. Solid three-bedroom house across the ferry in Kigamboni.",
    availability: "demo",
    agent: { name: "Agency contact", phone: "", whatsapp: "" },
  },
  {
    id: "demo-upanga-office-08",
    title: "Small office space in Upanga",
    purpose: "rent",
    propertyType: "office",
    price: 2500000,
    currency: "TZS",
    pricePeriod: "month",
    location: { neighbourhood: "Upanga", city: "Dar es Salaam" },
    bedrooms: 0,
    bathrooms: 2,
    areaSqm: 90,
    images: [
      {
        src: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
        alt: "Bright office interior with desks",
        credit: "Unsplash demo image — replace with verified photo",
      },
    ],
    amenities: ["Parking", "Backup generator", "Security"],
    description:
      "Demo description — replace with verified property details. Street-facing office space suited to a small team.",
    availability: "demo",
    agent: { name: "Agency contact", phone: "", whatsapp: "" },
  },
];

export function getPropertyById(id) {
  return properties.find((p) => p.id === id) || null;
}
