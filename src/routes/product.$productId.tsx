import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronDown, ChevronLeft, ChevronUp, Heart, ShoppingBag, Star, X, ChevronRight, MessageCircle, Truck } from "lucide-react";
import { Category, products, type Review, type StoneColor } from "@/lib/data";
import { resolveProductImageUrl } from "@/lib/product-images.ts";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { MiniCart } from "@/components/MiniCart";
import { SizeGuide, NECKLACE_LENGTHS } from "@/components/SizeGuide";
import { PackagingGuide } from "@/components/PackagingGuide";
import { ShippingReturnsGuide } from "@/components/ShippingReturnsInfo";
import { LanguageToggle } from "@/components/LanguageToggle";

const getProduct = createServerFn({ method: "GET" })
  .inputValidator((data: { productId: number }) => data)
  .handler(async ({ data }) => {
    return products.find(p => p.id === data.productId) || null;
  });

export const Route = createFileRoute("/product/$productId")({
  loader: async ({ params }) => {
    const productId = Number(params.productId);
    if (!Number.isFinite(productId)) {
      throw notFound();
    }

    const product = await getProduct({ data: { productId } });
    console.log(product)
    if (!product) {
      throw notFound();
    }

    return product;
  },
  component: ProductPage,
});

function ProductPage() {
  const { t } = useTranslation();
  const product = Route.useLoaderData();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorited, categories: favCategories } = useFavorites();
  const [showFavPrompt, setShowFavPrompt] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const stoneCount = product.stoneCount ?? 1;
  const [selectedStoneType, setSelectedStoneType] = useState<string | null>(
    (product.availableStones?.length ?? 0) > 1 ? null : (product.availableStones?.[0]?.type ?? null)
  );
  const [selectedStoneColors, setSelectedStoneColors] = useState<(StoneColor | null)[]>(() => {
    const initialColor =
      stoneCount === 1 && (product.availableStones?.[0]?.colors.length ?? 0) === 1
        ? product.availableStones![0].colors[0]
        : null;
    return Array.from({ length: stoneCount }, () => initialColor);
  });
  const [activeStoneIndex, setActiveStoneIndex] = useState(0);
  const [selectedRingSize, setSelectedRingSize] = useState<string | null>(null);
  const [selectedPendantLength, setSelectedPendantLength] = useState<string | null>(null);
  const [selectedGenericSize, setSelectedGenericSize] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showPackagingGuide, setShowPackagingGuide] = useState(false);
  const [showShippingGuide, setShowShippingGuide] = useState(false);

  useEffect(() => {
    if (product.availableStones && selectedStoneType) {
      const stone = product.availableStones.find(s => s.type === selectedStoneType);
      if (stone) {
        if (stone.colors.length === 1) {
          setSelectedStoneColors(Array.from({ length: stoneCount }, () => stone.colors[0]));
        } else {
          setSelectedStoneColors(Array.from({ length: stoneCount }, () => null));
          setActiveStoneIndex(0);
        }
      }
    }
  }, [selectedStoneType, product.availableStones, stoneCount]);

  const selectedStoneColor = selectedStoneColors[0] ?? null;
  const allStoneColorsSelected = selectedStoneColors.every((color) => color !== null);

  const selectStoneColor = (color: StoneColor) => {
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

  const recommendedStones = product.availableStones?.filter(s => s.type !== selectedStoneType) || [];

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.imageUrl];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  const productDetails = [
    { label: t('common.categories'), value: t(`common.category_names.${product.category}`) },
    { label: t('product.metal_standard'), value: product.metalStandard },
    { label: t('product.metal_type'), value: product.metalType ? t(product.metalType) : undefined },
    { label: t('product.metal_color'), value: product.metalColor ? t(product.metalColor) : undefined },
    { label: t('product.clasp'), value: product.clasp },
    { label: t('product.gemstone'), value: product.gemstone ? t(product.gemstone) : undefined },
    { label: t('product.design'), value: product.design },
    { label: t('product.weight'), value: product.weight },
  ].filter((detail) => detail.value !== null && detail.value !== undefined);

  return (
    <>
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12 pb-12">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageToggle />
          <div className="relative">
            <button 
              onClick={() => {
                if (isFavorited(product.id)) {
                  removeFromFavorites(product.id);
                } else {
                  setShowFavPrompt(!showFavPrompt);
                }
              }}
              className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl shadow-sm transition-colors ${
                isFavorited(product.id) 
                  ? "bg-[#b3917d] text-white" 
                  : "bg-white text-[#1a1a1a]"
              }`}
            >
              <Heart className={`h-5 w-5 md:h-6 md:w-6 ${isFavorited(product.id) ? "fill-current" : ""}`} />
            </button>
            
            {showFavPrompt && !isFavorited(product.id) && (
              <div className="absolute right-0 top-14 z-20 w-48 rounded-2xl bg-white p-2 sm:p-3 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
                <p className="mb-1.5 sm:mb-2 px-1 text-[10px] sm:text-xs font-bold text-[#a19690] uppercase tracking-wider">{t('favorites.confirm_favorite')}:</p>
                <div className="flex flex-col gap-0.5 sm:gap-1">
                  {favCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        addToFavorites(product, cat);
                        setShowFavPrompt(false);
                      }}
                      className="rounded-xl px-3 py-1.5 sm:py-2 text-left text-xs sm:text-sm font-medium text-[#1a1a1a] hover:bg-[#fdfaf7] hover:text-[#b3917d] transition-colors"
                    >
                      {cat === 'General' ? t('favorites.general') : (Object.values(Category).includes(cat as any) ? t(`common.category_names.${cat}`) : cat)}
                    </button>
                  ))}
                  <div className="mt-1 border-t border-gray-50 pt-1">
                    <button
                      onClick={() => setShowFavPrompt(false)}
                      className="w-full rounded-xl px-3 py-1.5 text-left text-xs font-medium text-[#a19690] hover:bg-gray-50 transition-colors"
                    >
                      {t('favorites.cancel')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <MiniCart />
        </div>
      </header>

      <div className="mt-6 md:mt-8 flex flex-col gap-8 md:gap-10 md:flex-row">
        <div className="flex-1">
          <div 
            className="relative aspect-square w-full max-w-200 overflow-hidden rounded-[32px] md:rounded-[48px] bg-[#f7f3ef] shadow-inner cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          >
            <img
              src={resolveProductImageUrl(images[activeImageIndex])}
              alt={`${t(product.name)} - image ${activeImageIndex + 1}`}
              className="h-full w-full object-cover transition-transform duration-500"
            />
            {selectedStoneColors.some(Boolean) && (
              <div className="absolute bottom-6 right-6 z-10 flex gap-1.5">
                {selectedStoneColors.map((color, index) =>
                  color ? (
                    <div
                      key={index}
                      className="h-8 w-8 rounded-full border-2 border-white shadow-lg overflow-hidden flex items-center justify-center"
                      style={{ backgroundColor: color.imageUrl ? undefined : color.value }}
                      title={`${t(`stones.types.${selectedStoneType}`)} ${index + 1}: ${t(`stones.colors.${color.name}`)}`}
                    >
                      {color.imageUrl ? (
                        <img
                          src={resolveProductImageUrl(color.imageUrl)}
                          alt={t(`stones.colors.${color.name}`)}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="mt-6 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                    activeImageIndex === index ? "border-[#b3917d]" : "border-transparent"
                  }`}
                >
                  <img
                    src={resolveProductImageUrl(img)}
                    alt={`${t(product.name)} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">{t(product.name)}</h2>

          </div>

          <p className="mt-2 text-[#6b5f59]">{t(product.description)}</p>

          <div className="mt-8">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <h3 className="text-xl font-bold text-[#1a1a1a]">{t('product.about_product')}</h3>
              {isDetailsOpen ? (
                <ChevronUp className="h-6 w-6 text-[#1a1a1a]" />
              ) : (
                <ChevronDown className="h-6 w-6 text-[#1a1a1a]" />
              )}
            </button>
            {isDetailsOpen && (
              <div className="mt-2 space-y-3">
                {productDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-end gap-2 text-sm md:text-base"
                  >
                    <span className="text-[#6b5f59] whitespace-nowrap">{detail.label}</span>
                    <div className="mb-1.5 flex-1 border-b border-dotted border-[#d1ccc8]" />
                    <span className="font-bold text-[#1a1a1a] text-right">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {product.category !== Category.Earrings && (
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1a1a1a]">
                  {product.category === Category.Rings
                    ? t('product.select_ring_size')
                    : product.category === Category.Pendants
                      ? t('product.select_necklace_length')
                      : t('product.select_size')}
                </h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm font-medium text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors"
                >
                  {t('product.size_guide')}
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.category === Category.Rings ? (
                  Array.from({ length: (22 - 15) / 0.5 + 1 }, (_, i) => (15 + i * 0.5).toFixed(1)).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedRingSize(size)}
                      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 transition-all ${
                        selectedRingSize === size
                          ? "border-[#b3917d] bg-[#b3917d] text-white"
                          : "border-[#e5e7eb] bg-white text-[#1a1a1a]"
                      }`}
                    >
                      <span className="text-sm font-bold">{size}</span>
                    </button>
                  ))
                ) : product.category === Category.Pendants ? (
                  NECKLACE_LENGTHS.map((length) => (
                    <button
                      key={length.cm}
                      onClick={() => setSelectedPendantLength(length.cm)}
                      className={`flex flex-shrink-0 flex-col items-center justify-center rounded-2xl border-2 px-3 py-2 transition-all ${
                        selectedPendantLength === length.cm
                          ? "border-[#b3917d] bg-[#b3917d] text-white"
                          : "border-[#e5e7eb] bg-white text-[#1a1a1a]"
                      }`}
                    >
                      <span className="text-xs font-bold">{length.cm}</span>
                      <span className={`text-[10px] mt-0.5 ${selectedPendantLength === length.cm ? "text-white/80" : "text-[#6b5f59]"}`}>
                        {t(`product.${length.nameKey}`)}
                      </span>
                    </button>
                  ))
                ) : (
                  ["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedGenericSize(size)}
                      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 transition-all ${
                        selectedGenericSize === size
                          ? "border-[#b3917d] bg-[#b3917d] text-white"
                          : "border-[#e5e7eb] bg-white text-[#1a1a1a]"
                      }`}
                    >
                      <span className="text-lg font-bold">{size}</span>
                    </button>
                  ))
                )}
              </div>
              {product.category === Category.Rings && (
                <p className="mt-2 text-sm text-[#6b5f59]">
                  {t('product.size_in_mm')}
                </p>
              )}
              <button
                onClick={() => setShowPackagingGuide(true)}
                className="mt-3 text-sm font-medium text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors"
              >
                {t('product.packaging_title')}
              </button>
              <button
                onClick={() => setShowShippingGuide(true)}
                className="mt-2 block text-sm font-medium text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors"
              >
                {t('product.shipping_returns')}
              </button>
            </div>
          )}

          {product.category === Category.Earrings && (
            <div className="mt-8 flex flex-col items-start gap-2">
              <button
                onClick={() => setShowPackagingGuide(true)}
                className="text-sm font-medium text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors"
              >
                {t('product.packaging_title')}
              </button>
              <button
                onClick={() => setShowShippingGuide(true)}
                className="text-sm font-medium text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors"
              >
                {t('product.shipping_returns')}
              </button>
            </div>
          )}

          {product.availableStones && product.availableStones.length > 0 && (
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#1a1a1a]">{t('product.select_stone')}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.availableStones.map((stone) => (
                    <button
                      key={stone.type}
                      onClick={() => setSelectedStoneType(stone.type)}
                      className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                        selectedStoneType === stone.type
                          ? "bg-[#b3917d] text-white"
                          : "bg-white text-[#1a1a1a] ring-1 ring-inset ring-gray-200"
                      }`}
                    >
                      {t(`stones.types.${stone.type}`)}
                    </button>
                  ))}
                </div>
              </div>

              {selectedStoneType && (
                <div>
                  <h3 className="text-lg font-bold text-[#1a1a1a]">
                    {stoneCount > 1 ? t('product.select_stone_colors') : t('product.select_stone_color')}
                  </h3>

                  {stoneCount > 1 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {selectedStoneColors.map((color, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setActiveStoneIndex(index)}
                          className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2 transition-all ${
                            activeStoneIndex === index
                              ? "border-[#b3917d] bg-[#b3917d]/10"
                              : "border-[#e5e7eb] bg-white"
                          }`}
                        >
                          <div
                            className={`h-8 w-8 rounded-full border-2 overflow-hidden flex items-center justify-center ${
                              color ? "border-white shadow-sm" : "border-dashed border-[#d1ccc8] bg-[#f7f3ef]"
                            }`}
                            style={{ backgroundColor: color && !color.imageUrl ? color.value : undefined }}
                          >
                            {color?.imageUrl ? (
                              <img
                                src={resolveProductImageUrl(color.imageUrl)}
                                alt={t(`stones.colors.${color.name}`)}
                                className="h-full w-full object-cover"
                              />
                            ) : !color ? (
                              <span className="text-xs font-bold text-[#a19690]">{index + 1}</span>
                            ) : null}
                          </div>
                          <div className="text-left">
                            <p className={`text-xs font-bold ${activeStoneIndex === index ? "text-[#b3917d]" : "text-[#1a1a1a]"}`}>
                              {t('product.select_stone_n', { n: index + 1 })}
                            </p>
                            <p className="text-[11px] text-[#6b5f59]">
                              {color ? t(`stones.colors.${color.name}`) : "—"}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-4">
                    {product.availableStones.find(s => s.type === selectedStoneType)?.colors.map((color) => {
                      const isSelected = stoneCount > 1
                        ? selectedStoneColors[activeStoneIndex]?.name === color.name
                        : selectedStoneColor?.name === color.name;
                      return (
                        <button
                          key={color.name}
                          onClick={() => selectStoneColor(color)}
                          className={`group relative flex flex-col items-center gap-2`}
                          title={t(`stones.colors.${color.name}`)}
                        >
                          <div
                            className={`h-10 w-10 rounded-full border-2 transition-all overflow-hidden flex items-center justify-center ${
                              isSelected
                                ? "border-[#b3917d] scale-110 shadow-md"
                                : "border-transparent"
                            }`}
                            style={{ backgroundColor: color.imageUrl ? undefined : color.value }}
                            title={t(`stones.colors.${color.name}`)}
                          >
                            {color.imageUrl ? (
                              <img
                                src={resolveProductImageUrl(color.imageUrl)}
                                alt={t(`stones.colors.${color.name}`)}
                                className="h-full w-full object-cover"
                              />
                            ) : null}
                          </div>
                          <span className={`text-xs font-medium transition-colors ${
                            isSelected ? "text-[#b3917d]" : "text-[#6b5f59]"
                          }`}>
                            {t(`stones.colors.${color.name}`)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {recommendedStones.length > 0 && (
                <div className="rounded-2xl bg-[#f7f3ef] p-4">
                  <h4 className="text-sm font-bold text-[#b3917d] uppercase tracking-wider">{t('product.recommended_for_you')}</h4>
                  <div className="mt-2 flex gap-3">
                    {recommendedStones.map((stone) => (
                      <button
                        key={stone.type}
                        onClick={() => setSelectedStoneType(stone.type)}
                        className="text-sm font-medium text-[#6b5f59] hover:text-[#1a1a1a] transition-colors underline decoration-[#b3917d]/30 underline-offset-4"
                      >
                        {t(`stones.types.${stone.type}`)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-auto pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
              <div>
                <p className="text-[#a19690] text-sm font-medium">{t('common.price')}</p>
                <p className="text-2xl md:text-3xl font-bold text-[#b3917d]">₴{product.price}</p>
              </div>
              {(() => {
                const sizeRequired = product.category !== Category.Earrings;
                const selectedSize =
                  product.category === Category.Rings ? selectedRingSize :
                  product.category === Category.Pendants ? selectedPendantLength :
                  product.category === Category.Earrings ? null :
                  selectedGenericSize;
                const sizeSelected = !sizeRequired || selectedSize !== null;
                const stonesRequired = product.availableStones && product.availableStones.length > 0;
                const stoneTypeRequired = (product.availableStones?.length ?? 0) > 1;
                const stoneColorRequired = selectedStoneType
                  ? (product.availableStones?.find(s => s.type === selectedStoneType)?.colors.length ?? 0) > 1
                  : false;
                const stoneSelected = !stonesRequired || (
                  (!stoneTypeRequired || selectedStoneType !== null) &&
                  (!stoneColorRequired || allStoneColorsSelected)
                );
                const canAddToCart = sizeSelected && stoneSelected;
                const hint = !sizeSelected
                  ? t('product.size_required')
                  : !stoneSelected
                    ? t('product.stone_required')
                    : null;
                return (
                  <div className="flex flex-1 flex-col gap-1">
                    {hint && (
                      <p className="text-center text-xs font-medium text-[#b3917d]">{hint}</p>
                    )}
                    <button
                      disabled={!canAddToCart}
                      onClick={() => {
                        const stoneLabel = selectedStoneType && allStoneColorsSelected
                          ? stoneCount > 1
                            ? `${t(`stones.types.${selectedStoneType}`)}: ${selectedStoneColors
                                .map((color, i) => `${i + 1}. ${t(`stones.colors.${color!.name}`)}`)
                                .join(', ')}`
                            : `${t(`stones.types.${selectedStoneType}`)}: ${t(`stones.colors.${selectedStoneColor!.name}`)}`
                          : undefined;
                        addToCart(product, stoneLabel, selectedSize ?? undefined);
                      }}
                      className={`flex items-center justify-center gap-3 rounded-[24px] py-4 md:py-5 text-base md:text-lg font-bold text-white shadow-xl transition-all ${
                        canAddToCart
                          ? "bg-[#1a1a1a] hover:bg-black active:scale-[0.98]"
                          : "bg-[#c9bdb8] cursor-not-allowed"
                      }`}
                    >
                      <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
                      {t('common.add_to_cart')}
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-10 md:mt-12">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="h-5 w-5 text-[#b3917d]" />
            <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">
              {t('product.reviews')} <span className="text-[#b3917d]">({product.reviews.length})</span>
            </h2>
          </div>
          <div className="space-y-4">
            {product.reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </section>
      )}
    </main>

    {showSizeGuide && <SizeGuide onClose={() => setShowSizeGuide(false)} />}
    {showPackagingGuide && <PackagingGuide onClose={() => setShowPackagingGuide(false)} />}
    {showShippingGuide && <ShippingReturnsGuide onClose={() => setShowShippingGuide(false)} />}

    {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="relative flex h-full w-full items-center justify-center">
            {images.length > 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}
            
            <div className="max-h-full max-w-full overflow-hidden rounded-3xl bg-[#f7f3ef]">
              <img
                src={resolveProductImageUrl(images[activeImageIndex])}
                alt={`${t(product.name)} - detail view`}
                className="max-h-[85vh] object-contain"
              />
            </div>
            
            {images.length > 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-medium">
              {activeImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f3ef] text-sm font-bold text-[#b3917d]">
            {review.author[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-[#1a1a1a]">{review.author}</p>
            <p className="text-xs text-[#a19690]">{date}</p>
          </div>
        </div>
        <div className="flex gap-0.5 shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "fill-[#b3917d] text-[#b3917d]" : "text-[#e5e7eb]"}`}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm text-[#6b5f59] leading-relaxed">{review.text}</p>
    </div>
  );
}
