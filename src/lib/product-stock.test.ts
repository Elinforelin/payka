import { describe, expect, it } from "vitest";
import { isProductInStock } from "./product-stock";

describe("isProductInStock", () => {
  it("returns true when inStock is true", () => {
    expect(isProductInStock({ inStock: true })).toBe(true);
  });

  it("returns false when inStock is false", () => {
    expect(isProductInStock({ inStock: false })).toBe(false);
  });

  it("defaults to true when inStock is undefined", () => {
    expect(isProductInStock({})).toBe(true);
  });
});
