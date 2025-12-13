import { fetchsingleproduct } from "@/api/product";
import Productdetails from "./productdeatils";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productid: string }>;
}) {
  const { productid } = await params; 
  if (!productid) {
    notFound();
  }

  const product = await fetchsingleproduct(productid);

  if (!product) {
    notFound();
  }

  return <Productdetails product={product} />;
}
