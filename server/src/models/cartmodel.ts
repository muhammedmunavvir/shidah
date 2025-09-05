import { Schema, model, Document, Types } from "mongoose";

interface CartItem {
  productId: Types.ObjectId; // Reference to Product
  qty: number;
}

export interface Cart extends Document {
  userId: Types.ObjectId; // Reference to User
  items: CartItem[];
}

const cartItemSchema = new Schema<CartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, required: true, min: 1 }
});

const cartSchema = new Schema<Cart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [cartItemSchema]
}, { timestamps: true });

export const CartModel = model<Cart>("usercarts", cartSchema);
