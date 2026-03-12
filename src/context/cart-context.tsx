"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string; // UUID from backend
  slug: string; // needed at order time
  name: string;
  price: number; // number — not string, no more regex parsing
  image: string;
  quantity: number;
  itemType: "PRODUCT" | "PACKAGE";
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  cartTotal: number;
  cartCount: number;
  isLoaded: boolean;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "uf_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  /**
   * Initialize items directly from localStorage via the useState lazy initializer.
   * This pattern avoids calling setState inside a useEffect body (which the React
   * Compiler flags as a cascading-render risk). The lazy initializer runs once on
   * mount, server-side it simply returns [] since window is undefined.
   */
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  // isLoaded uses the same lazy-initializer pattern as items:
  // returns true immediately on the client, false on the server (SSR).
  // No useEffect needed — no cascading renders.
  const [isLoaded] = useState<boolean>(() => typeof window !== "undefined");



  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const cartTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const addItem = (
    newItem: Omit<CartItem, "quantity"> & { quantity?: number },
  ) => {
    const quantity = newItem.quantity ?? 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { ...newItem, quantity }];
    });
    toast.success(`${newItem.name} added to cart`);
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const increment = (id: string) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );

  const decrement = (id: string) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        cartTotal,
        cartCount,
        isLoaded,
        addItem,
        removeItem,
        increment,
        decrement,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
