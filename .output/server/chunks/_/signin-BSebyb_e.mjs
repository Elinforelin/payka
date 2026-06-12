import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
function SignInPage() {
  return /* @__PURE__ */ jsx("main", { className: "min-h-screen px-6 py-10 md:px-10", children: /* @__PURE__ */ jsxs("section", { className: "mx-auto w-full max-w-md rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-[#a48574]", children: "Jewelry Studio" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 text-3xl font-semibold text-[#2f2a27]", children: "Welcome Back" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[#6b5f59]", children: "Sign in to access your account and favorites." })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-[#6b5f59]", htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx("input", { id: "email", type: "email", placeholder: "you@example.com", className: "mt-2 w-full rounded-full border border-[#e6dbd3] bg-white px-4 py-3 text-sm text-[#2f2a27] outline-none focus:border-[#a48574]" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-[#6b5f59]", htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx("input", { id: "password", type: "password", placeholder: "••••••••", className: "mt-2 w-full rounded-full border border-[#e6dbd3] bg-white px-4 py-3 text-sm text-[#2f2a27] outline-none focus:border-[#a48574]" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-[#6b5f59]", htmlFor: "confirmPassword", children: "Confirm Password" }),
        /* @__PURE__ */ jsx("input", { id: "confirmPassword", type: "password", placeholder: "••••••••", className: "mt-2 w-full rounded-full border border-[#e6dbd3] bg-white px-4 py-3 text-sm text-[#2f2a27] outline-none focus:border-[#a48574]" })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "w-full rounded-full bg-[#a48574] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#a48574]/30", children: "Sign In" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 text-center text-sm text-[#6b5f59]", children: [
      "New here?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/signup", className: "font-semibold text-[#a48574]", children: "Create an account" })
    ] })
  ] }) });
}
export {
  SignInPage as component
};
