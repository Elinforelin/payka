import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Truck } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { ShippingReturnsContent } from "@/components/ShippingReturnsInfo";

export const Route = createFileRoute("/shipping")({
  component: ShippingPage,
});

function ShippingPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
        </Link>
        <LanguageToggle />
      </header>

      <div className="mx-auto mt-8 max-w-2xl space-y-8 pb-12">
        <section className="text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#b3917d] shadow-sm">
            <Truck className="h-6 w-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
            {t("shipping.title")}
          </h1>
          <p className="mx-auto max-w-xl text-base text-[#6b5f59] leading-relaxed">
            {t("shipping.intro")}
          </p>
        </section>

        <ShippingReturnsContent defaultOpen />
      </div>
    </main>
  );
}
