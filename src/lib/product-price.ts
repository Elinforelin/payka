import type { Product } from "@/lib/data";

export interface ProductPricing {
  /** Price charged (after discount, if any) */
  price: number;
  /** Original catalog price when discounted */
  originalPrice: number | null;
  /** Active discount percent (1–99), otherwise null */
  discountPercent: number | null;
  isOnSale: boolean;
}

export function getProductPricing(
  product: Pick<Product, "price" | "discountPercent">
): ProductPricing {
  const percent = product.discountPercent;
  if (
    typeof percent === "number" &&
    Number.isFinite(percent) &&
    percent > 0 &&
    percent < 100
  ) {
    const discountPercent = Math.round(percent);
    const raw = product.price * (1 - discountPercent / 100);
    // Round sale price down to a clean 100s (e.g. 1275 → 1200)
    const price = Math.max(0, Math.floor(raw / 100) * 100);
    return {
      price,
      originalPrice: product.price,
      discountPercent,
      isOnSale: true,
    };
  }

  return {
    price: product.price,
    originalPrice: null,
    discountPercent: null,
    isOnSale: false,
  };
}

export function getEffectivePrice(
  product: Pick<Product, "price" | "discountPercent">
): number {
  return getProductPricing(product).price;
}
