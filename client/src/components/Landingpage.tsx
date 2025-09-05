"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Shirt,
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
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleFavorite = (productId: any) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
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
    { name: "Hoodies", count: 12, active: false },
    { name: "Jackets", count: 8, active: false },
    { name: "Dresses", count: 15, active: false },
    { name: "Shirts", count: 24, active: false },
    { name: "Activewear", count: 18, active: false },
  ];

  const getBadgeColor = (badge: any) => {
    switch (badge) {
      case "Best Seller":
        return "bg-gradient-to-r from-yellow-400 to-orange-400";
      case "New Arrival":
        return "bg-gradient-to-r from-green-400 to-emerald-400";
      case "Premium":
        return "bg-gradient-to-r from-purple-400 to-indigo-400";
      case "Trending":
        return "bg-gradient-to-r from-blue-400 to-cyan-400";
      case "Sport":
        return "bg-gradient-to-r from-red-400 to-pink-400";
      case "Limited":
        return "bg-gradient-to-r from-gray-400 to-gray-600";
      default:
        return "bg-gradient-to-r from-purple-400 to-indigo-400";
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-[#0a0014] to-purple-950 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f20_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f20_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-violet-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <Star className="w-2 h-2 text-purple-300 opacity-20" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Heading Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Top Badge */}
          <Badge
            variant="secondary"
            className="mb-8 bg-purple-900/30 text-purple-300 border-purple-400/30 backdrop-blur-sm hover:bg-purple-800/40 transition-colors px-4 py-2 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            Featured Collection 2024
          </Badge>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-none">
            <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
              Discover
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-400 bg-clip-text text-transparent animate-pulse">
              Premium Style
            </span>
          </h2>

          <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 text-gray-300 font-light leading-relaxed">
            Curated collections of{" "}
            <span className="font-semibold text-white">premium clothing</span>{" "}
            designed to{" "}
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              elevate your style
            </span>{" "}
            and express your unique personality.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={category.active ? "default" : "outline"}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                category.active
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-2xl shadow-purple-500/25"
                  : "border-purple-400/40 bg-purple-900/20 text-gray-300 hover:bg-purple-900/40 hover:text-white hover:border-purple-300/60"
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">
                ({category.count})
              </span>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {clothingProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group bg-purple-900/20 border-purple-400/30 backdrop-blur-sm 
             hover:bg-purple-900/40 transition-all duration-500 
             hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 
             cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardContent className="p-4">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Actions */}
                  <div
                    className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 
        transition-opacity duration-300 ${
          hoveredProduct === product.id ? "opacity-100" : "opacity-0"
        }`}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-400/40 bg-purple-900/40 text-white 
                     hover:bg-purple-900/60 backdrop-blur-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 
                     hover:from-purple-700 hover:to-indigo-700 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" /> Cart
                    </Button>
                  </div>

                  {/* Badge */}
                  <div
                    className={`absolute top-3 left-3 px-2 py-0.5 ${getBadgeColor(
                      product.badge
                    )} rounded-full`}
                  >
                    <span className="text-white text-[10px] font-semibold">
                      {product.badge}
                    </span>
                  </div>

                  {/* Discount */}
                  <div
                    className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 
                      text-white px-2 py-0.5 rounded-full text-[10px] font-bold"
                  >
                    {product.discount}
                  </div>

                  {/* Favorite */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute bottom-3 right-3 p-2 bg-purple-900/40 backdrop-blur-sm 
                   rounded-full hover:bg-purple-900/60 border border-purple-400/30"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        favorites.has(product.id)
                          ? "text-red-400 fill-current"
                          : "text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-purple-900/30 text-purple-300 border-purple-400/30 text-[10px]"
                    >
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-gray-300">{product.rating}</span>
                    </div>
                  </div>

                  <h3
                    className="text-lg font-bold text-white mb-2 line-clamp-1 
                     group-hover:bg-gradient-to-r group-hover:from-purple-400 
                     group-hover:to-indigo-400 group-hover:bg-clip-text 
                     group-hover:text-transparent transition-all duration-300"
                  >
                    {product.name}
                  </h3>

                  {/* Colors (smaller) */}
                  <div className="flex items-center gap-1 mb-3">
                    {product.colors.slice(0, 2).map((color, idx) => (
                      <div
                        key={idx}
                        className="w-4 h-4 rounded-full border border-purple-400/30"
                        style={{
                          backgroundColor:
                            color.toLowerCase() === "white"
                              ? "#ffffff"
                              : color.toLowerCase() === "black"
                              ? "#000000"
                              : color.toLowerCase() === "navy"
                              ? "#1e3a8a"
                              : color.toLowerCase() === "gray"
                              ? "#6b7280"
                              : color.toLowerCase() === "light blue"
                              ? "#93c5fd"
                              : color.toLowerCase() === "blue"
                              ? "#3b82f6"
                              : color.toLowerCase() === "burgundy"
                              ? "#881337"
                              : color.toLowerCase() === "emerald"
                              ? "#10b981"
                              : color.toLowerCase() === "pink"
                              ? "#ec4899"
                              : color.toLowerCase() === "brown"
                              ? "#92400e"
                              : color.toLowerCase() === "charcoal"
                              ? "#374151"
                              : "#8b5cf6",
                        }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 2 && (
                      <div className="text-gray-400 text-[10px]">
                        +{product.colors.length - 2}
                      </div>
                    )}
                  </div>

                  {/* Price row */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-white">
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

        {/* View All Section */}
        <div
          className={`text-center transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-6 text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group"
            >
              <ShoppingBag className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              View All Products
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-400/40 bg-purple-900/20 text-white hover:bg-purple-900/40 backdrop-blur-sm font-semibold px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2" />
              View Wishlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
