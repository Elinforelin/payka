import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Category, Collection, getCollectionCoverImage, getCollectionProducts } from "@/lib/data";
import { resolveProductImageUrl } from "@/lib/product-images.ts";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MiniCart } from "@/components/MiniCart";
import { MobileNav } from "@/components/MobileNav";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/collections/$collection")({
  loader: async ({ params }) => {
    const collection = params.collection as Collection;
    if (!Object.values(Collection).includes(collection)) {
      throw notFound();
    }

    const collectionProducts = getCollectionProducts(collection);
    if (collectionProducts.length === 0) {
      throw notFound();
    }

    return {
      collection,
      products: collectionProducts,
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { t } = useTranslation();
  const { collection, products: collectionProducts } = Route.useLoaderData();
  const [showFavPrompt, setShowFavPrompt] = useState<number | null>(null);

  const coverImage = getCollectionCoverImage(collection);
  const categories = Array.from(new Set(collectionProducts.map((product) => product.category)));

  const highlights = [
    { icon: Sparkles, title: t("collections.handmade_title"), text: t("collections.handmade_text") },
    { icon: Gift, title: t("collections.gift_title"), text: t("collections.gift_text") },
    { icon: ShieldCheck, title: t("collections.guarantee_title"), text: t("collections.guarantee_text") },
  ];

  return (
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm hover:bg-gray-50 transition-colors"
          aria-label={t("common.back")}
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
        </Link>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <MiniCart />
          <MobileNav className="md:hidden" />
        </div>
      </header>

      <section className="relative mt-8 overflow-hidden rounded-[32px] bg-[#1a1a1a] shadow-sm">
        {coverImage && (
          <img
            src={resolveProductImageUrl(coverImage)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative flex min-h-[320px] md:min-h-[420px] flex-col items-center justify-end p-8 md:p-12 text-center text-white">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-white/80">
            {t("collections.eyebrow")}
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-ermilov font-bold tracking-tight">
            {t(`collections.names.${collection}`)}
          </h1>
          <a
            href="#pieces"
            className="mt-6 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[#1a1a1a] shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
          >
            {t("collections.shop_pieces")}
          </a>
        </div>
      </section>

      <section id="pieces" className="mt-10 scroll-mt-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">
          {t("collections.pieces_title")}
          <span className="ml-2 text-base font-medium text-[#a19690]">{collectionProducts.length}</span>
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {collectionProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showFavPrompt={showFavPrompt}
              onFavPromptChange={setShowFavPrompt}
            />
          ))}
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {highlights.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-[32px] bg-white p-6 shadow-sm border border-[#f0ebe7]">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#1a1a1a]">{title}</h3>
            </div>
            <p className="text-sm text-[#6b5f59] leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 pb-4">
        {categories.map((category: Category) => (
          <Link
            key={category}
            to="/catalog/$category"
            params={{ category }}
            className="text-sm font-bold text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors"
          >
            {t("collections.see_all_in", { category: t(`common.category_names.${category}`) })}
          </Link>
        ))}
        <Link
          to="/guarantee"
          className="text-sm font-bold text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68] transition-colors"
        >
          {t("collections.guarantee_link")}
        </Link>
      </div>
    </main>
  );
}
