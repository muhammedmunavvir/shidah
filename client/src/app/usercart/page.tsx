"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/userCartstore";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";
import Navbar from "@/components/Navbar";
import Link from "next/link";

// ✅ helper to always get string id
const getProductId = (id: string | Product) =>
  typeof id === "string" ? id : id._id;

export default function Usercart() {
  const { items, Getitem, removeItem, updateQuantity } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      await Getitem();
      setIsLoading(false);
    };
    loadCart();
  }, [Getitem]);
  const calculateTotal = () => {
    return items.reduce(
      (sum, item) =>
        sum +
        ((item.productId as Product)?.discountPrice || 0) * (item.qty || 1),
      0
    );
  };

  const calculateItemCount = () => {
    return items.reduce((sum, item) => sum + (item.qty || 1), 0);
  };

  const handleQuantityChange = (productId: string, newQty: number) => {
    updateQuantity(productId, newQty);
  };

  const handleRemoveItem = (item: CartItem) => {
    const productId = getProductId(item.productId!);
    removeItem(productId);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!items || items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <Button asChild>
              <Link href="/allproducts">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {calculateItemCount()}{" "}
                {calculateItemCount() === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/allproducts">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item: CartItem) => {
              const product = item.productId as Product;
              const productId = getProductId(item.productId!);

              return (
                <Card key={item._id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={
                            product?.images?.[0] ||
                            "/placeholder.svg?height=96&width=96&query=product"
                          }
                          alt={product?.name}
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                        {product?.category && (
                          <Badge
                            variant="secondary"
                            className="absolute -top-2 -right-2 text-xs"
                          >
                            {product.category}
                          </Badge>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg leading-tight">
                            {product?.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveItem(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {product?.description && (
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() =>
                                handleQuantityChange(
                                  productId,
                                  (item.qty || 1) - 1
                                )
                              }
                              disabled={item.qty! <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.qty}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() =>
                                handleQuantityChange(
                                  productId,
                                  (item.qty || 1) + 1
                                )
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              ₹{product?.discountPrice} × {item.qty}
                            </p>
                            <p className="font-bold text-lg">
                              ₹
                              {(
                                (product?.discountPrice || 0) * (item.qty || 1)
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({calculateItemCount()} items)</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  {/* <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>
                      ₹{Math.round(calculateTotal() * 0.18).toLocaleString()}
                    </span>
                  </div> */}
                </div>

                <Separator />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {/* ₹{Math.round(calculateTotal() * 1.18).toLocaleString()} */}
                    ₹{Math.round(calculateTotal() ).toLocaleString()}
                  </span>
                </div>

                <Button asChild className="w-full h-12 text-base font-semibold">
                  <Link href="/checkout-page">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </Link>
                </Button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Secure checkout powered by Razor Pay
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
