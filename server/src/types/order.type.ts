// @ts-nocheck
export interface IOrder extends Document {
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "failed";
  userInfo: IUserContactInformation;
  shippingAddress: IUserShippingAddress;
  orderItems: IOrderItem[];
  subtotal: number;
  shippingCharge: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}