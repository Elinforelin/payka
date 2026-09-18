import {createFileRoute, Link, useCanGoBack, useRouter} from "@tanstack/react-router";
import { ChevronLeft, HeartHandshake, Sparkles, HandHeart, ShieldCheck, Instagram, Mail, ArrowRight, Shield, PawPrint } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { CONTACT_INFO } from "@/lib/contact";

export const Route = createFileRoute("/charity")({
  component: CharityPage,
});

function CharityPage() {
  const { t } = useTranslation();
  const canGoBack = useCanGoBack();
  const router = useRouter();
  const product = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12">
      {/* Header */}
      <header className="flex items-center justify-between">
        <button
            type="button"
            onClick={() => {
              if (canGoBack) {
                router.history.back();
              } else {
                void router.navigate({
                  to: "/catalog/$category",
                  params: { category: product.category },
                });
              }
            }}
            className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm hover:bg-gray-50 transition-colors"
            aria-label={t("common.back")}
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
        </button>
        <LanguageToggle />
      </header>

      <div className="mx-auto mt-8 max-w-3xl space-y-12 pb-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#5a7a5c]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#3d5a40]">
            <HeartHandshake className="h-4 w-4" />
            <span>{t("charity.badge")}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight">
            {t("charity.title")}
          </h1>
          <p className="mx-auto max-w-xl text-base md:text-lg text-[#6b5f59] leading-relaxed">
            {t("charity.subtitle")}
          </p>
        </section>

        {/* Mission Statement Card */}
        <section className="rounded-[40px] bg-white p-8 md:p-12 shadow-sm border border-[#f0ebe7] space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5a7a5c]/15 text-[#3d5a40]">
              <HandHeart className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">{t("charity.mission_title")}</h2>
          </div>
          <p className="text-[#6b5f59] text-base md:text-lg leading-relaxed">
            {t("charity.mission_desc")}
          </p>
        </section>

        {/* How it works */}
        <section className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">
              {t("charity.how_it_works_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[32px] bg-white p-6 shadow-sm border border-[#f0ebe7] space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1a1a1a]">{t("charity.step_1_title")}</h3>
              <p className="text-sm text-[#6b5f59] leading-relaxed">{t("charity.step_1_desc")}</p>
            </div>

            <div className="rounded-[32px] bg-white p-6 shadow-sm border border-[#f0ebe7] space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5a7a5c]/15 text-[#3d5a40]">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1a1a1a]">{t("charity.step_2_title")}</h3>
              <p className="text-sm text-[#6b5f59] leading-relaxed">{t("charity.step_2_desc")}</p>
            </div>

            <div className="rounded-[32px] bg-white p-6 shadow-sm border border-[#f0ebe7] space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1a1a] text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1a1a1a]">{t("charity.step_3_title")}</h3>
              <p className="text-sm text-[#6b5f59] leading-relaxed">{t("charity.step_3_desc")}</p>
            </div>
          </div>
        </section>

        {/* Supported Causes / Initiatives */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">
              {t("charity.initiatives_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-[32px] bg-[#1a1a1a] p-6 text-white shadow-xl space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#b3917d]">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">{t("charity.cause_military_title")}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t("charity.cause_military_desc")}
              </p>
            </div>

            <div className="rounded-[32px] bg-[#3d5a40] p-6 text-white shadow-xl space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                <PawPrint className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">{t("charity.cause_animals_title")}</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                {t("charity.cause_animals_desc")}
              </p>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="rounded-[40px] bg-gradient-to-br from-[#5a7a5c]/10 to-[#5a7a5c]/5 p-8 md:p-12 border border-[#5a7a5c]/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">
                {t("charity.transparency_title")}
              </h3>
              <p className="text-[#6b5f59] max-w-xl text-sm md:text-base leading-relaxed">
                {t("charity.transparency_desc")}
              </p>
            </div>
            <Link
              to="/"
              search={{ charity: true }}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#1a1a1a] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-black transition-colors shrink-0"
            >
              <span>{t("charity.browse_charity_items")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Contact info / Questions */}
        <section className="rounded-[40px] bg-white p-8 md:p-10 shadow-sm border border-[#f0ebe7] text-center space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a]">
            {t("charity.questions_title")}
          </h3>
          <p className="text-sm text-[#6b5f59] max-w-md mx-auto">
            {t("charity.questions_desc")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={CONTACT_INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-[#f7f3ef] px-4 py-2.5 text-sm font-medium text-[#1a1a1a] hover:bg-[#eee8e2] transition-colors"
            >
              <Instagram className="h-4 w-4 text-[#b3917d]" />
              <span>@{CONTACT_INFO.instagram.handle}</span>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-2 rounded-2xl bg-[#f7f3ef] px-4 py-2.5 text-sm font-medium text-[#1a1a1a] hover:bg-[#eee8e2] transition-colors"
            >
              <Mail className="h-4 w-4 text-[#b3917d]" />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
