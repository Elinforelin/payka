import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useRouter, useCanGoBack } from "@tanstack/react-router";
import { C as Category } from "./data-C0dK635X.mjs";
import { r as resolveProductImageUrl } from "./product-images-XBZXgYgm.mjs";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { c as createLucideIcon, e as Route$1, a as useCart, u as useFavorites } from "./router-CYm7miYu.mjs";
import { M as MiniCart } from "./MiniCart-CpdX9lLj.mjs";
import { C as ChevronDown, a as ShippingReturnsGuide, R as Ruler } from "./ShippingReturnsInfo-C7hE1Ybn.mjs";
import { L as LanguageToggle } from "./LanguageToggle-_RTdtCBY.mjs";
import { H as Heart, D as DiscountBadge, C as CharityBadge, a as CharityNote, P as ProductPrice, S as ShoppingBag } from "./ProductPrice-5gm5apzL.mjs";
import { C as ChevronLeft } from "./chevron-left.mjs";
import { M as MessageCircle } from "./truck.mjs";
import { X } from "./x.mjs";
import "./me-3RncXd2G.mjs";
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
import "./trash-2.mjs";
import "./minus.mjs";
import "./contact-DWQvISeu.mjs";
const __iconNode$4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$4);
const __iconNode$3 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$3);
const __iconNode$2 = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode$1);
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
const RING_SIZES = [
  { mm: "15.0", eu: "47" },
  { mm: "15.5", eu: "49" },
  { mm: "16.0", eu: "50" },
  { mm: "16.5", eu: "52" },
  { mm: "17.0", eu: "53" },
  { mm: "17.5", eu: "55" },
  { mm: "18.0", eu: "56" },
  { mm: "18.5", eu: "58" },
  { mm: "19.0", eu: "59" },
  { mm: "19.5", eu: "61" },
  { mm: "20.0", eu: "63" },
  { mm: "20.5", eu: "64" },
  { mm: "21.0", eu: "66" },
  { mm: "21.5", eu: "67" },
  { mm: "22.0", eu: "69" }
];
const NECKLACE_LENGTHS = [
  { cm: "38–40 cm", nameKey: "size_guide_necklace_choker", descKey: "size_guide_necklace_choker_desc" },
  { cm: "43–45 cm", nameKey: "size_guide_necklace_princess", descKey: "size_guide_necklace_princess_desc" },
  { cm: "50–55 cm", nameKey: "size_guide_necklace_matinee", descKey: "size_guide_necklace_matinee_desc" },
  { cm: "70–80 cm", nameKey: "size_guide_necklace_opera", descKey: "size_guide_necklace_opera_desc" }
];
function SizeGuide({ onClose }) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[70] flex items-end sm:items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-t-[32px] sm:rounded-[32px] p-6 md:p-8 shadow-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-[#1a1a1a]", children: t("product.size_guide") }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#fdfaf7] hover:bg-gray-100 transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-[#1a1a1a]" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "flex items-center gap-2 text-base font-bold text-[#1a1a1a] mb-3", children: [
          /* @__PURE__ */ jsx(Ruler, { className: "h-4 w-4 text-[#b3917d]" }),
          t("product.size_guide_ring_title")
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-gray-100", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-[#fdfaf7]", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold text-[#6b5f59]", children: t("product.size_guide_ring_col_mm") }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold text-[#6b5f59]", children: t("product.size_guide_ring_col_eu") })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: RING_SIZES.map((row, i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 === 0 ? "bg-white" : "bg-[#fdfaf7]/50", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2.5 font-medium text-[#1a1a1a]", children: row.mm }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2.5 text-[#6b5f59]", children: row.eu })
          ] }, row.mm)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-8", children: [
        /* @__PURE__ */ jsxs("h3", { className: "flex items-center gap-2 text-base font-bold text-[#1a1a1a] mb-3", children: [
          /* @__PURE__ */ jsx(Link2, { className: "h-4 w-4 text-[#b3917d]" }),
          t("product.size_guide_necklace_title")
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-gray-100", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-[#fdfaf7]", children: [
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold text-[#6b5f59]", children: t("product.size_guide_necklace_col_cm") }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold text-[#6b5f59]", children: t("product.size_guide_necklace_col_name") }),
            /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left font-bold text-[#6b5f59]", children: t("product.size_guide_necklace_col_desc") })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: NECKLACE_LENGTHS.map((row, i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 === 0 ? "bg-white" : "bg-[#fdfaf7]/50", children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2.5 font-medium text-[#1a1a1a]", children: row.cm }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2.5 text-[#b3917d] font-medium", children: t(`product.${row.nameKey}`) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2.5 text-[#6b5f59]", children: t(`product.${row.descKey}`) })
          ] }, row.nameKey)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-8 space-y-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-[#1a1a1a]", children: t("product.size_guide_tips_title") }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-[#fdfaf7] p-4 space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#b3917d]", children: t("product.size_guide_tips_ring_title") }),
          /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-1.5 text-sm text-[#6b5f59]", children: [
            /* @__PURE__ */ jsx("li", { children: t("product.size_guide_tips_ring_1") }),
            /* @__PURE__ */ jsx("li", { children: t("product.size_guide_tips_ring_2") }),
            /* @__PURE__ */ jsx("li", { children: t("product.size_guide_tips_ring_3") })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#a19690] italic pt-1", children: [
            "💡 ",
            t("product.size_guide_tips_ring_note")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-[#fdfaf7] p-4 space-y-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#b3917d]", children: t("product.size_guide_tips_necklace_title") }),
          /* @__PURE__ */ jsxs("ol", { className: "list-decimal list-inside space-y-1.5 text-sm text-[#6b5f59]", children: [
            /* @__PURE__ */ jsx("li", { children: t("product.size_guide_tips_necklace_1") }),
            /* @__PURE__ */ jsx("li", { children: t("product.size_guide_tips_necklace_2") })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const PACKAGING_PHOTOS = [
  { src: "/assets/packaging/box-closed.png", altKey: "packaging_alt_closed" },
  { src: "/assets/packaging/box-open.png", altKey: "packaging_alt_open" },
  { src: "/assets/packaging/includes.png", altKey: "packaging_alt_includes" }
];
function PackagingGuide({ onClose }) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[70] flex items-end sm:items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-t-[32px] sm:rounded-[32px] p-6 md:p-8 shadow-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 text-xl font-bold text-[#1a1a1a]", children: [
          /* @__PURE__ */ jsx(Gift, { className: "h-5 w-5 text-[#b3917d]" }),
          t("product.packaging_title")
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#fdfaf7] hover:bg-gray-100 transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-[#1a1a1a]" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#6b5f59] leading-relaxed", children: t("product.packaging_desc") }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-3 gap-3", children: PACKAGING_PHOTOS.map((photo) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "aspect-[4/5] overflow-hidden rounded-2xl bg-[#f7f3ef]",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: resolveProductImageUrl(photo.src),
              alt: t(`product.${photo.altKey}`),
              className: "h-full w-full object-cover"
            }
          )
        },
        photo.src
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold uppercase tracking-wider text-[#b3917d]", children: t("product.packaging_includes_title") }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-3 space-y-2 text-sm text-[#6b5f59]", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#b3917d]" }),
            t("product.packaging_item_box")
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#b3917d]" }),
            t("product.packaging_item_pouch")
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[#b3917d]" }),
            t("product.packaging_item_card")
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ProductPage() {
  const {
    t
  } = useTranslation();
  const product = Route$1.useLoaderData();
  const router = useRouter();
  const canGoBack = useCanGoBack();
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
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({
    x: 50,
    y: 50
  });
  const stoneCount = product.stoneCount ?? 1;
  const [selectedStoneType, setSelectedStoneType] = useState((product.availableStones?.length ?? 0) > 1 ? null : product.availableStones?.[0]?.type ?? null);
  const [selectedStoneColors, setSelectedStoneColors] = useState(() => {
    const initialColor = stoneCount === 1 && (product.availableStones?.[0]?.colors.length ?? 0) === 1 ? product.availableStones[0].colors[0] : null;
    return Array.from({
      length: stoneCount
    }, () => initialColor);
  });
  const [activeStoneIndex, setActiveStoneIndex] = useState(0);
  const [selectedRingSize, setSelectedRingSize] = useState(null);
  const [selectedPendantLength, setSelectedPendantLength] = useState(null);
  const [selectedGenericSize, setSelectedGenericSize] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showPackagingGuide, setShowPackagingGuide] = useState(false);
  const [showShippingGuide, setShowShippingGuide] = useState(false);
  useEffect(() => {
    if (product.availableStones && selectedStoneType) {
      const stone = product.availableStones.find((s) => s.type === selectedStoneType);
      if (stone) {
        if (stone.colors.length === 1) {
          setSelectedStoneColors(Array.from({
            length: stoneCount
          }, () => stone.colors[0]));
        } else {
          setSelectedStoneColors(Array.from({
            length: stoneCount
          }, () => null));
          setActiveStoneIndex(0);
        }
      }
    }
  }, [selectedStoneType, product.availableStones, stoneCount]);
  const selectedStoneColor = selectedStoneColors[0] ?? null;
  const allStoneColorsSelected = selectedStoneColors.every((color) => color !== null);
  const selectStoneColor = (color) => {
    setSelectedStoneColors((prev) => {
      const next = [...prev];
      next[activeStoneIndex] = color;
      return next;
    });
    if (stoneCount > 1) {
      setActiveStoneIndex((prev) => {
        const updated = [...selectedStoneColors];
        updated[prev] = color;
        const nextEmpty = updated.findIndex((c, i) => i > prev && c === null);
        if (nextEmpty !== -1) return nextEmpty;
        const firstEmpty = updated.findIndex((c) => c === null);
        if (firstEmpty !== -1) return firstEmpty;
        return (prev + 1) % stoneCount;
      });
    }
  };
  const recommendedStones = product.availableStones?.filter((s) => s.type !== selectedStoneType) || [];
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
    label: t("common.categories"),
    value: t(`common.category_names.${product.category}`)
  }, {
    label: t("product.metal_standard"),
    value: product.metalStandard
  }, {
    label: t("product.metal_type"),
    value: product.metalType ? t(product.metalType) : void 0
  }, {
    label: t("product.metal_color"),
    value: product.metalColor ? t(product.metalColor) : void 0
  }, {
    label: t("product.rhodium_plating"),
    value: t(product.rhodiumPlating ? "common.yes" : "common.no")
  }, {
    label: t("product.clasp"),
    value: product.clasp
  }, {
    label: t("product.gemstone"),
    value: product.gemstone ? t(product.gemstone) : void 0
  }, {
    label: t("product.design"),
    value: product.design
  }, {
    label: t("product.weight"),
    value: product.weight
  }].filter((detail) => detail.value !== null && detail.value !== void 0);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12 pb-12", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
          if (canGoBack) {
            router.history.back();
          } else {
            void router.navigate({
              to: "/catalog/$category",
              params: {
                category: product.category
              }
            });
          }
        }, className: "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm", "aria-label": t("common.back"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:gap-3", children: [
          /* @__PURE__ */ jsx(LanguageToggle, {}),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => {
              if (isFavorited(product.id)) {
                removeFromFavorites(product.id);
              } else {
                setShowFavPrompt(!showFavPrompt);
              }
            }, className: `flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl shadow-sm transition-colors ${isFavorited(product.id) ? "bg-[#b3917d] text-white" : "bg-white text-[#1a1a1a]"}`, children: /* @__PURE__ */ jsx(Heart, { className: `h-5 w-5 md:h-6 md:w-6 ${isFavorited(product.id) ? "fill-current" : ""}` }) }),
            showFavPrompt && !isFavorited(product.id) && /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-14 z-20 w-48 rounded-2xl bg-white p-2 sm:p-3 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200", children: [
              /* @__PURE__ */ jsxs("p", { className: "mb-1.5 sm:mb-2 px-1 text-[10px] sm:text-xs font-bold text-[#a19690] uppercase tracking-wider", children: [
                t("favorites.confirm_favorite"),
                ":"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5 sm:gap-1", children: [
                favCategories.map((cat) => /* @__PURE__ */ jsx("button", { onClick: () => {
                  addToFavorites(product, cat);
                  setShowFavPrompt(false);
                }, className: "rounded-xl px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-medium text-[#1a1a1a] hover:bg-[#fdfaf7] hover:text-[#b3917d] transition-colors", children: cat === "General" ? t("favorites.general") : Object.values(Category).includes(cat) ? t(`common.category_names.${cat}`) : cat }, cat)),
                /* @__PURE__ */ jsx("div", { className: "mt-1 border-t border-gray-50 pt-1", children: /* @__PURE__ */ jsx("button", { onClick: () => setShowFavPrompt(false), className: "w-full rounded-xl px-3 py-1.5 text-left text-xs font-medium text-[#a19690] hover:bg-gray-50 transition-colors", children: t("favorites.cancel") }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx(MiniCart, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 md:mt-8 flex flex-col gap-8 md:gap-10 md:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-square w-full max-w-200 overflow-hidden rounded-[32px] md:rounded-[48px] bg-[#f7f3ef] shadow-inner cursor-zoom-in", onClick: () => setIsLightboxOpen(true), onMouseEnter: () => setIsImageZoomed(true), onMouseLeave: () => setIsImageZoomed(false), onMouseMove: (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setZoomOrigin({
              x: (e.clientX - rect.left) / rect.width * 100,
              y: (e.clientY - rect.top) / rect.height * 100
            });
          }, children: [
            /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(images[activeImageIndex]), alt: `${t(product.name)} - image ${activeImageIndex + 1}`, className: `h-full w-full object-cover will-change-transform ${isImageZoomed ? "duration-150" : "duration-300"} transition-transform ease-out`, style: {
              transform: isImageZoomed ? "scale(2.5)" : "scale(1)",
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
            } }),
            /* @__PURE__ */ jsxs("div", { className: "absolute left-6 bottom-6 right-20 z-10 flex flex-col items-start gap-1.5 pointer-events-none", children: [
              /* @__PURE__ */ jsx(DiscountBadge, { product }),
              /* @__PURE__ */ jsx(CharityBadge, { product })
            ] }),
            selectedStoneColors.some(Boolean) && /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 right-6 z-10 flex gap-1.5", children: selectedStoneColors.map((color, index) => color ? /* @__PURE__ */ jsx("div", { className: "h-8 w-8 rounded-full border-2 border-white shadow-lg overflow-hidden flex items-center justify-center", style: {
              backgroundColor: color.imageUrl ? void 0 : color.value
            }, title: `${t(`stones.types.${selectedStoneType}`)} ${index + 1}: ${t(`stones.colors.${color.name}`)}`, children: color.imageUrl ? /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(color.imageUrl), alt: t(`stones.colors.${color.name}`), className: "h-full w-full object-cover" }) : null }, index) : null) })
          ] }),
          images.length > 1 && /* @__PURE__ */ jsx("div", { className: "mt-6 flex gap-4 overflow-x-auto pb-2 no-scrollbar", children: images.map((img, index) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveImageIndex(index), className: `relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${activeImageIndex === index ? "border-[#b3917d]" : "border-transparent"}`, children: /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(img), alt: `${t(product.name)} thumbnail ${index + 1}`, className: "h-full w-full object-cover" }) }, index)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#1a1a1a]", children: t(product.name) }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-[#6b5f59]", children: t(product.description) }),
          /* @__PURE__ */ jsx(CharityNote, { product, className: "mt-4" }),
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
          product.category !== Category.Earrings && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#1a1a1a]", children: product.category === Category.Rings ? t("product.select_ring_size") : product.category === Category.Pendants ? t("product.select_necklace_length") : t("product.select_size") }),
              /* @__PURE__ */ jsx("button", { onClick: () => setShowSizeGuide(true), className: "text-sm font-medium text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors", children: t("product.size_guide") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: product.category === Category.Rings ? Array.from({
              length: (22 - 15) / 0.5 + 1
            }, (_, i) => (15 + i * 0.5).toFixed(1)).map((size) => /* @__PURE__ */ jsx("button", { onClick: () => setSelectedRingSize(size), className: `flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 transition-all ${selectedRingSize === size ? "border-[#b3917d] bg-[#b3917d] text-white" : "border-[#e5e7eb] bg-white text-[#1a1a1a]"}`, children: /* @__PURE__ */ jsx("span", { className: "text-sm font-bold", children: size }) }, size)) : product.category === Category.Pendants ? NECKLACE_LENGTHS.map((length) => /* @__PURE__ */ jsxs("button", { onClick: () => setSelectedPendantLength(length.cm), className: `flex flex-shrink-0 flex-col items-center justify-center rounded-2xl border-2 px-3 py-2 transition-all ${selectedPendantLength === length.cm ? "border-[#b3917d] bg-[#b3917d] text-white" : "border-[#e5e7eb] bg-white text-[#1a1a1a]"}`, children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold", children: length.cm }),
              /* @__PURE__ */ jsx("span", { className: `text-[10px] mt-0.5 ${selectedPendantLength === length.cm ? "text-white/80" : "text-[#6b5f59]"}`, children: t(`product.${length.nameKey}`) })
            ] }, length.cm)) : ["S", "M", "L", "XL"].map((size) => /* @__PURE__ */ jsx("button", { onClick: () => setSelectedGenericSize(size), className: `flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 transition-all ${selectedGenericSize === size ? "border-[#b3917d] bg-[#b3917d] text-white" : "border-[#e5e7eb] bg-white text-[#1a1a1a]"}`, children: /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: size }) }, size)) }),
            product.category === Category.Rings && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[#6b5f59]", children: t("product.size_in_mm") }),
            /* @__PURE__ */ jsx("button", { onClick: () => setShowPackagingGuide(true), className: "mt-3 text-sm font-medium text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors", children: t("product.packaging_title") }),
            /* @__PURE__ */ jsx("button", { onClick: () => setShowShippingGuide(true), className: "mt-2 block text-sm font-medium text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors", children: t("product.shipping_returns") })
          ] }),
          product.category === Category.Earrings && /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-start gap-2", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setShowPackagingGuide(true), className: "text-sm font-medium text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors", children: t("product.packaging_title") }),
            /* @__PURE__ */ jsx("button", { onClick: () => setShowShippingGuide(true), className: "text-sm font-medium text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors", children: t("product.shipping_returns") })
          ] }),
          product.availableStones && product.availableStones.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#1a1a1a]", children: t("product.select_stone") }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: product.availableStones.map((stone) => /* @__PURE__ */ jsx("button", { onClick: () => setSelectedStoneType(stone.type), className: `rounded-xl px-4 py-2 text-sm font-bold transition-all ${selectedStoneType === stone.type ? "bg-[#b3917d] text-white" : "bg-white text-[#1a1a1a] ring-1 ring-inset ring-gray-200"}`, children: t(`stones.types.${stone.type}`) }, stone.type)) })
            ] }),
            selectedStoneType && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#1a1a1a]", children: stoneCount > 1 ? t("product.select_stone_colors") : t("product.select_stone_color") }),
              stoneCount > 1 && /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: selectedStoneColors.map((color, index) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setActiveStoneIndex(index), className: `flex items-center gap-2 rounded-2xl border-2 px-3 py-2 transition-all ${activeStoneIndex === index ? "border-[#b3917d] bg-[#b3917d]/10" : "border-[#e5e7eb] bg-white"}`, children: [
                /* @__PURE__ */ jsx("div", { className: `h-8 w-8 rounded-full border-2 overflow-hidden flex items-center justify-center ${color ? "border-white shadow-sm" : "border-dashed border-[#d1ccc8] bg-[#f7f3ef]"}`, style: {
                  backgroundColor: color && !color.imageUrl ? color.value : void 0
                }, children: color?.imageUrl ? /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(color.imageUrl), alt: t(`stones.colors.${color.name}`), className: "h-full w-full object-cover" }) : !color ? /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-[#a19690]", children: index + 1 }) : null }),
                /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx("p", { className: `text-xs font-bold ${activeStoneIndex === index ? "text-[#b3917d]" : "text-[#1a1a1a]"}`, children: t("product.select_stone_n", {
                    n: index + 1
                  }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#6b5f59]", children: color ? t(`stones.colors.${color.name}`) : "—" })
                ] })
              ] }, index)) }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-4", children: product.availableStones.find((s) => s.type === selectedStoneType)?.colors.map((color) => {
                const isSelected = stoneCount > 1 ? selectedStoneColors[activeStoneIndex]?.name === color.name : selectedStoneColor?.name === color.name;
                return /* @__PURE__ */ jsxs("button", { onClick: () => selectStoneColor(color), className: `group relative flex flex-col items-center gap-2`, title: t(`stones.colors.${color.name}`), children: [
                  /* @__PURE__ */ jsx("div", { className: `h-10 w-10 rounded-full border-2 transition-all overflow-hidden flex items-center justify-center ${isSelected ? "border-[#b3917d] scale-110 shadow-md" : "border-transparent"}`, style: {
                    backgroundColor: color.imageUrl ? void 0 : color.value
                  }, title: t(`stones.colors.${color.name}`), children: color.imageUrl ? /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(color.imageUrl), alt: t(`stones.colors.${color.name}`), className: "h-full w-full object-cover" }) : null }),
                  /* @__PURE__ */ jsx("span", { className: `text-xs font-medium transition-colors ${isSelected ? "text-[#b3917d]" : "text-[#6b5f59]"}`, children: t(`stones.colors.${color.name}`) })
                ] }, color.name);
              }) })
            ] }),
            recommendedStones.length > 0 && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-[#f7f3ef] p-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-[#b3917d] uppercase tracking-wider", children: t("product.recommended_for_you") }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 flex gap-3", children: recommendedStones.map((stone) => /* @__PURE__ */ jsx("button", { onClick: () => setSelectedStoneType(stone.type), className: "text-sm font-medium text-[#6b5f59] hover:text-[#1a1a1a] transition-colors underline decoration-[#b3917d]/30 underline-offset-4", children: t(`stones.types.${stone.type}`) }, stone.type)) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto pt-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[#a19690] text-sm font-medium", children: t("common.price") }),
              /* @__PURE__ */ jsx(ProductPrice, { product, size: "lg", className: "mt-1" })
            ] }),
            (() => {
              const sizeRequired = product.category !== Category.Earrings;
              const selectedSize = product.category === Category.Rings ? selectedRingSize : product.category === Category.Pendants ? selectedPendantLength : product.category === Category.Earrings ? null : selectedGenericSize;
              const sizeSelected = !sizeRequired || selectedSize !== null;
              const stonesRequired = product.availableStones && product.availableStones.length > 0;
              const stoneTypeRequired = (product.availableStones?.length ?? 0) > 1;
              const stoneColorRequired = selectedStoneType ? (product.availableStones?.find((s) => s.type === selectedStoneType)?.colors.length ?? 0) > 1 : false;
              const stoneSelected = !stonesRequired || (!stoneTypeRequired || selectedStoneType !== null) && (!stoneColorRequired || allStoneColorsSelected);
              const canAddToCart = sizeSelected && stoneSelected;
              const hint = !sizeSelected ? t("product.size_required") : !stoneSelected ? t("product.stone_required") : null;
              return /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [
                hint && /* @__PURE__ */ jsx("p", { className: "text-center text-xs font-medium text-[#b3917d]", children: hint }),
                /* @__PURE__ */ jsxs("button", { disabled: !canAddToCart, onClick: () => {
                  const stoneLabel = selectedStoneType && allStoneColorsSelected ? stoneCount > 1 ? `${t(`stones.types.${selectedStoneType}`)}: ${selectedStoneColors.map((color, i) => `${i + 1}. ${t(`stones.colors.${color.name}`)}`).join(", ")}` : `${t(`stones.types.${selectedStoneType}`)}: ${t(`stones.colors.${selectedStoneColor.name}`)}` : void 0;
                  addToCart(product, stoneLabel, selectedSize ?? void 0);
                }, className: `flex items-center justify-center gap-3 rounded-[24px] py-4 md:py-5 text-base md:text-lg font-bold text-white shadow-xl transition-all ${canAddToCart ? "bg-[#1a1a1a] hover:bg-black active:scale-[0.98]" : "bg-[#c9bdb8] cursor-not-allowed"}`, children: [
                  /* @__PURE__ */ jsx(ShoppingBag, { className: "h-5 w-5 md:h-6 md:w-6" }),
                  t("common.add_to_cart")
                ] })
              ] });
            })()
          ] }) })
        ] })
      ] }),
      product.reviews && product.reviews.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mt-10 md:mt-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5 text-[#b3917d]" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-2xl font-bold text-[#1a1a1a]", children: [
            t("product.reviews"),
            " ",
            /* @__PURE__ */ jsxs("span", { className: "text-[#b3917d]", children: [
              "(",
              product.reviews.length,
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: product.reviews.map((review, i) => /* @__PURE__ */ jsx(ReviewCard, { review }, i)) })
      ] })
    ] }),
    showSizeGuide && /* @__PURE__ */ jsx(SizeGuide, { onClose: () => setShowSizeGuide(false) }),
    showPackagingGuide && /* @__PURE__ */ jsx(PackagingGuide, { onClose: () => setShowPackagingGuide(false) }),
    showShippingGuide && /* @__PURE__ */ jsx(ShippingReturnsGuide, { onClose: () => setShowShippingGuide(false) }),
    isLightboxOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setIsLightboxOpen(false), className: "absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors", children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex h-full w-full items-center justify-center", children: [
        images.length > 1 && /* @__PURE__ */ jsx("button", { onClick: (e) => {
          e.stopPropagation();
          prevImage();
        }, className: "absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsx("div", { className: "max-h-full max-w-full overflow-hidden rounded-3xl bg-[#f7f3ef]", children: /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(images[activeImageIndex]), alt: `${t(product.name)} - detail view`, className: "max-h-[85vh] object-contain" }) }),
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
function ReviewCard({
  review
}) {
  const date = new Date(review.date).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-white p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f3ef] text-sm font-bold text-[#b3917d]", children: review.author[0] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#1a1a1a]", children: review.author }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#a19690]", children: date })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-0.5 shrink-0", children: Array.from({
        length: 5
      }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: `h-4 w-4 ${i < review.rating ? "fill-[#b3917d] text-[#b3917d]" : "text-[#e5e7eb]"}` }, i)) })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-[#6b5f59] leading-relaxed", children: review.text })
  ] });
}
export {
  ProductPage as component
};
