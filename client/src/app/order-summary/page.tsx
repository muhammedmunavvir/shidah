"use client"

import { CheckCircle2, Package, MapPin, Truck, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function OrderSummaryPage() {
  const steps = [
    { label: "Order Confirmed", completed: true },
    { label: "Processing", completed: false },
    { label: "Shipped", completed: false },
    { label: "Delivered", completed: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        {/* Success Header */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
              <CheckCircle2 className="w-20 h-20 text-emerald-400 relative" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Order Confirmed!</h1>
            <p className="text-slate-400 text-base md:text-lg">
              Thank you for your purchase. Your order is being prepared.
            </p>
          </motion.div>
        </div>

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    step.completed ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {step.completed ? "✓" : index + 1}
                </div>
                <p
                  className={`text-xs md:text-sm mt-2 text-center ${
                    step.completed ? "text-emerald-400" : "text-slate-500"
                  }`}
                >
                  {step.label}
                </p>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 mt-3 ${step.completed ? "bg-emerald-500" : "bg-slate-700"}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {/* Order Details Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/30 transition-colors h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Package className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Order Details</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Order ID</span>
                    <span className="text-white font-mono font-semibold">#ORD-20251030</span>
                  </div>
                  <div className="h-px bg-slate-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Payment Method</span>
                    <span className="text-emerald-400 font-medium text-sm">Razorpay</span>
                  </div>
                  <div className="h-px bg-slate-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Total Amount</span>
                    <span className="text-white font-bold text-lg">₹1,249.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Shipping Address Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/30 transition-colors h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Shipping Address</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm leading-relaxed">
                  24 MG Road, Koramangala,
                  <br />
                  Bengaluru, Karnataka – 560095
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Delivery Info Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/30 hover:border-emerald-500/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Truck className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Estimated Delivery</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-sm">
                Your order will arrive between <span className="text-emerald-400 font-semibold">Nov 2 – Nov 5</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 mt-8 md:mt-12"
        >
          <Link href="/allproducts" className="flex-1">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-6 rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-500/20">
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white py-6 rounded-lg font-semibold bg-transparent"
          >
            Track Order
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
