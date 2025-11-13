"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Package, MapPin, DollarSign, User, Download, Loader2 } from "lucide-react"
import { generateOrderPDF } from "@/app/actions/generate-pdf"
import { Order } from "@/types/order"


export default function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "refunded":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

 const formatDate = (dateObj: string | { $date: string }) => {
  const iso =
    typeof dateObj === "string"
      ? dateObj
      : dateObj.$date;

  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


  const handleDownloadPDF = async () => {
    console.log("hii")
    setIsGeneratingPDF(true)
    try {
      await generateOrderPDF(order)
    } catch (error) {
      console.error("Failed to download PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-muted-foreground">Order ID:</span>
              <span className="font-mono text-sm font-medium">{order.razorpayOrderId}</span>
            </div>
            <p className="text-xs text-muted-foreground">{formatDate(order.createdAt.$date||order.createdAt)}</p>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Customer</p>
              <p className="font-medium">
                {order.userInfo.FirstName} {order.userInfo.LastName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Total Amount</p>
              <p className="font-medium">
                {order.currency} {order.total.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Products Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{order.orderItems.length} Item(s)</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-muted">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Download PDF Button */}
        <button
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download PDF
            </>
          )}
        </button>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-primary hover:bg-muted rounded-md transition-colors"
        >
          {expanded ? "Collapse" : "View Details"}
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>

        {/* Expanded Details */}
        {expanded && (
          <div className="space-y-4 pt-4 border-t">
            {/* Customer Info */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Customer Information</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Email: {order.userInfo.EmailAddress}</p>
                <p>Phone: {order.userInfo.PhoneNumber}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                <h4 className="text-sm font-semibold">Shipping Address</h4>
              </div>
              <div className="text-sm text-muted-foreground space-y-1 bg-muted p-3 rounded-md">
                <p>{order.shippingAddress.StreetAddress}</p>
                <p>{order.shippingAddress.Appartment}</p>
                <p>
                  {order.shippingAddress.City}, {order.shippingAddress.State} {order.shippingAddress.PinCode}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Order Items</h4>
              <div className="space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex gap-3 p-2 bg-muted rounded-md">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Qty: {item.quantity}</span>
                        <span>₹{item.price.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Price Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping:</span>
                  <span>₹{order.shippingCharge}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax:</span>
                  <span>₹{order.tax}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total:</span>
                  <span>₹{order.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Payment Information</h4>
              <div className="space-y-1 text-sm text-muted-foreground bg-muted p-3 rounded-md font-mono">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span>{order.razorpayOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment ID:</span>
                  <span>{order.razorpayPaymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Currency:</span>
                  <span>{order.currency}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
