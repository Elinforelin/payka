export interface OrderItemPayload {
  id: number;
  name: string;
  quantity: number;
  price: number;
  category?: string;
  /** Stone type, or legacy "type, color" combined string */
  stone?: string;
  stoneColor?: string;
  size?: string;
}

export interface ShippingInfoPayload {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  department: string;
  address: string;
  shippingMethod: string;
  shippingCost: number;
}

export interface OrderSubmissionPayload {
  items: OrderItemPayload[];
  shipping: ShippingInfoPayload;
  subtotal: number;
  total: number;
  privacyConsent: boolean;
  consentTimestamp: string;
  comment?: string;
  locale?: string;
}

export interface OrderEmailContent {
  subject: string;
  text: string;
  html: string;
}
