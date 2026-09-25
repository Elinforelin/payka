import type { ReactNode } from "react";
import { Sparkles, Droplets, Package, ShieldAlert, Gem, Mail, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CONTACT_INFO } from "@/lib/contact";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#f0ebe7] bg-white p-5 md:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]">
          {icon}
        </span>
        <h3 className="text-base font-bold text-[#1a1a1a]">{title}</h3>
      </div>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#6b5f59]">
        {children}
      </div>
    </div>
  );
}

export function JewelryCareContent() {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <Section icon={<Sparkles className="h-4 w-4" />} title={t("care.wear_title")}>
        <p>{t("care.wear_text")}</p>
      </Section>

      <Section icon={<Droplets className="h-4 w-4" />} title={t("care.clean_title")}>
        <p>{t("care.clean_text")}</p>
      </Section>

      <Section icon={<Package className="h-4 w-4" />} title={t("care.storage_title")}>
        <p>{t("care.storage_text")}</p>
      </Section>

      <Section icon={<ShieldAlert className="h-4 w-4" />} title={t("care.avoid_title")}>
        <p>{t("care.avoid_text")}</p>
      </Section>

      <Section icon={<Sparkles className="h-4 w-4" />} title={t("care.rhodium_title")}>
        <p>{t("care.rhodium_text")}</p>
      </Section>

      <Section icon={<Gem className="h-4 w-4" />} title={t("care.gemstone_title")}>
        <p>{t("care.gemstone_text")}</p>
      </Section>

      <div className="rounded-[24px] bg-[#efe6df] p-6 text-center space-y-3">
        <h3 className="text-base font-bold text-[#1a1a1a]">{t("care.contact_title")}</h3>
        <p className="mx-auto max-w-md text-sm text-[#6b5f59]">{t("care.contact_desc")}</p>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          <Mail className="h-4 w-4" />
          {CONTACT_INFO.email}
        </a>
      </div>
    </div>
  );
}

interface JewelryCareGuideProps {
  onClose: () => void;
}

export function JewelryCareGuide({ onClose }: JewelryCareGuideProps) {
  const { t } = useTranslation();
  useBodyScrollLock(true);

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-t-[32px] sm:rounded-[32px] p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-[#1a1a1a]">{t("care.title")}</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fdfaf7] hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-[#1a1a1a]" />
          </button>
        </div>
        <p className="mb-6 text-sm text-[#6b5f59] leading-relaxed">
          {t("care.intro")}
        </p>
        <JewelryCareContent />
      </div>
    </div>
  );
}
