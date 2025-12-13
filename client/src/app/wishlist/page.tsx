"use client";

import { useWishlistStore } from "@/store/wishliststore";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, X } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { items, fetchWishlist, toggleWishlist, loading } = useWishlistStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (!loading && items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted/50 mb-6">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-semibold mb-3 text-center">
            Your wishlist is empty
          </h1>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            Start adding items you love to your wishlist.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/allproducts">
              <ShoppingCart className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <Card key={product._id} className="group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden bg-muted/30">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />

                  {/* Remove */}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 h-9 w-9 rounded-full"
                    onClick={() => toggleWishlist(product._id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="font-medium line-clamp-2">{product.name}</h3>
                  <p className="text-lg font-semibold">
                    ₹{product.discountPrice}
                  </p>

                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleWishlist(product._id)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
