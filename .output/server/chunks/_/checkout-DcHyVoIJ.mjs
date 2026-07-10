import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { L as LanguageToggle } from "./7812354786123547-BzsHGh6s.mjs";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { c as createLucideIcon, a as useCart, C as CircleCheck, b as createSsrRpc } from "./router-CIvS-aii.mjs";
import { r as resolveProductImageUrl } from "./product-images-CufF_jDU.mjs";
import { c as createServerFn } from "./server.mjs";
import { C as ChevronLeft } from "./chevron-left.mjs";
import { S as Search } from "./search.mjs";
import "i18next";
import "i18next-browser-languagedetector";
import "./data-B1DXlOW8.mjs";
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
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$5);
const __iconNode$4 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const submitOrder = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("5c64c4ecab63675a61db85176d6dbad94bc1f95268ec2c0acc215ee2739aee1c"));
function CheckoutPage() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const {
    items,
    totalPrice,
    clearCart
  } = useCart();
  const activeItems = items.filter((item) => !item.savedForLater);
  const [step, setStep] = useState("shipping");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    cityRef: "",
    department: "",
    departmentRef: "",
    comment: ""
  });
  const [errors, setErrors] = useState({});
  const [selectedMethod, setSelectedMethod] = useState("nova_poshta");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [cities, setCities] = useState([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
  const citySearchRef = useRef(null);
  const shippingMethods = [{
    id: "nova_poshta",
    name: t("checkout.methods.nova_poshta"),
    time: "1-2 business days"
  }];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (citySearchRef.current && !citySearchRef.current.contains(event.target)) {
        setShowCitySuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (citySearch.length < 2) {
      setCities([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsCitiesLoading(true);
      try {
        const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
          method: "POST",
          body: JSON.stringify({
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: {
              FindByString: citySearch,
              Limit: "10"
            },
            apiKey: ""
            // Often works for getCities even without key, or use a public one if available
          })
        });
        const data = await response.json();
        if (data.success) {
          setCities(data.data);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsCitiesLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [citySearch]);
  useEffect(() => {
    if (!formData.cityRef) {
      setDepartments([]);
      return;
    }
    const fetchDepartments = async () => {
      setIsDepartmentsLoading(true);
      try {
        const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
          method: "POST",
          body: JSON.stringify({
            modelName: "Address",
            calledMethod: "getWarehouses",
            methodProperties: {
              CityRef: formData.cityRef
            },
            apiKey: ""
          })
        });
        const data = await response.json();
        if (data.success) {
          setDepartments(data.data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setIsDepartmentsLoading(false);
      }
    };
    fetchDepartments();
  }, [formData.cityRef]);
  const currentMethod = shippingMethods.find((m) => m.id === selectedMethod);
  const validateShipping = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t("checkout.errors.name_required");
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) newErrors.phone = t("checkout.errors.phone_invalid");
    if (selectedMethod === "nova_poshta") {
      if (!formData.cityRef) newErrors.city = t("checkout.errors.city_required");
      if (!formData.departmentRef) newErrors.department = t("checkout.errors.department_required");
    } else if (selectedMethod !== "pickup") {
      if (!formData.address.trim()) newErrors.address = t("checkout.errors.address_required");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateOrder = () => {
    const newErrors = {};
    if (!privacyConsent) newErrors.privacyConsent = t("checkout.errors.consent_required");
    setErrors((prev) => ({
      ...prev,
      ...newErrors
    }));
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (validateShipping()) {
      setStep("summary");
      window.scrollTo(0, 0);
    }
  };
  const handlePlaceOrder = async () => {
    if (!validateOrder()) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitOrder({
        data: {
          privacyConsent: true,
          consentTimestamp: (/* @__PURE__ */ new Date()).toISOString(),
          subtotal: totalPrice,
          total: totalPrice,
          items: activeItems.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            category: item.category,
            stone: item.selectedStone,
            size: item.selectedSize
          })),
          shipping: {
            fullName: formData.fullName,
            phone: formData.phone,
            city: formData.city,
            department: formData.department,
            address: formData.address,
            shippingMethod: currentMethod.name
          },
          comment: formData.comment || void 0
        }
      });
      setStep("success");
      clearCart();
      window.scrollTo(0, 0);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : t("checkout.errors.submit_failed"));
    } finally {
      setIsSubmitting(false);
    }
  };
  if (activeItems.length === 0 && step !== "success") {
    return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-[#fdfaf7] px-6 py-8 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-[#1a1a1a] mb-4", children: t("cart.empty") }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-[#b3917d] font-bold hover:underline", children: t("cart.continue_shopping") })
    ] }) });
  }
  if (step === "success") {
    return /* @__PURE__ */ jsx("main", { className: "min-h-screen bg-[#fdfaf7] px-6 py-12 md:py-24 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full bg-white rounded-[40px] p-8 md:p-12 shadow-sm text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(CircleCheck, { className: "h-10 w-10 text-green-500" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-8", children: t("checkout.success") }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "block w-full rounded-[24px] bg-[#1a1a1a] py-4 text-white font-bold transition-all hover:bg-black", children: t("cart.continue_shopping") })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12 pb-24 w-full", children: [
    /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between mb-8 w-full", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => step === "summary" ? setStep("shipping") : navigate({
        to: "/cart"
      }), className: "flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-lg md:text-xl font-bold text-[#1a1a1a]", children: step === "shipping" ? t("checkout.shipping_info") : t("checkout.confirm_order") }),
      /* @__PURE__ */ jsx(LanguageToggle, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: step === "shipping" ? /* @__PURE__ */ jsx("div", { className: "bg-white rounded-[32px] p-6 md:p-8 shadow-sm space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[#6b5f59] mb-2 px-1", children: t("checkout.full_name") }),
          /* @__PURE__ */ jsx("input", { type: "text", value: formData.fullName, onChange: (e) => setFormData({
            ...formData,
            fullName: e.target.value
          }), className: `w-full h-14 rounded-2xl bg-[#fdfaf7] px-4 outline-none border-2 transition-all ${errors.fullName ? "border-red-200 focus:border-red-400" : "border-transparent focus:border-[#b3917d]"}`, placeholder: t("checkout.placeholder_full_name") }),
          errors.fullName && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500 px-1", children: errors.fullName })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[#6b5f59] mb-2 px-1", children: t("checkout.phone") }),
          /* @__PURE__ */ jsx("input", { type: "tel", value: formData.phone, onChange: (e) => setFormData({
            ...formData,
            phone: e.target.value
          }), className: `w-full h-14 rounded-2xl bg-[#fdfaf7] px-4 outline-none border-2 transition-all ${errors.phone ? "border-red-200 focus:border-red-400" : "border-transparent focus:border-[#b3917d]"}`, placeholder: "+380 99 999 99 99" }),
          errors.phone && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500 px-1", children: errors.phone })
        ] }),
        selectedMethod === "nova_poshta" ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", ref: citySearchRef, children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[#6b5f59] mb-2 px-1", children: t("checkout.city") }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("input", { type: "text", value: citySearch, autoComplete: "off", onChange: (e) => {
                const value = e.target.value;
                setCitySearch(value);
                setShowCitySuggestions(true);
                if (value !== formData.city) {
                  setFormData({
                    ...formData,
                    city: "",
                    cityRef: "",
                    department: "",
                    departmentRef: ""
                  });
                }
              }, onFocus: () => {
                if (citySearch.length >= 2 && cities.length > 0) {
                  setShowCitySuggestions(true);
                }
              }, placeholder: t("checkout.search_city"), className: `w-full h-14 rounded-2xl bg-[#fdfaf7] pl-12 pr-4 outline-none border-2 transition-all ${errors.city ? "border-red-200 focus:border-red-400" : "border-transparent focus:border-[#b3917d]"}` }),
              /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a19690]" }),
              isCitiesLoading && /* @__PURE__ */ jsx(LoaderCircle, { className: "absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b3917d] animate-spin" })
            ] }),
            showCitySuggestions && cities.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl bg-white p-2 shadow-xl border border-gray-100", children: cities.map((city) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => {
              setFormData({
                ...formData,
                city: city.Description,
                cityRef: city.Ref,
                department: "",
                departmentRef: ""
              });
              setCitySearch(city.Description);
              setCities([]);
              setShowCitySuggestions(false);
            }, className: "w-full text-left p-3 hover:bg-[#fdfaf7] rounded-xl transition-colors text-sm", children: [
              city.Description,
              ", ",
              city.AreaDescription
            ] }, city.Ref)) }),
            errors.city && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500 px-1", children: errors.city })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[#6b5f59] mb-2 px-1", children: t("checkout.department") }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxs("select", { disabled: !formData.cityRef || isDepartmentsLoading, value: formData.departmentRef, onChange: (e) => {
                const dep = departments.find((d) => d.Ref === e.target.value);
                setFormData({
                  ...formData,
                  department: dep?.Description || "",
                  departmentRef: e.target.value
                });
              }, className: `w-full h-14 rounded-2xl bg-[#fdfaf7] pl-12 pr-4 outline-none border-2 transition-all appearance-none disabled:opacity-50 ${errors.department ? "border-red-200 focus:border-red-400" : "border-transparent focus:border-[#b3917d]"}`, children: [
                /* @__PURE__ */ jsx("option", { value: "", children: t("checkout.select_department") }),
                departments.map((dep) => /* @__PURE__ */ jsx("option", { value: dep.Ref, children: dep.Description }, dep.Ref))
              ] }),
              /* @__PURE__ */ jsx(MapPin, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a19690]" }),
              isDepartmentsLoading && /* @__PURE__ */ jsx(LoaderCircle, { className: "absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b3917d] animate-spin" })
            ] }),
            errors.department && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500 px-1", children: errors.department })
          ] })
        ] }) : selectedMethod !== "pickup" ? /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[#6b5f59] mb-2 px-1", children: t("checkout.address") }),
          /* @__PURE__ */ jsx("textarea", { value: formData.address, onChange: (e) => setFormData({
            ...formData,
            address: e.target.value
          }), className: `w-full h-32 rounded-2xl bg-[#fdfaf7] p-4 outline-none border-2 transition-all resize-none ${errors.address ? "border-red-200 focus:border-red-400" : "border-transparent focus:border-[#b3917d]"}`, placeholder: "City, Street, Building, Apartment" }),
          errors.address && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-red-500 px-1", children: errors.address })
        ] }) : null,
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[#6b5f59] mb-2 px-1", children: t("checkout.comment") }),
          /* @__PURE__ */ jsx("textarea", { value: formData.comment, onChange: (e) => setFormData({
            ...formData,
            comment: e.target.value
          }), className: "w-full h-28 rounded-2xl bg-[#fdfaf7] p-4 outline-none border-2 border-transparent focus:border-[#b3917d] transition-all resize-none", placeholder: t("checkout.comment_placeholder") })
        ] })
      ] }) }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[32px] p-6 md:p-8 shadow-sm", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Package, { className: "h-5 w-5 text-[#b3917d]" }),
            t("checkout.shipping_info")
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-[#6b5f59]", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-[#1a1a1a]", children: formData.fullName }),
            /* @__PURE__ */ jsx("p", { children: formData.phone }),
            selectedMethod === "nova_poshta" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("p", { children: formData.city }),
              /* @__PURE__ */ jsx("p", { children: formData.department })
            ] }) : selectedMethod !== "pickup" ? /* @__PURE__ */ jsx("p", { children: formData.address }) : null,
            /* @__PURE__ */ jsxs("p", { className: "pt-2 flex items-center gap-2 text-[#1a1a1a]", children: [
              /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4" }),
              currentMethod.name
            ] }),
            formData.comment && /* @__PURE__ */ jsxs("p", { className: "pt-2 text-sm italic text-[#6b5f59]", children: [
              '"',
              formData.comment,
              '"'
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[32px] p-6 md:p-8 shadow-sm", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-5 w-5 text-green-600" }),
            t("checkout.privacy_title")
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[#6b5f59] leading-relaxed mb-4", children: t("checkout.privacy_note") }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", checked: privacyConsent, onChange: (e) => {
              setPrivacyConsent(e.target.checked);
              if (e.target.checked && errors.privacyConsent) {
                setErrors((prev) => {
                  const next = {
                    ...prev
                  };
                  delete next.privacyConsent;
                  return next;
                });
              }
            }, className: "mt-1 h-4 w-4 rounded border-gray-300 text-[#b3917d] focus:ring-[#b3917d]" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-[#6b5f59] leading-relaxed", children: t("checkout.privacy_consent") })
          ] }),
          errors.privacyConsent && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-500", children: errors.privacyConsent })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "lg:sticky lg:top-8 h-fit space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[32px] p-6 md:p-8 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-[#1a1a1a] mb-6", children: t("checkout.order_summary") }),
        /* @__PURE__ */ jsx("div", { className: "max-h-64 overflow-y-auto pr-2 space-y-4 mb-8 custom-scrollbar", children: activeItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-[#f7f3ef]", children: /* @__PURE__ */ jsx("img", { src: resolveProductImageUrl(item.imageUrl), alt: t(item.name), className: "h-full w-full object-cover" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-[#1a1a1a] truncate", children: t(item.name) }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#6b5f59]", children: [
              t("checkout.qty"),
              ": ",
              item.quantity
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-[#b3917d]", children: [
              "₴",
              item.price * item.quantity
            ] })
          ] })
        ] }, item.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-6 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[#6b5f59]", children: [
            /* @__PURE__ */ jsx("span", { children: t("checkout.subtotal") }),
            /* @__PURE__ */ jsxs("span", { children: [
              "₴",
              totalPrice
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-3 border-t border-gray-100", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-[#1a1a1a]", children: t("checkout.total") }),
            /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-[#1a1a1a]", children: [
              "₴",
              totalPrice
            ] })
          ] })
        ] }),
        submitError && /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-red-500 text-center", children: submitError }),
        /* @__PURE__ */ jsx("button", { onClick: step === "shipping" ? handleNext : handlePlaceOrder, disabled: isSubmitting, className: "w-full mt-8 rounded-[24px] bg-[#1a1a1a] py-4 md:py-5 text-base md:text-lg font-bold text-white shadow-xl transition-all hover:bg-black active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed", children: step === "shipping" ? /* @__PURE__ */ jsx(Fragment, { children: t("checkout.next_step") }) : isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
          t("checkout.submitting")
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5" }),
          t("checkout.place_order")
        ] }) })
      ] }) })
    ] })
  ] });
}
export {
  CheckoutPage as component
};
