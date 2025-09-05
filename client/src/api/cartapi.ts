

import api from "@/services/api";


interface AddToCartBody {
  productId: string;
  qty?: number;
  userId?:String
 
}

export const addToCart = async (body: AddToCartBody) => {
  console.log(body,"in api folder")
  try {
    const response = await api.post(`/cart/addtocart`, body);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
}
