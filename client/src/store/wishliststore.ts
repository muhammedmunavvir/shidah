import { create } from "zustand";
import { useAuthStore } from "@/store/useAuthstore";
import { toast } from "sonner";
import { getWishlistApi, toggleWishlistApi } from "@/api/wishlistapi";
import { Product } from "@/types/product";

interface WishlistState {
  items: Product[];
  loading: boolean;
  fetchWishlist: () => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  loading: false,

  fetchWishlist: async () => {
    const { user, loading: authLoading } = useAuthStore.getState();
    if (authLoading || !user?._id) {
      set({ items: [], loading: false });
      return;
    }

    try {
      set({ loading: true });
      const res = await getWishlistApi();
      set({ items: res || [] });
    } catch (e) {
      console.error("Wishlist fetch failed", e);
      set({ items: [] });
    } finally {
      set({ loading: false });
    }
  },

  toggleWishlist: async (productId) => {
  const { user } = useAuthStore.getState();
  if (!user?._id) {
    toast.error("Please login to use wishlist");
    return;
  }

  // const exists = get().items.some((p) => p._id === productId);

  //  OPTIMISTIC UPDATE (instant UI)
  // set((state) => ({
  //   items: exists
  //     ? state.items.filter((p) => p._id !== productId)
  //     : [...state.items, { _id: productId } as any],
  // }));

  try {
    const res = await toggleWishlistApi(productId);

    // Backend disagrees → rollback
       await get().fetchWishlist();
    toast.success(res.added ? "Added to wishlist" : "Removed from wishlist");
  } catch (e) {
    // ❌ API failed → rollback
    await get().fetchWishlist();
    toast.error("Wishlist update failed");
  }
},


  isWishlisted: (productId) =>
    get().items.some((p) => p._id === productId),
}));
