import { jsx, jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { c as createLucideIcon } from "./router-W9GWQRv5.mjs";
const __iconNode = [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
];
const Languages = createLucideIcon("languages", __iconNode);
function LanguageToggle() {
  const { i18n } = useTranslation();
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => i18n.changeLanguage(i18n.language === "en" ? "uk" : "en"),
      className: "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-colors hover:bg-gray-50 active:scale-95",
      title: i18n.language === "en" ? "Змінити на Українську" : "Switch to English",
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx(Languages, { className: "h-4 w-4 md:h-5 md:w-5 text-[#1a1a1a]" }),
        /* @__PURE__ */ jsx("span", { className: "text-[7px] md:text-[8px] font-bold uppercase", children: i18n.language })
      ] })
    }
  );
}
const img = "/assets/7812354786123547-I0C1U1xA.png";
export {
  LanguageToggle as L,
  img as i
};
