import { describe, expect, it } from "vitest";
import { getEffectivePrice, getProductPricing } from "./product-price";

describe("getProductPricing", () => {
  it("returns regular price when no discount", () => {
    expect(getProductPricing({ price: 2000 })).toEqual({
      price: 2000,
      originalPrice: null,
      discountPercent: null,
      isOnSale: false,
    });
  });

  it("applies percent discount and rounds", () => {
    expect(getProductPricing({ price: 2000, discountPercent: 20 })).toEqual({
      price: 1600,
      originalPrice: 2000,
      discountPercent: 20,
      isOnSale: true,
    });
  });

  it("rounds sale price down to the nearest 100", () => {
    // 1700 * 0.72 = 1224 → 1200
    expect(getEffectivePrice({ price: 1700, discountPercent: 28 })).toBe(1200);
    // 1275 → 1200, 1235 → 1200
    expect(getEffectivePrice({ price: 1500, discountPercent: 15 })).toBe(1200); // 1275
    expect(getEffectivePrice({ price: 1450, discountPercent: 15 })).toBe(1200); // 1232.5
    // 1001 * 0.9 = 900.9 → 900
    expect(getEffectivePrice({ price: 1001, discountPercent: 10 })).toBe(900);
  });

  it("ignores invalid discount values", () => {
    expect(getEffectivePrice({ price: 1000, discountPercent: 0 })).toBe(1000);
    expect(getEffectivePrice({ price: 1000, discountPercent: 100 })).toBe(1000);
    expect(getEffectivePrice({ price: 1000, discountPercent: -5 })).toBe(1000);
  });
});
