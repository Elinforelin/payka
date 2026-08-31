import type { OrderItemPayload, OrderSubmissionPayload } from "./order-types";
import { resolveProductName } from "./order-i18n";
import { formatDisplayOrderNumber } from "./order-utils";

export interface OrderSheetRecord {
  receivedAt: string;
  orderNumber: string;
  orderId: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  department: string;
  address: string;
  shippingMethod: string;
  products: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  comment: string;
  privacyConsent: string;
  consentTimestamp: string;
}

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim() &&
      process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim(),
  );
}

export function isGoogleScriptEmailEnabled(): boolean {
  return (
    process.env.SEND_EMAIL_VIA_GOOGLE_SCRIPT?.trim().toLowerCase() === "true" &&
    isGoogleSheetsConfigured()
  );
}

export interface WebhookEmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface WebhookEmailPayload {
  shop?: WebhookEmailMessage;
  customer?: WebhookEmailMessage;
}

export function formatOrderProducts(items: OrderItemPayload[]): string {
  return items
    .map((item) => {
      const extras = [
        item.size ? `Size: ${item.size}` : null,
        item.stone ? `Stone: ${item.stone}` : null,
      ]
        .filter(Boolean)
        .join(", ");
      const lineTotal = item.price * item.quantity;
      return `${resolveProductName(item.name, "en")} x${item.quantity} — ₴${lineTotal}${extras ? ` [${extras}]` : ""}`;
    })
    .join("\n");
}

export function formatOrderSheetRecord(
  order: OrderSubmissionPayload,
  orderId: string,
  receivedAt = new Date().toISOString(),
): OrderSheetRecord {
  const shippingCost = Number(order.shipping.shippingCost);
  return {
    receivedAt,
    orderNumber: formatDisplayOrderNumber(orderId),
    orderId,
    fullName: order.shipping.fullName,
    phone: order.shipping.phone,
    email: order.shipping.email,
    city: order.shipping.city || "",
    department: order.shipping.department || "",
    address: order.shipping.address || "",
    shippingMethod: order.shipping.shippingMethod,
    products: formatOrderProducts(order.items),
    subtotal: order.subtotal,
    shippingCost: Number.isFinite(shippingCost) ? shippingCost : 0,
    total: order.total,
    comment: order.comment || "",
    privacyConsent: order.privacyConsent ? "yes" : "no",
    consentTimestamp: order.consentTimestamp,
  };
}

export function getGoogleSheetsSetupInstructions(): string {
  return [
    "Google Sheets is not configured.",
    "Add these to a .env file in the project root, then restart the server:",
    "",
    "  GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec",
    "  GOOGLE_SHEETS_WEBHOOK_SECRET=a-long-random-secret",
    "",
    "Create the webhook with the script in scripts/google-apps-script-orders.js",
  ].join("\n");
}

export async function appendOrderToSheet(
  order: OrderSubmissionPayload,
  orderId: string,
  emails?: WebhookEmailPayload,
): Promise<{ skipped: boolean; ok?: boolean; emailsSent?: boolean }> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();

  if (!webhookUrl || !secret) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[payka] Google Sheets is not configured. Order was emailed only.",
      );
    }
    return { skipped: true };
  }

  const record = formatOrderSheetRecord(order, orderId);
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, order: record, emails }),
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
  });

  const bodyText = await response.text();
  if (!response.ok) {
    throw new Error(
      `Failed to append order to Google Sheet (${response.status}): ${bodyText}`,
    );
  }

  let parsed: { ok?: boolean; error?: string; emailsSent?: boolean } = {};
  try {
    parsed = JSON.parse(bodyText) as {
      ok?: boolean;
      error?: string;
      emailsSent?: boolean;
    };
  } catch {
    throw new Error(`Google Sheet webhook returned a non-JSON response: ${bodyText}`);
  }

  if (!parsed.ok) {
    throw new Error(parsed.error || "Google Sheet webhook rejected the order.");
  }

  return { skipped: false, ok: true, emailsSent: parsed.emailsSent };
}
