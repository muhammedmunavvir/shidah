import { getProducts } from "@/api/product";
import Allproducts from "./fetchproduct";

export default async function Page() {
  const products = await getProducts();
  return <Allproducts products={products} />;
}
