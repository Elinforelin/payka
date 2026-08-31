import nodemailer from "nodemailer";
import type { SentMessageInfo, Transporter } from "nodemailer";
import type {
  OrderEmailContent,
  OrderItemPayload,
  OrderSubmissionPayload,
} from "./order-types";
import {
  normalizeOrderLocale,
  resolveProductName,
  translateOrderText,
  type OrderLocale,
} from "./order-i18n";
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

export function sanitizeEmail(value: string): string {
  return sanitizeText(value, 254).toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function sanitizeSmtpPassword(value: string): string {
  // Gmail App Passwords are 16 characters; Google displays them with spaces.
  let normalized = value.trim();
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    normalized = normalized.slice(1, -1);
  }
  return normalized.replace(/\s+/g, "");
}

export function getEmailConfigStatus(): {
  smtpConfigured: boolean;
  resendConfigured: boolean;
  recipient: string;
} {
  return {
    smtpConfigured: isSmtpConfigured(),
    resendConfigured: isResendConfigured(),
    recipient: getOrderNotificationRecipient(),
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatItemLine(item: OrderItemPayload, locale: OrderLocale): string {
  const lineTotal = item.price * item.quantity;
  const name = resolveProductName(item.name, locale);
  const extras = [
    item.stone ? `${translateOrderText(locale, "order_email.customer.stone")}: ${item.stone}` : null,
    item.size ? `${translateOrderText(locale, "order_email.customer.size")}: ${item.size}` : null,
  ].filter(Boolean).join(", ");
  return `- ${name} (ID: ${item.id}) x${item.quantity} — ₴${lineTotal}${extras ? ` [${extras}]` : ""}`;
}

function formatItemHtml(item: OrderItemPayload, locale: OrderLocale): string {
  const lineTotal = item.price * item.quantity;
  const name = resolveProductName(item.name, locale);
  const extras = [
    item.stone
      ? `<strong>${escapeHtml(translateOrderText(locale, "order_email.customer.stone"))}:</strong> ${escapeHtml(item.stone)}`
      : null,
    item.size
      ? `<strong>${escapeHtml(translateOrderText(locale, "order_email.customer.size"))}:</strong> ${escapeHtml(item.size)}`
      : null,
  ].filter(Boolean).join(" &nbsp;|&nbsp; ");
  return `<tr>
    <td style="padding:8px;border-bottom:1px solid #eee;">
      ${escapeHtml(name)}
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

  const productLines = items.map((item) => formatItemLine(item, "en")).join("\n");
  const productRows = items.map((item) => formatItemHtml(item, "en")).join("");

  const text = [
    `New Payka order #${orderNumber}`,
    `Order ID: ${orderId}`,
    "",
    "Customer information",
    `Name: ${shipping.fullName}`,
    `Phone: ${shipping.phone}`,
    `Email: ${shipping.email}`,
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
      <li><strong>Email:</strong> ${escapeHtml(shipping.email)}</li>
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

export function formatCustomerConfirmationEmail(
  order: OrderSubmissionPayload,
  orderId: string,
): OrderEmailContent {
  const { shipping, items, subtotal, total, comment } = order;
  const locale = normalizeOrderLocale(order.locale);
  const t = (key: string, vars?: Record<string, string | number>) =>
    translateOrderText(locale, `order_email.customer.${key}`, vars);
  const orderNumber = formatDisplayOrderNumber(orderId);
  const firstName = shipping.fullName.trim().split(/\s+/)[0] || shipping.fullName;

  const productLines = items.map((item) => formatItemLine(item, locale)).join("\n");
  const productRows = items.map((item) => formatItemHtml(item, locale)).join("");

  const text = [
    t("greeting", { firstName }),
    "",
    t("thanks"),
    "",
    t("order_number_label", { orderNumber }),
    "",
    t("order_details"),
    productLines,
    "",
    `${t("subtotal")}: ₴${subtotal}`,
    `${t("shipping")}: ₴${shipping.shippingCost}`,
    `${t("total")}: ₴${total}`,
    "",
    t("delivery"),
    `${t("name")}: ${shipping.fullName}`,
    `${t("phone")}: ${shipping.phone}`,
    `${t("email")}: ${shipping.email}`,
    `${t("method")}: ${shipping.shippingMethod}`,
    `${t("city")}: ${shipping.city || "—"}`,
    `${t("department")}: ${shipping.department || "—"}`,
    `${t("address")}: ${shipping.address || "—"}`,
    ...(comment ? ["", `${t("your_comment")}: ${comment}`] : []),
    "",
    t("next_steps"),
    "",
    t("signoff"),
    "Payka",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="${locale}">
  <body style="font-family:Arial,sans-serif;color:#1a1a1a;line-height:1.5;background:#fdfaf7;margin:0;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:24px;padding:28px 24px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#a19690;font-weight:bold;">Payka</p>
      <h2 style="margin:0 0 16px;font-size:22px;">${escapeHtml(t("html_title"))}</h2>
      <p style="margin:0 0 20px;color:#6b5f59;">${escapeHtml(t("html_intro", { firstName }))}</p>

      <p style="margin:0 0 24px;padding:14px 16px;background:#f7f3ef;border-radius:12px;">
        <span style="display:block;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#a19690;font-weight:bold;">${escapeHtml(t("order_number"))}</span>
        <span style="display:block;margin-top:4px;font-size:22px;font-weight:bold;letter-spacing:0.12em;">${escapeHtml(orderNumber)}</span>
      </p>

      <h3 style="margin:0 0 8px;font-size:16px;">${escapeHtml(t("order_details"))}</h3>
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">
        <thead>
          <tr>
            <th align="left" style="padding:8px;border-bottom:2px solid #b3917d;">${escapeHtml(t("product"))}</th>
            <th align="left" style="padding:8px;border-bottom:2px solid #b3917d;">${escapeHtml(t("unit_price"))}</th>
            <th align="left" style="padding:8px;border-bottom:2px solid #b3917d;">${escapeHtml(t("line_total"))}</th>
          </tr>
        </thead>
        <tbody>${productRows}</tbody>
      </table>

      <p style="margin:4px 0;"><strong>${escapeHtml(t("subtotal"))}:</strong> ₴${subtotal}</p>
      <p style="margin:4px 0;"><strong>${escapeHtml(t("shipping"))}:</strong> ₴${shipping.shippingCost}</p>
      <p style="margin:4px 0 20px;"><strong>${escapeHtml(t("total"))}:</strong> ₴${total}</p>

      <h3 style="margin:0 0 8px;font-size:16px;">${escapeHtml(t("delivery"))}</h3>
      <ul style="margin:0 0 20px;padding-left:18px;color:#6b5f59;">
        <li><strong>${escapeHtml(t("name"))}:</strong> ${escapeHtml(shipping.fullName)}</li>
        <li><strong>${escapeHtml(t("phone"))}:</strong> ${escapeHtml(shipping.phone)}</li>
        <li><strong>${escapeHtml(t("email"))}:</strong> ${escapeHtml(shipping.email)}</li>
        <li><strong>${escapeHtml(t("method"))}:</strong> ${escapeHtml(shipping.shippingMethod)}</li>
        <li><strong>${escapeHtml(t("city"))}:</strong> ${escapeHtml(shipping.city || "—")}</li>
        <li><strong>${escapeHtml(t("department"))}:</strong> ${escapeHtml(shipping.department || "—")}</li>
        <li><strong>${escapeHtml(t("address"))}:</strong> ${escapeHtml(shipping.address || "—")}</li>
      </ul>

      ${comment ? `<p style="margin:0 0 20px;padding:12px 14px;background:#fdfaf7;border-left:3px solid #b3917d;border-radius:4px;color:#6b5f59;"><strong>${escapeHtml(t("your_comment"))}:</strong> ${escapeHtml(comment)}</p>` : ""}

      <p style="margin:0;font-size:13px;color:#6b5f59;">
        ${escapeHtml(t("next_steps"))}
      </p>
      <p style="margin:16px 0 0;font-size:13px;color:#1a1a1a;"><strong>${escapeHtml(t("signoff"))}<br/>Payka</strong></p>
    </div>
  </body>
</html>`;

  return {
    subject: t("subject", { orderNumber }),
    text,
    html,
  };
}

export function getOrderNotificationRecipient(): string {
  return process.env.ORDER_NOTIFICATION_EMAIL?.trim() || DEFAULT_RECIPIENT;
}

export function isSmtpConfigured(): boolean {
  const user = process.env.SMTP_USER?.trim();
  const pass = sanitizeSmtpPassword(process.env.SMTP_PASS || "");
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
    "  SMTP_PASS=\"your16chargmailapppassword\"",
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
  const pass = sanitizeSmtpPassword(process.env.SMTP_PASS || "");
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 587);

  if (!user || !pass) {
    throw new Error(getEmailSetupInstructions());
  }

  const transportOptions = {
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  };

  if (host) {
    return nodemailer.createTransport({
      ...transportOptions,
      host,
      port,
      secure: port === 465,
      requireTLS: port === 587,
    });
  }

  return nodemailer.createTransport({
    ...transportOptions,
    service: "gmail",
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

async function sendViaResend(
  content: OrderEmailContent,
  to: string,
): Promise<SentMessageInfo> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(getEmailSetupInstructions());
  }

  const from =
    process.env.RESEND_FROM?.trim() || "Payka Orders <onboarding@resend.dev>";

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

async function sendViaSmtp(
  content: OrderEmailContent,
  to: string,
  transport?: Transporter,
): Promise<SentMessageInfo> {
  const mailTransport = await resolveMailTransport(transport);
  const from =
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "Payka Orders <orders@payka.local>";

  const info = await mailTransport.sendMail({
    from,
    to,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.info(`[payka] Development email preview (${to}): ${previewUrl}`);
  }

  return info;
}

async function sendEmailMessage(
  content: OrderEmailContent,
  to: string,
  transport?: Transporter,
): Promise<SentMessageInfo> {
  if (isResendConfigured() && !transport) {
    return sendViaResend(content, to);
  }
  return sendViaSmtp(content, to, transport);
}

export async function sendOrderNotification(
  order: OrderSubmissionPayload,
  orderId: string,
  transport?: Transporter,
): Promise<SentMessageInfo> {
  const shopContent = formatOrderEmail(order, orderId);
  const shopInfo = await sendEmailMessage(
    shopContent,
    getOrderNotificationRecipient(),
    transport,
  );

  const customerEmail = order.shipping.email?.trim();
  if (customerEmail) {
    try {
      const customerContent = formatCustomerConfirmationEmail(order, orderId);
      await sendEmailMessage(customerContent, customerEmail, transport);
    } catch (error) {
      console.error("[payka] Failed to send customer confirmation email:", error);
    }
  }

  return shopInfo;
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
  const email = sanitizeEmail(input.shipping.email);

  if (!fullName) {
    throw new Error("Full name is required.");
  }

  if (phone.replace(/\D/g, "").length < 10) {
    throw new Error("A valid phone number is required.");
  }

  if (!email || !isValidEmail(email)) {
    throw new Error("A valid email address is required.");
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
      email,
      city: sanitizeText(input.shipping.city, 120),
      department: sanitizeText(input.shipping.department, 200),
      address: sanitizeText(input.shipping.address, 300),
      shippingMethod: sanitizeText(input.shipping.shippingMethod, 120),
      shippingCost: Math.max(0, Number(input.shipping.shippingCost)),
    },
    comment: input.comment ? sanitizeText(input.comment, 500) : undefined,
    locale: normalizeOrderLocale(input.locale),
  };
}
