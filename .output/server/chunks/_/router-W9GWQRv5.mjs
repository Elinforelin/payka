import { createRouter, createRootRoute, createFileRoute, Navigate, lazyRouteComponent, redirect, HeadContent, Scripts, notFound } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
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
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  const addToCart = (product2, selectedStone, selectedSize) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product2.id);
      if (existingItem) {
        return prevItems.map(
          (item) => item.id === product2.id ? { ...item, quantity: item.quantity + 1, savedForLater: false, selectedStone, selectedSize } : item
        );
      }
      return [...prevItems, { ...product2, quantity: 1, savedForLater: false, selectedStone, selectedSize }];
    });
    setNotification({ key: "notifications.added_to_cart", params: { name: t(product2.name) } });
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
  const { t } = useTranslation();
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
    setNotification({ key: "notifications.added_to_favorite", params: { name: t(product2.name), category } });
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
        favorites: favorites2,
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
  const { notification: cartNotification } = useCart();
  const { notification: favoriteNotification } = useFavorites();
  const notification = cartNotification || favoriteNotification;
  if (!notification) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-[24px] bg-[#1a1a1a] px-6 py-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md", children: [
    /* @__PURE__ */ jsx(CircleCheck, { className: "h-5 w-5 text-[#b3917d]" }),
    /* @__PURE__ */ jsx("p", { className: "font-bold tracking-tight", children: t(notification.key, notification.params) })
  ] }) });
};
const common$1 = { "app_name": "PAYKA", "search_placeholder": "Search Jewelry", "categories": "Categories", "we_recommend": "We Recommend", "add_to_cart": "Add to Cart", "checkout": "Checkout", "save_for_later": "Save for later", "move_to_cart": "Move to cart", "remove": "Remove", "subtotal": "Subtotal", "total": "Total", "favorites": "Favorites", "cart": "Cart", "about_us": "About Us", "no_items": "No items found", "price": "Price", "metal": "Metal", "color": "Color", "apply": "Apply", "reset": "Reset", "back": "Back", "metal_types": { "silver": "Silver", "gold": "Gold" }, "gemstones": { "none": "No gemstone", "cubic_zirconia": "Cubic Zirconia" }, "metal_colors": { "white": "White", "silvery": "Silvery", "yellow": "Yellow" }, "category_names": { "Bangles": "Bangles", "Rings": "Rings", "Earrings": "Earrings", "Pendants": "Pendants" } };
const catalog$1 = { "title": "Catalog", "advanced_filters": "Advanced Filters", "price_range": "Price Range", "min": "Min", "max": "Max", "reset_all": "Reset All", "show_results": "Show {{count}} Results", "no_results": "No items found", "no_results_desc": "Try a different category or adjust your filters" };
const product$1 = { "add_to_favorites": "Add to favorites", "added_to_cart": "Added to cart", "description": "Description", "descriptions": { "ring_plava": "Freedom that needs no explanation", "bubochki_ring": "Bubochki for every day to feel special", "lollypop_rings": "Beautifully crafted embossed earrings", "silver_pendant_cup": "Minimalist silver cup pendant", "flower_pendant": "Flower pendant with a delicate design, perfect for everyday wear" }, "names": { "ring_plava": "PLAVA Ring", "bubochki_ring": "Bubochki Ring", "lollypop": "🍭", "silver_pendant_cup": "Silver Cup Pendant", "flower_pendant": "Flower Pendant" }, "details": "Details", "about_product": "About Product", "select_size": "Select Size", "select_ring_size": "Select Ring Size", "select_necklace_length": "Select Chain Length", "reviews": "Reviews", "size_required": "Please select a size to continue", "stone_required": "Please select a stone and color to continue", "size_in_mm": "Size is shown in millimeters (mm)", "size_guide": "Size Guide", "size_guide_ring_title": "Ring Size Chart", "size_guide_ring_col_mm": "Diameter (mm)", "size_guide_ring_col_eu": "EU Size", "size_guide_necklace_title": "Necklace Length Guide", "size_guide_necklace_col_cm": "Length", "size_guide_necklace_col_name": "Style", "size_guide_necklace_col_desc": "Where it sits", "size_guide_necklace_choker": "Choker", "size_guide_necklace_choker_desc": "Base of the neck", "size_guide_necklace_princess": "Princess", "size_guide_necklace_princess_desc": "At the collarbone", "size_guide_necklace_matinee": "Matinee", "size_guide_necklace_matinee_desc": "Below the collarbone", "size_guide_necklace_opera": "Opera", "size_guide_necklace_opera_desc": "Below the bust", "size_guide_tips_title": "How to Measure", "size_guide_tips_ring_title": "Ring size", "size_guide_tips_ring_1": "Cut a thin strip of paper or use a piece of string.", "size_guide_tips_ring_2": "Wrap it snugly around the base of your finger (measure at the knuckle for a comfortable fit).", "size_guide_tips_ring_3": "Mark where the ends meet and measure the length in millimeters — that is your diameter.", "size_guide_tips_ring_note": "Fingers swell slightly during the day — measure in the evening for the best result.", "size_guide_tips_necklace_title": "Necklace length", "size_guide_tips_necklace_1": "Hold a measuring tape or a piece of string around your neck at the position you prefer.", "size_guide_tips_necklace_2": "Note the length in centimeters and match it to the chart above.", "select_stone": "Select Stone", "select_stone_color": "Select Color", "recommended_for_you": "Recommended for you", "sku": "SKU", "metal_standard": "Metal Standard", "metal_type": "Metal Type", "metal_color": "Metal Color", "clasp": "Clasp", "gemstone": "Gemstone", "design": "Design", "style": "Style", "product_type": "Product Type", "technology": "Technology", "width": "Width, mm", "thickness": "Thickness, mm", "length": "Length, mm", "weight": "Weight, g" };
const about$1 = { "our_story": "Our Story", "hero_title": "Created with its own identity", "hero_desc": "Our jewelry is born slowly. Without haste, without plan, allowing the form to become what it wants to be.", "history_founding": "History & Founding", "history_p1": "Payka was born in 2023 in a small home studio. With nothing more than a simple soldering iron, a few tools, and a strong desire to create jewelry meant for everyday wear.\n\nIt all began with a search for the perfect ring for myself — simple, comfortable, something that feels like a natural extension of the hand. When it couldn’t be found, we decided to create it ourselves.\n\nToday, Payka is silver jewelry, handcrafted with a love for imperfections, textures, and small details.\n", "history_p2": "Behind every Payka piece is Alina — the founder and maker of the brand, who fell in love with working with metal long before the first collection came to life.\n\nInspired by organic forms and the imperfect beauty of handmade objects, she continues to craft each piece in small batches. This approach allows every item to carry its own character, the warmth of human hands, and a sense of quiet uniqueness.", "mission_vision": "Mission & Vision", "mission": "Our Mission", "mission_desc": "To create jewelry meant to be worn for years — simple, distinctive, and handcrafted in silver. We believe true beauty lives in details that stand the test of time.", "vision": "Our Vision", "vision_desc": "We create jewelry for those who find beauty in simplicity and thoughtful details. These are pieces that don’t demand attention, but naturally become part of everyday life and the stories we carry with us.", "our_team": "The Team", "alina_role": "Founder & Lead Jeweler", "alina_desc": "Specializes in creating jewelry and exploring experimental metal textures.", "team_coming_soon": "More team members coming soon...", "milestones": "Milestones", "m2023": "Launched the Payka home studio and began collaborating with its first retail partner in Ivano-Frankivsk.", "m2024": "Expansion into international markets.", "m2025": "Beginning of another partnership with a retail store in the Vinnytsia region.", "footer_desc": "We invite you to explore our collection and find a piece that speaks to your heart.", "explore_collection": "Explore Collection" };
const cart$1 = { "title": "My Cart", "order_summary": "Order Summary", "items_count": "{{count}} items", "empty": "Your cart is empty", "continue_shopping": "Continue Shopping", "total_amount": "Total Amount", "proceed_to_payment": "Go To Checkout", "empty_desc": "Add some beautiful jewelry to your collection", "saved_for_later": "Saved for later", "size": "Size", "stone": "Stone" };
const checkout$1 = { "title": "Checkout", "shipping_info": "Shipping Information", "full_name": "Full Name", "placeholder_full_name": "John Doe", "phone": "Phone Number", "city": "City", "department": "Nova Poshta Department", "search_city": "Search city...", "select_department": "Select department...", "shipping_method": "Shipping Method", "estimated_delivery": "Estimated delivery: {{time}}", "address": "Shipping Address", "order_summary": "Order Summary", "place_order": "Place Order", "back_to_cart": "Back to Cart", "confirm_order": "Confirm Your Order", "next_step": "Next Step", "qty": "Qty", "free": "Free", "subtotal": "Subtotal", "shipping": "Shipping", "total": "Total", "errors": { "name_required": "Full name is required", "phone_invalid": "Invalid phone number format", "address_required": "Shipping address is required", "city_required": "Please select a city", "department_required": "Please select a department", "consent_required": "Please confirm consent to process your personal data", "submit_failed": "Unable to submit your order. Please try again." }, "methods": { "nova_poshta": "Nova Poshta (to Department)" }, "success": "Order placed successfully!", "privacy_title": "Data Protection", "privacy_note": "We collect only the information needed to fulfill your order. Personal data is transmitted securely to our team and processed solely for order fulfillment in accordance with GDPR.", "privacy_consent": "I agree to the processing of my personal data for order fulfillment.", "comment": "Comment", "comment_placeholder": "Any special requests or notes for your order...", "submitting": "Submitting order..." };
const notifications$1 = { "added_to_cart": "{{name}} added to cart!", "added_to_favorite": "{{name}} added to {{category}}!" };
const stones$1 = { "types": { "Cubic Zirconia": "Cubic Zirconia", "Diamond": "Diamond", "Sapphire": "Sapphire", "Enamel": "Enamel", "Topaz": "Topaz", "Amethyst": "Amethyst", "Onyx": "Onyx", "Ruby": "Ruby" }, "colors": { "Clear": "Clear", "Pink": "Pink", "Blue": "Blue", "White": "White", "Yellow": "Yellow", "Red": "Red", "Green": "Green", "Sky Blue": "Sky Blue", "London Blue": "London Blue", "Purple": "Purple", "Black": "Black" } };
const favorites$1 = { "title": "My Favorites", "all_items": "All Items", "new_category": "New Category", "category_name_placeholder": "e.g. Birthday Gifts", "cancel": "Cancel", "create": "Create", "no_favorites": "No favorites yet", "no_favorites_desc": "Items you heart will show up here.", "explore_collection": "Explore Collection", "general": "General", "wishlist": "Wishlist", "gift_ideas": "Gift Ideas", "confirm_favorite": "Add to Favorites", "select_category": "Select a category for this item" };
const enTranslation = {
  common: common$1,
  catalog: catalog$1,
  product: product$1,
  about: about$1,
  cart: cart$1,
  checkout: checkout$1,
  notifications: notifications$1,
  stones: stones$1,
  favorites: favorites$1
};
const common = { "app_name": "PAYKA", "search_placeholder": "Пошук прикрас", "categories": "Категорії", "we_recommend": "Ми рекомендуємо", "add_to_cart": "Додати в кошик", "checkout": "Оформити замовлення", "save_for_later": "Зберегти на потім", "move_to_cart": "Перемістити в кошик", "remove": "Видалити", "subtotal": "Підсумок", "total": "Разом", "favorites": "Обране", "cart": "Кошик", "about_us": "Про нас", "no_items": "Товари не знайдені", "price": "Ціна", "metal": "Метал", "color": "Колір", "apply": "Застосувати", "reset": "Скинути", "back": "Назад", "metal_types": { "silver": "Срібло", "gold": "Золото" }, "gemstones": { "none": "Без каміння", "cubic_zirconia": "Фіаніт" }, "metal_colors": { "white": "Білий", "silvery": "Сріблястий", "yellow": "Жовтий" }, "category_names": { "Bangles": "Браслети", "Rings": "Каблучки", "Earrings": "Сережки", "Pendants": "Підвіски" } };
const catalog = { "title": "Каталог", "advanced_filters": "Розширені фільтри", "price_range": "Діапазон цін", "min": "Від", "max": "До", "reset_all": "Скинути все", "show_results": "Показати {{count}} результатів", "no_results": "Нічого не знайдено", "no_results_desc": "Спробуйте іншу категорію або змініть фільтри" };
const product = { "add_to_favorites": "Додати в обране", "added_to_cart": "Додано в кошик", "description": "Опис", "descriptions": { "ring_plava": "Cвобода, яка не потребує пояснень", "bubochki_ring": "Бубочки на кожен день, щоб відчувати себе особливою", "lollypop_rings": "Якщо б літо можна було носити на пальці, воно виглядало б саме так 🍭", "silver_pendant_cup": "Мінімалістична срібна підвіска-чашка", "flower_pendant": "Срібна підвіска у формі квітки, яка нагадує про красу природи" }, "names": { "ring_plava": "Кільце PLAVA", "bubochki_ring": "Кільце з бубочками", "lollypop": "Каблучка льодяник", "silver_pendant_cup": "Срібна підвіска-чашка", "flower_pendant": "Підвіска-квітка" }, "details": "Деталі", "about_product": "Про виріб", "select_size": "Оберіть розмір", "select_ring_size": "Оберіть розмір каблучки", "select_necklace_length": "Оберіть довжину ланцюжка", "reviews": "Відгуки", "size_required": "Будь ласка, оберіть розмір, щоб продовжити", "stone_required": "Будь ласка, оберіть каміння та колір, щоб продовжити", "size_in_mm": "Розмір вказано в міліметрах (мм)", "size_guide": "Таблиця розмірів", "size_guide_ring_title": "Таблиця розмірів каблучок", "size_guide_ring_col_mm": "Діаметр (мм)", "size_guide_ring_col_eu": "Розмір EU", "size_guide_necklace_title": "Довжина кольє", "size_guide_necklace_col_cm": "Довжина", "size_guide_necklace_col_name": "Назва", "size_guide_necklace_col_desc": "Де лежить", "size_guide_necklace_choker": "Чокер", "size_guide_necklace_choker_desc": "Біля основи шиї", "size_guide_necklace_princess": "Принцеса", "size_guide_necklace_princess_desc": "На рівні ключиці", "size_guide_necklace_matinee": "Матіне", "size_guide_necklace_matinee_desc": "Нижче ключиці", "size_guide_necklace_opera": "Опера", "size_guide_necklace_opera_desc": "Нижче грудей", "size_guide_tips_title": "Як виміряти", "size_guide_tips_ring_title": "Розмір каблучки", "size_guide_tips_ring_1": "Відріжте вузьку смужку паперу або візьміть нитку.", "size_guide_tips_ring_2": "Обмотайте її навколо основи пальця (вимірюйте на кісточці для комфортної посадки).", "size_guide_tips_ring_3": "Відмітьте місце перетину і виміряйте довжину в міліметрах — це ваш діаметр.", "size_guide_tips_ring_note": "Пальці злегка набрякають протягом дня — вимірюйте ввечері для найкращого результату.", "size_guide_tips_necklace_title": "Довжина ланцюжка", "size_guide_tips_necklace_1": "Прикладіть сантиметрову стрічку або нитку до шиї на потрібній висоті.", "size_guide_tips_necklace_2": "Запишіть довжину в сантиметрах і знайдіть її в таблиці вище.", "select_stone": "Оберіть камінь", "select_stone_color": "Оберіть колір", "recommended_for_you": "Рекомендовано для вас", "sku": "Артикул", "metal_standard": "Проба", "metal_type": "Метал", "metal_color": "Колір металу", "clasp": "Застібка", "gemstone": "Вставка", "design": "Дизайн", "style": "Стиль", "product_type": "Тип виробу", "technology": "Технологія виготовлення", "width": "Ширина, мм", "thickness": "Товщина, мм", "length": "Довжина, мм", "weight": "Вага, г" };
const about = { "our_story": "Наша історія", "hero_title": "Створено, аби бути самобутнім.", "hero_desc": "Наші прикраси народжуються повільно. Без поспіху, без плану, дозволяючи формі стати такою, якою вона хоче бути.", "history_founding": "Історія та заснування", "history_p1": "Payka народилася у 2023 році в маленькій домашній майстерні. З простого паяльника, кількох інструментів і великого бажання створювати прикраси, які хочеться носити щодня.\n\nУсе почалося з пошуку каблучки для себе — простої, зручної, такої, що відчувається природним продовженням руки. Коли знайти її не вдалося, ми вирішили створити власну.\n\nСьогодні Payka — це прикраси, створені вручну зі срібла, з любов'ю до недосконалостей, фактур і маленьких деталей.", "history_p2": "За кожною прикрасою Payka стоїть Аліна — засновниця бренду та майстриня, яка закохалася в роботу з металом задовго до появи першої колекції.\n\nНатхненна органічними формами та недосконалою красою речей, створених вручну, вона й сьогодні продовжує виготовляти прикраси невеликими серіями. Так кожна річ зберігає свій характер, тепло рук і відчуття унікальності.", "mission_vision": "Місія та бачення", "mission": "Наша місія", "mission_desc": "Створювати прикраси, які хочеться носити роками — прості, самобутні та створені вручну зі срібла. Ми віримо, що справжня краса живе в деталях, які не підвладні часу.", "vision": "Наше бачення", "vision_desc": "Ми створюємо прикраси для тих, хто знаходить красу в простоті та деталях. Це речі, що не змагаються за увагу, а природно стають частиною щоденного життя і особистих історій.", "our_team": "Наша команда", "alina_role": "Боссиня :)", "alina_desc": "Спеціалізується на дизайні прикрас та експериментальних текстурах металу.", "team_coming_soon": "Більше членів команди незабаром...", "milestones": "Досягнення", "m2023": "Запуск домашньої студії Payka. Співпраця з першим магазином у Івано-Франківську.", "m2024": "Продажі закордон.", "m2025": "Початок ще однієї співпраці з магазином на Вінничині.", "footer_desc": "Ми запрошуємо вас дослідити нашу колекцію та знайти виріб, який промовлятиме до вашого серця.", "explore_collection": "Дослідити колекцію" };
const cart = { "title": "Мій кошик", "order_summary": "Підсумок замовлення", "items_count_one": "{{count}} товар", "items_count_few": "{{count}} товари", "items_count_many": "{{count}} товарів", "empty": "Ваш кошик порожній", "continue_shopping": "Продовжити покупки", "total_amount": "Загальна сума", "proceed_to_payment": "Перейти до оформлення замовлення", "empty_desc": "Додайте прекрасні прикраси до своєї колекції", "saved_for_later": "Збережено на потім", "size": "Розмір", "stone": "Камінь" };
const checkout = { "title": "Оформлення", "shipping_info": "Інформація про доставку", "full_name": "Повне ім'я", "placeholder_full_name": "Ім'я Прізвище", "phone": "Номер телефону", "city": "Місто", "department": "Відділення Нової Пошти", "search_city": "Пошук міста...", "select_department": "Оберіть відділення...", "shipping_method": "Спосіб доставки", "estimated_delivery": "Очікувана доставка: {{time}}", "address": "Адреса доставки", "order_summary": "Підсумок замовлення", "place_order": "Оформити замовлення", "back_to_cart": "Назад до кошика", "confirm_order": "Підтвердіть замовлення", "next_step": "Наступний крок", "qty": "Кількість", "free": "Безкоштовно", "subtotal": "Вартість товарів", "shipping": "Доставка", "total": "Разом", "errors": { "name_required": "Повне ім'я обов'язкове", "phone_invalid": "Невірний формат номера телефону", "address_required": "Адреса доставки обов'язкова", "city_required": "Оберіть місто", "department_required": "Оберіть відділення", "consent_required": "Будь ласка, підтвердіть згоду на обробку персональних даних", "submit_failed": "Не вдалося надіслати замовлення. Спробуйте ще раз." }, "methods": { "nova_poshta": "Нова Пошта (до відділення)" }, "success": "Замовлення успішно оформлено!", "privacy_title": "Захист даних", "privacy_note": "Ми збираємо лише інформацію, необхідну для виконання вашого замовлення. Персональні дані передаються нашій команді безпечно та обробляються виключно для виконання замовлення відповідно до GDPR.", "privacy_consent": "Я погоджуюся на обробку моїх персональних даних для виконання замовлення.", "comment": "Коментар", "comment_placeholder": "Особливі побажання або нотатки до замовлення...", "submitting": "Надсилання замовлення..." };
const notifications = { "added_to_cart": "{{name}} додано до кошика!", "added_to_favorite": "{{name}} додано до списку {{category}}!" };
const stones = { "types": { "Cubic Zirconia": "Фіаніт", "Diamond": "Діамант", "Sapphire": "Сапфір", "Enamel": "Емаль", "Topaz": "Топаз", "Amethyst": "Аметист", "Onyx": "Онікс", "Ruby": "Рубін" }, "colors": { "Clear": "Прозорий", "Pink": "Рожевий", "Blue": "Блакитний", "White": "Білий", "Yellow": "Жовтий", "Red": "Червоний", "Green": "Зелений", "Sky Blue": "Небесно-блакитний", "London Blue": "Лондонський блакитний", "Purple": "Фіолетовий", "Black": "Чорний" } };
const favorites = { "title": "Моє обране", "all_items": "Усі товари", "new_category": "Нова категорія", "category_name_placeholder": "напр. Подарунки", "cancel": "Скасувати", "create": "Створити", "no_favorites": "Поки що нічого немає", "no_favorites_desc": "Товари, які ви позначите сердечком, з'являться тут.", "explore_collection": "Дослідити колекцію", "general": "Загальне", "wishlist": "Список бажань", "gift_ideas": "Ідеї для подарунків", "confirm_favorite": "Додати до обраного", "select_category": "Виберіть категорію для цього товару" };
const ukTranslation = {
  common,
  catalog,
  product,
  about,
  cart,
  checkout,
  notifications,
  stones,
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
const appCss = "/assets/styles-Bhqf-lOZ.css";
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
const $$splitComponentImporter$8 = () => import("./signup-B-0OmNDK.mjs");
const Route$9 = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./signin-BSebyb_e.mjs");
const Route$8 = createFileRoute("/signin")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./product-BFsOu0JM.mjs");
const Route$7 = createFileRoute("/product")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./favorites-CCONDEmD.mjs");
const Route$6 = createFileRoute("/favorites")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./checkout-CIPkto9Y.mjs");
const Route$5 = createFileRoute("/checkout")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./cart-DqUj0I1n.mjs");
const Route$4 = createFileRoute("/cart")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about-C_BynoNC.mjs");
const Route$3 = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const Route$2 = createFileRoute("/$")({
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
const $$splitComponentImporter$1 = () => import("./index-mSSi5VSt.mjs");
const getProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5d14184e791326a0e274d1e4e3681e27fd834658d2ef5f776f7a7ca880bdf3a5"));
const Route$1 = createFileRoute("/")({
  loader: async () => await getProducts(),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./product._productId-C2NHV9zB.mjs");
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
const CartRoute = Route$4.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$a
});
const AboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$a
});
const SplatRoute = Route$2.update({
  id: "/$",
  path: "/$",
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
  SplatRoute,
  AboutRoute,
  CartRoute,
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
const routerW9GWQRv5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  R: Route$1,
  a: useCart,
  b: Route,
  c: createSsrRpc,
  r: router,
  u: useFavorites
});
export {
  CircleCheck as C,
  Route$1 as R,
  useCart as a,
  createSsrRpc as b,
  createLucideIcon as c,
  Route as d,
  routerW9GWQRv5 as r,
  useFavorites as u
};
