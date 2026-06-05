import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ChevronDown, ChevronLeft, ChevronUp, Heart, ShoppingBag, Star, X, ChevronRight, Bell, Plus, Minus } from "lucide-react";
import { Category, products } from "@/lib/data";
import { resolveProductImageUrl } from "@/lib/product-images.ts";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favorites-context";
import { MiniCart } from "@/components/MiniCart";

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
  const [selectedStoneType, setSelectedStoneType] = useState(product.availableStones?.[0]?.type || "");
  const [selectedStoneColor, setSelectedStoneColor] = useState(product.availableStones?.[0]?.colors[0] || null);
  const [selectedRingSize, setSelectedRingSize] = useState("17.0");

  useEffect(() => {
    if (product.availableStones) {
      const stone = product.availableStones.find(s => s.type === selectedStoneType);
      if (stone && (!selectedStoneColor || !stone.colors.find(c => c.name === selectedStoneColor.name))) {
        setSelectedStoneColor(stone.colors[0]);
      }
    }
  }, [selectedStoneType, product.availableStones]);

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
    { label: t('product.sku'), value: product.sku },
    { label: t('common.categories'), value: t(`common.category_names.${product.category}`) },
    { label: t('product.metal_standard'), value: product.metalStandard },
    { label: t('product.metal_type'), value: product.metalType },
    { label: t('product.metal_color'), value: product.metalColor },
    { label: t('product.clasp'), value: product.clasp },
    { label: t('product.gemstone'), value: product.gemstone },
    { label: t('product.design'), value: product.design },
    { label: t('product.style'), value: product.style },
    { label: t('product.product_type'), value: product.productType },
    { label: t('product.technology'), value: product.technology },
    { label: t('product.width'), value: product.width },
    { label: t('product.thickness'), value: product.thickness },
    { label: t('product.length'), value: product.length },
    { label: t('product.weight'), value: product.weight },
  ].filter((detail) => detail.value !== null && detail.value !== undefined);
  console.log(product)
  return (
    <>
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
      <header className="flex items-center justify-between">
        <Link
          to="/catalog"
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
        </Link>
        <h1 className="text-lg md:text-xl font-bold text-[#1a1a1a]">{t('product.details')}</h1>
        <div className="flex items-center gap-2 md:gap-3">
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
              <div className="absolute right-0 top-14 z-20 w-48 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
                <p className="mb-2 px-1 text-xs font-bold text-[#a19690] uppercase tracking-wider">{t('favorites.confirm_favorite')}:</p>
                <div className="flex flex-col gap-1">
                  {favCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        addToFavorites(product, cat);
                        setShowFavPrompt(false);
                      }}
                      className="rounded-xl px-3 py-2 text-left text-sm font-medium text-[#1a1a1a] hover:bg-[#fdfaf7] hover:text-[#b3917d] transition-colors"
                    >
                      {cat === 'General' ? t('favorites.general') : (Object.values(Category).includes(cat as any) ? t(`common.category_names.${cat}`) : cat)}
                    </button>
                  ))}
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
            className="relative aspect-square w-full overflow-hidden rounded-[32px] md:rounded-[48px] bg-[#f7f3ef] shadow-inner cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
          >
            <img
              src={resolveProductImageUrl(images[activeImageIndex])}
              alt={`${t(product.name)} - image ${activeImageIndex + 1}`}
              className="h-full w-full object-cover transition-transform duration-500"
            />
            {selectedStoneColor && (
              <div 
                className="absolute bottom-6 right-6 h-8 w-8 rounded-full border-2 border-white shadow-lg z-10 overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: selectedStoneColor.imageUrl ? undefined : selectedStoneColor.value }}
                title={`${t(`stones.types.${selectedStoneType}`)}: ${t(`stones.colors.${selectedStoneColor.name}`)}`}
              >
                {selectedStoneColor.imageUrl ? (
                  <img 
                    src={resolveProductImageUrl(selectedStoneColor.imageUrl)} 
                    alt={t(`stones.colors.${selectedStoneColor.name}`)}
                    className="h-full w-full object-cover"
                  />
                ) : null}
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
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 md:h-5 md:w-5 fill-[#b3917d] text-[#b3917d]" />
              <span className="font-bold text-[#1a1a1a]">4.8</span>
            </div>
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

          <div className="mt-8">
            <h3 className="text-lg font-bold text-[#1a1a1a]">
              {product.category === Category.Rings ? t('product.select_ring_size') : t('product.select_size')}
            </h3>
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
              ) : (
                ["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 transition-all ${
                      size === "M"
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
          </div>

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
                  <h3 className="text-lg font-bold text-[#1a1a1a]">{t('product.select_stone_color')}</h3>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {product.availableStones.find(s => s.type === selectedStoneType)?.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedStoneColor(color)}
                        className={`group relative flex flex-col items-center gap-2`}
                        title={t(`stones.colors.${color.name}`)}
                      >
                        <div 
                          className={`h-10 w-10 rounded-full border-2 transition-all overflow-hidden flex items-center justify-center ${
                            selectedStoneColor?.name === color.name 
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
                          selectedStoneColor?.name === color.name ? "text-[#b3917d]" : "text-[#6b5f59]"
                        }`}>
                          {t(`stones.colors.${color.name}`)}
                        </span>
                      </button>
                    ))}
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
                <p className="text-2xl md:text-3xl font-bold text-[#b3917d]">${product.price}</p>
              </div>
              <button 
                onClick={() => addToCart(product)}
                className="flex flex-1 items-center justify-center gap-3 rounded-[24px] bg-[#1a1a1a] py-4 md:py-5 text-base md:text-lg font-bold text-white shadow-xl transition-all hover:bg-black active:scale-[0.98]"
              >
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />
                {t('common.add_to_cart')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    
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
