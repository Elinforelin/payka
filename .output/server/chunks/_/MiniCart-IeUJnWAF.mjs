import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { c as createLucideIcon, a as useCart } from "./router-W9GWQRv5.mjs";
import { r as resolveProductImageUrl } from "./product-images-BiZ8ytiZ.mjs";
import { Link } from "@tanstack/react-router";
import { S as ShoppingBag, X } from "./x.mjs";
import { T as Trash2, P as Plus } from "./trash-2.mjs";
import { M as Minus } from "./minus.mjs";
const __iconNode$1 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m9 10 2 2 4-4", key: "1gnqz4" }]
];
const BookmarkCheck = createLucideIcon("bookmark-check", __iconNode$1);
const __iconNode = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
];
const Bookmark = createLucideIcon("bookmark", __iconNode);
const MiniCart = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { items, updateQuantity, removeFromCart, toggleSaveForLater, totalItems, totalPrice } = useCart();
  const activeItems = items.filter((item) => !item.savedForLater);
  const savedItems = items.filter((item) => item.savedForLater);
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform hover:scale-105",
        children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" }),
          totalItems > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -right-1 -top-1 flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-[#b3917d] text-[10px] md:text-xs font-bold text-white shadow-md", children: totalItems })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]",
          onClick: () => setIsOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "fixed sm:absolute right-0 sm:right-0 bottom-0 sm:bottom-auto z-50 mt-4 w-full sm:w-[400px] overflow-hidden rounded-t-[32px] sm:rounded-[32px] bg-white shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom sm:slide-in-from-top-4 duration-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-[#f0ebe7] px-6 py-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#1a1a1a]", children: t("common.cart") }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsOpen(false),
              className: "rounded-full p-2 text-[#a19690] hover:bg-[#fdfaf7] hover:text-[#1a1a1a] transition-colors",
              children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "max-h-[60vh] overflow-y-auto px-6 py-4 no-scrollbar", children: items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fdfaf7]", children: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-8 w-8 text-[#b3917d] opacity-40" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-[#1a1a1a]", children: t("cart.empty") }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-[#a19690]", children: t("cart.empty_desc") })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          activeItems.length > 0 && /* @__PURE__ */ jsx("div", { className: "space-y-4", children: activeItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/product/$productId",
                params: { productId: String(item.id) },
                onClick: () => setIsOpen(false),
                className: "h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-[#f7f3ef]",
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: resolveProductImageUrl(item.imageUrl),
                    alt: t(item.name),
                    className: "h-full w-full object-cover"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col justify-between py-1", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: "/product/$productId",
                      params: { productId: String(item.id) },
                      onClick: () => setIsOpen(false),
                      className: "font-bold text-[#1a1a1a] hover:text-[#b3917d] transition-colors",
                      children: t(item.name)
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => removeFromCart(item.id),
                      className: "text-[#a19690] hover:text-red-500 transition-colors",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-[#b3917d]", children: [
                  "₴",
                  item.price
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-[#fdfaf7] p-1 shadow-inner", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => updateQuantity(item.id, item.quantity - 1),
                      className: "flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#1a1a1a] shadow-sm hover:bg-[#f0ebe7] transition-colors",
                      children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "min-w-[1.5rem] text-center text-sm font-bold text-[#1a1a1a]", children: item.quantity }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => updateQuantity(item.id, item.quantity + 1),
                      className: "flex h-7 w-7 items-center justify-center rounded-lg bg-[#1a1a1a] text-white shadow-sm hover:bg-black transition-colors",
                      children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => toggleSaveForLater(item.id),
                    className: "flex items-center gap-1.5 text-xs font-medium text-[#a19690] hover:text-[#b3917d] transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(Bookmark, { className: "h-3.5 w-3.5" }),
                      t("common.save_for_later")
                    ]
                  }
                )
              ] })
            ] })
          ] }, item.id)) }),
          savedItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "pt-4", children: [
            /* @__PURE__ */ jsxs("h4", { className: "mb-4 flex items-center gap-2 text-sm font-bold text-[#a19690] uppercase tracking-wider", children: [
              /* @__PURE__ */ jsx(BookmarkCheck, { className: "h-4 w-4" }),
              t("cart.saved_for_later"),
              " (",
              savedItems.length,
              ")"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4 opacity-70", children: savedItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-[#f7f3ef] grayscale", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: resolveProductImageUrl(item.imageUrl),
                  alt: t(item.name),
                  className: "h-full w-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col justify-center", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-[#1a1a1a]", children: t(item.name) }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => removeFromCart(item.id),
                      className: "text-[#a19690] hover:text-red-500",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-xs font-bold text-[#b3917d]", children: [
                    "₴",
                    item.price
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => toggleSaveForLater(item.id),
                      className: "text-xs font-bold text-[#b3917d] hover:underline",
                      children: t("common.move_to_cart")
                    }
                  )
                ] })
              ] })
            ] }, item.id)) })
          ] })
        ] }) }),
        activeItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-t border-[#f0ebe7] bg-[#fdfaf7] px-6 py-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#a19690]", children: t("cart.total_amount") }),
            /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-[#1a1a1a]", children: [
              "₴",
              totalPrice
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/cart",
              onClick: () => setIsOpen(false),
              className: "block w-full rounded-2xl bg-[#1a1a1a] py-4 text-center font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]",
              children: t("common.checkout")
            }
          )
        ] })
      ] })
    ] })
  ] });
};
export {
  MiniCart as M
};
