import api from "@/services/api";

export const getWishlistApi = async () => {
  const res = await api.get("/wishlist");
  return res.data;
};

export const toggleWishlistApi = async (productId: string) => {
  const res = await api.post("/wishlist/toggle", { productId });
  return res.data;
};
