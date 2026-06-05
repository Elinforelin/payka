import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Category, Product } from './data';

export interface FavoriteItem extends Product {
  categoryName?: string | Category;
}

interface NotificationData {
  key: string;
  params?: Record<string, any>;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (product: Product, category?: string | Category) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorited: (productId: number) => boolean;
  categories: (string | Category)[];
  addCategory: (name: string | Category) => void;
  notification: NotificationData | null;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        try {
          return JSON.parse(savedFavorites);
        } catch (e) {
          console.error('Failed to parse favorites', e);
        }
      }
    }
    return [];
  });
  const [categories, setCategories] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCategories = localStorage.getItem('favorite_categories');
      if (savedCategories) {
        try {
          return JSON.parse(savedCategories);
        } catch (e) {
          console.error('Failed to parse categories', e);
        }
      }
    }
    return ['General', 'Wishlist', 'Gift Ideas'];
  });
  const [notification, setNotification] = useState<NotificationData | null>(null);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('favorite_categories', JSON.stringify(categories));
  }, [categories]);

  const addToFavorites = (product: Product, category: string = 'General') => {
    setFavorites((prev) => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, { ...product, categoryName: category }];
    });
    setNotification({ key: 'notifications.added_to_favorite', params: { name: t(product.name), category } });
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  const isFavorited = (productId: number) => {
    return favorites.some((item) => item.id === productId);
  };

  const addCategory = (name: string) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorited,
        categories,
        addCategory,
        notification,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
