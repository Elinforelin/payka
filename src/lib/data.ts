export enum Category {
  Bangles = "Bangles",
  Rings = "Rings",
  Earrings = "Earrings",
  Pendants = "Pendants",
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string | null;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  clasp?: string | null;
  design?: string | null;
  gemstone?: string | null;
  metalColor?: string | null;
  metalStandard?: string | null;
  metalType?: string | null;
  productType?: string | null;
  weight?: number | null;
  availableStones?: StoneOption[];
}

export interface StoneOption {
  type: string;
  colors: StoneColor[];
}

export interface StoneColor {
  name: string;
  value: string; // Hex color or CSS color name
  imageUrl?: string; // Optional: Image that shows this specific stone color
}

export const products: Product[] = [
  {
    "id": 6,
    "name": "product.names.small_gold_bangle",
    "description": "product.descriptions.small_gold_bangle",
    "price": 3000,
    "category": Category.Bangles,
    "imageUrl": "/assets/619792737_18417153727189140_5984683189343682714_n.jpg",
    "images": [
      "/assets/619792737_18417153727189140_5984683189343682714_n.jpg",
      "/assets/521469718_18391966183189140_5158185447317376143_n.jpg",
      "/assets/5346354635465.png"
    ],
    "createdAt": "2026-06-04T07:17:07.873Z",
    "updatedAt": "2026-06-04T07:17:07.873Z",
    "clasp": "Застібка конго",
    "design": "Алмазна грань/насічка, Без каміння, Тонкі",
    "gemstone": "Без каміння",
    "metalColor": "Червоний",
    "metalStandard": "585",
    "metalType": "Золото",
    "productType": "Конго (кільця)",
    "weight": 2.5,
    "availableStones": [
      {
        "type": "Cubic Zirconia",
        "colors": [
          { "name": "Clear", "value": "#FFFFFF" },
          { "name": "Pink", "value": "#FFC0CB" },
          { "name": "Blue", "value": "#ADD8E6" }
        ]
      }
    ]
  },
  {
    "id": 7,
    "name": "product.names.diamond_eternity_ring",
    "description": "product.descriptions.diamond_eternity_ring",
    "price": 4500,
    "category": Category.Rings,
    "imageUrl": "/assets/521469718_18391966183189140_5158185447317376143_n.jpg",
    "createdAt": "2026-06-04T07:17:07.884Z",
    "updatedAt": "2026-06-04T07:17:07.884Z",
    "clasp": "Крапанова закріпка",
    "design": "Класика",
    "gemstone": "Діамант",
    "metalColor": "Білий",
    "metalStandard": "750",
    "metalType": "Золото",
    "productType": "Каблучка",
    "weight": 3.2,
    "availableStones": [
      {
        "type": "Diamond",
        "colors": [
          { "name": "White", "value": "#FFFFFF" },
          { "name": "Yellow", "value": "#FFFFE0" },
          { "name": "Pink", "value": "#FFD1DC" }
        ]
      },
      {
        "type": "Sapphire",
        "colors": [
          { "name": "Blue", "value": "#0000FF" },
          { "name": "Pink", "value": "#FF69B4" }
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "product.names.lollypop",
    "description": "product.descriptions.lollypop_rings",
    "price": 3000,
    "category": Category.Rings,
    "imageUrl": "/assets/lollypop/IMG_4831.png",
    "images": [
      "/assets/lollypop/IMG_4831.png",
      "/assets/lollypop/IMG_4835.png",
      "/assets/lollypop/IMG_4837.png",
      "/assets/lollypop/5267491911117774004.png",
    ],
    "createdAt": "2026-06-04T07:17:07.886Z",
    "updatedAt": "2026-06-04T07:17:07.886Z",
    "gemstone": "Фіаніт",
    "metalColor": "Сріблястий",
    "metalStandard": "925",
    "metalType": "Срібло",
    "productType": "Кільце",
    "weight": 4,
    "availableStones": [
      {
        "type": "Cubic Zirconia",
        "colors": [
          { "name": "White", "value": "#FFF", "imageUrl": "/assets/cubicZirconiaColors/white.png" },
          { "name": "Green", "value": "#008000", "imageUrl": "/assets/cubicZirconiaColors/green.png" },
          { "name": "Blue", "value": "#0000FF", "imageUrl": "/assets/cubicZirconiaColors/blue.png" },
          { "name": "Yellow", "value": "#FFFF00", "imageUrl": "/assets/cubicZirconiaColors/yellow.png" }
        ]
      }
    ]
  },
  {
    "id": 9,
    "name": "product.names.silver_pendant",
    "description": "product.descriptions.silver_pendant",
    "price": 1500,
    "category": Category.Pendants,
    "imageUrl": "/assets/45875674576754.png",
    "createdAt": "2026-06-04T07:17:07.888Z",
    "updatedAt": "2026-06-04T07:17:07.888Z",
    "clasp": "Вушко",
    "design": "Мінімалізм",
    "gemstone": "Фіаніт",
    "metalColor": "Сріблястий",
    "metalStandard": "925",
    "metalType": "Срібло",
    "productType": "Підвіска",
    "weight": 1.8,
    "availableStones": [
      {
        "type": "Topaz",
        "colors": [
          { "name": "Sky Blue", "value": "#87CEEB" },
          { "name": "London Blue", "value": "#006666" }
        ]
      },
      {
        "type": "Amethyst",
        "colors": [
          { "name": "Purple", "value": "#9966CC" }
        ]
      }
    ]
  },
  {
    "id": 10,
    "name": "product.names.gold_ring",
    "description": "product.descriptions.classic_gold_ring",
    "price": 2000,
    "category": Category.Rings,
    "imageUrl": "/assets/2345413523454.png",
    "createdAt": "2026-06-04T07:17:07.889Z",
    "updatedAt": "2026-06-04T07:17:07.889Z",
    "clasp": "Немає",
    "design": "Класика",
    "gemstone": "Без каміння",
    "metalColor": "Жовтий",
    "metalStandard": "585",
    "metalType": "Золото",
    "productType": "Каблучка",
    "weight": 2.2,
    "availableStones": [
      {
        "type": "Onyx",
        "colors": [
          { "name": "Black", "value": "#000000" }
        ]
      },
      {
        "type": "Ruby",
        "colors": [
          { "name": "Red", "value": "#E0115F" }
        ]
      }
    ]
  }
];
