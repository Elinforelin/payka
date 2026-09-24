import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Heart, HandHeart, Info, Truck, ShieldCheck, Instagram, Mail, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useFavorites } from "@/lib/favorites-context";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";
import { CONTACT_INFO } from "@/lib/contact";

interface MobileNavProps {
  className?: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ className = "" }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useFavorites();

  useBodyScrollLock(isOpen);

  const navLinks = [
    {
      to: "/favorites",
      label: t("common.favorites"),
      icon: Heart,
      badge: favorites.length > 0 ? String(favorites.length) : undefined,
    },
    {
      to: "/charity",
      label: t("common.charity_page"),
      icon: HandHeart,
    },
    {
      to: "/about",
      label: t("common.about_us"),
      icon: Info,
    },
    {
      to: "/privacy",
      label: t("common.privacy_policy"),
      icon: ShieldCheck,
    },
  ];

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t("common.menu", "Menu")}
        className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm hover:bg-gray-50 transition-colors"
      >
        <Menu className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[70] flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer sidebar panel */}
          <div className="relative ml-auto flex h-full w-full max-w-xs sm:max-w-sm flex-col justify-between bg-[#fdfaf7] p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#f0ebe7]">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 overflow-hidden rounded-xl bg-[#1a1a1a] flex items-center justify-center">
                    <span className="text-white font-ermilov font-bold text-lg pt-0.5">P</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-ermilov font-bold text-[#1a1a1a] tracking-tight">
                      {t("common.app_name")}
                    </h3>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-[#6b5f59] font-medium -mt-1">
                      {t("catalog.title")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <LanguageToggle />
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label={t("common.close", "Close")}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6b5f59] shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm hover:bg-[#f7f3ef] transition-colors group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#1a1a1a] group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-[#1a1a1a] text-base">{link.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {link.badge && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#b3917d] text-[11px] font-bold text-white shadow-sm">
                            {link.badge}
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-[#a19690] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer / Contact info */}
            <div className="pt-6 border-t border-[#f0ebe7] space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#a19690] uppercase tracking-wider px-1">
                <span>{t("common.contact_us", "Contact Us")}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={CONTACT_INFO.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white p-3 text-xs font-medium text-[#1a1a1a] shadow-sm hover:bg-[#f7f3ef] transition-colors"
                >
                  <Instagram className="h-4 w-4 text-[#b3917d]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white p-3 text-xs font-medium text-[#1a1a1a] shadow-sm hover:bg-[#f7f3ef] transition-colors"
                >
                  <Mail className="h-4 w-4 text-[#b3917d]" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
