import { c as createLucideIcon, d as getProductPricing } from "./router-DTeC6Cxg.mjs";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode);
function getCharityPercent(product) {
  const percent = product.charityPercent;
  if (typeof percent !== "number" || !Number.isFinite(percent)) {
    return null;
  }
  const rounded = Math.round(percent);
  if (rounded < 1 || rounded > 100) {
    return null;
  }
  return rounded;
}
const sizeClasses = {
  sm: {
    current: "text-xs font-bold text-[#b3917d]",
    original: "text-[10px] font-medium text-[#a19690] line-through",
    row: "flex items-baseline gap-1.5"
  },
  md: {
    current: "text-base md:text-lg font-bold text-[#b3917d]",
    original: "text-sm font-medium text-[#a19690] line-through",
    row: "flex items-baseline gap-2"
  },
  lg: {
    current: "text-2xl md:text-3xl font-bold text-[#b3917d]",
    original: "text-lg md:text-xl font-medium text-[#a19690] line-through",
    row: "flex flex-wrap items-baseline gap-2"
  }
};
function ProductPrice({ product, size = "md", className = "" }) {
  const { t } = useTranslation();
  const pricing = getProductPricing(product);
  const classes = sizeClasses[size];
  return /* @__PURE__ */ jsxs("div", { className: `${classes.row} ${className}`.trim(), children: [
    /* @__PURE__ */ jsxs("span", { className: classes.current, children: [
      "₴",
      pricing.price
    ] }),
    pricing.isOnSale && pricing.originalPrice !== null && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("span", { className: classes.original, "aria-label": t("common.original_price"), children: [
        "₴",
        pricing.originalPrice
      ] }),
      size === "lg" && pricing.discountPercent !== null && /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-[#e85d4c]/15 px-2.5 py-0.5 text-sm font-bold text-[#e85d4c]", children: [
        "−",
        pricing.discountPercent,
        "%"
      ] })
    ] })
  ] });
}
const productBadgeClass = "inline-flex items-center rounded-full px-2 py-0.5 md:px-2.5 md:py-1 text-[8px] md:text-xs font-bold uppercase tracking-wide text-white shadow-md ring-2 ring-white/90";
function DiscountBadge({ product, className = "" }) {
  const { t } = useTranslation();
  const pricing = getProductPricing(product);
  if (!pricing.isOnSale || pricing.discountPercent === null) return null;
  return /* @__PURE__ */ jsxs("span", { className: `${productBadgeClass} bg-[#e85d4c] ${className}`.trim(), children: [
    t("common.sale"),
    " −",
    pricing.discountPercent,
    "%"
  ] });
}
function CharityBadge({ product, className = "" }) {
  const { t } = useTranslation();
  const percent = getCharityPercent(product);
  if (percent === null) return null;
  return /* @__PURE__ */ jsxs("span", { className: `${productBadgeClass} bg-[#5a7a5c] ${className}`.trim(), children: [
    t("catalog.filter_charity"),
    " ",
    percent,
    "%"
  ] });
}
function CharityNote({ product, className = "" }) {
  const { t } = useTranslation();
  const percent = getCharityPercent(product);
  if (percent === null) return null;
  return /* @__PURE__ */ jsx(
    "p",
    {
      className: `rounded-2xl bg-[#5a7a5c]/10 px-4 py-3 text-sm text-[#3d5a40] ${className}`.trim(),
      children: t("product.charity_note", { percent })
    }
  );
}
export {
  CharityBadge as C,
  DiscountBadge as D,
  Heart as H,
  ProductPrice as P,
  ShoppingBag as S,
  CharityNote as a,
  getCharityPercent as g
};
