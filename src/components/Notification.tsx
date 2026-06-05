import React from 'react';
import { useCart } from '@/lib/cart-context';
import { useFavorites } from '@/lib/favorites-context';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Notification: React.FC = () => {
  const { t } = useTranslation();
  const { notification: cartNotification } = useCart();
  const { notification: favoriteNotification } = useFavorites();

  const notification = cartNotification || favoriteNotification;

  if (!notification) return null;

  return (
    <div className="fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 rounded-[24px] bg-[#1a1a1a] px-6 py-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
        <CheckCircle2 className="h-5 w-5 text-[#b3917d]" />
        <p className="font-bold tracking-tight">
          {t(notification.key, notification.params)}
        </p>
      </div>
    </div>
  );
};
