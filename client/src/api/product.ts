import api from "@/services/api";
import { Product } from "@/types/product";

export const getProducts = async (
  limit?: number
): Promise<Product[]> => {
  try {
    const response = await api.get("/products/getallproducts", {
      params: limit ? { limit } : {},
    });

    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export const fetchsingleproduct=async(id:string):Promise<Product|null>=>{
try{
  const response=await api(`products/fetchsingleproduct/${id}`)
  return response.data.data
}catch(error){
  console.log(error)
  return null
}
}



