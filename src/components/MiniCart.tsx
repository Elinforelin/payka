import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Bookmark, BookmarkCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/lib/cart-context';
import { resolveProductImageUrl } from '@/lib/product-images';
import { Link } from '@tanstack/react-router';

export const MiniCart: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQuantity, removeFromCart, toggleSaveForLater, totalItems, totalPrice } = useCart();

  const activeItems = items.filter(item => !item.savedForLater);
  const savedItems = items.filter(item => item.savedForLater);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform hover:scale-105"
      >
        <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-[#b3917d] text-[10px] md:text-xs font-bold text-white shadow-md">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed sm:absolute right-0 sm:right-0 bottom-0 sm:bottom-auto z-50 mt-4 w-full sm:w-[400px] overflow-hidden rounded-t-[32px] sm:rounded-[32px] bg-white shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom sm:slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between border-b border-[#f0ebe7] px-6 py-5">
              <h3 className="text-xl font-bold text-[#1a1a1a]">{t('common.cart')}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-[#a19690] hover:bg-[#fdfaf7] hover:text-[#1a1a1a] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-6 py-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fdfaf7]">
                    <ShoppingBag className="h-8 w-8 text-[#b3917d] opacity-40" />
                  </div>
                  <p className="text-lg font-medium text-[#1a1a1a]">{t('cart.empty')}</p>
                  <p className="mt-1 text-sm text-[#a19690]">{t('cart.empty_desc')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeItems.length > 0 && (
                    <div className="space-y-4">
                      {activeItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <Link 
                            to="/product/$productId" 
                            params={{ productId: String(item.id) }}
                            onClick={() => setIsOpen(false)}
                            className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-[#f7f3ef]"
                          >
                            <img
                              src={resolveProductImageUrl(item.imageUrl)}
                              alt={t(item.name)}
                              className="h-full w-full object-cover"
                            />
                          </Link>
                          <div className="flex flex-1 flex-col justify-between py-1">
                            <div>
                              <div className="flex items-start justify-between">
                                <Link 
                                  to="/product/$productId" 
                                  params={{ productId: String(item.id) }}
                                  onClick={() => setIsOpen(false)}
                                  className="font-bold text-[#1a1a1a] hover:text-[#b3917d] transition-colors"
                                >
                                  {t(item.name)}
                                </Link>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-[#a19690] hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-sm font-bold text-[#b3917d]">${item.price}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-3 rounded-xl bg-[#fdfaf7] p-1 shadow-inner">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#1a1a1a] shadow-sm hover:bg-[#f0ebe7] transition-colors"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="min-w-[1.5rem] text-center text-sm font-bold text-[#1a1a1a]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1a1a1a] text-white shadow-sm hover:bg-black transition-colors"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => toggleSaveForLater(item.id)}
                                className="flex items-center gap-1.5 text-xs font-medium text-[#a19690] hover:text-[#b3917d] transition-colors"
                              >
                                <Bookmark className="h-3.5 w-3.5" />
                                {t('common.save_for_later')}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {savedItems.length > 0 && (
                    <div className="pt-4">
                      <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-[#a19690] uppercase tracking-wider">
                        <BookmarkCheck className="h-4 w-4" />
                        {t('cart.saved_for_later')} ({savedItems.length})
                      </h4>
                      <div className="space-y-4 opacity-70">
                        {savedItems.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-[#f7f3ef] grayscale">
                              <img
                                src={resolveProductImageUrl(item.imageUrl)}
                                alt={t(item.name)}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col justify-center">
                              <div className="flex items-start justify-between">
                                <span className="text-sm font-bold text-[#1a1a1a]">{t(item.name)}</span>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-[#a19690] hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="mt-1 flex items-center justify-between">
                                <p className="text-xs font-bold text-[#b3917d]">₴{item.price}</p>
                                <button
                                  onClick={() => toggleSaveForLater(item.id)}
                                  className="text-xs font-bold text-[#b3917d] hover:underline"
                                >
                                  {t('common.move_to_cart')}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {activeItems.length > 0 && (
              <div className="border-t border-[#f0ebe7] bg-[#fdfaf7] px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[#a19690]">{t('cart.total_amount')}</span>
                  <span className="text-2xl font-bold text-[#1a1a1a]">₴{totalPrice}</span>
                </div>
                <Link 
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-2xl bg-[#1a1a1a] py-4 text-center font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t('common.checkout')}
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
