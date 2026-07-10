import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { L as LanguageToggle } from "./7812354786123547-BzsHGh6s.mjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { g as getCategoryCoverImage, C as Category } from "./data-B1DXlOW8.mjs";
import { r as resolveProductImageUrl } from "./product-images-CufF_jDU.mjs";
import { M as MiniCart } from "./MiniCart-C_ne8unX.mjs";
import { I as Info, S as SlidersHorizontal, C as Check, P as ProductCard } from "./ProductCard-DxV-Y9vT.mjs";
import { R as Route$2 } from "./router-CIvS-aii.mjs";
import { H as Heart, X } from "./x.mjs";
import { S as Search } from "./search.mjs";
import "./trash-2.mjs";
import "./minus.mjs";
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
function CatalogPage() {
  const {
    t
  } = useTranslation();
  const productsData = Route$2.useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1e4]);
  const [selectedMetalTypes, setSelectedMetalTypes] = useState([]);
  const [showFavPrompt, setShowFavPrompt] = useState(null);
  const categories = Object.values(Category);
  const filteredProducts = (productsData || []).filter((product) => {
    const matchesSearch = t(product.name).toLowerCase().includes(searchQuery.toLowerCase()) || t(product.description).toLowerCase().includes(searchQuery.toLowerCase()) || product.style && product.style.toLowerCase().includes(searchQuery.toLowerCase()) || product.design && product.design.toLowerCase().includes(searchQuery.toLowerCase()) || product.productType && product.productType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesMetalType = selectedMetalTypes.length === 0 || product.metalType && selectedMetalTypes.includes(product.metalType);
    return matchesSearch && matchesPrice && matchesMetalType;
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
    /* @__PURE__ */ jsxs("section", { className: "mt-8 md:mt-10", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-center text-sm md:text-base font-ermilov font-bold uppercase tracking-[0.2em] text-[#1a1a1a]", children: t("catalog.shop_by_category") }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-2 gap-3 md:gap-4", children: categories.map((category) => {
        const coverImage = getCategoryCoverImage(category);
        return /* @__PURE__ */ jsxs(Link, { to: "/catalog/$category", params: {
          category
        }, className: "group relative aspect-square overflow-hidden rounded-2xl bg-[#f7f3ef]", children: [
          coverImage ? /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(coverImage), alt: t(`common.category_names.${category}`), className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full bg-[#e8dfd8]" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center p-4", children: /* @__PURE__ */ jsx("span", { className: "text-center text-xs md:text-sm font-ermilov font-bold uppercase tracking-[0.15em] text-white", children: t(`common.category_names.${category}`) }) })
        ] }, category);
      }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-10", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold text-[#1a1a1a]", children: t("catalog.title") }),
      filteredProducts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-6 flex w-full flex-col items-center justify-center rounded-[32px] bg-white py-16 text-center shadow-sm", children: [
        /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "✦" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-base font-bold text-[#1a1a1a]", children: t("catalog.no_results") }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-[#6b5f59]", children: t("catalog.no_results_desc") })
      ] }) : /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4", children: filteredProducts.map((product) => /* @__PURE__ */ jsx(ProductCard, { product, showFavPrompt, onFavPromptChange: setShowFavPrompt }, product.id)) })
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
