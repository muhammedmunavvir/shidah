"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/useProductstore";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Allproducts({ products }: { products: Product[] }) {
  const { products: storeProducts, setProducts } = useProductStore();

  useEffect(() => {
    if (products && products.length > 0) {
      setProducts(products);
    }
  }, [products, setProducts]);

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        {products.map((p) => (
          <Link key={p._id} href={`/product/${p._id}`} className="block">
            <Card
              key={p._id}
              className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white "
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={p.images[0] || "/placeholder.svg"}
                  alt={p.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {p.badge && (
                    <Badge
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {p.badge}
                    </Badge>
                  )}
                  {p.isBestSeller && (
                    <Badge
                      variant="secondary"
                      className="bg-amber-500 text-white hover:bg-amber-600"
                    >
                      Best Seller
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>

                {/* Stock Status Overlay */}
                {p.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive" className="text-sm">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-3 space-y-2">
                {/* Product Name & Description */}
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {p.description}
                  </p>
                </div>

                {/* Ratings */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.round(p.ratings?.average ?? 0)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({p.ratings?.count || 0})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-600">
                    ₹{p.discountPrice}
                  </span>
                  {p.price !== p.discountPrice && (
                    <>
                      <span className="text-sm line-through text-gray-400">
                        ₹{p.price}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        {p.discount} OFF
                      </Badge>
                    </>
                  )}
                </div>

                {/* Colors */}
                {p.colors && p.colors.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">
                      Colors
                    </h4>
                    <div className="flex gap-2">
                      {p.colors.slice(0, 4).map((c, index) => (
                        <div
                          key={c}
                          className="w-6 h-6 rounded-full border-2 border-gray-200 cursor-pointer hover:border-gray-400 transition-colors"
                          style={{ backgroundColor: c.toLowerCase() }}
                          title={c}
                        />
                      ))}
                      {p.colors.length > 4 && (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                          <span className="text-xs text-gray-600">
                            +{p.colors.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {p.sizes && p.sizes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Sizes</h4>
                    <div className="flex flex-wrap gap-1">
                      {(p.sizes || []).slice(0, 4).map((s: any) => (
                        <Badge
                          key={s}
                          variant="outline"
                          className="text-xs hover:bg-gray-100 cursor-pointer"
                        >
                          {s}
                        </Badge>
                      ))}
                      {p.sizes.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{p.sizes.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {p.tags && p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {p.tags.slice(0, 3).map((tag: any) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200"
                      >
                        #{tag}
                      </Badge>
                    ))}
                    {p.tags.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-600"
                      >
                        +{p.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Stock Info */}
                <div className="pt-2 border-t border-gray-100">
                  <p
                    className={`text-sm font-medium ${
                      p.stock > 0
                        ? p.stock < 10
                          ? "text-amber-600"
                          : "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {p.stock > 0
                      ? p.stock < 10
                        ? `Only ${p.stock} left!`
                        : `${p.stock} in stock`
                      : "Out of stock"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
