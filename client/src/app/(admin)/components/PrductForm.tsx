"use client";
import { useState } from "react";
import UploadImage from "./ProductImageUpload";
import { Loader2 } from "lucide-react";

export default function ProductForm() {
  const [formData, setFormData] = useState({
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
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    setLoading(false);
    alert(res.ok ? "✅ Product added successfully!" : "❌ Failed to add product");
  };

  const addImage = (url: string) => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
  };

  const toggleArrayValue = (key: "sizes" | "colors", value: string) => {
    setFormData((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      };
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        🛍️ Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name + Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-transparent text-gray-800 dark:text-gray-100"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-transparent text-gray-800 dark:text-gray-100"
          ></textarea>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Discount Price
            </label>
            <input
              type="number"
              value={formData.discountPrice}
              onChange={(e) =>
                setFormData({ ...formData, discountPrice: e.target.value })
              }
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Stock
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Category & Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Badge (optional)
            </label>
            <input
              type="text"
              placeholder="Trending / New / Hot"
              value={formData.badge}
              onChange={(e) =>
                setFormData({ ...formData, badge: e.target.value })
              }
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Sizes & Colors */}
        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Sizes
            </p>
            {["S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleArrayValue("sizes", size)}
                className={`px-3 py-1 border rounded-md text-sm ${
                  formData.sizes.includes(size)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Colors
            </p>
            {["Black", "Blue", "White", "Red"].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => toggleArrayValue("colors", color)}
                className={`px-3 py-1 border rounded-md text-sm ${
                  formData.colors.includes(color)
                    ? "bg-green-600 text-white border-green-600"
                    : "text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            Product Images
          </label>
          <UploadImage onUpload={addImage} />
          <div className="flex gap-3 mt-3 flex-wrap">
            {formData.images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="product"
                className="w-24 h-24 object-cover rounded-md border border-gray-200 dark:border-gray-700"
              />
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. jacket, denim, casual"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2"
          />
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              checked={formData.isBestSeller}
              onChange={(e) =>
                setFormData({ ...formData, isBestSeller: e.target.checked })
              }
            />
            Best Seller
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium flex justify-center items-center gap-2 transition"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
  );
}
