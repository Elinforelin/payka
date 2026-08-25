import type { Product } from "./data";

/** Returns a valid charity percent (1–100), or null when not a charity product. */
export function getCharityPercent(
  product: Pick<Product, "charityPercent">,
): number | null {
  const percent = product.charityPercent;
  if (typeof percent !== "number" || !Number.isFinite(percent)) {
    return null;
  }
  const rounded = Math.round(percent);
  if (rounded < 1 || rounded > 100) {
    return null;
  }
  return rounded;
}
