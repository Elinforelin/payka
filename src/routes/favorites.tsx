import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Heart, ShoppingBag, Trash2, Tag, Plus, X } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFavorites } from "@/lib/favorites-context";
import { useCart } from "@/lib/cart-context";
import { resolveProductImageUrl } from "@/lib/product-images";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
});

function FavoritesPage() {
  const { t } = useTranslation();
  const { favorites, removeFromFavorites, categories, addCategory, removeCategory } = useFavorites();
  const BUILT_IN_CATEGORIES = ['General', 'Wishlist', 'Gift Ideas'];
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const filteredFavorites = activeCategory === "All" 
    ? favorites 
    : favorites.filter(item => item.categoryName === activeCategory);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
      <header className="flex items-center justify-between mb-8">
        <Link
          to="/catalog"
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <ChevronLeft className="h-6 w-6 text-[#1a1a1a]" />
        </Link>
        <h1 className="text-xl font-bold text-[#1a1a1a]">{t('favorites.title')}</h1>
        <LanguageToggle />
      </header>

      {/* Category Tabs */}
      <div className="mb-8 flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setActiveCategory("All")}
          className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
            activeCategory === "All"
              ? "bg-[#b3917d] text-white shadow-md"
              : "bg-white text-[#6b5f59] hover:bg-[#f7f3ef]"
          }`}
        >
          {t('favorites.all_items')} ({favorites.length})
        </button>
        {categories.map((cat) => (
          <div key={cat} className="flex flex-shrink-0 items-center gap-1 relative">
            <button
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#b3917d] text-white shadow-md"
                  : "bg-white text-[#6b5f59] hover:bg-[#f7f3ef]"
              }`}
            >
              {cat === 'General' ? t('favorites.general') : cat === 'Wishlist' ? t('favorites.wishlist') : cat === 'Gift Ideas' ? t('favorites.gift_ideas') : cat} ({favorites.filter(f => f.categoryName === cat).length})
            </button>
            {!BUILT_IN_CATEGORIES.includes(cat) && (
              <button
                onClick={() => {
                  if (activeCategory === cat) setActiveCategory("All");
                  removeCategory(cat);
                }}
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#a19690] hover:bg-red-50 hover:text-red-500 transition-colors absolute right-[-4px]"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        <button 
          onClick={() => setIsAddingCategory(true)}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#b3917d] shadow-sm hover:bg-[#b3917d] hover:text-white transition-all"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {isAddingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <form 
            onSubmit={handleAddCategory}
            className="w-full max-w-sm rounded-[32px] bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <h3 className="mb-4 text-xl font-bold text-[#1a1a1a]">{t('favorites.new_category')}</h3>
            <input
              autoFocus
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder={t('favorites.category_name_placeholder')}
              className="mb-6 h-12 w-full rounded-2xl bg-[#fdfaf7] px-4 outline-none ring-1 ring-[#e5e7eb] focus:ring-2 focus:ring-[#b3917d]"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsAddingCategory(false)}
                className="flex-1 rounded-2xl bg-[#fdfaf7] py-3 font-bold text-[#6b5f59]"
              >
                {t('favorites.cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 rounded-2xl bg-[#1a1a1a] py-3 font-bold text-white shadow-lg"
              >
                {t('favorites.create')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mx-auto max-w-4xl">
        {filteredFavorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[48px] bg-white p-16 text-center shadow-sm">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#fdfaf7]">
              <Heart className="h-12 w-12 text-[#b3917d] opacity-20" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">{t('favorites.no_favorites')}</h2>
            <p className="mt-2 text-[#6b5f59]">
              {t('favorites.no_favorites_desc')}
            </p>
            <Link 
              to="/catalog" 
              className="mt-8 rounded-2xl bg-[#1a1a1a] px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
              {t('about.explore_collection')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filteredFavorites.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-[40px] bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                <Link
                  to="/product/$productId"
                  params={{ productId: String(product.id) }}
                  className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-[#f7f3ef]"
                >
                  <img
                    src={resolveProductImageUrl(product.imageUrl)}
                    alt={t(product.name)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#b3917d] backdrop-blur-md">
                    {product.categoryName || t('favorites.general')}
                  </div>
                </Link>

                <div className="mt-4 flex flex-1 flex-col justify-between px-2 pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#1a1a1a] group-hover:text-[#b3917d] transition-colors">
                        {t(product.name)}
                      </h3>
                      <p className="mt-1 text-xl font-black text-[#b3917d]">${product.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromFavorites(product.id)}
                      className="rounded-full p-2 text-[#a19690] hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#1a1a1a] py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-black active:scale-95"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      {t('common.add_to_cart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
