import { describe, expect, it } from "vitest";
import nodemailer from "nodemailer";
import {
  formatOrderEmail,
  getOrderNotificationRecipient,
  isEmailConfigured,
  normalizeOrderSubmission,
  sendOrderNotification,
} from "./order-email";
import { formatDisplayOrderNumber } from "./order-utils";
import type { OrderSubmissionPayload } from "./order-types";

const sampleOrder: OrderSubmissionPayload = {
  privacyConsent: true,
  consentTimestamp: "2026-06-10T12:00:00.000Z",
  subtotal: 5700,
  total: 5705,
  items: [
    {
      id: 6,
      name: "product.names.ring_plava",
      quantity: 2,
      price: 2700,
      category: "Rings",
    },
  ],
  shipping: {
    fullName: "Alina Mamenko",
    phone: "+380 99 123 45 67",
    city: "Kyiv",
    department: "Branch #12",
    address: "",
    shippingMethod: "Nova Poshta (to Department)",
    shippingCost: 5,
  },
};

describe("formatOrderEmail", () => {
  it("includes customer, product, totals, and consent metadata", () => {
    const content = formatOrderEmail(sampleOrder, "order-123");

    expect(content.subject).toContain("ORDER123");
    expect(content.text).toContain("ORDER123");
    expect(content.text).toContain("order-123");
    expect(content.html).toContain("ORDER123");
    expect(content.text).toContain("Alina Mamenko");
    expect(content.text).toContain("+380 99 123 45 67");
    expect(content.text).toContain("Kyiv");
    expect(content.text).toContain("Branch #12");
    expect(content.text).toContain("product.names.ring_plava");
    expect(content.text).toContain("x2");
    expect(content.text).toContain("₴5700");
    expect(content.text).toContain("₴5705");
    expect(content.text).toContain("2026-06-10T12:00:00.000Z");
    expect(content.html).toContain("Alina Mamenko");
    expect(content.html).toContain("product.names.ring_plava");
  });

  it("escapes HTML in customer-provided values", () => {
    const maliciousOrder: OrderSubmissionPayload = {
      ...sampleOrder,
      shipping: {
        ...sampleOrder.shipping,
        fullName: '<script>alert("x")</script>',
      },
    };

    const content = formatOrderEmail(maliciousOrder, "order-456");

    expect(content.html).not.toContain("<script>");
    expect(content.html).toContain("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
  });
});

describe("formatDisplayOrderNumber", () => {
  it("formats a short customer-facing order number", () => {
    expect(formatDisplayOrderNumber("a1b2c3d4-e5f6-7890-abcd-ef1234567890")).toBe("A1B2C3D4");
  });
});

describe("normalizeOrderSubmission", () => {
  it("rejects orders without privacy consent", () => {
    expect(() =>
      normalizeOrderSubmission({ ...sampleOrder, privacyConsent: false }),
    ).toThrow("Privacy consent is required.");
  });

  it("sanitizes and validates required personal data", () => {
    const normalized = normalizeOrderSubmission({
      ...sampleOrder,
      shipping: {
        ...sampleOrder.shipping,
        fullName: "  Alina Mamenko  ",
        phone: "+380991234567",
      },
    });

    expect(normalized.shipping.fullName).toBe("Alina Mamenko");
    expect(normalized.shipping.phone).toBe("+380991234567");
    expect(normalized.items[0].quantity).toBe(2);
  });
});

describe("sendOrderNotification", () => {
  it("delivers all order data through the mail transport", async () => {
    const transport = nodemailer.createTransport({ jsonTransport: true });
    const orderId = "test-order-789";
    const orderNumber = formatDisplayOrderNumber(orderId);

    const info = await sendOrderNotification(sampleOrder, orderId, transport);
    const message = JSON.parse(String(info.message));
    const recipient = Array.isArray(message.to)
      ? message.to[0]?.address
      : message.to;

    expect(recipient).toBe(getOrderNotificationRecipient());
    expect(message.subject).toContain(orderNumber);
    expect(message.text).toContain(orderNumber);
    expect(message.text).toContain(orderId);
    expect(message.html).toContain(orderNumber);
    expect(message.text).toContain("Alina Mamenko");
    expect(message.text).toContain("product.names.ring_plava");
    expect(message.text).toContain("₴5705");
    expect(message.html).toContain("Privacy consent received");
  });
});

describe("getOrderNotificationRecipient", () => {
  it("defaults to the configured business inbox", () => {
    expect(getOrderNotificationRecipient()).toBe("mamenkooo@gmail.com");
  });
});

describe("email configuration helpers", () => {
  it("reports whether SMTP credentials are present", () => {
    expect(isEmailConfigured()).toBe(false);
  });
});
