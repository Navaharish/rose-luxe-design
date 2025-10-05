import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="card-elegant p-12 space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-elegant">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="bg-muted/50 rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="text-2xl font-bold">#ENO-{Math.floor(Math.random() * 100000)}</p>
            </div>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/shop">
                <Button size="lg" className="rounded-full btn-primary-gradient text-white">
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/account">
                <Button size="lg" variant="outline" className="rounded-full">
                  View Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-elegant mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? "bg-gradient-to-br from-primary to-secondary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-24 h-1 ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Delivery Address */}
        {step === 1 && (
          <Card className="card-elegant">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-elegant mb-6">
                Delivery Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Enter last name" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Phone</Label>
                  <Input placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Address</Label>
                  <Input placeholder="Street address" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label>ZIP Code</Label>
                  <Input placeholder="ZIP" />
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <Button
                  size="lg"
                  onClick={() => setStep(2)}
                  className="rounded-full btn-primary-gradient text-white"
                >
                  Continue to Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <Card className="card-elegant">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-elegant mb-6">
                Payment Method
              </h2>
              <RadioGroup defaultValue="card" className="space-y-4">
                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer">
                    UPI
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer">
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>

              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="rounded-full"
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => setStep(3)}
                  className="rounded-full btn-primary-gradient text-white"
                >
                  Review Order
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <Card className="card-elegant">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-elegant mb-6">
                Review Your Order
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Delivery Address</h3>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                    <p>John Doe</p>
                    <p>123 Main Street</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Payment Method</h3>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                    <p>Credit Card ending in 3456</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Order Summary</h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>$59.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-primary">$59.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="rounded-full"
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => setOrderComplete(true)}
                  className="rounded-full btn-primary-gradient text-white"
                >
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
