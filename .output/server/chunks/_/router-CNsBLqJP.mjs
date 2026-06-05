import { createRouter, createRootRoute, createFileRoute, lazyRouteComponent, HeadContent, Scripts, notFound } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { forwardRef, createElement, useState, useEffect, createContext, useContext } from "react";
import { I18nextProvider, useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server.mjs";
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
const CartContext = createContext(void 0);
const CartProvider = ({ children }) => {
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
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  const addToCart = (product2) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product2.id);
      if (existingItem) {
        return prevItems.map(
          (item) => item.id === product2.id ? { ...item, quantity: item.quantity + 1, savedForLater: false } : item
        );
      }
      return [...prevItems, { ...product2, quantity: 1, savedForLater: false }];
    });
    setNotification({ key: "notifications.added_to_cart", params: { name: product2.name } });
    setTimeout(() => setNotification(null), 3e3);
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
  const [favorites2, setFavorites] = useState(() => {
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
    localStorage.setItem("favorites", JSON.stringify(favorites2));
  }, [favorites2]);
  useEffect(() => {
    localStorage.setItem("favorite_categories", JSON.stringify(categories));
  }, [categories]);
  const addToFavorites = (product2, category = "General") => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === product2.id)) return prev;
      return [...prev, { ...product2, categoryName: category }];
    });
    setNotification({ key: "notifications.added_to_favorite", params: { name: product2.name, category } });
    setTimeout(() => setNotification(null), 3e3);
  };
  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };
  const isFavorited = (productId) => {
    return favorites2.some((item) => item.id === productId);
  };
  const addCategory = (name) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };
  return /* @__PURE__ */ jsx(
    FavoritesContext.Provider,
    {
      value: {
        favorites: favorites2,
        addToFavorites,
        removeFromFavorites,
        isFavorited,
        categories,
        addCategory,
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
  const { notification: cartNotification } = useCart();
  const { notification: favoriteNotification } = useFavorites();
  const notification = cartNotification || favoriteNotification;
  if (!notification) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-[24px] bg-[#1a1a1a] px-6 py-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md", children: [
    /* @__PURE__ */ jsx(CircleCheck, { className: "h-5 w-5 text-[#b3917d]" }),
    /* @__PURE__ */ jsx("p", { className: "font-bold tracking-tight", children: t(notification.key, notification.params) })
  ] }) });
};
const common$1 = { "app_name": "PAYKA", "search_placeholder": "Search Jewelry", "categories": "Categories", "we_recommend": "We Recommend", "add_to_cart": "Add to Cart", "checkout": "Checkout", "save_for_later": "Save for later", "move_to_cart": "Move to cart", "remove": "Remove", "subtotal": "Subtotal", "total": "Total", "favorites": "Favorites", "cart": "Cart", "about_us": "About Us", "no_items": "No items found", "price": "Price", "metal": "Metal", "color": "Color", "apply": "Apply", "reset": "Reset", "back": "Back" };
const catalog$1 = { "title": "Catalog", "advanced_filters": "Advanced Filters", "price_range": "Price Range", "min": "Min", "max": "Max" };
const product$1 = { "add_to_favorites": "Add to favorites", "added_to_cart": "Added to cart", "description": "Description", "details": "Details", "about_product": "About Product", "select_size": "Select Size", "sku": "SKU", "metal_standard": "Metal Standard", "metal_type": "Metal Type", "metal_color": "Metal Color", "clasp": "Clasp", "gemstone": "Gemstone", "design": "Design", "style": "Style", "product_type": "Product Type", "technology": "Technology", "width": "Width, mm", "thickness": "Thickness, mm", "length": "Length, mm", "weight": "Weight, g" };
const about$1 = { "our_story": "Our Story", "hero_title": "Crafted for Quiet Luxury", "hero_desc": "Our jewelry is born slowly. Without haste, without a rigid plan, allowing the form to become what it wants to be.", "history_founding": "History & Founding", "history_p1": "Founded in 2022 in a small home studio, Payka began with a simple soldering iron and a vision for jewelry that feels like a second skin. What started as a personal quest for the perfect minimalist ring evolved into a brand dedicated to the beauty of imperfection and the warmth of handmade craft.", "history_p2": "Our founder, Alina, spent years experimenting with metalwork, drawing inspiration from organic forms and the silent language of precious metals. Today, Payka remains true to its roots, producing limited collections that celebrate the individual journey of every wearer.", "mission_vision": "Mission & Vision", "mission": "Our Mission", "mission_desc": "To create timeless jewelry that resonates with the soul, focusing on intentional simplicity and long-lasting materials that honor the art of handcrafting.", "vision": "Our Vision", "vision_desc": 'To be a sanctuary for those who appreciate the silence in details, setting a standard for "quiet luxury" where jewelry is not just an accessory, but an heirloom.', "our_team": "The Team", "alina_role": "Founder & Lead Jeweler", "alina_desc": "Specializes in organic ring designs and experimental metal textures.", "team_coming_soon": "More team members coming soon...", "milestones": "Milestones", "m2022": "Official launch of the Payka home studio.", "m2023": "Reached 1,000 handcrafted pieces sold worldwide.", "m2024": "Featured in 'Handmade Monthly' for innovative textures.", "testimonials": "Customer Voices", "t1_text": "The ring I bought feels like it's been part of my hand forever. There's a soul in these pieces that mass-produced jewelry simply lacks.", "t2_text": "Fast delivery and beautiful packaging. But the jewelry itself... it's breathtaking in its simplicity.", "footer_desc": "We invite you to explore our collection and find a piece that speaks to your heart.", "explore_collection": "Explore Collection" };
const cart$1 = { "title": "My Cart", "order_summary": "Order Summary", "items_count": "{{count}} items", "empty": "Your cart is empty", "continue_shopping": "Continue Shopping", "total_amount": "Total Amount", "proceed_to_payment": "Proceed to Payment", "empty_desc": "Add some beautiful jewelry to your collection", "saved_for_later": "Saved for later" };
const checkout$1 = { "title": "Checkout", "shipping_info": "Shipping Information", "full_name": "Full Name", "phone": "Phone Number", "address": "Shipping Address", "city": "City", "department": "Nova Poshta Department", "search_city": "Search city...", "select_department": "Select department...", "shipping_method": "Shipping Method", "estimated_delivery": "Estimated delivery: {{time}}", "order_summary": "Order Summary", "place_order": "Place Order", "back_to_cart": "Back to Cart", "confirm_order": "Confirm Your Order", "subtotal": "Subtotal", "shipping": "Shipping", "total": "Total", "errors": { "name_required": "Full name is required", "phone_invalid": "Invalid phone number format", "address_required": "Shipping address is required", "city_required": "Please select a city", "department_required": "Please select a department" }, "methods": { "standard": "Standard Shipping", "express": "Express Delivery", "pickup": "Store Pickup", "nova_poshta": "Nova Poshta (to Department)" }, "success": "Order placed successfully! Securely encrypted during transmission.", "encrypt_note": "Your data is encrypted using 256-bit SSL security." };
const notifications$1 = { "added_to_cart": "{{name}} added to cart!", "added_to_favorite": "{{name}} added to {{category}}!" };
const favorites$1 = { "title": "My Favorites", "all_items": "All Items", "new_category": "New Category", "category_name_placeholder": "e.g. Birthday Gifts", "cancel": "Cancel", "create": "Create", "no_favorites": "No favorites yet", "no_favorites_desc": "Items you heart will show up here.", "explore_collection": "Explore Collection", "general": "General", "confirm_favorite": "Add to Favorites", "select_category": "Select a category for this item" };
const enTranslation = {
  common: common$1,
  catalog: catalog$1,
  product: product$1,
  about: about$1,
  cart: cart$1,
  checkout: checkout$1,
  notifications: notifications$1,
  favorites: favorites$1
};
const common = { "app_name": "PAYKA", "search_placeholder": "Пошук прикрас", "categories": "Категорії", "we_recommend": "Ми рекомендуємо", "add_to_cart": "Додати в кошик", "checkout": "Оформити замовлення", "save_for_later": "Зберегти на потім", "move_to_cart": "Перемістити в кошик", "remove": "Видалити", "subtotal": "Підсумок", "total": "Разом", "favorites": "Обране", "cart": "Кошик", "about_us": "Про нас", "no_items": "Товари не знайдені", "price": "Ціна", "metal": "Метал", "color": "Колір", "apply": "Застосувати", "reset": "Скинути", "back": "Назад" };
const catalog = { "title": "Каталог", "advanced_filters": "Розширені фільтри", "price_range": "Діапазон цін", "min": "Від", "max": "До" };
const product = { "add_to_favorites": "Додати в обране", "added_to_cart": "Додано в кошик", "description": "Опис", "details": "Деталі", "about_product": "Про виріб", "select_size": "Оберіть розмір", "sku": "Артикул", "metal_standard": "Проба", "metal_type": "Метал", "metal_color": "Колір металу", "clasp": "Застібка", "gemstone": "Вставка", "design": "Дизайн", "style": "Стиль", "product_type": "Тип виробу", "technology": "Технологія виготовлення", "width": "Ширина, мм", "thickness": "Товщина, мм", "length": "Довжина, мм", "weight": "Вага, г" };
const about = { "our_story": "Наша історія", "hero_title": "Створено для тихої розкоші", "hero_desc": "Наші прикраси народжуються повільно. Без поспіху, без жорсткого плану, дозволяючи формі стати такою, якою вона хоче бути.", "history_founding": "Історія та заснування", "history_p1": "Заснована у 2022 році в невеликій домашній студії, Payka почалася з простого паяльника та бачення прикрас, які відчуваються як друга шкіра. Те, що починалося як особистий пошук ідеальної мінімалістичної каблучки, перетворилося на бренд, присвячений красі недосконалості та теплу ручної роботи.", "history_p2": "Наша засновниця, Аліна, роками експериментувала з металообробкою, черпаючи натхнення в органічних формах і мовчазній мові дорогоцінних металів. Сьогодні Payka залишається вірною своєму корінню, випускаючи лімітовані колекції, які святкують індивідуальну подорож кожного власника.", "mission_vision": "Місія та бачення", "mission": "Наша місія", "mission_desc": "Створювати позачасові прикраси, що резонують з душею, зосереджуючись на навмисній простоті та довговічних матеріалах, що вшановують мистецтво ручної роботи.", "vision": "Наше бачення", "vision_desc": "Бути святилищем для тих, хто цінує тишу в деталях, встановлюючи стандарт «тихої розкоші», де прикраса — це не просто аксесуар, а сімейна реліквія.", "our_team": "Наша команда", "alina_role": "Засновниця та провідна ювелірка", "alina_desc": "Спеціалізується на органічному дизайні каблучок та експериментальних текстурах металу.", "team_coming_soon": "Більше членів команди незабаром...", "milestones": "Досягнення", "m2022": "Офіційний запуск домашньої студії Payka.", "m2023": "Досягнуто відмітки в 1000 виробів ручної роботи, проданих по всьому світу.", "m2024": "Публікація в журналі 'Handmade Monthly' за інноваційні текстури.", "testimonials": "Голоси клієнтів", "t1_text": "Каблучка, яку я купила, відчувається так, ніби вона була частиною моєї руки завжди. У цих виробах є душа, якої просто бракує серійним прикрасам.", "t2_text": "Швидка доставка та красива упаковка. Але самі прикраси... вони захоплюють дух своєю простотою.", "footer_desc": "Ми запрошуємо вас дослідити нашу колекцію та знайти виріб, який промовлятиме до вашого серця.", "explore_collection": "Дослідити колекцію" };
const cart = { "title": "Мій кошик", "order_summary": "Підсумок замовлення", "items_count_one": "{{count}} товар", "items_count_few": "{{count}} товари", "items_count_many": "{{count}} товарів", "empty": "Ваш кошик порожній", "continue_shopping": "Продовжити покупки", "total_amount": "Загальна сума", "proceed_to_payment": "Перейти до оплати", "empty_desc": "Додайте прекрасні прикраси до своєї колекції", "saved_for_later": "Збережено на потім" };
const checkout = { "title": "Оформлення", "shipping_info": "Інформація про доставку", "full_name": "Повне ім'я", "phone": "Номер телефону", "address": "Адреса доставки", "city": "Місто", "department": "Відділення Нової Пошти", "search_city": "Пошук міста...", "select_department": "Оберіть відділення...", "shipping_method": "Спосіб доставки", "estimated_delivery": "Очікувана доставка: {{time}}", "order_summary": "Підсумок замовлення", "place_order": "Оформити замовлення", "back_to_cart": "Назад до кошика", "confirm_order": "Підтвердіть замовлення", "subtotal": "Вартість товарів", "shipping": "Доставка", "total": "Разом", "errors": { "name_required": "Повне ім'я обов'язкове", "phone_invalid": "Невірний формат номера телефону", "address_required": "Адреса доставки обов'язкова", "city_required": "Оберіть місто", "department_required": "Оберіть відділення" }, "methods": { "standard": "Стандартна доставка", "express": "Експрес-доставка", "pickup": "Самовивіз", "nova_poshta": "Нова Пошта (до відділення)" }, "success": "Замовлення успішно оформлено! Дані захищені шифруванням під час передачі.", "encrypt_note": "Ваші дані зашифровані за допомогою 256-бітного протоколу безпеки SSL." };
const notifications = { "added_to_cart": "{{name}} додано до кошика!", "added_to_favorite": "{{name}} додано до списку {{category}}!" };
const favorites = { "title": "Моє обране", "all_items": "Усі товари", "new_category": "Нова категорія", "category_name_placeholder": "напр. Подарунки", "cancel": "Скасувати", "create": "Створити", "no_favorites": "Поки що нічого немає", "no_favorites_desc": "Товари, які ви позначите сердечком, з'являться тут.", "explore_collection": "Дослідити колекцію", "general": "Загальне", "confirm_favorite": "Додати до обраного", "select_category": "Виберіть категорію для цього товару" };
const ukTranslation = {
  common,
  catalog,
  product,
  about,
  cart,
  checkout,
  notifications,
  favorites
};
i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    uk: { translation: ukTranslation }
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  },
  detection: {
    order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
    caches: ["localStorage", "cookie"]
  }
});
const appCss = "/assets/styles-j8lVd3Vk.css";
const Route$a = createRootRoute({
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
        title: "TanStack Start Starter"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
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
const $$splitComponentImporter$9 = () => import("./signup-B-0OmNDK.mjs");
const Route$9 = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./signin-BSebyb_e.mjs");
const Route$8 = createFileRoute("/signin")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./product-BFsOu0JM.mjs");
const Route$7 = createFileRoute("/product")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./favorites-BZ-iy_Bi.mjs");
const Route$6 = createFileRoute("/favorites")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./checkout-D-SQn_B8.mjs");
const Route$5 = createFileRoute("/checkout")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
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
const $$splitComponentImporter$4 = () => import("./catalog-C9dYq1X3.mjs");
const getProducts$1 = createServerFn({
  method: "GET"
}).handler(createSsrRpc("237309454c5690c32e203a1aa74c313b7a850b750559f65572a0bdfc1a3249a9"));
const Route$4 = createFileRoute("/catalog")({
  loader: async () => await getProducts$1(),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./cart-kSljN2Ob.mjs");
const Route$3 = createFileRoute("/cart")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about-2YaPIlhA.mjs");
const Route$2 = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-ha3jbtWS.mjs");
const getProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5d14184e791326a0e274d1e4e3681e27fd834658d2ef5f776f7a7ca880bdf3a5"));
const Route$1 = createFileRoute("/")({
  loader: async () => await getProducts(),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./product._productId-B1wsiUlP.mjs");
const getProduct = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(createSsrRpc("02237705211f6fce5dafbd6be40b265cc093810759aabc102a7a61ff80e58dd5"));
const Route = createFileRoute("/product/$productId")({
  loader: async ({
    params
  }) => {
    const productId = Number(params.productId);
    if (!Number.isFinite(productId)) {
      throw notFound();
    }
    const product2 = await getProduct({
      data: {
        productId
      }
    });
    console.log(product2);
    if (!product2) {
      throw notFound();
    }
    return product2;
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SignupRoute = Route$9.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$a
});
const SigninRoute = Route$8.update({
  id: "/signin",
  path: "/signin",
  getParentRoute: () => Route$a
});
const ProductRoute = Route$7.update({
  id: "/product",
  path: "/product",
  getParentRoute: () => Route$a
});
const FavoritesRoute = Route$6.update({
  id: "/favorites",
  path: "/favorites",
  getParentRoute: () => Route$a
});
const CheckoutRoute = Route$5.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$a
});
const CatalogRoute = Route$4.update({
  id: "/catalog",
  path: "/catalog",
  getParentRoute: () => Route$a
});
const CartRoute = Route$3.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$a
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const ProductProductIdRoute = Route.update({
  id: "/$productId",
  path: "/$productId",
  getParentRoute: () => ProductRoute
});
const ProductRouteChildren = {
  ProductProductIdRoute
};
const ProductRouteWithChildren = ProductRoute._addFileChildren(ProductRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  CartRoute,
  CatalogRoute,
  CheckoutRoute,
  FavoritesRoute,
  ProductRoute: ProductRouteWithChildren,
  SigninRoute,
  SignupRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
const routerCNsBLqJP = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  R: Route$4,
  a: useCart,
  b: Route,
  r: router,
  u: useFavorites
});
export {
  CircleCheck as C,
  Route$4 as R,
  useCart as a,
  Route as b,
  createLucideIcon as c,
  routerCNsBLqJP as r,
  useFavorites as u
};
