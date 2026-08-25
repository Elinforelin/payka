import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Category, type Product } from "@/lib/data";
import { resolveProductImageUrl } from "@/lib/product-images.ts";
import { useFavorites } from "@/lib/favorites-context";
import { DiscountBadge, CharityBadge, ProductPrice } from "@/components/ProductPrice";

interface ProductCardProps {
  product: Product;
  showFavPrompt: number | null;
  onFavPromptChange: (id: number | null) => void;
}

export function ProductCard({ product, showFavPrompt, onFavPromptChange }: ProductCardProps) {
  const { t } = useTranslation();
  const { addToFavorites, removeFromFavorites, isFavorited, categories: favCategories } = useFavorites();

  return (
    <Link
      to="/product/$productId"
      params={{ productId: String(product.id) }}
      className="rounded-[32px] bg-white p-3 md:p-4 shadow-sm"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-[#f7f3ef]">
        <div className="absolute left-3 bottom-3 right-3 md:left-4 md:bottom-4 md:right-4 z-10 flex flex-col items-start gap-1.5 pointer-events-none">
          <DiscountBadge product={product} />
          <CharityBadge product={product} />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isFavorited(product.id)) {
              removeFromFavorites(product.id);
            } else {
              onFavPromptChange(product.id);
            }
          }}
          className={`absolute right-3 top-3 md:right-4 md:top-4 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
            isFavorited(product.id)
              ? "bg-[#b3917d] text-white"
              : "bg-white/60 text-[#1a1a1a]"
          }`}
        >
          <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isFavorited(product.id) ? "fill-current" : ""}`} />
        </button>

        {showFavPrompt === product.id && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 p-4 text-center backdrop-blur-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <p className="mb-2 text-xs sm:text-sm font-bold text-white leading-tight px-1">
              {t('favorites.confirm_favorite')}?
            </p>
            <div className="flex flex-col w-full gap-1 sm:gap-1.5 max-w-[130px] sm:max-w-[140px]">
              {favCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToFavorites(product, cat);
                    onFavPromptChange(null);
                  }}
                  className="rounded-full bg-white py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold text-[#1a1a1a] hover:bg-[#b3917d] hover:text-white transition-colors"
                >
                  {cat === 'General'
                    ? t('favorites.general')
                    : Object.values(Category).includes(cat as Category)
                      ? t(`common.category_names.${cat}`)
                      : cat}
                </button>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavPromptChange(null);
              }}
              className="mt-2 sm:mt-4 text-[10px] sm:text-xs font-medium text-white/80 underline underline-offset-2 hover:text-white transition-colors"
            >
              {t('favorites.cancel')}
            </button>
          </div>
        )}
        <img
          src={resolveProductImageUrl(product.imageUrl)}
          alt={t(product.name)}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-4 px-1 md:px-2">
        <h4 className="text-base md:text-lg font-bold text-[#1a1a1a]">
          {t(product.name)}
        </h4>
        <ProductPrice product={product} />
      </div>
    </Link>
  );
}
