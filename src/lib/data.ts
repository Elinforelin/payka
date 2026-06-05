export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  clasp?: string | null;
  design?: string | null;
  gemstone?: string | null;
  length?: number | null;
  metalColor?: string | null;
  metalStandard?: string | null;
  metalType?: string | null;
  productType?: string | null;
  sku?: string | null;
  style?: string | null;
  technology?: string | null;
  thickness?: number | null;
  weight?: number | null;
  width?: number | null;
}

export const products: Product[] = [
  {
    "id": 6,
    "name": "Small Gold Bangle",
    "description": "Elegant gold bangle for everyday wear",
    "price": 3000,
    "category": "Bangles",
    "imageUrl": "/assets/619792737_18417153727189140_5984683189343682714_n.jpg",
    "createdAt": "2026-06-04T07:17:07.873Z",
    "updatedAt": "2026-06-04T07:17:07.873Z",
    "clasp": "Застібка конго",
    "design": "Алмазна грань/насічка, Без каміння, Тонкі",
    "gemstone": "Без каміння",
    "length": 15.8,
    "metalColor": "Червоний",
    "metalStandard": "585",
    "metalType": "Золото",
    "productType": "Конго (кільця)",
    "sku": "121903/15",
    "style": "Мінімалізм, Універсальний",
    "technology": "Прокатка",
    "thickness": 0,
    "weight": 2.5,
    "width": 1.4
  },
  {
    "id": 7,
    "name": "Diamond Eternity Ring",
    "description": "Stunning diamond eternity ring",
    "price": 4500,
    "category": "Rings",
    "imageUrl": "/assets/521469718_18391966183189140_5158185447317376143_n.jpg",
    "createdAt": "2026-06-04T07:17:07.884Z",
    "updatedAt": "2026-06-04T07:17:07.884Z",
    "clasp": "Крапанова закріпка",
    "design": "Класика",
    "gemstone": "Діамант",
    "length": 0,
    "metalColor": "Білий",
    "metalStandard": "750",
    "metalType": "Золото",
    "productType": "Каблучка",
    "sku": "234567/01",
    "style": "Розкішний",
    "technology": "Лиття",
    "thickness": 1.5,
    "weight": 3.2,
    "width": 2.5
  },
  {
    "id": 8,
    "name": "Embossed Earrings",
    "description": "Beautifully crafted embossed earrings",
    "price": 3000,
    "category": "Earrings",
    "imageUrl": "/assets/5346354635465.png",
    "createdAt": "2026-06-04T07:17:07.886Z",
    "updatedAt": "2026-06-04T07:17:07.886Z",
    "clasp": "Англійська",
    "design": "Геометрія",
    "gemstone": "Без каміння",
    "length": 20,
    "metalColor": "Сріблястий",
    "metalStandard": "925",
    "metalType": "Срібло",
    "productType": "Сережки",
    "sku": "345678/02",
    "style": "Сучасний",
    "technology": "Штампування",
    "thickness": 2,
    "weight": 4,
    "width": 10
  },
  {
    "id": 9,
    "name": "Silver Pendant",
    "description": "Minimalist silver pendant",
    "price": 1500,
    "category": "Pendants",
    "imageUrl": "/assets/45875674576754.png",
    "createdAt": "2026-06-04T07:17:07.888Z",
    "updatedAt": "2026-06-04T07:17:07.888Z",
    "clasp": "Вушко",
    "design": "Мінімалізм",
    "gemstone": "Фіаніт",
    "length": 15,
    "metalColor": "Сріблястий",
    "metalStandard": "925",
    "metalType": "Срібло",
    "productType": "Підвіска",
    "sku": "456789/03",
    "style": "Повсякденний",
    "technology": "Лиття",
    "thickness": 3,
    "weight": 1.8,
    "width": 8
  },
  {
    "id": 10,
    "name": "Gold Ring",
    "description": "Classic gold ring",
    "price": 2000,
    "category": "Rings",
    "imageUrl": "/assets/2345413523454.png",
    "createdAt": "2026-06-04T07:17:07.889Z",
    "updatedAt": "2026-06-04T07:17:07.889Z",
    "clasp": "Немає",
    "design": "Класика",
    "gemstone": "Без каміння",
    "length": 0,
    "metalColor": "Жовтий",
    "metalStandard": "585",
    "metalType": "Золото",
    "productType": "Каблучка",
    "sku": "567890/04",
    "style": "Класичний",
    "technology": "Лиття",
    "thickness": 1.2,
    "weight": 2.2,
    "width": 3
  }
];
