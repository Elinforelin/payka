import { useTranslation } from "react-i18next";
import type { Product } from "@/lib/data";
import { getCharityPercent } from "@/lib/product-charity";
import { getProductPricing } from "@/lib/product-price";

type PriceSize = "sm" | "md" | "lg";

const sizeClasses: Record<
  PriceSize,
  { current: string; original: string; row: string }
> = {
  sm: {
    current: "text-xs font-bold text-[#b3917d]",
    original: "text-[10px] font-medium text-[#a19690] line-through",
    row: "flex items-baseline gap-1.5",
  },
  md: {
    current: "text-base md:text-lg font-bold text-[#b3917d]",
    original: "text-sm font-medium text-[#a19690] line-through",
    row: "flex items-baseline gap-2",
  },
  lg: {
    current: "text-2xl md:text-3xl font-bold text-[#b3917d]",
    original: "text-lg md:text-xl font-medium text-[#a19690] line-through",
    row: "flex flex-wrap items-baseline gap-2",
  },
};

interface ProductPriceProps {
  product: Pick<Product, "price" | "discountPercent">;
  size?: PriceSize;
  className?: string;
}

export function ProductPrice({ product, size = "md", className = "" }: ProductPriceProps) {
  const { t } = useTranslation();
  const pricing = getProductPricing(product);
  const classes = sizeClasses[size];

  return (
    <div className={`${classes.row} ${className}`.trim()}>
      <span className={classes.current}>₴{pricing.price}</span>
      {pricing.isOnSale && pricing.originalPrice !== null && (
        <>
          <span className={classes.original} aria-label={t("common.original_price")}>
            ₴{pricing.originalPrice}
          </span>
          {size === "lg" && pricing.discountPercent !== null && (
            <span className="rounded-full bg-[#e85d4c]/15 px-2.5 py-0.5 text-sm font-bold text-[#e85d4c]">
              −{pricing.discountPercent}%
            </span>
          )}
        </>
      )}
    </div>
  );
}

/** Shared badge chrome: 8px on mobile, larger from md up */
const productBadgeClass =
  "inline-flex items-center rounded-full px-2 py-0.5 md:px-2.5 md:py-1 text-[8px] md:text-xs font-bold uppercase tracking-wide text-white shadow-md ring-2 ring-white/90";

interface DiscountBadgeProps {
  product: Pick<Product, "price" | "discountPercent">;
  className?: string;
}

export function DiscountBadge({ product, className = "" }: DiscountBadgeProps) {
  const { t } = useTranslation();
  const pricing = getProductPricing(product);
  if (!pricing.isOnSale || pricing.discountPercent === null) return null;

  return (
    <span className={`${productBadgeClass} bg-[#e85d4c] ${className}`.trim()}>
      {t("common.sale")} −{pricing.discountPercent}%
    </span>
  );
}

interface CharityBadgeProps {
  product: Pick<Product, "charityPercent">;
  className?: string;
}

export function CharityBadge({ product, className = "" }: CharityBadgeProps) {
  const { t } = useTranslation();
  const percent = getCharityPercent(product);
  if (percent === null) return null;

  return (
    <span className={`${productBadgeClass} bg-[#5a7a5c] ${className}`.trim()}>
      {t("catalog.filter_charity")} {percent}%
    </span>
  );
}

interface CharityNoteProps {
  product: Pick<Product, "charityPercent">;
  className?: string;
}

export function CharityNote({ product, className = "" }: CharityNoteProps) {
  const { t } = useTranslation();
  const percent = getCharityPercent(product);
  if (percent === null) return null;

  return (
    <p
      className={`rounded-2xl bg-[#5a7a5c]/10 px-4 py-3 text-sm text-[#3d5a40] ${className}`.trim()}
    >
      {t("product.charity_note", { percent })}
    </p>
  );
}
