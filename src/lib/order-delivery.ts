import { loadRuntimeEnv } from "./load-runtime-env";
import type { OrderSubmissionPayload } from "./order-types";
import {
  formatCustomerConfirmationEmail,
  formatOrderEmail,
  getEmailConfigStatus,
  getOrderNotificationRecipient,
  isEmailConfigured,
  sendOrderNotification,
} from "./order-email";
import {
  appendOrderToSheet,
  isGoogleScriptEmailEnabled,
  isGoogleSheetsConfigured,
  type WebhookEmailPayload,
} from "./order-sheet";

export const ORDER_DELIVERY_FAILED = "ORDER_DELIVERY_FAILED";

function buildWebhookEmails(
  order: OrderSubmissionPayload,
  orderId: string,
): WebhookEmailPayload {
  const shopContent = formatOrderEmail(order, orderId);
  const customerContent = formatCustomerConfirmationEmail(order, orderId);

  return {
    shop: {
      to: getOrderNotificationRecipient(),
      subject: shopContent.subject,
      html: shopContent.html,
      text: shopContent.text,
    },
    customer: {
      to: order.shipping.email,
      subject: customerContent.subject,
      html: customerContent.html,
      text: customerContent.text,
    },
  };
}

export async function deliverOrder(
  order: OrderSubmissionPayload,
  orderId: string,
): Promise<{ emailSent: boolean; sheetSaved: boolean }> {
  loadRuntimeEnv();

  let emailSent = false;
  let sheetSaved = false;
  let emailError: unknown;
  let sheetError: unknown;

  if (isGoogleScriptEmailEnabled()) {
    try {
      const sheetResult = await appendOrderToSheet(
        order,
        orderId,
        buildWebhookEmails(order, orderId),
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
      sheetError: sheetError instanceof Error ? sheetError.message : sheetError,
    });
    throw new Error(ORDER_DELIVERY_FAILED);
  }

  return { emailSent, sheetSaved };
}
