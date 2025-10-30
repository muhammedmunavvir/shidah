"use client";

import { CheckCircle2, Package, MapPin, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function OrderSummaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-xl border-0 rounded-2xl">
          <CardHeader className="text-center space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="flex justify-center"
            >
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </motion.div>

            <CardTitle className="text-2xl font-bold text-gray-800">
              Payment Successful 🎉
            </CardTitle>
            <p className="text-gray-500 text-sm">
              Your order has been confirmed and is now being processed.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Order details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Order Details
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-medium">#ORD-20251030</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span className="font-medium text-green-600">Paid via Razorpay</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-medium text-gray-800">₹1,249.00</span>
                </div>
              </div>
            </div>

            {/* Shipping info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Shipping Address
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                24 MG Road, Koramangala,
                <br /> Bengaluru, Karnataka – 560095
              </p>
            </div>

            {/* Delivery */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Delivery Info
              </h3>
              <p className="text-sm text-gray-600">
                Estimated delivery between <b>Nov 2 – Nov 5</b>.
              </p>
            </div>

            <div className="pt-4 text-center">
              <Link href="/allproducts">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
