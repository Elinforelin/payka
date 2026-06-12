import { formatOrderEmail, getEmailSetupInstructions, isEmailConfigured, sendOrderNotification } from "../src/lib/order-email.ts";
import type { OrderSubmissionPayload } from "../src/lib/order-types.ts";

const sampleOrder: OrderSubmissionPayload = {
  privacyConsent: true,
  consentTimestamp: new Date().toISOString(),
  subtotal: 2700,
  total: 2705,
  items: [
    {
      id: 6,
      name: "product.names.ring_plava",
      quantity: 1,
      price: 2700,
      category: "Rings",
    },
  ],
  shipping: {
    fullName: "Payka Test Customer",
    phone: "+380991234567",
    city: "Kyiv",
    department: "Test Branch",
    address: "",
    shippingMethod: "Nova Poshta (to Department)",
    shippingCost: 5,
  },
};

async function main() {
  if (!isEmailConfigured()) {
    console.error(getEmailSetupInstructions());
    process.exit(1);
  }

  const orderId = `test-${Date.now()}`;
  const content = formatOrderEmail(sampleOrder, orderId);

  console.log("Sending test order email...");
  console.log(`Recipient: ${process.env.ORDER_NOTIFICATION_EMAIL || "mamenkooo@gmail.com"}`);
  console.log(`Subject: ${content.subject}`);

  const info = await sendOrderNotification(sampleOrder, orderId);

  console.log("Test email sent successfully.");
  console.log(`Message ID: ${info.messageId}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
