"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartItem {
  id: string; // Product ID or Root Package ID (expected by backend)
  slug: string; // needed at order time
  name: string;
  price: number;
  image: string;
  quantity: number;
  itemType: "PRODUCT" | "PACKAGE";
  size?: string;
  color?: string;
  // Package-specific fields
  selectedPropertyId?: string;
  selectedAddOnIds?: string[];
  selectedAddOns?: Array<{ id: string; title: string; price: number }>;
  packageBaseName?: string;
}

interface CartContextType {
  items: CartItem[];
  cartTotal: number;
  cartCount: number;
  isLoaded: boolean;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "uf_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

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
      const existingIndex = prev.findIndex((i) => i.id === newItem.id);

      if (existingIndex > -1) {
        return prev.map((item, index) => {
          if (index === existingIndex) {
            if (item.itemType === "PACKAGE") {
              // Replace existing package with new selection (new property/addons)
              return { ...newItem, quantity: 1 } as CartItem;
            }
            // Increment product quantity
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      }

      // Add new item
      return [...prev, { ...newItem, quantity: newItem.itemType === "PACKAGE" ? 1 : quantity } as CartItem];
    });
  };

  const updateItem = (id: string, updates: Partial<CartItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const increment = (id: string) =>
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // Don't increment quantity for packages
          if (item.itemType === "PACKAGE") return item;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }),
    );

  const decrement = (id: string) =>
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // Don't decrement quantity for packages below 1 (handled by parent logic usually)
          if (item.itemType === "PACKAGE") return item;
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      }),
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
        updateItem,
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
