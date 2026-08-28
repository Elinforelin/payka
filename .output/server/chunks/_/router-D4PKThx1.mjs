import { createRouter, createRootRoute, createFileRoute, Navigate, lazyRouteComponent, notFound, redirect, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import React, { forwardRef, createElement, useState, useEffect, createContext, useContext } from "react";
import { I18nextProvider, useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { u as ukTranslation, e as enTranslation } from "./uk-CdVMwhvi.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server.mjs";
import { C as Category, p as products } from "./data-C0dK635X.mjs";
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function getProductPricing(product) {
  const percent = product.discountPercent;
  if (typeof percent === "number" && Number.isFinite(percent) && percent > 0 && percent < 100) {
    const discountPercent = Math.round(percent);
    const raw = product.price * (1 - discountPercent / 100);
    const price = Math.max(0, Math.floor(raw / 100) * 100);
    return {
      price,
      originalPrice: product.price,
      discountPercent,
      isOnSale: true
    };
  }
  return {
    price: product.price,
    originalPrice: null,
    discountPercent: null,
    isOnSale: false
  };
}
function getEffectivePrice(product) {
  return getProductPricing(product).price;
}
const CartContext = createContext(void 0);
const CartProvider = ({ children }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    }
    return [];
  });
  const [notification, setNotification] = useState(null);
  const notificationTimeoutRef = React.useRef(null);
  const clearNotification = () => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = null;
    }
    setNotification(null);
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);
  const addToCart = (product, selectedStone, selectedSize) => {
    const pricedProduct = { ...product, price: getEffectivePrice(product) };
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map(
          (item) => item.id === product.id ? {
            ...item,
            ...pricedProduct,
            quantity: item.quantity + 1,
            savedForLater: false,
            selectedStone,
            selectedSize
          } : item
        );
      }
      return [
        ...prevItems,
        { ...pricedProduct, quantity: 1, savedForLater: false, selectedStone, selectedSize }
      ];
    });
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification({
      key: "notifications.added_to_cart",
      params: { name: t(product.name) },
      withCartActions: true
    });
    notificationTimeoutRef.current = setTimeout(() => setNotification(null), 8e3);
  };
  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(
      (prevItems) => prevItems.map((item) => item.id === productId ? { ...item, quantity } : item)
    );
  };
  const toggleSaveForLater = (productId) => {
    setItems(
      (prevItems) => prevItems.map(
        (item) => item.id === productId ? { ...item, savedForLater: !item.savedForLater } : item
      )
    );
  };
  const clearCart = () => {
    setItems([]);
  };
  const activeItems = items.filter((item) => !item.savedForLater);
  const totalItems = activeItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = activeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return /* @__PURE__ */ jsx(
    CartContext.Provider,
    {
      value: {
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSaveForLater,
        clearCart,
        clearNotification,
        totalItems,
        totalPrice,
        notification
      },
      children
    }
  );
};
const useCart = () => {
  const context = useContext(CartContext);
  if (context === void 0) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
const FavoritesContext = createContext(void 0);
const FavoritesProvider = ({ children }) => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        try {
          return JSON.parse(savedFavorites);
        } catch (e) {
          console.error("Failed to parse favorites", e);
        }
      }
    }
    return [];
  });
  const [categories, setCategories] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCategories = localStorage.getItem("favorite_categories");
      if (savedCategories) {
        try {
          return JSON.parse(savedCategories);
        } catch (e) {
          console.error("Failed to parse categories", e);
        }
      }
    }
    return ["General", "Wishlist", "Gift Ideas"];
  });
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem("favorite_categories", JSON.stringify(categories));
  }, [categories]);
  const addToFavorites = (product, category = "General") => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, { ...product, categoryName: category }];
    });
    setNotification({ key: "notifications.added_to_favorite", params: { name: t(product.name), category } });
    setTimeout(() => setNotification(null), 3e3);
  };
  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };
  const isFavorited = (productId) => {
    return favorites.some((item) => item.id === productId);
  };
  const addCategory = (name) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };
  const BUILT_IN_CATEGORIES = ["General", "Wishlist", "Gift Ideas"];
  const removeCategory = (name) => {
    if (BUILT_IN_CATEGORIES.includes(name)) return;
    setCategories((prev) => prev.filter((c) => c !== name));
    setFavorites((prev) => prev.map(
      (item) => item.categoryName === name ? { ...item, categoryName: "General" } : item
    ));
  };
  return /* @__PURE__ */ jsx(
    FavoritesContext.Provider,
    {
      value: {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorited,
        categories,
        addCategory,
        removeCategory,
        notification
      },
      children
    }
  );
};
const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === void 0) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
const Notification = () => {
  const { t } = useTranslation();
  const { notification: cartNotification, clearNotification } = useCart();
  const { notification: favoriteNotification } = useFavorites();
  const notification = cartNotification || favoriteNotification;
  if (!notification) return null;
  const showCartActions = Boolean(cartNotification?.withCartActions);
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-8 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300", children: /* @__PURE__ */ jsxs("div", { className: "rounded-[24px] bg-[#1a1a1a] px-5 py-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsx(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-[#b3917d]" }),
      /* @__PURE__ */ jsx("p", { className: "font-bold tracking-tight leading-snug", children: t(notification.key, notification.params) })
    ] }),
    showCartActions && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col gap-2 sm:flex-row", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/cart",
          onClick: clearNotification,
          className: "flex flex-1 items-center justify-center rounded-2xl bg-[#b3917d] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#9a7a68]",
          children: t("notifications.go_to_cart")
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          onClick: clearNotification,
          className: "flex flex-1 items-center justify-center rounded-2xl bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/15",
          children: t("notifications.continue_shopping")
        }
      )
    ] })
  ] }) });
};
i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    uk: { translation: ukTranslation }
  },
  fallbackLng: "en",
  supportedLngs: ["en", "uk"],
  load: "languageOnly",
  nonExplicitSupportedLngs: true,
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
    caches: ["localStorage", "cookie"],
    convertDetectedLanguage: (lng) => lng.split(/[-_]/)[0]
  }
});
const appCss = "/assets/styles-BnAdgihL.css";
const Route$c = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Payka"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg"
      }
    ]
  }),
  notFoundComponent: () => /* @__PURE__ */ jsx(Navigate, { to: "/", replace: true }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-[#f7f3ef] text-[#2f2a27] antialiased", children: [
      /* @__PURE__ */ jsx(I18nextProvider, { i18n, children: /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsxs(FavoritesProvider, { children: [
        children,
        /* @__PURE__ */ jsx(Notification, {})
      ] }) }) }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$a = () => import("./signup-B-0OmNDK.mjs");
const Route$b = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./signin-BSebyb_e.mjs");
const Route$a = createFileRoute("/signin")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./shipping-BbsLKsd4.mjs");
const Route$9 = createFileRoute("/shipping")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./product-BFsOu0JM.mjs");
const Route$8 = createFileRoute("/product")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./favorites-BbOnEg6W.mjs");
const Route$7 = createFileRoute("/favorites")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./checkout-CWPUqkrm.mjs");
const Route$6 = createFileRoute("/checkout")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./cart-CSZXM327.mjs");
const Route$5 = createFileRoute("/cart")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./about-B1d5EhfO.mjs");
const Route$4 = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const Route$3 = createFileRoute("/$")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  }
});
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    functionId,
    [TSS_SERVER_FUNCTION]: true
  });
};
const $$splitComponentImporter$2 = () => import("./index-BE9AV-5G.mjs");
const getProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5d14184e791326a0e274d1e4e3681e27fd834658d2ef5f776f7a7ca880bdf3a5"));
const Route$2 = createFileRoute("/")({
  loader: async () => await getProducts(),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./product._productId-1Le3RKf-.mjs");
const getProduct = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(createSsrRpc("02237705211f6fce5dafbd6be40b265cc093810759aabc102a7a61ff80e58dd5"));
const Route$1 = createFileRoute("/product/$productId")({
  loader: async ({
    params
  }) => {
    const productId = Number(params.productId);
    if (!Number.isFinite(productId)) {
      throw notFound();
    }
    const product = await getProduct({
      data: {
        productId
      }
    });
    console.log(product);
    if (!product) {
      throw notFound();
    }
    return product;
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./catalog._category-GQ3Xe4BQ.mjs");
const Route = createFileRoute("/catalog/$category")({
  loader: async ({
    params
  }) => {
    const category = params.category;
    if (!Object.values(Category).includes(category)) {
      throw notFound();
    }
    const categoryProducts = products.filter((product) => product.category === category);
    if (categoryProducts.length === 0) {
      throw notFound();
    }
    return {
      category,
      products: categoryProducts
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$b.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$c
});
const SigninRoute = Route$a.update({
  id: "/signin",
  path: "/signin",
  getParentRoute: () => Route$c
});
const ShippingRoute = Route$9.update({
  id: "/shipping",
  path: "/shipping",
  getParentRoute: () => Route$c
});
const ProductRoute = Route$8.update({
  id: "/product",
  path: "/product",
  getParentRoute: () => Route$c
});
const FavoritesRoute = Route$7.update({
  id: "/favorites",
  path: "/favorites",
  getParentRoute: () => Route$c
});
const CheckoutRoute = Route$6.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$c
});
const CartRoute = Route$5.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$c
});
const AboutRoute = Route$4.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$c
});
const SplatRoute = Route$3.update({
  id: "/$",
  path: "/$",
  getParentRoute: () => Route$c
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const ProductProductIdRoute = Route$1.update({
  id: "/$productId",
  path: "/$productId",
  getParentRoute: () => ProductRoute
});
const CatalogCategoryRoute = Route.update({
  id: "/catalog/$category",
  path: "/catalog/$category",
  getParentRoute: () => Route$c
});
const ProductRouteChildren = {
  ProductProductIdRoute
};
const ProductRouteWithChildren = ProductRoute._addFileChildren(ProductRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  SplatRoute,
  AboutRoute,
  CartRoute,
  CheckoutRoute,
  FavoritesRoute,
  ProductRoute: ProductRouteWithChildren,
  ShippingRoute,
  SigninRoute,
  SignupRoute,
  CatalogCategoryRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    notFoundMode: "root",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
const routerD4PKThx1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  R: Route$2,
  a: useCart,
  b: getProductPricing,
  c: createSsrRpc,
  d: Route$1,
  e: Route,
  g: getEffectivePrice,
  r: router,
  u: useFavorites
});
export {
  CircleCheck as C,
  Route$2 as R,
  useCart as a,
  createSsrRpc as b,
  createLucideIcon as c,
  getProductPricing as d,
  Route$1 as e,
  Route as f,
  getEffectivePrice as g,
  routerD4PKThx1 as r,
  useFavorites as u
};
