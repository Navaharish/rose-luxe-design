import type { Product, CartItem, Order, Review, Wishlist, Address } from "@shared/schema";

const API_BASE = "/api";

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    getById: async (id: string): Promise<Product> => {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
    create: async (data: Partial<Product>): Promise<Product> => {
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create product");
      return res.json();
    },
    update: async (id: string, data: Partial<Product>): Promise<Product> => {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update product");
      return res.json();
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
    },
  },
  
  cart: {
    get: async (userId: string): Promise<CartItem[]> => {
      const res = await fetch(`${API_BASE}/cart/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    add: async (userId: string, productId: string, quantity: number = 1): Promise<CartItem> => {
      const res = await fetch(`${API_BASE}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      return res.json();
    },
    update: async (id: string, quantity: number): Promise<CartItem> => {
      const res = await fetch(`${API_BASE}/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Failed to update cart item");
      return res.json();
    },
    remove: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/cart/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove from cart");
    },
    clear: async (userId: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/cart/user/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to clear cart");
    },
  },
  
  orders: {
    getAll: async (userId: string): Promise<Order[]> => {
      const res = await fetch(`${API_BASE}/orders/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    getById: async (id: string): Promise<Order> => {
      const res = await fetch(`${API_BASE}/order/${id}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      return res.json();
    },
    create: async (data: Partial<Order>): Promise<Order> => {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create order");
      return res.json();
    },
    updateStatus: async (id: string, status: string): Promise<Order> => {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update order status");
      return res.json();
    },
  },
  
  reviews: {
    getByProduct: async (productId: string): Promise<Review[]> => {
      const res = await fetch(`${API_BASE}/reviews/${productId}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
    create: async (data: Partial<Review>): Promise<Review> => {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create review");
      return res.json();
    },
  },
  
  wishlist: {
    get: async (userId: string): Promise<Wishlist[]> => {
      const res = await fetch(`${API_BASE}/wishlist/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      return res.json();
    },
    add: async (userId: string, productId: string): Promise<Wishlist> => {
      const res = await fetch(`${API_BASE}/wishlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      if (!res.ok) throw new Error("Failed to add to wishlist");
      return res.json();
    },
    remove: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/wishlist/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove from wishlist");
    },
  },
  
  addresses: {
    get: async (userId: string): Promise<Address[]> => {
      const res = await fetch(`${API_BASE}/addresses/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch addresses");
      return res.json();
    },
    create: async (data: Partial<Address>): Promise<Address> => {
      const res = await fetch(`${API_BASE}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create address");
      return res.json();
    },
    update: async (id: string, data: Partial<Address>): Promise<Address> => {
      const res = await fetch(`${API_BASE}/addresses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update address");
      return res.json();
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/addresses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete address");
    },
  },
};
