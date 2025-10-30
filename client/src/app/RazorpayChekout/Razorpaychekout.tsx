"use client";

import { verifyPaymentApi } from "@/api/CreateOrderapi";
import { toast } from "sonner";
import { useRouter } from "next/router";
interface RazorpayOptions {
  key: string;
  orderId: string; // Razorpay order id (from backend)
  dbOrderId: string; // MongoDB order id (to verify)
  amount: number;
  name: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export const openRazorpay = (options: RazorpayOptions) => {
  //const router=useRouter()
  if (typeof window === "undefined") return;

  const razorpayOptions = {
    key: options.key,
    amount: options.amount * 100,
    currency: "INR",
    name: options.name,
    description: options.description || "Order Payment",
    order_id: options.orderId, // Razorpay order id
    prefill: options.prefill,
    theme: { color: "#2563EB" },
    handler: async function (response: any) {
      try {
        const result = await verifyPaymentApi({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          dbOrderId: options.dbOrderId, // MongoDB Order ID
        });

        if (result.success) {
          toast.success(" Payment verified successfully!");
          setTimeout(() => {
            window.location.href = "/order-summary";
          }, 1500);
        } else {
          toast.error(" Payment verification failed");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        toast.error(" Error verifying payment");
      }
    },
    modal: {
      ondismiss: function () {
        toast.info("Payment cancelled by user");
      },
    },
  };

  const rzp = new (window as any).Razorpay(razorpayOptions);
  rzp.open();
};
