"use client";

import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useAuthStore } from "@/store/useAuthstore";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { useCartStore } from "@/store/userCartstore";
export default function Productdetails({ product }: { product: Product }) {
  const { user, token } = useAuthStore();
  const { addItem } = useCartStore();
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Product Images */}
        <div className="space-y-4">
          <Card className="overflow-hidden rounded-2xl shadow-md">
            <CardContent className="p-0">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="w-full object-cover"
              />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            {product.images?.map((img, i) => (
              <Card
                key={i}
                className="w-20 h-20 overflow-hidden rounded-lg border hover:border-black cursor-pointer"
              >
                <CardContent className="p-0">
                  <img
                    src={img}
                    alt={`${product.name} ${i}`}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          {/* Badges & Category */}
          <div className="flex items-center gap-2">
            {product.isBestSeller && (
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Best Seller
              </Badge>
            )}
            {product.badge && (
              <Badge className="bg-red-500">{product.badge}</Badge>
            )}
            <span className="text-gray-500 text-sm">{product.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400 w-5 h-5" />
            <span className="font-medium">{product.ratings?.average}</span>
            <span className="text-gray-500 text-sm">
              ({product.ratings?.count} reviews)
            </span>
          </div>

          <Separator />

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-green-600">
              ₹{product.discountPrice}
            </span>
            <span className="text-gray-500 line-through">₹{product.price}</span>
            <Badge variant="outline" className="text-red-500 font-semibold">
              {product.discount} OFF
            </Badge>
          </div>

          {/* Tabs for Details */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="sizes">Sizes</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
            </TabsList>

            <TabsContent
              value="description"
              className="text-gray-700 leading-relaxed"
            >
              {product.description}
            </TabsContent>

            <TabsContent value="sizes">
              <div className="flex gap-2">
                {product.sizes?.map((size, i) => (
                  <Button key={i} variant="outline" className="rounded-lg">
                    {size}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="colors">
              <div className="flex gap-2">
                {product.colors?.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border cursor-pointer"
                    style={{ backgroundColor: color.toLowerCase() }}
                  ></div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <Button
              size="lg"
              className="flex items-center gap-2"
              onClick={async () => {
                if (!token) {
                  alert("Please login first!");
                  return;
                }

                try {
                  if (!user?.id) {
                    toast.error("User not found, please login again!");
                    return;
                  }

                  await addItem({
                    productId: product._id,
                    qty: 1,
                    userId: user?.id,
                  });
                } catch (error) {
                  toast.error("Failed to add item to cart!");
                  console.error(error);
                }
              }}
            >
              <ShoppingCart size={20} /> Add to Cart
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2"
            >
              <Heart size={20} /> Wishlist
            </Button>
          </div>

          {/* Stock Info */}
          <p className="text-sm text-gray-500 mt-2">
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags?.map((tag, i) => (
              <Badge key={i} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
