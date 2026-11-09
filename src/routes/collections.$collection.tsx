import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowDown, ChevronLeft, Gift, ShieldCheck, Sparkles } from "lucide-react";
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

      <section className="group mt-8 overflow-hidden rounded-[32px] border border-[#f0ebe7] bg-white shadow-md">
        {coverImage && (
          <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,black_65%,transparent)]">
            <img
              src={resolveProductImageUrl(coverImage)}
              alt=""
              className="aspect-[4/3] md:aspect-[21/9] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          </div>
        )}
        <div className="relative -mt-12 md:-mt-16 flex flex-col items-center px-6 pb-8 md:pb-12 text-center">
          <div className="flex items-center gap-3 md:gap-4 text-[#b3917d]">
            <span className="h-px w-8 md:w-14 bg-current opacity-60" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.35em] font-bold">
              {t("collections.eyebrow")}
            </span>
            <span className="h-px w-8 md:w-14 bg-current opacity-60" />
          </div>
          <h1 className="mt-3 text-5xl md:text-7xl font-ermilov font-bold tracking-tight text-[#1a1a1a]">
            {t(`collections.names.${collection}`)}
          </h1>
          <p className="mt-2 text-lg text-[#b3917d]">✦</p>
          <a
            href="#pieces"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
          >
            {t("collections.shop_pieces")}
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </section>

      <section id="pieces" className="mt-10 scroll-mt-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">
          {t("collections.pieces_title")}
          <span className="ml-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#1a1a1a] px-2 align-middle text-sm font-bold text-white">
            {collectionProducts.length}
          </span>
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
