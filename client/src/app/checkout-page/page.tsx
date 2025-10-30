"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, Shield, Star, Truck, ArrowLeft } from "lucide-react";
import { indianStates } from "@/constants/IndianStates";
import { useCartStore } from "@/store/userCartstore";
import type { Product } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createOrderApi } from "@/api/CreateOrderapi";
import { useRouter } from "next/navigation";
import { openRazorpay } from "../RazorpayChekout/Razorpaychekout";
import { useAuthStore } from "@/store/useAuthstore";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, Getitem } = useCartStore();
  const { user } = useAuthStore();

  useEffect(() => {
    Getitem(); // Fetch real cart data from backend when page loads
  }, [Getitem]);

  // Calculate totals using real product data
  const subtotal = items.reduce((sum, item) => {
    const product = item.productId as Product;
    const price = product?.discountPrice || product?.price || 0;
    return sum + price * (item.qty || 1);
  }, 0);

  const shipping = items.length > 0 ? 0 : 0; // e.g., ₹49 shipping if not empty
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + shipping + tax;

  // Form states
  const [UserContactInformation, setUserContactInformation] = useState({
    userId: user?.id || "",
    FirstName: "",
    LastName: "",
    EmailAddress: user?.email || "",
    PhoneNumber: "",
  });

  const [UserShippingAddress, setUserShippingAddress] = useState({
    StreetAddress: "",
    Appartment: "",
    City: "",
    State: "",
    PinCode: "",
  });

  const HandleContactInformation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserContactInformation((prev) => ({ ...prev, [name]: value }));
  };

  const HandleShippingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserShippingAddress((prev) => ({ ...prev, [name]: value }));
  };
  const { mutate: completeOrder, isPending } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
        toast.success("Order created successfully!");

      // Open Razorpay checkout using the response
      openRazorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // from .env
        orderId: data.order.id, // Razorpay order ID
        amount: data.order.amount, // Amount in paise
        currency: data.order.currency,
        name: "ClickStore",
        description: "Secure payment with Razorpay",
        prefill: {
          name: `${UserContactInformation.FirstName} ${UserContactInformation.LastName}`,
          email: UserContactInformation.EmailAddress,
          contact: UserContactInformation.PhoneNumber,
        },
        notes: {
          dbOrderId: data.dbOrderId, // pass MongoDB order reference
        },
        onSuccess: (paymentResponse: any) => {
          router.push(`/order-confirmation/${data.dbOrderId}`);
        },
        onFailure: () => {
          toast.error("Payment failed. Please try again!");
        },
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const handleCompleteOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      contact: UserContactInformation,
      shipping: UserShippingAddress,
      items,
      amount: subtotal,
    };

    completeOrder(orderData);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 p-0 h-auto text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold text-balance">Secure Checkout</h1>
          <p className="text-muted-foreground mt-2">
            Complete your purchase securely
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      onChange={HandleContactInformation}
                      name="FirstName"
                      value={UserContactInformation.FirstName}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      onChange={HandleContactInformation}
                      name="LastName"
                      value={UserContactInformation.LastName}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={user?.email || ""}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    This is your logged-in email
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9756789643"
                    onChange={HandleContactInformation}
                    name="PhoneNumber"
                    value={UserContactInformation.PhoneNumber}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    name="StreetAddress"
                    placeholder="123 Main Street"
                    value={UserShippingAddress.StreetAddress}
                    onChange={HandleShippingAddress}
                  />
                </div>

                <div>
                  <Label htmlFor="apartment">
                    Apartment, suite, etc. (optional)
                  </Label>
                  <Input
                    id="apartment"
                    name="Appartment"
                    placeholder="Apt 4B"
                    value={UserShippingAddress.Appartment}
                    onChange={HandleShippingAddress}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="City"
                      placeholder="New York"
                      value={UserShippingAddress.City}
                      onChange={HandleShippingAddress}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={UserShippingAddress.State}
                      onValueChange={(val: any) =>
                        setUserShippingAddress((prev) => ({
                          ...prev,
                          State: val,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="PinCode"
                    placeholder="10001"
                    value={UserShippingAddress.PinCode}
                    onChange={HandleShippingAddress}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Real Order Items */}
                <div className="space-y-4">
                  {items.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      Your cart is empty.
                    </p>
                  ) : (
                    items.map((item) => {
                      const product = item.productId as Product;
                      const price =
                        product?.discountPrice || product?.price || 0;
                      const image = product?.images?.[0] || "/placeholder.svg";
                      return (
                        <div key={item._id} className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={image}
                              alt={product?.name}
                              className="w-16 h-16 object-cover rounded-md border"
                            />
                            {item?.qty > 1 && (
                              <Badge
                                variant="secondary"
                                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                              >
                                {item.qty}
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-pretty">
                              {product?.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.qty}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              ₹{(price * (item.qty || 1)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      Shipping
                    </span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  {/* <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div> */}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Complete Order Button */}
                <Button
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                  onClick={handleCompleteOrder}
                  disabled={isPending}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {isPending
                    ? "Processing..."
                    : `Complete Order - ₹${subtotal.toFixed(2)}`}
                </Button>

                {/* Trust Indicators */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-primary" />
                    <span>Trusted by 50,000+ customers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free returns within 30 days</span>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="flex justify-center gap-4 pt-4 opacity-60">
                  <div className="text-xs text-center">
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center mb-1">
                      <Lock className="h-3 w-3" />
                    </div>
                    <span>SSL</span>
                  </div>
                  <div className="text-xs text-center">
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center mb-1">
                      <Shield className="h-3 w-3" />
                    </div>
                    <span>Secure</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
