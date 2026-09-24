import { describe, expect, it } from "vitest";
import { getReadyTimeWeeks, isProductInStock } from "./product-stock";

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

describe("getReadyTimeWeeks", () => {
  it("returns null when the product is in stock", () => {
    expect(getReadyTimeWeeks({ inStock: true })).toBeNull();
  });

  it("falls back to the sitewide default when made to order", () => {
    expect(getReadyTimeWeeks({ inStock: false })).toEqual([2, 4]);
  });

  it("uses per-product overrides when set", () => {
    expect(
      getReadyTimeWeeks({ inStock: false, readyTimeMinWeeks: 1, readyTimeMaxWeeks: 2 }),
    ).toEqual([1, 2]);
  });
});
