import { createServerFn } from "@tanstack/react-start";
import type { OrderSubmissionPayload } from "./order-types";
import {
  normalizeOrderSubmission,
  sendOrderNotification,
} from "./order-email";
import { appendOrderToSheet } from "./order-sheet";

export const ORDER_DELIVERY_FAILED = "ORDER_DELIVERY_FAILED";

export async function deliverOrder(
  order: OrderSubmissionPayload,
  orderId: string,
): Promise<{ emailSent: boolean; sheetSaved: boolean }> {
  let emailSent = false;
  let sheetSaved = false;

  try {
    await sendOrderNotification(order, orderId);
    emailSent = true;
  } catch (error) {
    console.error("[payka] Failed to send order email:", error);
  }

  try {
    const sheetResult = await appendOrderToSheet(order, orderId);
    sheetSaved = !sheetResult.skipped;
  } catch (error) {
    console.error("[payka] Failed to append order to Google Sheet:", error);
  }

  if (!emailSent && !sheetSaved) {
    throw new Error(ORDER_DELIVERY_FAILED);
  }

  return { emailSent, sheetSaved };
}

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: OrderSubmissionPayload) => data)
  .handler(async ({ data }) => {
    const order = normalizeOrderSubmission(data);
    const orderId = crypto.randomUUID();

    await deliverOrder(order, orderId);

    return {
      success: true as const,
      orderId,
    };
  });
