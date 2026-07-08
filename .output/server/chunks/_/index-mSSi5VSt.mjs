import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { L as LanguageToggle } from "./7812354786123547-BzsHGh6s.mjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { C as Category } from "./data-BEWQCEQe.mjs";
import { r as resolveProductImageUrl } from "./product-images-BiZ8ytiZ.mjs";
import { c as createLucideIcon, R as Route$1, a as useCart, u as useFavorites } from "./router-W9GWQRv5.mjs";
import { M as MiniCart } from "./MiniCart-IeUJnWAF.mjs";
import { H as Heart, X } from "./x.mjs";
import { S as Search } from "./search.mjs";
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
import "./trash-2.mjs";
import "./minus.mjs";
const __iconNode$2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function CatalogPage() {
  const {
    t
  } = useTranslation();
  const productsData = Route$1.useLoaderData();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1e4]);
  const [selectedMetalTypes, setSelectedMetalTypes] = useState([]);
  const {
    addToCart
  } = useCart();
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    categories: favCategories
  } = useFavorites();
  const [showFavPrompt, setShowFavPrompt] = useState(null);
  const categories = ["All", ...Object.values(Category)];
  const translatedCategories = categories.map((cat) => ({
    id: cat,
    name: cat === "All" ? t("favorites.all_items") : t(`common.category_names.${cat}`)
  }));
  const filteredProducts = (productsData || []).filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = t(product.name).toLowerCase().includes(searchQuery.toLowerCase()) || t(product.description).toLowerCase().includes(searchQuery.toLowerCase()) || product.style && product.style.toLowerCase().includes(searchQuery.toLowerCase()) || product.design && product.design.toLowerCase().includes(searchQuery.toLowerCase()) || product.productType && product.productType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesMetalType = selectedMetalTypes.length === 0 || product.metalType && selectedMetalTypes.includes(product.metalType);
    return matchesCategory && matchesSearch && matchesPrice && matchesMetalType;
  });
  const metalTypes = Array.from(new Set((productsData || []).map((p) => p.metalType).filter(Boolean)));
  const suggestions = searchQuery.length > 0 ? (productsData || []).filter((p) => t(p.name).toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5) : [];
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-xl bg-[#1a1a1a] flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white font-ermilov font-bold text-xl md:text-2xl pt-1", children: "P" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-ermilov font-bold text-[#1a1a1a] tracking-tight", children: t("common.app_name") }),
          /* @__PURE__ */ jsx("p", { className: "text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#6b5f59] font-medium -mt-1", children: t("catalog.title") })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-end gap-2 md:gap-3", children: [
        /* @__PURE__ */ jsx(LanguageToggle, {}),
        /* @__PURE__ */ jsx(Link, { to: "/favorites", className: "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm", children: /* @__PURE__ */ jsx(Heart, { className: "h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" }) }),
        /* @__PURE__ */ jsx(Link, { to: "/about", className: "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm", children: /* @__PURE__ */ jsx(Info, { className: "h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" }) }),
        /* @__PURE__ */ jsx(MiniCart, {})
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex sm:flex-row gap-4 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a19690]" }),
        /* @__PURE__ */ jsx("input", { type: "text", placeholder: t("common.search_placeholder"), value: searchQuery, onChange: (e) => {
          setSearchQuery(e.target.value);
          setShowSuggestions(true);
        }, onFocus: () => setShowSuggestions(true), className: "h-12 md:h-14 w-full rounded-2xl bg-white pl-12 pr-4 text-base md:text-lg outline-none shadow-sm" }),
        showSuggestions && suggestions.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 right-0 z-50 mt-2 rounded-2xl bg-white p-2 shadow-xl border border-gray-100", children: suggestions.map((suggestion) => /* @__PURE__ */ jsxs(Link, { to: "/product/$productId", params: {
          productId: String(suggestion.id)
        }, className: "flex items-center gap-3 p-3 hover:bg-[#fdfaf7] rounded-xl transition-colors", onClick: () => setShowSuggestions(false), children: [
          /* @__PURE__ */ jsx("div", { className: "h-10 w-10 overflow-hidden rounded-lg bg-[#f7f3ef]", children: /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(suggestion.imageUrl), alt: t(suggestion.name), className: "h-full w-full object-cover" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-[#1a1a1a]", children: t(suggestion.name) }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-[#b3917d]", children: [
              "₴",
              suggestion.price
            ] })
          ] })
        ] }, suggestion.id)) })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => setShowFilters(true), className: "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#b3917d] text-white shadow-lg shrink-0", children: /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-5 w-5 md:h-6 md:w-6" }) })
    ] }),
    showFilters && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[60] flex justify-end", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30 backdrop-blur-sm", onClick: () => setShowFilters(false) }),
      /* @__PURE__ */ jsxs("div", { className: "relative h-full w-full max-w-sm bg-white p-8 shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a]", children: t("catalog.advanced_filters") }),
          /* @__PURE__ */ jsx("button", { onClick: () => setShowFilters(false), className: "h-10 w-10 flex items-center justify-center rounded-full bg-[#fdfaf7]", children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#1a1a1a]", children: t("catalog.price_range") }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs text-[#6b5f59] mb-1 block uppercase tracking-wider", children: t("catalog.min") }),
              /* @__PURE__ */ jsx("input", { type: "number", value: priceRange[0], onChange: (e) => setPriceRange([Number(e.target.value), priceRange[1]]), className: "w-full rounded-xl bg-[#fdfaf7] px-4 py-3 text-sm outline-none border border-transparent focus:border-[#b3917d]" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs text-[#6b5f59] mb-1 block uppercase tracking-wider", children: t("catalog.max") }),
              /* @__PURE__ */ jsx("input", { type: "number", value: priceRange[1], onChange: (e) => setPriceRange([priceRange[0], Number(e.target.value)]), className: "w-full rounded-xl bg-[#fdfaf7] px-4 py-3 text-sm outline-none border border-transparent focus:border-[#b3917d]" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#1a1a1a]", children: t("product.metal_type") }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: metalTypes.map((type) => /* @__PURE__ */ jsxs("button", { onClick: () => {
            setSelectedMetalTypes((prev) => prev.includes(type) ? prev.filter((t2) => t2 !== type) : [...prev, type]);
          }, className: `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedMetalTypes.includes(type) ? "bg-[#b3917d] text-white" : "bg-[#fdfaf7] text-[#6b5f59]"}`, children: [
            selectedMetalTypes.includes(type) && /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }),
            t(type)
          ] }, type)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 space-y-3", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => {
            setPriceRange([0, 1e4]);
            setSelectedMetalTypes([]);
          }, className: "w-full rounded-2xl py-4 text-sm font-bold text-[#b3917d] border border-[#b3917d] hover:bg-[#b3917d]/5 transition-colors", children: t("catalog.reset_all") }),
          /* @__PURE__ */ jsx("button", { onClick: () => setShowFilters(false), className: "w-full rounded-2xl bg-[#1a1a1a] py-4 text-sm font-bold text-white shadow-lg active:scale-95 transition-transform", children: t("catalog.show_results", {
            count: filteredProducts.length
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 md:mt-8 flex gap-2 md:gap-3 overflow-x-auto pb-2 no-scrollbar", children: translatedCategories.map((cat) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveCategory(cat.id), className: `whitespace-nowrap rounded-full px-5 md:px-8 py-2 md:py-3 text-sm md:text-lg font-medium transition-all cursor-pointer ${activeCategory === cat.id ? "bg-[#b3917d] text-white" : "bg-white text-[#6b5f59]"}`, children: cat.name }, cat.id)) }),
    /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold text-[#1a1a1a]", children: t("catalog.title") }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-4 md:gap-6 overflow-x-auto pb-4 no-scrollbar", children: [
        filteredProducts.length === 0 && /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col items-center justify-center rounded-[32px] bg-white py-16 text-center shadow-sm min-w-full", children: [
          /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "✦" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-base font-bold text-[#1a1a1a]", children: t("catalog.no_results") }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-[#6b5f59]", children: t("catalog.no_results_desc") })
        ] }),
        filteredProducts.map((product) => /* @__PURE__ */ jsxs(Link, { to: "/product/$productId", params: {
          productId: String(product.id)
        }, className: "min-w-[240px] md:w-[280px] rounded-[32px] bg-white p-3 md:p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-square w-full overflow-hidden rounded-[24px] bg-[#f7f3ef] max-w-200", children: [
            /* @__PURE__ */ jsx("button", { onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isFavorited(product.id)) {
                removeFromFavorites(product.id);
              } else {
                setShowFavPrompt(product.id);
              }
            }, className: `absolute right-3 top-3 md:right-4 md:top-4 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors ${isFavorited(product.id) ? "bg-[#b3917d] text-white" : "bg-white/60 text-[#1a1a1a]"}`, children: /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 md:h-5 md:w-5 ${isFavorited(product.id) ? "fill-current" : ""}` }) }),
            showFavPrompt === product.id && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 p-4 text-center backdrop-blur-sm", onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
            }, children: [
              /* @__PURE__ */ jsxs("p", { className: "mb-3 text-sm font-bold text-white", children: [
                t("favorites.confirm_favorite"),
                "?"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2", children: favCategories.map((cat) => /* @__PURE__ */ jsx("button", { onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                addToFavorites(product, cat);
                setShowFavPrompt(null);
              }, className: "rounded-full bg-white px-3 py-1 text-xs font-bold text-[#1a1a1a] hover:bg-[#b3917d] hover:text-white transition-colors", children: cat === "General" ? t("favorites.general") : Object.values(Category).includes(cat) ? t(`common.category_names.${cat}`) : cat }, cat)) }),
              /* @__PURE__ */ jsx("button", { onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowFavPrompt(null);
              }, className: "mt-3 text-xs font-medium text-white underline", children: t("favorites.cancel") })
            ] }),
            /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(product.imageUrl), alt: t(product.name), className: "h-full w-full object-cover max-w-200" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center justify-between px-1 md:px-2", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "text-base md:text-lg font-bold text-[#1a1a1a]", children: t(product.name) }),
            /* @__PURE__ */ jsxs("p", { className: "text-base md:text-lg font-bold text-[#b3917d]", children: [
              "₴",
              product.price
            ] })
          ] }) })
        ] }, product.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-10", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold text-[#1a1a1a]", children: t("common.we_recommend") }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-4", children: (productsData || []).slice(0, 3).map((product) => /* @__PURE__ */ jsxs(Link, { to: "/product/$productId", params: {
        productId: String(product.id)
      }, className: "flex items-center gap-3 md:gap-4 rounded-3xl bg-white p-2 md:p-3 shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-2xl bg-[#f7f3ef] shrink-0", children: /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(product.imageUrl), alt: t(product.name), className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-base md:text-lg font-bold text-[#1a1a1a] line-clamp-1", children: t(product.name) }),
          /* @__PURE__ */ jsxs("p", { className: "text-base md:text-lg font-bold text-[#b3917d]", children: [
            "₴",
            product.price
          ] })
        ] })
      ] }, product.id)) })
    ] })
  ] });
}
export {
  CatalogPage as component
};
