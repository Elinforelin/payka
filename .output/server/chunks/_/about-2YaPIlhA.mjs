import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { i as img } from "./7812354786123547-cWmkQVbL.mjs";
import { c as createLucideIcon } from "./router-B0Krk2Su.mjs";
import "react";
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
const __iconNode$5 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
];
const History = createLucideIcon("history", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
];
const Quote = createLucideIcon("quote", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function AboutPage() {
  const {
    t
  } = useTranslation();
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-[#fdfaf7] px-6 py-12 md:px-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl space-y-12", children: [
    /* @__PURE__ */ jsxs("section", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#b3917d] font-bold", children: t("about.our_story") }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-[#1a1a1a]", children: t("about.hero_title") }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-xl text-base md:text-lg text-[#6b5f59]", children: t("about.hero_desc") })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-[40px] bg-white p-8 md:p-12 shadow-sm border border-[#f0ebe7]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]", children: /* @__PURE__ */ jsx(History, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a]", children: t("about.history_founding") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-stone text-[#6b5f59]", children: [
        /* @__PURE__ */ jsx("p", { children: t("about.history_p1") }),
        /* @__PURE__ */ jsx("p", { className: "mt-4", children: t("about.history_p2") })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("section", { className: "rounded-[40px] bg-[#1a1a1a] p-8 text-white shadow-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#b3917d]", children: /* @__PURE__ */ jsx(Target, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: t("about.mission") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed", children: t("about.mission_desc") })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "rounded-[40px] bg-[#b3917d] p-8 text-white shadow-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white", children: /* @__PURE__ */ jsx(Eye, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: t("about.vision") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/90 leading-relaxed", children: t("about.vision_desc") })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#b3917d] shadow-sm", children: /* @__PURE__ */ jsx(Users, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a]", children: t("about.our_team") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-6 rounded-[32px] bg-white p-6 shadow-sm border border-[#f0ebe7]", children: [
          /* @__PURE__ */ jsx("div", { className: "h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#f7f3ef] mx-auto sm:mx-0", children: /* @__PURE__ */ jsx("img", { src: img, alt: t("about.alina_role"), className: "h-full w-full object-cover" }) }),
          /* @__PURE__ */ jsxs("div", { className: "text-center sm:text-left", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#1a1a1a]", children: "Alina" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-[#b3917d]", children: t("about.alina_role") }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[#6b5f59]", children: t("about.alina_desc") })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-6 rounded-[32px] bg-white p-6 shadow-sm border border-[#f0ebe7] items-center justify-center text-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-[#a19690] italic", children: t("about.team_coming_soon") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "rounded-[40px] bg-white p-8 md:p-12 shadow-sm border border-[#f0ebe7]", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ef] text-[#b3917d]", children: /* @__PURE__ */ jsx(Award, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a]", children: t("about.milestones") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: [{
        year: "2022",
        event: t("about.m2022")
      }, {
        year: "2023",
        event: t("about.m2023")
      }, {
        year: "2024",
        event: t("about.m2024")
      }].map((m) => /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-[#b3917d] w-16", children: m.year }),
        /* @__PURE__ */ jsx("p", { className: "text-[#6b5f59]", children: m.event })
      ] }, m.year)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#b3917d] shadow-sm", children: /* @__PURE__ */ jsx(Quote, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a]", children: t("about.testimonials") })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [{
        text: t("about.t1_text"),
        author: "Sarah J."
      }, {
        text: t("about.t2_text"),
        author: "Michael K."
      }].map((t2, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-[32px] bg-[#f7f3ef] p-8 relative", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[#1a1a1a] font-medium leading-relaxed italic", children: [
          '"',
          t2.text,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm font-bold text-[#b3917d]", children: [
          "— ",
          t2.author
        ] })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-[40px] bg-[#efe6df] p-8 md:p-10 text-center space-y-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-[#6b5f59] max-w-md mx-auto", children: t("about.footer_desc") }),
      /* @__PURE__ */ jsx(Link, { to: "/catalog", className: "inline-block rounded-full bg-[#1a1a1a] px-8 py-4 text-base md:text-lg font-bold text-white shadow-xl transition-transform hover:scale-105 active:scale-95", children: t("about.explore_collection") })
    ] })
  ] }) });
}
export {
  AboutPage as component
};
