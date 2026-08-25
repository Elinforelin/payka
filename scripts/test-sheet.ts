import {
  appendOrderToSheet,
  formatOrderSheetRecord,
  getGoogleSheetsSetupInstructions,
  isGoogleSheetsConfigured,
} from "../src/lib/order-sheet.ts";
import type { OrderSubmissionPayload } from "../src/lib/order-types.ts";

const sampleOrder: OrderSubmissionPayload = {
  privacyConsent: true,
  consentTimestamp: new Date().toISOString(),
  subtotal: 2700,
  total: 2705,
  comment: "Google Sheet test order",
  items: [
    {
      id: 6,
      name: "product.names.ring_plava",
      quantity: 1,
      price: 2700,
      category: "Rings",
      size: "17",
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
  if (!isGoogleSheetsConfigured()) {
    console.error(getGoogleSheetsSetupInstructions());
    process.exit(1);
  }

  const orderId = `test-${Date.now()}`;
  const record = formatOrderSheetRecord(sampleOrder, orderId);

  console.log("Appending test order to Google Sheet...");
  console.log(`Order number: ${record.orderNumber}`);
  console.log(`Customer: ${record.fullName} / ${record.phone}`);

  const result = await appendOrderToSheet(sampleOrder, orderId);

  console.log("Test order appended successfully.");
  console.log(result);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
