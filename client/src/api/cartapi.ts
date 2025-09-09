import api from "@/services/api";
import { useAuthStore } from "@/store/useAuthstore";

interface AddToCartBody {
  productId?: string;
  qty?: number;
  userId?: String;
}

export const addToCart = async (body: AddToCartBody) => {
  try {
    const response = await api.post(`/cart/addtocart`, body);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
};

export const getusercartapi = async () => {
 const { user } = useAuthStore.getState();
  const userId = user?.id;
  try {
    const response = await api.get(`/cart/getusercart/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
