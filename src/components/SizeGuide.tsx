import { X, Ruler, Gem } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";

interface SizeGuideProps {
  onClose: () => void;
}

const RING_SIZES = [
  { mm: "15.0", eu: "47" },
  { mm: "15.5", eu: "49" },
  { mm: "16.0", eu: "50" },
  { mm: "16.5", eu: "52" },
  { mm: "17.0", eu: "53" },
  { mm: "17.5", eu: "55" },
  { mm: "18.0", eu: "56" },
  { mm: "18.5", eu: "58" },
  { mm: "19.0", eu: "59" },
  { mm: "19.5", eu: "61" },
  { mm: "20.0", eu: "63" },
  { mm: "20.5", eu: "64" },
  { mm: "21.0", eu: "66" },
  { mm: "21.5", eu: "67" },
  { mm: "22.0", eu: "69" },
];

export const NECKLACE_LENGTHS = [
  { cm: "38–40 cm", nameKey: "size_guide_necklace_choker", descKey: "size_guide_necklace_choker_desc" },
  { cm: "43–45 cm", nameKey: "size_guide_necklace_princess", descKey: "size_guide_necklace_princess_desc" },
  { cm: "50–55 cm", nameKey: "size_guide_necklace_matinee", descKey: "size_guide_necklace_matinee_desc" },
  { cm: "70–80 cm", nameKey: "size_guide_necklace_opera", descKey: "size_guide_necklace_opera_desc" },
];

export function SizeGuide({ onClose }: SizeGuideProps) {
  const { t } = useTranslation();
  useBodyScrollLock(true);

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-t-[32px] sm:rounded-[32px] p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#1a1a1a]">{t('product.size_guide')}</h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fdfaf7] hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-[#1a1a1a]" />
          </button>
        </div>

        {/* Ring Size Chart */}
        <section>
          <h3 className="flex items-center gap-2 text-base font-bold text-[#1a1a1a] mb-3">
            <Ruler className="h-4 w-4 text-[#b3917d]" />
            {t('product.size_guide_ring_title')}
          </h3>
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#fdfaf7]">
                  <th className="px-4 py-3 text-left font-bold text-[#6b5f59]">{t('product.size_guide_ring_col_mm')}</th>
                  <th className="px-4 py-3 text-left font-bold text-[#6b5f59]">{t('product.size_guide_ring_col_eu')}</th>
                </tr>
              </thead>
              <tbody>
                {RING_SIZES.map((row, i) => (
                  <tr key={row.mm} className={i % 2 === 0 ? "bg-white" : "bg-[#fdfaf7]/50"}>
                    <td className="px-4 py-2.5 font-medium text-[#1a1a1a]">{row.mm}</td>
                    <td className="px-4 py-2.5 text-[#6b5f59]">{row.eu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Necklace Length Guide */}
        <section className="mt-8">
          <h3 className="flex items-center gap-2 text-base font-bold text-[#1a1a1a] mb-3">
            <Gem className="h-4 w-4 text-[#b3917d]" />
            {t('product.size_guide_necklace_title')}
          </h3>
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#fdfaf7]">
                  <th className="px-4 py-3 text-left font-bold text-[#6b5f59]">{t('product.size_guide_necklace_col_cm')}</th>
                  <th className="px-4 py-3 text-left font-bold text-[#6b5f59]">{t('product.size_guide_necklace_col_name')}</th>
                  <th className="px-4 py-3 text-left font-bold text-[#6b5f59]">{t('product.size_guide_necklace_col_desc')}</th>
                </tr>
              </thead>
              <tbody>
                {NECKLACE_LENGTHS.map((row, i) => (
                  <tr key={row.nameKey} className={i % 2 === 0 ? "bg-white" : "bg-[#fdfaf7]/50"}>
                    <td className="px-4 py-2.5 font-medium text-[#1a1a1a]">{row.cm}</td>
                    <td className="px-4 py-2.5 text-[#b3917d] font-medium">{t(`product.${row.nameKey}`)}</td>
                    <td className="px-4 py-2.5 text-[#6b5f59]">{t(`product.${row.descKey}`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Measurement Tips */}
        <section className="mt-8 space-y-5">
          <h3 className="text-base font-bold text-[#1a1a1a]">{t('product.size_guide_tips_title')}</h3>

          <div className="rounded-2xl bg-[#fdfaf7] p-4 space-y-2">
            <p className="text-sm font-bold text-[#b3917d]">{t('product.size_guide_tips_ring_title')}</p>
            <ol className="list-decimal list-inside space-y-1.5 text-sm text-[#6b5f59]">
              <li>{t('product.size_guide_tips_ring_1')}</li>
              <li>{t('product.size_guide_tips_ring_2')}</li>
              <li>{t('product.size_guide_tips_ring_3')}</li>
            </ol>
            <p className="text-xs text-[#a19690] italic pt-1">💡 {t('product.size_guide_tips_ring_note')}</p>
          </div>

          <div className="rounded-2xl bg-[#fdfaf7] p-4 space-y-2">
            <p className="text-sm font-bold text-[#b3917d]">{t('product.size_guide_tips_necklace_title')}</p>
            <ol className="list-decimal list-inside space-y-1.5 text-sm text-[#6b5f59]">
              <li>{t('product.size_guide_tips_necklace_1')}</li>
              <li>{t('product.size_guide_tips_necklace_2')}</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
