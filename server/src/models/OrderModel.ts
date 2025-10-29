import mongoose, { Schema, Document } from "mongoose";

interface OrderItem {
  id: mongoose.Schema.Types.ObjectId; // previously Number ❌
  name: string;
  price: number;
  quantity: number;
  image: string; // store only 1 image (string)
}

interface Order extends Document {
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  status: string;
  userInfo: object;
  shippingAddress: object;
  orderItems: OrderItem[];
  subtotal: number;
  shippingCharge: number;
  tax: number;
  total: number;
}

const OrderSchema = new Schema<Order>(
  {
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    userInfo: { type: Object, required: true },
    shippingAddress: { type: Object, required: true },
    orderItems: [
      {
        id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    subtotal: Number,
    shippingCharge: Number,
    tax: Number,
    total: Number,
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<Order>("Order", OrderSchema);
