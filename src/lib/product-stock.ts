import { DEFAULT_READY_TIME_WEEKS, type Product } from "./data";

/**
 * Returns whether a product is currently in stock.
 * When `inStock` is explicitly boolean, returns that value.
 * When undefined/null, defaults to true.
 */
export function isProductInStock(
  product: Pick<Product, "inStock">,
): boolean {
  if (product.inStock === undefined || product.inStock === null) {
    return true;
  }
  return Boolean(product.inStock);
}

/**
 * Returns the estimated made-to-order lead time in weeks (falls back to
 * DEFAULT_READY_TIME_WEEKS), or null when the product is in stock.
 */
export function getReadyTimeWeeks(
  product: Pick<Product, "inStock" | "readyTimeMinWeeks" | "readyTimeMaxWeeks">,
): [number, number] | null {
  if (isProductInStock(product)) {
    return null;
  }
  return [
    product.readyTimeMinWeeks ?? DEFAULT_READY_TIME_WEEKS[0],
    product.readyTimeMaxWeeks ?? DEFAULT_READY_TIME_WEEKS[1],
  ];
}
