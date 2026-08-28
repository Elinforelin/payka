import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { L as LanguageToggle } from "./LanguageToggle-_RTdtCBY.mjs";
import { useTranslation } from "react-i18next";
import { S as ShippingReturnsContent } from "./ShippingReturnsInfo-C7hE1Ybn.mjs";
import { C as ChevronLeft } from "./chevron-left.mjs";
import { T as Truck } from "./truck.mjs";
import "react";
import "./contact-DWQvISeu.mjs";
import "./router-CYm7miYu.mjs";
import "i18next";
import "i18next-browser-languagedetector";
import "./uk-CdVMwhvi.mjs";
import "./server.mjs";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "../../index.mjs";
import "node:http";
import "node:stream";
import "node:https";
import "node:http2";
import "node:fs";
import "node:url";
import "node:path";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "./data-C0dK635X.mjs";
import "./x.mjs";
function ShippingPage() {
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" }) }),
      /* @__PURE__ */ jsx(LanguageToggle, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-8 max-w-2xl space-y-8 pb-12", children: [
      /* @__PURE__ */ jsxs("section", { className: "text-center space-y-3", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#b3917d] shadow-sm", children: /* @__PURE__ */ jsx(Truck, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-[#1a1a1a]", children: t("shipping.title") }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-xl text-base text-[#6b5f59] leading-relaxed", children: t("shipping.intro") })
      ] }),
      /* @__PURE__ */ jsx(ShippingReturnsContent, { defaultOpen: true })
    ] })
  ] });
}
export {
  ShippingPage as component
};
