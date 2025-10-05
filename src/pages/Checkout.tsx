import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { TEMP_USER_ID } from "@/contexts/CartContext";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const navigate = useNavigate();
  const { getCartTotal, cartItems } = useCart();
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateAddress = () => {
    const required = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode"];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!validateAddress()) return;
    
    setLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load payment gateway");
      setLoading(false);
      return;
    }

    const total = getCartTotal();
    
    try {
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "INR",
        }),
      });

      if (!orderResponse.ok) throw new Error("Failed to create order");
      
      const orderData = await orderResponse.json();

      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID || "rzp_live_ROz0SG1CcePViw",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Enoormous Organic Products",
        description: "Payment for your order",
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_data: {
                  userId: TEMP_USER_ID,
                  totalAmount: total.toString(),
                  shippingAddress: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                  },
                },
              }),
            });

            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              setOrderId(verifyData.order.id);
              setOrderComplete(true);
              toast.success("Payment successful!");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#C48B9F",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            toast.error("Payment cancelled");
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

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
              <p className="text-sm text-muted-foreground mb-2">Order ID</p>
              <p className="text-2xl font-bold">{orderId || "#ENO-" + Math.floor(Math.random() * 100000)}</p>
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

        <div className="flex items-center justify-center mb-12">
          {[1, 2].map((s) => (
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
              {s < 2 && (
                <div
                  className={`w-24 h-1 ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card className="card-elegant">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-elegant mb-6">
                Delivery Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter last name" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Email</Label>
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Phone</Label>
                  <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Address</Label>
                  <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="Street address" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input name="state" value={formData.state} onChange={handleInputChange} placeholder="State" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>ZIP Code</Label>
                  <Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="PIN Code" />
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <Button
                  size="lg"
                  onClick={() => validateAddress() && setStep(2)}
                  className="rounded-full btn-primary-gradient text-white"
                >
                  Continue to Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="card-elegant">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-elegant mb-6">
                Payment Summary
              </h2>
              
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary">₹{getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Secure Payment via Razorpay</strong><br/>
                  Your payment will be processed securely through Razorpay. You can pay using Card, UPI, Net Banking, or Wallet.
                </p>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="rounded-full"
                  disabled={loading}
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={handlePayment}
                  className="rounded-full btn-primary-gradient text-white"
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? "Processing..." : "Pay Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
