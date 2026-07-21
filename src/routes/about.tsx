import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, History, Target, Eye, Users, ChevronLeft, Instagram, Mail, Phone } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { CONTACT_INFO } from "@/lib/contact";

import img from "@/assets/me.png";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
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
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#b3917d] font-bold">
            {t('about.our_story')}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
            {t('about.hero_title')}
          </h1>
          <p className="mx-auto max-w-xl text-base md:text-lg text-[#6b5f59]">
            {t('about.hero_desc')}
          </p>
        </section>

        {/* Company History */}
        <section className="rounded-[40px] bg-white p-8 md:p-12 shadow-sm border border-[#f0ebe7]">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]">
              <History className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">{t('about.history_founding')}</h2>
          </div>
          <div className="prose prose-stone text-[#6b5f59]">
            <p>
              {t('about.history_p1')}
            </p>
            <p className="mt-4">
              {t('about.history_p2')}
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="rounded-[40px] bg-[#1a1a1a] p-8 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#b3917d]">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">{t('about.mission')}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t('about.mission_desc')}
            </p>
          </section>

          <section className="rounded-[40px] bg-[#b3917d] p-8 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold">{t('about.vision')}</h2>
            </div>
            <p className="text-white/90 leading-relaxed">
              {t('about.vision_desc')}
            </p>
          </section>
        </div>

        {/* Key Team Members */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#b3917d] shadow-sm">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">{t('about.our_team')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col sm:flex-row gap-6 rounded-[32px] bg-white p-6 shadow-sm border border-[#f0ebe7]">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#f7f3ef] mx-auto sm:mx-0">
                <img
                  src={img}
                  alt={t('about.alina_role')}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-[#1a1a1a]">Alina</h3>
                <p className="text-sm font-medium text-[#b3917d]">{t('about.alina_role')}</p>
                <p className="mt-2 text-sm text-[#6b5f59]">
                  {t('about.alina_desc')}
                </p>
              </div>
            </div>
            <div className="flex gap-6 rounded-[32px] bg-white p-6 shadow-sm border border-[#f0ebe7] items-center justify-center text-center">
              <p className="text-sm text-[#a19690] italic">{t('about.team_coming_soon')}</p>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="rounded-[40px] bg-white p-8 md:p-12 shadow-sm border border-[#f0ebe7]">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]">
              <Award className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">{t('about.milestones')}</h2>
          </div>
          <div className="space-y-6">
            {[
              { year: "2023", event: t('about.m2023') },
              { year: "2024", event: t('about.m2024') },
              { year: "2025", event: t('about.m2025') },
            ].map((m) => (
              <div key={m.year} className="flex gap-6">
                <span className="text-lg font-bold text-[#b3917d] w-16">{m.year}</span>
                <p className="text-[#6b5f59]">{m.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us */}
        <section className="rounded-[40px] bg-white p-8 md:p-12 shadow-sm border border-[#f0ebe7]">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">{t('about.contact_us')}</h2>
          </div>
          <p className="text-[#6b5f59] mb-8 max-w-xl">
            {t('about.contact_desc')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={CONTACT_INFO.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-[24px] bg-[#f7f3ef] p-6 text-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#b3917d] shadow-sm">
                <Instagram className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#a19690] font-bold">{t('about.instagram')}</p>
                <p className="mt-1 text-sm font-semibold text-[#1a1a1a]">@{CONTACT_INFO.instagram.handle}</p>
              </div>
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex flex-col items-center gap-3 rounded-[24px] bg-[#f7f3ef] p-6 text-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#b3917d] shadow-sm">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#a19690] font-bold">{t('about.email')}</p>
                <p className="mt-1 text-sm font-semibold text-[#1a1a1a] break-all">{CONTACT_INFO.email}</p>
              </div>
            </a>
            <a
              href={CONTACT_INFO.phoneHref}
              className="flex flex-col items-center gap-3 rounded-[24px] bg-[#f7f3ef] p-6 text-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#b3917d] shadow-sm">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#a19690] font-bold">{t('about.phone')}</p>
                <p className="mt-1 text-sm font-semibold text-[#1a1a1a]">{CONTACT_INFO.phone}</p>
              </div>
            </a>
          </div>
        </section>

        {/* Footer Link */}
        <div className="rounded-[40px] bg-[#efe6df] p-8 md:p-10 text-center space-y-4">
          <p className="text-base md:text-lg text-[#6b5f59] max-w-md mx-auto">
            {t('about.footer_desc')}
          </p>
          <Link
            to="/"
            className="inline-block rounded-full bg-[#1a1a1a] px-8 py-4 text-base md:text-lg font-bold text-white shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            {t('about.explore_collection')}
          </Link>
        </div>
      </div>
    </main>
  );
}
