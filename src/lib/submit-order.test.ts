import { beforeEach, describe, expect, it, vi } from "vitest";
import type { OrderSubmissionPayload } from "./order-types";

const { sendOrderNotification, appendOrderToSheet, isGoogleScriptEmailEnabled } =
  vi.hoisted(() => ({
    sendOrderNotification: vi.fn(),
    appendOrderToSheet: vi.fn(),
    isGoogleScriptEmailEnabled: vi.fn(() => false),
  }));

vi.mock("./order-email", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./order-email")>();
  return {
    ...actual,
    sendOrderNotification,
    isEmailConfigured: vi.fn(() => false),
    getEmailConfigStatus: vi.fn(() => ({
      smtpConfigured: false,
      resendConfigured: false,
      recipient: "mamenkooo@gmail.com",
    })),
  };
});

vi.mock("./order-sheet", () => ({
  appendOrderToSheet,
  isGoogleSheetsConfigured: vi.fn(() => false),
  isGoogleScriptEmailEnabled,
}));

import { ORDER_DELIVERY_FAILED, deliverOrder } from "./order-delivery";

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
    isGoogleScriptEmailEnabled.mockReset();
    isGoogleScriptEmailEnabled.mockReturnValue(false);
  });

  it("succeeds when email delivery works", async () => {
    sendOrderNotification.mockResolvedValue({ messageId: "test" });
    appendOrderToSheet.mockResolvedValue({ skipped: true });

    const result = await deliverOrder(sampleOrder, "order-email-only");

    expect(result).toEqual({ emailSent: true, sheetSaved: false });
    expect(sendOrderNotification).toHaveBeenCalledOnce();
  });

  it("succeeds when only Google Sheets delivery works", async () => {
    sendOrderNotification.mockRejectedValue(new Error("Email is not configured."));
    appendOrderToSheet.mockResolvedValue({ skipped: false, ok: true });

    const result = await deliverOrder(sampleOrder, "order-sheet-only");

    expect(result).toEqual({ emailSent: false, sheetSaved: true });
  });

  it("sends email via Google Apps Script when enabled", async () => {
    isGoogleScriptEmailEnabled.mockReturnValue(true);
    appendOrderToSheet.mockResolvedValue({
      skipped: false,
      ok: true,
      emailsSent: true,
    });

    const result = await deliverOrder(sampleOrder, "order-google-script");

    expect(result).toEqual({ emailSent: true, sheetSaved: true });
    expect(sendOrderNotification).not.toHaveBeenCalled();
    expect(appendOrderToSheet).toHaveBeenCalledOnce();

    const [, , emails] = appendOrderToSheet.mock.calls[0];
    expect(emails?.shop?.to).toBeTruthy();
    expect(emails?.customer?.to).toBe("alina@example.com");
    expect(emails?.customer?.html).toContain("Payka");
  });

  it("fails when both email and Google Sheets delivery fail", async () => {
    sendOrderNotification.mockRejectedValue(new Error("Email is not configured."));
    appendOrderToSheet.mockResolvedValue({ skipped: true });

    await expect(deliverOrder(sampleOrder, "order-failed")).rejects.toThrow(
      ORDER_DELIVERY_FAILED,
    );
  });
});
