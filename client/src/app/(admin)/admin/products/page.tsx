"use client";

import { PlusCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductstore";
import { getProducts } from "@/api/product";

export default function AdminProductPage() {
    const { products, setProducts } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();   // fetch from backend
      setProducts(data);                  // store in Zustand
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      {/* 🧱 Header section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Products
        </h1>

        {/* ✅ Add Product Button */}
        <Link
          href="/admin/products/addProducts"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          <PlusCircle size={18} />
          Add Product
        </Link>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="text-left text-gray-700 dark:text-gray-300">
              <th className="p-3">Image</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-3">
                    <img
                    src={p.images[0] || "/placeholder.svg"}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-900 dark:text-gray-100">
                    {p.name}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {p.category}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    ₹{p.price}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-300">
                    {p.stock}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No products found. Add your first product!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
