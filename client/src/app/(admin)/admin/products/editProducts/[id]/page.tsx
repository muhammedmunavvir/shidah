"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/app/(admin)/components/PrductForm";
import { fetchsingleproduct } from "@/api/product";

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetchsingleproduct(id as string);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm mode="edit" initialData={product} />
    </div>
  );
}
