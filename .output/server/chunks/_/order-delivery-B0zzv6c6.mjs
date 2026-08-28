import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { s as sendOrderNotification, i as isEmailConfigured, r as resolveProductName } from "./submit-order-BveGTyY9.mjs";
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
import "node:url";
import "tiny-invariant";
import "seroval";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
import "nodemailer";
import "./uk-CdVMwhvi.mjs";
let loadedFromCwd = null;
function parseEnvValue(raw) {
  const value = raw.trim();
  if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1);
  }
  return value;
}
function loadRuntimeEnv() {
  const cwd = process.cwd();
  if (loadedFromCwd === cwd) {
    return;
  }
  loadedFromCwd = cwd;
  for (const fileName of [".env", ".env.local"]) {
    const envPath = resolve(process.cwd(), fileName);
    if (!existsSync(envPath)) {
      continue;
    }
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
}
function isGoogleSheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim() && process.env.GOOGLE_SHEETS_WEBHOOK_SECRET?.trim()
  );
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
async function appendOrderToSheet(order, orderId) {
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
    body: JSON.stringify({ secret, order: record }),
    redirect: "follow",
    signal: AbortSignal.timeout(15e3)
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
  return { skipped: false, ok: true };
}
const ORDER_DELIVERY_FAILED = "ORDER_DELIVERY_FAILED";
async function deliverOrder(order, orderId) {
  loadRuntimeEnv();
  let emailSent = false;
  let sheetSaved = false;
  let emailError;
  let sheetError;
  try {
    await sendOrderNotification(order, orderId);
    emailSent = true;
  } catch (error) {
    emailError = error;
    console.error("[payka] Failed to send order email:", error);
  }
  try {
    const sheetResult = await appendOrderToSheet(order, orderId);
    sheetSaved = !sheetResult.skipped;
  } catch (error) {
    sheetError = error;
    console.error("[payka] Failed to append order to Google Sheet:", error);
  }
  if (!emailSent && !sheetSaved) {
    console.error("[payka] Order delivery failed for all channels.", {
      emailConfigured: isEmailConfigured(),
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
