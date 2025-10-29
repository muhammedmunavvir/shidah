import Razorpay from "razorpay";
import crypto from "crypto";
import { Request, Response } from "express";
import ProductModel from "../models/product";
import { OrderModel } from "../models/OrderModel";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { contact, shipping, items } = req.body;

    if (!contact || !shipping || !items?.length)
      return res
        .status(400)
        .json({ success: false, message: "Incomplete order data" });

    // ✅ 1. Fetch product details from DB to ensure valid data
    const formattedItems = await Promise.all(
      items.map(async (item: any) => {
        const product = await ProductModel.findById(item.productId);
        if (!product) throw new Error("Invalid product reference");

        return {
          id: product._id,
          name: product.name,
          price: product.discountPrice,
          quantity: item.qty,
          image: product.images?.[0] || "",
        };
      })
    );

    //  Calculate amounts
    const subtotal = formattedItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    // const shippingCharge = subtotal > 1000 ? 0 : 49; // free shipping rule
    // const tax = subtotal * 0.05; // 5% GST
    //  const total = subtotal + shippingCharge + tax;
    const shippingCharge = 0;// free shipping rule
    const tax =0 // 5% GST
    const total = subtotal 

    const razorpay = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID!,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET!,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100), // in paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    //  Store order in DB with `pending` status
    const orderDoc = await OrderModel.create({
      razorpayOrderId: razorpayOrder.id,
      amount: total,
      currency: "INR",
      status: "pending",
      userInfo: contact,
      shippingAddress: shipping,
      orderItems: formattedItems,
      subtotal,
      shippingCharge,
      tax,
      total,
    });

    
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: razorpayOrder,
      dbOrderId: orderDoc._id,
    });
  } catch (error: any) {
    console.error("Order creation failed:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET!)
      .update(body)
      .digest("hex");


    if (expectedSignature === razorpay_signature) {
      await OrderModel.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "paid", razorpayPaymentId: razorpay_payment_id }
      );

      return res
        .status(200)
        .json({ success: true, message: "Payment verified" });
    }

    res.status(400).json({ success: false, message: "Invalid signature" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
};
