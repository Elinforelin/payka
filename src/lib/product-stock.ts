import type { Product } from "./data";

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
