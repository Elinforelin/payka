import nodemailer from "nodemailer";
import type { SentMessageInfo, Transporter } from "nodemailer";
import type {
  OrderEmailContent,
  OrderItemPayload,
  OrderSubmissionPayload,
} from "./order-types";
import { formatDisplayOrderNumber } from "./order-utils";

export { formatDisplayOrderNumber } from "./order-utils";

const DEFAULT_RECIPIENT = "mamenkooo@gmail.com";
const MAX_FIELD_LENGTH = 500;

export function sanitizeText(value: string, maxLength = MAX_FIELD_LENGTH): string {
  return value
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .slice(0, maxLength);
}

export function sanitizePhone(value: string): string {
  return sanitizeText(value, 32).replace(/[^\d+\s()-]/g, "");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatItemLine(item: OrderItemPayload): string {
  const lineTotal = item.price * item.quantity;
  const extras = [
    item.stone ? `Stone: ${item.stone}` : null,
    item.size ? `Size: ${item.size}` : null,
  ].filter(Boolean).join(", ");
  return `- ${item.name} (ID: ${item.id}) x${item.quantity} — ₴${lineTotal}${extras ? ` [${extras}]` : ""}`;
}

function formatItemHtml(item: OrderItemPayload): string {
  const lineTotal = item.price * item.quantity;
  const extras = [
    item.stone ? `<strong>Stone:</strong> ${escapeHtml(item.stone)}` : null,
    item.size ? `<strong>Size:</strong> ${escapeHtml(item.size)}` : null,
  ].filter(Boolean).join(" &nbsp;|&nbsp; ");
  return `<tr>
    <td style="padding:8px;border-bottom:1px solid #eee;">
      ${escapeHtml(item.name)}
      ${extras ? `<br/><span style="font-size:12px;color:#6b5f59;">${extras}</span>` : ""}
    </td>
    <td style="padding:8px;border-bottom:1px solid #eee;">₴${item.price}</td>
    <td style="padding:8px;border-bottom:1px solid #eee;">₴${lineTotal}</td>
  </tr>`;
}

export function formatOrderEmail(
  order: OrderSubmissionPayload,
  orderId: string,
): OrderEmailContent {
  const { shipping, items, subtotal, total, consentTimestamp, comment } = order;
  const orderNumber = formatDisplayOrderNumber(orderId);

  const productLines = items.map(formatItemLine).join("\n");
  const productRows = items.map(formatItemHtml).join("");

  const text = [
    `New Payka order #${orderNumber}`,
    `Order ID: ${orderId}`,
    "",
    "Customer information",
    `Name: ${shipping.fullName}`,
    `Phone: ${shipping.phone}`,
    `City: ${shipping.city || "—"}`,
    `Department: ${shipping.department || "—"}`,
    `Address: ${shipping.address || "—"}`,
    `Shipping method: ${shipping.shippingMethod}`,
    "",
    ...(comment ? ["Comment", comment, ""] : []),
    "Ordered products",
    productLines,
    "",
    `Subtotal: ₴${subtotal}`,
    `Shipping: ₴${shipping.shippingCost}`,
    `Total: ₴${total}`,
    "",
    "Data protection",
    `Privacy consent: yes`,
    `Consent timestamp (UTC): ${consentTimestamp}`,
    `Purpose: order fulfillment only`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html>
  <body style="font-family:Arial,sans-serif;color:#1a1a1a;line-height:1.5;">
    <h2 style="margin-bottom:4px;">New Payka order</h2>
    <p style="margin:12px 0;padding:14px 16px;background:#f7f3ef;border-radius:12px;">
      <span style="display:block;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#a19690;font-weight:bold;">Order number</span>
      <span style="display:block;margin-top:4px;font-size:22px;font-weight:bold;letter-spacing:0.12em;">${escapeHtml(orderNumber)}</span>
    </p>
    <p style="color:#6b5f59;margin-top:0;font-size:12px;">Full Order ID: ${escapeHtml(orderId)}</p>

    <h3>Customer information</h3>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(shipping.fullName)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(shipping.phone)}</li>
      <li><strong>City:</strong> ${escapeHtml(shipping.city || "—")}</li>
      <li><strong>Department:</strong> ${escapeHtml(shipping.department || "—")}</li>
      <li><strong>Address:</strong> ${escapeHtml(shipping.address || "—")}</li>
      <li><strong>Shipping method:</strong> ${escapeHtml(shipping.shippingMethod)}</li>
    </ul>

    ${comment ? `<h3>Comment</h3><p style="background:#fdfaf7;border-left:3px solid #b3917d;padding:10px 14px;margin:0;border-radius:4px;">${escapeHtml(comment)}</p>` : ""}

    <h3>Ordered products</h3>
    <table style="border-collapse:collapse;width:100%;max-width:640px;">
      <thead>
        <tr>
          <th align="left" style="padding:8px;border-bottom:2px solid #b3917d;">Product</th>
          <th align="left" style="padding:8px;border-bottom:2px solid #b3917d;">Unit price</th>
          <th align="left" style="padding:8px;border-bottom:2px solid #b3917d;">Line total</th>
        </tr>
      </thead>
      <tbody>${productRows}</tbody>
    </table>

    <p><strong>Subtotal:</strong> ₴${subtotal}</p>
    <p><strong>Shipping:</strong> ₴${shipping.shippingCost}</p>
    <p><strong>Total:</strong> ₴${total}</p>

    <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
    <p style="font-size:12px;color:#6b5f59;">
      Privacy consent received at ${escapeHtml(consentTimestamp)} (UTC).
      Personal data is processed solely for order fulfillment in accordance with GDPR.
    </p>
  </body>
</html>`;

  return {
    subject: `New Payka order #${orderNumber}`,
    text,
    html,
  };
}

