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
    "name": "product.names.ring_plava",
    "description": "product.descriptions.ring_plava",
    "price": 2700,
    "category": Category.Rings,
    "imageUrl": "/assets/plava/5267491911117774016.jpg",
    "images": [
      "/assets/plava/5267491911117774016.jpg",
      "/assets/plava/5267491911117774017.jpg",
      "/assets/plava/5271827470149687881.jpg",
      "/assets/plava/5271827470149687883.jpg",
      "/assets/plava/5271827470149687884.jpg",
    ],
    "createdAt": "2026-06-04T07:17:07.873Z",
    "updatedAt": "2026-06-04T07:17:07.873Z",
    "gemstone": "Без каміння",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "weight": 4,
  },
  {
    "id": 7,
    "name": "product.names.bubochki_ring",
    "description": "product.descriptions.bubochki_ring",
    "price": 1700,
    "category": Category.Rings,
    "imageUrl": "/assets/bubochki/5282821220627849158.jpg",
    "images": [
      "/assets/bubochki/5282821220627849158.jpg",
      "/assets/bubochki/5282821220627849159.jpg",
      "/assets/bubochki/5282821220627849160.jpg",
    ],
    "createdAt": "2026-06-04T07:17:07.884Z",
    "updatedAt": "2026-06-04T07:17:07.884Z",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "weight": 3.2,
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
    "metalColor": "common.metal_colors.silvery",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
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
    "name": "product.names.silver_pendant_cup",
    "description": "product.descriptions.silver_pendant_cup",
    "price": 1500,
    "category": Category.Pendants,
    "imageUrl": "/assets/cup/5282821220627849167.jpg",
    "images": [
      "/assets/5282821220627849167.jpg",
      "/assets/5282821220627849168.jpg",
      "/assets/5282821220627849169.jpg",
    ],
    "createdAt": "2026-06-04T07:17:07.888Z",
    "updatedAt": "2026-06-04T07:17:07.888Z",
    "metalStandard": "925",
    "metalType": "common.metal_types.silver",
    "weight": 5,
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
    "metalColor": "common.metal_colors.yellow",
    "metalStandard": "585",
    "metalType": "common.metal_types.gold",
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
