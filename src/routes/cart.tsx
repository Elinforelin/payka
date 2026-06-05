import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { resolveProductImageUrl } from "@/lib/product-images.ts";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { t } = useTranslation();
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const activeItems = items.filter(item => !item.savedForLater);

  return (
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
      <header className="flex items-center justify-between mb-8">
        <Link
          to="/catalog"
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
        </Link>
        <h1 className="text-lg md:text-xl font-bold text-[#1a1a1a]">{t('cart.title')}</h1>
        <div className="w-10 md:w-12" /> {/* Spacer */}
      </header>

      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">{t('cart.order_summary')}</h2>
          <span className="text-sm md:text-base text-[#6b5f59]">
            {t('cart.items_count', { count: totalItems })}
          </span>
        </div>

        <div className="space-y-4 mb-8">
          {activeItems.length === 0 ? (
            <div className="rounded-[32px] bg-white p-12 text-center shadow-sm">
              <p className="text-lg font-medium text-[#1a1a1a]">{t('cart.empty')}</p>
              <Link to="/catalog" className="mt-4 inline-block font-bold text-[#b3917d] hover:underline">
                {t('cart.continue_shopping')}
              </Link>
            </div>
          ) : (
            activeItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-[32px] bg-white p-4 shadow-sm"
              >
                <Link 
                  to="/product/$productId" 
                  params={{ productId: String(item.id) }}
                  className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-[#f7f3ef]"
                >
                  <img
                    src={resolveProductImageUrl(item.imageUrl)}
                    alt={t(item.name)}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex-1 text-center sm:text-left">
                  <Link 
                    to="/product/$productId" 
                    params={{ productId: String(item.id) }}
                    className="text-base md:text-lg font-bold text-[#1a1a1a] hover:text-[#b3917d] transition-colors"
                  >
                    {t(item.name)}
                  </Link>
                  <p className="text-base md:text-lg font-bold text-[#b3917d]">
                    ${item.price}
                  </p>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-3">
                  <div className="flex items-center gap-3 rounded-xl bg-[#fdfaf7] p-1 shadow-inner order-2 sm:order-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1a1a1a] shadow-sm hover:bg-[#f0ebe7] transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[1.5rem] text-center font-bold text-[#1a1a1a]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a1a1a] text-white shadow-sm hover:bg-black transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#a19690] hover:text-red-500 transition-colors order-1 sm:order-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {activeItems.length > 0 && (
          <div className="rounded-[32px] bg-white p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <span className="text-base md:text-lg text-[#a19690]">{t('cart.total_amount')}</span>
              <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">${totalPrice}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center rounded-[24px] bg-[#1a1a1a] py-4 md:py-5 text-base md:text-lg font-bold text-white shadow-xl transition-all hover:bg-black active:scale-[0.98]"
            >
              {t('cart.proceed_to_payment')}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
