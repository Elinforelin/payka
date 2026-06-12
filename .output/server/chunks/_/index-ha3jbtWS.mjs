import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { i as img1, a as img2 } from "./619792737_18417153727189140_5984683189343682714_n-2Ta9zfVb.mjs";
import { c as createLucideIcon } from "./router-B0Krk2Su.mjs";
import "react";
import "react-i18next";
import "i18next";
import "i18next-browser-languagedetector";
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
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
function LandingPage() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("main", { className: "flex min-h-screen flex-col items-center justify-center bg-[#fdfaf7] px-6 py-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative mb-12 h-[400px] w-full max-w-lg", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-[60%] overflow-hidden rounded-lg shadow-2xl", children: /* @__PURE__ */ jsx("img", { src: img1, alt: "Jewelry 1", className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-[60%] overflow-hidden rounded-lg shadow-2xl", children: /* @__PURE__ */ jsx("img", { src: img2, alt: "Jewelry 2", className: "h-full w-full object-cover" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-xl text-center", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl font-bold tracking-tight text-[#1a1a1a] md:text-6xl", children: [
        "Find Your ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-[#b3917d]", children: "Perfect" }),
        " Sparkle"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-[#6b5f59]", children: "Find your perfect gems and elevate your look effortlessly." }),
      /* @__PURE__ */ jsxs("button", { onClick: () => navigate({
        to: "/catalog"
      }), className: "mt-10 flex items-center justify-between rounded-full bg-[#b3917d] py-4 pl-8 pr-4 text-xl font-medium text-white transition-all hover:bg-[#a3816d] w-full max-w-sm mx-auto", children: [
        /* @__PURE__ */ jsx("span", { children: "Get Started" }),
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#b3917d]", children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-6 w-6" }) })
      ] })
    ] })
  ] });
}
export {
  LandingPage as component
};
