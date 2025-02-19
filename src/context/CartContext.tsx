"use client";

import { createContext, useContext, useState } from 'react';
import type { ProductDetails } from '../types';

interface CartItem {
  product: ProductDetails;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: ProductDetails) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: ProductDetails) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { product, quantity: 1 }];
    });
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export interface ProductDetails {
  id: string;
  title: string;
  price: number;
  images?: string[]; // If you're using an array of images
  image?: string;    // Add this for single image support
  quantity: number;
} 