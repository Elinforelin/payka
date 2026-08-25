import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Heart, Info, Search, SlidersHorizontal, X, Check } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Category, products } from "@/lib/data";
import { resolveProductImageUrl } from "@/lib/product-images.ts";
import { getEffectivePrice, getProductPricing } from "@/lib/product-price";
import { getCharityPercent } from "@/lib/product-charity";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MiniCart } from "@/components/MiniCart";
import { ProductCard } from "@/components/ProductCard";
import { ProductPrice } from "@/components/ProductPrice";

export const Route = createFileRoute("/catalog/$category")({
  loader: async ({ params }) => {
    const category = params.category as Category;
    if (!Object.values(Category).includes(category)) {
      throw notFound();
    }

    const categoryProducts = products.filter((product) => product.category === category);
    if (categoryProducts.length === 0) {
      throw notFound();
    }

    return {
      category,
      products: categoryProducts,
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { t } = useTranslation();
  const { category, products: categoryProducts } = Route.useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedMetalTypes, setSelectedMetalTypes] = useState<string[]>([]);
  const [filterOnSale, setFilterOnSale] = useState(false);
  const [filterCharity, setFilterCharity] = useState(false);
  const [showFavPrompt, setShowFavPrompt] = useState<number | null>(null);

  const filteredProducts = categoryProducts.filter((product) => {
    const matchesSearch =
      t(product.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(product.description).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.design && product.design.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPrice =
      getEffectivePrice(product) >= priceRange[0] && getEffectivePrice(product) <= priceRange[1];
    const matchesMetalType =
      selectedMetalTypes.length === 0 ||
      (product.metalType && selectedMetalTypes.includes(product.metalType));
    const matchesOffers =
      (!filterOnSale && !filterCharity) ||
      (filterOnSale && getProductPricing(product).isOnSale) ||
      (filterCharity && getCharityPercent(product) !== null);

    return matchesSearch && matchesPrice && matchesMetalType && matchesOffers;
  });

  const metalTypes = Array.from(
    new Set(categoryProducts.map((product) => product.metalType).filter(Boolean))
  ) as string[];

  const suggestions =
    searchQuery.length > 0
      ? categoryProducts
          .filter((product) => t(product.name).toLowerCase().includes(searchQuery.toLowerCase()))
          .slice(0, 5)
      : [];

  return (
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
        </Link>
        <h1 className="text-lg md:text-xl font-bold text-[#1a1a1a]">
          {t(`common.category_names.${category}`)}
        </h1>
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageToggle />
          <Link
            to="/favorites"
            className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
          >
            <Heart className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
          </Link>
          <Link
            to="/about"
            className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
          >
            <Info className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
          </Link>
          <MiniCart />
        </div>
      </header>

      <div className="mt-8 flex gap-4 relative">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a19690]" />
          <input
            type="text"
            placeholder={t('common.search_placeholder')}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="h-12 md:h-14 w-full rounded-2xl bg-white pl-12 pr-4 text-base md:text-lg outline-none shadow-sm"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-2xl bg-white p-2 shadow-xl border border-gray-100">
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion.id}
                  to="/product/$productId"
                  params={{ productId: String(suggestion.id) }}
                  className="flex items-center gap-3 p-3 hover:bg-[#fdfaf7] rounded-xl transition-colors"
                  onClick={() => setShowSuggestions(false)}
                >
                  <div className="h-10 w-10 overflow-hidden rounded-lg bg-[#f7f3ef]">
                    <img
                      src={resolveProductImageUrl(suggestion.imageUrl)}
                      alt={t(suggestion.name)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#1a1a1a]">{t(suggestion.name)}</div>
                    <ProductPrice product={suggestion} size="sm" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#b3917d] text-white shadow-lg shrink-0"
        >
          <SlidersHorizontal className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="relative h-full w-full max-w-sm bg-white p-8 shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1a1a1a]">{t('catalog.advanced_filters')}</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-[#fdfaf7]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#1a1a1a]">{t('catalog.price_range')}</h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs text-[#6b5f59] mb-1 block uppercase tracking-wider">{t('catalog.min')}</label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full rounded-xl bg-[#fdfaf7] px-4 py-3 text-sm outline-none border border-transparent focus:border-[#b3917d]"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-[#6b5f59] mb-1 block uppercase tracking-wider">{t('catalog.max')}</label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full rounded-xl bg-[#fdfaf7] px-4 py-3 text-sm outline-none border border-transparent focus:border-[#b3917d]"
                  />
                </div>
              </div>
            </div>

            {metalTypes.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-[#1a1a1a]">{t('product.metal_type')}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {metalTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedMetalTypes((prev) =>
                          prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
                        );
                      }}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        selectedMetalTypes.includes(type)
                          ? "bg-[#b3917d] text-white"
                          : "bg-[#fdfaf7] text-[#6b5f59]"
                      }`}
                    >
                      {selectedMetalTypes.includes(type) && <Check className="h-3 w-3" />}
                      {t(type)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#1a1a1a]">{t('catalog.offers')}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFilterOnSale((prev) => !prev)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filterOnSale
                      ? "bg-[#e85d4c] text-white"
                      : "bg-[#fdfaf7] text-[#6b5f59]"
                  }`}
                >
                  {filterOnSale && <Check className="h-3 w-3" />}
                  {t('common.sale')}
                </button>
                <button
                  type="button"
                  onClick={() => setFilterCharity((prev) => !prev)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filterCharity
                      ? "bg-[#5a7a5c] text-white"
                      : "bg-[#fdfaf7] text-[#6b5f59]"
                  }`}
                >
                  {filterCharity && <Check className="h-3 w-3" />}
                  {t('catalog.filter_charity')}
                </button>
              </div>
            </div>

            <div className="mt-12 space-y-3">
              <button
                onClick={() => {
                  setPriceRange([0, 10000]);
                  setSelectedMetalTypes([]);
                  setFilterOnSale(false);
                  setFilterCharity(false);
                }}
                className="w-full rounded-2xl py-4 text-sm font-bold text-[#b3917d] border border-[#b3917d] hover:bg-[#b3917d]/5 transition-colors"
              >
                {t('catalog.reset_all')}
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="w-full rounded-2xl bg-[#1a1a1a] py-4 text-sm font-bold text-white shadow-lg active:scale-95 transition-transform"
              >
                {t('catalog.show_results', { count: filteredProducts.length })}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="mt-8">
        {filteredProducts.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center rounded-[32px] bg-white py-16 text-center shadow-sm">
            <p className="text-2xl">✦</p>
            <p className="mt-3 text-base font-bold text-[#1a1a1a]">{t('catalog.no_results')}</p>
            <p className="mt-1 text-sm text-[#6b5f59]">{t('catalog.no_results_desc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showFavPrompt={showFavPrompt}
                onFavPromptChange={setShowFavPrompt}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
