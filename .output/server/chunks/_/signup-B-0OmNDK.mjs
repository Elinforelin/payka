import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function SignupPage() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen px-6 py-10", children: /* @__PURE__ */ jsxs("section", { className: "mx-auto flex max-w-md flex-col gap-6 rounded-3xl bg-white p-8 shadow-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "Welcome!" }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-sm text-[#a48574]", children: "Close" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-[#6b5f59]", children: "Let’s get started with a free Shopline account." }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("input", { className: "w-full rounded-full border border-[#eadfd7] px-4 py-3 text-sm focus:outline-none", placeholder: "Fullname" }),
      /* @__PURE__ */ jsx("input", { className: "w-full rounded-full border border-[#eadfd7] px-4 py-3 text-sm focus:outline-none", placeholder: "Email" }),
      /* @__PURE__ */ jsx("input", { type: "password", className: "w-full rounded-full border border-[#eadfd7] px-4 py-3 text-sm focus:outline-none", placeholder: "Password" })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "rounded-full bg-[#a48574] px-6 py-3 text-sm font-semibold text-white", children: "Sign Up" }),
    /* @__PURE__ */ jsx("div", { className: "text-center text-xs text-[#6b5f59]", children: "Or sign up with" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsx("button", { className: "flex-1 rounded-full border border-[#eadfd7] px-4 py-2 text-sm", children: "Apple" }),
      /* @__PURE__ */ jsx("button", { className: "flex-1 rounded-full border border-[#eadfd7] px-4 py-2 text-sm", children: "Google" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-[#6b5f59]", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/signin", className: "font-semibold text-[#a48574]", children: "Sign In" })
    ] })
  ] }) });
}
export {
  SignupPage as component
};
