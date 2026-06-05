import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { r as resolveProductImageUrl } from "./product-images-BN7C3qV1.mjs";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { c as createLucideIcon, b as Route, a as useCart, u as useFavorites } from "./router-CNsBLqJP.mjs";
import { M as MiniCart, X } from "./MiniCart-CKbchbF-.mjs";
import { C as ChevronLeft } from "./chevron-left.mjs";
import { H as Heart, S as ShoppingBag } from "./shopping-bag.mjs";
import "./619792737_18417153727189140_5984683189343682714_n-2Ta9zfVb.mjs";
import "./7812354786123547-cWmkQVbL.mjs";
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
const __iconNode$3 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$3);
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
const __iconNode$1 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function ProductPage() {
  const {
    t
  } = useTranslation();
  const product = Route.useLoaderData();
  const {
    addToCart
  } = useCart();
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorited,
    categories: favCategories
  } = useFavorites();
  const [showFavPrompt, setShowFavPrompt] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const images = product.images && product.images.length > 0 ? product.images : [product.imageUrl];
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);
  const productDetails = [{
    label: t("product.sku"),
    value: product.sku
  }, {
    label: t("product.metal_standard"),
    value: product.metalStandard
  }, {
    label: t("product.metal_type"),
    value: product.metalType
  }, {
    label: t("product.metal_color"),
    value: product.metalColor
  }, {
    label: t("product.clasp"),
    value: product.clasp
  }, {
    label: t("product.gemstone"),
    value: product.gemstone
  }, {
    label: t("product.design"),
    value: product.design
  }, {
    label: t("product.style"),
    value: product.style
  }, {
    label: t("product.product_type"),
    value: product.productType
  }, {
    label: t("product.technology"),
    value: product.technology
  }, {
    label: t("product.width"),
    value: product.width
  }, {
    label: t("product.thickness"),
    value: product.thickness
  }, {
    label: t("product.length"),
    value: product.length
  }, {
    label: t("product.weight"),
    value: product.weight
  }].filter((detail) => detail.value !== null && detail.value !== void 0);
  console.log(product);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx(Link, { to: "/catalog", className: "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-lg md:text-xl font-bold text-[#1a1a1a]", children: t("product.details") }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => {
              if (isFavorited(product.id)) {
                removeFromFavorites(product.id);
              } else {
                setShowFavPrompt(!showFavPrompt);
              }
            }, className: `flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl shadow-sm transition-colors ${isFavorited(product.id) ? "bg-[#b3917d] text-white" : "bg-white text-[#1a1a1a]"}`, children: /* @__PURE__ */ jsx(Heart, { className: `h-5 w-5 md:h-6 md:w-6 ${isFavorited(product.id) ? "fill-current" : ""}` }) }),
            showFavPrompt && !isFavorited(product.id) && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-14 z-20 w-48 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200", children: [
              /* @__PURE__ */ jsxs("p", { className: "mb-2 px-1 text-xs font-bold text-[#a19690] uppercase tracking-wider", children: [
                t("favorites.confirm_favorite"),
                ":"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: favCategories.map((cat) => /* @__PURE__ */ jsx("button", { onClick: () => {
                addToFavorites(product, cat);
                setShowFavPrompt(false);
              }, className: "rounded-xl px-3 py-2 text-left text-sm font-medium text-[#1a1a1a] hover:bg-[#fdfaf7] hover:text-[#b3917d] transition-colors", children: cat }, cat)) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(MiniCart, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 md:mt-8 flex flex-col gap-8 md:gap-10 md:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "relative aspect-square w-full overflow-hidden rounded-[32px] md:rounded-[48px] bg-[#f7f3ef] shadow-inner cursor-zoom-in", onClick: () => setIsLightboxOpen(true), children: /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(images[activeImageIndex]), alt: `${product.name} - image ${activeImageIndex + 1}`, className: "h-full w-full object-cover transition-transform duration-500" }) }),
          images.length > 1 && /* @__PURE__ */ jsx("div", { className: "mt-6 flex gap-4 overflow-x-auto pb-2 no-scrollbar", children: images.map((img, index) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveImageIndex(index), className: `relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${activeImageIndex === index ? "border-[#b3917d]" : "border-transparent"}`, children: /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(img), alt: `${product.name} thumbnail ${index + 1}`, className: "h-full w-full object-cover" }) }, index)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#1a1a1a]", children: product.name }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 md:h-5 md:w-5 fill-[#b3917d] text-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-[#1a1a1a]", children: "4.8" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-[#6b5f59]", children: product.description }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => setIsDetailsOpen(!isDetailsOpen), className: "flex w-full items-center justify-between py-4 text-left", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#1a1a1a]", children: t("product.about_product") }),
              isDetailsOpen ? /* @__PURE__ */ jsx(ChevronUp, { className: "h-6 w-6 text-[#1a1a1a]" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-6 w-6 text-[#1a1a1a]" })
            ] }),
            isDetailsOpen && /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-3", children: productDetails.map((detail) => /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2 text-sm md:text-base", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#6b5f59] whitespace-nowrap", children: detail.label }),
              /* @__PURE__ */ jsx("div", { className: "mb-1.5 flex-1 border-b border-dotted border-[#d1ccc8]" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-[#1a1a1a] text-right", children: detail.value })
            ] }, detail.label)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#1a1a1a]", children: t("product.select_size") }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 flex gap-3", children: ["S", "M", "L", "XL"].map((size) => /* @__PURE__ */ jsx("button", { className: `flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all ${size === "M" ? "border-[#b3917d] bg-[#b3917d] text-white" : "border-[#e5e7eb] bg-white text-[#1a1a1a]"}`, children: /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: size }) }, size)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto pt-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[#a19690] text-sm font-medium", children: t("common.price") }),
              /* @__PURE__ */ jsxs("p", { className: "text-2xl md:text-3xl font-bold text-[#b3917d]", children: [
                "$",
                product.price
              ] })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => addToCart(product), className: "flex flex-1 items-center justify-center gap-3 rounded-[24px] bg-[#1a1a1a] py-4 md:py-5 text-base md:text-lg font-bold text-white shadow-xl transition-all hover:bg-black active:scale-[0.98]", children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "h-5 w-5 md:h-6 md:w-6" }),
              t("common.add_to_cart")
            ] })
          ] }) })
        ] })
      ] })
    ] }),
    isLightboxOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setIsLightboxOpen(false), className: "absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors", children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex h-full w-full items-center justify-center", children: [
        images.length > 1 && /* @__PURE__ */ jsx("button", { onClick: (e) => {
          e.stopPropagation();
          prevImage();
        }, className: "absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsx("div", { className: "max-h-full max-w-full overflow-hidden rounded-3xl bg-[#f7f3ef]", children: /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(images[activeImageIndex]), alt: `${product.name} - detail view`, className: "max-h-[85vh] object-contain" }) }),
        images.length > 1 && /* @__PURE__ */ jsx("button", { onClick: (e) => {
          e.stopPropagation();
          nextImage();
        }, className: "absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-medium", children: [
          activeImageIndex + 1,
          " / ",
          images.length
        ] })
      ] })
    ] })
  ] });
}
export {
  ProductPage as component
};
