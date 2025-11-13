"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Zap,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export default function Landingpage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [favorites, setFavorites] = useState(new Set<number>());

  useEffect(() => setIsVisible(true), []);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFav = new Set(prev);
      newFav.has(productId) ? newFav.delete(productId) : newFav.add(productId);
      return newFav;
    });
  };

  const clothingProducts = [
    {
      id: 1,
      name: "Premium Cotton Hoodie",
      category: "Hoodies",
      price: 89.99,
      originalPrice: 129.99,
      discount: "30% OFF",
      rating: 4.8,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      badge: "Best Seller",
      colors: ["Black", "Navy", "Gray"],
    },
    {
      id: 2,
      name: "Designer Denim Jacket",
      category: "Jackets",
      price: 149.99,
      originalPrice: 199.99,
      discount: "25% OFF",
      rating: 4.9,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
      badge: "New Arrival",
      colors: ["Blue", "Black", "Light Blue"],
    },
    {
      id: 3,
      name: "Luxury Silk Dress",
      category: "Dresses",
      price: 199.99,
      originalPrice: 299.99,
      discount: "33% OFF",
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      badge: "Premium",
      colors: ["Burgundy", "Navy", "Emerald"],
    },
    {
      id: 4,
      name: "Classic Oxford Shirt",
      category: "Shirts",
      price: 69.99,
      originalPrice: 99.99,
      discount: "30% OFF",
      rating: 4.6,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
      badge: "Trending",
      colors: ["White", "Light Blue", "Pink"],
    },
    {
      id: 5,
      name: "Athletic Performance Tee",
      category: "Activewear",
      price: 39.99,
      originalPrice: 59.99,
      discount: "33% OFF",
      rating: 4.8,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      badge: "Sport",
      colors: ["Black", "Navy", "Charcoal"],
    },
    {
      id: 6,
      name: "Vintage Leather Jacket",
      category: "Outerwear",
      price: 299.99,
      originalPrice: 449.99,
      discount: "33% OFF",
      rating: 4.9,
      reviews: 67,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
      badge: "Limited",
      colors: ["Brown", "Black"],
    },
  ];

  const categories = [
    { name: "All Products", count: clothingProducts.length, active: true },
    { name: "Hoodies", count: 12 },
    { name: "Jackets", count: 8 },
    { name: "Dresses", count: 15 },
    { name: "Shirts", count: 24 },
    { name: "Activewear", count: 18 },
  ];

  const getBadgeColor = (badge: string) => {
    const colors: any = {
      "Best Seller": "from-yellow-400 to-orange-400",
      "New Arrival": "from-green-400 to-emerald-400",
      Premium: "from-purple-400 to-indigo-400",
      Trending: "from-blue-400 to-cyan-400",
      Sport: "from-red-400 to-pink-400",
      Limited: "from-gray-400 to-gray-600",
    };
    return `bg-gradient-to-r ${colors[badge] || "from-purple-400 to-indigo-400"}`;
  };

  return (
    <section
      className="
        relative min-h-screen overflow-hidden
        bg-white text-gray-900
        dark:bg-gradient-to-br dark:from-black dark:via-[#0a0014] dark:to-purple-950 dark:text-white
      "
    >
      {/* GRID */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#e5e7eb30_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb30_1px,transparent_1px)]
          dark:bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)]
          bg-[size:14px_24px]
        "
      />

      {/* ORBS */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 bg-purple-300 dark:bg-purple-700 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 bg-indigo-300 dark:bg-indigo-700 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 bg-violet-300 dark:bg-violet-700 animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Title Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Badge
            variant="secondary"
            className="
              mb-8 px-4 py-2 text-sm font-medium
              bg-purple-100 text-purple-700 border-purple-300
              dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-400/30
              backdrop-blur-sm transition-colors
            "
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Featured Collection 2024
          </Badge>

          <h2 className="text-6xl font-black mb-6">
            <span className="block bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Discover
            </span>
            <span className="block bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-500 dark:from-purple-400 dark:via-violet-500 dark:to-indigo-400 bg-clip-text text-transparent animate-pulse">
              Premium Style
            </span>
          </h2>

          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Curated collections of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              premium clothing
            </span>{" "}
            designed to{" "}
            <span className="font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              elevate your style
            </span>{" "}
            and express your unique personality.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((c, index) => (
            <Button
              key={index}
              variant={c.active ? "default" : "outline"}
              className={`
                px-6 py-3 rounded-full text-sm font-medium transition-all
                ${
                  c.active
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                    : "border-gray-400 text-gray-700 bg-white hover:bg-gray-100 dark:border-purple-400/40 dark:bg-purple-900/20 dark:text-gray-300"
                }
              `}
            >
              {c.name} <span className="opacity-60 ml-1">({c.count})</span>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {clothingProducts.map((product) => (
            <Card
              key={product.id}
              className="
                group cursor-pointer overflow-hidden
                bg-white border-gray-200 shadow-sm
                dark:bg-purple-900/20 dark:border-purple-400/30
                transition-all hover:scale-105 hover:shadow-xl
              "
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardContent className="p-4">
                {/* Image */}
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    className="w-full h-48 object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Hover buttons */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center gap-3 bg-black/60 transition-all duration-300 ${
                      hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="
                        border-gray-300 bg-white/30 text-gray-900
                        dark:border-purple-400/40 dark:bg-purple-900/40 dark:text-white
                      "
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>

                    <Button
                      size="sm"
                      className="
                        bg-purple-600 hover:bg-purple-700 text-white
                        dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-600
                      "
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Cart
                    </Button>
                  </div>

                  {/* Badge */}
                  <div
                    className={`absolute top-3 left-3 px-2 py-1 text-[10px] text-white rounded-full ${getBadgeColor(
                      product.badge
                    )}`}
                  >
                    {product.badge}
                  </div>

                  {/* Discount */}
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-[10px] rounded-full">
                    {product.discount}
                  </div>

                  {/* Favorite */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="
                      absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-sm
                      bg-gray-200/60 hover:bg-gray-300
                      dark:bg-purple-900/40 dark:hover:bg-purple-800/50
                      border dark:border-purple-400/30
                    "
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(product.id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-700 dark:text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="
                        px-2 py-1 text-[10px]
                        bg-gray-200 text-gray-700 border-gray-300
                        dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-400/30
                      "
                    >
                      {product.category}
                    </Badge>

                    <div className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {product.rating}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-500 dark:group-hover:bg-gradient-to-r dark:group-hover:from-purple-400 dark:group-hover:to-indigo-400 dark:group-hover:bg-clip-text dark:group-hover:text-transparent transition">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-lg font-black text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="
              bg-purple-600 hover:bg-purple-700 text-white px-8 py-6
              dark:bg-gradient-to-r dark:from-purple-600 dark:to-indigo-600
            "
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            View All Products
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
