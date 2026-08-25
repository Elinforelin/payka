import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from './data';
import { getEffectivePrice } from './product-price';

export interface CartItem extends Product {
  quantity: number;
  savedForLater?: boolean;
  selectedStone?: string;
  selectedSize?: string;
}

interface NotificationData {
  key: string;
  params?: Record<string, any>;
  withCartActions?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedStone?: string, selectedSize?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  toggleSaveForLater: (productId: number) => void;
  clearCart: () => void;
  clearNotification: () => void;
  totalItems: number;
  totalPrice: number;
  notification: NotificationData | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
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
  const notificationTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearNotification = () => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = null;
    }
    setNotification(null);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const addToCart = (product: Product, selectedStone?: string, selectedSize?: string) => {
    const pricedProduct = { ...product, price: getEffectivePrice(product) };
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                ...pricedProduct,
                quantity: item.quantity + 1,
                savedForLater: false,
                selectedStone,
                selectedSize,
              }
            : item
        );
      }
      return [
        ...prevItems,
        { ...pricedProduct, quantity: 1, savedForLater: false, selectedStone, selectedSize },
      ];
    });

    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification({
      key: 'notifications.added_to_cart',
      params: { name: t(product.name) },
      withCartActions: true,
    });
    notificationTimeoutRef.current = setTimeout(() => setNotification(null), 8000);
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
        clearNotification,
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