export function getOrderNotificationRecipient(): string {
  return process.env.ORDER_NOTIFICATION_EMAIL?.trim() || DEFAULT_RECIPIENT;
}

export function isSmtpConfigured(): boolean {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  return Boolean(user && pass);
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function isEmailConfigured(): boolean {
  return isResendConfigured() || isSmtpConfigured();
}

export function getEmailSetupInstructions(): string {
  return [
    "Email is not configured.",
    "Add credentials to a .env file in the project root, then restart the dev server.",
    "",
    "Option 1 — Gmail SMTP (recommended for mamenkooo@gmail.com):",
    "  SMTP_HOST=smtp.gmail.com",
    "  SMTP_PORT=587",
    "  SMTP_USER=mamenkooo@gmail.com",
    "  SMTP_PASS=your-16-char-gmail-app-password",
    "  ORDER_NOTIFICATION_EMAIL=mamenkooo@gmail.com",
    "",
    "Create a Gmail App Password: https://myaccount.google.com/apppasswords",
    "",
    "Option 2 — Resend API:",
    "  RESEND_API_KEY=re_xxxxxxxx",
    "  RESEND_FROM=Payka Orders <onboarding@resend.dev>",
  ].join("\n");
}

export function createMailTransport(): Transporter {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 587);

  if (!user || !pass) {
    throw new Error(getEmailSetupInstructions());
  }

  if (host) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

async function createDevelopmentTransport(): Promise<Transporter> {
  const testAccount = await nodemailer.createTestAccount();

  console.warn(
    "[payka] SMTP is not configured. Using a temporary Ethereal test inbox for development.",
  );
  console.warn(
    "[payka] To receive real emails at mamenkooo@gmail.com, add Gmail SMTP credentials to .env.",
  );

  return nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

async function resolveMailTransport(
  transport?: Transporter,
): Promise<Transporter> {
  if (transport) {
    return transport;
  }

  if (isSmtpConfigured()) {
    return createMailTransport();
  }

  if (process.env.NODE_ENV === "development") {
    return createDevelopmentTransport();
  }

  throw new Error(getEmailSetupInstructions());
}

async function sendViaResend(content: OrderEmailContent): Promise<SentMessageInfo> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(getEmailSetupInstructions());
  }

  const from =
    process.env.RESEND_FROM?.trim() || "Payka Orders <onboarding@resend.dev>";
  const to = getOrderNotificationRecipient();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: content.subject,
      html: content.html,
      text: content.text,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to send order email via Resend: ${errorBody}`);
  }

  const result = (await response.json()) as { id?: string };

  return {
    messageId: result.id ?? "resend",
    accepted: [to],
    rejected: [],
    pending: [],
    response: "250 OK",
  } as SentMessageInfo;
}

export async function sendOrderNotification(
  order: OrderSubmissionPayload,
  orderId: string,
  transport?: Transporter,
): Promise<SentMessageInfo> {
  const content = formatOrderEmail(order, orderId);

  if (isResendConfigured()) {
    return sendViaResend(content);
  }

  const mailTransport = await resolveMailTransport(transport);
  const from =
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "Payka Orders <orders@payka.local>";
  const to = getOrderNotificationRecipient();

  const info = await mailTransport.sendMail({
    from,
    to,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.info(`[payka] Development email preview: ${previewUrl}`);
  }

  return info;
}

export function normalizeOrderSubmission(
  input: OrderSubmissionPayload,
): OrderSubmissionPayload {
  if (!input.privacyConsent) {
    throw new Error("Privacy consent is required.");
  }

  if (!Array.isArray(input.items) || input.items.length === 0) {
    throw new Error("Order must include at least one product.");
  }

  const fullName = sanitizeText(input.shipping.fullName, 120);
  const phone = sanitizePhone(input.shipping.phone);

  if (!fullName) {
    throw new Error("Full name is required.");
  }

  if (phone.replace(/\D/g, "").length < 10) {
    throw new Error("A valid phone number is required.");
  }

  const items = input.items.map((item) => ({
    id: Number(item.id),
    name: sanitizeText(item.name, 200),
    quantity: Math.max(1, Math.min(99, Math.floor(Number(item.quantity)))),
    price: Math.max(0, Number(item.price)),
    category: item.category ? sanitizeText(item.category, 80) : undefined,
    stone: item.stone ? sanitizeText(item.stone, 200) : undefined,
    size: item.size ? sanitizeText(item.size, 20) : undefined,
  }));

  return {
    privacyConsent: true,
    consentTimestamp: input.consentTimestamp,
    subtotal: Math.max(0, Number(input.subtotal)),
    total: Math.max(0, Number(input.total)),
    items,
    shipping: {
      fullName,
      phone,
      city: sanitizeText(input.shipping.city, 120),
      department: sanitizeText(input.shipping.department, 200),
      address: sanitizeText(input.shipping.address, 300),
      shippingMethod: sanitizeText(input.shipping.shippingMethod, 120),
      shippingCost: Math.max(0, Number(input.shipping.shippingCost)),
    },
    comment: input.comment ? sanitizeText(input.comment, 500) : undefined,
  };
}
