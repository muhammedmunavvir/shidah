import { create } from "zustand";
import {
  addToCart,
  getusercartapi,
  removeitemapi,
  updateQuantityApi,
} from "@/api/cartapi";
import { CartItem } from "@/types/cart";
import { toast } from "sonner";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  setCart: (items: CartItem[]) => void;
  Getitem: () => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, newQty: number) => Promise<void>; //
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: async (item) => {
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

  Getitem: async () => {
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
      await removeitemapi(productId); // call backend API

      // Update the store to remove the item
      set((state) => ({
        items: state.items.filter((item) => {
          const id =
            typeof item.productId === "string"
              ? item.productId
              : item.productId?._id; // get the actual product id
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
    
    set((state) => ({
      items: state.items.map((item) => {
        const id =
          typeof item.productId === "string"
            ? item.productId
            : item.productId?._id;
        return id === productId ? { ...item, qty: newQty } : item;
      }),
    }));

    try {
      const res = await updateQuantityApi({ productId, qty: newQty });

      if (!res?.success) {
        throw new Error(res?.message || "Update failed");
      }

      toast.success("Quantity updated");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");

      // Rollback if API fails
      set((state) => ({
        items: state.items.map((item) => {
          const id =
            typeof item.productId === "string"
              ? item.productId
              : item.productId?._id;
          return id === productId
            ? { ...item, qty: item.qty || 1 } // restore
            : item;
        }),
      }));
    }
  },
}));
