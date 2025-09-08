import { create } from "zustand";
import { addToCart } from "@/api/cartapi";
import { CartItem } from "@/types/cart";
import { toast } from "sonner";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  setCart: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: async (item) => {
    try {
      const res = await addToCart({
        productId: item.productId,
        qty: item.qty,
        userId: item.userId,
      });

      console.log("cart API response:", res);

      if (res?.message?.toLowerCase().includes("already")) {
        toast.info(res.message);
        return;
      }

      if (res?.message?.toLowerCase().includes("added")) {
        set(() => ({
          items: res.cart.items, // use backend cart
        }));
        toast.success(res.message);
      }
    } catch (err) {
      toast.error("Failed to add item to cart!");
      console.error("Failed to add cart item:", err);
    }
  },

  setCart: (items) => set({ items }),
}));
