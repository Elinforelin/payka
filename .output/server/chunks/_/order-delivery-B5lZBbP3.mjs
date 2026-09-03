import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { s as sendOrderNotification, g as getEmailConfigStatus, i as isEmailConfigured, f as formatOrderEmail, a as formatCustomerConfirmationEmail, b as getOrderNotificationRecipient, r as resolveProductName } from "./submit-order-4po4xuuB.mjs";
import { f as formatDisplayOrderNumber } from "./order-utils-BauBHm_E.mjs";
import "./server.mjs";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "../../index.mjs";
import "node:http";
import "node:stream";
import "node:https";
import "node:http2";
import "tiny-invariant";
import "seroval";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "nodemailer";
import "./uk-BZ-42kaA.mjs";
let loaded = false;
function parseEnvValue(raw) {
  const value = raw.trim();
  if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }
  return value;
}
function loadEnvFile(envPath) {
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = parseEnvValue(trimmed.slice(separatorIndex + 1));
    if (key && process.env[key] === void 0) {
      process.env[key] = value;
    }
  }
}
function findEnvFilePaths(fileName) {
  const candidates = /* @__PURE__ */ new Set();
  let dir = process.cwd();
  for (let depth = 0; depth < 6; depth += 1) {
    candidates.add(resolve(dir, fileName));
    const parent = resolve(dir, "..");
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  try {
    const moduleDir = dirname(fileURLToPath(import.meta.url));
    dir = moduleDir;
    for (let depth = 0; depth < 6; depth += 1) {
      candidates.add(resolve(dir, fileName));
      const parent = resolve(dir, "..");
      if (parent === dir) {
        break;
      }
      dir = parent;
    }
  } catch {
  }
  return [...candidates].filter((envPath) => existsSync(envPath));
}
function loadRuntimeEnv() {
  if (loaded) {
    return;
  }
  loaded = true;
  for (const fileName of [".env", ".env.local"]) {
    for (const envPath of findEnvFilePaths(fileName)) {
      loadEnvFile(envPath);
    }
  }
}
function isGoogleSheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim() && process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim()
  );
}
function isGoogleScriptEmailEnabled() {
  return process.env.SEND_EMAIL_VIA_GOOGLE_SCRIPT?.trim().toLowerCase() === "true" && isGoogleSheetsConfigured();
}
function formatOrderProducts(items) {
  return items.map((item) => {
    const extras = [
      item.size ? `Size: ${item.size}` : null,
      item.stone ? `Stone: ${item.stone}` : null
    ].filter(Boolean).join(", ");
    const lineTotal = item.price * item.quantity;
    return `${resolveProductName(item.name, "en")} x${item.quantity} — ₴${lineTotal}${extras ? ` [${extras}]` : ""}`;
  }).join("\n");
}
function formatOrderSheetRecord(order, orderId, receivedAt = (/* @__PURE__ */ new Date()).toISOString()) {
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
    consentTimestamp: order.consentTimestamp
  };
}
async function appendOrderToSheet(order, orderId, emails) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim();
  if (!webhookUrl || !secret) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[payka] Google Sheets is not configured. Order was emailed only."
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
    signal: AbortSignal.timeout(3e4)
  });
  const bodyText = await response.text();
  if (!response.ok) {
    throw new Error(
      `Failed to append order to Google Sheet (${response.status}): ${bodyText}`
    );
  }
  let parsed = {};
  try {
    parsed = JSON.parse(bodyText);
  } catch {
    throw new Error(`Google Sheet webhook returned a non-JSON response: ${bodyText}`);
  }
  if (!parsed.ok) {
    throw new Error(parsed.error || "Google Sheet webhook rejected the order.");
  }
  if (parsed.emailError) {
    console.warn("[payka] Google Apps Script saved the order but email failed:", parsed.emailError);
  }
  return { skipped: false, ok: true, emailsSent: parsed.emailsSent };
}
const ORDER_DELIVERY_FAILED = "ORDER_DELIVERY_FAILED";
function buildWebhookEmails(order, orderId) {
  const shopContent = formatOrderEmail(order, orderId);
  const customerContent = formatCustomerConfirmationEmail(order, orderId);
  return {
    shop: {
      to: getOrderNotificationRecipient(),
      subject: shopContent.subject,
      html: shopContent.html,
      text: shopContent.text
    },
    customer: {
      to: order.shipping.email,
      subject: customerContent.subject,
      html: customerContent.html,
      text: customerContent.text
    }
  };
}
async function deliverOrder(order, orderId) {
  loadRuntimeEnv();
  let emailSent = false;
  let sheetSaved = false;
  let emailError;
  let sheetError;
  if (isGoogleScriptEmailEnabled()) {
    try {
      const sheetResult = await appendOrderToSheet(
        order,
        orderId,
        buildWebhookEmails(order, orderId)
      );
      sheetSaved = !sheetResult.skipped;
      emailSent = Boolean(sheetResult.emailsSent);
      if (sheetSaved && !emailSent) {
        console.warn("[payka] Order saved to Google Sheet but email was not sent.");
      }
    } catch (error) {
      sheetError = error;
      emailError = error;
      console.error("[payka] Failed to deliver order via Google Apps Script:", error);
    }
  } else {
    try {
      await sendOrderNotification(order, orderId);
      emailSent = true;
    } catch (error) {
      emailError = error;
      console.error("[payka] Failed to send order email:", error);
      console.error("[payka] Email config status:", getEmailConfigStatus());
    }
    try {
      const sheetResult = await appendOrderToSheet(order, orderId);
      sheetSaved = !sheetResult.skipped;
    } catch (error) {
      sheetError = error;
      console.error("[payka] Failed to append order to Google Sheet:", error);
    }
  }
  if (!emailSent && !sheetSaved) {
    console.error("[payka] Order delivery failed for all channels.", {
      emailConfigured: isEmailConfigured(),
      googleScriptEmail: isGoogleScriptEmailEnabled(),
      sheetsConfigured: isGoogleSheetsConfigured(),
      emailError: emailError instanceof Error ? emailError.message : emailError,
      sheetError: sheetError instanceof Error ? sheetError.message : sheetError
    });
    throw new Error(ORDER_DELIVERY_FAILED);
  }
  return { emailSent, sheetSaved };
}
export {
  ORDER_DELIVERY_FAILED,
  deliverOrder
};
