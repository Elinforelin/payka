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
}

export const products: Product[] = [
  {
    "id": 6,
    "name": "Small Gold Bangle",
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
  },
  {
    "id": 7,
    "name": "Diamond Eternity Ring",
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
  },
  {
    "id": 8,
    "name": "🍭",
    "description": "product.descriptions.lollypop_rings",
    "price": 3000,
    "category": Category.Rings,
    "imageUrl": "/assets/lollypop/5267491911117774004.png",
    "images": [
      "/assets/lollypop/IMG_4831.png",
      "/assets/lollypop/IMG_4835.png",
      "/assets/lollypop/IMG_4837.png",
    ],
    "createdAt": "2026-06-04T07:17:07.886Z",
    "updatedAt": "2026-06-04T07:17:07.886Z",
    "clasp": "Англійська",
    "design": "Геометрія",
    "gemstone": "Без каміння",
    "metalColor": "Сріблястий",
    "metalStandard": "925",
    "metalType": "Срібло",
    "productType": "Сережки",
    "weight": 4,
  },
  {
    "id": 9,
    "name": "Silver Pendant",
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
  },
  {
    "id": 10,
    "name": "Gold Ring",
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
  }
];
