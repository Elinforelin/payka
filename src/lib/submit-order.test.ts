import { beforeEach, describe, expect, it, vi } from "vitest";
import type { OrderSubmissionPayload } from "./order-types";

const { sendOrderNotification, appendOrderToSheet } = vi.hoisted(() => ({
  sendOrderNotification: vi.fn(),
  appendOrderToSheet: vi.fn(),
}));

vi.mock("./order-email", () => ({
  sendOrderNotification,
  normalizeOrderSubmission: (data: OrderSubmissionPayload) => data,
}));

vi.mock("./order-sheet", () => ({
  appendOrderToSheet,
}));

import { ORDER_DELIVERY_FAILED, deliverOrder } from "./submit-order";

const sampleOrder: OrderSubmissionPayload = {
  privacyConsent: true,
  consentTimestamp: "2026-06-10T12:00:00.000Z",
  subtotal: 2700,
  total: 2700,
  items: [
    {
      id: 6,
      name: "product.names.ring_plava",
      quantity: 1,
      price: 2700,
      category: "Rings",
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
    shippingCost: 0,
  },
  locale: "en",
};

describe("deliverOrder", () => {
  beforeEach(() => {
    sendOrderNotification.mockReset();
    appendOrderToSheet.mockReset();
  });

  it("succeeds when email delivery works", async () => {
    sendOrderNotification.mockResolvedValue({ messageId: "test" });
    appendOrderToSheet.mockResolvedValue({ skipped: true });

    const result = await deliverOrder(sampleOrder, "order-email-only");

    expect(result).toEqual({ emailSent: true, sheetSaved: false });
  });

  it("succeeds when only Google Sheets delivery works", async () => {
    sendOrderNotification.mockRejectedValue(new Error("Email is not configured."));
    appendOrderToSheet.mockResolvedValue({ skipped: false, ok: true });

    const result = await deliverOrder(sampleOrder, "order-sheet-only");

    expect(result).toEqual({ emailSent: false, sheetSaved: true });
  });

  it("fails when both email and Google Sheets delivery fail", async () => {
    sendOrderNotification.mockRejectedValue(new Error("Email is not configured."));
    appendOrderToSheet.mockResolvedValue({ skipped: true });

    await expect(deliverOrder(sampleOrder, "order-failed")).rejects.toThrow(
      ORDER_DELIVERY_FAILED,
    );
  });
});
