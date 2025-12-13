import { create } from "zustand";
import {
  addToCart,
  getusercartapi,
  removeitemapi,
  updateQuantityApi,
} from "@/api/cartapi";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useAuthStore } from "./useAuthstore";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  setCart: (items: CartItem[]) => void;
  Getitem: () => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, newQty: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addItem: async (item: CartItem) => {
    try {
      const res = await addToCart({
        productId:
          typeof item.productId === "string"
            ? item.productId
            : item.productId?._id,
        qty: item.qty,
        userId: item.userId,
      });
      
      if (res?.message?.toLowerCase().includes("already")) {
        toast.info(res.message);
        return;
      }
      
      if (res?.message?.toLowerCase().includes("added")) {
        set({ items: res.cart.items });
        toast.success(res.message);
      }
    } catch (err) {
      toast.error("Failed to add item to cart!");
      console.error("Failed to add cart item:", err);
    }
  },

  setCart: (items: CartItem[]) => set({ items }),
  
  Getitem: async () => {
    const { user, loading } = useAuthStore.getState();
     if (loading || !user?._id) {
    set({ items: [] });
    return;
  }
    try {
      const res = await getusercartapi();
      if (res?.data?.length > 0) {
        set({ items: res.data[0].items });
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  },

  removeItem: async (productId: string) => {
    try {
      await removeitemapi(productId);

      set((state) => ({
        items: state.items.filter((item) => {
          const id =
            typeof item.productId === "string"
              ? item.productId
              : item.productId?._id;
          return id !== productId;
        }),
      }));

      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      toast.error("Failed to remove item!");
    }
  },

  updateQuantity: async (productId: string, newQty: number) => {
    const items = get().items;
    set({
      items: items.map((item) => {
        const id =
          typeof item.productId === "string"
            ? item.productId
            : item.productId?._id;
        return id === productId ? { ...item, qty: newQty } : item;
      }),
    });

    try {
      const res = await updateQuantityApi({ productId, qty: newQty });

      if (!res?.success) throw new Error(res?.message || "Update failed");
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");

      // Rollback if API fails
      set({
        items: get().items.map((item) => {
          const id =
            typeof item.productId === "string"
              ? item.productId
              : item.productId?._id;
          return id === productId ? { ...item, qty: item.qty || 1 } : item;
        }),
      });
    }
  },
}));
