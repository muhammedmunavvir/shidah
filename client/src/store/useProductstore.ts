// store/productStore.ts
import { create } from "zustand";
import { Product } from "@/types/product";

type ProductStore = {
  products: Product[];               // all fetched products
  setProducts: (products: Product[]) => void; // function to set products
  addProduct?: (product: Product) => void;   // optional: add single product
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
}));
