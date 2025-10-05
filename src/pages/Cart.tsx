import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Cart() {
  const { cartItems, products, loading, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();

  const subtotal = getCartTotal();
  const shipping = 0;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-elegant mb-8">Your Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-elegant mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground/30" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link to="/shop">
              <Button size="lg" className="rounded-full btn-primary-gradient text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = products.get(item.productId);
                if (!product) return null;

                return (
                  <Card key={item.id} className="card-elegant">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-pink-soft/30 to-cream flex-shrink-0">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive flex-shrink-0"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-border rounded-full">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-l-full h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="rounded-r-full h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-lg font-bold text-primary">${parseFloat(product.price).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div>
              <Card className="card-elegant sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-xl font-semibold text-elegant">Order Summary</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({getCartCount()} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <Button
                      size="lg"
                      className="w-full rounded-full btn-primary-gradient text-white"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link to="/shop">
                    <Button variant="outline" size="lg" className="w-full rounded-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
