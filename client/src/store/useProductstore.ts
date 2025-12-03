// store/productStore.ts
import { create } from "zustand";
import { Product } from "@/types/product";

type ProductStore = {
  products: Product[];               // all fetched products
  setProducts: (products: Product[]) => void; // function to set products
  addProduct?: (product: Product) => void;   // optional: add single product
  setLoading: (value: boolean) => void;
  loading:boolean;

};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading:true,
  setProducts: (products) => set({ products ,loading:false}),
    setLoading: (value) => set({ loading: value }),

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
}));
