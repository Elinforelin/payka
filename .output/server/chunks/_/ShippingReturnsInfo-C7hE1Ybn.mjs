import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { C as CONTACT_INFO } from "./contact-DWQvISeu.mjs";
import { T as Truck, M as MessageCircle } from "./truck.mjs";
import { c as createLucideIcon } from "./router-CYm7miYu.mjs";
import { X } from "./x.mjs";
const __iconNode$2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
      key: "icamh8"
    }
  ],
  ["path", { d: "m14.5 12.5 2-2", key: "inckbg" }],
  ["path", { d: "m11.5 9.5 2-2", key: "fmmyf7" }],
  ["path", { d: "m8.5 6.5 2-2", key: "vc6u1g" }],
  ["path", { d: "m17.5 15.5 2-2", key: "wo5hmg" }]
];
const Ruler = createLucideIcon("ruler", __iconNode);
function PolicyBlock({
  icon,
  title,
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = useState(defaultOpen);
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-2xl border border-[#f0ebe7] bg-white", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "flex w-full items-center justify-between gap-3 px-4 py-4 text-left md:px-5",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]", children: icon }),
            /* @__PURE__ */ jsx("span", { className: "text-base font-bold text-[#1a1a1a]", children: title })
          ] }),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              className: `h-5 w-5 shrink-0 text-[#a19690] transition-transform ${open ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsx("div", { className: "space-y-3 border-t border-[#f0ebe7] px-4 py-4 text-sm leading-relaxed text-[#6b5f59] md:px-5", children })
  ] });
}
function ShippingReturnsContent({ defaultOpen = false }) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs(
      PolicyBlock,
      {
        icon: /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4" }),
        title: t("shipping.shipping_title"),
        defaultOpen,
        children: [
          /* @__PURE__ */ jsx("p", { children: t("shipping.shipping_intro") }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { children: t("shipping.shipping_method") })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { children: t("shipping.shipping_time") })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { children: t("shipping.shipping_cost") })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { children: t("shipping.shipping_process") })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      PolicyBlock,
      {
        icon: /* @__PURE__ */ jsx(Ruler, { className: "h-4 w-4" }),
        title: t("shipping.exchange_title"),
        defaultOpen,
        children: [
          /* @__PURE__ */ jsx("p", { children: t("shipping.exchange_intro") }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { children: t("shipping.exchange_eligibility") })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { children: t("shipping.exchange_window") })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { children: t("shipping.exchange_process") })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      PolicyBlock,
      {
        icon: /* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4" }),
        title: t("shipping.returns_title"),
        defaultOpen,
        children: [
          /* @__PURE__ */ jsx("p", { children: t("shipping.returns_intro") }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { children: t("shipping.returns_eligibility") })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { children: t("shipping.returns_not_eligible") })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b3917d]" }),
              /* @__PURE__ */ jsx("span", { children: t("shipping.returns_process") })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-[#f7f3ef] p-4 md:p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4 text-[#b3917d]" }),
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-[#1a1a1a]", children: t("shipping.contact_title") })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#6b5f59] leading-relaxed", children: t("shipping.contact_desc") }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: CONTACT_INFO.instagram.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "mt-3 inline-flex text-sm font-bold text-[#b3917d] underline underline-offset-4 hover:text-[#9a7a68]",
          children: [
            "@",
            CONTACT_INFO.instagram.handle
          ]
        }
      )
    ] })
  ] });
}
function ShippingReturnsGuide({ onClose }) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[70] flex items-end sm:items-center justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-t-[32px] sm:rounded-[32px] p-6 md:p-8 shadow-2xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-[#1a1a1a]", children: t("shipping.title") }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#fdfaf7] hover:bg-gray-100 transition-colors",
            children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 text-[#1a1a1a]" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mb-6 text-sm text-[#6b5f59] leading-relaxed", children: t("shipping.intro") }),
      /* @__PURE__ */ jsx(ShippingReturnsContent, {})
    ] })
  ] });
}
export {
  ChevronDown as C,
  Ruler as R,
  ShippingReturnsContent as S,
  ShippingReturnsGuide as a
};
