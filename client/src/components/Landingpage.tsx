"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ShoppingBag,
} from "lucide-react";
import PopupAd from "./PopupAd";

import "aos/dist/aos.css";
import Link from "next/link";

export default function Landingpage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [favorites, setFavorites] = useState(new Set<number>());

  

  useEffect(() => setIsVisible(true), []);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      updated.has(productId)
        ? updated.delete(productId)
        : updated.add(productId);
      return updated;
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
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Designer Denim Jacket",
      category: "Jackets",
      price: 149.99,
      originalPrice: 199.99,
      discount: "25% OFF",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
      badge: "New Arrival",
    },
    {
      id: 3,
      name: "Luxury Silk Dress",
      category: "Dresses",
      price: 199.99,
      originalPrice: 299.99,
      discount: "33% OFF",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      badge: "Premium",
    },
    {
      id: 4,
      name: "Classic Oxford Shirt",
      category: "Shirts",
      price: 69.99,
      originalPrice: 99.99,
      discount: "30% OFF",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
      badge: "Trending",
    },
  ];

  return (
    <section className="min-h-screen relative bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden">

      {/* Popup */}
      <div >
        <PopupAd delay={5000} showOnce={false}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3 text-black dark:text-white">
              🔥 20% OFF Today!
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Shop the new arrivals with an exclusive discount.
            </p>
            <button className="px-6 py-3 bg-black text-white rounded-full">
              Shop Now
            </button>
          </div>
        </PopupAd>
      </div>

      {/* Background Grid */}
      <div
        className="absolute inset-0 bg-[size:14px_24px]"
        data-aos="fade-in"
        data-aos-duration="1000"
      />

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-72 h-72 bg-white/10 dark:bg-white/5 rounded-full blur-3xl"
          data-aos="zoom-in"
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-white/10 dark:bg-white/5 rounded-full blur-3xl"
          data-aos="zoom-in"
          data-aos-delay="150"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-6 pb-12">

        {/* Top Section */}
        <div
          className={`text-left mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-black mt-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black dark:from-white dark:to-gray-400 ">
              New Arrival
            </span>
          </h2>
        </div>

        {/* PRODUCT GRID */}
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {clothingProducts.map((product, i) => (
            <div data-aos="fade-up" data-aos-delay={i * 120} key={product.id}>
              <Card
                className="
                  group cursor-pointer overflow-hidden rounded-none
                  bg-white dark:bg-black/40 border border-black/10
                  backdrop-blur-xl shadow-[0_0_15px_rgba(0,0,0,0.05)]
                  dark:shadow-[0_0_20px_rgba(255,255,255,0.03)]
                  transition-all duration-300 hover:scale-[1.03]
                "
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <CardContent className="p-3">
                  {/* IMAGE */}
                  <div className="relative overflow-hidden bg-black aspect-[3/4]">
                    <img
                      src={product.image}
                      className="w-full h-40 sm:h-48 object-cover transition duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />

                    {/* Overlay Buttons */}
                    <div
                      className={`
                        absolute inset-0 flex items-center justify-center gap-2
                        bg-black/60 backdrop-blur-sm transition-all duration-300
                        ${
                          hoveredProduct === product.id
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      `}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/40 text-white bg-white/10 hover:bg-white/20"
                      >
                        <Eye className="w-4 h-4 mr-1" /> View
                      </Button>

                      <Button
                        size="sm"
                        className="bg-white text-black hover:bg-gray-200"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" /> Cart
                      </Button>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 text-[10px] bg-black/60 text-white rounded-full backdrop-blur-sm">
                      {product.badge}
                    </div>

                    {/* Discount */}
                    <div className="absolute top-3 right-3 px-2 py-1 text-[10px] bg-white text-black rounded-full">
                      {product.discount}
                    </div>

                    {/* Favorite */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.has(product.id)
                            ? "text-red-500 fill-red-500"
                            : "text-white"
                        }`}
                      />
                    </button>
                  </div>

                  {/* TEXT */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] bg-black/5 dark:bg-white/10 px-2 py-1 rounded-full">
                        {product.category}
                      </span>

                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {product.rating}
                      </div>
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white">
                      {product.name}
                    </h3>

                    <div className="flex justify-between items-center mt-1">
                      <span className="text-lg font-bold">
                        ${product.price}
                      </span>
                      <span className="text-xs line-through text-gray-400">
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16" data-aos="fade-up">
  <Link
    href="/allproducts"
    className="
      inline-flex items-center justify-center
      bg-black text-white dark:bg-white dark:text-black
      px-8 py-4 
      hover:opacity-80 transition
    "
  >
    <ShoppingBag className="w-5 h-5 mr-2" />
    View All Products
    <ArrowRight className="w-5 h-5 ml-2" />
  </Link>
</div>

      </div>
    </section>
  );
}
