import React from 'react';
import { Link } from '@tanstack/react-router';
import { useCart } from '@/lib/cart-context';
import { useFavorites } from '@/lib/favorites-context';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Notification: React.FC = () => {
  const { t } = useTranslation();
  const { notification: cartNotification, clearNotification } = useCart();
  const { notification: favoriteNotification } = useFavorites();

  const notification = cartNotification || favoriteNotification;

  if (!notification) return null;

  const showCartActions = Boolean(cartNotification?.withCartActions);

  return (
    <div className="fixed bottom-8 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-[24px] bg-[#1a1a1a] px-5 py-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#b3917d]" />
          <p className="font-bold tracking-tight leading-snug">
            {t(notification.key, notification.params)}
          </p>
        </div>

        {showCartActions && (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              to="/cart"
              onClick={clearNotification}
              className="flex flex-1 items-center justify-center rounded-2xl bg-[#b3917d] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#9a7a68]"
            >
              {t('notifications.go_to_cart')}
            </Link>
            <Link
              to="/"
              onClick={clearNotification}
              className="flex flex-1 items-center justify-center rounded-2xl bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/15"
            >
              {t('notifications.continue_shopping')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
