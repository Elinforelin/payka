import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { L as LanguageToggle } from "./LanguageToggle-_RTdtCBY.mjs";
import { useTranslation } from "react-i18next";
import { r as resolveProductImageUrl } from "./product-images-XBZXgYgm.mjs";
import { a as useCart } from "./router-D4PKThx1.mjs";
import { C as ChevronLeft } from "./chevron-left.mjs";
import { M as Minus } from "./minus.mjs";
import { P as Plus, T as Trash2 } from "./trash-2.mjs";
import "./me-3RncXd2G.mjs";
import "react";
import "i18next";
import "i18next-browser-languagedetector";
import "./uk-CdVMwhvi.mjs";
import "./server.mjs";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "../../index.mjs";
import "node:http";
import "node:stream";
import "node:https";
import "node:http2";
import "node:fs";
import "node:url";
import "node:path";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "./data-C0dK635X.mjs";
function CartPage() {
  const {
    t
  } = useTranslation();
  const {
    items,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems
  } = useCart();
  const activeItems = items.filter((item) => !item.savedForLater);
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-lg md:text-xl font-bold text-[#1a1a1a]", children: t("cart.title") }),
      /* @__PURE__ */ jsx(LanguageToggle, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 px-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-[#1a1a1a]", children: t("cart.order_summary") }),
        /* @__PURE__ */ jsx("span", { className: "text-sm md:text-base text-[#6b5f59]", children: t("cart.items_count", {
          count: totalItems
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-8", children: activeItems.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-[32px] bg-white p-12 text-center shadow-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-[#1a1a1a]", children: t("cart.empty") }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-4 inline-block font-bold text-[#b3917d] hover:underline", children: t("cart.continue_shopping") })
      ] }) : activeItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-[32px] bg-white p-4 shadow-sm", children: [
        /* @__PURE__ */ jsx(Link, { to: "/product/$productId", params: {
          productId: String(item.id)
        }, className: "h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-[#f7f3ef]", children: /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(item.imageUrl), alt: t(item.name), className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
          /* @__PURE__ */ jsx(Link, { to: "/product/$productId", params: {
            productId: String(item.id)
          }, className: "text-base md:text-lg font-bold text-[#1a1a1a] hover:text-[#b3917d] transition-colors", children: t(item.name) }),
          item.selectedSize && /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#a19690]", children: [
            t("cart.size"),
            ": ",
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[#6b5f59]", children: item.selectedSize })
          ] }),
          item.selectedStone && /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#a19690]", children: [
            t("cart.stone"),
            ": ",
            /* @__PURE__ */ jsx("span", { className: "font-medium text-[#6b5f59]", children: item.selectedStone })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-base md:text-lg font-bold text-[#b3917d]", children: [
            "₴",
            item.price
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-[#fdfaf7] p-1 shadow-inner order-2 sm:order-1", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => updateQuantity(item.id, item.quantity - 1), className: "flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1a1a1a] shadow-sm hover:bg-[#f0ebe7] transition-colors", children: /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsx("span", { className: "min-w-[1.5rem] text-center font-bold text-[#1a1a1a]", children: item.quantity }),
            /* @__PURE__ */ jsx("button", { onClick: () => updateQuantity(item.id, item.quantity + 1), className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a1a1a] text-white shadow-sm hover:bg-black transition-colors", children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => removeFromCart(item.id), className: "text-[#a19690] hover:text-red-500 transition-colors order-1 sm:order-2", children: /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5" }) })
        ] })
      ] }, item.id)) }),
      activeItems.length > 0 && /* @__PURE__ */ jsxs("div", { className: "rounded-[32px] bg-white p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsx("span", { className: "text-base md:text-lg text-[#a19690]", children: t("cart.total_amount") }),
          /* @__PURE__ */ jsxs("span", { className: "text-2xl md:text-3xl font-bold text-[#1a1a1a]", children: [
            "₴",
            totalPrice
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/checkout", className: "block w-full text-center rounded-[24px] bg-[#1a1a1a] py-4 md:py-5 text-base md:text-lg font-bold text-white shadow-xl transition-all hover:bg-black active:scale-[0.98]", children: t("cart.proceed_to_payment") })
      ] })
    ] })
  ] });
}
export {
  CartPage as component
};
