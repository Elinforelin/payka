import { c as createLucideIcon, u as useFavorites } from "./router-DTeC6Cxg.mjs";
import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { C as Category } from "./data-CZl5DixN.mjs";
import { r as resolveProductImageUrl } from "./product-images-XBZXgYgm.mjs";
import { D as DiscountBadge, C as CharityBadge, H as Heart, P as ProductPrice } from "./ProductPrice-BQSkTEaE.mjs";
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
function ProductCard({ product, showFavPrompt, onFavPromptChange }) {
  const { t } = useTranslation();
  const { addToFavorites, removeFromFavorites, isFavorited, categories: favCategories } = useFavorites();
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: "/product/$productId",
      params: { productId: String(product.id) },
      className: "rounded-[32px] bg-white p-3 md:p-4 shadow-sm",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-square w-full overflow-hidden rounded-[24px] bg-[#f7f3ef]", children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute left-3 bottom-3 right-3 md:left-4 md:bottom-4 md:right-4 z-10 flex flex-col items-start gap-1.5 pointer-events-none", children: [
            /* @__PURE__ */ jsx(DiscountBadge, { product }),
            /* @__PURE__ */ jsx(CharityBadge, { product })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isFavorited(product.id)) {
                  removeFromFavorites(product.id);
                } else {
                  onFavPromptChange(product.id);
                }
              },
              className: `absolute right-3 top-3 md:right-4 md:top-4 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors ${isFavorited(product.id) ? "bg-[#b3917d] text-white" : "bg-white/60 text-[#1a1a1a]"}`,
              children: /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 md:h-5 md:w-5 ${isFavorited(product.id) ? "fill-current" : ""}` })
            }
          ),
          showFavPrompt === product.id && /* @__PURE__ */ jsxs(
            "div",
            {
              className: "absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 p-4 text-center backdrop-blur-md",
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
              },
              children: [
                /* @__PURE__ */ jsxs("p", { className: "mb-2 text-xs sm:text-sm font-bold text-white leading-tight px-1", children: [
                  t("favorites.confirm_favorite"),
                  "?"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full gap-1 sm:gap-1.5 max-w-[130px] sm:max-w-[140px]", children: favCategories.map((cat) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToFavorites(product, cat);
                      onFavPromptChange(null);
                    },
                    className: "rounded-full bg-white py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-[#1a1a1a] hover:bg-[#b3917d] hover:text-white transition-colors",
                    children: cat === "General" ? t("favorites.general") : Object.values(Category).includes(cat) ? t(`common.category_names.${cat}`) : cat
                  },
                  cat
                )) }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onFavPromptChange(null);
                    },
                    className: "mt-2 sm:mt-4 text-[10px] sm:text-xs font-medium text-white/80 underline underline-offset-2 hover:text-white transition-colors",
                    children: t("favorites.cancel")
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: resolveProductImageUrl(product.imageUrl),
              alt: t(product.name),
              className: "h-full w-full object-cover"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 px-1 md:px-2", children: [
          /* @__PURE__ */ jsx("h4", { className: "text-base md:text-lg font-bold text-[#1a1a1a]", children: t(product.name) }),
          /* @__PURE__ */ jsx(ProductPrice, { product })
        ] })
      ]
    }
  );
}
export {
  Check as C,
  Info as I,
  ProductCard as P,
  SlidersHorizontal as S
};
