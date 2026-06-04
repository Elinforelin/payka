import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { resolveProductImageUrl } from "@/lib/product-images.ts";
import { getUAWordEnding } from "@/utils/string-formatters.ts";

export const Route = createFileRoute("/cart")({ component: CartPage });

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export const STORAGE_KEY = "payka.cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  // useEffect(() => {
  //   writeCart(items);
  // }, [items]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  const increment = (id: string) => {
    setItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
      );

      writeCart(updatedItems);

      return updatedItems;
    });
  };

  const decrement = (id: string) => {
    setItems((prev) => {
      const updatedItems = prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
            : item,
        )
        .filter((item) => item.quantity > 0);

      writeCart(updatedItems);

      return updatedItems;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      writeCart(updatedItems);
      return updatedItems;
    });
  };

  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <main className="min-h-screen px-6 py-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[#a48574] hover:text-[#8a6f5e]"
      >
        ← Назад
      </Link>

      <section className="mx-auto max-w-md space-y-6 rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Обрані</h1>
          <span className="text-xs text-[#6b5f59]">
            {totalItems} {getUAWordEnding("прикрас", totalItems)}
          </span>
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-2xl bg-[#f7f2ee] p-6 text-center text-sm text-[#6b5f59]">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-2xl bg-[#f7f2ee] p-3"
              >
                <div className="h-12 w-12 overflow-hidden rounded-xl bg-[#e1d3c8]">
                  <img
                    src={resolveProductImageUrl(item.imageUrl)}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-[#6b5f59]">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="grid h-7 w-7 place-items-center rounded-full border border-[#eadfd7] text-sm"
                    onClick={() => decrement(item.id)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="min-w-5 text-center text-xs">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="grid h-7 w-7 place-items-center rounded-full border border-[#eadfd7] text-sm"
                    onClick={() => increment(item.id)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="ml-1 text-xs text-[#a48574]"
                  onClick={() => removeItem(item.id)}
                >
                  Прибрати
                </button>
              </div>
            ))
          )}
        </div>

        <div className="rounded-2xl bg-[#f7f2ee] p-4 text-sm">
          <div className="flex justify-between font-semibold">
            <span>Всього</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full rounded-full bg-[#a48574] px-6 py-3 text-sm font-semibold text-white">
          Замовити
        </button>
      </section>
    </main>
  );
}
