import { describe, expect, it } from "vitest";
import { isProductReleased, products } from "./data";

describe("isProductReleased", () => {
  it("treats a missing flag as released", () => {
    expect(isProductReleased({})).toBe(true);
  });

  it("treats true as released and false as hidden", () => {
    expect(isProductReleased({ isReleased: true })).toBe(true);
    expect(isProductReleased({ isReleased: false })).toBe(false);
  });
});

describe("products", () => {
  it("never exposes an unreleased piece", () => {
    expect(products.every((product) => product.isReleased !== false)).toBe(true);
  });
});
