import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './data';

export interface CartItem extends Product {
  quantity: number;
  savedForLater?: boolean;
}

interface NotificationData {
  key: string;
  params?: Record<string, any>;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleSaveForLater: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  notification: NotificationData | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e);
        }
      }
    }
    return [];
  });
  const [notification, setNotification] = useState<NotificationData | null>(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1, savedForLater: false } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1, savedForLater: false }];
    });
    
    setNotification({ key: 'notifications.added_to_cart', params: { name: product.name } });
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const toggleSaveForLater = (productId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, savedForLater: !item.savedForLater } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const activeItems = items.filter(item => !item.savedForLater);
  const totalItems = activeItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = activeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSaveForLater,
        clearCart,
        totalItems,
        totalPrice,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
