export function formatTZS(price, currency = "TZS") {
  try {
    return new Intl.NumberFormat("en-TZ", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency} ${Number(price).toLocaleString("en-US")}`;
  }
}

export function formatPrice(property) {
  const base = formatTZS(property.price, property.currency || "TZS");
  if (property.purpose === "rent" && property.pricePeriod) {
    return `${base} / ${property.pricePeriod}`;
  }
  return base;
}
