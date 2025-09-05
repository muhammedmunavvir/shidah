import { fetchsingleproduct } from "@/api/product";
import Productdetails from "./productdeatils";

export default async function ProductPage({ params }: { params: { productid: string } }) {
  const product = await fetchsingleproduct(params.productid);

  if (!product) return <div>Product not found</div>;

  return  <Productdetails product={product}/>
    
  
}