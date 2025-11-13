export interface Order {
  _id: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed" | "refunded";
  razorpayPaymentId: string;

  userInfo: {
    userId: string;
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    PhoneNumber: string;
  };

  shippingAddress: {
    StreetAddress: string;
    Appartment: string;
    City: string;
    State: string;
    PinCode: string;
  };

  orderItems: Array<{
    _id: string;
    id: { $oid: string };
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;

  subtotal: number;
  shippingCharge: number;
  tax: number;
  total: number;

  createdAt: { $date: string };
  updatedAt: { $date: string };
}
