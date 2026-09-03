/**
 * Payka — Google Sheet order webhook
 *
 * Setup:
 * 1. Create a Google Sheet (for example "Payka Orders").
 * 2. Extensions → Apps Script. Delete the starter code and paste this file.
 * 3. Set WEBHOOK_SECRET below to the same value as GOOGLE_SHEETS_WEBHOOK_SECRET in .env.
 * 4. Deploy → New deployment → type "Web app".
 *      Execute as: Me
 *      Who has access: Anyone
 * 5. Copy the web app URL into GOOGLE_SHEETS_WEBHOOK_URL in .env.
 * 6. Keep the spreadsheet private — share it only with your own Google account.
 * 7. On Vercel (SMTP blocked): set SEND_EMAIL_VIA_GOOGLE_SCRIPT=true in .env / hosting panel.
 *    The script sends shop + customer emails via GmailApp (HTTPS, no custom domain needed).
 *    Deploy the script as payka.jwlr@gmail.com so emails come from that inbox.
 *
 * After any later edit, Deploy → Manage deployments → the pencil → New version.
 */

const WEBHOOK_SECRET = "PaykaWh2026-K7mNx4qR2p";
const SHEET_NAME = "Orders";

const COLUMNS = [
  ["Received at (UTC)", (order) => order.receivedAt],
  ["Order number", (order) => order.orderNumber],
  ["Order ID", (order) => order.orderId],
  ["Full name", (order) => order.fullName],
  ["Phone", (order) => order.phone],
  ["Email", (order) => order.email],
  ["City", (order) => order.city],
  ["Nova Poshta department", (order) => order.department],
  ["Address", (order) => order.address],
  ["Shipping method", (order) => order.shippingMethod],
  ["Products", (order) => order.products],
  ["Subtotal", (order) => order.subtotal],
  ["Shipping cost", (order) => order.shippingCost],
  ["Total", (order) => order.total],
  ["Comment", (order) => order.comment],
  ["Privacy consent", (order) => order.privacyConsent],
  ["Consent timestamp (UTC)", (order) => order.consentTimestamp],
];

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function getOrdersSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const existing = spreadsheet.getSheetByName(SHEET_NAME);
  if (existing) {
    return existing;
  }
  return spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaderRow(sheet) {
  const headers = COLUMNS.map(([title]) => title);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    return;
  }

  const currentHeaders = sheet
    .getRange(1, 1, 1, headers.length)
    .getValues()[0]
    .map((value) => String(value));
  if (currentHeaders.join("|") !== headers.join("|")) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function doGet() {
  return json({ ok: true, service: "payka-orders" });
}

/** Run once from the Apps Script editor to grant Gmail send permission. */
function authorizeGmailSend() {
  GmailApp.sendEmail(
    Session.getActiveUser().getEmail(),
    "Payka Gmail authorization test",
    "Gmail send works. You can delete this message.",
  );
}

function doPost(event) {
  try {
    if (!event || !event.postData || !event.postData.contents) {
      return json({ ok: false, error: "Empty request body" });
    }

    const payload = JSON.parse(event.postData.contents);
    if (!payload || payload.secret !== WEBHOOK_SECRET) {
      return json({ ok: false, error: "Unauthorized" });
    }

    const order = payload.order;
    if (!order || !order.orderId) {
      return json({ ok: false, error: "Missing order payload" });
    }

    const sheet = getOrdersSheet();
    ensureHeaderRow(sheet);
    sheet.appendRow(COLUMNS.map(([, read]) => read(order)));

    let emailsSent = false;
    let emailError = null;
    if (payload.emails) {
      try {
        emailsSent = sendOrderEmails(payload.emails);
      } catch (error) {
        emailError = String(error);
      }
    }

    return json({ ok: true, emailsSent, emailError });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

function sendOrderEmails(emails) {
  let sentAny = false;

  if (emails.shop) {
    try {
      sentAny = sendWebhookEmail(emails.shop) || sentAny;
    } catch (error) {
      throw new Error("Shop email failed: " + error);
    }
  }

  if (emails.customer && emails.customer.to) {
    try {
      sentAny = sendWebhookEmail(emails.customer) || sentAny;
    } catch (error) {
      if (sentAny) {
        // Shop email went out; don't fail the whole order for customer email only.
        console.error("Customer email failed: " + error);
        return sentAny;
      }
      throw new Error("Customer email failed: " + error);
    }
  }

  return sentAny;
}

function sendWebhookEmail(message) {
  if (!message || !message.to || !message.subject) {
    return false;
  }

  GmailApp.sendEmail(String(message.to), String(message.subject), String(message.text || ""), {
    htmlBody: String(message.html || ""),
    name: "Payka Orders",
  });

  return true;
}
