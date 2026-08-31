import { afterEach, describe, expect, it, vi } from "vitest";
import type { OrderSubmissionPayload } from "./order-types";
import {
  appendOrderToSheet,
  formatOrderProducts,
  formatOrderSheetRecord,
  isGoogleSheetsConfigured,
} from "./order-sheet";

const sampleOrder: OrderSubmissionPayload = {
  privacyConsent: true,
  consentTimestamp: "2026-06-10T12:00:00.000Z",
  subtotal: 5700,
  total: 5705,
  comment: "Please wrap as a gift",
  items: [
    {
      id: 6,
      name: "PLAVA Ring",
      quantity: 2,
      price: 2700,
      category: "Rings",
      size: "17",
      stone: "Cubic Zirconia, Pink",
    },
  ],
  shipping: {
    fullName: "Alina Mamenko",
    phone: "+380 99 123 45 67",
    email: "alina@example.com",
    city: "Kyiv",
    department: "Branch #12",
    address: "",
    shippingMethod: "Nova Poshta (to Department)",
    shippingCost: 5,
  },
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("formatOrderProducts", () => {
  it("includes quantity, price, size, and stone", () => {
    expect(formatOrderProducts(sampleOrder.items)).toBe(
      "PLAVA Ring x2 — ₴5400 [Size: 17, Stone: Cubic Zirconia, Pink]",
    );
  });

  it("resolves i18n product name keys to English labels", () => {
    expect(
      formatOrderProducts([
        {
          id: 6,
          name: "product.names.ring_plava",
          quantity: 1,
          price: 2700,
        },
      ]),
    ).toBe("PLAVA Ring x1 — ₴2700");
  });
});

describe("formatOrderSheetRecord", () => {
  it("maps all customer and order fields for the spreadsheet", () => {
    const record = formatOrderSheetRecord(
      sampleOrder,
      "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "2026-08-18T13:00:00.000Z",
    );

    expect(record).toEqual({
      receivedAt: "2026-08-18T13:00:00.000Z",
      orderNumber: "A1B2C3D4",
      orderId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      fullName: "Alina Mamenko",
      phone: "+380 99 123 45 67",
      email: "alina@example.com",
      city: "Kyiv",
      department: "Branch #12",
      address: "",
      shippingMethod: "Nova Poshta (to Department)",
      products: "PLAVA Ring x2 — ₴5400 [Size: 17, Stone: Cubic Zirconia, Pink]",
      subtotal: 5700,
      shippingCost: 5,
      total: 5705,
      comment: "Please wrap as a gift",
      privacyConsent: "yes",
      consentTimestamp: "2026-06-10T12:00:00.000Z",
    });
  });
});

describe("appendOrderToSheet", () => {
  it("skips when the webhook is not configured", async () => {
    expect(isGoogleSheetsConfigured()).toBe(false);
    await expect(appendOrderToSheet(sampleOrder, "order-1")).resolves.toEqual({
      skipped: true,
    });
  });

  it("posts the sanitized order payload to the webhook", async () => {
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_URL", "https://script.google.com/macros/s/test/exec");
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_SECRET", "sheet-secret");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(appendOrderToSheet(sampleOrder, "order-abc")).resolves.toEqual({
      skipped: false,
      ok: true,
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://script.google.com/macros/s/test/exec");
    expect(options.method).toBe("POST");

    const body = JSON.parse(options.body);
    expect(body.secret).toBe("sheet-secret");
    expect(body.order.fullName).toBe("Alina Mamenko");
    expect(body.order.phone).toBe("+380 99 123 45 67");
    expect(body.order.orderId).toBe("order-abc");
    expect(body.order.products).toContain("PLAVA Ring");
  });

  it("includes email payloads when provided", async () => {
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_URL", "https://script.google.com/macros/s/test/exec");
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_SECRET", "sheet-secret");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ ok: true, emailsSent: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await appendOrderToSheet(sampleOrder, "order-abc", {
      shop: {
        to: "shop@example.com",
        subject: "New order",
        html: "<p>shop</p>",
        text: "shop",
      },
      customer: {
        to: "alina@example.com",
        subject: "Thanks",
        html: "<p>thanks</p>",
        text: "thanks",
      },
    });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.emails.shop.to).toBe("shop@example.com");
    expect(body.emails.customer.to).toBe("alina@example.com");
  });

  it("throws when the webhook rejects the order", async () => {
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_URL", "https://script.google.com/macros/s/test/exec");
    vi.stubEnv("GOOGLE_SHEETS_WEBHOOK_SECRET", "sheet-secret");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: async () => JSON.stringify({ ok: false, error: "Unauthorized" }),
      }),
    );

    await expect(appendOrderToSheet(sampleOrder, "order-abc")).rejects.toThrow(
      "Unauthorized",
    );
  });
});
