import { X, Gift } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveProductImageUrl } from "@/lib/product-images.ts";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";

interface PackagingGuideProps {
  onClose: () => void;
}

const PACKAGING_PHOTOS = [
  { src: "/assets/packaging/box-closed.png", altKey: "packaging_alt_closed" },
  { src: "/assets/packaging/box-open.png", altKey: "packaging_alt_open" },
  { src: "/assets/packaging/includes.png", altKey: "packaging_alt_includes" },
] as const;

export function PackagingGuide({ onClose }: PackagingGuideProps) {
  const { t } = useTranslation();
  useBodyScrollLock(true);

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-t-[32px] sm:rounded-[32px] p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#1a1a1a]">
            <Gift className="h-5 w-5 text-[#b3917d]" />
            {t("product.packaging_title")}
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fdfaf7] hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-[#1a1a1a]" />
          </button>
        </div>

        <p className="text-sm text-[#6b5f59] leading-relaxed">
          {t("product.packaging_desc")}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {PACKAGING_PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#f7f3ef]"
            >
              <img
                src={resolveProductImageUrl(photo.src)}
                alt={t(`product.${photo.altKey}`)}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#b3917d]">
            {t("product.packaging_includes_title")}
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-[#6b5f59]">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b3917d]" />
              {t("product.packaging_item_box")}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b3917d]" />
              {t("product.packaging_item_pouch")}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b3917d]" />
              {t("product.packaging_item_card")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
