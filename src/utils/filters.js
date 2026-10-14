export const BUDGETS = [
  { label: "Any budget", min: null, max: null },
  { label: "Under TZS 1M / mo (rent)", min: null, max: 1000000 },
  { label: "TZS 1–2M / mo (rent)", min: 1000000, max: 2000000 },
  { label: "TZS 2M+ / mo (rent)", min: 2000000, max: null },
  { label: "Under TZS 500M (sale)", min: null, max: 500000000 },
  { label: "TZS 500M+ (sale)", min: 500000000, max: null },
];

export const DEFAULT_FILTERS = {
  purpose: "any",
  neighbourhood: "any",
  propertyType: "any",
  budget: "0",
  bedrooms: "any",
  sort: "new",
};

export function applyFilters(list, filters) {
  const budget = BUDGETS[Number(filters.budget)] || BUDGETS[0];
  const budgetScope = budget.label.includes("(rent)")
    ? "rent"
    : budget.label.includes("(sale)")
      ? "sale"
      : "any";
  return list.filter((p) => {
    if (filters.purpose !== "any" && p.purpose !== filters.purpose) return false;
    if (filters.neighbourhood !== "any" && p.location.neighbourhood !== filters.neighbourhood) return false;
    if (filters.propertyType !== "any" && p.propertyType !== filters.propertyType) return false;
    if (filters.bedrooms !== undefined && filters.bedrooms !== "any") {
      if (Number(p.bedrooms) < Number(filters.bedrooms)) return false;
    }
    if (budgetScope !== "any" && p.purpose !== budgetScope) return true;
    if (budget.min != null && p.price < budget.min) return false;
    if (budget.max != null && p.price > budget.max) return false;
    return true;
  });
}
