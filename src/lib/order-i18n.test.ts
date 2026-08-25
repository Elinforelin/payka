import { describe, expect, it } from "vitest";
import {
  normalizeOrderLocale,
  resolveProductName,
  translateOrderText,
} from "./order-i18n";

describe("normalizeOrderLocale", () => {
  it("maps language tags to supported order locales", () => {
    expect(normalizeOrderLocale("uk")).toBe("uk");
    expect(normalizeOrderLocale("uk-UA")).toBe("uk");
    expect(normalizeOrderLocale("en-US")).toBe("en");
    expect(normalizeOrderLocale(undefined)).toBe("en");
  });
});

describe("resolveProductName", () => {
  it("translates product name keys for the chosen locale", () => {
    expect(resolveProductName("product.names.ring_plava", "en")).toBe("PLAVA Ring");
    expect(resolveProductName("product.names.ring_plava", "uk")).toBe("Кільце PLAVA");
  });

  it("keeps already-resolved names unchanged", () => {
    expect(resolveProductName("PLAVA Ring", "en")).toBe("PLAVA Ring");
  });
});

describe("translateOrderText", () => {
  it("interpolates variables in order email strings", () => {
    expect(
      translateOrderText("uk", "order_email.customer.subject", {
        orderNumber: "ORDER123",
      }),
    ).toBe("Ваше замовлення Payka №ORDER123");
  });
});
