import api from "@/services/api";
import { useAuthStore } from "@/store/useAuthstore";

interface OrderPayload {
  contact: {
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    PhoneNumber: string;
  };
  shipping: {
    StreetAddress: string;
    Appartment?: string;
    City: string;
    State: string;
    PinCode: string;
  };
  items: any[];
  amount: number;
}

export const createOrderApi = async (orderData: OrderPayload) => {
  const { user } = useAuthStore.getState();
  const userId = user?.id;

  if (!userId) throw new Error("User not logged in");

  try {
    const response = await api.post(`/order/create/${userId}`, orderData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating order:", error);
    throw new Error(error?.response?.data?.message || "Failed to create order");
  }
};
export const verifyPaymentApi = async (data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  dbOrderId: string; // MongoDB order ID
}) => {
  try {
    const response = await api.post("/order/verify", data);
    return response.data;
  } catch (error: any) {
    console.error(" Error verifying payment:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to verify payment"
    );
  }
};
