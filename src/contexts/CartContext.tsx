import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";
import type { CartItem, Product } from "@shared/schema";
import { toast } from "sonner";

const TEMP_USER_ID = "00000000-0000-0000-0000-000000000000";

interface CartContextType {
  cartItems: CartItem[];
  products: Map<string, Product>;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Map<string, Product>>(new Map());
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const items = await api.cart.get(TEMP_USER_ID);
      setCartItems(items);
      
      const productIds = items.map(item => item.productId);
      const productMap = new Map<string, Product>();
      
      for (const id of productIds) {
        const product = await api.products.getById(id);
        productMap.set(id, product);
      }
      
      setProducts(productMap);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const existingItem = cartItems.find(item => item.productId === productId);
      
      if (existingItem) {
        await api.cart.update(existingItem.id, existingItem.quantity + quantity);
      } else {
        await api.cart.add(TEMP_USER_ID, productId, quantity);
      }
      
      await fetchCart();
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      await api.cart.update(itemId, quantity);
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      await api.cart.remove(itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      toast.error("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await api.cart.clear(TEMP_USER_ID);
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.get(item.productId);
      if (!product) return total;
      return total + parseFloat(product.price) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        products,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

export { TEMP_USER_ID };
