import { useState, type ReactNode } from "react";
import { ChevronDown, Truck, Ruler, RotateCcw, MessageCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { CONTACT_INFO } from "@/lib/contact";

function PolicyBlock({
  icon,
  title,
  children,
  defaultOpen = false,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#f0ebe7] bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left md:px-5"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]">
            {icon}
          </span>
          <span className="text-base font-bold text-[#1a1a1a]">{title}</span>
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#a19690] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-3 border-t border-[#f0ebe7] px-4 py-4 text-sm leading-relaxed text-[#6b5f59] md:px-5">
          {children}
        </div>
      )}
    </div>
  );
}

export function ShippingReturnsContent({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <PolicyBlock
        icon={<Truck className="h-4 w-4" />}
        title={t("shipping.shipping_title")}
        defaultOpen={defaultOpen}
      >
        <p>{t("shipping.shipping_intro")}</p>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
            <span>{t("shipping.shipping_method")}</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
            <span>{t("shipping.shipping_time")}</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
            <span>{t("shipping.shipping_cost")}</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
            <span>{t("shipping.shipping_process")}</span>
          </li>
        </ul>
      </PolicyBlock>

      <PolicyBlock
        icon={<Ruler className="h-4 w-4" />}
        title={t("shipping.exchange_title")}
        defaultOpen={defaultOpen}
      >
        <p>{t("shipping.exchange_intro")}</p>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
            <span>{t("shipping.exchange_eligibility")}</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
            <span>{t("shipping.exchange_window")}</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
            <span>{t("shipping.exchange_process")}</span>
          </li>
        </ul>
      </PolicyBlock>

      <PolicyBlock
        icon={<RotateCcw className="h-4 w-4" />}
        title={t("shipping.returns_title")}
        defaultOpen={defaultOpen}
      >
        <p>{t("shipping.returns_intro")}</p>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
            <span>{t("shipping.returns_eligibility")}</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
            <span>{t("shipping.returns_not_eligible")}</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" />
            <span>{t("shipping.returns_process")}</span>
          </li>
        </ul>
      </PolicyBlock>

      <div className="rounded-2xl bg-[#f7f3ef] p-4 md:p-5">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="h-4 w-4 text-[#b3917d]" />
          <h3 className="text-sm font-bold text-[#1a1a1a]">{t("shipping.contact_title")}</h3>
        </div>
        <p className="text-sm text-[#6b5f59] leading-relaxed">
          {t("shipping.contact_desc")}
        </p>
        <a
          href={CONTACT_INFO.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex text-sm font-bold text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68]"
        >
          @{CONTACT_INFO.instagram.handle}
        </a>
      </div>
    </div>
  );
}

interface ShippingReturnsGuideProps {
  onClose: () => void;
}

export function ShippingReturnsGuide({ onClose }: ShippingReturnsGuideProps) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-t-[32px] sm:rounded-[32px] p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-[#1a1a1a]">{t("shipping.title")}</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fdfaf7] hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-[#1a1a1a]" />
          </button>
        </div>
        <p className="mb-6 text-sm text-[#6b5f59] leading-relaxed">
          {t("shipping.intro")}
        </p>
        <ShippingReturnsContent />
      </div>
    </div>
  );
}
