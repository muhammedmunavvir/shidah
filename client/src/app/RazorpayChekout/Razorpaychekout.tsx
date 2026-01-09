"use client";

import { verifyPaymentApi } from "@/api/CreateOrderapi";
import { toast } from "sonner";
interface RazorpayOptions {
  key: string;
  orderId: string; // Razorpay order id (from backend)
  dbOrderId: string; // MongoDB order id (to verify)
  amount: number;
  name: string;
  description?: string;
  currency: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export const openRazorpay = (
  options: RazorpayOptions,
  setProcessingPayment: any
) => {
  //const router=useRouter()
  if (typeof window === "undefined") return;
  setProcessingPayment(true);

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
          toast.success("Payment verified successfully!");
          window.location.replace(
            `/order-summary?orderId=${options.dbOrderId}`
          );
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
        setProcessingPayment(false);
        toast.info("Payment cancelled by user");
      },
    },
  };

  const rzp = new (window as any).Razorpay(razorpayOptions);
  rzp.open();
};
