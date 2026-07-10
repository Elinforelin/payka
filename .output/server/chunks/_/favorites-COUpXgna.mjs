import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { L as LanguageToggle } from "./7812354786123547-BzsHGh6s.mjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { u as useFavorites, a as useCart } from "./router-CIvS-aii.mjs";
import { r as resolveProductImageUrl } from "./product-images-CufF_jDU.mjs";
import { C as ChevronLeft } from "./chevron-left.mjs";
import { X, H as Heart, S as ShoppingBag } from "./x.mjs";
import { P as Plus, T as Trash2 } from "./trash-2.mjs";
import "i18next";
import "i18next-browser-languagedetector";
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
import "./data-B1DXlOW8.mjs";
function FavoritesPage() {
  const {
    t
  } = useTranslation();
  const {
    favorites,
    removeFromFavorites,
    categories,
    addCategory,
    removeCategory
  } = useFavorites();
  const BUILT_IN_CATEGORIES = ["General", "Wishlist", "Gift Ideas"];
  const {
    addToCart
  } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const filteredFavorites = activeCategory === "All" ? favorites : favorites.filter((item) => item.categoryName === activeCategory);
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-6 w-6 text-[#1a1a1a]" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-[#1a1a1a]", children: t("favorites.title") }),
      /* @__PURE__ */ jsx(LanguageToggle, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => setActiveCategory("All"), className: `whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${activeCategory === "All" ? "bg-[#b3917d] text-white shadow-md" : "bg-white text-[#6b5f59] hover:bg-[#f7f3ef]"}`, children: [
        t("favorites.all_items"),
        " (",
        favorites.length,
        ")"
      ] }),
      categories.map((cat) => /* @__PURE__ */ jsxs("div", { className: "flex flex-shrink-0 items-center gap-1 relative", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => setActiveCategory(cat), className: `whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${activeCategory === cat ? "bg-[#b3917d] text-white shadow-md" : "bg-white text-[#6b5f59] hover:bg-[#f7f3ef]"}`, children: [
          cat === "General" ? t("favorites.general") : cat === "Wishlist" ? t("favorites.wishlist") : cat === "Gift Ideas" ? t("favorites.gift_ideas") : cat,
          " (",
          favorites.filter((f) => f.categoryName === cat).length,
          ")"
        ] }),
        !BUILT_IN_CATEGORIES.includes(cat) && /* @__PURE__ */ jsx("button", { onClick: () => {
          if (activeCategory === cat) setActiveCategory("All");
          removeCategory(cat);
        }, className: "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#a19690] hover:bg-red-50 hover:text-red-500 transition-colors absolute right-[-4px]", children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" }) })
      ] }, cat)),
      /* @__PURE__ */ jsx("button", { onClick: () => setIsAddingCategory(true), className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#b3917d] shadow-sm hover:bg-[#b3917d] hover:text-white transition-all", children: /* @__PURE__ */ jsx(Plus, { className: "h-5 w-5" }) })
    ] }),
    isAddingCategory && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleAddCategory, className: "w-full max-w-sm rounded-[32px] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-bold text-[#1a1a1a]", children: t("favorites.new_category") }),
      /* @__PURE__ */ jsx("input", { autoFocus: true, type: "text", value: newCategoryName, onChange: (e) => setNewCategoryName(e.target.value), placeholder: t("favorites.category_name_placeholder"), className: "mb-6 h-12 w-full rounded-2xl bg-[#fdfaf7] px-4 outline-none ring-1 ring-[#e5e7eb] focus:ring-2 focus:ring-[#b3917d]" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setIsAddingCategory(false), className: "flex-1 rounded-2xl bg-[#fdfaf7] py-3 font-bold text-[#6b5f59]", children: t("favorites.cancel") }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "flex-1 rounded-2xl bg-[#1a1a1a] py-3 font-bold text-white shadow-lg", children: t("favorites.create") })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl", children: filteredFavorites.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-[48px] bg-white p-16 text-center shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#fdfaf7]", children: /* @__PURE__ */ jsx(Heart, { className: "h-12 w-12 text-[#b3917d] opacity-20" }) }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a]", children: t("favorites.no_favorites") }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-[#6b5f59]", children: t("favorites.no_favorites_desc") }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-8 rounded-2xl bg-[#1a1a1a] px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105", children: t("about.explore_collection") })
    ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2", children: filteredFavorites.map((product) => /* @__PURE__ */ jsxs("div", { className: "group relative flex flex-col rounded-[40px] bg-white p-4 shadow-sm transition-all hover:shadow-md", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/product/$productId", params: {
        productId: String(product.id)
      }, className: "relative aspect-[4/3] overflow-hidden rounded-[32px] bg-[#f7f3ef]", children: [
        /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(product.imageUrl), alt: t(product.name), className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" }),
        /* @__PURE__ */ jsx("div", { className: "absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#b3917d] backdrop-blur-md", children: product.categoryName || t("favorites.general") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-1 flex-col justify-between px-2 pb-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#1a1a1a] group-hover:text-[#b3917d] transition-colors", children: t(product.name) }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xl font-black text-[#b3917d]", children: [
              "$",
              product.price
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => removeFromFavorites(product.id), className: "rounded-full p-2 text-[#a19690] hover:bg-red-50 hover:text-red-500 transition-colors", children: /* @__PURE__ */ jsx(Trash2, { className: "h-5 w-5" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 flex gap-3", children: /* @__PURE__ */ jsxs("button", { onClick: () => addToCart(product), className: "flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#1a1a1a] py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-black active:scale-95", children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" }),
          t("common.add_to_cart")
        ] }) })
      ] })
    ] }, product.id)) }) })
  ] });
}
export {
  FavoritesPage as component
};
