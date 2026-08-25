import { createServerFn } from "@tanstack/react-start";
import type { OrderSubmissionPayload } from "./order-types";
import {
  normalizeOrderSubmission,
  sendOrderNotification,
} from "./order-email";
import { appendOrderToSheet } from "./order-sheet";

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: OrderSubmissionPayload) => data)
  .handler(async ({ data }) => {
    const order = normalizeOrderSubmission(data);
    const orderId = crypto.randomUUID();

    await sendOrderNotification(order, orderId);

    try {
      await appendOrderToSheet(order, orderId);
    } catch (error) {
      console.error("[payka] Failed to append order to Google Sheet:", error);
    }

    return {
      success: true as const,
      orderId,
    };
  });
