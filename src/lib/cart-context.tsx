import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from './data';
import { getEffectivePrice } from './product-price';

export interface CartItem extends Product {
  quantity: number;
  savedForLater?: boolean;
  selectedStone?: string;
  selectedStoneColor?: string;
  selectedSize?: string;
}

export type CartItemVariant = Pick<
  CartItem,
  'id' | 'selectedStone' | 'selectedStoneColor' | 'selectedSize'
>;

/** Unique key for a cart line: same product + different size/stone = separate lines. */
export function getCartItemKey(item: CartItemVariant): string {
  return [
    item.id,
    item.selectedSize ?? '',
    item.selectedStone ?? '',
    item.selectedStoneColor ?? '',
  ].join('::');
}

export function getCartItemVariants(item: CartItemVariant): {
  stoneType?: string;
  stoneColor?: string;
  size?: string;
} {
  const stoneType = item.selectedStoneColor
    ? item.selectedStone
    : item.selectedStone?.includes(': ')
      ? item.selectedStone.split(': ')[0]
      : item.selectedStone;
  const stoneColor =
    item.selectedStoneColor ??
    (item.selectedStone?.includes(': ')
      ? item.selectedStone.split(': ').slice(1).join(': ')
      : undefined);

  return {
    size: item.selectedSize,
    stoneType,
    stoneColor,
  };
}

interface NotificationData {
  key: string;
  params?: Record<string, any>;
  withCartActions?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    selectedStone?: string,
    selectedSize?: string,
    selectedStoneColor?: string,
  ) => void;
  removeFromCart: (cartItemKey: string) => void;
  updateQuantity: (cartItemKey: string, quantity: number) => void;
  toggleSaveForLater: (cartItemKey: string) => void;
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

  const addToCart = (
    product: Product,
    selectedStone?: string,
    selectedSize?: string,
    selectedStoneColor?: string,
  ) => {
    const pricedProduct = { ...product, price: getEffectivePrice(product) };
    const lineKey = getCartItemKey({
      id: product.id,
      selectedStone,
      selectedSize,
      selectedStoneColor,
    });

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => getCartItemKey(item) === lineKey);
      if (existingItem) {
        return prevItems.map((item) =>
          getCartItemKey(item) === lineKey
            ? {
                ...item,
                ...pricedProduct,
                quantity: item.quantity + 1,
                savedForLater: false,
                selectedStone,
                selectedStoneColor,
                selectedSize,
              }
            : item
        );
      }
      return [
        ...prevItems,
        {
          ...pricedProduct,
          quantity: 1,
          savedForLater: false,
          selectedStone,
          selectedStoneColor,
          selectedSize,
        },
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

  const removeFromCart = (cartItemKey: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => getCartItemKey(item) !== cartItemKey)
    );
  };

  const updateQuantity = (cartItemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemKey);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        getCartItemKey(item) === cartItemKey ? { ...item, quantity } : item
      )
    );
  };

  const toggleSaveForLater = (cartItemKey: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        getCartItemKey(item) === cartItemKey
          ? { ...item, savedForLater: !item.savedForLater }
          : item
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
