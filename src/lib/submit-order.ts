import { createServerFn } from "@tanstack/react-start";
import type { OrderSubmissionPayload } from "./order-types";
import {
  normalizeOrderSubmission,
  sendOrderNotification,
} from "./order-email";

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: OrderSubmissionPayload) => data)
  .handler(async ({ data }) => {
    const order = normalizeOrderSubmission(data);
    const orderId = crypto.randomUUID();

    await sendOrderNotification(order, orderId);

    return {
      success: true as const,
      orderId,
    };
  });
