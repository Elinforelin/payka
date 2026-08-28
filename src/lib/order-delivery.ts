import { loadRuntimeEnv } from "./load-runtime-env";
import type { OrderSubmissionPayload } from "./order-types";
import {
  isEmailConfigured,
  sendOrderNotification,
} from "./order-email";
import { appendOrderToSheet, isGoogleSheetsConfigured } from "./order-sheet";

export const ORDER_DELIVERY_FAILED = "ORDER_DELIVERY_FAILED";

export async function deliverOrder(
  order: OrderSubmissionPayload,
  orderId: string,
): Promise<{ emailSent: boolean; sheetSaved: boolean }> {
  loadRuntimeEnv();

  let emailSent = false;
  let sheetSaved = false;
  let emailError: unknown;
  let sheetError: unknown;

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
      sheetError: sheetError instanceof Error ? sheetError.message : sheetError,
    });
    throw new Error(ORDER_DELIVERY_FAILED);
  }

  return { emailSent, sheetSaved };
}
