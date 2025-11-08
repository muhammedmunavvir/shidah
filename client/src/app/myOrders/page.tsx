"use client"

import type React from "react"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Package, Truck, CheckCircle2, Clock, IndianRupee, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/store/useAuthstore"
import { myOrderapi } from "@/api/myOrderapi"

export default function MyOrdersPage() {
  const { user } = useAuthStore()

  const fetchUserOrders = async () => {
    const userId = user?.id
    if (!userId) throw new Error("User not logged in")
    const res = await myOrderapi(userId)
    return res.data || []
  }

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: fetchUserOrders,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })

  const getStatusConfig = (status: string) => {
    const config: Record<string, { color: string; icon: React.ReactNode; bgColor: string }> = {
      paid: {
        color: "text-green-700",
        bgColor: "bg-green-50",
        icon: <CheckCircle2 className="w-4 h-4" />,
      },
      shipped: {
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        icon: <Truck className="w-4 h-4" />,
      },
      pending: {
        color: "text-amber-700",
        bgColor: "bg-amber-50",
        icon: <Clock className="w-4 h-4" />,
      },
    }
    return config[status] || config.pending
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    )

  if (isError)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <div className="bg-destructive/10 rounded-full p-4 mb-4">
          <Package className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Failed to load orders</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">{(error as Error).message}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )

  if (orders.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <div className="bg-muted rounded-full p-4 mb-4">
          <Package className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">No Orders Yet</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          You haven't placed any orders. Start shopping now to see your orders here!
        </p>
        <Button asChild>
          <a href="/allproducts" className="gap-2">
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
    )

  const totalOrders = orders.length
  const totalSpent = orders.reduce((sum: number, order: any) => sum + order.total, 0)

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mb-10">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage all your orders in one place</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-foreground">{totalOrders}</p>
                </div>
                <Package className="w-10 h-10 text-primary/40" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-foreground">₹{totalSpent.toLocaleString("en-IN")}</p>
                </div>
                <IndianRupee className="w-10 h-10 text-green-500/40" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-4">
        {orders.map((order: any, orderIndex: number) => {
          const statusConfig = getStatusConfig(order.status)
          return (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: orderIndex * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-border/50">
                <CardHeader className={`${statusConfig.bgColor} border-b border-border/50 pb-4`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Order ID
                        </span>
                        <code className="text-sm font-mono font-semibold text-foreground bg-background/60 px-2 py-1 rounded">
                          {order._id}
                        </code>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt || new Date()).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge className={`${statusConfig.color} ${statusConfig.bgColor} border-0 gap-2 w-fit`}>
                      {statusConfig.icon}
                      <span className="capitalize font-semibold">{order.status}</span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                  <div className="space-y-3">
                    {order.orderItems?.map((item: any, index: number) => (
                      <div
                        key={`${order._id}-${index}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-150"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm sm:text-base truncate">{item.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Quantity: <span className="font-semibold">{item.quantity}</span>
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold text-foreground text-sm sm:text-base flex items-center gap-1">
                            <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4" />
                            {item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-2" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="font-medium">₹{order.subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Shipping</span>
                      <span className="font-medium">₹{order.shippingCharge.toLocaleString("en-IN")}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between items-center pt-2 bg-muted/40 -mx-6 px-6 py-2 rounded-b-lg">
                      <span className="font-semibold text-foreground">Total Amount</span>
                      <span className="text-lg font-bold text-primary">₹{order.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                      <a href={`/order-summary?orderId=${order._id}`}>
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
