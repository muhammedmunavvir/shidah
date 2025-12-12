"use client";

import { useEffect, useState } from "react";
import UploadImage from "./ProductImageUpload";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { CreateProductApi, UpdateProductApi } from "@/api/adminapi";
import { toast } from "sonner";

export default function ProductForm({ mode = "create", initialData }: any) {
  // ---------------------------------------
  // INITIAL FORM DATA (Handles Edit + Create)
  // ---------------------------------------
  const [formData, setFormData] = useState(
    initialData
      ? {
          ...initialData,
          price: initialData.price?.toString() || "",
          discountPrice: initialData.discountPrice?.toString() || "",
          stock: initialData.stock?.toString() || "",
          tags: Array.isArray(initialData.tags)
            ? initialData.tags.join(", ")
            : initialData.tags || "",
        }
      : {
          name: "",
          description: "",
          price: "",
          discountPrice: "",
          currency: "INR",
          stock: "",
          category: "",
          discount: "",
          badge: "",
          sizes: [] as string[],
          colors: [] as string[],
          images: [] as string[],
          isBestSeller: false,
          isPremium: false,
          tags: "",
        }
  );

  // ---------------------------------------
  // MUTATION HANDLER FOR CREATE + EDIT
  // ---------------------------------------
  const mutation = useMutation({
    mutationFn:
      mode === "edit"
        ? (payload) => UpdateProductApi(initialData._id, payload)
        : CreateProductApi,

    onSuccess: () => {
      toast(
        mode === "edit"
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      if (mode === "create") {
        setFormData({
          name: "",
          description: "",
          price: "",
          discountPrice: "",
          currency: "INR",
          stock: "",
          category: "",
          discount: "",
          badge: "",
          sizes: [],
          colors: [],
          images: [],
          isBestSeller: false,
          isPremium: false,
          tags: "",
        });
      }
    },

    onError: (err) => {
      console.error(err);
      alert("Error saving product");
    },
  });

  const isSubmitting = mutation.isPending;

  // ---------------------------------------
  // ADD IMAGE
  // ---------------------------------------
  const addImage = (url: string) => {
    setFormData((prev:any) => ({ ...prev, images: [...prev.images, url] }));
  };

  // ---------------------------------------
  // REMOVE IMAGE
  // ---------------------------------------
  const removeImage = (url: string) => {
    setFormData((prev:any) => ({
      ...prev,
      images: prev.images.filter((img:any) => img !== url),
    }));
  };

  // ---------------------------------------
  // TOGGLE ARRAY (sizes, colors)
  // ---------------------------------------
  const toggleArrayValue = (key: "sizes" | "colors", value: string) => {
    setFormData((prev:any) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v:any) => v !== value)
          : [...prev[key], value],
      };
    });
  };

  // ---------------------------------------
  // FORM SUBMIT
  // ---------------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: formData.price ? Number(formData.price) : undefined,
      discountPrice: formData.discountPrice
        ? Number(formData.discountPrice)
        : undefined,
      stock: formData.stock ? Number(formData.stock) : undefined,
      tags: formData.tags
        ? formData.tags.split(",").map((t:any) => t.trim())
        : [],
    };

    mutation.mutate(payload);
  };

  // ----------------------------------------------------------------------
  // UI
  // ----------------------------------------------------------------------
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        {mode === "edit" ? "✏️ Edit Product" : "🛍️ Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name + Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-md px-3 py-2 bg-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2 bg-transparent"
          />
        </div>

        {/* Price Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Discount Price
            </label>
            <input
              type="number"
              value={formData.discountPrice}
              onChange={(e) =>
                setFormData({ ...formData, discountPrice: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Category + Badge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Badge (optional)
            </label>
            <input
              type="text"
              value={formData.badge}
              onChange={(e) =>
                setFormData({ ...formData, badge: e.target.value })
              }
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Sizes + Colors */}
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium mb-2">Sizes</p>
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleArrayValue("sizes", size)}
                className={`px-3 py-1 border rounded-md mr-2 ${
                  formData.sizes.includes(size)
                    ? "bg-blue-600 text-white"
                    : "text-gray-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Colors</p>
            {["Black", "Blue", "White", "Red"].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => toggleArrayValue("colors", color)}
                className={`px-3 py-1 border rounded-md mr-2 ${
                  formData.colors.includes(color)
                    ? "bg-green-600 text-white"
                    : "text-gray-600"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Product Images
          </label>

          <UploadImage onUpload={addImage} />

          <div className="flex gap-3 mt-3 flex-wrap">
            {formData.images.map((url:any, i:any) => (
              <div key={i} className="relative">
                <img
                  src={url}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 bg-red-600 text-white px-2 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={formData.isBestSeller}
              onChange={(e) =>
                setFormData({ ...formData, isBestSeller: e.target.checked })
              }
            />
            Best Seller
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={formData.isPremium}
              onChange={(e) =>
                setFormData({ ...formData, isPremium: e.target.checked })
              }
            />
            Premium Product
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            mode === "edit" ? "Update Product" : "Add Product"
          )}
        </button>
      </form>
    </div>
  );
}
