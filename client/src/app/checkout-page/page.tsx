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
import {
  Lock,
  Shield,
  Star,
  Truck,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { indianStates } from "@/constants/IndianStates";
import { useCartStore } from "@/store/userCartstore";
import type { Product } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createOrderApi } from "@/api/CreateOrderapi";
import { useRouter } from "next/navigation";
import { openRazorpay } from "../RazorpayChekout/Razorpaychekout";
import { useAuthStore } from "@/store/useAuthstore";

// Validation error interface
interface ValidationErrors {
  contact?: {
    FirstName?: string;
    LastName?: string;
    PhoneNumber?: string;
  };
  shipping?: {
    StreetAddress?: string;
    City?: string;
    State?: string;
    PinCode?: string;
  };
}

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

  const shipping = items.length > 0 ? 0 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const [processingPayment, setProcessingPayment] = useState(false);

  // Form states with initial values from user data
  const [UserContactInformation, setUserContactInformation] = useState({
    userId: user?._id || "",
    FirstName: user?.firstName || "",
    LastName: user?.lastName || "",
    EmailAddress: user?.email || "",
    PhoneNumber: user?.phoneNumber || "",
  });

  const [UserShippingAddress, setUserShippingAddress] = useState({
    StreetAddress: user?.address?.street || "",
    Appartment: user?.address?.appartment || "",
    City: user?.address?.city || "",
    State: user?.address?.state || "",
    PinCode: user?.address?.pinCode || "",
  });

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [isFormTouched, setIsFormTouched] = useState(false);

  // Validation functions
  const validateContactInfo = () => {
    const errors: ValidationErrors["contact"] = {};

    if (!UserContactInformation.FirstName.trim()) {
      errors.FirstName = "First name is required";
    } else if (UserContactInformation.FirstName.trim().length < 2) {
      errors.FirstName = "First name must be at least 2 characters";
    }

    if (!UserContactInformation.LastName.trim()) {
      errors.LastName = "Last name is required";
    } else if (UserContactInformation.LastName.trim().length < 1) {
      errors.LastName = "Last name must be at least 1 character";
    }

    if (!UserContactInformation.PhoneNumber.trim()) {
      errors.PhoneNumber = "Phone number is required";
    } else if (
      !/^[6-9]\d{9}$/.test(UserContactInformation.PhoneNumber.trim())
    ) {
      errors.PhoneNumber = "Please enter a valid Indian phone number";
    }

    return errors;
  };

  const validateShippingAddress = () => {
    const errors: ValidationErrors["shipping"] = {};

    if (!UserShippingAddress.StreetAddress.trim()) {
      errors.StreetAddress = "Street address is required";
    } else if (UserShippingAddress.StreetAddress.trim().length < 5) {
      errors.StreetAddress = "Please enter a valid address";
    }

    if (!UserShippingAddress.City.trim()) {
      errors.City = "City is required";
    } else if (UserShippingAddress.City.trim().length < 2) {
      errors.City = "Please enter a valid city";
    }

    if (!UserShippingAddress.State) {
      errors.State = "State is required";
    }

    if (!UserShippingAddress.PinCode.trim()) {
      errors.PinCode = "PIN code is required";
    } else if (!/^\d{6}$/.test(UserShippingAddress.PinCode.trim())) {
      errors.PinCode = "Please enter a valid 6-digit PIN code";
    }

    return errors;
  };

  const validateForm = () => {
    const contactErrors = validateContactInfo();
    const shippingErrors = validateShippingAddress();

    const hasErrors =
      Object.keys(contactErrors).length > 0 ||
      Object.keys(shippingErrors).length > 0;

    setValidationErrors({
      contact: contactErrors,
      shipping: shippingErrors,
    });

    return !hasErrors;
  };

  const HandleContactInformation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserContactInformation((prev) => ({ ...prev, [name]: value }));
    setIsFormTouched(true);

    // Clear validation error for this field
    if (
      validationErrors.contact?.[name as keyof typeof validationErrors.contact]
    ) {
      setValidationErrors((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [name]: undefined,
        },
      }));
    }
  };

  const HandleShippingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserShippingAddress((prev) => ({ ...prev, [name]: value }));
    setIsFormTouched(true);

    // Clear validation error for this field
    if (
      validationErrors.shipping?.[
        name as keyof typeof validationErrors.shipping
      ]
    ) {
      setValidationErrors((prev) => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          [name]: undefined,
        },
      }));
    }
  };

  const handleStateChange = (val: string) => {
    setUserShippingAddress((prev) => ({
      ...prev,
      State: val,
    }));
    setIsFormTouched(true);

    // Clear state validation error
    if (validationErrors.shipping?.State) {
      setValidationErrors((prev) => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          State: undefined,
        },
      }));
    }
  };

  const { mutate: completeOrder, isPending } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      toast.success("Order created successfully!");

      openRazorpay(
        {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          orderId: data.order.id,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "shidah.in",
          description: "Secure payment with Razorpay",
          prefill: {
            name: `${UserContactInformation.FirstName} ${UserContactInformation.LastName}`,
            email: UserContactInformation.EmailAddress,
            contact: UserContactInformation.PhoneNumber,
          },
          dbOrderId: data.dbOrderId, // ✔ IMPORTANT
        },
        setProcessingPayment // ✔ SECOND ARGUMENT
      );
    },
  });

  const handleCompleteOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Validate form before proceeding
    if (!validateForm()) {
      toast.error("Please fix the errors in the form before proceeding.");
      // Scroll to first error
      const firstErrorElement = document.querySelector(
        '[class*="error-message"]'
      );
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
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

  // Helper component for error messages
  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;

    return (
      <div className="flex items-center gap-1 text-sm text-destructive mt-1 error-message">
        <AlertCircle className="h-3 w-3" />
        <span>{message}</span>
      </div>
    );
  };

   

  return (
    <>
    {processingPayment && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto mb-4" />
          <p className="text-lg font-medium">
            Processing your payment…
          </p>
        </div>
      </div>
    )}
    
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 p-0 h-auto text-muted-foreground hover:text-foreground"
            onClick={() => router.back()}
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
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      onChange={HandleContactInformation}
                      name="FirstName"
                      value={UserContactInformation.FirstName}
                      className={
                        validationErrors.contact?.FirstName
                          ? "border-destructive"
                          : ""
                      }
                      required
                    />
                    <ErrorMessage
                      message={validationErrors.contact?.FirstName}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      onChange={HandleContactInformation}
                      name="LastName"
                      value={UserContactInformation.LastName}
                      className={
                        validationErrors.contact?.LastName
                          ? "border-destructive"
                          : ""
                      }
                      required
                    />
                    <ErrorMessage
                      message={validationErrors.contact?.LastName}
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
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9756789643"
                    onChange={HandleContactInformation}
                    name="PhoneNumber"
                    value={UserContactInformation.PhoneNumber}
                    className={
                      validationErrors.contact?.PhoneNumber
                        ? "border-destructive"
                        : ""
                    }
                    required
                  />
                  <ErrorMessage
                    message={validationErrors.contact?.PhoneNumber}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Must be a valid Indian phone number (10 digits starting with
                    6-9)
                  </p>
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
                  <Label htmlFor="streetAddress">Street Address *</Label>
                  <Input
                    id="streetAddress"
                    name="StreetAddress"
                    placeholder="123 Main Street"
                    value={UserShippingAddress.StreetAddress}
                    onChange={HandleShippingAddress}
                    className={
                      validationErrors.shipping?.StreetAddress
                        ? "border-destructive"
                        : ""
                    }
                    required
                  />
                  <ErrorMessage
                    message={validationErrors.shipping?.StreetAddress}
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
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="City"
                      placeholder="New York"
                      value={UserShippingAddress.City}
                      onChange={HandleShippingAddress}
                      className={
                        validationErrors.shipping?.City
                          ? "border-destructive"
                          : ""
                      }
                      required
                    />
                    <ErrorMessage message={validationErrors.shipping?.City} />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={UserShippingAddress.State}
                      onValueChange={handleStateChange}
                    >
                      <SelectTrigger
                        className={
                          validationErrors.shipping?.State
                            ? "border-destructive"
                            : ""
                        }
                      >
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
                    <ErrorMessage message={validationErrors.shipping?.State} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    name="PinCode"
                    placeholder="10001"
                    value={UserShippingAddress.PinCode}
                    onChange={HandleShippingAddress}
                    className={
                      validationErrors.shipping?.PinCode
                        ? "border-destructive"
                        : ""
                    }
                    required
                  />
                  <ErrorMessage message={validationErrors.shipping?.PinCode} />
                  <p className="text-xs text-muted-foreground mt-1">
                    6-digit Indian PIN code
                  </p>
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
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Validation summary */}
                {isFormTouched &&
                  (validationErrors.contact || validationErrors.shipping) && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                      <p className="text-sm text-destructive font-medium mb-2">
                        Please fix the following errors:
                      </p>
                      <ul className="text-sm text-destructive list-disc pl-4 space-y-1">
                        {validationErrors.contact?.FirstName && (
                          <li>
                            First Name: {validationErrors.contact.FirstName}
                          </li>
                        )}
                        {validationErrors.contact?.LastName && (
                          <li>
                            Last Name: {validationErrors.contact.LastName}
                          </li>
                        )}
                        {validationErrors.contact?.PhoneNumber && (
                          <li>
                            Phone Number: {validationErrors.contact.PhoneNumber}
                          </li>
                        )}
                        {validationErrors.shipping?.StreetAddress && (
                          <li>
                            Street Address:{" "}
                            {validationErrors.shipping.StreetAddress}
                          </li>
                        )}
                        {validationErrors.shipping?.City && (
                          <li>City: {validationErrors.shipping.City}</li>
                        )}
                        {validationErrors.shipping?.State && (
                          <li>State: {validationErrors.shipping.State}</li>
                        )}
                        {validationErrors.shipping?.PinCode && (
                          <li>PIN Code: {validationErrors.shipping.PinCode}</li>
                        )}
                      </ul>
                    </div>
                  )}

                {/* Complete Order Button */}
                <Button
                  className="w-full h-12 text-base font-semibold mt-2"
                  size="lg"
                  onClick={handleCompleteOrder}
                  disabled={isPending || items.length === 0}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {isPending
                    ? "Processing..."
                    : items.length === 0
                    ? "Cart is Empty"
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
    </>
  );
}
