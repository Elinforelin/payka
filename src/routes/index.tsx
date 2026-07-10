import {createFileRoute, Link} from "@tanstack/react-router";
import {Search, SlidersHorizontal, Heart, Info, X, Check} from "lucide-react";
import {LanguageToggle} from "@/components/LanguageToggle";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {createServerFn} from "@tanstack/react-start";
import {getCategoriesWithProducts, getCategoryCoverImage, products} from "@/lib/data";
import {resolveProductImageUrl} from "@/lib/product-images.ts";
import {MiniCart} from "@/components/MiniCart";
import {ProductCard} from "@/components/ProductCard";

const getProducts = createServerFn({method: "GET"}).handler(async () => {
    return products;
});

export const Route = createFileRoute("/")({
    loader: async () => await getProducts(),
    component: CatalogPage,
});

function CatalogPage() {
    const { t } = useTranslation();
    const productsData = Route.useLoaderData();
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [selectedMetalTypes, setSelectedMetalTypes] = useState<string[]>([]);
    const [showFavPrompt, setShowFavPrompt] = useState<number | null>(null);

    const categories = getCategoriesWithProducts();

    const filteredProducts = (productsData || []).filter((product) => {
        const matchesSearch = t(product.name).toLowerCase().includes(searchQuery.toLowerCase()) || 
                             t(product.description).toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (product.style && product.style.toLowerCase().includes(searchQuery.toLowerCase())) ||
                             (product.design && product.design.toLowerCase().includes(searchQuery.toLowerCase())) ||
                             (product.productType && product.productType.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesMetalType = selectedMetalTypes.length === 0 || (product.metalType && selectedMetalTypes.includes(product.metalType));
        return matchesSearch && matchesPrice && matchesMetalType;
    });

    const metalTypes = Array.from(new Set((productsData || []).map(p => p.metalType).filter(Boolean))) as string[];

    const suggestions = searchQuery.length > 0 
        ? (productsData || [])
            .filter(p => t(p.name).toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 5)
        : [];

    return (
        <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
            {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <header className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-xl bg-[#1a1a1a] flex items-center justify-center">
                        <span className="text-white font-ermilov font-bold text-xl md:text-2xl pt-1">P</span>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-ermilov font-bold text-[#1a1a1a] tracking-tight">{t('common.app_name')}</h2>
                        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#6b5f59] font-medium -mt-1">{t('catalog.title')}</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
                    <LanguageToggle />
                    <Link
                        to="/favorites"
                        className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
                    >
                        <Heart className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]"/>
                    </Link>
                    <Link
                        to="/about"
                        className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
                    >
                        <Info className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]"/>
                    </Link>
                    <MiniCart />
                </div>
            </header>
        </div>

            {/* Search & Filter */}
            <div className="mt-8 flex sm:flex-row gap-4 relative">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a19690]"/>
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
                                        <div className="text-xs text-[#b3917d]">₴{suggestion.price}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setShowFilters(true)}
                    className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#b3917d] text-white shadow-lg shrink-0">
                    <SlidersHorizontal className="h-5 w-5 md:h-6 md:w-6"/>
                </button>
            </div>

            {/* Advanced Filters Drawer */}
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

                        {/* Price Range */}
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

                        {/* Metal Type */}
                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-[#1a1a1a]">{t('product.metal_type')}</h3>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {metalTypes.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            setSelectedMetalTypes(prev => 
                                                prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
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


                        <div className="mt-12 space-y-3">
                            <button 
                                onClick={() => {
                                    setPriceRange([0, 10000]);
                                    setSelectedMetalTypes([]);
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

            {/* Shop by Category */}
            {categories.length > 0 && (
            <section className="mt-8 md:mt-10">
                <h3 className="text-center text-sm md:text-base font-ermilov font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                    {t('catalog.shop_by_category')}
                </h3>
                <div className="mt-6 flex gap-3 md:gap-4">
                    {categories.map((category) => {
                        const coverImage = getCategoryCoverImage(category);

                        return (
                            <Link
                                key={category}
                                to="/catalog/$category"
                                params={{ category }}
                                className="group relative aspect-square min-w-0 flex-1 cursor-pointer overflow-hidden rounded-2xl bg-[#f7f3ef] shadow-sm transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md"
                            >
                                {coverImage ? (
                                    <img
                                        src={resolveProductImageUrl(coverImage)}
                                        alt={t(`common.category_names.${category}`)}
                                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-[#e8dfd8]" />
                                )}
                                <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />
                                <div className="absolute inset-0 flex items-center justify-center p-3 md:p-4">
                                    <span className="text-center text-[11px] sm:text-xs md:text-sm font-ermilov font-bold uppercase tracking-[0.12em] text-white">
                                        {t(`common.category_names.${category}`)}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
            )}

            {/* Catalog */}
            <section className="mt-10">
                <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">{t('catalog.title')}</h3>
                {filteredProducts.length === 0 ? (
                    <div className="mt-6 flex w-full flex-col items-center justify-center rounded-[32px] bg-white py-16 text-center shadow-sm">
                        <p className="text-2xl">✦</p>
                        <p className="mt-3 text-base font-bold text-[#1a1a1a]">{t('catalog.no_results')}</p>
                        <p className="mt-1 text-sm text-[#6b5f59]">{t('catalog.no_results_desc')}</p>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
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

            {/* We Recommend */}
            <section className="mt-10">
                <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">{t('common.we_recommend')}</h3>
                <div className="mt-6 space-y-4">
                    {(productsData || []).slice(0, 3).map((product) => (
                        <Link
                            to="/product/$productId"
                            params={{ productId: String(product.id) }}
                            key={product.id}
                            className="flex items-center gap-3 md:gap-4 rounded-3xl bg-white p-2 md:p-3 shadow-sm"
                        >
                            <div className="h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-2xl bg-[#f7f3ef] shrink-0">
                                <img
                                    src={resolveProductImageUrl(product.imageUrl)}
                                    alt={t(product.name)}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-base md:text-lg font-bold text-[#1a1a1a] line-clamp-1">
                                    {t(product.name)}
                                </h4>
                                <p className="text-base md:text-lg font-bold text-[#b3917d]">
                                    ₴{product.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
