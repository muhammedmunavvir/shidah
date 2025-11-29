"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductstore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Product } from "@/types/product";

export default function Allproducts({ products }: { products: Product[] }) {
  const { setProducts } = useProductStore();

  const [hovered, setHovered] = useState<string | null>(null);
  const [favorites, setFavorites] = useState(new Set<string>());

  useEffect(() => {
    if (products?.length > 0) setProducts(products);
  }, [products, setProducts]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  return (
    <>
      <Navbar />

      <section className="py-10 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">All Products</h2>

        {/* MATCHING LANDING PAGE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <div key={p._id} data-aos="fade-up">
              <Link href={`/product/${p._id}`}>
                <Card
                  className="
                    group cursor-pointer overflow-hidden rounded-none
                    bg-white dark:bg-black/40 border border-black/10
                    backdrop-blur-xl shadow-[0_0_15px_rgba(0,0,0,0.05)]
                    dark:shadow-[0_0_20px_rgba(255,255,255,0.03)]
                    transition-all duration-300 hover:scale-[1.03]
                  "
                  onMouseEnter={() => setHovered(p._id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <CardContent className="p-3">

                    {/* IMAGE LIKE LANDING PAGE */}
                    <div className="relative overflow-hidden bg-black aspect-[3/4]">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      />

                      {/* Overlay Buttons */}
                      <div
                        className={`
                          absolute inset-0 flex items-center justify-center gap-2
                          bg-black/60 backdrop-blur-sm transition-all duration-300
                          ${hovered === p._id ? "opacity-100" : "opacity-0"}
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
                      {p.badge && (
                        <div className="absolute top-3 left-3 px-2 py-1 text-[10px] bg-white text-black rounded-full">
                          {p.badge}
                        </div>
                      )}

                      {/* Discount */}
                      {p.discount && (
                        <div className="absolute top-3 right-3 px-2 py-1 text-[10px] bg-white text-black rounded-full">
                          {p.discount}
                        </div>
                      )}

                      {/* Favorite */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(p._id);
                        }}
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorites.has(p._id)
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
                          {p.category}
                        </span>

                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          {p.ratings?.average || 0}
                        </div>
                      </div>

                      <h3 className="text-sm sm:text-base font-semibold dark:text-white">
                        {p.name}
                      </h3>

                      <div className="flex justify-between items-center mt-1">
                        <span className="text-lg font-bold">₹{p.discountPrice}</span>
                        {p.price !== p.discountPrice && (
                          <span className="text-xs line-through text-gray-400">
                            ₹{p.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
