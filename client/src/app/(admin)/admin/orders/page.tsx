"use client"

import { useQuery } from "@tanstack/react-query"
import { GetAllOrders } from "@/api/adminapi"
// import OrderCard from "./order-card"
import OrderCard from "./order-card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Package } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AllOrders() {
  const getAllOrdersFn = async () => {
    const res = await GetAllOrders()
    return res.data
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["all-orders"],
    queryFn: getAllOrdersFn,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load orders. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Package className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
        <p className="text-muted-foreground">There are no orders to display yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">All Orders</h2>
        <p className="text-muted-foreground mt-2">Manage and track all customer orders</p>
      </div>

      <div className="grid gap-4">
        {data.map((order: any) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  )
}
