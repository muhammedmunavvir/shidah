"use client";

import { useEffect } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/userCartstore";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import Navbar from "@/components/Navbar";

export default function Usercart() {
  const { items, Getitem } = useCartStore();

  useEffect(() => {
   
    Getitem();
  }, [Getitem]);

  if (!items || items.length === 0) {
    return <p className="p-6 text-center">🛒 Your cart is empty</p>;
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-6">
      
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart /> Your Cart
      </h1>

      <div className="space-y-4">
        {items.map((item: CartItem) => {
          const product = item.productId as Product; // cast as Product
          return (
            <div
              key={item._id}
              className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product?.images?.[0] || "/placeholder.png"}
                  alt={product?.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">{product?.name}</p>
                  <p className="text-gray-600">
                    Qty: {item.qty} × ₹{product?.price}
                  </p>
                  <p className="font-bold">
                    ₹{(product?.price || 0) * (item.qty || 1)}
                  </p>
                  {product?.description && (
                    <p className="text-gray-500 text-sm mt-1">
                      {product.description}
                    </p>
                  )}
                  {product?.category && (
                    <p className="text-gray-500 text-sm mt-1">
                      Category: {product.category}
                    </p>
                  )}
                </div>
              </div>

              <Button variant="destructive" size="icon">
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <p className="text-lg font-bold">
          Total: ₹
          {items.reduce(
            (sum, item) =>
              sum + ((item.productId as Product)?.price || 0) * (item.qty || 1),
            0
          )}
        </p>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Proceed to Checkout
        </Button>
      </div>
    </div>
    </>
  );
}
